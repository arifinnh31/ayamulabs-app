import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <div className="relative flex items-center w-full">
          {icon && (
            <div className="absolute left-3.5 text-zinc-400 pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-950 font-medium placeholder:text-zinc-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-100 dark:placeholder:text-zinc-500 transition-all",
              icon && "pl-11",
              error && "border-rose-500 dark:border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/10",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="flex items-center gap-1.5 text-xs text-rose-500 dark:text-rose-400 font-semibold mt-1 animate-in fade-in slide-in-from-top-1 duration-150">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
