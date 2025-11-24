import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  changeLabel?: string;
  icon?: ReactNode;
  tone?: "default" | "primary";
  subtitle?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  changeLabel,
  icon,
  tone = "default",
}: StatCardProps) {
  return (
    <div
      className={`rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/70 ${
        tone === "primary"
          ? "border-blue-200 bg-blue-50/80 dark:border-blue-900/40 dark:bg-blue-950/40"
          : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-semibold text-zinc-950 dark:text-white">
            {value}
          </p>
          {subtitle ? (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {subtitle}
            </p>
          ) : null}
        </div>
        {icon ? (
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-500 dark:bg-blue-900/40 dark:text-blue-300">
            {icon}
          </span>
        ) : null}
      </div>
      {changeLabel ? (
        <p className="mt-5 text-xs font-medium uppercase tracking-wide text-blue-500 dark:text-blue-300">
          {changeLabel}
        </p>
      ) : null}
    </div>
  );
}
