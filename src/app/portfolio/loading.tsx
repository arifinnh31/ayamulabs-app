import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PortfolioLoading() {
  return (
    <div className="py-12 sm:py-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header Skeleton */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Skeleton className="h-6 w-36 rounded-full mx-auto bg-amber-400/20" />
        <Skeleton className="h-10 sm:h-14 w-3/4 mx-auto rounded-3xl" />
        <Skeleton className="h-4 w-5/6 mx-auto rounded-lg" />
        {/* Search Bar Skeleton */}
        <div className="max-w-md mx-auto pt-2">
          <Skeleton className="h-12 w-full rounded-2xl" />
        </div>
      </div>

      {/* 2. Category Filter Pills Skeleton */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-28 rounded-full" />
        ))}
      </div>

      {/* 3. Masonry Artwork Grid Skeleton */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {[
          { h: "aspect-[4/5]" },
          { h: "aspect-[16/9]" },
          { h: "aspect-square" },
          { h: "aspect-[3/4]" },
          { h: "aspect-[16/10]" },
          { h: "aspect-[4/5]" },
          { h: "aspect-square" },
          { h: "aspect-[16/9]" },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 p-4 space-y-3 break-inside-avoid shadow-sm"
          >
            <Skeleton className={`w-full ${item.h} rounded-2xl`} />
            <div className="space-y-2 p-1">
              <div className="flex justify-between items-center">
                <Skeleton className="h-3.5 w-20 rounded-full" />
                <Skeleton className="h-3.5 w-12 rounded-full" />
              </div>
              <Skeleton className="h-5 w-4/5 rounded-lg" />
              <div className="flex gap-1.5 pt-1">
                <Skeleton className="h-4 w-12 rounded-full" />
                <Skeleton className="h-4 w-16 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}