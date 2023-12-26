import useQuizStore from "~/store/quizStore";

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
    <div className="font-inter flex flex-col bg-white ">
      <div className="mt-10 flex w-[306px] max-w-full flex-col  ">
        <div className=" ml-3 w-[306px] break-words  text-3xl font-medium leading-[112.5%] text-slate-950 max-md:ml-2.5 ">
          {question}
        </div>
        {scale.map((content, idx) => {
          return (
            <div
              key={idx}
              className=" ml-3.5 mt-20 flex w-[154px] max-w-full items-baseline gap-5  max-md:ml-2.5 max-md:mt-10"
            >
              <div className="">
                <input
                  value={(idx + 1) * 2}
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
                className="mt-1 whitespace-nowrap  text-lg leading-normal text-black "
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
