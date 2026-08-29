"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [internalTab, setInternalTab] = React.useState(defaultValue || "");
  const activeTab = value !== undefined ? value : internalTab;

  const setActiveTab = (val: string) => {
    if (onValueChange) {
      onValueChange(val);
    } else {
      setInternalTab(val);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-zinc-200/60 p-1 text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400 overflow-x-auto max-w-full",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
  count,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
  count?: number;
}) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer select-none",
        isActive
          ? "bg-amber-400 text-zinc-950 shadow-md font-black dark:bg-amber-400 dark:text-zinc-950"
          : "text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-300/40 dark:hover:bg-zinc-700/60",
        className
      )}
    >
      {children}
      {count !== undefined && (
        <span
          className={cn(
            "ml-1.5 rounded-full px-1.5 py-0.2 text-[10px] font-bold",
            isActive
              ? "bg-zinc-950 text-amber-300"
              : "bg-zinc-300/80 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");

  if (context.activeTab !== value) return null;

  return (
    <div className={cn("mt-4 animate-in fade-in-50 duration-200", className)}>
      {children}
    </div>
  );
}
