import { create } from "zustand";
import { type QuestionBank, type Question } from "~/utils/types";
import questionBank from "~/questions";
import { mountStoreDevtool } from "simple-zustand-devtools";

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

      const [confidence, competence] = section.questions;

      if (type === "scale") confidence.value = Number(value);
      console.log("value", value, type);

      if (type === "checklist") {
        competence.checklist = competence?.checklist.map((item, index) => {
          const selected = (value as boolean[])[index];

          return { ...item, selected };
        });
      }

      return { bank: updatedBank };
    }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("QuizStore", useQuizStore);
}

export default useQuizStore;
