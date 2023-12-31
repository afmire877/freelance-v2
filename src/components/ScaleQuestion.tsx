import useQuizStore from "~/store/quizStore";

interface Props {
  question: string;
  confidenceValue?: number;
}
export const scale = {
  "Very Confident": 10,
  "Quite Confident": 7.5,
  "Somewhat Confident": 5,
  "Slightly Confident": 2.5,
  "Not at all Confident": 0,
};
export default function ScaleQuestion({ question, confidenceValue }: Props) {
  const currentIndex = useQuizStore((state) => state.currentIndex);
  const updateQuestionValue = useQuizStore(
    (state) => state.updateQuestionValue,
  );

  return (
    <div className="flex flex-col bg-white font-inter ">
      <div className="mt-10 flex w-[306px] max-w-full flex-col md:w-full md:px-2 lg:w-full  ">
        <div className="flex  w-[306px] break-words text-3xl font-medium leading-[112.5%] text-slate-950 max-md:ml-2.5 md:w-full md:text-4xl lg:w-full lg:text-5xl">
          {question}
        </div>
        {Object.entries(scale).map(([content, points], idx) => {
          return (
            <div
              key={idx}
              className=" ml-3.5 mt-10 flex max-w-full items-baseline gap-5  max-md:ml-2.5 max-md:mt-10"
            >
              <div className="">
                <input
                  value={points}
                  defaultChecked={confidenceValue === points}
                  onChange={(e) => {
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
