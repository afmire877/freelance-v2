import { type Document } from "@contentful/rich-text-types/dist/types/types";

export interface QuestionGroups {
  items: QuestionGroup[];
}

export enum QuestionTypes {
  CHOICE = "Choice Question",
  COMPETENCE = "Competence Question",
  CONFIDENCE = "Confidence Question",
}

export interface QuestionGroup {
  sys: {
    id: string;
  };
  fields: {
    confidenceQuestion: string;
    confidenceValue?: number;
    questions: Question[];
    topic: string;
    subTopic: string;
  };
}

export interface Question {
  sys: {
    id: string;
  };
  fields: {
    question: string;
    type: QuestionTypes;
    competenceChecklist?: CompetenceChecklist[];
    singleAnswer?: boolean;
    choiceQuestion?: Document;
    choiceQuestionValue?: string;
    text?: string;
  };
}

export interface CompetenceChecklist {
  sys: {
    id: string;
  };
  fields: {
    text: string;
    weighting: number;
    selected?: boolean;
  };
}
