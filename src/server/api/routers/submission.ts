import { TRPCError } from "@trpc/server";
import { type InferInsertModel, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { profiles, submissions } from "~/server/db/schema";
import { Borough, NewsletterOptions, createBody } from "~/services/submittable";
import { type User } from "~/store/userStore";
import base64 from "base-64";

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

  saveToSubmittable: publicProcedure
    .input(
      z.object({
        email: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        dob: z.string(),
        phone: z.string(),
        newsletter: z.nativeEnum(NewsletterOptions),
        personalData: z.boolean(),
        borough: z.nativeEnum(Borough),
      }),
    )
    .mutation(async ({ input }) => {
      const url = "https://submittable-api.submittable.com/v4/submissions";

      const projectId = process.env.SUBMITTABLE_PROJECT_ID || "";
      //   const formId = "2f9a4f81-c86a-464b-9d34-36307dd13f14";
      const login = process.env.SUBMITTABLE_API_KEY || "";
      const password = "";

      console.log("input", input);
      const body = createBody({ ...input, projectId });

      console.log(body);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${base64.encode(`${login}:${password}`)}`,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log("data", data);

      return { status: "ok", data };
    }),
});
