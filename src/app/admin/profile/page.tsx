import * as React from "react";
import { getStudioProfile } from "@/actions/profile";
import { getTeamMembers } from "@/actions/team";
import { AdminProfileClientView } from "@/components/admin/admin-profile-client-view";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const [profile, team] = await Promise.all([
    getStudioProfile(),
    getTeamMembers(),
  ]);

  const studioProfile = profile || {
    name: "Ayamu Labs",
    tagline: "Where Imagination Hatches Into Immersive Visual Masterpieces",
    slogan: "Creative Studio",
    characterName: "Ayamu Hamiru",
    characterNickname: "Ayamu",
    characterBio: "",
    characterAvatar: "/images/ayamu-hamiru.jpg",
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
    discordUrl: "https://discord.gg/ayamulabs",
    email: "ayamuhamiru@gmail.com",
    xUrl: "https://x.com/ayamulabs",
    artstationUrl: "https://artstation.com/ayamulabs",
    stats: {
      projectsCompleted: 140,
      globalClients: 85,
      awardsRecognitions: 12,
      hoursRendered: 3200,
    },
  };

  return (
    <AdminProfileClientView
      initialProfile={studioProfile}
      initialTeam={team}
    />
  );
}