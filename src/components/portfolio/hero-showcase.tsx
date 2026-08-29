"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import { PortfolioItem, INITIAL_STUDIO_PROFILE } from "@/lib/mock-data";
import { VGenButton } from "@/components/commission/vgen-button";
import { FiverrButton } from "@/components/commission/fiverr-button";
import { motion, AnimatePresence } from "framer-motion";

interface HeroShowcaseProps {
  featuredArtworks: PortfolioItem[];
  onOpenLightbox?: (artwork: PortfolioItem) => void;
}

export function HeroShowcase({
  featuredArtworks,
  onOpenLightbox,
}: HeroShowcaseProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const current = featuredArtworks[activeIndex] || featuredArtworks[0];

  // Auto-advance masterpiece carousel every 7 seconds when not hovered
  React.useEffect(() => {
    if (featuredArtworks.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredArtworks.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [featuredArtworks.length, isPaused]);

  return (
    <section className="relative overflow-hidden pt-6 sm:pt-10 pb-12 sm:pb-16 select-none">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-96 w-full max-w-5xl rounded-full bg-gradient-to-r from-amber-400/20 via-rose-400/15 to-amber-300/20 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Welcome with Animated Fade-In */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.08]">
            WHERE IMAGINATION <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-rose-500">
              HATCHES INTO ART
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl font-medium leading-relaxed">
            {INITIAL_STUDIO_PROFILE.tagline}. Bespoke anime illustrations, character sheets, chibi merchandise, emotes, and background scenery by Ayamu Labs.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full font-bold text-sm bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 hover:-translate-y-0.5 transition-all select-none"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <VGenButton size="md" />
            <FiverrButton size="md" />
          </div>
        </motion.div>

        {/* Featured Masterpiece Large Visual Stage */}
        {current && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="mt-10 sm:mt-14 relative rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-950 text-white shadow-2xl dark:border-zinc-800"
          >
            {/* Background Image with AnimatePresence Crossfade */}
            <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full min-h-[380px] sm:min-h-[480px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.coverImage}
                    alt={current.title}
                    fill
                    unoptimized
                    priority
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover object-center"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

              {/* Top Bar Badges */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-zinc-950 border border-amber-300 font-black text-xs sm:text-sm tracking-wider shadow-lg uppercase">
                  FEATURED MASTERPIECE
                </span>
                <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-black/75 text-white border border-white/20 text-xs font-bold backdrop-blur-md">
                  {current.categoryName}
                </span>
              </div>

              {/* Bottom Information Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
                <div className="space-y-2 max-w-2xl">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    {current.year} &bull; {current.client || "Studio Original"}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {current.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-200 line-clamp-2 leading-relaxed font-medium">
                    {current.description}
                  </p>

                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    {current.tools.slice(0, 4).map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md bg-white/20 px-2 py-0.5 text-[11px] text-white font-bold backdrop-blur-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Buttons on Featured Slide */}
                <div className="flex items-center gap-3 shrink-0">
                  {onOpenLightbox && (
                    <button
                      onClick={() => onOpenLightbox(current)}
                      className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full font-bold text-xs sm:text-sm bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 transition-all cursor-pointer shadow-lg"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Inspect 4K</span>
                    </button>
                  )}
                  <Link
                    href={`/portfolio/${current.slug}`}
                    className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full font-bold text-xs sm:text-sm bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-md transition-all"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Slide switchers */}
            <div className="bg-zinc-900/90 border-t border-zinc-800 px-4 py-3 flex items-center justify-between gap-4 overflow-x-auto">
              <span className="text-xs text-zinc-300 font-bold shrink-0">
                Masterpiece Reels ({activeIndex + 1}/{featuredArtworks.length}):
              </span>
              <div className="flex items-center gap-2">
                {featuredArtworks.map((art, idx) => (
                  <button
                    key={art.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === activeIndex
                        ? "w-8 bg-amber-400"
                        : "w-2 bg-zinc-600 hover:bg-zinc-400"
                    }`}
                    title={art.title}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
