import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";

import { groupWith, sum } from "ramda";
import SubRadar from "~/components/subRadar";
import { Button } from "~/components/ui/button";
import useQuizStore from "~/store/quizStore";
import { QuestionTypes } from "~/model/question";
import Image from "next/image";
import { mockdata } from "~/components/mockdata";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

type Result = {
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

  const [confidence, setConfidence] = useState(0);
  const [competence, setCompetence] = useState(0);
  const [showSecond, setShowSecond] = useState(false);

  const calculateResult = () => {
    if (!bank) return;
    console.log(bank);
    const grouped = groupWith((a, b) => {
      return a.fields.topic === b.fields.topic;
    }, bank);
    console.log("g", grouped);

    const result: Result[] = grouped.map((g) => {
      // console.log(
      //   "confidence",
      //   g.map((item) => item.questions[0].value),
      // );
      const confidenceNumber = g.reduce((acc, cur) => {
        const value = cur?.fields.confidenceValue ?? 0;
        return acc + value;
      }, 0);

      // console.log(
      //   "competence",
      //   g.map((item) =>
      //     item.questions[1].checklist
      //       .filter((c) => c.selected)
      //       .map((c) => c.weighting)
      //       .flat(),
      //   ),
      // );

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

    console.log("result", result);

    setConfidence(result[0]?.confidence.percentage ?? 0);

    setCompetence(result[0]?.competence.percentage ?? 0);
  };

  useEffect(() => calculateResult(), [bank]);
  console.log("mock", mockdata[0]?.fields);

  return (
    <div className="font-inter mx-auto max-w-md  overflow-hidden md:max-w-full">
      <div className="self-center whitespace-nowrap p-4 text-3xl font-medium text-black  md:mx-6  md:my-10 md:pt-12 lg:text-5xl ">
        Intro to Freelance Quiz{" "}
      </div>
      <div className="md:flex">
        <div className="flex flex-col md:mx-10 md:shrink-0 md:py-20">
          {showSecond ? (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <SubRadar onClick={() => setShowSecond(!showSecond)} />
          ) : (
            <Radar
              className="lg:mx-20 lg:w-[400px]"
              onClick={() => setShowSecond(!showSecond)}
              data={{
                labels: [
                  "SALES",
                  "MARKETING",
                  "FINANCE",
                  "LEGAL",
                  "ADMIN",
                  "PORTFOLIO",
                ],
                datasets: [
                  {
                    label: "Confidence",
                    data: [confidence, 0, 0, 0, 0, 90],
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgb(255, 99, 132)",
                    pointBackgroundColor: "rgb(255, 99, 132)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgb(255, 99, 132)",
                  },
                  {
                    label: "Competence",
                    data: [competence, 0, 0, 0, 0, 50],
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgb(54, 162, 235)",
                    pointBackgroundColor: "rgb(54, 162, 235)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgb(54, 162, 235)",
                  },
                ],
              }}
            />
          )}
        </div>
        <div className="p-8 ">
          <div className=" mt-6 text-3xl leading-8 text-black md:pb-4">
            <span className="text-black">Hello </span>
            <span className="text-pink-600">Toyin, </span>
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
                {mockdata?.map((item, idx) => {
                  console.log("t", item);
                  return (
                    <div>
                      <div className="py-2 text-pink-400 ">
                        {item.fields.confidenceQuestion}
                      </div>
                      <div className="">
                        Score: {item.fields.confidenceValue}
                      </div>

                      <div>
                        {item.fields.questions.map((q, idxs) => {
                          return (
                            <div>
                              <ul className=" py-2 text-pink-400">
                                <li>{q.fields.question}</li>
                                <li className="py-2 text-black ">
                                  {q.fields.text}
                                </li>
                              </ul>
                              {q.fields.competenceChecklist
                                ?.filter((obj) => Boolean(obj.fields.selected))
                                .map((obj) => {
                                  console.log("iss", obj);
                                  return (
                                    <div>
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
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-medium">
                Marketing
              </AccordionTrigger>
              <AccordionContent className="w-3/4 text-lg">
                {mockdata?.map((item, idx) => {
                  console.log("t", item);
                  return (
                    <div>
                      <div className="py-2 text-pink-400 ">
                        {item.fields.confidenceQuestion}
                      </div>
                      <div className="">
                        Score: {item.fields.confidenceValue}
                      </div>

                      <div>
                        {item.fields.questions.map((q, idxs) => {
                          return (
                            <div>
                              <ul className=" py-2 text-pink-400">
                                <li>{q.fields.question}</li>
                                <li className="py-2 text-black ">
                                  {q.fields.text}
                                </li>
                              </ul>
                              {q.fields.competenceChecklist
                                ?.filter((obj) => Boolean(obj.fields.selected))
                                .map((obj) => {
                                  console.log("iss", obj);
                                  return (
                                    <div>
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
                    <div>
                      <div className="py-2 text-pink-400 ">
                        {item.fields.confidenceQuestion}
                      </div>
                      <div className="">
                        Score: {item.fields.confidenceValue}
                      </div>

                      <div>
                        {item.fields.questions.map((q, idxs) => {
                          return (
                            <div>
                              <ul className=" py-2 text-pink-400">
                                <li>{q.fields.question}</li>
                                <li className="py-2 text-black ">
                                  {q.fields.text}
                                </li>
                              </ul>
                              {q.fields.competenceChecklist
                                ?.filter((obj) => Boolean(obj.fields.selected))
                                .map((obj) => {
                                  console.log("iss", obj);
                                  return (
                                    <div>
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
                    <div>
                      <div className="py-2 text-pink-400 ">
                        {item.fields.confidenceQuestion}
                      </div>
                      <div className="">
                        Score: {item.fields.confidenceValue}
                      </div>

                      <div>
                        {item.fields.questions.map((q, idxs) => {
                          return (
                            <div>
                              <ul className=" py-2 text-pink-400">
                                <li>{q.fields.question}</li>
                                <li className="py-2 text-black ">
                                  {q.fields.text}
                                </li>
                              </ul>
                              {q.fields.competenceChecklist
                                ?.filter((obj) => Boolean(obj.fields.selected))
                                .map((obj) => {
                                  console.log("iss", obj);
                                  return (
                                    <div>
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
                    <div>
                      <div className="py-2 text-pink-400 ">
                        {item.fields.confidenceQuestion}
                      </div>
                      <div className="">
                        Score: {item.fields.confidenceValue}
                      </div>

                      <div>
                        {item.fields.questions.map((q, idxs) => {
                          return (
                            <div>
                              <ul className=" py-2 text-pink-400">
                                <li>{q.fields.question}</li>
                                <li className="py-2 text-black ">
                                  {q.fields.text}
                                </li>
                              </ul>
                              {q.fields.competenceChecklist
                                ?.filter((obj) => Boolean(obj.fields.selected))
                                .map((obj) => {
                                  console.log("iss", obj);
                                  return (
                                    <div>
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
                    <div>
                      <div className="py-2 text-pink-400 ">
                        {item.fields.confidenceQuestion}
                      </div>
                      <div className="">
                        Score: {item.fields.confidenceValue}
                      </div>

                      <div>
                        {item.fields.questions.map((q, idxs) => {
                          return (
                            <div>
                              <ul className=" py-2 text-pink-400">
                                <li>{q.fields.question}</li>
                                <li className="py-2 text-black ">
                                  {q.fields.text}
                                </li>
                              </ul>
                              {q.fields.competenceChecklist
                                ?.filter((obj) => Boolean(obj.fields.selected))
                                .map((obj) => {
                                  console.log("iss", obj);
                                  return (
                                    <div>
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
{
  /* <>
<div className="flex w-[390px] flex-col bg-white pl-4 pr-3.5 font-inter">
  <div className="mt-16 flex w-full flex-col self-stretch max-md:mt-10">
    <div className="ml-3.5 max-w-[335px] whitespace-nowrap pb-2 text-3xl font-bold leading-[112.5%] text-black max-md:ml-2.5">
      Intro To Freelance Quiz:
    </div>
    <div className="ml-3.5 max-w-[335px] pb-4 text-3xl font-bold leading-[112.5%] text-black max-md:ml-2.5">
      Results
    </div>

    {showSecond ? (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <SubRadar onClick={() => setShowSecond(!showSecond)} />
    ) : (
      <Radar
        onClick={() => setShowSecond(!showSecond)}
        data={{
          labels: [
            "SALES",
            "MARKETING",
            "FINANCE",
            "LEGAL",
            "ADMIN",
            "PORTFOLIO",
          ],
          datasets: [
            {
              label: "Confidence",
              data: [confidence, 0, 0, 0, 0, 90],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgb(255, 99, 132)",
              pointBackgroundColor: "rgb(255, 99, 132)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(255, 99, 132)",
            },
            {
              label: "Competence",
              data: [competence, 0, 0, 0, 0, 50],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgb(54, 162, 235)",
              pointBackgroundColor: "rgb(54, 162, 235)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(54, 162, 235)",
            },
          ],
        }}
      />
    )}
    <div className="ml-2 mt-6 text-3xl leading-8 text-black">
      <span className="text-black">Hello </span>
      <span className="text-pink-600">Toyin, </span>
      <span className="text-black">here are your quiz results</span>
    </div>
    <div className="mt-12 max-w-[335px] self-center text-xl leading-7 text-pink-600 max-md:mt-10">
      <span className="font-bold text-black">Sales: </span>

      <span className="font-bold text-black">Marketing: </span>

      <span className="font-bold text-black">
        <br />
        Portfolio:
      </span>

      <span className="font-bold text-black">
        <br />
        Admin:
      </span>

      <span className="font-bold text-black">
        <br />
        Legal:
      </span>

      <span className="font-bold text-black">
        <br />
        Financial Literacy:
      </span>
    </div>
    <Button className="m-4">Click Here for the Full Report</Button>
  </div>
  <img
    loading="lazy"
    srcSet="..."
    className="mb-20 mt-36 aspect-[6] w-[282px] max-w-full self-center overflow-hidden object-cover object-center max-md:my-10"
  />
</div>
</> */
}
