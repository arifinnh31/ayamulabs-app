"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { useTheme } from "./theme-provider";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const isDark = theme === "dark";

  const handleToggle = () => {
    const nextTheme = isDark ? "light" : "dark";

    const doc = document as Document & {
      startViewTransition?: (updateCallback: () => void) => { ready: Promise<void> };
    };

    if (
      !doc.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(nextTheme);
      return;
    }

    // Dynamic viewport calculations with full diagonal radius coverage
    const width = typeof window !== "undefined" ? Math.max(window.innerWidth, document.documentElement.clientWidth) : 1920;
    const height = typeof window !== "undefined" ? Math.max(window.innerHeight, document.documentElement.clientHeight) : 1080;
    const endRadius = Math.hypot(width, height) * 1.5;

    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at 50% 0px)`,
            `circle(${endRadius}px at 50% 0px)`,
          ],
        },
        {
          duration: 880,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  if (!isMounted) {
    return (
      <div className="h-9 w-9 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 animate-pulse" />
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.88 }}
      onClick={handleToggle}
      aria-label="Toggle theme"
      title={isDark ? "Switch to Warm Light Theme" : "Switch to Obsidian Dark Theme"}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300/80 bg-white/90 text-zinc-700 shadow-sm backdrop-blur-md hover:bg-amber-100 hover:text-amber-600 hover:border-amber-400/50 hover:shadow-amber-400/20 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-amber-400 dark:hover:border-amber-400/40 dark:hover:shadow-amber-400/20 transition-colors cursor-pointer overflow-hidden group ${
        className || ""
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="dark-sun"
            initial={{ rotate: -90, scale: 0.2, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.2, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center justify-center"
          >
            <Sun className="h-4 w-4 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)] group-hover:rotate-45 transition-transform duration-300" />
          </motion.div>
        ) : (
          <motion.div
            key="light-moon"
            initial={{ rotate: 90, scale: 0.2, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.2, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center justify-center"
          >
            <Moon className="h-4 w-4 text-zinc-800 dark:text-zinc-200 drop-shadow-[0_0_6px_rgba(245,158,11,0.4)] group-hover:-rotate-12 transition-transform duration-300" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

