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
      .where({ email: input?.user.email })
      .execute();

    if (!found) {
      const [profile] = await db
        .insert(profiles)
        .values({
          name: input?.user.name,
          contactNumber: input?.user.contactNumber,
          dateOfBirth: input?.user.dateOfBirth,
          borough: input?.user.borough,
          email: input?.user.email,
          submittableId: input?.user.submittableId,
        })
        .returning()
        .execute();
      values.profileId = profile?.id;
    } else {
      values.profileId = found.id;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await db.insert(submissions).values(values).execute();

    return "ok";
  }),
});
