"use client";

import * as React from "react";
import { PortfolioItem } from "@/lib/mock-data";
import { CategoryFilter } from "@/components/portfolio/category-filter";
import { MasonryGrid } from "@/components/portfolio/masonry-grid";
import { LightboxModal } from "@/components/portfolio/lightbox-modal";
import { CommissionCtaBanner } from "@/components/commission/commission-cta-banner";
import { StudioMarquee } from "@/components/ui/studio-marquee";
import { motion } from "framer-motion";

interface PortfolioClientPageProps {
  initialArtworks: PortfolioItem[];
  categories: {
    id: string;
    slug: string;
    name: string;
    description: string;
    count: number;
    iconName: string;
  }[];
}

export function PortfolioClientPage({
  initialArtworks,
  categories,
}: PortfolioClientPageProps) {
  const [portfolio] = React.useState<PortfolioItem[]>(initialArtworks);
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [layoutMode, setLayoutMode] = React.useState<"masonry" | "grid">("masonry");
  const [selectedLightboxItem, setSelectedLightboxItem] =
    React.useState<PortfolioItem | null>(null);

  const filtered = portfolio.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch && item.status === "published";
  });

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Title with Smooth Fade-In Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white">
            Curated Visual Portfolio
          </h1>

          <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
            Explore digital illustrations, character turnaround sheets, chibi merchandise, emotes, and atmospheric background scenery crafted by the Ayamu Labs studio team.
          </p>
        </motion.div>

        {/* Filters with Fade-In */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            layoutMode={layoutMode}
            onLayoutChange={setLayoutMode}
            totalCount={portfolio.length}
          />
        </motion.div>

        {/* Gallery Grid with Fade-In */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <MasonryGrid
            artworks={filtered}
            onOpenLightbox={(item) => setSelectedLightboxItem(item)}
            layoutMode={layoutMode}
          />
        </motion.div>
      </div>

      {/* Dynamic Animated Studio Marquee (Full Screen Width) */}
      <StudioMarquee />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bottom Commission Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <CommissionCtaBanner />
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        artwork={selectedLightboxItem}
        onClose={() => setSelectedLightboxItem(null)}
        onNext={() => {
          if (!selectedLightboxItem) return;
          const idx = filtered.findIndex((a) => a.id === selectedLightboxItem.id);
          const next = (idx + 1) % filtered.length;
          setSelectedLightboxItem(filtered[next]);
        }}
        onPrev={() => {
          if (!selectedLightboxItem) return;
          const idx = filtered.findIndex((a) => a.id === selectedLightboxItem.id);
          const prev = (idx - 1 + filtered.length) % filtered.length;
          setSelectedLightboxItem(filtered[prev]);
        }}
      />
    </div>
  );
}