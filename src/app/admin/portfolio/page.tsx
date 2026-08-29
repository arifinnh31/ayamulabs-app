import * as React from "react";
import { getArtworks } from "@/actions/portfolio";
import { getCategories } from "@/actions/categories";
import { AdminPortfolioClientView } from "@/components/admin/admin-portfolio-client-view";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioListPage() {
  const [artworks, categories] = await Promise.all([
    getArtworks({ status: "all" }),
    getCategories(),
  ]);

  return (
    <AdminPortfolioClientView
      artworks={artworks}
      categories={categories}
    />
  );
}