"use client";

import * as React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export function CharacterEasterEgg() {
  const pathname = usePathname();
  const [clickCount, setClickCount] = React.useState(0);
  const [showBubble, setShowBubble] = React.useState(false);

  if (pathname.startsWith("/admin") || pathname === "/login") {
    return null;
  }

  const greetings = [
    "Hatching Creativity! 🐣",
    "Welcome to Ayamu Labs! ✨",
    "Made with ❤️ & Clip Studio Paint!",
    "Stay Awesome & Inspired! 🌟",
    "Let's Create Masterpieces! 🎨",
  ];

  const handleClick = (e: React.MouseEvent) => {
    setClickCount((prev) => prev + 1);
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 2400);

    // Multi-color celebratory confetti burst
    confetti({
      particleCount: 45,
      spread: 75,
      origin: {
        x: (e.clientX || 60) / window.innerWidth,
        y: (e.clientY || window.innerHeight - 60) / window.innerHeight,
      },
      colors: ["#F59E0B", "#F43F5E", "#A3FF00", "#1DBF73", "#FEF08A", "#FFFFFF"],
    });
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start select-none">
      {/* Interactive Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            className="mb-2 rounded-2xl bg-zinc-950/95 dark:bg-white text-white dark:text-zinc-950 px-3 py-1.5 text-xs font-black shadow-xl border border-amber-400/40 whitespace-nowrap"
          >
            {greetings[(clickCount - 1) % greetings.length]}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character circular floating button */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        title="Click Ayamu Hamiru for a cheerful surprise!"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-400 bg-amber-100 shadow-xl shadow-amber-400/35 hover:shadow-amber-400/60 transition-all duration-300 cursor-pointer overflow-hidden animate-float-slow"
      >
        <Image
          src="/images/ayamu-hamiru.jpg"
          alt="Ayamu Character Easter Egg"
          fill
          sizes="60px"
          className="object-cover object-top group-hover:rotate-6 transition-transform duration-300"
        />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] text-zinc-950 font-black items-center justify-center">
            ★
          </span>
        </span>
      </motion.button>
    </div>
  );
}
