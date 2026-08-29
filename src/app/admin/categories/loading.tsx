import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminCategoriesLoading() {
  return (
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
      {/* 1. Header Topbar Skeleton */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 px-6 py-4 flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-6 w-48 rounded-lg" />
          <Skeleton className="h-3.5 w-64 rounded-md" />
        </div>
        <Skeleton className="h-9 w-36 rounded-xl bg-amber-400/30" />
      </div>

      {/* 2. Content Viewport Skeleton (Full-width Scrollable Viewport) */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl w-full mx-auto">
          {/* Search & Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Skeleton className="h-10 w-full sm:w-72 rounded-xl" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-28 rounded-full" />
              <Skeleton className="h-9 w-24 rounded-full" />
            </div>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-12 w-12 rounded-2xl bg-amber-400/20" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-6 w-36 rounded-lg" />
                  <Skeleton className="h-3.5 w-24 rounded-md" />
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-4 w-16 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}