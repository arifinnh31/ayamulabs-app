import { revalidatePath } from "next/cache";

/**
 * Safely calls Next.js revalidatePath without throwing when invoked
 * outside an active HTTP request lifecycle (such as test runners or CLI scripts).
 */
export function safeRevalidatePath(path: string, type?: "layout" | "page") {
  try {
    revalidatePath(path, type);
  } catch {
    // Gracefully handle invocation outside active request context
  }
}