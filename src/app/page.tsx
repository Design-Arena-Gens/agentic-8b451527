import { LayerStackChart } from "@/components/layer-stack-chart";
import { SharePieChart } from "@/components/share-pie-chart";
import { StatCard } from "@/components/stat-card";
import { TrafficBarChart } from "@/components/traffic-bar-chart";
import { TrafficTable } from "@/components/traffic-table";
import {
  overallShare,
  totalVoiceTraffic,
  totalsByLayer,
  vendors,
  voiceTrafficByBand,
} from "@/lib/voice-traffic-data";

const vendorSeries = vendors.filter((vendor) => vendor.key !== "overall");

const topVendor = vendorSeries.reduce((best, vendor) => {
  const currentShare = overallShare[vendor.key];
  const bestShare = overallShare[best.key];
  return currentShare > bestShare ? vendor : best;
}, vendorSeries[0]!);

const totalErlangs = totalVoiceTraffic.overall;
const twoGShare =
  totalErlangs === 0 ? 0 : (totalsByLayer["2G"].overall / totalErlangs) * 100;
const threeGShare =
  totalErlangs === 0 ? 0 : (totalsByLayer["3G"].overall / totalErlangs) * 100;

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-white pb-24 pt-16 text-zinc-900 dark:from-zinc-950 dark:via-zinc-950 dark:to-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-500">
              Voice Traffic Insights · Week 47
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              Voice Traffic Split per Technology & Vendor
            </h1>
            <p className="mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
              Visual analysis of Erlang traffic volumes across GSM, DCS, and UMTS layers
              for Ericsson, Huawei Central, and Nokia (North/South) footprints. Data
              reflects 24-hour accumulations in Erlangs for Week 47.
            </p>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-white/80 p-5 shadow-sm dark:border-blue-900/40 dark:bg-blue-950/30">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-300">
              Prime Contributor
            </p>
            <p className="mt-2 text-xl font-semibold text-zinc-950 dark:text-white">
              {topVendor.name}
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {overallShare[topVendor.key].toFixed(1)}% of network voice traffic
            </p>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="24H Total Voice Traffic"
            value={`${totalVoiceTraffic.overall.toLocaleString()} Erlangs`}
            subtitle="Across all vendors, GSM, DCS, and UMTS"
            tone="primary"
          />
          <StatCard
            title="2G Share"
            value={`${twoGShare.toFixed(1)}%`}
            subtitle={`${totalsByLayer["2G"].overall.toLocaleString()} Erlangs`}
          />
          <StatCard
            title="3G Share"
            value={`${threeGShare.toFixed(1)}%`}
            subtitle={`${totalsByLayer["3G"].overall.toLocaleString()} Erlangs`}
          />
          <StatCard
            title="Monitoring Scope"
            value={`${voiceTrafficByBand.length} layers`}
            subtitle="GSM, DCS, and UMTS carriers"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-5">
          <div className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:col-span-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Erlang Volume by Band & Vendor
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Compare absolute traffic across each technology layer.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <TrafficBarChart />
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Traffic Share by Vendor
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                All technologies combined. Hover for Erlang totals.
              </p>
              <div className="mt-6">
                <SharePieChart />
              </div>
              <dl className="mt-4 space-y-3">
                {vendorSeries.map((vendor) => (
                  <div key={vendor.key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: vendor.color }}
                      />
                      <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                        {vendor.name}
                      </dt>
                    </div>
                    <dd className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {overallShare[vendor.key].toFixed(1)}%
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Layer Distribution
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Ericsson leads GSM, Nokia North dominates UMTS F1.
              </p>
              <div className="mt-6">
                <LayerStackChart />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Detailed Band Breakdown
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Traffic volumes (Erlangs) with vendor percentage share per band.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <TrafficTable />
          </div>
        </section>
      </div>
    </div>
  );
}
