import { createClient, type ContentfulClientApi } from "contentful";

import { type QuestionGroup } from "~/model/question";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE ?? "";
// const isProd = process.env.NODE_ENV === "production";
const isProd = true;

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

export const getQuestions = async () => {
  const questions = await client?.getEntry("3aDWPrYSc94kS8WKNm3b2z", {
    include: 4,
  });

  if (questions === undefined) throw new Error("Questions not found");

  return questions.fields.questions as unknown as QuestionGroup[];
};
