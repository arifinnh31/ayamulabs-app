import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface CharacterAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  withGlow?: boolean;
  withBorder?: boolean;
}

export function CharacterAvatar({
  size = "md",
  className,
  withGlow = false,
  withBorder = true,
}: CharacterAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-20 h-20",
    xl: "w-32 h-32 md:w-44 md:h-44",
  };

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden shrink-0 select-none bg-amber-200 transition-all duration-300",
        sizeClasses[size],
        withBorder && "ring-2 ring-amber-400 dark:ring-amber-400/80 shadow-md",
        withGlow && "shadow-lg shadow-amber-400/30",
        className
      )}
    >
      <Image
        src="/images/ayamu-hamiru.jpg"
        alt="Ayamu Hamiru Character"
        fill
        sizes="(max-width: 768px) 100px, 200px"
        className="object-cover object-top hover:scale-105 transition-transform duration-300"
        priority
      />
    </div>
  );
}
