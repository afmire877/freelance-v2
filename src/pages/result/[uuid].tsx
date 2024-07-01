import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { notFound, useParams } from "next/navigation";
import Chart from "~/components/Chart";
import { TopicScore } from "~/components/topic-score/topic-score";
import { useQuestions } from "~/hooks/useQuestions";
import useUserStore from "~/store/userStore";
import { api } from "~/utils/api";
import { resultByTopic, type Result } from "~/utils/calculate-result";
import Spinner from "~/components/Spinner";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export default function Result() {
  const setResult = useUserStore((s) => s.setResult);
  const params = useParams<{ uuid: string }>();
  const { data, error, isLoading, refetch } = api.submission.get.useQuery(
    { uuid: params?.uuid },
    { enabled: Boolean(params?.uuid) },
  );

  const { error: errorQuestion } = useQuestions();
  const [chartData, setChartData] = useState({
    confidence: [0, 0, 0, 0, 0, 0],
    competence: [0, 0, 0, 0, 0, 0],
  });

  useEffect(() => {
    if (!data) return;
    setResult(data?.submission.score as unknown as Result[]);
  }, [data?.profiles, data?.submission.score, setResult]);

  const result = data?.submission.score as unknown as Result[];
  const user = data?.profiles;

  useEffect(() => {
    if (!result) return;
    setChartData({
      confidence: [
        resultByTopic(result, "Sales", "confidence"),
        resultByTopic(result, "Marketing", "confidence"),
        resultByTopic(result, "Finance", "confidence"),
        resultByTopic(result, "Legal", "confidence"),
        resultByTopic(result, "Admin", "confidence"),
        resultByTopic(result, "Portfolio", "confidence"),
      ],
      competence: [
        resultByTopic(result, "Sales", "competence"),
        resultByTopic(result, "Marketing", "competence"),
        resultByTopic(result, "Finance", "competence"),
        resultByTopic(result, "Legal", "competence"),
        resultByTopic(result, "Admin", "competence"),
        resultByTopic(result, "Portfolio", "competence"),
      ],
    });
  }, [result]);

  useEffect(() => {
    (async () => {
      await refetch();
    })();
  }, [params?.uuid]);

  if (!isLoading) {
    return (
      <div className="flex h-screen max-w-7xl items-center justify-center text-center text-4xl">
        <div>
          <Spinner label="Loading...." />
        </div>
      </div>
    );
  }

  if (error || errorQuestion) return notFound();

  return (
    <div className="mx-auto max-w-7xl  font-inter  ">
      <div className="w-full self-center whitespace-nowrap p-4 text-center text-3xl font-medium text-black  md:mx-6  md:my-10 md:pt-12 lg:text-5xl ">
        Freelance Quiz Result{" "}
      </div>
      <div className=" md:flex">
        <div className="flex flex-col md:mx-10 md:shrink-0 md:py-20">
          <Chart
            competence={chartData.competence}
            confidence={chartData.confidence}
          />

          <div className="my-10">
            <div className=" mt-6 text-3xl leading-8 text-black md:pb-4">
              <span className="text-black">Check out these resources:</span>
            </div>
          </div>
          <div className="flex justify-between gap-4 font-inter text-white">
            <a
              target="_blank"
              href="https://calendly.com/localchampions/freelance-exchange"
              className="flex w-full items-center  justify-center bg-pink-500 p-10 text-center"
            >
              Contact Coach
            </a>
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

        <div className="my-20 w-full">
          <div className="">
            <div className=" mt-6 text-3xl leading-8 text-black md:pb-4">
              <span className="text-black">Hello </span>
              <span className="text-pink-600">{user?.name}, </span>
              <span className="text-black">
                here are a snapshot of Quiz results:
              </span>
            </div>
          </div>
          <p className="my-10 w-full text-3xl ">Summary of Results:</p>
          <TopicScore />
        </div>
      </div>
    </div>
  );
}
