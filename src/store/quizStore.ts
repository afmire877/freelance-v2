import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { QuestionTypes, type QuestionGroup } from "~/model/question";

interface State {
  currentIndex: number;
  setCurrentIndex: (currentIndex: number) => void;
  bank: QuestionGroup[];
  updateQuestionValue: ({
    index,
    type,
  }: {
    index: number;
    type: "scale" | "checklist";
    value: number | boolean[];
  }) => void;

  questionId: number;
  setBank: (bank: QuestionGroup[]) => void;
  setQuestionId: (questionId: number) => void;
}

const useQuizStore = create<State>()((set) => ({
  currentIndex: 0,
  setCurrentIndex: (currentIndex) => set({ currentIndex }),
  questionId: 1,
  setQuestionId: (questionId: number) => set({ questionId }),
  bank: [],
  setBank: (bank: QuestionGroup[]) => set({ bank }),
  updateQuestionValue: ({ index, type, value }) =>
    set((state) => {
      const updatedBank = [...state.bank];
      const section = updatedBank?.[index];

      if (!section) return state;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (type === "scale") section.fields.confidenceValue = Number(value);

      if (type === "checklist") {
        const checklistIndex = section.fields.questions.findIndex(
          ({ fields }) => fields?.type === QuestionTypes.COMPETENCE,
        );

        const checklist =
          section.fields.questions?.[checklistIndex]?.fields
            .competenceChecklist;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        section.fields.questions[checklistIndex].fields.competenceChecklist =
          checklist?.map((item, index) => {
            const selected = (value as boolean[])[index];

            return {
              ...item,
              fields: {
                ...item.fields,
                selected,
              },
            };
          });
      }

      return { bank: updatedBank };
    }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("QuizStore", useQuizStore);
}

export default useQuizStore;
