"use server";

import { prisma } from "@/lib/prisma";
import { AspectRatio, PublishStatus, MediaType } from "@prisma/client";
import { safeRevalidatePath } from "@/lib/server-utils";
import { deleteAssets } from "./upload";

export interface ArtworkData {
  id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  year?: string;
  client?: string;
  roles?: string[];
  description: string;
  conceptStory: string;
  coverImage: string;
  aspectRatio: "portrait" | "landscape" | "square";
  status: "published" | "draft";
  isFeatured?: boolean;
  order?: number;
  tools?: string[];
  vgenUrl?: string;
  fiverrUrl?: string;
  tags?: string[];
  gallery?: {
    type: "image" | "video";
    url: string;
    caption: string;
  }[];
  beforeAfter?: {
    beforeImage: string;
    beforeLabel: string;
    afterImage: string;
    afterLabel: string;
  };
}

export async function getArtworks(options?: {
  status?: "published" | "draft" | "all";
  category?: string;
  featuredOnly?: boolean;
}) {
  try {
    const whereClause: Record<string, unknown> = {};

    if (options?.status && options.status !== "all") {
      whereClause.status = options.status === "published" ? PublishStatus.PUBLISHED : PublishStatus.DRAFT;
    }

    if (options?.featuredOnly) {
      whereClause.isFeatured = true;
    }

    if (options?.category && options.category !== "all") {
      whereClause.category = {
        slug: options.category,
      };
    }

    const artworks = await prisma.artwork.findMany({
      where: whereClause,
      include: {
        category: true,
        gallery: {
          orderBy: { order: "asc" },
        },
        beforeAfter: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return artworks.map((art) => ({
      id: art.id,
      slug: art.slug,
      title: art.title,
      subtitle: art.subtitle || "",
      category: art.category.slug,
      categoryName: art.category.name,
      year: art.year,
      client: art.client || undefined,
      role: art.roles,
      description: art.description,
      conceptStory: art.conceptStory,
      coverImage: art.coverImage,
      aspectRatio: art.aspectRatio.toLowerCase() as "portrait" | "landscape" | "square",
      status: art.status === PublishStatus.PUBLISHED ? ("published" as const) : ("draft" as const),
      isFeatured: art.isFeatured,
      order: art.order,
      views: art.views,
      likes: art.likes,
      tools: art.tools,
      vgenUrl: art.vgenUrl || undefined,
      fiverrUrl: art.fiverrUrl || undefined,
      tags: art.tags.map((t) => t.tag.name),
      gallery: art.gallery.map((g) => ({
        type: g.type === MediaType.VIDEO ? ("video" as const) : ("image" as const),
        url: g.url,
        caption: g.caption || "",
      })),
      beforeAfter: art.beforeAfter
        ? (() => {
            const beforeCap = art.gallery.find((g) => g.url === art.beforeAfter?.beforeImage)?.caption?.trim();
            const afterCap = art.gallery.find((g) => g.url === art.beforeAfter?.afterImage)?.caption?.trim();
            return {
              beforeImage: art.beforeAfter.beforeImage,
              beforeLabel: beforeCap || (art.beforeAfter.beforeLabel && art.beforeAfter.beforeLabel !== "Rough Sketch" ? art.beforeAfter.beforeLabel : "") || beforeCap || art.beforeAfter.beforeLabel || "Before",
              afterImage: art.beforeAfter.afterImage,
              afterLabel: afterCap || (art.beforeAfter.afterLabel && art.beforeAfter.afterLabel !== "Final Render" ? art.beforeAfter.afterLabel : "") || afterCap || art.beforeAfter.afterLabel || "After",
            };
          })()
        : undefined,
    }));
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return [];
  }
}

export async function getArtworkBySlug(slug: string) {
  try {
    const art = await prisma.artwork.findUnique({
      where: { slug },
      include: {
        category: true,
        gallery: {
          orderBy: { order: "asc" },
        },
        beforeAfter: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!art) return null;

    // Increment views atomically
    await prisma.artwork.update({
      where: { id: art.id },
      data: { views: { increment: 1 } },
    });

    // Get adjacent artworks for pagination
    const allPublished = await prisma.artwork.findMany({
      where: { status: PublishStatus.PUBLISHED },
      select: { slug: true, title: true, coverImage: true },
      orderBy: { order: "asc" },
    });

    const currentIndex = allPublished.findIndex((p) => p.slug === slug);
    const prevArtwork = currentIndex > 0 ? allPublished[currentIndex - 1] : allPublished[allPublished.length - 1];
    const nextArtwork = currentIndex < allPublished.length - 1 ? allPublished[currentIndex + 1] : allPublished[0];

    const beforeCap = art.gallery.find((g) => g.url === art.beforeAfter?.beforeImage)?.caption?.trim();
    const afterCap = art.gallery.find((g) => g.url === art.beforeAfter?.afterImage)?.caption?.trim();

    const formattedArtwork = {
      id: art.id,
      slug: art.slug,
      title: art.title,
      subtitle: art.subtitle || "",
      category: art.category.slug,
      categoryName: art.category.name,
      year: art.year,
      client: art.client || undefined,
      role: art.roles,
      description: art.description,
      conceptStory: art.conceptStory,
      coverImage: art.coverImage,
      aspectRatio: art.aspectRatio.toLowerCase() as "portrait" | "landscape" | "square",
      status: art.status === PublishStatus.PUBLISHED ? ("published" as const) : ("draft" as const),
      isFeatured: art.isFeatured,
      order: art.order,
      views: art.views + 1,
      likes: art.likes,
      tools: art.tools,
      vgenUrl: art.vgenUrl || undefined,
      fiverrUrl: art.fiverrUrl || undefined,
      tags: art.tags.map((t) => t.tag.name),
      gallery: art.gallery.map((g) => ({
        type: g.type === MediaType.VIDEO ? ("video" as const) : ("image" as const),
        url: g.url,
        caption: g.caption || "",
      })),
      beforeAfter: art.beforeAfter
        ? {
            beforeImage: art.beforeAfter.beforeImage,
            beforeLabel: beforeCap || (art.beforeAfter.beforeLabel && art.beforeAfter.beforeLabel !== "Rough Sketch" ? art.beforeAfter.beforeLabel : "") || beforeCap || art.beforeAfter.beforeLabel || "Before",
            afterImage: art.beforeAfter.afterImage,
            afterLabel: afterCap || (art.beforeAfter.afterLabel && art.beforeAfter.afterLabel !== "Final Render" ? art.beforeAfter.afterLabel : "") || afterCap || art.beforeAfter.afterLabel || "After",
          }
        : undefined,
    };

    return {
      artwork: formattedArtwork,
      prevArtwork,
      nextArtwork,
    };
  } catch (error) {
    console.error("Error fetching artwork by slug:", error);
    return null;
  }
}

export async function createArtwork(data: ArtworkData, sessionUploadedUrls: string[] = []) {
  try {
    const cleanSlug = data.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-");

    // Check slug uniqueness
    const existingArtwork = await prisma.artwork.findUnique({
      where: { slug: cleanSlug },
      select: { id: true },
    });

    if (existingArtwork) {
      return {
        success: false,
        error: "This URL slug is already taken by another artwork.",
        fieldErrors: { slug: "This URL slug is already taken. Please choose a unique slug." },
      };
    }

    // 1. Find category
    let category = await prisma.category.findUnique({
      where: { slug: data.category },
    });

    if (!category) {
      category = await prisma.category.findFirst();
      if (!category) throw new Error("No category available.");
    }

    const count = await prisma.artwork.count();
    const aspectRatioMap: Record<string, AspectRatio> = {
      landscape: AspectRatio.LANDSCAPE,
      portrait: AspectRatio.PORTRAIT,
      square: AspectRatio.SQUARE,
    };

    const newArtwork = await prisma.artwork.create({
      data: {
        slug: cleanSlug,
        title: data.title,
        subtitle: data.subtitle || null,
        year: data.year || new Date().getFullYear().toString(),
        client: data.client || null,
        roles: data.roles || ["Lead Illustrator"],
        description: data.description,
        conceptStory: data.conceptStory || data.description,
        coverImage: data.coverImage,
        aspectRatio: aspectRatioMap[data.aspectRatio] || AspectRatio.LANDSCAPE,
        status: data.status === "published" ? PublishStatus.PUBLISHED : PublishStatus.DRAFT,
        isFeatured: data.isFeatured ?? false,
        order: data.order ?? count + 1,
        tools: data.tools || ["Clip Studio Paint"],
        vgenUrl: data.vgenUrl || null,
        fiverrUrl: data.fiverrUrl || null,
        categoryId: category.id,
      },
    });

    // 2. Add Gallery
    if (data.gallery && data.gallery.length > 0) {
      await prisma.artworkMedia.createMany({
        data: data.gallery.map((g, idx) => ({
          artworkId: newArtwork.id,
          url: g.url,
          type: g.type === "video" ? MediaType.VIDEO : MediaType.IMAGE,
          caption: g.caption || "",
          order: idx,
        })),
      });
    }

    // 3. Add Before / After
    if (data.beforeAfter?.beforeImage && data.beforeAfter?.afterImage) {
      await prisma.artworkBeforeAfter.create({
        data: {
          artworkId: newArtwork.id,
          beforeImage: data.beforeAfter.beforeImage,
          beforeLabel: data.beforeAfter.beforeLabel || "Rough Sketch",
          afterImage: data.beforeAfter.afterImage,
          afterLabel: data.beforeAfter.afterLabel || "Final Render",
        },
      });
    }

    // 4. Add Tags
    if (data.tags && data.tags.length > 0) {
      for (const rawTag of data.tags) {
        const cleanName = rawTag.trim().replace(/^#+/, "");
        if (!cleanName) continue;
        const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        let tag = await prisma.tag.findFirst({
          where: { OR: [{ name: cleanName }, { slug }] },
        });

        if (!tag) {
          tag = await prisma.tag.create({
            data: { name: cleanName, slug },
          });
        }

        await prisma.artworkTag.create({
          data: {
            artworkId: newArtwork.id,
            tagId: tag.id,
          },
        });
      }
    }

    // 5. Clean up any storage files uploaded in this session but discarded before publishing
    if (sessionUploadedUrls && sessionUploadedUrls.length > 0) {
      const finalSavedUrls = new Set([
        data.coverImage,
        ...(data.gallery?.map((g) => g.url) || []),
        data.beforeAfter?.beforeImage,
        data.beforeAfter?.afterImage,
      ].filter(Boolean) as string[]);

      const discardedUrls = sessionUploadedUrls.filter((u) => !finalSavedUrls.has(u));
      if (discardedUrls.length > 0) {
        await deleteAssets(discardedUrls);
      }
    }

    safeRevalidatePath("/", "layout");
    return { success: true, artwork: newArtwork };
  } catch (error: unknown) {
    console.error("Error creating artwork:", error);
    const msg = error instanceof Error ? error.message : "Failed to create artwork.";
    if (msg.includes("Unique constraint failed") && msg.includes("slug")) {
      return {
        success: false,
        error: "This URL slug is already taken by another artwork.",
        fieldErrors: { slug: "This URL slug is already taken. Please choose a unique slug." },
      };
    }
    return { success: false, error: msg };
  }
}

export async function updateArtwork(
  id: string,
  data: Partial<ArtworkData>,
  sessionUploadedUrls: string[] = []
) {
  try {
    const existing = await prisma.artwork.findUnique({
      where: { id },
      include: { category: true, gallery: true, beforeAfter: true },
    });

    if (!existing) return { success: false, error: "Artwork not found." };

    const cleanSlug = data.slug?.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-");
    if (cleanSlug && cleanSlug !== existing.slug) {
      const existingSlug = await prisma.artwork.findFirst({
        where: { slug: cleanSlug, id: { not: id } },
        select: { id: true },
      });
      if (existingSlug) {
        return {
          success: false,
          error: "This URL slug is already taken by another artwork.",
          fieldErrors: { slug: "This URL slug is already taken. Please choose a unique slug." },
        };
      }
    }

    let categoryId = existing.categoryId;
    if (data.category && data.category !== existing.category.slug) {
      const cat = await prisma.category.findUnique({
        where: { slug: data.category },
      });
      if (cat) categoryId = cat.id;
    }

    const aspectRatioMap: Record<string, AspectRatio> = {
      landscape: AspectRatio.LANDSCAPE,
      portrait: AspectRatio.PORTRAIT,
      square: AspectRatio.SQUARE,
    };

    await prisma.artwork.update({
      where: { id },
      data: {
        title: data.title ?? existing.title,
        subtitle: data.subtitle !== undefined ? data.subtitle : existing.subtitle,
        slug: data.slug ?? existing.slug,
        year: data.year ?? existing.year,
        client: data.client !== undefined ? data.client : existing.client,
        roles: data.roles ?? existing.roles,
        tools: data.tools ?? existing.tools,
        description: data.description ?? existing.description,
        conceptStory: data.conceptStory ?? existing.conceptStory,
        coverImage: data.coverImage ?? existing.coverImage,
        aspectRatio: data.aspectRatio
          ? aspectRatioMap[data.aspectRatio] || existing.aspectRatio
          : existing.aspectRatio,
        status:
          data.status !== undefined
            ? data.status === "published"
              ? PublishStatus.PUBLISHED
              : PublishStatus.DRAFT
            : existing.status,
        isFeatured: data.isFeatured !== undefined ? data.isFeatured : existing.isFeatured,
        categoryId,
        vgenUrl: data.vgenUrl !== undefined ? data.vgenUrl : existing.vgenUrl,
        fiverrUrl: data.fiverrUrl !== undefined ? data.fiverrUrl : existing.fiverrUrl,
      },
    });

    // Update gallery if provided
    if (data.gallery) {
      await prisma.artworkMedia.deleteMany({
        where: { artworkId: id },
      });

      if (data.gallery.length > 0) {
        await prisma.artworkMedia.createMany({
          data: data.gallery.map((g, idx) => ({
            artworkId: id,
            url: g.url,
            type: g.type === "video" ? MediaType.VIDEO : MediaType.IMAGE,
            caption: g.caption || "",
            order: idx,
          })),
        });
      }
    }

    // Update before/after if provided
    if (data.beforeAfter !== undefined) {
      await prisma.artworkBeforeAfter.deleteMany({
        where: { artworkId: id },
      });

      if (data.beforeAfter?.beforeImage && data.beforeAfter?.afterImage) {
        await prisma.artworkBeforeAfter.create({
          data: {
            artworkId: id,
            beforeImage: data.beforeAfter.beforeImage,
            beforeLabel: data.beforeAfter.beforeLabel || "Rough Sketch",
            afterImage: data.beforeAfter.afterImage,
            afterLabel: data.beforeAfter.afterLabel || "Final Render",
          },
        });
      }
    }

    // Update tags if provided
    if (data.tags) {
      await prisma.artworkTag.deleteMany({
        where: { artworkId: id },
      });

      for (const rawTag of data.tags) {
        const cleanName = rawTag.trim().replace(/^#+/, "");
        if (!cleanName) continue;
        const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        let tag = await prisma.tag.findFirst({
          where: { OR: [{ name: cleanName }, { slug }] },
        });

        if (!tag) {
          tag = await prisma.tag.create({
            data: { name: cleanName, slug },
          });
        }

        await prisma.artworkTag.create({
          data: {
            artworkId: id,
            tagId: tag.id,
          },
        });
      }
    }

    // Clean up any old Supabase storage files that were replaced or removed from DB, or discarded during session
    const oldUrls = [
      existing.coverImage,
      ...(existing.gallery?.map((g) => g.url) || []),
      existing.beforeAfter?.beforeImage,
      existing.beforeAfter?.afterImage,
      ...sessionUploadedUrls,
    ].filter(Boolean) as string[];

    const newUrls = new Set([
      data.coverImage ?? existing.coverImage,
      ...(data.gallery
        ? data.gallery.map((g) => g.url)
        : existing.gallery?.map((g) => g.url) || []),
      data.beforeAfter?.beforeImage ?? existing.beforeAfter?.beforeImage,
      data.beforeAfter?.afterImage ?? existing.beforeAfter?.afterImage,
    ].filter(Boolean) as string[]);

    const removedUrls = oldUrls.filter((u) => !newUrls.has(u));
    if (removedUrls.length > 0) {
      await deleteAssets(removedUrls);
    }

    safeRevalidatePath("/", "layout");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error updating artwork:", error);
    const msg = error instanceof Error ? error.message : "Failed to update artwork.";
    if (msg.includes("Unique constraint failed") && msg.includes("slug")) {
      return {
        success: false,
        error: "This URL slug is already taken by another artwork.",
        fieldErrors: { slug: "This URL slug is already taken. Please choose a unique slug." },
      };
    }
    return { success: false, error: msg };
  }
}

export async function deleteArtwork(id: string) {
  try {
    const art = await prisma.artwork.findUnique({
      where: { id },
      include: { gallery: true, beforeAfter: true },
    });

    if (art) {
      const urlsToDelete: string[] = [art.coverImage];
      if (art.gallery) urlsToDelete.push(...art.gallery.map((g) => g.url));
      if (art.beforeAfter) {
        if (art.beforeAfter.beforeImage) urlsToDelete.push(art.beforeAfter.beforeImage);
        if (art.beforeAfter.afterImage) urlsToDelete.push(art.beforeAfter.afterImage);
      }
      await deleteAssets(urlsToDelete);
    }

    await prisma.artwork.delete({
      where: { id },
    });
    safeRevalidatePath("/", "layout");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting artwork:", error);
    const msg = error instanceof Error ? error.message : "Failed to delete artwork.";
    return { success: false, error: msg };
  }
}

export async function toggleArtworkFeatured(id: string, isFeatured: boolean) {
  try {
    await prisma.artwork.update({
      where: { id },
      data: { isFeatured },
    });
    safeRevalidatePath("/", "layout");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error toggling featured:", error);
    return { success: false, error: "Failed to toggle featured status." };
  }
}

export async function toggleArtworkStatus(id: string, status: "published" | "draft") {
  try {
    await prisma.artwork.update({
      where: { id },
      data: {
        status: status === "published" ? PublishStatus.PUBLISHED : PublishStatus.DRAFT,
      },
    });
    safeRevalidatePath("/", "layout");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error toggling status:", error);
    return { success: false, error: "Failed to toggle status." };
  }
}

export async function reorderArtworks(items: { id: string; order: number }[]) {
  try {
    await prisma.$transaction(
      items.map((item) =>
        prisma.artwork.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );
    safeRevalidatePath("/", "layout");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error reordering artworks:", error);
    return { success: false, error: "Failed to reorder artworks." };
  }
}

export async function toggleArtworkLike(id: string, liked: boolean) {
  try {
    const updated = await prisma.artwork.update({
      where: { id },
      data: {
        likes: liked ? { increment: 1 } : { decrement: 1 },
      },
      select: {
        id: true,
        likes: true,
      },
    });

    if (updated.likes < 0) {
      await prisma.artwork.update({
        where: { id },
        data: { likes: 0 },
      });
      return { success: true, likes: 0 };
    }

    safeRevalidatePath("/", "layout");
    return { success: true, likes: updated.likes };
  } catch (error: unknown) {
    console.error("Error toggling artwork like:", error);
    return { success: false, error: "Failed to update like." };
  }
}
