export enum Topic {
  SALES,
  MARKETING,
  FINANCE,
  LEGAL,
  ADMIN,
  PORTFOLIO,
}

export type QuestionBank = {
  id: number;
  topic: Topic;
  questions: [ScaleQuestion, ChecklistQuestion];
}[];

export type Question = ChecklistQuestion | ScaleQuestion;

export type ScaleQuestion = {
  type: "scale";
  question: string;
  value?: number;
};

export type ChecklistQuestion = {
  type: "checklist";
  prompt: string;
  checklist: Checklist[];
};

export interface Checklist {
  weighting: number;
  content: string;
  selected?: boolean;
}
