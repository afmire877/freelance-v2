import { create } from "zustand";
import { type QuestionBank, type Question } from "~/utils/types";
import questionBank from "~/questions";

interface State {
  currentIndex: number;
  setCurrentIndex: (currentIndex: number) => void;
  bank: QuestionBank;
  updateQuestionValue: ({
    index,
    type,
  }: {
    index: number;
    type: "scale" | "checklist";
    value: number | boolean[];
  }) => void;

  questionId: number;
  setQuestionId: (questionId: number) => void;
}

const useQuizStore = create<State>()((set) => ({
  currentIndex: 0,
  setCurrentIndex: (currentIndex) => set({ currentIndex }),
  questionId: 1,
  setQuestionId: (questionId: number) => set({ questionId }),
  bank: questionBank,
  updateQuestionValue: ({ index, type, value }) =>
    set((state) => {
      const updatedBank = [...state.bank];
      const section = updatedBank[index];

      if (!section) return state;

      const [confidence, competance] = section.questions;

      if (type === "scale") {
        console.log("value", value);
        confidence.value = Number(value);
      }

      if (type === "checklist") {
        competance.checklist = competance?.checklist.map((item, index) => {
          const selected = (value as boolean[])[index];

          return {
            ...item,
            selected,
          };
        });
      }

      console.log("updatedBank", updatedBank);

      return { bank: updatedBank };
    }),
}));

export default useQuizStore;
