import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header Skeleton */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Skeleton className="h-10 sm:h-16 w-4/5 mx-auto rounded-3xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-5/6 mx-auto rounded-lg" />
        </div>
      </div>

      {/* 2. Character Spotlight Skeleton */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-amber-500/5 via-white/60 to-zinc-50 dark:via-zinc-900/60 dark:to-zinc-900 p-8 sm:p-12 lg:p-16 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <Skeleton className="w-72 h-72 sm:w-96 sm:h-96 rounded-3xl" />
          </div>
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-36 rounded-full bg-amber-400/20" />
              <Skeleton className="h-10 sm:h-12 w-3/4 rounded-2xl" />
            </div>
            <div className="space-y-2.5">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-4/5 rounded-md" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-800/80 space-y-2"
                >
                  <Skeleton className="h-3 w-20 rounded" />
                  <Skeleton className="h-3 w-full rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Studio Creative Team Skeleton */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Skeleton className="h-9 sm:h-11 w-64 mx-auto rounded-2xl" />
          <Skeleton className="h-4 w-96 mx-auto rounded-lg" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 text-center shadow-sm space-y-4"
            >
              <Skeleton className="w-24 h-24 rounded-full mx-auto" />
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-32 mx-auto rounded-lg" />
                <Skeleton className="h-3.5 w-24 mx-auto rounded-md" />
              </div>
              <Skeleton className="h-3.5 w-full rounded" />
              <Skeleton className="h-3.5 w-5/6 mx-auto rounded" />
              <div className="flex flex-wrap gap-1 justify-center pt-2">
                <Skeleton className="h-4 w-14 rounded-full" />
                <Skeleton className="h-4 w-16 rounded-full" />
                <Skeleton className="h-4 w-12 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}