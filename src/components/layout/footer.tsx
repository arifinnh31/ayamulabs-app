"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  VGenIcon,
  FiverrIcon,
  XIcon,
  ArtStationIcon,
  DiscordIcon,
} from "@/components/icons/brand-icons";
import { INITIAL_STUDIO_PROFILE } from "@/lib/mock-data";
import { CharacterAvatar } from "@/components/character/character-avatar";

export function Footer() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin") || pathname === "/login";

  if (isAdminPage) {
    return null;
  }

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Studio Brand & Character Lore */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <CharacterAvatar size="md" withBorder withGlow />
              <div>
                <span className="flex items-center gap-1 font-black text-xl text-zinc-950 dark:text-white tracking-tight">
                  Ayamu <span className="text-amber-500">Labs</span>
                </span>
                <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  Creative Studio
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              A digital art studio and creative powerhouse with our signature character{" "}
              <strong className="text-zinc-950 dark:text-white font-bold">
                {INITIAL_STUDIO_PROFILE.characterName}
              </strong>
              .
              <br />
              Crafting top-tier illustrations, character turnarounds, and stream assets.
            </p>

            {/* Social Brand Icon Buttons - Full Solid Brand Colored Circles */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* X (Twitter) */}
              <Link
                href={INITIAL_STUDIO_PROFILE.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all duration-200 shadow-md shadow-black/20 hover:shadow-lg hover:-translate-y-0.5 group cursor-pointer"
                title="X (Twitter)"
                aria-label="X (Twitter)"
              >
                <XIcon className="h-5 w-5" />
              </Link>

              {/* ArtStation */}
              <Link
                href={INITIAL_STUDIO_PROFILE.artstationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#13AFF0] hover:bg-[#0e96d1] transition-all duration-200 shadow-md shadow-[#13AFF0]/30 hover:shadow-lg hover:shadow-[#13AFF0]/50 hover:-translate-y-0.5 group cursor-pointer"
                title="ArtStation"
                aria-label="ArtStation"
              >
                <ArtStationIcon className="h-5 w-5" />
              </Link>

              {/* Discord */}
              <Link
                href={INITIAL_STUDIO_PROFILE.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5865F2] hover:bg-[#4752C4] transition-all duration-200 shadow-md shadow-[#5865F2]/30 hover:shadow-lg hover:shadow-[#5865F2]/50 hover:-translate-y-0.5 group cursor-pointer"
                title="Discord"
                aria-label="Discord"
              >
                <DiscordIcon className="h-5 w-5" />
              </Link>

              {/* VGen */}
              <Link
                href={INITIAL_STUDIO_PROFILE.vgenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A3FF00] hover:bg-[#92E800] transition-all duration-200 shadow-md shadow-[#A3FF00]/30 hover:shadow-lg hover:shadow-[#A3FF00]/50 hover:-translate-y-0.5 group cursor-pointer"
                title="VGen"
                aria-label="VGen"
              >
                <VGenIcon className="h-5 w-5" />
              </Link>

              {/* Fiverr */}
              <Link
                href={INITIAL_STUDIO_PROFILE.fiverrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1DBF73] hover:bg-[#17A362] transition-all duration-200 shadow-md shadow-[#1DBF73]/30 hover:shadow-lg hover:shadow-[#1DBF73]/50 hover:-translate-y-0.5 group cursor-pointer"
                title="Fiverr"
                aria-label="Fiverr"
              >
                <FiverrIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300 font-bold">
              <li>
                <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Studio Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Commission Hub Platforms */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Official Commission Links
            </h4>
            <div className="space-y-2.5">
              <Link
                href={INITIAL_STUDIO_PROFILE.vgenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl border-2 border-[#A3FF00]/40 bg-gradient-to-r from-[#A3FF00]/15 via-lime-50/50 to-white dark:from-[#A3FF00]/10 dark:via-zinc-900 dark:to-zinc-950 text-xs font-bold text-zinc-950 dark:text-lime-300 hover:border-[#A3FF00] hover:shadow-lg hover:shadow-[#A3FF00]/15 transition-all group shadow-sm"
              >
                <span className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#A3FF00] p-1 shadow-sm">
                    <VGenIcon className="h-full w-full" />
                  </span>
                  <span>VGen Studio</span>
                </span>
                <span className="text-[10px] bg-[#A3FF00] text-zinc-950 px-2.5 py-1 rounded-full font-black group-hover:scale-105 transition-transform">
                  Order &rarr;
                </span>
              </Link>

              <Link
                href={INITIAL_STUDIO_PROFILE.fiverrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl border-2 border-[#1DBF73]/40 bg-gradient-to-r from-[#1DBF73]/15 via-emerald-50/50 to-white dark:from-[#1DBF73]/10 dark:via-zinc-900 dark:to-zinc-950 text-xs font-bold text-emerald-950 dark:text-emerald-300 hover:border-[#1DBF73] hover:shadow-lg hover:shadow-[#1DBF73]/15 transition-all group shadow-sm"
              >
                <span className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#1DBF73] text-white p-1 shadow-sm">
                    <FiverrIcon className="h-full w-full" />
                  </span>
                  <span>Fiverr Studio</span>
                </span>
                <span className="text-[10px] bg-[#1DBF73] text-white px-2.5 py-1 rounded-full font-bold group-hover:scale-105 transition-transform">
                  Order &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800/80">
          <p className="flex items-center gap-1 font-medium">
            &copy; {new Date().getFullYear()} Ayamu Labs. All rights reserved.
          </p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
            Made with ❤️ by Ayamu Labs.
          </p>
        </div>
      </div>
    </footer>
  );
}
