"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortfolioItem } from "@/lib/mock-data";
import { CategoryFilter } from "@/components/portfolio/category-filter";
import { MasonryGrid } from "@/components/portfolio/masonry-grid";
import { LightboxModal } from "@/components/portfolio/lightbox-modal";

interface HomeClientShowcaseProps {
  initialArtworks: PortfolioItem[];
  allArtworksCount?: number;
  categories: {
    id: string;
    slug: string;
    name: string;
    description: string;
    count: number;
    iconName: string;
  }[];
}

export function HomeClientShowcase({
  initialArtworks,
  allArtworksCount,
  categories,
}: HomeClientShowcaseProps) {
  const [artworks] = React.useState<PortfolioItem[]>(initialArtworks);
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [layoutMode, setLayoutMode] = React.useState<"masonry" | "grid">("masonry");
  const [selectedLightboxArtwork, setSelectedLightboxArtwork] =
    React.useState<PortfolioItem | null>(null);

  // Filter artworks based on category and search query (only featured items are displayed on home page)
  const filteredArtworks = artworks.filter((art) => {
    const matchesCategory =
      activeCategory === "all" || art.category === activeCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch && art.status === "published" && art.isFeatured;
  });

  // Display all curated featured works on Home Page (no slice limit)
  const displayedArtworks = filteredArtworks;

  const handleOpenLightbox = (artwork: PortfolioItem) => {
    setSelectedLightboxArtwork(artwork);
  };

  const handleCloseLightbox = () => {
    setSelectedLightboxArtwork(null);
  };

  const handleNextLightbox = () => {
    if (!selectedLightboxArtwork) return;
    const currentIndex = displayedArtworks.findIndex(
      (a) => a.id === selectedLightboxArtwork.id
    );
    const nextIndex = (currentIndex + 1) % displayedArtworks.length;
    setSelectedLightboxArtwork(displayedArtworks[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!selectedLightboxArtwork) return;
    const currentIndex = displayedArtworks.findIndex(
      (a) => a.id === selectedLightboxArtwork.id
    );
    const prevIndex =
      (currentIndex - 1 + displayedArtworks.length) % displayedArtworks.length;
    setSelectedLightboxArtwork(displayedArtworks[prevIndex]);
  };

  return (
    <section id="showcase" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-2">
              STUDIO REPOSITORY
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
              Featured Portfolio
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-sm font-medium">
            Explore digital illustrations, character sheets, chibi merchandise, emotes, and background scenery.
          </p>
        </div>

        {/* Interactive Filtering Tabs & Search */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          layoutMode={layoutMode}
          onLayoutChange={setLayoutMode}
          totalCount={artworks.length}
        />

        {/* Dynamic Grid */}
        <MasonryGrid
          artworks={displayedArtworks}
          onOpenLightbox={handleOpenLightbox}
          layoutMode={layoutMode}
        />

        {/* View Full Portfolio CTA Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-full font-bold text-sm bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all select-none group cursor-pointer"
          >
            <span>Explore Full Portfolio Vault</span>
            <span className="text-xs bg-amber-400 text-zinc-950 px-2.5 py-0.5 rounded-full font-black group-hover:scale-105 transition-transform">
              {allArtworksCount !== undefined ? allArtworksCount : artworks.length} Works
            </span>
            <ArrowRight className="h-4 w-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Fullscreen Lightbox Inspector Modal */}
      <LightboxModal
        artwork={selectedLightboxArtwork}
        onClose={handleCloseLightbox}
        onNext={handleNextLightbox}
        onPrev={handlePrevLightbox}
      />
    </section>
  );
}