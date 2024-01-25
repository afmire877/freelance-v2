import { TRPCError } from "@trpc/server";
import { type InferInsertModel, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { profiles, submissions } from "~/server/db/schema";
import { type User } from "~/store/userStore";

export const submissionRouter = createTRPCRouter({
  create: publicProcedure.input(z.any()).mutation(async ({ input }) => {
    const values: InferInsertModel<typeof submissions> = {
      answers: input?.answers,
      score: input?.result,
      profileId: 0,
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
        .values(input?.user as User)
        .returning()
        .execute();
      values.profileId = profile?.id;
    } else {
      values.profileId = found.id;
    }

    const [doc] = await db
      .insert(submissions)
      .values(values)
      .returning()
      .execute();

    return doc;
  }),
  get: publicProcedure
    .input(z.object({ uuid: z.string() }))
    .query(async ({ input }) => {
      const [found] = await db
        .select()
        .from(submissions)
        .where(eq(submissions.uuid, String(input?.uuid) ?? ""))
        .innerJoin(profiles, eq(profiles.id, submissions.profileId))
        .execute();

      if (!found) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Submission not found",
          cause: new Error("Submission not found"),
        });
      }

      return found;
    }),
});
