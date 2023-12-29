import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

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
import useUserStore from "~/store/userStore";
import { useQuestions } from "~/hooks/useQuestions";
import { api } from "~/utils/api";
import Chart from "~/components/Chart";
import { type Result } from "../result";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export default function Dashboard() {
  const params = useParams<{ uuid: string }>();
  const router = useRouter();
  const { data, error } = api.submission.get.useQuery({ uuid: params.uuid });
  const [chartData, setChartData] = useState({
    confidence: [0, 0, 0, 0, 0, 0],
    competence: [0, 0, 0, 0, 0, 0],
  });

  if (error) return router.push("/404");

  const bank = data?.answers;
  const user = data?.score;

  console.log(data?.answers);

  const mutation = api.submission.create.useMutation();

  const calculateResult = () => {
    if (!bank) return;
    console.log(bank);
    const grouped = groupWith((a, b) => {
      return a.fields.topic === b.fields.topic;
    }, bank);

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

  return (
    <div className="mx-auto max-w-md overflow-hidden  font-inter md:max-w-full">
      <div className="self-center whitespace-nowrap p-4 text-3xl font-medium text-black  md:mx-6  md:my-10 md:pt-12 lg:text-5xl ">
        Intro to Freelance Quiz{" "}
      </div>
      <div className="md:flex">
        <div className="flex flex-col md:mx-10 md:shrink-0 md:py-20">
          <Chart
            competence={chartData.competence}
            confidence={chartData.confidence}
          />
        </div>
        <div className="p-8 ">
          <div className=" mt-6 text-3xl leading-8 text-black md:pb-4">
            <span className="text-black">Hello </span>
            <span className="text-pink-600">{user.name}, </span>
            <span className="text-black">
              here are your quiz results and answers:
            </span>
          </div>
          <Accordion
            type="single"
            collapsible
            className=" w-full lg:w-[1000px]  "
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="md:4xl text-2xl font-medium">
                Sales
              </AccordionTrigger>
              <AccordionContent className="tr w-3/4  text-xl">
                {data?.answers?.map((item, idx) => {
                  console.log("t", item);
                  return (
                    <div key={idx}>
                      <div className="py-2 text-pink-400 ">
                        {item.fields.confidenceQuestion}
                      </div>
                      <div className="">
                        Score: {item.fields.confidenceValue}
                      </div>

                      <div>
                        {item.fields.questions.map((q, idx) => {
                          return (
                            <div key={idx}>
                              <ul className=" py-2 text-pink-400">
                                <li>{q.fields.question}</li>
                                <li className="py-2 text-black ">
                                  {q.fields.text}
                                </li>
                              </ul>
                              {q.fields.competenceChecklist
                                ?.filter((obj) => Boolean(obj.fields.selected))
                                ?.map((obj, idx) => {
                                  if (!obj) return null;
                                  return (
                                    <div key={idx}>
                                      <ul className="list-inside list-disc text-black md:ml-3">
                                        <li>{obj?.fields?.text}</li>
                                      </ul>
                                    </div>
                                  );
                                })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-medium">
                Marketing
              </AccordionTrigger>
              <AccordionContent className="w-3/4 text-lg">
                {mockdata?.map((item, idx) => {
                  console.log("t", item);
                  return (
                    <div key={idx}>
                      <div className="py-2 text-pink-400 ">
                        {item.fields.confidenceQuestion}
                      </div>
                      <div className="">
                        Score: {item.fields.confidenceValue}
                      </div>

                      <div>
                        {item.fields.questions.map((q, idxs) => {
                          return (
                            <div key={idx}>
                              <ul className=" py-2 text-pink-400">
                                <li>{q.fields.question}</li>
                                <li className="py-2 text-black ">
                                  {q.fields.text}
                                </li>
                              </ul>
                              {q.fields.competenceChecklist
                                ?.filter((obj) => Boolean(obj.fields.selected))
                                .map((obj, idx) => {
                                  return (
                                    <div key={idx}>
                                      <ul className="list-inside list-disc text-black md:ml-3">
                                        <li>{obj.fields.text}</li>
                                      </ul>
                                    </div>
                                  );
                                })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xl font-medium">
                Portfolio
              </AccordionTrigger>
              <AccordionContent className="w-3/4 text-lg">
                {mockdata?.map((item, idx) => {
                  console.log("t", item);
                  return (
                    <div key={idx}>
                      <div className="py-2 text-pink-400 ">
                        {item.fields.confidenceQuestion}
                      </div>
                      <div className="">
                        Score: {item.fields.confidenceValue}
                      </div>

                      <div>
                        {item.fields.questions.map((q, idx) => {
                          return (
                            <div key={idx}>
                              <ul className=" py-2 text-pink-400">
                                <li>{q.fields.question}</li>
                                <li className="py-2 text-black ">
                                  {q.fields.text}
                                </li>
                              </ul>
                              {q.fields.competenceChecklist
                                ?.filter((obj) => Boolean(obj.fields.selected))
                                .map((obj, idx) => {
                                  return (
                                    <div key={idx}>
                                      <ul className="list-inside list-disc text-black md:ml-3">
                                        <li>{obj.fields.text}</li>
                                      </ul>
                                    </div>
                                  );
                                })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-xl font-medium">
                Admin
              </AccordionTrigger>
              <AccordionContent className="w-3/4 text-lg">
                {mockdata?.map((item, idx) => {
                  console.log("t", item);
                  return (
                    <div key={idx}>
                      <div className="py-2 text-pink-400 ">
                        {item.fields.confidenceQuestion}
                      </div>
                      <div className="">
                        Score: {item.fields.confidenceValue}
                      </div>

                      <div>
                        {item.fields.questions.map((q, idxs) => {
                          return (
                            <div key={idx}>
                              <ul className=" py-2 text-pink-400">
                                <li>{q.fields.question}</li>
                                <li className="py-2 text-black ">
                                  {q.fields.text}
                                </li>
                              </ul>
                              {q.fields.competenceChecklist
                                ?.filter((obj) => Boolean(obj.fields.selected))
                                .map((obj) => {
                                  return (
                                    <div key={idx}>
                                      <ul className="list-inside list-disc text-black md:ml-3">
                                        <li>{obj.fields.text}</li>
                                      </ul>
                                    </div>
                                  );
                                })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-xl font-medium">
                Legal
              </AccordionTrigger>
              <AccordionContent className="w-3/4 text-lg">
                {mockdata?.map((item, idx) => {
                  console.log("t", item);
                  return (
                    <div key={idx}>
                      <div className="py-2 text-pink-400 ">
                        {item.fields.confidenceQuestion}
                      </div>
                      <div className="">
                        Score: {item.fields.confidenceValue}
                      </div>

                      <div>
                        {item.fields.questions.map((q, idx) => {
                          return (
                            <div key={idx}>
                              <ul className=" py-2 text-pink-400">
                                <li>{q.fields.question}</li>
                                <li className="py-2 text-black ">
                                  {q.fields.text}
                                </li>
                              </ul>
                              {q.fields.competenceChecklist
                                ?.filter((obj) => Boolean(obj.fields.selected))
                                .map((obj, idx) => {
                                  return (
                                    <div key={idx}>
                                      <ul className="list-inside list-disc text-black md:ml-3">
                                        <li>{obj.fields.text}</li>
                                      </ul>
                                    </div>
                                  );
                                })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-xl font-medium">
                Financial Literacy
              </AccordionTrigger>
              <AccordionContent className="w-3/4 text-lg">
                {mockdata?.map((item, idx) => {
                  console.log("t", item);
                  return (
                    <div key={idx}>
                      <div className="py-2 text-pink-400 ">
                        {item.fields.confidenceQuestion}
                      </div>
                      <div className="">
                        Score: {item.fields.confidenceValue}
                      </div>

                      <div>
                        {item.fields.questions.map((q, idx) => {
                          return (
                            <div key={idx}>
                              <ul className=" py-2 text-pink-400">
                                <li>{q.fields.question}</li>
                                <li className="py-2 text-black ">
                                  {q.fields.text}
                                </li>
                              </ul>
                              {q.fields.competenceChecklist
                                ?.filter((obj) => Boolean(obj.fields.selected))
                                .map((obj) => {
                                  return (
                                    <div key={idx}>
                                      <ul className="list-inside list-disc text-black md:ml-3">
                                        <li>{obj.fields.text}</li>
                                      </ul>
                                    </div>
                                  );
                                })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
