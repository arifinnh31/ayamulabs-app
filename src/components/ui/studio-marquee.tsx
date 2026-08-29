import * as React from "react";
import {
  Palette,
  PenTool,
  Sparkles,
  Heart,
  Smile,
  Mountain,
  Tv,
  BadgeCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StudioMarqueeProps {
  className?: string;
}

export function StudioMarquee({ className }: StudioMarqueeProps) {
  const items = [
    { label: "CLIP STUDIO PAINT MASTERY", icon: Palette },
    { label: "ORIGINAL CHARACTER DESIGN", icon: PenTool },
    { label: "ANIME SPLASH ART", icon: Sparkles },
    { label: "CHIBI MERCHANDISE & STICKERS", icon: Heart },
    { label: "TWITCH & DISCORD EMOTES", icon: Smile },
    { label: "BACKGROUND & ENVIRONMENT ART", icon: Mountain },
    { label: "VTUBER VISUAL ASSETS", icon: Tv },
    { label: "OFFICIAL COMMISSIONS OPEN VIA VGEN & FIVERR", icon: BadgeCheck },
  ];

  return (
    <div
      className={cn(
        "w-full overflow-hidden border-y border-zinc-200 dark:border-zinc-800/80 bg-amber-400/10 dark:bg-amber-400/5 py-3 backdrop-blur-sm select-none",
        className
      )}
    >
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {/* First Loop */}
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`item-1-${idx}`} className="flex items-center gap-8">
              <span className="text-xs font-black tracking-widest uppercase text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>{item.label}</span>
              </span>
            </div>
          );
        })}

        {/* Duplicate Loop for seamless wrap */}
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`item-2-${idx}`} className="flex items-center gap-8">
              <span className="text-xs font-black tracking-widest uppercase text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>{item.label}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

