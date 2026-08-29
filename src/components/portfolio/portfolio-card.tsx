"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ArrowUpRight, Heart } from "lucide-react";
import { PortfolioItem } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { toggleArtworkLike } from "@/actions/portfolio";

interface PortfolioCardProps {
  artwork: PortfolioItem;
  portfolioItem?: PortfolioItem;
  onOpenLightbox?: (item: PortfolioItem) => void;
  priority?: boolean;
}

const isArtworkLiked = (id: string): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem("ayamulabs_liked_artworks");
    if (!stored) return false;
    const list: string[] = JSON.parse(stored);
    return Array.isArray(list) && list.includes(id);
  } catch {
    return false;
  }
};

const setArtworkLikedInStorage = (id: string, liked: boolean) => {
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem("ayamulabs_liked_artworks");
    let list: string[] = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(list)) list = [];
    if (liked) {
      if (!list.includes(id)) list.push(id);
    } else {
      list = list.filter((item) => item !== id);
    }
    localStorage.setItem("ayamulabs_liked_artworks", JSON.stringify(list));
    window.dispatchEvent(new Event("ayamulabs_likes_updated"));
  } catch {
    // Ignore storage errors
  }
};

export function PortfolioCard({
  artwork,
  portfolioItem,
  onOpenLightbox,
  priority = false,
}: PortfolioCardProps) {
  const item = portfolioItem || artwork;

  const hasLiked = React.useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      window.addEventListener("ayamulabs_likes_updated", callback);
      return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("ayamulabs_likes_updated", callback);
      };
    },
    () => isArtworkLiked(item.id),
    () => false
  );

  const [likeDelta, setLikeDelta] = React.useState(0);
  const [isMobileActive, setIsMobileActive] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const displayLikes = Math.max(0, item.likes + likeDelta);

  // Auto-dismiss mobile revealed controls when tapping outside
  React.useEffect(() => {
    if (!isMobileActive) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsMobileActive(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [isMobileActive]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const nextLiked = !hasLiked;
    setLikeDelta((prev) => (nextLiked ? prev + 1 : prev - 1));
    setArtworkLikedInStorage(item.id, nextLiked);

    try {
      await toggleArtworkLike(item.id, nextLiked);
    } catch (err) {
      console.error("Failed to sync like with server:", err);
    }
  };

  const handleMediaTap = () => {
    setIsMobileActive((prev) => !prev);
  };

  const handleLightboxClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onOpenLightbox) {
      onOpenLightbox(item);
    }
  };

  const aspectClasses = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[16/10]",
    square: "aspect-square",
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/95 shadow-sm hover:shadow-2xl hover:shadow-amber-400/15 hover:border-amber-400/80 dark:border-zinc-800/80 dark:bg-zinc-900/90 dark:hover:border-amber-400/50 backdrop-blur-sm transition-colors duration-300"
    >
      {/* Media Box with Shimmer Shine effect */}
      <div
        onClick={handleMediaTap}
        className={`relative w-full ${aspectClasses[item.aspectRatio]} overflow-hidden bg-zinc-950 shimmer-effect cursor-pointer`}
      >
        <Image
          src={item.coverImage}
          alt={item.title}
          fill
          unoptimized
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover object-center transition-transform duration-700 ease-out ${
            isMobileActive ? "scale-108" : "group-hover:scale-108"
          }`}
        />

        {/* Ambient gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 ${
            isMobileActive ? "opacity-80" : "opacity-60 group-hover:opacity-80"
          }`}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <Badge
            variant="default"
            size="sm"
            className="bg-black/75 text-white backdrop-blur-md border-white/20 text-[11px] font-bold shadow-sm"
          >
            {item.categoryName}
          </Badge>

          {item.isFeatured && (
            <span className="flex items-center rounded-full bg-amber-400 text-zinc-950 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-md animate-pulse-glow">
              Featured
            </span>
          )}
        </div>

        {/* Quick Action Floating Glass Controls */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 z-20 ${
            isMobileActive
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto"
          }`}
        >
          {onOpenLightbox && (
            <button
              onClick={handleLightboxClick}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-black/80 hover:bg-amber-400 hover:text-zinc-950 text-white backdrop-blur-md border border-white/30 transition-all duration-200 shadow-xl transform scale-95 hover:scale-110 active:scale-90 cursor-pointer"
              title="Inspect 4K Fullscreen"
              aria-label="Inspect 4K Fullscreen"
            >
              <Eye className="h-5 w-5" />
            </button>
          )}

          <Link
            href={`/portfolio/${item.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all duration-200 shadow-xl transform scale-95 hover:scale-110 active:scale-90"
            title="Read Case Study"
            aria-label="Read Case Study"
          >
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1.5 font-semibold">
            <span>{item.year}</span>
            <span>{item.client || "Studio Original"}</span>
          </div>

          <Link href={`/portfolio/${item.slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
              {item.title}
            </h3>
          </Link>

          <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed font-medium">
            {item.subtitle}
          </p>
        </div>

        {/* Tools and Interaction Footer */}
        <div className="pt-2.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-hidden">
            {item.tools.slice(0, 2).map((tool) => (
              <span
                key={tool}
                className="text-[10px] rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 px-2 py-0.5 font-bold whitespace-nowrap"
              >
                {tool}
              </span>
            ))}
            {item.tools.length > 2 && (
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold">
                +{item.tools.length - 2}
              </span>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleLike}
            className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
              hasLiked
                ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
                : "text-zinc-500 hover:text-rose-500 dark:text-zinc-400"
            }`}
            title="Like this artwork"
          >
            <Heart
              className={`h-3.5 w-3.5 transition-transform ${
                hasLiked ? "fill-rose-500 text-rose-500 scale-110" : ""
              }`}
            />
            <span>{displayLikes}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
