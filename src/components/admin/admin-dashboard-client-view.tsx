"use client";

import * as React from "react";
import Link from "next/link";
import {
  Palette,
  Eye,
  Layers,
  Heart,
  ArrowRight,
} from "lucide-react";
import { PortfolioItem } from "@/lib/mock-data";
import { AdminHeader } from "@/components/admin/admin-header";
import { StatsCard } from "@/components/admin/stats-card";
import { PortfolioTable } from "@/components/admin/portfolio-table";
import { useAdminLayout } from "@/components/admin/admin-layout-wrapper";

interface AdminDashboardClientViewProps {
  artworks: PortfolioItem[];
  categories: { id: string; name: string; slug: string; count: number }[];
  featuredArtworks: PortfolioItem[];
  totalViews: number;
  totalLikes: number;
}

export function AdminDashboardClientView({
  artworks,
  categories,
  featuredArtworks,
  totalViews,
  totalLikes,
}: AdminDashboardClientViewProps) {
  const { toggleMobile } = useAdminLayout();

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
      {/* Fixed Topbar */}
      <AdminHeader
        title="Studio Dashboard Overview"
        subtitle="Welcome to the Ayamu Labs Studio Content Management System."
        onMenuClick={toggleMobile}
      />

      {/* Full-width Scrollable Viewport */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* 1. Stats Metric Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatsCard
              title="Total Portfolio Items"
              value={artworks.length}
              change={`${featuredArtworks.length} Featured`}
              icon={Palette}
              color="amber"
            />
            <StatsCard
              title="Active Categories"
              value={`${categories.length} Categories`}
              change="Organized"
              icon={Layers}
              color="rose"
            />
            <StatsCard
              title="Total Showcase Views"
              value={totalViews.toLocaleString("en-US")}
              change="Live Analytics"
              icon={Eye}
              color="blue"
            />
            <StatsCard
              title="Total Appreciation Likes"
              value={totalLikes.toLocaleString("en-US")}
              change="Community Engaged"
              icon={Heart}
              color="emerald"
            />
          </div>

          {/* 2. Featured Showcase Artworks Spotlight Table */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white">
                  Featured Portfolio
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-400/20 text-amber-700 dark:text-amber-400">
                  {featuredArtworks.length} Active
                </span>
              </div>
              <Link
                href="/admin/portfolio"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                <span>Manage all {artworks.length} in Full Vault</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <PortfolioTable
              items={featuredArtworks}
              availableCategories={categories}
            />
          </div>
        </div>
      </div>
    </div>
  );
}