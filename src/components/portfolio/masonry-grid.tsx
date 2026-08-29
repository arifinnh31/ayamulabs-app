"use client";

import * as React from "react";
import { PortfolioCard } from "./portfolio-card";
import { PortfolioItem } from "@/lib/mock-data";
import { CharacterAvatar } from "@/components/character/character-avatar";

interface MasonryGridProps {
  artworks: PortfolioItem[];
  onOpenLightbox?: (artwork: PortfolioItem) => void;
  layoutMode?: "masonry" | "grid";
}

export function MasonryGrid({
  artworks,
  onOpenLightbox,
  layoutMode = "masonry",
}: MasonryGridProps) {
  if (artworks.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 p-12 text-center my-8">
        <div className="flex justify-center mb-3">
          <CharacterAvatar size="md" />
        </div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          No matching portfolio items found
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto font-medium">
          Try selecting another category or adjusting your search keywords.
        </p>
      </div>
    );
  }

  if (layoutMode === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork, index) => (
          <PortfolioCard
            key={artwork.id}
            artwork={artwork}
            onOpenLightbox={onOpenLightbox}
            priority={index < 3}
          />
        ))}
      </div>
    );
  }

  // Masonry layout using column distribution
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {artworks.map((artwork, index) => (
        <div key={artwork.id} className="break-inside-avoid">
          <PortfolioCard
            artwork={artwork}
            onOpenLightbox={onOpenLightbox}
            priority={index < 3}
          />
        </div>
      ))}
    </div>
  );
}
