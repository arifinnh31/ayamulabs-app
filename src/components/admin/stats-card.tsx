import * as React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  color?: "amber" | "rose" | "emerald" | "blue";
}

export function StatsCard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  color = "amber",
}: StatsCardProps) {
  const colorStyles = {
    amber: "bg-amber-400/15 text-amber-600 dark:text-amber-400 border-amber-400/30",
    rose: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    emerald: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    blue: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
  };

  return (
    <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          {title}
        </span>
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${colorStyles[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-2xl font-black text-zinc-900 dark:text-white">
          {value}
        </h3>
        {change && (
          <span
            className={`text-xs font-bold ${
              isPositive
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
