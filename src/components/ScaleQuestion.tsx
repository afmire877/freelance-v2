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
  console.log("scale");
  return (
    <div className="font-inter flex flex-col bg-white ">
      <div className="mt-10 flex w-[306px] max-w-full flex-col md:w-full md:px-2 lg:w-full  ">
        <div className="flex  w-[306px] break-words text-3xl font-medium leading-[112.5%] text-slate-950 max-md:ml-2.5 md:w-full md:text-4xl lg:w-full lg:text-5xl">
          {question}
        </div>
        {scale.map((content, idx) => {
          return (
            <div
              key={idx}
              className=" ml-3.5 mt-10 flex max-w-full items-baseline gap-5  max-md:ml-2.5 max-md:mt-10"
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
                  className="accent-pink-600"
                />
              </div>

              <label
                htmlFor={`scale-${idx}`}
                className="mt-1 whitespace-nowrap  text-lg leading-normal text-black hover:border-b-2 hover:border-pink-600 lg:text-2xl "
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
