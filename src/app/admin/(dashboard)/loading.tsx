import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
      {/* 1. Header Topbar Skeleton */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 px-6 py-4 flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-6 w-48 rounded-lg" />
          <Skeleton className="h-3.5 w-72 rounded-md" />
        </div>
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>

      {/* 2. Main Content Viewport Skeleton (Full-width Scrollable Viewport) */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* 4 Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-11 w-11 rounded-2xl" />
                  <Skeleton className="h-4 w-12 rounded-full" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-8 w-24 rounded-lg" />
                  <Skeleton className="h-3.5 w-32 rounded-md" />
                </div>
              </div>
            ))}
          </div>

          {/* Featured Table Card Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-64 rounded-xl" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-40 rounded-md" />
            </div>

            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm overflow-hidden p-6 space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <Skeleton className="col-span-5 h-4 w-32 rounded" />
                <Skeleton className="col-span-2 h-4 w-20 rounded" />
                <Skeleton className="col-span-2 h-4 w-20 rounded" />
                <Skeleton className="col-span-3 h-4 w-24 rounded ml-auto" />
              </div>
              {/* Table Rows */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 items-center py-2.5">
                  <div className="col-span-5 flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
                    <div className="space-y-1.5 w-full">
                      <Skeleton className="h-4 w-3/4 rounded" />
                      <Skeleton className="h-3 w-1/2 rounded" />
                    </div>
                  </div>
                  <Skeleton className="col-span-2 h-5 w-20 rounded-full" />
                  <Skeleton className="col-span-2 h-4 w-16 rounded" />
                  <div className="col-span-3 flex justify-end gap-2">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}