"use server";

import { prisma } from "@/lib/prisma";
import { safeRevalidatePath } from "@/lib/server-utils";

export async function getTags() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: "asc" },
    });
    return tags.map((t) => t.name);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

export async function createTag(name: string) {
  try {
    const cleanName = name.trim().replace(/^#+/, "");
    if (!cleanName) return { success: false, error: "Tag name cannot be empty." };
    const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const existing = await prisma.tag.findFirst({
      where: { OR: [{ name: cleanName }, { slug }] },
    });

    if (existing) return { success: true, tag: existing.name };

    const created = await prisma.tag.create({
      data: { name: cleanName, slug },
    });

    safeRevalidatePath("/admin/categories");
    return { success: true, tag: created.name };
  } catch (error: unknown) {
    console.error("Error creating tag:", error);
    return { success: false, error: "Failed to create tag." };
  }
}

export async function deleteTag(name: string) {
  try {
    const cleanName = name.trim().replace(/^#+/, "");
    await prisma.tag.deleteMany({
      where: { name: cleanName },
    });
    safeRevalidatePath("/admin/categories");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting tag:", error);
    return { success: false, error: "Failed to delete tag." };
  }
}
