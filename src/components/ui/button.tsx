"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "coral"
    | "vgen"
    | "fiverr"
    | "glass";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none cursor-pointer rounded-full";

    const variantStyles = {
      primary:
        "bg-amber-400 text-zinc-950 font-bold hover:bg-amber-300 shadow-md shadow-amber-400/20 hover:shadow-amber-400/35 hover:-translate-y-0.5",
      secondary:
        "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
      outline:
        "border border-amber-400/40 text-zinc-900 hover:bg-amber-400/10 hover:border-amber-400 dark:text-zinc-100 dark:border-amber-400/30 dark:hover:bg-amber-400/10",
      ghost:
        "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800/60",
      coral:
        "bg-rose-500 text-white font-bold hover:bg-rose-400 shadow-md shadow-rose-500/20 hover:shadow-rose-500/35 hover:-translate-y-0.5",
      vgen:
        "bg-[#FF1356] text-white font-bold hover:bg-[#E00A45] shadow-md shadow-[#FF1356]/25 hover:shadow-[#FF1356]/40 hover:-translate-y-0.5",
      fiverr:
        "bg-[#1DBF73] text-white font-bold hover:bg-[#19A463] shadow-md shadow-[#1DBF73]/25 hover:shadow-[#1DBF73]/40 hover:-translate-y-0.5",
      glass:
        "backdrop-blur-md bg-white/70 text-zinc-900 border border-white/40 hover:bg-white/90 shadow-sm dark:bg-zinc-900/70 dark:text-zinc-100 dark:border-zinc-700/50 dark:hover:bg-zinc-900/90",
    };

    const sizeStyles = {
      sm: "h-8 px-3.5 text-xs gap-1.5",
      md: "h-10 px-5 text-sm gap-2",
      lg: "h-12 px-7 text-base gap-2.5 font-semibold",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
