// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState } from "react";
import useQuizStore from "~/store/quizStore";
import { Checkbox } from "./ui/checkbox";
import { type CompetenceChecklist } from "~/model/question";

interface Props {
  competenceChecklist: CompetenceChecklist[];
  question: string;
}

export default function ChecklistQuestion({
  competenceChecklist: checklist,
  question,
  ...props
}: Props) {
  const updateQuestionValue = useQuizStore((s) => s.updateQuestionValue);
  const currentIndex = useQuizStore((s) => s.currentIndex);


  const [value, setValue] = useState<boolean[]>(
    Array(checklist.length).fill(false),
  );

  return (
    <div className=" mt-10 flex  flex-col items-start font-inter">
      <h1 className="   flex w-[306px]  break-words text-3xl font-medium leading-[112.5%] text-slate-950 max-md:ml-2.5 md:w-full md:text-4xl lg:w-full lg:text-5xl">
        {question}
      </h1>
      <div className="mt-6 ">
        {checklist?.map(({ fields }, idx) => {
          return (
            <div
              key={idx}
              className=" ml-3.5 mt-6 flex max-w-full items-baseline gap-5  max-md:ml-2.5 max-md:mt-10"
            >
              <Checkbox
                id={`checklist-${idx}`}
                defaultChecked={fields?.selected ?? false}
                onCheckedChange={() => {
                  const newValue = value.map((choice, index) =>
                    idx === index ? !choice : choice,
                  );

                  setValue(newValue);

                  updateQuestionValue({
                    index: currentIndex,
                    type: "checklist",
                    value: newValue,
                  });
                }}
              />
              <div className=" grid gap-1.5">
                <label
                  htmlFor={`checklist-${idx}`}
                  className="whitespace-normal text-lg font-normal leading-normal  text-black hover:border-b-2 hover:border-pink-600  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:text-2xl"
                >
                  {fields?.text ?? ""}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
