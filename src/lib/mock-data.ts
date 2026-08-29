export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category:
    | "illustration"
    | "character-design"
    | "chibi"
    | "emotes-badges"
    | "logo-typography"
    | "background-art"
    | "concept-art"
    | "ych"
    | string;
  categoryName: string;
  tags: string[];
  year: string;
  client?: string;
  role: string[];
  description: string;
  conceptStory: string;
  coverImage: string;
  aspectRatio: "portrait" | "landscape" | "square";
  gallery: {
    type: "image" | "video";
    url: string;
    caption: string;
  }[];
  beforeAfter?: {
    beforeImage: string;
    beforeLabel: string;
    afterImage: string;
    afterLabel: string;
  };
  tools: string[];
  isFeatured: boolean;
  order: number;
  status: "published" | "draft";
  views: number;
  likes: number;
  vgenUrl?: string;
  fiverrUrl?: string;
}

export type Artwork = PortfolioItem;

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  count: number;
  iconName: string;
}

export interface TeamMember {
  id: string;
  name: string;
  nickname: string;
  role: string;
  bio: string;
  avatar: string;
  specialties: string[];
  socials: {
    x?: string;
    artstation?: string;
    github?: string;
    behance?: string;
    instagram?: string;
    discord?: string;
  };
}

export interface StudioProfile {
  name: string;
  tagline: string;
  slogan: string;
  characterName: string;
  characterNickname: string;
  characterBio: string;
  characterAvatar: string;
  vgenUrl: string;
  fiverrUrl: string;
  discordUrl: string;
  email: string;
  xUrl: string;
  artstationUrl: string;
  stats: {
    projectsCompleted: number;
    globalClients: number;
    awardsRecognitions: number;
    hoursRendered: number;
  };
}

export interface StudioOffering {
  id: string;
  title: string;
  description: string;
  iconName: "Palette" | "Layers" | "Smile" | "MessageSquare" | "ImageIcon" | "Type";
  badge: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CharacterPhilosophyItem {
  title: string;
  description: string;
}

export const INITIAL_STUDIO_PROFILE: StudioProfile = {
  name: "Ayamu Labs",
  tagline: "Where Imagination Hatches Into Immersive Visual Masterpieces",
  slogan: "Creative Studio",
  characterName: "Ayamu Hamiru",
  characterNickname: "Ayamu",
  characterBio:
    "Ayamu Hamiru is a spirited, cheerful girl who proudly rocks her signature yellow chick kigurumi hoodie. Together with her tiny white chicken companion, Ayamu embodies the creative pulse and vibrant optimism of Ayamu Labs, always ready to hatch the brightest ideas into visual reality!",
  characterAvatar: "/images/ayamu-hamiru.jpg",
  vgenUrl: "https://vgen.co/ayamulabs",
  fiverrUrl: "https://www.fiverr.com/ayamulabs",
  discordUrl: "https://discord.gg/ayamulabs",
  email: "ayamuhamiru@gmail.com",
  xUrl: "https://x.com/ayamulabs",
  artstationUrl: "https://artstation.com/ayamulabs",
  stats: {
    projectsCompleted: 142,
    globalClients: 88,
    awardsRecognitions: 12,
    hoursRendered: 3400,
  },
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "clhc010000000000000000001",
    slug: "illustration",
    name: "Illustration",
    description: "High-detail digital paintings, splash art, light novel covers, and anime visual illustrations.",
    count: 2,
    iconName: "Palette",
  },
  {
    id: "clhc020000000000000000002",
    slug: "character-design",
    name: "Character Design",
    description: "Original character sheets, turnarounds, VTuber visuals, and stylized costume designs.",
    count: 2,
    iconName: "UserCheck",
  },
  {
    id: "clhc030000000000000000003",
    slug: "chibi",
    name: "Chibi",
    description: "Cute super-deformed characters, chibi illustrations, and adorable character art.",
    count: 2,
    iconName: "Smile",
  },
  {
    id: "clhc040000000000000000004",
    slug: "emotes-badges",
    name: "Emotes & Badges",
    description: "Custom Twitch/Discord emotes, sub badges, bit tier icons, and animated channel stickers.",
    count: 2,
    iconName: "MessageSquare",
  },
  {
    id: "clhc050000000000000000005",
    slug: "logo-typography",
    name: "Logo & Typography",
    description: "Streamer titles, VTuber logos, branding watermarks, and stylized typography graphics.",
    count: 2,
    iconName: "Type",
  },
  {
    id: "clhc060000000000000000006",
    slug: "background-art",
    name: "Background Art",
    description: "Scenery paintings, fantasy environments, anime room backgrounds, and stream backdrops.",
    count: 2,
    iconName: "Image",
  },
  {
    id: "clhc070000000000000000007",
    slug: "concept-art",
    name: "Concept Art",
    description: "Worldbuilding sketches, environmental mood pieces, creature & weapon visual concepts.",
    count: 2,
    iconName: "Compass",
  },
  {
    id: "clhc080000000000000000008",
    slug: "ych",
    name: "YCH",
    description: "Your Character Here customizable visual presets, dynamic poses, and seasonal templates.",
    count: 2,
    iconName: "Layers",
  },
];

export const INITIAL_TAGS: string[] = [
  "Clip Studio Paint",
  "Photoshop",
  "Character Design",
  "Chibi",
  "Twitch Emotes",
  "Sub Badges",
  "Anime Pop",
  "Cel Shading",
  "Background Scenery",
  "Concept Art",
  "YCH",
  "Live2D",
  "Vtuber Asset",
  "Logo & Branding",
  "Key Visual",
  "Light Novel Cover",
  "Discord Stickers",
  "Fantasy Environment",
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  // 1. Category: Illustration
  {
    id: "clhart01000000000000000001",
    slug: "ayamu-golden-awakening",
    title: "Ayamu: The Golden Awakening",
    subtitle: "Official Studio Key Visual & High-Resolution Splash Illustration",
    category: "illustration",
    categoryName: "Illustration",
    tags: ["Clip Studio Paint", "Photoshop", "Key Visual", "Cel-Shading", "Anime Pop"],
    year: "2026",
    client: "Ayamu Labs Original IP",
    role: ["Creative Direction", "Character Concept", "Line Art", "Color Rendering"],
    description:
      "The premier full-canvas studio key visual of Ayamu Hamiru glowing with morning sunlight, embracing her round companion chick with radiant warm yellow hues and vibrant pop highlights.",
    conceptStory:
      "Developed in Clip Studio Paint as the studio's primary visual identity centerpiece. Emphasizes warm ambient lighting, dynamic fabric folds on the canary oversized hoodie, and multi-layered cel-shading.",
    coverImage: "/images/ayamu-hamiru.jpg",
    aspectRatio: "square",
    gallery: [
      {
        type: "image",
        url: "/images/ayamu-hamiru.jpg",
        caption: "Final High-Resolution Key Visual Splash Art.",
      },
      {
        type: "image",
        url: "/images/ayamu-hamiru.jpg",
        caption: "Close-up rendering of facial expression and companion chick.",
      },
    ],
    beforeAfter: {
      beforeImage: "/images/ayamu-hamiru.jpg",
      beforeLabel: "Rough Line Sketch & Posing",
      afterImage: "/images/ayamu-hamiru.jpg",
      afterLabel: "Final Mastered Splash Art",
    },
    tools: ["Clip Studio Paint", "Adobe Photoshop", "Wacom Cintiq Pro 27"],
    isFeatured: true,
    order: 1,
    status: "published",
    views: 184,
    likes: 32,
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
  },
  {
    id: "clhart02000000000000000002",
    slug: "astral-starlight-symphony",
    title: "Astral Starlight Symphony",
    subtitle: "Fantasy Anime Book Cover & Grand Splash Artwork",
    category: "illustration",
    categoryName: "Illustration",
    tags: ["Clip Studio Paint", "Photoshop", "Light Novel Cover", "Fantasy Environment", "Key Visual"],
    year: "2026",
    client: "Kadokawa Indie Circle",
    role: ["Lead Illustration", "Color Scripting", "Atmospheric Compositing"],
    description:
      "A majestic celestial composition depicting Ayamu orchestrating constellation trails under a moonlit aurora sky with luminescent feathers.",
    conceptStory:
      "Commissioned as a special light novel cover illustration. Combines deep indigo and vibrant gold accents with rim lighting techniques and crystalline particle brushwork.",
    coverImage: "/images/ayamu-hamiru.jpg",
    aspectRatio: "portrait",
    gallery: [
      {
        type: "image",
        url: "/images/ayamu-hamiru.jpg",
        caption: "Full vertical light novel book cover edition (lossless 4K).",
      },
    ],
    tools: ["Clip Studio Paint", "Adobe Photoshop"],
    isFeatured: true,
    order: 2,
    status: "published",
    views: 142,
    likes: 25,
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
  },

  // 2. Category: Character Design
  {
    id: "clhart03000000000000000003",
    slug: "ayamu-hamiru-model-sheet",
    title: "Ayamu Hamiru: Master Reference Sheet",
    subtitle: "Full 3-View Character Turnaround, Expressions & Costume Callouts",
    category: "character-design",
    categoryName: "Character Design",
    tags: ["Clip Studio Paint", "Character Design", "Cel-Shading", "Vtuber Asset"],
    year: "2026",
    client: "Ayamu Labs Original IP",
    role: ["Character Concept", "Orthographic Turnaround", "Expression Design"],
    description:
      "The complete official model sheet for Ayamu Hamiru featuring front, side, and 3/4 turnarounds, detailed hairstyle breakdowns, chick companion anatomy, and 6 emotive face portraits.",
    conceptStory:
      "Built to serve as the definitive blueprint for merchandise production, 3D character modeling, and animation reference. All color swatches and fabric seams are meticulously annotated.",
    coverImage: "/images/ayamu-hamiru.jpg",
    aspectRatio: "landscape",
    gallery: [
      {
        type: "image",
        url: "/images/ayamu-hamiru.jpg",
        caption: "Full 3-View Turnaround & Expression Sheet.",
      },
    ],
    beforeAfter: {
      beforeImage: "/images/ayamu-hamiru.jpg",
      beforeLabel: "Base Anatomy & Mannequin Lines",
      afterImage: "/images/ayamu-hamiru.jpg",
      afterLabel: "Full Orthographic Turnaround",
    },
    tools: ["Clip Studio Paint", "Adobe Photoshop"],
    isFeatured: true,
    order: 3,
    status: "published",
    views: 196,
    likes: 35,
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
  },
  {
    id: "clhart04000000000000000004",
    slug: "cyber-avian-mecha-pilot",
    title: "Cyber Avian Mecha Pilot",
    subtitle: "Sci-Fi Character Concept & Mechanical Armor Breakdown",
    category: "character-design",
    categoryName: "Character Design",
    tags: ["Clip Studio Paint", "Character Design", "Concept Art", "Cel-Shading"],
    year: "2026",
    client: "Project Nova VR",
    role: ["Mecha Design", "Character Orthographic", "Weapon Design"],
    description:
      "A futuristic tactical outfit redesign for Ayamu, integrating lightweight carbon-fiber feather gliders, holographic visor HUD, and stylized high-top booster sneakers.",
    conceptStory:
      "Explores the intersection between casual street-pop anime fashion and functional mecha mechanics, using hard-surface panel separation in Clip Studio Paint.",
    coverImage: "/images/ayamu-hamiru.jpg",
    aspectRatio: "portrait",
    gallery: [
      {
        type: "image",
        url: "/images/ayamu-hamiru.jpg",
        caption: "Mecha Armor & Holographic Wing Breakdown.",
      },
    ],
    tools: ["Clip Studio Paint", "Adobe Photoshop CC"],
    isFeatured: false,
    order: 4,
    status: "published",
    views: 98,
    likes: 16,
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
  },

  // 3. Category: Chibi
  {
    id: "clhart05000000000000000005",
    slug: "chibi-ayamu-boba-comfort",
    title: "Chibi Ayamu: Boba Tea & Fluffy Treats",
    subtitle: "Ultra-Cute 2-Head Ratio Mascot Chibi Sticker Collection",
    category: "chibi",
    categoryName: "Chibi",
    tags: ["Clip Studio Paint", "Chibi", "Discord Stickers", "Anime Pop"],
    year: "2026",
    client: "Ayamu Labs Merch Circle",
    role: ["Chibi Art", "Vector Prep", "Merch Layout"],
    description:
      "A joyful series of 2-head ratio chibi illustrations featuring Ayamu balancing fresh boba cups on her head and hugging oversized strawberry mochi.",
    conceptStory:
      "Optimized specifically for acrylic keychain charms, enamel pin manufacturing, and vinyl die-cut sticker prints with thick vector-style clean outlines.",
    coverImage: "/images/ayamu-hamiru.jpg",
    aspectRatio: "square",
    gallery: [
      {
        type: "image",
        url: "/images/ayamu-hamiru.jpg",
        caption: "Chibi boba sticker collection preview.",
      },
    ],
    tools: ["Clip Studio Paint", "Photoshop"],
    isFeatured: true,
    order: 5,
    status: "published",
    views: 168,
    likes: 29,
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
  },
  {
    id: "clhart06000000000000000006",
    slug: "the-little-chick-brigade",
    title: "The Little Chick Brigade",
    subtitle: "Merchandise-Ready Mini Mascot Illustration Series",
    category: "chibi",
    categoryName: "Chibi",
    tags: ["Clip Studio Paint", "Chibi", "Anime Pop", "Discord Stickers"],
    year: "2026",
    client: "Ayamu Labs Merch Circle",
    role: ["Mascot Chibi Art", "Merchandise Design"],
    description:
      "A playful merchandise set showcasing Ayamu's cuddly companion chick in various hilarious poses: wearing oversized gamer headsets, sleeping inside an eggshell, and holding a paintbrush.",
    conceptStory:
      "Created for Twitch subscriber gifts and booth freebies at anime conventions, prioritizing bold readable silhouettes at compact resolutions.",
    coverImage: "/images/ayamu-hamiru.jpg",
    aspectRatio: "square",
    gallery: [
      {
        type: "image",
        url: "/images/ayamu-hamiru.jpg",
        caption: "Mascot chick mini sticker set.",
      },
    ],
    tools: ["Clip Studio Paint"],
    isFeatured: false,
    order: 6,
    status: "published",
    views: 114,
    likes: 19,
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
  },

  // 4. Category: Emotes & Badges
  {
    id: "clhart07000000000000000007",
    slug: "ayamu-streamer-emote-pack",
    title: "Ayamu Ultimate Streamer Emote Pack",
    subtitle: "High-Readability Twitch & Discord Channel Emote Set",
    category: "emotes-badges",
    categoryName: "Emotes & Badges",
    tags: ["Clip Studio Paint", "Photoshop", "Twitch Emotes", "Discord Stickers"],
    year: "2026",
    client: "ChirpyLive Streaming",
    role: ["Emote Art", "Pixel Clarity Optimization", "Sub Badge Icons"],
    description:
      "A complete set of 12 custom channel emotes (GG, Hype, Cry, Sip, Bonk, Lurk, Heart, Rage) drawn with exaggerated expressions and high-contrast lines for dark and light stream chats.",
    conceptStory:
      "Engineered specifically to remain crisp and expressive at 28px, 56px, and 112px scales. Features bold outer outlines and saturated focal colors.",
    coverImage: "/images/ayamu-hamiru.jpg",
    aspectRatio: "landscape",
    gallery: [
      {
        type: "image",
        url: "/images/ayamu-hamiru.jpg",
        caption: "Full 12-Emote Channel Grid Sheet.",
      },
    ],
    tools: ["Clip Studio Paint", "Photoshop"],
    isFeatured: true,
    order: 7,
    status: "published",
    views: 155,
    likes: 27,
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
  },
  {
    id: "clhart08000000000000000008",
    slug: "golden-hatchling-sub-badges",
    title: "Golden Hatchling Sub Loyalty Badges",
    subtitle: "Tier Progression Sub Badges (1M, 3M, 6M, 1Y, 2Y)",
    category: "emotes-badges",
    categoryName: "Emotes & Badges",
    tags: ["Clip Studio Paint", "Sub Badges", "Twitch Emotes", "Anime Pop"],
    year: "2026",
    client: "ChirpyLive Streaming",
    role: ["Pixel Icon Design", "Badge Tier Layout"],
    description:
      "A 6-stage evolutionary subscriber badge collection starting from a speckled egg, hatching chick, yellow hoodie fledgling, to a crowned golden phoenix chick.",
    conceptStory:
      "Designed with distinct metallic gradients and gleaming gem insets to reward long-term community members with prestigious visual status in chat.",
    coverImage: "/images/ayamu-hamiru.jpg",
    aspectRatio: "square",
    gallery: [
      {
        type: "image",
        url: "/images/ayamu-hamiru.jpg",
        caption: "Badge tier progression overview at 18px / 36px / 72px.",
      },
    ],
    tools: ["Clip Studio Paint", "Photoshop"],
    isFeatured: false,
    order: 8,
    status: "published",
    views: 88,
    likes: 14,
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
  },

  // 5. Category: Logo & Typography
  {
    id: "clhart09000000000000000009",
    slug: "ayamu-labs-studio-brandmark",
    title: "Ayamu Labs Official Brandmark & Kanji Logo",
    subtitle: "Modern Pop Anime Typography & Studio Watermark System",
    category: "logo-typography",
    categoryName: "Logo & Typography",
    tags: ["Photoshop", "Logo & Branding", "Anime Pop", "Key Visual"],
    year: "2026",
    client: "Ayamu Labs Original IP",
    role: ["Typography Design", "Logo Branding", "Brand Identity"],
    description:
      "The signature studio branding package combining stylized Katakana/English letterforms with chick silhouette accents, neon yellow gradients, and clean vector layout.",
    conceptStory:
      "Built to provide the studio and partnering VTubers with punchy, recognizable channel headers, watermarks, YouTube overlay titles, and merchandise packaging.",
    coverImage: "/images/ayamu-hamiru.jpg",
    aspectRatio: "landscape",
    gallery: [
      {
        type: "image",
        url: "/images/ayamu-hamiru.jpg",
        caption: "Full logo identity suite & horizontal lockup.",
      },
    ],
    tools: ["Adobe Photoshop", "Adobe Illustrator"],
    isFeatured: true,
    order: 9,
    status: "published",
    views: 147,
    likes: 26,
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
  },
  {
    id: "clhart10000000000000000010",
    slug: "starlight-broadcast-streamer-logo",
    title: "Starlight Broadcast: Streamer Logo System",
    subtitle: "Custom Japanese Stylized Stream Header & Debut Logo",
    category: "logo-typography",
    categoryName: "Logo & Typography",
    tags: ["Photoshop", "Logo & Branding", "Vtuber Asset", "Anime Pop"],
    year: "2026",
    client: "Stella Horizon Agency",
    role: ["Logo Design", "Streaming Asset Graphics"],
    description:
      "A vibrant custom streamer logo set featuring bubble letterings, sparkling gold stars, and customizable sub-title plates for gaming schedules and karaoke streams.",
    conceptStory:
      "Layered vector hierarchy in Adobe Photoshop and Clip Studio Paint, enabling seamless transitions between horizontal banner lockups and square avatar icons.",
    coverImage: "/images/ayamu-hamiru.jpg",
    aspectRatio: "landscape",
    gallery: [
      {
        type: "image",
        url: "/images/ayamu-hamiru.jpg",
        caption: "Debut stream logo and schedules title plate.",
      },
    ],
    tools: ["Adobe Photoshop", "Clip Studio Paint"],
    isFeatured: false,
    order: 10,
    status: "published",
    views: 76,
    likes: 12,
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
  },

  // 6. Category: Background Art
  {
    id: "clhart11000000000000000011",
    slug: "sunlit-creative-studio-morning-atelier",
    title: "Sunlit Creative Studio: Morning Atelier",
    subtitle: "Anime Interior Background & Cozy Stream Overlay Backdrop",
    category: "background-art",
    categoryName: "Background Art",
    tags: ["Clip Studio Paint", "Photoshop", "Background Scenery", "Fantasy Environment"],
    year: "2026",
    client: "Studio Original",
    role: ["Environment Concept", "Perspective Drawing", "Lighting & Shading"],
    description:
      "A warm, sun-drenched artist workspace filled with wooden drafting tables, scattered sketchbooks, yellow hanging plants, and cozy ambient daylight casting soft window shadows.",
    conceptStory:
      "Painted in Clip Studio Paint with strict 1-point and 2-point perspective grids, designed to provide VTubers with an immersive, calming stream backdrop.",
    coverImage: "/images/ayamu-hamiru.jpg",
    aspectRatio: "landscape",
    gallery: [
      {
        type: "image",
        url: "/images/ayamu-hamiru.jpg",
        caption: "Full background scene at golden hour.",
      },
    ],
    beforeAfter: {
      beforeImage: "/images/ayamu-hamiru.jpg",
      beforeLabel: "Perspective Grid & Wireframe Sketch",
      afterImage: "/images/ayamu-hamiru.jpg",
      afterLabel: "Fully Rendered Sunlit Atelier",
    },
    tools: ["Clip Studio Paint", "Photoshop CC"],
    isFeatured: true,
    order: 11,
    status: "published",
    views: 192,
    likes: 34,
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
  },
  {
    id: "clhart12000000000000000012",
    slug: "golden-hour-rooftop-city-skyline",
    title: "Golden Hour Rooftop: City Above the Clouds",
    subtitle: "Atmospheric Anime Landscape & Cinematic Vista",
    category: "background-art",
    categoryName: "Background Art",
    tags: ["Clip Studio Paint", "Background Scenery", "Fantasy Environment", "Key Visual"],
    year: "2026",
    client: "Skyline Echoes Project",
    role: ["Landscape Painting", "Matte Painting", "Color Grading"],
    description:
      "A breathtaking rooftop panorama overlooking a bustling Tokyo-inspired anime cityscape bathed in purple sunset hues and glowing high-rise building lights.",
    conceptStory:
      "Focuses on atmospheric depth and color temperature transitions from deep magenta clouds to warm street lamp glows, rendered with painterly textures.",
    coverImage: "/images/ayamu-hamiru.jpg",
    aspectRatio: "landscape",
    gallery: [
      {
        type: "image",
        url: "/images/ayamu-hamiru.jpg",
        caption: "City vista at dusk with volumetric lighting.",
      },
    ],
    tools: ["Clip Studio Paint", "Photoshop"],
    isFeatured: false,
    order: 12,
    status: "published",
    views: 128,
    likes: 21,
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
  },

  // 7. Category: Concept Art
  {
    id: "clhart13000000000000000013",
    slug: "feather-crest-sacred-relic-blade",
    title: "Feather Crest: Sacred Relic Blade",
    subtitle: "Fantasy Anime Weapon & Prop Concept Sheet",
    category: "concept-art",
    categoryName: "Concept Art",
    tags: ["Clip Studio Paint", "Photoshop", "Concept Art", "Character Design"],
    year: "2026",
    client: "Chronicle of Aetheria RPG",
    role: ["Weapon Concept", "Material Callouts", "Visual FX Design"],
    description:
      "A detailed conceptual prop sheet of Ayamu's mythical golden rapier featuring a stylized rooster crest guard, glowing amber gem core, and ornate scabbard runes.",
    conceptStory:
      "Includes material callouts for polished brass, iridescent wing-hilt engraving, and elemental energy trail VFX for action illustration keyframes.",
    coverImage: "/images/ayamu-hamiru.jpg",
    aspectRatio: "portrait",
    gallery: [
      {
        type: "image",
        url: "/images/ayamu-hamiru.jpg",
        caption: "Detailed weapon orthographics and energy effects.",
      },
    ],
    beforeAfter: {
      beforeImage: "/images/ayamu-hamiru.jpg",
      beforeLabel: "Rough Silhouette & Line Sketch",
      afterImage: "/images/ayamu-hamiru.jpg",
      afterLabel: "Final Rendered Relic Prop",
    },
    tools: ["Clip Studio Paint", "Photoshop"],
    isFeatured: true,
    order: 13,
    status: "published",
    views: 136,
    likes: 23,
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
  },
  {
    id: "clhart14000000000000000014",
    slug: "cloud-canopy-sanctuary-worldbuilding",
    title: "The Cloud Canopy Sanctuary",
    subtitle: "Fantasy Worldbuilding & Environmental Architecture Concept",
    category: "concept-art",
    categoryName: "Concept Art",
    tags: ["Clip Studio Paint", "Concept Art", "Fantasy Environment", "Background Scenery"],
    year: "2026",
    client: "Ayamu Labs Lore Vault",
    role: ["Worldbuilding Concept", "Architectural Ideation", "Mood Painting"],
    description:
      "An expansive world concept piece depicting floating solar-powered greenhouses and avian observation towers linked by wooden suspension skywalks.",
    conceptStory:
      "Developed during the studio lore expansion phase to establish the architectural aesthetic of Ayamu's home sanctuary, balancing solarpunk warmth with anime whimsy.",
    coverImage: "/images/ayamu-hamiru.jpg",
    aspectRatio: "landscape",
    gallery: [
      {
        type: "image",
        url: "/images/ayamu-hamiru.jpg",
        caption: "Architectural overview sketch & color key.",
      },
    ],
    tools: ["Clip Studio Paint"],
    isFeatured: false,
    order: 14,
    status: "published",
    views: 92,
    likes: 15,
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
  },

  // 8. Category: YCH
  {
    id: "clhart15000000000000000015",
    slug: "ych-oversized-hoodie-slumber",
    title: "YCH: Oversized Hoodie Slumber Party",
    subtitle: "Customizable Character Pose Preset & Seasonal Palette Template",
    category: "ych",
    categoryName: "YCH",
    tags: ["Clip Studio Paint", "YCH", "Cel-Shading", "Anime Pop"],
    year: "2026",
    client: "Commission Template",
    role: ["YCH Base Line Art", "Shading Mask Setup", "Template Layout"],
    description:
      "A high-demand customizable commission template where clients can have their original VTuber or anime character drawn curled up in an oversized chick hoodie hugging a giant pillow.",
    conceptStory:
      "Features pre-rendered lighting layers and flexible line-art guides in Clip Studio Paint, enabling fast 3-5 day turnaround times for custom client commissions on VGen.",
    coverImage: "/images/ayamu-hamiru.jpg",
    aspectRatio: "square",
    gallery: [
      {
        type: "image",
        url: "/images/ayamu-hamiru.jpg",
        caption: "YCH base pose line art & color options.",
      },
    ],
    beforeAfter: {
      beforeImage: "/images/ayamu-hamiru.jpg",
      beforeLabel: "Base YCH Pose Blueprint",
      afterImage: "/images/ayamu-hamiru.jpg",
      afterLabel: "Completed Client Commission",
    },
    tools: ["Clip Studio Paint"],
    isFeatured: true,
    order: 15,
    status: "published",
    views: 175,
    likes: 30,
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
  },
  {
    id: "clhart16000000000000000016",
    slug: "ych-matsuri-fireworks-sparklers",
    title: "YCH: Matsuri Fireworks & Sparklers",
    subtitle: "Yukata Seasonal Art Preset with Dynamic Night Lighting",
    category: "ych",
    categoryName: "YCH",
    tags: ["Clip Studio Paint", "YCH", "Cel-Shading", "Anime Pop"],
    year: "2026",
    client: "Commission Template",
    role: ["Seasonal Preset", "Atmospheric Lighting Setup"],
    description:
      "A festive night-market YCH template with characters holding handheld sparklers against a backdrop of distant festival lanterns and summer fireworks.",
    conceptStory:
      "Pre-configured with warm rim lighting masks and glowing particle assets to deliver premium celebration illustrations for streamer anniversaries.",
    coverImage: "/images/ayamu-hamiru.jpg",
    aspectRatio: "portrait",
    gallery: [
      {
        type: "image",
        url: "/images/ayamu-hamiru.jpg",
        caption: "Yukata festival YCH sample render.",
      },
    ],
    tools: ["Clip Studio Paint", "Photoshop"],
    isFeatured: false,
    order: 16,
    status: "published",
    views: 120,
    likes: 18,
    vgenUrl: "https://vgen.co/ayamulabs",
    fiverrUrl: "https://www.fiverr.com/ayamulabs",
  },
];

/**
 * Returns categories with their counts computed dynamically from the portfolio array.
 */
export function getCategoriesWithCounts(
  categories: Category[] = INITIAL_CATEGORIES,
  portfolio: PortfolioItem[] = INITIAL_PORTFOLIO
): Category[] {
  return categories.map((cat) => ({
    ...cat,
    count: portfolio.filter(
      (item) => item.category === cat.slug && item.status === "published"
    ).length,
  }));
}

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "clhteam0100000000000000001",
    name: "Ayam 1",
    nickname: "Ayam 1",
    role: "Founder & Creative Director",
    bio: "The visionary spark and idea originator of Ayamu Labs. Formulates thematic concepts, worldbuilding narratives, and artistic direction behind every studio project.",
    avatar: "/images/ayamu-hamiru.jpg",
    specialties: ["Concept Ideation", "Creative Direction", "Worldbuilding", "Storyboarding"],
    socials: {},
  },
  {
    id: "clhteam0200000000000000002",
    name: "Ayam 2",
    nickname: "Ayam 2",
    role: "Art Lead & Principal Illustrator",
    bio: "The master visual craftsman behind our signature aesthetic. Specializes in advanced Clip Studio Paint rendering, character splash art, and line art perfection.",
    avatar: "/images/ayamu-hamiru.jpg",
    specialties: ["Clip Studio Paint", "Splash Art", "Character Turnarounds", "Digital Painting"],
    socials: {},
  },
  {
    id: "clhteam0300000000000000003",
    name: "Ayam 3",
    nickname: "Ayam 3",
    role: "Studio Admin & Client Relations",
    bio: "The core facilitator of studio client outreach and relations. Manages commission pipelines, client inquiries, order workflows on VGen & Fiverr, and delivery schedules.",
    avatar: "/images/ayamu-hamiru.jpg",
    specialties: ["Client Outreach", "Commission Pipeline", "VGen / Fiverr Ops", "Community Management"],
    socials: {},
  },
  {
    id: "clhteam0400000000000000004",
    name: "Ayam 4",
    nickname: "Ayam 4",
    role: "Lead Software Engineer",
    bio: "Architect of the Ayamu Labs web platform, studio admin, and digital infrastructure. Develops high-performance web apps, tooling, and seamless creator experiences.",
    avatar: "/images/ayamu-hamiru.jpg",
    specialties: ["Full-Stack Engineering", "Next.js & TypeScript", "Studio Admin", "Web Performance"],
    socials: {},
  },
];

export const INITIAL_STUDIO_OFFERINGS: StudioOffering[] = [
  {
    id: "clhoff01000000000000000001",
    title: "Digital Illustration & Splash Art",
    description:
      "High-resolution key visuals, light novel cover art, and vibrant pop-art character posters crafted with signature stylized lighting.",
    iconName: "Palette",
    badge: "High Demand",
  },
  {
    id: "clhoff02000000000000000002",
    title: "Original Character Design & Turnarounds",
    description:
      "Comprehensive model sheets, front/side/back orthographic views, expression sheets, and detailed costume design for VTubers and games.",
    iconName: "Layers",
    badge: "Core Service",
  },
  {
    id: "clhoff03000000000000000003",
    title: "Chibi Art & Character Illustrations",
    description:
      "Ultra-cute 2-head ratio chibi characters, merchandise-ready vector art, sticker packs, and enamel pin designs.",
    iconName: "Smile",
    badge: "Fan Favorite",
  },
  {
    id: "clhoff04000000000000000004",
    title: "Twitch / Discord Emotes & Sub Badges",
    description:
      "Pixel-sharp emotes formatted for 28px, 56px, 112px, custom bit tier badges, and animated stickers with maximum chat readability.",
    iconName: "MessageSquare",
    badge: "Streamers",
  },
  {
    id: "clhoff05000000000000000005",
    title: "Anime Backgrounds & Environment Art",
    description:
      "Atmospheric fantasy scenery, sunlit anime interiors, room stream overlays, and cinematic vistas with painterly light rendering.",
    iconName: "ImageIcon",
    badge: "World Building",
  },
  {
    id: "clhoff06000000000000000006",
    title: "Streamer Typography & Logos",
    description:
      "Stylized Japanese/English typography, VTuber watermarks, channel headers, and custom title graphics for streaming brands.",
    iconName: "Type",
    badge: "Branding",
  },
];

export const INITIAL_WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    title: "Inquiry & Booking",
    description:
      "Select your desired commission tier on VGen or Fiverr. Share references, character sheets, and project expectations.",
  },
  {
    step: "02",
    title: "Rough Concept & Posing",
    description:
      "We deliver composition thumbnails and rough sketches within 48–72 hours for pose, framing, and expression approval.",
  },
  {
    step: "03",
    title: "Line Art & Flat Colors",
    description:
      "Once the rough sketch is confirmed, we refine the linework in Clip Studio Paint and apply flat color palettes for base approval.",
  },
  {
    step: "04",
    title: "Full Shading & Delivery",
    description:
      "We add signature lighting, cel-shading, and post-processing, delivering full-res lossless PNG/PSD files ready for commercial use.",
  },
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: "clhfaq01000000000000000001",
    question: "Where should I place my official art commission?",
    answer:
      "To ensure maximum client safety, official payment escrow, and transparent queue tracking, all studio commissions are processed exclusively through our official VGen and Fiverr profiles.",
  },
  {
    id: "clhfaq02000000000000000002",
    question: "What software does the studio primarily use?",
    answer:
      "Our primary creative workstation software is Clip Studio Paint for digital illustration, line art, and color rendering, supplemented with Adobe Photoshop for final post-processing and mastering.",
  },
  {
    id: "clhfaq03000000000000000003",
    question: "Do your commissions include commercial rights?",
    answer:
      "Yes! Commercial use licenses for streaming, VTuber merchandise, game assets, and promotional materials are available across our VGen and Fiverr commission packages.",
  },
  {
    id: "clhfaq04000000000000000004",
    question: "What is the typical turnaround time for a project?",
    answer:
      "Turnaround times range from 5–10 days for Twitch emote sets, 10–14 days for splash illustrations and character design sheets, and 2–3 weeks for complex background scenes.",
  },
];

export const INITIAL_CHARACTER_PHILOSOPHY: CharacterPhilosophyItem[] = [
  {
    title: "The Yellow Chick Kigurumi Hoodie",
    description: "A symbol of infinite warmth, radiant optimism, and unyielding creative energy.",
  },
  {
    title: "The Cuddly White Chick Companion",
    description: "Represents raw imaginative ideas nurtured with care until ready to hatch into masterpieces.",
  },
  {
    title: "Crisp Cel-Shading & Pop Accents",
    description: "Contemporary styling blending classic anime linework with clean digital coloring in Clip Studio Paint.",
  },
];
