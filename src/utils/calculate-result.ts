import { groupWith, sum, sortBy, path } from "ramda";
import { type QuestionGroup, QuestionTypes } from "~/model/question";

export type Result = {
  topic: string;
  breakdown: {
    [k in string]: {
      confidence: { score: number; percentage: number };
      competence: { score: number; percentage: number };
      improvement: string[];
    };
  };
  overallResult: {
    confidence: { score: number; percentage: number };
    competence: { score: number; percentage: number };
  };
};
const sortByTopic = sortBy(path(["fields", "topic"]));
export const calculateResult = (b: QuestionGroup[]) => {
  if (!b) return;

  const bank = sortByTopic(
    removeFields(b as unknown as Record<string, unknown>),
  );

  const groupedSubTopic = groupWith(
    (a, b) => a.fields.subTopic === b.fields.subTopic,
    bank,
  );

  const groupedTopic = groupWith(
    (a, b) => a.fields.topic === b.fields.topic,
    bank,
  );
  const subTopic = groupedSubTopic.map(calculateScore);

  const result = groupedTopic.map(calculateScore).map((item) => {
    return {
      topic: item.topic,
      breakdown: subTopic.reduce((acc, curr) => {
        if (item.topic !== curr.topic) return acc;

        return {
          ...acc,
          [curr.subtopic]: {
            confidence: curr.confidence,
            competence: curr.competence,
            improvement: curr.improvement,
          },
        };
      }, {}),
      overallResult: {
        confidence: item.confidence,
        competence: item.competence,
      },
    };
  });

  return result as Result[];
};

export const resultByTopic = (
  result: Result[],
  topic: string,
  type: "confidence" | "competence",
) => {
  const found = result?.find((r) => r.topic === topic)?.overallResult?.[type]
    .percentage;

  return found ?? 0;
};

const calculateScore = (g) => {
  const confidenceNumber = g.reduce((acc, cur) => {
    const value = cur?.fields?.confidenceValue ?? 0;
    return acc + value;
  }, 0);

  const compNumber = g.reduce((acc, cur) => {
    const found = cur?.fields?.questions?.find(
      ({ fields }) => fields?.type === QuestionTypes.COMPETENCE,
    )?.fields;

    if (!found) return acc;

    const weighting = found.competenceChecklist
      .filter((c) => c.fields?.selected)
      .map((c) => c.fields?.weighting);

    const count = sum(weighting);

    return acc + count;
  }, 0);

  return {
    topic: g[0]?.fields.topic,
    subtopic: g[0]?.fields.subTopic,
    confidence: {
      score: confidenceNumber,
      percentage: (confidenceNumber / (g.length * 10)) * 100,
    },
    competence: {
      score: compNumber,
      percentage: (compNumber / (g.length * 10)) * 100,
    },
    improvement: (g[0]?.fields?.questions ?? [])
      .map((q) => {
        if (q.fields?.type === QuestionTypes.COMPETENCE) {
          return q.fields.competenceChecklist
            .map((c) => c.fields?.improvement)
            .filter(Boolean);
        }

        return [];
      })
      .flat(),
  };
};

function removeFields(obj: Record<string, unknown>): unknown {
  if (Array.isArray(obj)) {
    return obj.map(removeFields);
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (key !== "sys" && key !== "metadata") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        acc[key] = removeFields(value);
      }
      return acc;
    }, {} as unknown);
  } else {
    return obj;
  }
}
