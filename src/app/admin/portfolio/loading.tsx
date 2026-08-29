import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPortfolioLoading() {
  return (
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
      {/* 1. Header Topbar Skeleton */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 px-6 py-4 flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-6 w-40 rounded-lg" />
          <Skeleton className="h-3.5 w-64 rounded-md" />
        </div>
        <Skeleton className="h-9 w-36 rounded-xl bg-amber-400/30" />
      </div>

      {/* 2. Content Body Skeleton (Full-width Scrollable Viewport) */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Search & Category Filter Pills */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Skeleton className="h-10 w-full sm:w-72 rounded-xl" />
            <div className="flex gap-2 overflow-x-auto w-full sm:w-auto">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-24 rounded-full shrink-0" />
              ))}
            </div>
          </div>

          {/* Portfolio Table Skeleton */}
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm overflow-hidden p-6 space-y-4">
            <div className="grid grid-cols-12 gap-4 pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <Skeleton className="col-span-4 h-4 w-28 rounded" />
              <Skeleton className="col-span-2 h-4 w-20 rounded" />
              <Skeleton className="col-span-2 h-4 w-20 rounded" />
              <Skeleton className="col-span-2 h-4 w-16 rounded" />
              <Skeleton className="col-span-2 h-4 w-16 rounded ml-auto" />
            </div>

            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0">
                <div className="col-span-4 flex items-center gap-3">
                  <Skeleton className="h-12 w-16 rounded-xl shrink-0" />
                  <div className="space-y-1.5 w-full">
                    <Skeleton className="h-4 w-3/4 rounded" />
                    <Skeleton className="h-3 w-1/2 rounded" />
                  </div>
                </div>
                <Skeleton className="col-span-2 h-6 w-20 rounded-full" />
                <Skeleton className="col-span-2 h-4 w-16 rounded" />
                <Skeleton className="col-span-2 h-5 w-20 rounded-full" />
                <div className="col-span-2 flex justify-end gap-2">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-8 w-8 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}