import * as React from "react";
import type { Metadata } from "next";
import { getArtworks } from "@/actions/portfolio";
import { getCategories } from "@/actions/categories";
import { PortfolioClientPage } from "@/components/portfolio/portfolio-client-page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio Vault & Artwork Showcase",
  description:
    "Explore our complete vault of original anime illustrations, splash art key visuals, character turnarounds, and chibi stickers.",
  openGraph: {
    title: "Portfolio Vault | Ayamu Labs Creative Studio",
    description:
      "Explore our complete vault of original anime illustrations, splash art key visuals, character turnarounds, and chibi stickers.",
    url: "https://ayamulabs.art/portfolio",
  },
};

export default async function PortfolioPage() {
  const [artworks, categories] = await Promise.all([
    getArtworks({ status: "published" }),
    getCategories(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Ayamu Labs Artwork Portfolio",
    description: "Creative anime illustrations and character design collection.",
    url: "https://ayamulabs.art/portfolio",
    hasPart: artworks.map((art) => ({
      "@type": "VisualArtwork",
      name: art.title,
      image: art.coverImage,
      url: `https://ayamulabs.art/portfolio/${art.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioClientPage
        initialArtworks={artworks}
        categories={categories}
      />
    </>
  );
}