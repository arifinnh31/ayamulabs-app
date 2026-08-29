"use client";

import * as React from "react";
import { PortfolioItem } from "@/lib/mock-data";
import { AdminHeader } from "@/components/admin/admin-header";
import { useAdminLayout } from "@/components/admin/admin-layout-wrapper";
import { PortfolioTable } from "@/components/admin/portfolio-table";

interface AdminPortfolioClientViewProps {
  artworks: PortfolioItem[];
  categories: { id: string; name: string; slug: string; count?: number }[];
}

export function AdminPortfolioClientView({
  artworks,
  categories,
}: AdminPortfolioClientViewProps) {
  const { toggleMobile } = useAdminLayout();

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
      {/* Fixed Topbar */}
      <AdminHeader
        title="Portfolio Management"
        subtitle="Manage all studio artworks, featured showcases, and publishing visibility."
        onMenuClick={toggleMobile}
      />

      {/* Full-width Scrollable Viewport */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          <PortfolioTable
            items={artworks}
            availableCategories={categories}
          />
        </div>
      </div>
    </div>
  );
}