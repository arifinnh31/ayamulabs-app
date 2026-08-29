import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "outline"
    | "coral"
    | "success"
    | "glow"
    | "subtle";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default:
      "bg-zinc-100 text-zinc-900 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 font-semibold",
    primary:
      "bg-amber-400 text-zinc-950 border-amber-500/40 dark:bg-amber-400 dark:text-zinc-950 dark:border-amber-300 font-black shadow-sm",
    secondary:
      "bg-zinc-100 text-zinc-900 border-zinc-300 dark:bg-zinc-800/90 dark:text-white dark:border-zinc-700 font-bold",
    outline:
      "border border-zinc-300 text-zinc-900 bg-white dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-200 font-semibold",
    coral:
      "bg-rose-500 text-white border-rose-600 dark:bg-rose-600 dark:text-white dark:border-rose-500 font-black shadow-sm",
    success:
      "bg-emerald-600 text-white border-emerald-700 dark:bg-emerald-500 dark:text-white dark:border-emerald-400 font-black shadow-sm",
    glow:
      "bg-amber-400 text-zinc-950 border-amber-300 dark:bg-amber-400 dark:text-zinc-950 dark:border-amber-300 font-black shadow-md shadow-amber-400/20",
    subtle:
      "bg-amber-100 text-amber-950 border-amber-300 dark:bg-zinc-800 dark:text-amber-300 dark:border-amber-400/30 font-bold",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs rounded-full border",
    md: "px-3 py-1 text-xs sm:text-sm rounded-full border",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 transition-colors select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}
