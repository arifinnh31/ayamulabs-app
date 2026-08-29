import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArtworkDetailLoading() {
  return (
    <div className="py-10 sm:py-16 space-y-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Breadcrumbs & Meta Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-24 rounded-md" />
          <span className="text-zinc-400">/</span>
          <Skeleton className="h-5 w-28 rounded-md" />
          <span className="text-zinc-400">/</span>
          <Skeleton className="h-5 w-40 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
      </div>

      {/* 2. Main Visual Canvas Skeleton */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 p-2 shadow-2xl">
        <Skeleton className="w-full aspect-[16/9] max-h-[680px] rounded-2xl" />
      </div>

      {/* 3. Media Gallery Thumbnails Skeleton */}
      <div className="flex gap-4 overflow-x-auto py-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-32 rounded-2xl shrink-0" />
        ))}
      </div>

      {/* 4. Details Layout: Left Story + Right Commission Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Concept & Narrative */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-3">
            <Skeleton className="h-6 w-28 rounded-full bg-amber-400/20" />
            <Skeleton className="h-10 sm:h-12 w-4/5 rounded-2xl" />
            <Skeleton className="h-5 w-2/3 rounded-lg" />
          </div>

          <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 space-y-4">
            <Skeleton className="h-6 w-36 rounded-lg" />
            <div className="space-y-2.5">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
              <Skeleton className="h-4 w-4/6 rounded-md" />
            </div>
          </div>

          {/* Tools & Tags */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-32 rounded-md" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton key={idx} className="h-7 w-20 rounded-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Commission Sidebar Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 shadow-xl space-y-5">
            <Skeleton className="h-6 w-36 rounded-lg" />
            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-4 w-28 rounded" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
            </div>
            <div className="pt-2 space-y-2.5">
              <Skeleton className="h-11 w-full rounded-full bg-[#A3FF00]/30" />
              <Skeleton className="h-11 w-full rounded-full bg-[#1DBF73]/30" />
            </div>
          </div>

          {/* Project Navigation */}
          <div className="flex justify-between gap-4">
            <Skeleton className="h-12 w-1/2 rounded-2xl" />
            <Skeleton className="h-12 w-1/2 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}