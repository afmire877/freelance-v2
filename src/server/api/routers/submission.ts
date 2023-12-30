import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { profiles, submissions } from "~/server/db/schema";

export const submissionRouter = createTRPCRouter({
  create: publicProcedure.input(z.any()).mutation(async ({ ctx, input }) => {
    const partialSubmission = input?.result
      .map((item) => {
        return {
          [`${item.topic.toLowerCase()}Percentage`]: item.competence.percentage,
        };
      })
      .reduce((acc, item) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        const [key, value] = Object.entries(item)[0];
        acc[key] = value;

        return acc;
      }, {});

    const values = {
      answers: input?.answers,
      score: input?.result,
      ...partialSubmission,
    };

    const [found] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.email, String(input?.user?.email) ?? ""))
      .execute();

    console.log(found);

    if (!found) {
      const [profile] = await db
        .insert(profiles)
        .values(input?.user)
        .returning()
        .execute();
      values.profileId = profile?.id;
    } else {
      values.profileId = found.id;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await db.insert(submissions).values(values).execute();

    return true;
  }),
  get: publicProcedure
    .input(z.object({ uuid: z.string() }))
    .query(async ({ ctx, input }) => {
      const [found] = await db
        .select()
        .from(submissions)
        .where(eq(submissions.uuid, String(input?.uuid) ?? ""))
        .innerJoin(profiles, eq(profiles.id, submissions.profileId))
        .execute();

      return found;
    }),
});
