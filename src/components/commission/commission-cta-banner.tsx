import * as React from "react";
import Link from "next/link";
import { ArrowRight, Palette } from "lucide-react";
import { VGenButton } from "./vgen-button";
import { FiverrButton } from "./fiverr-button";
import { CharacterAvatar } from "@/components/character/character-avatar";

interface CommissionCtaBannerProps {
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

export function CommissionCtaBanner({
  title = "Ready to Commission Your Next Creative Project?",
  subtitle = "Whether you need a high-res anime illustration, custom character sheet, chibi emote bundle, or atmospheric background art, find us on our official commission channels.",
  compact = false,
}: CommissionCtaBannerProps) {
  if (compact) {
    return (
      <div className="rounded-3xl border border-zinc-200 dark:border-amber-400/20 bg-amber-50/80 dark:bg-zinc-900/80 p-6 backdrop-blur-md shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CharacterAvatar size="sm" />
            <div>
              <h4 className="font-bold text-base text-zinc-950 dark:text-zinc-100">
                Commission Studio Projects
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                Book directly through our official profiles on VGen or Fiverr.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <VGenButton size="sm" />
            <FiverrButton size="sm" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-amber-50 via-white to-amber-50/40 dark:from-amber-400/5 dark:via-zinc-900 dark:to-zinc-950 p-8 sm:p-12 text-center backdrop-blur-md shadow-sm">
      {/* Background Decorative Rings */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-amber-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-rose-400/10 blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <div className="mb-4 flex items-center justify-center">
          <CharacterAvatar size="lg" withGlow />
        </div>

        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-white">
          {title}
        </h2>

        <p className="mt-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 max-w-xl leading-relaxed font-medium">
          {subtitle}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <VGenButton size="lg" />
          <FiverrButton size="lg" />
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full font-bold text-sm bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 transition-all shadow-md select-none cursor-pointer"
          >
            <Palette className="h-4 w-4" />
            <span>Explore Services</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          Official platform escrow &bull; Safe client protection &bull; Milestone delivery
        </p>
      </div>
    </section>
  );
}
