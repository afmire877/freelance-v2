export interface QuestionGroups {
  items: QuestionGroup[];
}

export enum QuestionTypes {
  CHOICE = "Choice Question",
  COMPETENCE = "Competence Question",
  CONFIDENCE = "Confidence Question",
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
    singleAnswer?: boolean;
    choiceQuestion?: string;
    choiceQuestionValue?: string;
  };
}

export interface CompetenceChecklist {
  fields: {
    text: string;
    weighting: number;
    selected?: boolean;
  };
}
