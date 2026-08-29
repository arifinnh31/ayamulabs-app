"use client";

import * as React from "react";
import { Share2, Check } from "lucide-react";
import { PortfolioItem } from "@/lib/mock-data";
import { VGenButton } from "@/components/commission/vgen-button";
import { FiverrButton } from "@/components/commission/fiverr-button";
import { useToast } from "@/components/ui/toast";

interface ProjectMetaSidebarProps {
  artwork: PortfolioItem;
}

export function ProjectMetaSidebar({ artwork }: ProjectMetaSidebarProps) {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "Project link copied to clipboard successfully.",
        type: "success",
      });
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <aside className="space-y-6">
      {/* Project Metadata Card */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80 backdrop-blur-md">
        <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-4">
          Project Details
        </h4>

        <dl className="space-y-3.5 text-xs sm:text-sm">
          {artwork.categoryName && (
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400 font-medium">Category</dt>
              <dd className="font-bold text-zinc-950 dark:text-zinc-100 mt-0.5">
                {artwork.categoryName}
              </dd>
            </div>
          )}

          {artwork.client && artwork.client.trim() && (
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400 font-medium">Client / Initiative</dt>
              <dd className="font-bold text-zinc-950 dark:text-zinc-100 mt-0.5">
                {artwork.client}
              </dd>
            </div>
          )}

          {artwork.year && artwork.year.trim() && (
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400 font-medium">Year Completed</dt>
              <dd className="font-bold text-zinc-950 dark:text-zinc-100 mt-0.5">
                {artwork.year}
              </dd>
            </div>
          )}

          {artwork.role && artwork.role.length > 0 && (
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400 font-medium">Studio Roles</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {artwork.role.map((r) => (
                  <span
                    key={r}
                    className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs font-bold text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-transparent"
                  >
                    {r}
                  </span>
                ))}
              </dd>
            </div>
          )}

          {artwork.tools && artwork.tools.length > 0 && (
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400 font-medium">Software & Tools</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {artwork.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-amber-100 border border-amber-300 dark:bg-amber-400/10 dark:border-amber-400/30 px-2.5 py-0.5 text-xs font-bold text-amber-950 dark:text-amber-300"
                  >
                    {tool}
                  </span>
                ))}
              </dd>
            </div>
          )}
        </dl>

        {/* Share Button */}
        <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-amber-400 hover:text-zinc-950 hover:border-amber-400 dark:hover:bg-amber-400 dark:hover:text-zinc-950 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                <span>Share Project Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Official Commission Card */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-amber-50 via-white to-rose-50/30 dark:from-amber-400/5 dark:via-zinc-900 dark:to-rose-400/5 p-6 shadow-sm">
        <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
          Love this visual style?
        </h4>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 mb-4 leading-relaxed font-medium">
          Order a custom commission with this artistic direction on our official platforms.
        </p>

        <div className="space-y-2.5">
          <VGenButton href={artwork.vgenUrl} className="w-full" size="md" />
          <FiverrButton href={artwork.fiverrUrl} className="w-full" size="md" />
        </div>
      </div>
    </aside>
  );
}
