import * as React from "react";
import { Textarea } from "./ui/textarea";
import { options } from "~/utils/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import useQuizStore from "~/store/quizStore";
import { type Document } from "@contentful/rich-text-types/dist/types/types";

interface Props {
  choiceQuestion: Document;
  choiceQuestionValue?: string;
}

export function TextBox({
  choiceQuestion: question,
  choiceQuestionValue,
}: Props) {
  const updateQuestionValue = useQuizStore((s) => s.updateQuestionValue);
  const currentIndex = useQuizStore((s) => s.currentIndex);

  return (
    <div className="mt-10 flex  flex-col items-start font-inter ">
      <div className=" ml-3 w-full text-3xl font-medium leading-[112.5%] text-slate-950 max-md:ml-2.5  md:text-4xl  ">
        {documentToReactComponents(question, options)}
      </div>
      <div className="lg:text-1xl ml-3.5 mt-5 self-start text-lg text-black">
        Use the text box below to answer...
      </div>

      <Textarea
        className=" mt-12 aspect-[1.78] w-full self-stretch overflow-hidden fill-white stroke-slate-950 stroke-[2px] object-contain object-center pb-6 lg:h-60 "
        placeholder="Type your answer here..."
        defaultValue={choiceQuestionValue ?? ""}
        onChange={(e) => {
          const target = e.target as HTMLTextAreaElement;

          updateQuestionValue({
            index: currentIndex,
            type: "choice",
            value: target.value,
          });
        }}
      />
    </div>
  );
}
