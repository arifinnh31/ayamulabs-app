"use server";

import { prisma } from "@/lib/prisma";
import { safeRevalidatePath } from "@/lib/server-utils";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { artworks: true },
        },
      },
      orderBy: { order: "asc" },
    });

    return categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      iconName: cat.iconName,
      count: cat._count.artworks,
      order: cat.order,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function createCategory(data: {
  name: string;
  slug?: string;
  description?: string;
  iconName?: string;
}) {
  try {
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const count = await prisma.category.count();

    const created = await prisma.category.create({
      data: {
        name: data.name,
        slug,
        description: data.description || null,
        iconName: data.iconName || "Folder",
        order: count,
      },
    });

    safeRevalidatePath("/", "layout");
    return { success: true, category: created };
  } catch (error: unknown) {
    console.error("Error creating category:", error);
    const msg = error instanceof Error ? error.message : "Failed to create category.";
    return { success: false, error: msg };
  }
}

export async function updateCategory(
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
    iconName?: string;
  }
) {
  try {
    const updated = await prisma.category.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.slug && { slug: data.slug }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.iconName && { iconName: data.iconName }),
      },
    });

    safeRevalidatePath("/", "layout");
    return { success: true, category: updated };
  } catch (error: unknown) {
    console.error("Error updating category:", error);
    const msg = error instanceof Error ? error.message : "Failed to update category.";
    return { success: false, error: msg };
  }
}

export async function deleteCategory(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { artworks: true } } },
    });

    if (!category) return { success: false, error: "Category not found." };
    if (category._count.artworks > 0) {
      return {
        success: false,
        error: `Cannot delete category: contains ${category._count.artworks} artworks. Move or delete them first.`,
      };
    }

    await prisma.category.delete({ where: { id } });
    safeRevalidatePath("/", "layout");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting category:", error);
    const msg = error instanceof Error ? error.message : "Failed to delete category.";
    return { success: false, error: msg };
  }
}
