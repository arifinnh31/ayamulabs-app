import * as React from "react";
import { getArtworks } from "@/actions/portfolio";
import { getCategories } from "@/actions/categories";
import { AdminDashboardClientView } from "@/components/admin/admin-dashboard-client-view";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [artworks, categories] = await Promise.all([
    getArtworks({ status: "all" }),
    getCategories(),
  ]);

  const totalViews = artworks.reduce((acc, a) => acc + a.views, 0);
  const totalLikes = artworks.reduce((acc, a) => acc + a.likes, 0);
  const featuredArtworks = artworks.filter((item) => item.isFeatured);

  return (
    <AdminDashboardClientView
      artworks={artworks}
      categories={categories}
      featuredArtworks={featuredArtworks}
      totalViews={totalViews}
      totalLikes={totalLikes}
    />
  );
}