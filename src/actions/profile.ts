"use server";

import { prisma } from "@/lib/prisma";
import { safeRevalidatePath } from "@/lib/server-utils";

export async function getStudioProfile() {
  try {
    let profile = await prisma.studioProfile.findUnique({
      where: { id: "default" },
    });

    if (!profile) {
      profile = await prisma.studioProfile.findFirst();
    }

    if (!profile) return null;

    return {
      name: profile.name,
      tagline: profile.tagline,
      slogan: profile.slogan,
      characterName: profile.characterName,
      characterNickname: profile.characterNickname,
      characterBio: profile.characterBio,
      characterAvatar: profile.characterAvatar,
      vgenUrl: profile.vgenUrl,
      fiverrUrl: profile.fiverrUrl,
      discordUrl: profile.discordUrl,
      email: profile.email,
      xUrl: profile.xUrl,
      artstationUrl: profile.artstationUrl,
      stats: {
        projectsCompleted: profile.statsProjectsCompleted,
        globalClients: profile.statsGlobalClients,
        awardsRecognitions: profile.statsAwardsRecognitions,
        hoursRendered: profile.statsHoursRendered,
      },
    };
  } catch (error) {
    console.error("Error fetching studio profile:", error);
    return null;
  }
}

export async function updateStudioProfile(data: {
  name?: string;
  tagline?: string;
  slogan?: string;
  characterName?: string;
  characterNickname?: string;
  characterBio?: string;
  characterAvatar?: string;
  vgenUrl?: string;
  fiverrUrl?: string;
  discordUrl?: string;
  email?: string;
  xUrl?: string;
  artstationUrl?: string;
  stats?: {
    projectsCompleted?: number;
    globalClients?: number;
    awardsRecognitions?: number;
    hoursRendered?: number;
  };
}) {
  try {
    await prisma.studioProfile.upsert({
      where: { id: "default" },
      update: {
        name: data.name,
        tagline: data.tagline,
        slogan: data.slogan,
        characterName: data.characterName,
        characterNickname: data.characterNickname,
        characterBio: data.characterBio,
        characterAvatar: data.characterAvatar,
        vgenUrl: data.vgenUrl,
        fiverrUrl: data.fiverrUrl,
        discordUrl: data.discordUrl,
        email: data.email,
        xUrl: data.xUrl,
        artstationUrl: data.artstationUrl,
        statsProjectsCompleted: data.stats?.projectsCompleted,
        statsGlobalClients: data.stats?.globalClients,
        statsAwardsRecognitions: data.stats?.awardsRecognitions,
        statsHoursRendered: data.stats?.hoursRendered,
      },
      create: {
        id: "default",
        name: data.name || "Ayamu Labs",
        tagline: data.tagline || "",
        slogan: data.slogan || "Creative Studio",
        characterName: data.characterName || "Ayamu Hamiru",
        characterNickname: data.characterNickname || "Ayamu",
        characterBio: data.characterBio || "",
        characterAvatar: data.characterAvatar || "/images/ayamu-hamiru.jpg",
        vgenUrl: data.vgenUrl || "https://vgen.co/ayamulabs",
        fiverrUrl: data.fiverrUrl || "https://www.fiverr.com/ayamulabs",
        discordUrl: data.discordUrl || "https://discord.gg/ayamulabs",
        email: data.email || "ayamuhamiru@gmail.com",
        xUrl: data.xUrl || "https://x.com/ayamulabs",
        artstationUrl: data.artstationUrl || "https://artstation.com/ayamulabs",
        statsProjectsCompleted: data.stats?.projectsCompleted || 140,
        statsGlobalClients: data.stats?.globalClients || 85,
        statsAwardsRecognitions: data.stats?.awardsRecognitions || 12,
        statsHoursRendered: data.stats?.hoursRendered || 3200,
      },
    });

    safeRevalidatePath("/admin/profile");
    safeRevalidatePath("/about");
    safeRevalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error updating studio profile:", error);
    return { success: false, error: "Failed to update studio profile." };
  }
}

export async function getCharacterPhilosophies() {
  try {
    const philosophies = await prisma.characterPhilosophy.findMany({
      orderBy: { order: "asc" },
    });
    return philosophies.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
    }));
  } catch (error) {
    console.error("Error fetching character philosophies:", error);
    return [];
  }
}