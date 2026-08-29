import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePageLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Showcase Section Skeleton */}
      <section className="relative overflow-hidden pt-6 sm:pt-10 pb-12 sm:pb-16 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Top Header & CTAs */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-4">
            <div className="space-y-2 w-full flex flex-col items-center">
              <Skeleton className="h-10 sm:h-16 w-4/5 max-w-xl rounded-3xl" />
              <Skeleton className="h-10 sm:h-16 w-3/5 max-w-md rounded-3xl bg-amber-400/20" />
            </div>

            <div className="space-y-2 max-w-2xl w-full pt-1">
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-4/5 mx-auto rounded-lg" />
            </div>

            {/* CTA Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Skeleton className="h-11 w-40 rounded-full bg-amber-400/40" />
              <Skeleton className="h-11 w-36 rounded-full bg-[#A3FF00]/30" />
              <Skeleton className="h-11 w-36 rounded-full bg-[#1DBF73]/30" />
            </div>
          </div>

          {/* Featured Masterpiece Large Visual Stage */}
          <div className="mt-10 sm:mt-14 relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950/80 shadow-2xl p-2 sm:p-4">
            <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full min-h-[360px] sm:min-h-[460px] rounded-2xl overflow-hidden flex flex-col justify-end p-6 sm:p-8">
              <Skeleton className="absolute inset-0 w-full h-full rounded-2xl" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-24 rounded-full bg-amber-400/40" />
                  <Skeleton className="h-5 w-16 rounded-md" />
                </div>
                <Skeleton className="h-8 sm:h-12 w-2/3 max-w-lg rounded-2xl" />
                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                  {/* Carousel Dots */}
                  <div className="flex gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-2.5 w-2.5 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Animated Studio Marquee Placeholder */}
      <div className="w-full py-4 border-y border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-100/50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 flex justify-around">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-32 rounded-full opacity-60" />
          ))}
        </div>
      </div>

      {/* 2. Portfolio Gallery Grid Section Skeleton */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-36 rounded-full bg-amber-400/20" />
              <Skeleton className="h-8 sm:h-10 w-72 rounded-2xl" />
            </div>
            <Skeleton className="h-4 w-80 rounded-lg" />
          </div>

          {/* Filter Bar Skeleton */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-24 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-10 w-full sm:w-64 rounded-xl" />
          </div>

          {/* 6 Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "aspect-[4/5]",
              "aspect-[16/10]",
              "aspect-square",
              "aspect-[3/4]",
              "aspect-[16/9]",
              "aspect-[4/5]",
            ].map((aspect, i) => (
              <div
                key={i}
                className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 p-4 space-y-3 shadow-sm"
              >
                <Skeleton className={`w-full ${aspect} rounded-2xl`} />
                <div className="space-y-2 p-1">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-20 rounded-full" />
                    <Skeleton className="h-4 w-12 rounded-full" />
                  </div>
                  <Skeleton className="h-5 w-4/5 rounded-lg" />
                  <Skeleton className="h-3.5 w-1/2 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Character & Studio Story Spotlight Skeleton */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 p-8 sm:p-12 lg:p-16 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Character Portrait Skeleton */}
              <div className="lg:col-span-5 flex flex-col items-center text-center">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl p-1">
                  <Skeleton className="w-full h-full rounded-2xl" />
                </div>
              </div>

              {/* Right Bio Skeleton */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-44 rounded-full bg-amber-400/20" />
                  <Skeleton className="h-8 sm:h-10 w-72 rounded-2xl" />
                </div>

                <div className="space-y-2.5">
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-4/5 rounded-md" />
                </div>

                <Skeleton className="h-5 w-48 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Commission Hub CTA Banner Skeleton */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 p-8 sm:p-12 text-center space-y-6 shadow-xl">
            <div className="space-y-2 max-w-xl mx-auto">
              <Skeleton className="h-8 sm:h-10 w-3/4 mx-auto rounded-2xl" />
              <Skeleton className="h-4 w-full mx-auto rounded-md" />
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <Skeleton className="h-11 w-36 rounded-full bg-[#A3FF00]/30" />
              <Skeleton className="h-11 w-36 rounded-full bg-[#1DBF73]/30" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}