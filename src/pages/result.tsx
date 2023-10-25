import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import useQuizStore from "~/store/quizStore";

import { sum, groupBy, groupWith } from "ramda";
import { Topic } from "~/utils/types";
import SubRadar from "~/components/subRadar";
import { Button } from "~/components/ui/button";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export default function Result() {
  const bank = useQuizStore((e) => e.bank);

  const [confidence, setConfidence] = useState(0);
  const [competence, setCompetence] = useState(0);
  const [showSecond, setShowSecond] = useState(false);

  const calculateResult = () => {
    // labels: ["SALES", "MARKETING", "FINANCE", "LEGAL", "ADMIN", "PORTFOLIO"],
    const grouped = groupWith((a, b) => a.topic === b.topic, bank);

    console.log("grouped", grouped);

    const res = grouped.map((g) => {
      const x = g.reduce((acc, cur) => {
        const value = cur?.questions?.[0]?.value ?? 0;
        return acc + value;
      }, 0);

      const t = g.reduce((acc, cur) => {
        const weighting = cur?.questions[1].checklist
          .filter((c) => c.selected)
          .map((c) => c.weighting);

        const count = sum(weighting);

        return acc + count;
      }, 0);
      console.log("t", t);
    });

    const confidenceScore = bank
      .filter(({ topic }) => topic === Topic.PORTFOLIO)
      .reduce((acc, cur) => {
        const value = cur?.questions?.[0]?.value ?? 0;
        return acc + value;
      }, 0);

    setConfidence(confidenceScore);

    const competenceScore = bank
      .filter(({ topic }) => topic === Topic.PORTFOLIO)
      .reduce((acc, cur) => {
        const weighting = cur?.questions[1].checklist
          .filter((c) => c.selected)
          .map((c) => c.weighting);

        const count = sum(weighting);

        return acc + count;
      }, 0);

    setCompetence(competenceScore);
  };

  useEffect(() => {
    calculateResult();
  }, []);

  return (
    <>
      <div className="flex w-[390px] flex-col bg-white pl-4 pr-3.5">
        <div className="mt-16 flex w-full flex-col self-stretch max-md:mt-10">
          <div className="ml-3.5 max-w-[335px] text-3xl font-bold leading-[112.5%] text-black max-md:ml-2.5">
            Intro To Freelance Quiz: Results:
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
                    data: [40, 0, 0, 0, 0, 90],
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgb(255, 99, 132)",
                    pointBackgroundColor: "rgb(255, 99, 132)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgb(255, 99, 132)",
                  },
                  {
                    label: "Competence",
                    data: [100, 0, 0, 0, 0, 50],
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
          <div className="mt-6 text-3xl leading-8 text-black">
            <span className="text-black">Hello </span>
            <span className="text-pink-600">Toyin, </span>
            <span className="text-black">here are your quiz results</span>
          </div>
          <div className="mt-12 max-w-[335px] self-center text-xl leading-7 text-pink-600 max-md:mt-10">
            <span className="font-bold text-black">Sales: </span>
            <span className=" text-black">
              You feel Slightly Confident in this skill. There are some areas we
              could focus on for growth in this area. You may want to focus on
              learning how to create a{" "}
            </span>
            <span className=" text-pink-600">purchase order</span>
            <span className=" text-black">
              {" "}
              or understanding how to manage your{" "}
            </span>
            <span className=" text-pink-600">workload and capacity.</span>
            <span className=" text-black">
              {" "}
              <br />
              <br />
            </span>
            <span className="font-bold text-black">Marketing: </span>
            <span className=" text-black">
              You feel Somewhat Confident in this skill. You also might want to
              create a network of{" "}
            </span>
            <span className=" text-pink-600">potential clients </span>
            <span className=" text-black">
              or understanding how to strategise your{" "}
            </span>
            <span className=" text-pink-600">
              marketing goals for next the year
            </span>
            <span className=" text-black">
              .<br />
            </span>
            <span className="font-bold text-black">
              <br />
              Portfolio:{" "}
            </span>
            <span className=" text-black">
              You feel Quite Confident in this skill. There are some areas we
              could focus on for growth in this area. You may want to create a{" "}
            </span>
            <span className=" text-pink-600">digital portfolio</span>
            <span className=" text-black"> and including having a </span>
            <span className=" text-pink-600">portfolio review</span>
            <span className=" text-black">
              {" "}
              with someone in your field. <br />
            </span>
            <span className="font-bold text-black">
              <br />
              Admin:{" "}
            </span>
            <span className=" text-black">
              You feel Slightly Confident in this skill. To help you to grow in
              this area, you may want to{" "}
            </span>
            <span className=" text-pink-600">
              discuss time management with a coach
            </span>
            <span className=" text-black"> and have a conversation about </span>
            <span className=" text-pink-600">administration tools</span>
            <span className=" text-black">
              . <br />
            </span>
            <span className="font-bold text-black">
              <br />
              Legal:{" "}
            </span>
            <span className=" text-black">
              You feel Not At All Confident in this skill. A coach will give you
              more tailored advice to enable you to grow in this area. These
              things might include{" "}
            </span>
            <span className=" text-pink-600">access to legal support</span>
            <span className=" text-black"> and </span>
            <span className=" text-pink-600">creating contracts</span>
            <span className=" text-black">
              .<br />
            </span>
            <span className="font-bold text-black">
              <br />
              Financial Literacy:{" "}
            </span>
            <span className=" text-black">
              You feel Somewhat Confident in this skill. To improve your skills
              in this area, we can help you to create a target{" "}
            </span>
            <span className=" text-pink-600">day rate</span>
            <span className=" text-black"> and </span>
            <span className=" text-pink-600">access grants</span>
            <span className=" text-black">. </span>
          </div>
          <Button className="m-4">Click Here for the Full Report</Button>
        </div>
        <img
          loading="lazy"
          srcSet="..."
          className="mb-20 mt-36 aspect-[6] w-[282px] max-w-full self-center overflow-hidden object-cover object-center max-md:my-10"
        />
      </div>
    </>
  );
}
