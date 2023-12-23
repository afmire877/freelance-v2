import questionBank from "~/questions";
import useQuizStore from "~/store/quizStore";
import Step from "./Step";
import { Progress } from "./ui/progress";

export const Form = () => {
  const index = useQuizStore((state) => state.currentIndex);
  const progress = (index / (questionBank.length - 1)) * 100;

  return (
    <form className="h-screen p-5">
      <Progress value={progress} />
      {questionBank.map(({ questions }, idx) => {
        if (idx !== index) return null;

        return <Step key={idx} questions={questions} />;
      })}
    </form>
  );
};
