"use server";

import { prisma } from "@/lib/prisma";
import { safeRevalidatePath } from "@/lib/server-utils";

export interface TeamMemberData {
  id?: string;
  name: string;
  nickname?: string;
  role: string;
  bio: string;
  avatar: string;
  specialties: string[];
  socials?: {
    x?: string;
    artstation?: string;
    github?: string;
    behance?: string;
    instagram?: string;
    discord?: string;
  };
}

export async function getTeamMembers() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { order: "asc" },
    });

    return members.map((m) => ({
      id: m.id,
      name: m.name,
      nickname: m.nickname || "",
      role: m.role,
      bio: m.bio,
      avatar: m.avatar,
      specialties: m.specialties,
      socials: (m.socials as Record<string, string>) || {},
    }));
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

export async function createTeamMember(data: TeamMemberData) {
  try {
    const count = await prisma.teamMember.count();
    const created = await prisma.teamMember.create({
      data: {
        name: data.name,
        nickname: data.nickname || null,
        role: data.role,
        bio: data.bio,
        avatar: data.avatar || "/images/ayamu-hamiru.jpg",
        specialties: data.specialties || [],
        socials: data.socials || {},
        order: count,
      },
    });

    safeRevalidatePath("/", "layout");
    return { success: true, member: created };
  } catch (error: unknown) {
    console.error("Error creating team member:", error);
    const msg = error instanceof Error ? error.message : "Failed to create team member.";
    return { success: false, error: msg };
  }
}

export async function updateTeamMember(id: string, data: Partial<TeamMemberData>) {
  try {
    await prisma.teamMember.update({
      where: { id },
      data: {
        name: data.name,
        nickname: data.nickname !== undefined ? data.nickname : undefined,
        role: data.role,
        bio: data.bio,
        avatar: data.avatar,
        specialties: data.specialties,
        socials: data.socials !== undefined ? data.socials : undefined,
      },
    });

    safeRevalidatePath("/", "layout");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error updating team member:", error);
    const msg = error instanceof Error ? error.message : "Failed to update team member.";
    return { success: false, error: msg };
  }
}

export async function deleteTeamMember(id: string) {
  try {
    await prisma.teamMember.delete({ where: { id } });
    safeRevalidatePath("/", "layout");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting team member:", error);
    return { success: false, error: "Failed to delete team member." };
  }
}
