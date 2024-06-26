"use client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
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
import { useRouter } from "next/router";
import { groupWith } from "ramda";
import Chart from "~/components/Chart";
import Spinner from "~/components/Spinner";
import { Badge } from "~/components/ui/badge";
import { QuestionTypes, type QuestionGroup } from "~/model/question";
import { api } from "~/utils/api";
import { options } from "~/utils/contentful";
import { resultByTopic, type Result } from "~/utils/calculate-result";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const scale = {
  10: "Very Confident",
  7.5: "Quite Confident",
  5: "Somewhat Confident",
  2.5: "Slightly Confident",
  0: "Not at all Confident",
};

export default function Dashboard() {
  const params = useParams<{ uuid: string }>();
  const router = useRouter();
  const { data, error, isLoading } = api.submission.get.useQuery(
    { uuid: params?.uuid },
    { enabled: Boolean(params?.uuid) },
  );
  const [grouped, setGrouped] = useState<Record<string, QuestionGroup[]>>({});
  const [chartData, setChartData] = useState({
    confidence: [0, 0, 0, 0, 0, 0],
    competence: [0, 0, 0, 0, 0, 0],
  });

  const result = data?.submission.score as unknown as Result[];
  const user = data?.profiles;

  useEffect(() => {
    if (!data?.submission.answers) return;
    const g = groupWith(
      (a, b) => {
        return a.fields?.topic === b.fields?.topic;
      },
      data?.submission.answers,
    ).reduce((acc, cur) => {
      acc[cur[0].fields?.topic] = cur;

      return acc;
    }, {}) as Record<string, QuestionGroup[]>;

    setGrouped(g);

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
  }, [result, data?.submission.answers]);

  if (isLoading) return <Spinner />;

  if (error) return notFound();

  return (
    <div className="mx-auto max-w-md  font-inter md:max-w-full">
      <div className="w-full self-center whitespace-nowrap p-4 text-center text-3xl font-medium text-black  md:mx-6  md:my-10 md:pt-12 lg:text-5xl ">
        Freelance Quiz Report{" "}
      </div>
      <div className="md:flex">
        <div className="flex flex-col md:mx-10 md:shrink-0 md:py-20">
          <Chart
            competence={chartData.competence}
            confidence={chartData.confidence}
          />
        </div>
        <div className="p-8">
          <div className=" mt-6 text-3xl  leading-8 text-black md:pb-4">
            <span className="text-black">Hello </span>
            <span className="text-pink-600">{user?.name}, </span>
            <span className="text-black">
              here are your quiz results and answers:
            </span>
          </div>
          <div>
            <div className="mt-6  leading-8 text-black md:pb-4">
              <div className="mb-4  text-3xl text-black">
                Summary of Results:{" "}
              </div>
              <span className="">
                {result
                  .filter(
                    (result, index, array) =>
                      array.findIndex((t) => t.topic == result.topic) == index,
                  )
                  .map(
                    (
                      {
                        topic,
                        breakdown,
                        overallResult: { competence, confidence },
                      },
                      idx,
                    ) => {
                      if (!topic) return null;
                      return (
                        <p key={idx} className="py-5 text-base">
                          <h3 className="text-lg font-black text-pink-600">
                            {topic}:{" "}
                            <span className="font-light italic">
                              Overall Score {competence.percentage.toFixed()}%{" "}
                            </span>{" "}
                          </h3>
                          <div className="">
                            {Object.entries(breakdown)?.map(
                              ([subtopic, { confidence, competence }], idx) => {
                                if (subtopic === "undefined") return null;

                                return (
                                  <p key={idx} className="py-1">
                                    <span className="font-bold">
                                      {subtopic}
                                    </span>
                                    :{" "}
                                    <span className="mr-2 inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
                                      Confidence ({confidence.percentage}%)
                                    </span>
                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                      Competence ({competence.percentage}%)
                                    </span>
                                  </p>
                                );
                              },
                            )}
                          </div>
                        </p>
                      );
                    },
                  )}
              </span>
            </div>
          </div>
          <h2 className="my-5 text-3xl ">Here is a snapshot of the answers:</h2>
          <Accordion type="multiple" className=" w-full max-xl:w-[1000px]  ">
            {Object.entries(grouped)
              .reverse()
              .map(([topic, value], idx) => {
                if (topic === "undefined") return null;
                return (
                  <AccordionItem key={idx} value={`${idx}`}>
                    <AccordionTrigger className="md:4xl text-2xl font-medium">
                      {topic}
                    </AccordionTrigger>
                    <AccordionContent className="tr w-full  text-xl">
                      {value?.map((item, idx) => {
                        return (
                          <>
                            <AccordionItem
                              key={item?.sys?.id}
                              value={item.sys.id}
                            >
                              <AccordionTrigger className="py-2 text-left text-pink-400 ">
                                Q{idx + 1}
                                {") "} {item.fields?.confidenceQuestion}
                                <Badge>{item.fields?.subTopic}</Badge>
                              </AccordionTrigger>
                              <AccordionContent className="">
                                Answer:{" "}
                                {item?.fields?.confidenceValue
                                  ? scale[item?.fields?.confidenceValue]
                                  : `${item.fields?.confidenceValue}/10`}
                              </AccordionContent>
                            </AccordionItem>
                            {item.fields?.questions?.map((q) => {
                              return q.fields?.type === QuestionTypes.CHOICE ? (
                                <AccordionItem key={q.sys.id} value={q.sys.id}>
                                  <AccordionTrigger className="py-2 text-left text-pink-400">
                                    {q.fields?.question}
                                    <Badge>{item.fields?.subTopic}</Badge>
                                  </AccordionTrigger>

                                  <AccordionContent className="text-left text-pink-400">
                                    {q?.fields?.choiceQuestion &&
                                      documentToReactComponents(
                                        q?.fields?.choiceQuestion,
                                        options,
                                      )}
                                    <div key={idx} className="text-black">
                                      {q?.fields?.choiceQuestionValue ??
                                        "No answer"}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              ) : (
                                <AccordionItem
                                  key={q?.sys.id}
                                  value={q?.sys.id}
                                >
                                  <AccordionTrigger className="py-2 text-left text-pink-400">
                                    {q.fields?.question}{" "}
                                    <Badge>{item.fields?.subTopic}</Badge>
                                  </AccordionTrigger>

                                  <AccordionContent className="">
                                    {q.fields?.competenceChecklist
                                      ?.filter(({ fields }) =>
                                        Boolean(fields?.selected),
                                      )
                                      ?.map((obj, idx) => {
                                        return (
                                          <div key={idx}>
                                            <ul className="list-inside list-disc text-black md:ml-3">
                                              <li>{obj?.fields?.text}</li>
                                            </ul>
                                          </div>
                                        );
                                      })}
                                  </AccordionContent>
                                </AccordionItem>
                              );
                            })}
                          </>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
