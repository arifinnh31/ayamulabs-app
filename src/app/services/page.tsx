import * as React from "react";
import type { Metadata } from "next";
import { getServicesData } from "@/actions/services";
import { getStudioProfile } from "@/actions/profile";
import { ServicesClientView } from "@/components/services/services-client-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Commission Services & Pricing Workflow",
  description:
    "Official commission info, commercial illustration tiers, workflow process, and client FAQs. Order safely on VGen and Fiverr.",
  openGraph: {
    title: "Commission Services | Ayamu Labs Creative Studio",
    description:
      "Official commission info, commercial illustration tiers, workflow process, and client FAQs. Order safely on VGen and Fiverr.",
    url: "https://ayamulabs.art/services",
  },
};

export default async function ServicesPage() {
  const [servicesData, profile] = await Promise.all([
    getServicesData(),
    getStudioProfile(),
  ]);

  const studioProfile = profile || {
    name: "Ayamu Labs",
    email: "ayamuhamiru@gmail.com",
    discordUrl: "https://discord.gg/ayamulabs",
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
    characterName: "Ayamu Hamiru",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicesData.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesClientView
        profile={studioProfile}
        offerings={servicesData.offerings}
        workflowSteps={servicesData.workflowSteps}
        faqs={servicesData.faqs}
      />
    </>
  );
}