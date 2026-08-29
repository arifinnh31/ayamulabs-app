import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminProfileLoading() {
  return (
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
      {/* 1. Header Topbar Skeleton */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 px-6 py-4 flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-6 w-48 rounded-lg" />
          <Skeleton className="h-3.5 w-64 rounded-md" />
        </div>
        <Skeleton className="h-9 w-32 rounded-xl bg-amber-400/30" />
      </div>

      {/* 2. Form Viewport Skeleton (Full-width Scrollable Viewport) */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl w-full mx-auto">
          {/* Studio Identity Card */}
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="space-y-1">
              <Skeleton className="h-6 w-40 rounded-lg" />
              <Skeleton className="h-3.5 w-64 rounded-md" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
          </div>

          {/* Links & Portals Card */}
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="space-y-1">
              <Skeleton className="h-6 w-48 rounded-lg" />
              <Skeleton className="h-3.5 w-72 rounded-md" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              ))}
            </div>
          </div>

          {/* Team Members Card */}
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-6 w-44 rounded-lg" />
                <Skeleton className="h-3.5 w-60 rounded-md" />
              </div>
              <Skeleton className="h-9 w-32 rounded-xl bg-amber-400/20" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-32 rounded" />
                      <Skeleton className="h-3 w-20 rounded" />
                    </div>
                  </div>
                  <div className="flex gap-2">
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