"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CharacterAvatar } from "@/components/character/character-avatar";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  onMenuClick?: () => void;
}

export function AdminHeader({
  title,
  subtitle,
  action,
  onMenuClick,
}: AdminHeaderProps) {
  return (
    <header className="shrink-0 h-16 sm:h-20 flex items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-[#0c0d12]/85 backdrop-blur-md px-4 sm:px-6 z-30">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden shrink-0 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        )}
        <div className="flex flex-col justify-center min-w-0">
          <h1 className="text-sm sm:text-xl font-bold text-zinc-950 dark:text-white leading-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-tight mt-0.5 truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {action}
        <ThemeToggle />
        <div className="flex items-center gap-2 border-l border-zinc-200 dark:border-zinc-800 pl-2 sm:pl-3">
          <CharacterAvatar size="sm" />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-zinc-950 dark:text-white leading-none">
              Ayamu Hamiru
            </p>
            <p className="text-[10px] text-amber-700 dark:text-amber-400 font-bold mt-0.5">
              Super Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
