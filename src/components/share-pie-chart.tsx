"use client";

import { Doughnut } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";
import { ensureChartsRegistered } from "@/lib/register-charts";
import { overallShare, totalVoiceTraffic, vendors } from "@/lib/voice-traffic-data";

ensureChartsRegistered();

const vendorSeries = vendors.filter((vendor) => vendor.key !== "overall");

const data = {
  labels: vendorSeries.map((vendor) => vendor.name),
  datasets: [
    {
      label: "Erlangs",
      data: vendorSeries.map((vendor) => totalVoiceTraffic[vendor.key]),
      backgroundColor: vendorSeries.map((vendor) => vendor.color),
      borderWidth: 2,
      borderColor: "#ffffff",
      hoverOffset: 12,
    },
  ],
};

const options: ChartOptions<"doughnut"> = {
  maintainAspectRatio: false,
  cutout: "60%",
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label ?? "";
          const value = Number(context.raw ?? 0);
          const vendor = vendorSeries[context.dataIndex];
          const share = overallShare[vendor.key];
          return `${label}: ${value.toLocaleString()} Erlangs (${share.toFixed(1)}%)`;
        },
      },
    },
  },
};

export function SharePieChart() {
  return (
    <div className="relative h-[280px] w-full">
      <Doughnut data={data} options={options} />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Total Erlangs
        </p>
        <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {totalVoiceTraffic.overall.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
