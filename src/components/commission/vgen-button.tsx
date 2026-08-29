import * as React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { INITIAL_STUDIO_PROFILE } from "@/lib/mock-data";
import { VGenIcon } from "@/components/icons/brand-icons";

interface VGenButtonProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function VGenButton({
  href = INITIAL_STUDIO_PROFILE.vgenUrl,
  size = "md",
  className,
}: VGenButtonProps) {
  const sizeStyles = {
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-12 px-6 text-base gap-2.5",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center font-extrabold text-zinc-950 rounded-full bg-[#A3FF00] hover:bg-[#92E800] active:bg-[#80D000] shadow-md shadow-[#A3FF00]/30 hover:shadow-[#A3FF00]/50 hover:-translate-y-0.5 transition-all duration-200 select-none group cursor-pointer",
        sizeStyles[size],
        className
      )}
    >
      <span className="flex items-center gap-1.5">
        <VGenIcon className={cn(iconSizes[size], "group-hover:scale-110 transition-transform")} />
        <span>Order on VGen</span>
      </span>
      <ExternalLink className="h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity ml-0.5" />
    </Link>
  );
}
