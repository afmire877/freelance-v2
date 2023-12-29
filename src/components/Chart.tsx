import React from "react";
import { Radar } from "react-chartjs-2";

interface Props {
  confidence: number[];
  competence: number[];
}

// order of labels
// [
//     "SALES",
//     "MARKETING",
//     "FINANCE",
//     "LEGAL",
//     "ADMIN",
//     "PORTFOLIO",
//   ]

export default function Chart({ confidence, competence }: Props) {
  return (
    <Radar
      className="lg:mx-20 lg:w-[400px]"
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
            data: confidence,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
          {
            label: "Competence",
            data: competence,
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
  );
}
