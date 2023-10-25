import React from "react";
import useQuizStore from "~/store/quizStore";
import Arrow from "../assets/arrow.svg";
import Image from "next/image";

interface Props {
  question: string;
}

export default function ScaleQuestion({ question }: Props) {
  const currentIndex = useQuizStore((state) => state.currentIndex);
  const updateQuestionValue = useQuizStore(
    (state) => state.updateQuestionValue,
  );
  const scale = [
    "Very Confident",
    "Quite Confident",
    "Somewhat Confident",
    "Slightly Confident",
    "Not at all Confident",
  ].reverse();

  return (
    <div className="flex flex-col bg-white px-5">
      <div className="mt-10 flex w-[306px] max-w-full flex-col">
        <div className="ml-3 text-3xl font-bold leading-[112.5%] text-slate-950 max-md:ml-2.5">
          {question}
        </div>
        {scale.map((content, idx) => {
          return (
            <div
              key={idx}
              className="ml-3.5 mt-20 flex w-[154px] max-w-full items-start items-center gap-5 max-md:ml-2.5 max-md:mt-10"
            >
              <div className="">
                <input
                  // Just to make add up to 20
                  value={(idx + 1) * 4}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    updateQuestionValue({
                      index: currentIndex,
                      type: "scale",
                      value: Number(e.target.value),
                    });
                  }}
                  type="radio"
                  name="scale"
                  id={`scale-${idx}`}
                />
              </div>

              <label
                htmlFor={`scale-${idx}`}
                className="mt-1 text-lg text-black"
              >
                {content}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
