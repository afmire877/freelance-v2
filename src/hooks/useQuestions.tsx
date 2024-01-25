import { useQuery } from "@tanstack/react-query";
import { QuestionTypes } from "~/model/question";
import { getQuestions } from "~/services/contentful";
import useQuizStore from "~/store/quizStore";

export const useQuestions = () => {
  const response = useQuery(["question"], async () => await getQuestions());
  const setBank = useQuizStore((s) => s.setBank);
  const bank = useQuizStore((s) => s.bank);

  console.log(response.data);

  if (bank.length === 0 && response.data) {
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
  }

  return response;
};
