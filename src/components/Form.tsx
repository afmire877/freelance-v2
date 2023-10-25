import questionBank from "~/questions";
import useQuizStore from "~/store/quizStore";
import Step from "./Step";
import { Progress } from "./ui/progress";

export const Form = () => {
  const currentIndex = useQuizStore((state) => state.currentIndex);

  return (
    <form className="h-screen p-5">
      <Progress value={(currentIndex / (questionBank.length - 1)) * 100} />
      {questionBank.map(({ questions }, idx) => {
        if (idx !== currentIndex) return null;

        return <Step key={idx} questions={questions} />;
      })}
    </form>
  );
};
