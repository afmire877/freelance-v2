import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "~/services/contentful";
import useQuizStore from "~/store/quizStore";

export const useQuestions = () => {
  const response = useQuery(["question"], async () => await getQuestions());
  const setBank = useQuizStore((s) => s.setBank);
  const bank = useQuizStore((s) => s.bank);

  if (bank.length === 0 && response.data) {
    const bank = response?.data.map((item) => {
      return {
        ...item,
        fields: { ...item.fields, confidenceValue: 0 },
      };
    });
    setBank(bank);
  }

  return response;
};
