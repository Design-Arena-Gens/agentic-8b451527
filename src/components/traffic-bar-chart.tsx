"use client";

import { Bar } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";
import { ensureChartsRegistered } from "@/lib/register-charts";
import { vendors, voiceTrafficByBand } from "@/lib/voice-traffic-data";

ensureChartsRegistered();

const vendorSeries = vendors.filter((vendor) => vendor.key !== "overall");

const labels = voiceTrafficByBand.map((band) => band.display);

const dataset = vendorSeries.map((vendor) => ({
  label: vendor.name,
  data: voiceTrafficByBand.map((band) => band.values[vendor.key]),
  backgroundColor: vendor.color,
  borderRadius: 10,
  barThickness: 32,
}));

const options: ChartOptions<"bar"> = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    x: {
      stacked: false,
      grid: {
        display: false,
      },
      ticks: {
        color: "#3f3f46",
        maxRotation: 45,
        minRotation: 45,
        font: {
          size: 12,
          weight: 500,
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(148, 163, 184, 0.3)",
        drawTicks: false,
      },
      ticks: {
        color: "#3f3f46",
        font: {
          size: 12,
        },
        callback: (value) =>
          typeof value === "number"
            ? value.toLocaleString()
            : value.toString(),
      },
    },
  },
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        boxWidth: 10,
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.dataset.label ?? "";
          const value = context.parsed.y ?? 0;
          return `${label}: ${value.toLocaleString()} Erlangs`;
        },
      },
    },
  },
};

const data = {
  labels,
  datasets: dataset,
};

export function TrafficBarChart() {
  return (
    <div className="h-[360px] w-full">
      <Bar options={options} data={data} />
    </div>
  );
}
