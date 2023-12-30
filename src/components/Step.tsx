import Image from "next/image";
import { useRouter } from "next/router";
import { useState, type FormEvent, useEffect } from "react";
import { QuestionTypes } from "~/model/question";
import useQuizStore from "~/store/quizStore";
import ArrowLeft from "../assets/arrow-left.svg";
import ArrowRight from "../assets/arrow-right.svg";
import ChecklistQuestion from "./ChecklistQuestion";
import RadioQuestion from "./RadioQuestion";
import ScaleQuestion from "./ScaleQuestion";
import { TextBox } from "./TextBox";
import { Badge } from "./ui/badge";

export default function Step() {
  const router = useRouter();
  const currentIndex = useQuizStore((state) => state.currentIndex);
  const step = useQuizStore((state) => state.step);
  const setStep = useQuizStore((state) => state.setStep);
  const setCurrentIndex = useQuizStore((state) => state.setCurrentIndex);
  const bank = useQuizStore((state) => state.bank);

  const isFirst = currentIndex === 0 && step === 0;

  if (!bank?.[currentIndex]) return null;

  const {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fields: { confidenceQuestion, questions, confidenceValue },
  } = bank?.[currentIndex];

  const list = [
    {
      type: QuestionTypes.CONFIDENCE,
      question: confidenceQuestion,
      confidenceValue,
    },
    ...questions.map((item) => ({ type: item.fields?.type, ...item.fields })),
  ];

  const handleNextBtn = async (e: FormEvent) => {
    e?.preventDefault();
    const isLastQuestion = currentIndex === bank?.length - 1;

    if (list.length - 1 !== step) return setStep(step + 1);

    if (list.length - 1 === step && isLastQuestion) {
      await router.push("/result");
      return;
    }

    setCurrentIndex(currentIndex + 1);
    setStep(0);
  };

  const handlePrevBtn = (e: FormEvent) => {
    e?.preventDefault();

    if (step !== 0) return setStep(step - 1);

    setCurrentIndex(currentIndex - 1);
    setStep(bank?.[currentIndex - 1]?.fields.questions.length ?? 0);
  };

  return (
    <div className="fle flex h-full flex-col justify-between">
      <div className="">
        <div>
          <Badge>
            {step + 1}/{list.length}
          </Badge>
        </div>
        {list.map((item, idx) => {
          if (idx !== step) return null;
          if (item.type === QuestionTypes.CONFIDENCE) {
            return <ScaleQuestion key={idx} {...item} />;
          }

          if (item.type === QuestionTypes.COMPETENCE) {
            return item?.singleAnswer ? (
              <RadioQuestion {...item} />
            ) : (
              <ChecklistQuestion {...item} />
            );
          }
          if (item.type === QuestionTypes.CHOICE) return <TextBox {...item} />;
          return null;
        })}
      </div>
      <div className="flex justify-between px-2 py-4">
        {!isFirst ? (
          <div
            onClick={handlePrevBtn}
            className="flex items-baseline gap-4 text-lg hover:border-b-2 hover:border-pink-600"
          >
            <Image src={ArrowLeft} alt="" height={20} width={20} />
            <div>Prev</div>
          </div>
        ) : (
          <div />
        )}
        <div
          onClick={handleNextBtn}
          className="flex items-baseline gap-4 text-lg hover:border-b-2 hover:border-pink-600"
        >
          <div>Next</div>
          <Image src={ArrowRight} alt="" height={20} width={20} />
        </div>
      </div>
    </div>
  );
}
