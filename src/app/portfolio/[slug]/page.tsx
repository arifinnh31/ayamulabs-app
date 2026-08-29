import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArtworkBySlug } from "@/actions/portfolio";
import { ArtworkDetailView } from "@/components/portfolio/artwork-detail-view";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getArtworkBySlug(slug);

  if (!data || !data.artwork) {
    return {
      title: "Artwork Not Found",
      description: "The requested artwork could not be found in our studio vault.",
    };
  }

  const art = data.artwork;
  const title = `${art.title} - ${art.categoryName} Illustration`;
  const description = art.subtitle || art.description || `Original visual illustration ${art.title} by Ayamu Labs.`;

  return {
    title,
    description,
    keywords: [
      art.title,
      art.categoryName,
      ...art.tools,
      ...art.tags,
      "Anime Art",
      "Ayamu Labs",
      "Ayamu Hamiru",
    ],
    openGraph: {
      title: `${art.title} | Ayamu Labs Portfolio`,
      description,
      url: `https://ayamulabs.art/portfolio/${art.slug}`,
      images: [
        {
          url: art.coverImage,
          width: 1200,
          height: 630,
          alt: art.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${art.title} | Ayamu Labs Portfolio`,
      description,
      images: [art.coverImage],
    },
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getArtworkBySlug(slug);

  if (!data || !data.artwork) {
    notFound();
  }

  const art = data.artwork;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: art.title,
    description: art.description || art.subtitle,
    image: art.coverImage,
    creator: {
      "@type": "Organization",
      name: "Ayamu Labs",
      url: "https://ayamulabs.art",
    },
    artMedium: art.tools.join(", ") || "Clip Studio Paint",
    artform: art.categoryName,
    dateCreated: art.year,
    url: `https://ayamulabs.art/portfolio/${art.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtworkDetailView
        artwork={art}
        prevProject={data.prevArtwork}
        nextProject={data.nextArtwork}
      />
    </>
  );
}