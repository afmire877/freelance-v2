import { type ContentfulClientApi, createClient } from "contentful";

import { type QuestionGroup } from "~/model/question";
// import { type Result } from "~/pages/result";
// import { db } from "~/server/db";
// import { submissions } from "~/server/db/schema";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE ?? "";

const isProd = process.env.NODE_ENV === "production";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: ContentfulClientApi<any>;

if (typeof window !== "undefined") {
  if (isProd) {
    client = createClient({
      space,
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN ?? "",
    });
  } else {
    // USED FOR PREVIEW - IT ALLOWS SEEING "DRAFTS"
    client = createClient({
      space,
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN ?? "",
      host: "preview.contentful.com",
    });
  }
}

// const createClientManagement = createClient({
//   space,
//   accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN ?? "",
// });

export const getQuestions = async () => {
  const questions = await client?.getEntries({
    content_type: "questionBank",
    include: 3,
  });

  if (questions === undefined) throw new Error("Questions not found");

  return questions.items as unknown as QuestionGroup[];
};
