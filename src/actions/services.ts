"use server";

import { prisma } from "@/lib/prisma";

export async function getServicesData() {
  try {
    const [offerings, workflowSteps, faqs] = await Promise.all([
      prisma.studioOffering.findMany({ orderBy: { order: "asc" } }),
      prisma.workflowStep.findMany({ orderBy: { order: "asc" } }),
      prisma.fAQItem.findMany({ orderBy: { order: "asc" } }),
    ]);

    return {
      offerings: offerings.map((o) => ({
        id: o.id,
        title: o.title,
        description: o.description,
        iconName: o.iconName as "Palette" | "Layers" | "Smile" | "MessageSquare" | "ImageIcon" | "Type",
        badge: o.badge,
      })),
      workflowSteps: workflowSteps.map((w) => ({
        step: w.step,
        title: w.title,
        description: w.description,
      })),
      faqs: faqs.map((f) => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
      })),
    };
  } catch (error) {
    console.error("Error fetching services data:", error);
    return {
      offerings: [],
      workflowSteps: [],
      faqs: [],
    };
  }
}