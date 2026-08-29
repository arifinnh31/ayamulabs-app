import { PrismaClient, AspectRatio, PublishStatus, MediaType } from "@prisma/client";
import {
  INITIAL_CATEGORIES,
  INITIAL_TAGS,
  INITIAL_PORTFOLIO,
  INITIAL_STUDIO_PROFILE,
  INITIAL_TEAM_MEMBERS,
  INITIAL_STUDIO_OFFERINGS,
  INITIAL_WORKFLOW_STEPS,
  INITIAL_FAQS,
  INITIAL_CHARACTER_PHILOSOPHY,
} from "../src/lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding for Ayamu Labs...");

  // 1. Clean existing data in reverse relational order
  await prisma.artworkTag.deleteMany();
  await prisma.artworkMedia.deleteMany();
  await prisma.artworkBeforeAfter.deleteMany();
  await prisma.artwork.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.studioProfile.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.studioOffering.deleteMany();
  await prisma.workflowStep.deleteMany();
  await prisma.fAQItem.deleteMany();
  await prisma.characterPhilosophy.deleteMany();

  console.log("🧹 Cleaned existing tables.");

  // 2. Seed Categories
  const categoryMap = new Map<string, string>();
  for (let i = 0; i < INITIAL_CATEGORIES.length; i++) {
    const cat = INITIAL_CATEGORIES[i];
    const created = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        iconName: cat.iconName,
        order: i,
      },
    });
    categoryMap.set(cat.slug, created.id);
  }
  console.log(`✅ ${INITIAL_CATEGORIES.length} Categories seeded.`);

  // 3. Seed Tags
  const tagMap = new Map<string, string>();
  for (const tagName of INITIAL_TAGS) {
    const slug = tagName.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
    const created = await prisma.tag.create({
      data: {
        name: tagName,
        slug,
      },
    });
    tagMap.set(tagName.toLowerCase(), created.id);
  }
  console.log(`✅ ${INITIAL_TAGS.length} Tags seeded.`);

  // 4. Seed Artworks with Relations
  for (let i = 0; i < INITIAL_PORTFOLIO.length; i++) {
    const item = INITIAL_PORTFOLIO[i];
    const categoryId = categoryMap.get(item.category) || categoryMap.get("illustration")!;

    let aspectEnum: AspectRatio = AspectRatio.LANDSCAPE;
    if (item.aspectRatio === "portrait") aspectEnum = AspectRatio.PORTRAIT;
    else if (item.aspectRatio === "square") aspectEnum = AspectRatio.SQUARE;

    const artwork = await prisma.artwork.create({
      data: {
        slug: item.slug,
        title: item.title,
        subtitle: item.subtitle,
        year: item.year,
        client: item.client || null,
        roles: item.role,
        description: item.description,
        conceptStory: item.conceptStory,
        coverImage: item.coverImage,
        aspectRatio: aspectEnum,
        status: item.status === "published" ? PublishStatus.PUBLISHED : PublishStatus.DRAFT,
        isFeatured: item.isFeatured,
        order: item.order || i,
        views: item.views,
        likes: item.likes,
        tools: item.tools,
        vgenUrl: item.vgenUrl || null,
        fiverrUrl: item.fiverrUrl || null,
        categoryId,
      },
    });

    // 4a. Seed Artwork Gallery Media
    if (item.gallery && item.gallery.length > 0) {
      for (let g = 0; g < item.gallery.length; g++) {
        const media = item.gallery[g];
        await prisma.artworkMedia.create({
          data: {
            artworkId: artwork.id,
            url: media.url,
            type: media.type === "video" ? MediaType.VIDEO : MediaType.IMAGE,
            caption: media.caption || "",
            order: g,
          },
        });
      }
    }

    // 4b. Seed Before/After
    if (item.beforeAfter) {
      await prisma.artworkBeforeAfter.create({
        data: {
          artworkId: artwork.id,
          beforeImage: item.beforeAfter.beforeImage,
          beforeLabel: item.beforeAfter.beforeLabel,
          afterImage: item.beforeAfter.afterImage,
          afterLabel: item.beforeAfter.afterLabel,
        },
      });
    }

    // 4c. Link Tags
    for (const tag of item.tags) {
      const tagId = tagMap.get(tag.toLowerCase());
      if (tagId) {
        await prisma.artworkTag.create({
          data: {
            artworkId: artwork.id,
            tagId,
          },
        });
      }
    }
  }
  console.log(`✅ ${INITIAL_PORTFOLIO.length} Artworks with Media & Tags seeded.`);

  // 5. Seed Studio Profile
  await prisma.studioProfile.create({
    data: {
      id: "default",
      name: INITIAL_STUDIO_PROFILE.name,
      tagline: INITIAL_STUDIO_PROFILE.tagline,
      slogan: INITIAL_STUDIO_PROFILE.slogan,
      characterName: INITIAL_STUDIO_PROFILE.characterName,
      characterNickname: INITIAL_STUDIO_PROFILE.characterNickname,
      characterBio: INITIAL_STUDIO_PROFILE.characterBio,
      characterAvatar: INITIAL_STUDIO_PROFILE.characterAvatar,
      vgenUrl: INITIAL_STUDIO_PROFILE.vgenUrl,
      fiverrUrl: INITIAL_STUDIO_PROFILE.fiverrUrl,
      discordUrl: INITIAL_STUDIO_PROFILE.discordUrl,
      email: INITIAL_STUDIO_PROFILE.email,
      xUrl: INITIAL_STUDIO_PROFILE.xUrl,
      artstationUrl: INITIAL_STUDIO_PROFILE.artstationUrl,
      statsProjectsCompleted: INITIAL_STUDIO_PROFILE.stats.projectsCompleted,
      statsGlobalClients: INITIAL_STUDIO_PROFILE.stats.globalClients,
      statsAwardsRecognitions: INITIAL_STUDIO_PROFILE.stats.awardsRecognitions,
      statsHoursRendered: INITIAL_STUDIO_PROFILE.stats.hoursRendered,
    },
  });
  console.log("✅ Studio Profile seeded.");

  // 6. Seed Team Members
  for (let i = 0; i < INITIAL_TEAM_MEMBERS.length; i++) {
    const member = INITIAL_TEAM_MEMBERS[i];
    await prisma.teamMember.create({
      data: {
        name: member.name,
        nickname: member.nickname,
        role: member.role,
        bio: member.bio,
        avatar: member.avatar,
        specialties: member.specialties,
        socials: member.socials,
        order: i,
      },
    });
  }
  console.log(`✅ ${INITIAL_TEAM_MEMBERS.length} Team Members seeded.`);

  // 7. Seed Studio Offerings
  for (let i = 0; i < INITIAL_STUDIO_OFFERINGS.length; i++) {
    const offering = INITIAL_STUDIO_OFFERINGS[i];
    await prisma.studioOffering.create({
      data: {
        title: offering.title,
        description: offering.description,
        iconName: offering.iconName,
        badge: offering.badge,
        order: i,
      },
    });
  }
  console.log(`✅ ${INITIAL_STUDIO_OFFERINGS.length} Studio Offerings seeded.`);

  // 8. Seed Workflow Steps
  for (let i = 0; i < INITIAL_WORKFLOW_STEPS.length; i++) {
    const step = INITIAL_WORKFLOW_STEPS[i];
    await prisma.workflowStep.create({
      data: {
        step: step.step,
        title: step.title,
        description: step.description,
        order: i,
      },
    });
  }
  console.log(`✅ ${INITIAL_WORKFLOW_STEPS.length} Workflow Steps seeded.`);

  // 9. Seed FAQs
  for (let i = 0; i < INITIAL_FAQS.length; i++) {
    const faq = INITIAL_FAQS[i];
    await prisma.fAQItem.create({
      data: {
        question: faq.question,
        answer: faq.answer,
        order: i,
      },
    });
  }
  console.log(`✅ ${INITIAL_FAQS.length} FAQ items seeded.`);

  // 10. Seed Character Philosophies
  for (let i = 0; i < INITIAL_CHARACTER_PHILOSOPHY.length; i++) {
    const philo = INITIAL_CHARACTER_PHILOSOPHY[i];
    await prisma.characterPhilosophy.create({
      data: {
        title: philo.title,
        description: philo.description,
        order: i,
      },
    });
  }
  console.log(`✅ ${INITIAL_CHARACTER_PHILOSOPHY.length} Character Philosophies seeded.`);

  console.log("✨ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });