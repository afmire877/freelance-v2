import { Topic, type QuestionBank } from "./utils/types";

const questionBank: QuestionBank = [
  {
    id: 1,
    topic: Topic.SALES,
    questions: [
      {
        type: "scale",
        question:
          "On a scale of 1 to 5, how well do you handle customer inquiries?",
      },
      {
        type: "checklist",
        prompt: "Select all that apply. When invoicing, I include:",
        checklist: [
          { weighting: 6, content: "Account number + sort code" },
          { weighting: 4, content: "Service description" },
          { weighting: 4, content: "Timeframe for payment" },
          { weighting: 4, content: "Invoice Number" },
          { weighting: 2, content: "Use an invoicing tool" },
        ],
      },
    ],
  },
  {
    id: 2,
    topic: Topic.SALES,
    questions: [
      {
        type: "scale",
        question:
          "How confident do you feel pitching your services/products to a client?",
      },
      {
        type: "checklist",
        prompt: "Select all that apply. When invoicing, I include:",
        checklist: [
          {
            weighting: 6,
            content: "I have delivered an elevator pitch for myself",
          },
          {
            weighting: 3,
            content: "I have a deck ready in preparation to use",
          },
          { weighting: 5, content: "I have an up-to-date CV/portfolio" },
          {
            weighting: 4,
            content: "I tailor my pitch according to the specific client",
          },
          {
            weighting: 2,
            content: "I can pitch my key products/services on demand",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    topic: Topic.PORTFOLIO,
    questions: [
      {
        type: "scale",
        question:
          "I feel confident that the portfolio I have built translates my craft, skills or experience",
      },
      {
        type: "checklist",
        prompt:
          "I have a digital, publically available platform that articulates what I do",
        checklist: [
          {
            weighting: 5,
            content: "Website",
          },
          {
            weighting: 5,
            content: "Spotify/Mixcloud",
          },
          { weighting: 5, content: "Vimeo" },
          {
            weighting: 5,
            content: "Instagram",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    topic: Topic.PORTFOLIO,
    questions: [
      {
        type: "scale",
        question:
          "I feel confident that my skills are translated through my chosen format of showing my work.",
      },
      {
        type: "checklist",
        prompt:
          "My portfolio consists of/ I have the following documentation to hand",
        checklist: [
          {
            weighting: 3,
            content: "Experience/ Career History",
          },
          {
            weighting: 5,
            content: "previous work that I can share with a potential client",
          },
          {
            weighting: 4,
            content:
              "Previous work in a public location that a potential client could see, and then approach me",
          },
          {
            weighting: 2,
            content: "Biography",
          },
          {
            weighting: 4,
            content: "Core Skills",
          },
          {
            weighting: 2,
            content: "Preferred ways of working",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    topic: Topic.PORTFOLIO,
    questions: [
      {
        type: "scale",
        question: "I feel confident asking for feedback from peers or clients",
      },
      {
        type: "checklist",
        prompt: "How often do you ask for feedback on your portfolio?",
        checklist: [
          {
            weighting: 5,
            content:
              "I regularly seek feedback on my portfolio, typically after each major project.",
          },
          {
            weighting: 5,
            content:
              "I ask for feedback on my portfolio occasionally, perhaps once or twice a year.",
          },
          {
            weighting: 5,
            content:
              "I rarely seek feedback on my portfolio, only when I make significant changes.",
          },
          {
            weighting: 5,
            content: "I have never asked for feedback on my portfolio.",
          },
        ],
      },
    ],
  },
];

export default questionBank;
