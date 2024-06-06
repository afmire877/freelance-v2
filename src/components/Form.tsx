import useQuizStore from "~/store/quizStore";
import Step from "./Step";
import { Progress } from "./ui/progress";
import Spinner from "./Spinner";
import { useQuestions } from "~/hooks/useQuestions";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const Form = () => {
  const router = useRouter();
  const index = useQuizStore((state) => state.currentIndex);
  const bank = useQuizStore((state) => state.bank);
  const { error, data } = useQuestions();

  useEffect(() => {
    console.log(data, error);
    if (error) void router.push("/404");
  }, [error]);

  if (bank?.length === 0)
    return (
      <div className="flex h-screen max-w-7xl items-center justify-center text-center text-4xl">
        <div>
          <Spinner label="Loading...." />
        </div>
      </div>
    );

  const progress = (index / (bank?.length - 1)) * 100;

  return (
    <form className="h-screen p-5">
      <Progress value={progress} />
      {bank?.map((_, idx) => {
        if (idx !== index) return null;

        return <Step key={idx} />;
      })}
    </form>
  );
};
