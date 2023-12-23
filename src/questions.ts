import { Topic, type QuestionBank } from "./utils/types";

const questionBank: QuestionBank = [
  {
    id: 1,
    topic: Topic.SALES,
    subTopic: "Pitching",
    questions: [
      {
        type: "scale",
        question:
          "On a scale of 1 to 5, how confident do you feel pitching my services/products to a client.",
      },
      {
        type: "checklist",
        prompt: "Select all that apply. When pitching...",
        checklist: [
          {
            weighting: 2,
            content: "I have delivered an elevator pitch for myself",
          },
          { weighting: 2, content: "I have a deck/demo ready to use" },
          { weighting: 2, content: "Timeframe for payment" },
          { weighting: 2, content: "I have a updated CV/portfolio" },
          {
            weighting: 2,
            content: "I tailor my pitch according to the specific client",
          },
          {
            weighting: 2,
            content: "I can pitch my key products/services on demand",
          },
        ],
      },
      undefined,
    ],
  },
  {
    id: 2,
    topic: Topic.SALES,
    subTopic: "Business Development",
    questions: [
      {
        type: "scale",
        question: "How confident do you feel doing business development?",
      },
      {
        type: "checklist",
        prompt:
          "Select all that apply in relation to your business development.",
        checklist: [
          {
            weighting: 3,
            content: "I engage in developing my business regularly",
          },
          {
            weighting: 4,
            content: "I take a structures approach (e.g. set targets)",
          },
          {
            weighting: 3,
            content:
              "I have a contact list of past clients, leads and future clients",
          },
        ],
      },
      undefined,
    ],
  },
  {
    id: 3,
    topic: Topic.SALES,
    subTopic: "Negotiation",
    questions: [
      {
        type: "scale",
        question:
          "On a scale of 1 to 5, how confident do you feel negotiating with clients?",
      },
      {
        type: "checklist",
        prompt: "Select all that apply. When negotiating...",
        checklist: [
          {
            weighting: 2,
            content: "I know what my non-negotiatables are",
          },
          {
            weighting: 2,
            content: "I have a pricing strategy",
          },
          {
            weighting: 2,
            content: "I have a negotiation strategy",
          },
          {
            weighting: 2,
            content: "I understand my workload and capacity",
          },
          {
            weighting: 1,
            content:
              "I know how to adapt to different organisation's unique preferences for invoices, timesheets and payment processing",
          },
          {
            weighting: 1,
            content:
              "I can confidently handle objections and pushback during negotiations",
          },
        ],
      },
      undefined,
    ],
  },
  {
    id: 4,
    topic: Topic.SALES,
    subTopic: "Closing",
    questions: [
      {
        type: "scale",
        question:
          "I feel confident that my skills are translated through my chosen format of showing my work.",
      },
      {
        type: "checklist",
        prompt: "Which of the following best describes your sales:",
        singleAnswer: true,
        checklist: [
          {
            weighting: 10,
            content:
              "I have a good level of engagement, which translates to sales/paid opportunities",
          },
          {
            weighting: 7.5,
            content:
              "I have a good level of engagement, but this doesn't translate to sales/paid opportunities",
          },
          {
            weighting: 5,
            content:
              "I have a small engagment level, but this concerts to a sustainable level of sales/paid opportunities",
          },
          {
            weighting: 2.5,
            content:
              "I have a small engagment level, and this doesn't translate to a sustainable level of sales/paid opportunities",
          },
          {
            weighting: 0,
            content: "Not Applicable",
          },
        ],
      },
      undefined,
    ],
  },
];

export default questionBank;
