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
    <div className="flex flex-col items-start">
      <h1>{prompt}</h1>
      {checklist?.map(({ content }, idx) => {
        return (
          <div key={idx} className="items-top mt-4 flex space-x-2">
            <Checkbox
              id={`checklist-${idx}`}
              onChange={() => {
                const newValue = value.map((choice, index) => {
                  if (idx === index) {
                    return !choice;
                  }
                  return choice;
                });

                setValue(newValue);

                updateQuestionValue({
                  index: currentIndex,
                  type: "checklist",
                  value: newValue,
                });
              }}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor={`checklist-${idx}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {content}
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
}
