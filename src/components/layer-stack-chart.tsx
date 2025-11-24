"use client";

import { Bar } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";
import { ensureChartsRegistered } from "@/lib/register-charts";
import { totalsByLayer, vendors } from "@/lib/voice-traffic-data";

ensureChartsRegistered();

const vendorSeries = vendors.filter((vendor) => vendor.key !== "overall");

const labels = ["2G (GSM + DCS)", "3G (UMTS)"];

const data = {
  labels,
  datasets: vendorSeries.map((vendor) => ({
    label: vendor.name,
    data: labels.map((label) => {
      const layer = label.startsWith("2G") ? "2G" : ("3G" as "2G" | "3G");
      return totalsByLayer[layer][vendor.key];
    }),
    backgroundColor: vendor.color,
    borderRadius: 10,
    barThickness: 42,
    stack: "vendors",
  })),
};

const options: ChartOptions<"bar"> = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        color: "#3f3f46",
        font: {
          size: 12,
          weight: 500,
        },
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      grid: {
        color: "rgba(148, 163, 184, 0.3)",
      },
      ticks: {
        color: "#3f3f46",
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
          const value = Number(context.raw ?? 0);
          return `${context.dataset.label}: ${value.toLocaleString()} Erlangs`;
        },
        footer: (items) => {
          const total = items.reduce((acc, item) => acc + Number(item.raw ?? 0), 0);
          return `Total: ${total.toLocaleString()} Erlangs`;
        },
      },
    },
  },
};

export function LayerStackChart() {
  return (
    <div className="h-[280px] w-full">
      <Bar data={data} options={options} />
    </div>
  );
}
