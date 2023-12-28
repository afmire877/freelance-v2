import useQuizStore from "~/store/quizStore";
import Step from "./Step";
import { Progress } from "./ui/progress";

export const Form = () => {
  const index = useQuizStore((state) => state.currentIndex);
  const bank = useQuizStore((state) => state.bank);

  if (!bank) return <p>Loading...</p>;

  const progress = (index / (bank?.length - 1)) * 100;

  return (
    <form className="h-screen p-5">
      <Progress value={progress} />
      {bank.map((_, idx) => {
        if (idx !== index) return null;

        return <Step key={idx} />;
      })}
    </form>
  );
};
