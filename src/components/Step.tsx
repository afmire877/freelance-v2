import React, { type FormEvent, useState } from "react";
import {
  type ScaleQuestion as Scale,
  type ChecklistQuestion as Checklist,
  type TextQuestion,
} from "~/utils/types";
import ScaleQuestion from "./ScaleQuestion";
import ChecklistQuestion from "./ChecklistQuestion";
import useQuizStore from "~/store/quizStore";
import { Button } from "./ui/button";
import questionBank from "~/questions";
import { useRouter } from "next/router";
import { Radio } from "@radix-ui/react-radio-group";
import RadioQuestion from "./RadioQuestion";
import { TextBox } from "./TextBox";
import { ImageCheckbox } from "./ImageCheckbox";

type Props = {
  questions: [Scale, Checklist, TextQuestion?];
};

export default function Step({ questions }: Props) {
  const currentIndex = useQuizStore((state) => state.currentIndex);
  const setCurrentIndex = useQuizStore((state) => state.setCurrentIndex);

  const [step, setStep] = useState(1);
  const router = useRouter();

  const [scale, checklist] = questions;

  const handleNextBtn = async (e: FormEvent) => {
    e?.preventDefault();
    const isLastQuestion = currentIndex === questionBank.length - 1;

    if (step === 1) {
      return setStep(2);
    }

    if (step === 2 && isLastQuestion) {
      await router.push("/result");
      return;
    }

    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevBtn = (e: FormEvent) => {
    e?.preventDefault();

    if (step === 2) return setStep(1);

    setCurrentIndex(currentIndex + 1);
  };
  console.log(step);
  return (
    <div className="fle flex h-full flex-col justify-between">
      <div className="">
        {step === 1 && <TextBox />}
        {/* {step === 1 && <ImageCheckbox />} */}
        {/* {step === 1 && <ScaleQuestion question={scale.question} />} */}

        {step === 2 && (
          <>
            {checklist?.singleAnswer ? (
              <RadioQuestion
                prompt={checklist.prompt}
                checklist={checklist.checklist}
              />
            ) : (
              <ChecklistQuestion
                prompt={checklist.prompt}
                checklist={checklist.checklist}
              />
            )}
          </>
        )}
      </div>
      <div className=" flex justify-between px-2 py-4">
        <Button onClick={handlePrevBtn}>Prev</Button>
        <Button onClick={handleNextBtn}>Next</Button>
      </div>
    </div>
  );
}
