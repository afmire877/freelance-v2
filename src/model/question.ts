export interface QuestionGroups {
  items: QuestionGroup[];
}

export enum QuestionTypes {
  CHOICE = "Choice Question",
  COMPETENCE = "Competence Question",
}

export interface QuestionGroup {
  fields: {
    confidenceQuestion: string;
    questions: Question[];
    topic: string;
    subTopic: string;
  };
}

export interface Question {
  fields: {
    question: string;
    type: QuestionTypes;
    competenceChecklist?: CompetenceChecklist[];
  };
}

export interface CompetenceChecklist {
  fields: {
    text: string;
    weighting: number;
  };
}