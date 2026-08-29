import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesLoading() {
  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header Skeleton */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Skeleton className="h-10 sm:h-16 w-3/4 mx-auto rounded-3xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-4/5 mx-auto rounded-lg" />
        </div>
      </div>

      {/* 2. Official Commission Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* VGen Card Skeleton */}
        <div className="rounded-3xl border-2 border-[#A3FF00]/30 bg-white/70 dark:bg-zinc-900/60 p-8 sm:p-10 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-12 w-12 rounded-2xl bg-[#A3FF00]/40" />
              <Skeleton className="h-6 w-40 rounded-full bg-[#A3FF00]/20" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-8 w-60 rounded-xl" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
            </div>
            <div className="space-y-2.5 pt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <Skeleton className="h-4 w-4 rounded-full bg-[#A3FF00]/40 shrink-0" />
                  <Skeleton className="h-4 w-full rounded" />
                </div>
              ))}
            </div>
          </div>
          <div className="pt-6">
            <Skeleton className="h-12 w-full rounded-full bg-[#A3FF00]/40" />
          </div>
        </div>

        {/* Fiverr Card Skeleton */}
        <div className="rounded-3xl border-2 border-[#1DBF73]/30 bg-white/70 dark:bg-zinc-900/60 p-8 sm:p-10 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-12 w-12 rounded-2xl bg-[#1DBF73]/40" />
              <Skeleton className="h-6 w-36 rounded-full bg-[#1DBF73]/20" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-8 w-60 rounded-xl" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
            </div>
            <div className="space-y-2.5 pt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <Skeleton className="h-4 w-4 rounded-full bg-[#1DBF73]/40 shrink-0" />
                  <Skeleton className="h-4 w-full rounded" />
                </div>
              ))}
            </div>
          </div>
          <div className="pt-6">
            <Skeleton className="h-12 w-full rounded-full bg-[#1DBF73]/40" />
          </div>
        </div>
      </div>

      {/* 3. Studio Capabilities Grid Skeleton */}
      <div className="space-y-8 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Skeleton className="h-9 sm:h-11 w-72 mx-auto rounded-2xl" />
          <Skeleton className="h-4 w-80 mx-auto rounded-lg" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-11 w-11 rounded-2xl bg-amber-400/20" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-full rounded" />
                <Skeleton className="h-3.5 w-5/6 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Workflow Steps Skeleton */}
      <div className="space-y-8 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Skeleton className="h-9 sm:h-11 w-64 mx-auto rounded-2xl" />
          <Skeleton className="h-4 w-80 mx-auto rounded-lg" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm space-y-3"
            >
              <Skeleton className="h-10 w-12 rounded-xl bg-amber-400/20" />
              <Skeleton className="h-5 w-3/4 rounded-md" />
              <Skeleton className="h-3.5 w-full rounded" />
              <Skeleton className="h-3.5 w-4/5 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}