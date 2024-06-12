import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { QuestionTypes, type QuestionGroup } from "~/model/question";
import { getQuestions } from "~/services/contentful";
import useQuizStore from "~/store/quizStore";
import { api } from "~/utils/api";

export const useQuestions = () => {
  const response = useQuery(["question"], async () => await getQuestions());
  const setBank = useQuizStore((s) => s.setBank);
  const setCurrentIndex = useQuizStore((s) => s.setCurrentIndex);
  const bank = useQuizStore((s) => s.bank);
  const router = useRouter();
  const uuid = router.query.uuid as string;
  const { data, error } = api.submission.get.useQuery(
    { uuid },
    { enabled: !!uuid },
  );

  useEffect(() => {
    console.log(data, error);
    if (error) void router.push("/404");
  }, [error]);

  useEffect(() => {
    const answers = data?.submission?.answers as QuestionGroup[];
    const isComplete = data?.submission?.isComplete;

    if (!isComplete && answers && answers?.length !== 0 && !error) {
      const index = data?.submission?.currentQuestionIndex ?? 0;
      setBank(answers ?? []);
      setCurrentIndex(index);
      return;
    }

    if (bank && bank?.length === 0 && response.data) {
      const bank = response?.data.map((item) => {
        const questions = item?.fields?.questions.map((question) => {
          if (question?.fields?.type !== QuestionTypes.CHOICE) return question;

          return {
            ...question,
            fields: {
              ...question.fields,
              choiceQuestionValue: "",
            },
          };
        });
        return {
          ...item,
          fields: {
            ...item.fields,
            confidenceValue: 0,
            questions,
          },
        };
      });
      setBank(bank);

      return;
    }
  }, [response.data, data?.submission?.currentQuestionIndex]);

  return response;
};
