"use client";

import * as React from "react";
import Image from "next/image";
import { CommissionCtaBanner } from "@/components/commission/commission-cta-banner";
import { Badge } from "@/components/ui/badge";
import { StudioMarquee } from "@/components/ui/studio-marquee";
import { motion } from "framer-motion";

interface AboutClientViewProps {
  profile: {
    name: string;
    tagline: string;
    slogan: string;
    characterName: string;
    characterNickname: string;
    characterBio: string;
    characterAvatar: string;
    stats: {
      projectsCompleted: number;
      globalClients: number;
      awardsRecognitions: number;
      hoursRendered: number;
    };
  };
  team: {
    id: string;
    name: string;
    nickname?: string;
    role: string;
    bio: string;
    avatar: string;
    specialties: string[];
    socials: Record<string, string>;
  }[];
  philosophy: {
    id: string;
    title: string;
    description: string;
  }[];
}

export function AboutClientView({
  profile,
  team,
  philosophy,
}: AboutClientViewProps) {
  return (
    <div className="py-12 sm:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 1. Header & Studio Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white">
            We Hatch Vision Into Visual Masterpieces
          </h1>

          <p className="text-sm sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
            Ayamu Labs is an independent digital art studio dedicated to producing high-quality anime illustrations, character turnaround sheets, chibi merchandise, and stream graphics with world-class aesthetic excellence.
          </p>
        </motion.div>

        {/* 2. Character Spotlight Section: Ayamu Hamiru */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-zinc-200 bg-gradient-to-br from-amber-50 via-white to-rose-50/40 dark:border-amber-400/20 dark:from-amber-400/5 dark:via-zinc-900 dark:to-rose-400/5 p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Character Image Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl ring-8 ring-amber-400/20 group">
                <Image
                  src={profile.characterAvatar}
                  alt={profile.characterName}
                  fill
                  priority
                  sizes="(max-width: 768px) 300px, 450px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Character Lore Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="primary" size="md">
                    STUDIO CHARACTER
                  </Badge>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">
                  {profile.characterName}
                </h2>
              </div>

              <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                {profile.characterBio}
              </p>

              {/* Character Lore Bullet Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {philosophy.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 shadow-sm"
                  >
                    <div className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
                      {item.title}
                    </div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* 3. Team Members */}
        {team.length > 0 && (
          <section className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white">
                Studio Creative Team
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                The passionate artists, concept designers, and creative directors bringing your imagination to life.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 text-center shadow-sm space-y-4 hover:shadow-xl transition-all"
                >
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-amber-400 shadow-md">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-zinc-950 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-amber-700 dark:text-amber-400">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center pt-2">
                    {member.specialties.map((spec, sidx) => (
                      <span
                        key={sidx}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-semibold"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Dynamic Animated Studio Marquee */}
      <StudioMarquee />

      {/* Commission CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CommissionCtaBanner />
      </div>
    </div>
  );
}