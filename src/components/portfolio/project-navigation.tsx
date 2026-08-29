import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface NavigationArtwork {
  slug: string;
  title: string;
  coverImage: string;
}

interface ProjectNavigationProps {
  prevProject: NavigationArtwork | null;
  nextProject: NavigationArtwork | null;
}

export function ProjectNavigation({
  prevProject,
  nextProject,
}: ProjectNavigationProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10 border-t border-zinc-200 dark:border-zinc-800">
      {/* Previous Project */}
      {prevProject ? (
        <Link
          href={`/portfolio/${prevProject.slug}`}
          className="group flex items-center gap-4 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm hover:border-amber-400 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-amber-400 transition-all"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-amber-400 group-hover:text-zinc-950 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </div>
          <div className="relative h-14 w-14 shrink-0 rounded-2xl overflow-hidden bg-zinc-950">
            <Image
              src={prevProject.coverImage}
              alt={prevProject.title}
              fill
              sizes="56px"
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="overflow-hidden">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Previous Portfolio
            </span>
            <h5 className="text-sm font-bold text-zinc-950 dark:text-white truncate group-hover:text-amber-500 transition-colors">
              {prevProject.title}
            </h5>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {/* Next Project */}
      {nextProject ? (
        <Link
          href={`/portfolio/${nextProject.slug}`}
          className="group flex items-center justify-end text-right gap-4 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm hover:border-amber-400 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-amber-400 transition-all"
        >
          <div className="overflow-hidden">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Next Portfolio
            </span>
            <h5 className="text-sm font-bold text-zinc-950 dark:text-white truncate group-hover:text-amber-500 transition-colors">
              {nextProject.title}
            </h5>
          </div>
          <div className="relative h-14 w-14 shrink-0 rounded-2xl overflow-hidden bg-zinc-950">
            <Image
              src={nextProject.coverImage}
              alt={nextProject.title}
              fill
              sizes="56px"
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-amber-400 group-hover:text-zinc-950 transition-colors">
            <ChevronRight className="h-5 w-5" />
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
