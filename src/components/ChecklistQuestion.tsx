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

  return (
    <div className=" font-inter mt-10  flex flex-col items-start">
      <h1 className=" ml-3 w-[306px] break-words  text-3xl font-medium leading-[112.5%] text-slate-950 max-md:ml-2.5 ">
        {prompt}
      </h1>
      <div className="mt-6 ">
        {checklist?.map(({ content }, idx) => {
          return (
            <div key={idx} className="  flex items-baseline space-x-2  py-4">
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
                  className="whitespace-normal text-lg  font-normal leading-normal text-black  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
