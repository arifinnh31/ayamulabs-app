import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getArtworks } from "@/actions/portfolio";
import { getCategories } from "@/actions/categories";
import { getStudioProfile } from "@/actions/profile";
import { HeroShowcase } from "@/components/portfolio/hero-showcase";
import { CommissionCtaBanner } from "@/components/commission/commission-cta-banner";
import { StudioMarquee } from "@/components/ui/studio-marquee";
import { HomeClientShowcase } from "@/components/portfolio/home-client-showcase";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [artworks, categories, studioProfile] = await Promise.all([
    getArtworks({ status: "published" }),
    getCategories(),
    getStudioProfile(),
  ]);

  const featuredArtworks = artworks.filter((a) => a.isFeatured);
  const profile = studioProfile || {
    name: "Ayamu Labs",
    characterName: "Ayamu Hamiru",
    characterBio:
      "Ayamu Hamiru is a spirited, cheerful girl who proudly rocks her signature yellow chick kigurumi hoodie. Together with her tiny chicken companion, Ayamu embodies the creative pulse of Ayamu Labs!",
    characterAvatar: "/images/ayamu-hamiru.jpg",
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Showcase Section */}
      <HeroShowcase featuredArtworks={featuredArtworks} />

      {/* Dynamic Animated Studio Marquee */}
      <StudioMarquee />

      {/* 2. Portfolio Gallery Grid Section */}
      <HomeClientShowcase
        initialArtworks={featuredArtworks}
        allArtworksCount={artworks.length}
        categories={categories}
      />

      {/* 3. Character & Studio Story Spotlight */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-8 sm:p-12 lg:p-16 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Character Portrait */}
              <div className="lg:col-span-5 flex flex-col items-center text-center">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl ring-4 ring-amber-400/20 group">
                  <Image
                    src={profile.characterAvatar}
                    alt={profile.characterName}
                    fill
                    priority
                    sizes="(max-width: 768px) 300px, 400px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 inset-x-4 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
                      Studio Character
                    </p>
                    <h3 className="text-xl font-black">{profile.characterName}</h3>
                  </div>
                </div>
              </div>

              {/* Right Bio & Manifesto */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                    ABOUT THE CREATIVE SPIRIT
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-zinc-950 dark:text-white mt-1">
                    Meet Ayamu & The Studio
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                  {profile.characterBio}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-sm font-bold text-zinc-950 hover:text-amber-600 dark:text-white dark:hover:text-amber-400"
                  >
                    <span>Read Studio & Team Profile</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Commission Hub CTA Banner */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommissionCtaBanner />
        </div>
      </section>
    </div>
  );
}