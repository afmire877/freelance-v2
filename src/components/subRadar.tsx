import React from "react";
import { type ChartProps, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import {
  type ForwardedRef,
  type ChartJSOrUndefined,
} from "react-chartjs-2/dist/types";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export default function SubRadar({
  data: options,
  ...props
}: React.JSX.IntrinsicAttributes &
  Omit<ChartProps<"radar", (number | null)[], unknown>, "type"> & {
    ref?:
      | ForwardedRef<ChartJSOrUndefined<"radar", (number | null)[], unknown>>
      | undefined;
  }) {
  const data = {
    labels: ["Feedback", "Showcaseing Work", "Keeping Portfolio/CV upto date"],
    datasets: [
      {
        label: "Portfolio",
        data: [40, 50, 100],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };
  return <Radar {...props} data={data ?? options} />;
}
