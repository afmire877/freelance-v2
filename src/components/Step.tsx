import { useRouter } from "next/router";
import { useState, type FormEvent } from "react";
import { QuestionTypes } from "~/model/question";
import useQuizStore from "~/store/quizStore";
import ChecklistQuestion from "./ChecklistQuestion";
import RadioQuestion from "./RadioQuestion";
import { TextBox } from "./TextBox";
import { ImageCheckbox } from "./ImageCheckbox";
import ScaleQuestion from "./ScaleQuestion";
import { Button } from "./ui/button";

export default function Step() {
  const currentIndex = useQuizStore((state) => state.currentIndex);
  const setCurrentIndex = useQuizStore((state) => state.setCurrentIndex);
  const bank = useQuizStore((state) => state.bank);

  const [step, setStep] = useState(1);
  const router = useRouter();

  if (!bank?.[currentIndex]) return null;

  const {
    fields: { confidenceQuestion, questions },
  } = bank?.[currentIndex];

  const checklist = questions.find(
    ({ fields }) => fields?.type === QuestionTypes.COMPETENCE,
  )?.fields;

  const handleNextBtn = async (e: FormEvent) => {
    e?.preventDefault();
    const isLastQuestion = currentIndex === bank?.length - 1;

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
  return (
    <div className="fle flex h-full flex-col justify-between">
      <div className="">
        {/* {step === 1 && <TextBox />} */}
        {/* {step === 1 && <ImageCheckbox />} */}
        {/* {step === 1 && <ScaleQuestion question={scale.question} />} */}
        {step === 1 && <ScaleQuestion question={confidenceQuestion} />}

        {step === 2 && (
          <>
            {checklist.singleAnswer ? (
              <RadioQuestion
                prompt={checklist.question}
                checklist={checklist.competenceChecklist}
              />
            ) : (
              <ChecklistQuestion
                prompt={checklist.question}
                checklist={checklist.competenceChecklist}
              />
            )}
          </>
        )}

        {step === 3 && <div></div>}
      </div>
      <div className=" flex justify-between px-2 py-4">
        <Button onClick={handlePrevBtn}>Prev</Button>
        <Button onClick={handleNextBtn}>Next</Button>
      </div>
    </div>
  );
}
