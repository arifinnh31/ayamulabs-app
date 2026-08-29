"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CustomSelectOption {
  value: string;
  label: string;
  badge?: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  size?: "sm" | "md" | "lg";
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select option...",
  className,
  buttonClassName,
  menuClassName,
  size = "md",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  const sizeClasses = {
    sm: "h-9 px-3 text-xs rounded-xl",
    md: "h-11 px-4 text-xs sm:text-sm rounded-2xl",
    lg: "h-12 px-5 text-sm sm:text-base rounded-2xl",
  };

  return (
    <div className={cn("relative w-full select-none", className)} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "w-full flex items-center justify-between gap-2.5 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-bold text-zinc-900 dark:text-zinc-100 shadow-sm transition-all hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 cursor-pointer",
          sizeClasses[size],
          isOpen && "border-amber-400 ring-2 ring-amber-400/20",
          buttonClassName
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedOption?.icon && (
            <span className="shrink-0">{selectedOption.icon}</span>
          )}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>

        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500 transition-transform duration-200",
            isOpen && "rotate-180 text-amber-500"
          )}
        />
      </button>

      {/* Dropdown Options Menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute left-0 right-0 z-50 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl p-1.5 shadow-2xl animate-in fade-in zoom-in-95 duration-150 scrollbar-none",
            menuClassName
          )}
          role="listbox"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer text-left",
                  isSelected
                    ? "bg-amber-400 text-zinc-950 font-black shadow-sm dark:bg-amber-400 dark:text-zinc-950"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-amber-50 dark:hover:bg-zinc-800/80 hover:text-amber-700 dark:hover:text-amber-300"
                )}
              >
                <span className="flex items-center gap-2 truncate">
                  {option.icon && (
                    <span className="shrink-0">{option.icon}</span>
                  )}
                  <span className="truncate">{option.label}</span>
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  {option.badge && (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-extrabold uppercase",
                        isSelected
                          ? "bg-zinc-950 text-amber-300"
                          : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      )}
                    >
                      {option.badge}
                    </span>
                  )}
                  {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
