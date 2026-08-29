import * as React from "react";
import Link from "next/link";
import { Home, Palette } from "lucide-react";
import { CharacterAvatar } from "@/components/character/character-avatar";

export const metadata = {
  title: "404 - Page Not Found",
  description: "Oops! Even Ayamu sometimes wanders off into unpainted canvas territory.",
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative overflow-hidden">
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full bg-amber-400/5 dark:bg-amber-400/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-xl w-full text-center space-y-8 relative z-10">
        {/* Mascot Avatar with Animated Floating Badge */}
        <div className="flex flex-col items-center justify-center relative">
          <div className="relative group">
            <CharacterAvatar
              size="xl"
              withGlow
              withBorder
              className="border-4 border-amber-400 shadow-2xl ring-4 ring-amber-400/20"
            />
            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-zinc-950 text-xs font-black px-3 py-1 rounded-full shadow-lg border-2 border-white dark:border-zinc-900 animate-bounce">
              Oops!
            </div>
          </div>
        </div>

        {/* 404 Headline & Description */}
        <div className="space-y-3">
          <h1 className="text-6xl sm:text-8xl font-black tracking-tight text-zinc-950 dark:text-white">
            4<span className="text-amber-500 animate-pulse">0</span>4
          </h1>

          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Unpainted Territory Ahead!
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed font-medium">
            It looks like this layer was erased or hasn&apos;t been illustrated yet. Don&apos;t worry, Ayamu will guide you back to the main studio gallery!
          </p>
        </div>

        {/* Action Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-lg shadow-amber-400/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Home className="h-4 w-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-amber-600 dark:hover:text-amber-400 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer backdrop-blur-sm"
          >
            <Palette className="h-4 w-4 text-amber-500" />
            <span>Explore Portfolio Vault</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
