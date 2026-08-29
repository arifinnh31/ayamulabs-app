"use client";

import * as React from "react";
import { Plus, Trash2, Tag, Layers } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { useAdminLayout } from "@/components/admin/admin-layout-wrapper";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useToast } from "@/components/ui/toast";
import {
  createCategory,
  deleteCategory,
} from "@/actions/categories";
import { createTag, deleteTag } from "@/actions/tags";

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  iconName: string;
}

interface AdminCategoriesClientViewProps {
  initialCategories: CategoryData[];
  initialTags: string[];
}

export function AdminCategoriesClientView({
  initialCategories,
  initialTags,
}: AdminCategoriesClientViewProps) {
  const { toast } = useToast();
  const { toggleMobile } = useAdminLayout();

  const [categories, setCategories] = React.useState<CategoryData[]>(initialCategories);
  const [tags, setTags] = React.useState<string[]>(initialTags);

  const [newCatName, setNewCatName] = React.useState("");
  const [newCatDesc, setNewCatDesc] = React.useState("");
  const [newTagInput, setNewTagInput] = React.useState("");

  // Confirmation modal states
  const [categoryToDelete, setCategoryToDelete] = React.useState<CategoryData | null>(null);
  const [tagToDelete, setTagToDelete] = React.useState<string | null>(null);

  const [catNameError, setCatNameError] = React.useState<string | undefined>();
  const [tagInputError, setTagInputError] = React.useState<string | undefined>();

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCatName.trim();
    if (!trimmed) {
      setCatNameError("Category name is required.");
      return;
    }
    if (categories.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
      setCatNameError("A category with this name already exists.");
      return;
    }
    setCatNameError(undefined);

    const res = await createCategory({
      name: trimmed,
      description: newCatDesc.trim(),
    });

    if (!res.success || !res.category) {
      toast({
        title: "Creation Failed",
        description: res.error || "Failed to create category.",
        type: "error",
      });
      return;
    }

    setCategories((prev) => [
      ...prev,
      {
        id: res.category!.id,
        name: res.category!.name,
        slug: res.category!.slug,
        description: res.category!.description || "",
        count: 0,
        iconName: res.category!.iconName,
      },
    ]);

    toast({
      title: "Category Created",
      description: `"${trimmed}" was successfully added to studio categories.`,
      type: "success",
    });

    setNewCatName("");
    setNewCatDesc("");
  };

  const handleConfirmDeleteCategory = async () => {
    if (!categoryToDelete) return;
    const name = categoryToDelete.name;
    const id = categoryToDelete.id;
    setCategoryToDelete(null);

    const res = await deleteCategory(id);
    if (!res.success) {
      toast({
        title: "Delete Failed",
        description: res.error || "Failed to delete category.",
        type: "error",
      });
      return;
    }

    setCategories((prev) => prev.filter((c) => c.id !== id));

    toast({
      title: "Category Deleted",
      description: `Category "${name}" was removed from the system.`,
      type: "info",
    });
  };

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTagInput.trim().replace(/^#+/, "");
    if (!trimmed) {
      setTagInputError("Tag name is required.");
      return;
    }
    if (tags.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
      setTagInputError("This tag already exists.");
      return;
    }
    setTagInputError(undefined);

    const res = await createTag(trimmed);
    if (!res.success) {
      toast({
        title: "Error Adding Tag",
        description: res.error || "Failed to add tag.",
        type: "error",
      });
      return;
    }

    setTags((prev) => [...prev, trimmed]);

    toast({
      title: "Tag Added",
      description: `Tag #${trimmed} is now available for portfolio items.`,
      type: "success",
    });
    setNewTagInput("");
  };

  const handleConfirmDeleteTag = async () => {
    if (!tagToDelete) return;
    const tag = tagToDelete;
    setTagToDelete(null);

    await deleteTag(tag);
    setTags((prev) => prev.filter((t) => t !== tag));

    toast({
      title: "Tag Removed",
      description: `Tag #${tag} was removed from preset tags.`,
      type: "info",
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
      {/* Fixed Topbar */}
      <AdminHeader
        title="Categories & Tags"
        subtitle="Manage studio artwork categories and global tag presets."
        onMenuClick={toggleMobile}
      />

      {/* Full-width Scrollable Viewport */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="p-4 sm:p-6 lg:p-8 space-y-10 max-w-6xl w-full mx-auto">
          {/* Section 1: Categories */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-amber-500" />
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white">
                Artwork Categories ({categories.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Categories List */}
              <div className="lg:col-span-2 space-y-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-950 dark:text-white text-sm">
                          {cat.name}
                        </span>
                        <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full font-mono text-zinc-600 dark:text-zinc-400">
                          {cat.slug}
                        </span>
                        <span className="text-xs bg-amber-400/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold">
                          {cat.count} Works
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        {cat.description}
                      </p>
                    </div>

                    <button
                      onClick={() => setCategoryToDelete(cat)}
                      className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors cursor-pointer shrink-0 ml-2"
                      title="Delete Category"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Category Form */}
              <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                  Add New Category
                </h3>

                <form onSubmit={handleAddCategory} noValidate className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                      Category Name *
                    </label>
                    <Input
                      placeholder="e.g. Manga Panels"
                      value={newCatName}
                      error={catNameError}
                      onChange={(e) => {
                        setNewCatName(e.target.value);
                        if (catNameError) setCatNameError(undefined);
                      }}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                      Description
                    </label>
                    <Input
                      placeholder="e.g. Sequential manga storyboards"
                      value={newCatDesc}
                      onChange={(e) => setNewCatDesc(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 h-10 rounded-full font-bold text-xs bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-sm transition-all cursor-pointer mt-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Category</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Section 2: Tags */}
          <div className="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-amber-500" />
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white">
                Preset Tags ({tags.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Tags Cloud */}
              <div className="lg:col-span-2 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 group hover:border-amber-400 transition-colors"
                    >
                      <span>#{tag}</span>
                      <button
                        onClick={() => setTagToDelete(tag)}
                        className="text-zinc-400 hover:text-rose-500 cursor-pointer p-0.5 rounded-full"
                        title={`Delete #${tag}`}
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Add Tag Form */}
              <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                  Add Preset Tag
                </h3>

                <form onSubmit={handleAddTag} noValidate className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                      Tag Name *
                    </label>
                    <Input
                      placeholder="e.g. Spine2D / RetroAnime"
                      value={newTagInput}
                      error={tagInputError}
                      onChange={(e) => {
                        setNewTagInput(e.target.value);
                        if (tagInputError) setTagInputError(undefined);
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 h-10 rounded-full font-bold text-xs bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-sm transition-all cursor-pointer mt-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Preset Tag</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Category Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={handleConfirmDeleteCategory}
        title="Delete Category?"
        description={
          categoryToDelete
            ? `Are you sure you want to delete "${categoryToDelete.name}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete Category"
        cancelText="Cancel"
        variant="danger"
      />

      {/* Delete Tag Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!tagToDelete}
        onClose={() => setTagToDelete(null)}
        onConfirm={handleConfirmDeleteTag}
        title="Delete Preset Tag?"
        description={
          tagToDelete
            ? `Are you sure you want to delete "#${tagToDelete}" from the preset tag bank?`
            : ""
        }
        confirmText="Delete Tag"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}