import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Validates whether a string is a valid URL or valid local asset path.
 * Accepts:
 * - Local asset paths (e.g., "/images/ayamu-hamiru.jpg")
 * - Full URLs with protocol (e.g., "https://vgen.co/ayamulabs")
 * - Domain URLs without protocol (e.g., "vgen.co/ayamulabs" -> parsed as "https://vgen.co/ayamulabs")
 */
export function isValidUrl(urlString: string): boolean {
  if (!urlString || !urlString.trim()) return true;
  const trimmed = urlString.trim();
  if (trimmed.startsWith("/") || trimmed.startsWith("./")) return true;
  try {
    const url = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname.includes(".")
    );
  } catch {
    return false;
  }
}

/**
 * Validates standard email address format.
 */
export function isValidEmail(emailString: string): boolean {
  if (!emailString || !emailString.trim()) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailString.trim());
}
