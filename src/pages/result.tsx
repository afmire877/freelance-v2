import { useEffect, useState } from "react";

import { groupWith, sum } from "ramda";
import { mockdata } from "~/components/mockdata";
import { QuestionTypes } from "~/model/question";
import useQuizStore from "~/store/quizStore";

import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import Chart from "~/components/Chart";
import { useQuestions } from "~/hooks/useQuestions";
import useUserStore from "~/store/userStore";
import { api } from "~/utils/api";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export type Result = {
  topic: string;
  confidence: {
    score: number;
    percentage: number;
  };
  competence: {
    score: number;
    percentage: number;
  };
};

export default function Result() {
  const bank = useQuizStore((s) => s.bank);
  const user = useUserStore((s) => s.user);
  const _ = useQuestions();
  const [chartData, setChartData] = useState({
    confidence: [0, 0, 0, 0, 0, 0],
    competence: [0, 0, 0, 0, 0, 0],
  });

  const mutation = api.submission.create.useMutation();

  const calculateResult = () => {
    if (!bank) return;
    console.log(bank);
    const grouped = groupWith((a, b) => {
      return a.fields.topic === b.fields.topic;
    }, bank);
    console.log("g", grouped);

    const result: Result[] = grouped.map((g) => {
      const confidenceNumber = g.reduce((acc, cur) => {
        const value = cur?.fields.confidenceValue ?? 0;
        return acc + value;
      }, 0);

      const compNumber = g.reduce((acc, cur) => {
        const found = cur?.fields.questions.find(
          ({ fields }) => fields?.type === QuestionTypes.COMPETENCE,
        )?.fields;
        console.log("found", found);

        if (!found) return acc;

        const weighting = found.competenceChecklist
          .filter((c) => c.fields.selected)
          .map((c) => c.fields.weighting);

        const count = sum(weighting);

        return acc + count;
      }, 0);

      return {
        topic: g[0]?.fields.topic,
        confidence: {
          score: confidenceNumber,
          percentage: (confidenceNumber / (g.length * 10)) * 100,
        },
        competence: {
          score: compNumber,
          percentage: (compNumber / (g.length * 10)) * 100,
        },
      };
    });

    mutation.mutate({ result, user, answers: bank });

    const resultByTopic = (topic, type: "confidence" | "competence") => {
      return result.find((r) => r.topic === topic)?.[type].percentage ?? 0;
    };

    setChartData({
      confidence: [
        resultByTopic("Sales", "confidence"),
        resultByTopic("Marketing", "confidence"),
        resultByTopic("Finance", "confidence"),
        resultByTopic("Legal", "confidence"),
        resultByTopic("Admin", "confidence"),
        resultByTopic("Portfolio", "confidence"),
      ],
      competence: [
        resultByTopic("Sales", "competence"),
        resultByTopic("Marketing", "competence"),
        resultByTopic("Finance", "competence"),
        resultByTopic("Legal", "competence"),
        resultByTopic("Admin", "competence"),
        resultByTopic("Portfolio", "competence"),
      ],
    });
  };

  useEffect(() => calculateResult(), [bank]);
  console.log("mock", mockdata[0]?.fields);

  return (
    <div className="mx-auto max-w-md overflow-hidden  font-inter md:max-w-full">
      <div className="p-8 ">
        <div className=" mt-6 text-3xl leading-8 text-black md:pb-4">
          <span className="text-black">Hello </span>
          <span className="text-pink-600">{user.name}, </span>
          <span className="text-black">
            here are a spanshot of quiz results:
          </span>
        </div>
      </div>
      <div className=" md:flex">
        <div className="flex flex-col md:mx-10 md:shrink-0 md:py-20">
          <Chart
            competence={chartData.competence}
            confidence={chartData.confidence}
          />
        </div>

        <div className="my-20 ">
          <p className="mt-10 w-full">
            You will be assigned a Coach to discuss this result with you.
          </p>
          <div className="my-10">
            <div className=" mt-6 text-3xl leading-8 text-black md:pb-4">
              <span className="text-black">Check out these resources:</span>
            </div>
          </div>
          <div className="flex justify-between gap-4 font-inter text-white">
            <div className="flex w-full items-center  justify-center bg-pink-500 p-10 text-center">
              Contact Coach
            </div>
            <a
              className="flex w-full items-center justify-center bg-pink-500 p-10"
              target="_blank"
              href="https://goodgrowthhub.org.uk/events"
            >
              <div
                role="button"
                className="flex w-full items-center justify-center  text-center"
              >
                Check out our Masterclasses
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
