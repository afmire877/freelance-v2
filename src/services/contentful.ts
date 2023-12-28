import { type ContentfulClientApi, createClient } from "contentful";
import { createClient as createClientManagement } from "contentful-management";

import { type QuestionGroup } from "~/model/question";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE ?? "";

const isProd = process.env.NEXT_PUBLIC_APP_ENV === "prod";

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


const createClientManagement = createClient({
  space,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN ?? "",
});


export const getQuestions = async () => {
  const questions = await client?.getEntries({
    content_type: "questionBank",
    include: 3,
  });

  if (questions === undefined) throw new Error("Questions not found");

  return questions.items as unknown as QuestionGroup[];
};

export const saveSubmission = async () => {
  const questions = await client?.

  if (questions === undefined) throw new Error("Questions not found");

  return questions.items as unknown as QuestionGroup[];
};
