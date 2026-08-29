"use client";

import * as React from "react";
import {
  Mail,
  ExternalLink,
  HelpCircle,
  Palette,
  Layers,
  Smile,
  MessageSquare,
  Type,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import { VGenButton } from "@/components/commission/vgen-button";
import { FiverrButton } from "@/components/commission/fiverr-button";
import { CharacterAvatar } from "@/components/character/character-avatar";
import { VGenIcon, FiverrIcon, DiscordIcon } from "@/components/icons/brand-icons";
import { StudioMarquee } from "@/components/ui/studio-marquee";
import { motion } from "framer-motion";

const iconMap = {
  Palette,
  Layers,
  Smile,
  MessageSquare,
  ImageIcon,
  Type,
};

interface ServicesClientViewProps {
  profile: {
    name: string;
    email: string;
    discordUrl: string;
    vgenUrl: string;
    fiverrUrl: string;
    characterName: string;
    characterCatchphrase?: string;
  };
  offerings: {
    id: string;
    title: string;
    description: string;
    iconName: "Palette" | "Layers" | "Smile" | "MessageSquare" | "ImageIcon" | "Type";
    badge: string;
  }[];
  workflowSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  faqs: {
    id: string;
    question: string;
    answer: string;
  }[];
}

export function ServicesClientView({
  profile,
  offerings,
  workflowSteps,
  faqs,
}: ServicesClientViewProps) {
  return (
    <div className="py-12 sm:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 1. Header with Smooth Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white">
            Commission Creative Services
          </h1>

          <p className="text-sm sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
            We specialize in bespoke 2D anime illustrations, VTuber assets, character designs, and streaming graphics. All client commissions are securely handled via our official profiles on{" "}
            <strong className="text-zinc-950 dark:text-white font-bold">VGen</strong> and{" "}
            <strong className="text-zinc-950 dark:text-white font-bold">Fiverr</strong>.
          </p>
        </motion.div>

        {/* 2. Official Commission Ordering Portals (VGen & Fiverr) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        >
          {/* VGen Card */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative rounded-3xl border-2 border-[#A3FF00]/40 hover:border-[#A3FF00] dark:border-[#A3FF00]/30 dark:hover:border-[#A3FF00] bg-gradient-to-br from-[#A3FF00]/10 via-white to-zinc-50 dark:from-[#A3FF00]/10 dark:via-zinc-900 dark:to-zinc-900 p-8 sm:p-10 shadow-xl shadow-[#A3FF00]/5 flex flex-col justify-between transition-colors"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A3FF00] shadow-md shadow-[#A3FF00]/30 p-2.5">
                  <VGenIcon className="h-full w-full object-contain" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[#A3FF00] text-zinc-950 shadow-sm shadow-[#A3FF00]/25">
                  RECOMMENDED PLATFORM
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
                  Commission via VGen
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed font-medium">
                  Ideal for VTubers, content creators, and independent clients. Features milestone approvals, WIP feedback tracking, and verified reviews.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#84CC00] dark:text-[#A3FF00] shrink-0" />
                  <span>Direct client milestone check-ins & sketch stage sign-off</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#84CC00] dark:text-[#A3FF00] shrink-0" />
                  <span>Commercial use licensing options included</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#84CC00] dark:text-[#A3FF00] shrink-0" />
                  <span>High-resolution lossless PNG + source layered PSD</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <VGenButton href={profile.vgenUrl} size="lg" className="w-full shadow-lg shadow-[#A3FF00]/30" />
            </div>
          </motion.div>

          {/* Fiverr Card */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative rounded-3xl border-2 border-[#1DBF73]/40 hover:border-[#1DBF73] dark:border-[#1DBF73]/30 dark:hover:border-[#1DBF73] bg-gradient-to-br from-[#1DBF73]/10 via-white to-zinc-50 dark:from-[#1DBF73]/10 dark:via-zinc-900 dark:to-zinc-900 p-8 sm:p-10 shadow-xl shadow-[#1DBF73]/5 flex flex-col justify-between transition-colors"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1DBF73] shadow-md shadow-[#1DBF73]/30 p-2.5">
                  <FiverrIcon className="h-full w-full object-contain" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[#1DBF73] text-white shadow-sm shadow-[#1DBF73]/25">
                  GLOBAL ESCROW
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
                  Commission via Fiverr
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed font-medium">
                  Standardized packages with escrow buyer protection, fixed delivery timelines, and full commercial copyright transfer.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#1DBF73] shrink-0" />
                  <span>Escrow payment protection with money-back guarantee</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#1DBF73] shrink-0" />
                  <span>Fixed delivery schedules & clear package tiers</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#1DBF73] shrink-0" />
                  <span>Commercial rights certificate & master exports</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <FiverrButton href={profile.fiverrUrl} size="lg" className="w-full shadow-lg shadow-[#1DBF73]/30" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Dynamic Studio Marquee (Full Screen Width) */}
      <StudioMarquee />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* 3. Studio Service Capabilities Grid */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
              Studio Specialties & Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              Explore our core creative disciplines, crafted primarily in Clip Studio Paint and Photoshop.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((offering) => {
              const Icon = iconMap[offering.iconName] || Palette;
              return (
                <motion.div
                  key={offering.id}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/90 p-6 shadow-sm hover:border-amber-400 hover:shadow-xl hover:shadow-amber-400/10 transition-colors flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400/20 text-amber-700 dark:text-amber-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        {offering.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                      {offering.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                      {offering.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 4. Studio Production Workflow */}
        <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-8 sm:p-12 space-y-10 shadow-sm">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
              Our 4-Step Production Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              A transparent, iterative pipeline from initial concept sketch to master delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-3 shadow-sm relative overflow-hidden"
              >
                <span className="text-3xl font-black text-amber-500/30">
                  {step.step}
                </span>
                <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
                  {step.title}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. Frequently Asked Questions */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              Everything you need to know before commissioning Ayamu Labs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-2 shadow-sm"
              >
                <h4 className="font-bold text-sm text-zinc-950 dark:text-white flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-6 font-medium">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Direct Studio Inquiry Channel */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 sm:p-12 shadow-md"
        >
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <CharacterAvatar size="md" withBorder withGlow />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
                Have a Custom Commercial Inquiry?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium max-w-lg mx-auto">
                For major commercial productions, studio partnerships, or custom enterprise contracts, reach out directly to our studio inbox or Discord community.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors shadow-md"
              >
                <Mail className="h-4 w-4" />
                <span>{profile.email}</span>
              </a>

              <a
                href={profile.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm bg-[#5865F2] text-white hover:bg-[#4752C4] hover:shadow-lg hover:shadow-[#5865F2]/25 transition-all shadow-md group"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white p-0.5 shadow-sm">
                  <DiscordIcon className="h-full w-full" />
                </span>
                <span>Join Discord Community</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-80 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}