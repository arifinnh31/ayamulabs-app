import * as React from "react";
import type { Metadata } from "next";
import { getStudioProfile, getCharacterPhilosophies } from "@/actions/profile";
import { getTeamMembers } from "@/actions/team";
import { INITIAL_TEAM_MEMBERS, INITIAL_CHARACTER_PHILOSOPHY, INITIAL_STUDIO_PROFILE } from "@/lib/mock-data";
import { AboutClientView } from "@/components/about/about-client-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Studio & Creative Team",
  description:
    "Discover the story, creative philosophy, and passionate artist crew behind Ayamu Labs and our studio mascot Ayamu Hamiru.",
  openGraph: {
    title: "About Studio & Team | Ayamu Labs",
    description:
      "Discover the story, creative philosophy, and passionate artist crew behind Ayamu Labs and our studio mascot Ayamu Hamiru.",
    url: "https://ayamulabs.art/about",
  },
};

export default async function AboutPage() {
  const [profile, team, philosophies] = await Promise.all([
    getStudioProfile(),
    getTeamMembers(),
    getCharacterPhilosophies(),
  ]);

  const studioProfile = profile || {
    name: INITIAL_STUDIO_PROFILE.name,
    tagline: INITIAL_STUDIO_PROFILE.tagline,
    slogan: INITIAL_STUDIO_PROFILE.slogan,
    characterName: INITIAL_STUDIO_PROFILE.characterName,
    characterNickname: INITIAL_STUDIO_PROFILE.characterNickname,
    characterBio: INITIAL_STUDIO_PROFILE.characterBio,
    characterAvatar: INITIAL_STUDIO_PROFILE.characterAvatar,
    stats: INITIAL_STUDIO_PROFILE.stats,
  };

  const displayTeam = team && team.length > 0 ? team : INITIAL_TEAM_MEMBERS;
  const displayPhilosophies = philosophies && philosophies.length > 0 ? philosophies : INITIAL_CHARACTER_PHILOSOPHY.map((p, i) => ({
    id: `philo-${i + 1}`,
    title: p.title,
    description: p.description,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Ayamu Labs Creative Studio",
    url: "https://ayamulabs.art/about",
    description: studioProfile.tagline || studioProfile.slogan,
    mainEntity: {
      "@type": "Organization",
      name: studioProfile.name,
      url: "https://ayamulabs.art",
      member: displayTeam.map((member) => ({
        "@type": "Person",
        name: member.name,
        jobTitle: member.role,
        image: member.avatar,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClientView
        profile={studioProfile}
        team={displayTeam}
        philosophy={displayPhilosophies}
      />
    </>
  );
}