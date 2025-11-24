import { Fragment } from "react";
import {
  percentageShare,
  vendors,
  voiceTrafficByBand,
} from "@/lib/voice-traffic-data";

const vendorSeries = vendors.filter((vendor) => vendor.key !== "overall");

export function TrafficTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
        <thead className="bg-zinc-50/80 dark:bg-zinc-900/60">
          <tr>
            <th className="px-4 py-3 text-left font-medium uppercase tracking-wide text-xs text-zinc-500 dark:text-zinc-400">
              Band
            </th>
            <th className="px-4 py-3 text-right font-medium uppercase tracking-wide text-xs text-zinc-500 dark:text-zinc-400">
              W47 Total
            </th>
            {vendorSeries.map((vendor) => (
              <th
                key={vendor.key}
                className="px-4 py-3 text-right font-medium uppercase tracking-wide text-xs text-zinc-500 dark:text-zinc-400"
              >
                {vendor.short}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {voiceTrafficByBand.map((entry) => {
            const percentageRow = percentageShare.find(
              (row) => row.id === entry.id,
            );
            return (
              <Fragment key={entry.id}>
                <tr className="bg-white/70 transition hover:bg-blue-50/60 dark:bg-zinc-900/70 dark:hover:bg-blue-950/30">
                  <td className="px-4 py-4 align-top">
                    <div className="font-medium text-zinc-900 dark:text-zinc-50">
                      {entry.display}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-wide text-blue-500 dark:text-blue-300">
                      {entry.layer}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-semibold text-zinc-900 dark:text-zinc-50">
                    {entry.values.overall.toLocaleString()}
                  </td>
                  {vendorSeries.map((vendor) => (
                    <td
                      key={vendor.key}
                      className="px-4 py-4 text-right text-zinc-800 dark:text-zinc-100"
                    >
                      <div>{entry.values[vendor.key].toLocaleString()}</div>
                      {percentageRow ? (
                        <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                          {percentageRow.percentages[vendor.key].toFixed(1)}%
                        </div>
                      ) : null}
                    </td>
                  ))}
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
