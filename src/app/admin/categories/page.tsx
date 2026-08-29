import * as React from "react";
import { getCategories } from "@/actions/categories";
import { getTags } from "@/actions/tags";
import { AdminCategoriesClientView } from "@/components/admin/admin-categories-client-view";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const [categories, tags] = await Promise.all([
    getCategories(),
    getTags(),
  ]);

  return (
    <AdminCategoriesClientView
      initialCategories={categories}
      initialTags={tags}
    />
  );
}