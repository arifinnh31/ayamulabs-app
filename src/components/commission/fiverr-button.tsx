import * as React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { INITIAL_STUDIO_PROFILE } from "@/lib/mock-data";
import { FiverrIcon } from "@/components/icons/brand-icons";

interface FiverrButtonProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function FiverrButton({
  href = INITIAL_STUDIO_PROFILE.fiverrUrl,
  size = "md",
  className,
}: FiverrButtonProps) {
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
        "inline-flex items-center justify-center font-bold text-white rounded-full bg-[#1DBF73] hover:bg-[#17A362] active:bg-[#138E55] shadow-md shadow-[#1DBF73]/25 hover:shadow-[#1DBF73]/40 hover:-translate-y-0.5 transition-all duration-200 select-none group cursor-pointer",
        sizeStyles[size],
        className
      )}
    >
      <span className="flex items-center gap-1.5">
        <FiverrIcon className={cn(iconSizes[size], "group-hover:scale-110 transition-transform")} />
        <span>Order on Fiverr</span>
      </span>
      <ExternalLink className="h-3 w-3 opacity-80 group-hover:opacity-100 transition-opacity ml-0.5" />
    </Link>
  );
}
