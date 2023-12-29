import Image from "next/image";
import { useRouter } from "next/router";
import { useState, type FormEvent } from "react";
import { QuestionTypes } from "~/model/question";
import useQuizStore from "~/store/quizStore";
import ArrowLeft from "../assets/arrow-left.svg";
import ArrowRight from "../assets/arrow-right.svg";
import ChecklistQuestion from "./ChecklistQuestion";
import RadioQuestion from "./RadioQuestion";
import ScaleQuestion from "./ScaleQuestion";
import { TextBox } from "./TextBox";

export default function Step() {
  const currentIndex = useQuizStore((state) => state.currentIndex);
  const setCurrentIndex = useQuizStore((state) => state.setCurrentIndex);
  const bank = useQuizStore((state) => state.bank);

  const [step, setStep] = useState(1);
  const router = useRouter();

  if (!bank?.[currentIndex]) return null;

  const {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fields: { confidenceQuestion, questions },
  } = bank?.[currentIndex];

  const checklist = questions.find(
    ({ fields }) => fields?.type === QuestionTypes.COMPETENCE,
  )?.fields;

  const handleNextBtn = async (e: FormEvent) => {
    e?.preventDefault();
    const isLastQuestion = currentIndex === bank?.length - 1;

    if (step === 1) return setStep(2);
    // if (step === 2) return setStep(3);

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
        {/* {step === 1 && <ImageCheckbox />}       */}

        {/* {step === 1 && <ScaleQuestion question={scale.question} />} */}
        {step === 1 && <ScaleQuestion question={confidenceQuestion} />}

        {/* {step === 2 && (
          <>
            {questions.map((q, idx) => {
              const type = q.fields.type;

              if (type === QuestionTypes.COMPETENCE) {
                return (
                  <>
                    {checklist?.singleAnswer ? (
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
                );
              }

              if (type === QuestionTypes.CHOICE) {
                return <TextBox key={idx} />;
              }
            })}
          </>
        )} */}

        {step === 2 && (
          <>
            {checklist?.singleAnswer ? (
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

        {step === 3 && <TextBox />}
      </div>
      <div className=" flex justify-between px-2 py-4">
        <div
          onClick={handlePrevBtn}
          className="flex items-baseline gap-4 text-lg hover:border-b-2 hover:border-pink-600"
        >
          <Image src={ArrowLeft} alt="" height={20} width={20} />
          <div>Prev</div>
        </div>
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
