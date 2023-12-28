import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";
import useQuizStore from "~/store/quizStore";
import { type CompetenceChecklist } from "~/model/question";

interface Props {
  checklist: CompetenceChecklist[];
  prompt: string;
}

export default function RadioQuestion({ checklist, prompt }: Props) {
  const updateQuestionValue = useQuizStore((s) => s.updateQuestionValue);
  const currentIndex = useQuizStore((s) => s.currentIndex);

  const [value, setValue] = useState<boolean[]>(
    Array(checklist.length).fill(false),
  );

  return (
    <div className="font-inter mt-10">
      <h1 className=" ml-3 w-[306px] break-words  text-3xl font-medium leading-[112.5%] text-slate-950 max-md:ml-2.5 ">
        {prompt}
      </h1>

      <RadioGroup
        className="mt-6 "
        defaultValue="option-one"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          const index = Number(target?.value);

          const newValue = value.map((choice, idx) => {
            return idx === index ? !choice : choice;
          });

          setValue(newValue);

          updateQuestionValue({
            index: currentIndex,
            type: "checklist",
            value,
          });
        }}
      >
        {checklist?.map(({ fields: { text } }, index) => {
          return (
            <div key={index} className=" flex items-baseline space-x-2">
              <RadioGroupItem defaultChecked={false} value={`${index}`} />
              <Label
                htmlFor="option-one"
                className="whitespace-normal text-lg  font-normal leading-normal text-black"
              >
                {text}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
