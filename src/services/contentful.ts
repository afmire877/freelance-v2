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
  const list = await client?.getEntry("3aDWPrYSc94kS8WKNm3b2z", {
    include: 4,
  });

  if (!list) throw new Error("Questions not found");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const bank = list.fields.questions?.filter((t) => t.fields?.questions);

  return bank as unknown as QuestionGroup[];
};

export function isDraft(entity) {
  return !entity.sys.publishedVersion;
}
