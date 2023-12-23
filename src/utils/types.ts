// export enum Topic {
//   SALES,
//   MARKETING,
//   FINANCE,
//   LEGAL,
//   ADMIN,
//   PORTFOLIO,
// }

// // if topic is sales, then subtopic can be  "pitching" | "invoicing" | "negotiating" | "closing" enfore this using types
// export enum SubTopic {
//   PITCHING,
//   INVOICING,
//   NEGOTIATING,
//   CLOSING,
// }

type SalesSubTopics =
  | "Pitching"
  | "Business Development"
  | "Negotiation"
  | "Closing"
  | "Preparation and research";
type MarketingSubTopics =
  | "Branding"
  | "Target market"
  | "Digital platforms"
  | "Marketing Strategy"
  | "Networking";
type FinanceSubTopics = "budgeting" | "forecasting" | "pricing" | "tax";
type LegalSubTopics = "contracts" | "ip" | "disputes" | "insurance";
type AdminSubTopics =
  | "time management"
  | "project management"
  | "networking"
  | "communication";
type PortfolioSubTopics = "website" | "social media" | "cv" | "Portfolio";

export enum Topic {
  SALES = "sales",
  MARKETING = "marketing",
  FINANCE = "finance",
  LEGAL = "legal",
  ADMIN = "admin",
  PORTFOLIO = "portfolio",
}

type TopicSubTopicsMap = {
  [Topic.SALES]: SalesSubTopics;
  [Topic.MARKETING]: MarketingSubTopics;
  [Topic.FINANCE]: FinanceSubTopics;
  [Topic.LEGAL]: LegalSubTopics;
  [Topic.ADMIN]: AdminSubTopics;
  [Topic.PORTFOLIO]: PortfolioSubTopics;
};
type SubTopic<T extends Topic> = TopicSubTopicsMap[T];

export type QuestionBank = Array<{
  id: number;
  topic: Topic;
  subTopic: SubTopic<Topic>;
  questions: [ScaleQuestion, ChecklistQuestion, TextQuestion?];
}>;

export type Question = ChecklistQuestion | ScaleQuestion | TextQuestion;

export type TextQuestion = {
  type: "text";
  question: string;
  value?: string;
};

export type ScaleQuestion = {
  type: "scale";
  question: string;
  value?: number;
};

export type ChecklistQuestion = {
  type: "checklist";
  prompt: string;
  checklist: Checklist[];
  singleAnswer?: boolean;
};

export interface Checklist {
  weighting: number;
  content: string;
  selected?: boolean;
}
