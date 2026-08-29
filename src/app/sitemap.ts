import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { PublishStatus } from "@prisma/client";
import { INITIAL_PORTFOLIO } from "@/lib/mock-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ayamulabs.art";

  let artworks: { slug: string; updatedAt?: Date }[] = [];
  try {
    artworks = await prisma.artwork.findMany({
      where: { status: PublishStatus.PUBLISHED },
      select: { slug: true, updatedAt: true },
    });
  } catch {
    artworks = INITIAL_PORTFOLIO.map((item) => ({
      slug: item.slug,
      updatedAt: new Date(),
    }));
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const artworkPages: MetadataRoute.Sitemap = artworks.map((art) => ({
    url: `${baseUrl}/portfolio/${art.slug}`,
    lastModified: art.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...artworkPages];
}
