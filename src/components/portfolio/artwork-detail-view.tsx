"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { PortfolioItem } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { BeforeAfterSlider } from "@/components/portfolio/before-after-slider";
import { ProjectMetaSidebar } from "@/components/portfolio/project-meta-sidebar";
import { ProjectNavigation } from "@/components/portfolio/project-navigation";
import { LightboxModal } from "@/components/portfolio/lightbox-modal";
import { CommissionCtaBanner } from "@/components/commission/commission-cta-banner";

interface ArtworkDetailViewProps {
  artwork: PortfolioItem;
  prevProject: { slug: string; title: string; coverImage: string } | null;
  nextProject: { slug: string; title: string; coverImage: string } | null;
}

export function ArtworkDetailView({
  artwork,
  prevProject,
  nextProject,
}: ArtworkDetailViewProps) {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation back and quick breadcrumb */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-amber-600 dark:hover:text-amber-400 transition-all shadow-sm group cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio Vault</span>
          </Link>

          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">
              {artwork.categoryName}
            </Badge>
            <span className="text-xs text-zinc-600 dark:text-zinc-400 font-bold">
              {artwork.year}
            </span>
          </div>
        </div>

        {/* Project Header Title */}
        <div className="space-y-3 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
            {artwork.title}
          </h1>
          <p className="text-base sm:text-xl text-zinc-700 dark:text-zinc-300 font-medium">
            {artwork.subtitle}
          </p>
        </div>

        {/* Main Key Visual Asset Stage */}
        <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-2xl group">
          <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full min-h-[360px] sm:min-h-[500px]">
            <Image
              src={artwork.coverImage}
              alt={artwork.title}
              fill
              unoptimized
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Quick 4K zoom button */}
            <div className="absolute bottom-6 right-6 z-20">
              <button
                onClick={() => setLightboxOpen(true)}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full font-bold text-xs sm:text-sm bg-black/75 hover:bg-amber-400 hover:text-zinc-950 text-white backdrop-blur-md border border-white/20 transition-all shadow-xl cursor-pointer"
              >
                <Eye className="h-4 w-4" />
                <span>Inspect 4K Fullscreen</span>
              </button>
            </div>
          </div>
        </div>

        {/* Two Columns: Case Study Story & Metadata Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Story & Media Gallery */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview & Project Concept */}
            {artwork.description && artwork.description.trim() && (
              <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80 space-y-4">
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                  Project Overview & Vision
                </h3>
                <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line font-medium">
                  {artwork.description}
                </p>
              </div>
            )}

            {/* Behind the Craft: Concept Narrative */}
            {artwork.conceptStory && artwork.conceptStory.trim() && (
              <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80 space-y-4">
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                  Creative Process & Technique
                </h3>
                <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line font-medium">
                  {artwork.conceptStory}
                </p>
              </div>
            )}

            {/* Interactive Before & After Shader Slider */}
            {artwork.beforeAfter && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                    Behind the Craft (Process Comparison)
                  </h3>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                    Drag the slider to compare
                  </span>
                </div>
                <div className="shadow-xl rounded-2xl overflow-hidden">
                  {(() => {
                    const beforeCap = artwork.gallery.find((g) => g.url === artwork.beforeAfter?.beforeImage)?.caption?.trim();
                    const afterCap = artwork.gallery.find((g) => g.url === artwork.beforeAfter?.afterImage)?.caption?.trim();
                    const resolvedBeforeLabel = beforeCap || (artwork.beforeAfter.beforeLabel && artwork.beforeAfter.beforeLabel !== "Rough Sketch" ? artwork.beforeAfter.beforeLabel : "") || beforeCap || artwork.beforeAfter.beforeLabel || "Before";
                    const resolvedAfterLabel = afterCap || (artwork.beforeAfter.afterLabel && artwork.beforeAfter.afterLabel !== "Final Render" ? artwork.beforeAfter.afterLabel : "") || afterCap || artwork.beforeAfter.afterLabel || "After";

                    return (
                      <BeforeAfterSlider
                        beforeImage={artwork.beforeAfter.beforeImage}
                        afterImage={artwork.beforeAfter.afterImage}
                        beforeLabel={resolvedBeforeLabel}
                        afterLabel={resolvedAfterLabel}
                      />
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Detailed Gallery Breakdown Sheets */}
            {artwork.gallery && artwork.gallery.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                  Detailed Renders & Breakdowns
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {artwork.gallery.map((media, index) => (
                    <div
                      key={index}
                      className="group relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 shadow-md hover:shadow-xl transition-all"
                    >
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={media.url}
                          alt={media.caption || `${artwork.title} gallery asset ${index + 1}`}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 100vw, 400px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {media.caption && (
                        <div className="p-3.5 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                            {media.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Project Meta Sidebar */}
          <div className="lg:col-span-4 sticky top-24">
            <ProjectMetaSidebar artwork={artwork} />
          </div>
        </div>

        {/* Project Next / Prev Navigation */}
        <ProjectNavigation prevProject={prevProject} nextProject={nextProject} />

        {/* Bottom Commission Banner */}
        <CommissionCtaBanner />
      </div>

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        artwork={lightboxOpen ? artwork : null}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}