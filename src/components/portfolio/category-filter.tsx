"use client";

import * as React from "react";
import { Search, LayoutGrid, Rows } from "lucide-react";
import { Category } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  layoutMode: "masonry" | "grid";
  onLayoutChange: (mode: "masonry" | "grid") => void;
  totalCount: number;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  layoutMode,
  onLayoutChange,
  totalCount,
}: CategoryFilterProps) {
  return (
    <div className="space-y-4 mb-8">
      {/* Category Pills and Search Bar Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category Pills List */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <button
            onClick={() => onSelectCategory("all")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${
              activeCategory === "all"
                ? "bg-amber-400 text-zinc-950 shadow-md shadow-amber-400/20 font-extrabold"
                : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border border-zinc-200 dark:border-transparent dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            <span>All Portfolio</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                activeCategory === "all"
                  ? "bg-zinc-950 text-amber-300"
                  : "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300"
              }`}
            >
              {totalCount}
            </span>
          </button>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${
                  isActive
                    ? "bg-amber-400 text-zinc-950 shadow-md shadow-amber-400/20 font-extrabold"
                    : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border border-zinc-200 dark:border-transparent dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                    isActive
                      ? "bg-zinc-950 text-amber-300"
                      : "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Layout Toggle Controls */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="flex-1 lg:w-64">
            <Input
              type="text"
              placeholder="Search projects, tags..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              icon={<Search className="h-4 w-4" />}
              className="h-10 text-xs"
            />
          </div>

          {/* Layout Mode Switcher */}
          <div className="flex items-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-1">
            <button
              onClick={() => onLayoutChange("masonry")}
              className={`p-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                layoutMode === "masonry"
                  ? "bg-amber-400 text-zinc-950 font-bold shadow-sm"
                  : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              }`}
              title="Masonry Layout"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => onLayoutChange("grid")}
              className={`p-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                layoutMode === "grid"
                  ? "bg-amber-400 text-zinc-950 font-bold shadow-sm"
                  : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              }`}
              title="Standard Grid Layout"
            >
              <Rows className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
