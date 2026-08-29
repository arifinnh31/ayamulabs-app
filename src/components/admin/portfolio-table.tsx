"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Edit2,
  Trash2,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PortfolioItem } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "@/components/ui/custom-select";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useToast } from "@/components/ui/toast";
import {
  deleteArtwork,
  toggleArtworkStatus,
  reorderArtworks,
} from "@/actions/portfolio";

interface PortfolioTableProps {
  initialPortfolio?: PortfolioItem[];
  items?: PortfolioItem[];
  availableCategories?: { id: string; name: string; slug: string; count?: number }[];
}

export function PortfolioTable({
  initialPortfolio,
  items,
  availableCategories = [],
}: PortfolioTableProps) {
  const data = items || initialPortfolio || [];
  const { toast } = useToast();
  const [portfolio, setPortfolio] = React.useState<PortfolioItem[]>(data);
  const [search, setSearch] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 10;

  // Confirmation dialog state for deletion
  const [itemToDelete, setItemToDelete] = React.useState<PortfolioItem | null>(null);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryFilterChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...availableCategories.map((cat) => ({
      value: cat.slug,
      label: cat.name,
      badge: cat.count !== undefined ? `${cat.count}` : undefined,
    })),
  ];

  const filtered = portfolio.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat =
      categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedItems = filtered.slice(startIndex, startIndex + pageSize);

  const handleMoveUp = async (item: PortfolioItem) => {
    const index = portfolio.findIndex((p) => p.id === item.id);
    if (index <= 0) return;
    const newItems = [...portfolio];
    const temp = newItems[index - 1];
    newItems[index - 1] = newItems[index];
    newItems[index] = temp;
    setPortfolio(newItems);

    const reorderedPayload = newItems.map((it, idx) => ({ id: it.id, order: idx }));
    await reorderArtworks(reorderedPayload);

    toast({
      title: "Order Updated",
      description: `Moved "${item.title}" up.`,
      type: "success",
    });
  };

  const handleMoveDown = async (item: PortfolioItem) => {
    const index = portfolio.findIndex((p) => p.id === item.id);
    if (index < 0 || index >= portfolio.length - 1) return;
    const newItems = [...portfolio];
    const temp = newItems[index + 1];
    newItems[index + 1] = newItems[index];
    newItems[index] = temp;
    setPortfolio(newItems);

    const reorderedPayload = newItems.map((it, idx) => ({ id: it.id, order: idx }));
    await reorderArtworks(reorderedPayload);

    toast({
      title: "Order Updated",
      description: `Moved "${item.title}" down.`,
      type: "success",
    });
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    const { id, title } = itemToDelete;
    setPortfolio((prev) => prev.filter((a) => a.id !== id));
    setItemToDelete(null);

    const res = await deleteArtwork(id);
    if (!res.success) {
      toast({
        title: "Delete Failed",
        description: res.error || "Failed to delete artwork.",
        type: "error",
      });
      return;
    }

    toast({
      title: "Portfolio Item Deleted",
      description: `"${title}" was removed from the studio repository.`,
      type: "info",
    });
  };

  const handleToggleStatus = async (id: string) => {
    const item = portfolio.find((a) => a.id === id);
    if (!item) return;
    const newStatus = item.status === "published" ? "draft" : "published";
    setPortfolio((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );

    await toggleArtworkStatus(id, newStatus);

    toast({
      title: `Status Updated: ${newStatus.toUpperCase()}`,
      description: `"${item.title}" is now ${newStatus}.`,
      type: "success",
    });
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="w-full sm:w-72">
            <Input
              placeholder="Search portfolio items..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              icon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="w-full sm:w-56">
            <CustomSelect
              options={categoryOptions}
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
            />
          </div>
        </div>

        <Link
          href="/admin/portfolio/new"
          className="w-full sm:w-auto flex items-center justify-center gap-2 h-11 px-5 rounded-full font-bold text-xs sm:text-sm bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-md shadow-amber-400/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>New Portfolio Item</span>
        </Link>
      </div>

      {/* Portfolio Table */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 font-extrabold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 w-16 text-center">Order</th>
                <th className="py-3.5 px-4 min-w-[240px]">Artwork & Project</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Year</th>
                <th className="py-3.5 px-4">Metrics</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-medium">
              {paginatedItems.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors group"
                >
                  {/* Order controls */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center gap-0.5">
                      <button
                        onClick={() => handleMoveUp(item)}
                        disabled={startIndex + index === 0}
                        className="p-1 text-zinc-400 hover:text-zinc-950 dark:hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
                        title="Move Up"
                      >
                        <ArrowUp className="h-3 w-3" />
                      </button>
                      <span className="text-[10px] font-mono text-zinc-400 font-bold">
                        {startIndex + index + 1}
                      </span>
                      <button
                        onClick={() => handleMoveDown(item)}
                        disabled={startIndex + index === filtered.length - 1}
                        className="p-1 text-zinc-400 hover:text-zinc-950 dark:hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
                        title="Move Down"
                      >
                        <ArrowDown className="h-3 w-3" />
                      </button>
                    </div>
                  </td>

                  {/* Artwork Preview + Title */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-700">
                        <Image
                          src={item.coverImage}
                          alt={item.title}
                          fill
                          unoptimized
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/portfolio/${item.id}/edit`}
                            className="font-bold text-zinc-950 dark:text-white hover:text-amber-500 transition-colors line-clamp-1"
                          >
                            {item.title}
                          </Link>
                          {item.isFeatured && (
                            <span className="text-[10px] bg-amber-400/20 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-1">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <Badge variant="primary" size="sm">
                      {item.categoryName || item.category}
                    </Badge>
                  </td>

                  {/* Year */}
                  <td className="py-3 px-4 whitespace-nowrap text-zinc-600 dark:text-zinc-400 text-xs">
                    {item.year}
                  </td>

                  {/* Views & Likes */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex flex-col text-xs text-zinc-600 dark:text-zinc-400">
                      <span>{item.views.toLocaleString("en-US")} views</span>
                      <span className="text-[11px] text-zinc-400">{item.likes.toLocaleString("en-US")} likes</span>
                    </div>
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(item.id)}
                      className={`px-3 py-1 rounded-full text-xs font-extrabold cursor-pointer transition-all ${
                        item.status === "published"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200"
                      }`}
                    >
                      {item.status === "published" ? "Published" : "Draft"}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/portfolio/${item.slug}`}
                        target="_blank"
                        className="p-2 rounded-xl text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        title="View Public Page"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/portfolio/${item.id}/edit`}
                        className="p-2 rounded-xl text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        title="Edit Item"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => setItemToDelete(item)}
                        className="p-2 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                        title="Delete Item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-400">
                    No portfolio items match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Responsive Pagination Bar */}
        {filtered.length > pageSize && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              Showing <span className="font-bold text-zinc-950 dark:text-white">{startIndex + 1}</span> to{" "}
              <span className="font-bold text-zinc-950 dark:text-white">{Math.min(startIndex + pageSize, filtered.length)}</span> of{" "}
              <span className="font-bold text-zinc-950 dark:text-white">{filtered.length}</span> artworks
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all shadow-sm"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Prev</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  const isActive = pageNum === safeCurrentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-amber-400 text-zinc-950 font-black shadow-sm"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all shadow-sm"
              >
                <span>Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Portfolio Item?"
        description={
          itemToDelete
            ? `Are you sure you want to delete "${itemToDelete.title}"? This action will permanently remove this artwork from the studio repository and database.`
            : ""
        }
        confirmText="Delete Item"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}