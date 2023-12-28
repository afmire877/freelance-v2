// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState } from "react";
import useQuizStore from "~/store/quizStore";
import { type Checklist } from "~/utils/types";
import { Checkbox } from "./ui/checkbox";

interface Props {
  checklist: Checklist[];
  prompt: string;
}

export default function ChecklistQuestion({ checklist, prompt }: Props) {
  const updateQuestionValue = useQuizStore((s) => s.updateQuestionValue);
  const currentIndex = useQuizStore((s) => s.currentIndex);

  const [value, setValue] = useState<boolean[]>(
    Array(checklist.length).fill(false),
  );
  console.log("checklist", prompt);

  return (
    <div className=" font-inter mt-10  flex flex-col items-start">
      <h1 className="   flex w-[306px]  break-words text-3xl font-medium leading-[112.5%] text-slate-950 max-md:ml-2.5 md:w-full md:text-4xl lg:w-full lg:text-5xl">
        {prompt}
      </h1>
      <div className="mt-6 ">
        {checklist?.map(({ content }, idx) => {
          return (
            <div
              key={idx}
              className=" ml-3.5 mt-10 flex max-w-full items-baseline gap-5  max-md:ml-2.5 max-md:mt-10"
            >
              <Checkbox
                id={`checklist-${idx}`}
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
                  className="whitespace-normal text-lg  font-normal leading-normal text-black  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:text-2xl"
                >
                  {content}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
