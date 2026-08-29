/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { cn } from "@/lib/utils";

export interface BrandIconProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  alt?: string;
}

/**
 * Official VGen Icon (from /images/vgen-icon.png)
 */
export function VGenIcon({
  className = "h-5 w-5",
  alt = "VGen icon",
  ...props
}: BrandIconProps) {
  return (
    <img
      src="/images/vgen-icon.png"
      alt={alt}
      loading="lazy"
      className={cn("inline-block shrink-0 object-contain", className)}
      {...props}
    />
  );
}

/**
 * Official Fiverr Icon (from /images/fiverr-icon.ico)
 */
export function FiverrIcon({
  className = "h-5 w-5",
  alt = "Fiverr icon",
  ...props
}: BrandIconProps) {
  return (
    <img
      src="/images/fiverr-icon.ico"
      alt={alt}
      loading="lazy"
      className={cn("inline-block shrink-0 object-contain", className)}
      {...props}
    />
  );
}

/**
 * Official X (Twitter) Icon (from /images/x-icon.png)
 */
export function XIcon({
  className = "h-4 w-4",
  alt = "X (Twitter) icon",
  ...props
}: BrandIconProps) {
  return (
    <img
      src="/images/x-icon.png"
      alt={alt}
      loading="lazy"
      className={cn("inline-block shrink-0 object-contain", className)}
      {...props}
    />
  );
}

/**
 * Official ArtStation Icon (from /images/artstation-icon.ico)
 */
export function ArtStationIcon({
  className = "h-4 w-4",
  alt = "ArtStation icon",
  ...props
}: BrandIconProps) {
  return (
    <img
      src="/images/artstation-icon.ico"
      alt={alt}
      loading="lazy"
      className={cn("inline-block shrink-0 object-contain", className)}
      {...props}
    />
  );
}

/**
 * Official Discord Icon (from /images/discord-icon.png)
 */
export function DiscordIcon({
  className = "h-4 w-4",
  alt = "Discord icon",
  ...props
}: BrandIconProps) {
  return (
    <img
      src="/images/discord-icon.png"
      alt={alt}
      loading="lazy"
      className={cn("inline-block shrink-0 object-contain", className)}
      {...props}
    />
  );
}
