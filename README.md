# 🎨 Ayamu Labs — Creative Studio & Character Showcase Platform

<div align="center">

![Ayamu Labs Studio](public/images/ayamu-hamiru.jpg)

**Where Imagination Hatches Into Immersive Visual Masterpieces.**

[![Next.js](https://img.shields.io/badge/Next.js-16.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.19.3-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_%26_Auth-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

[Explore Portfolio](https://ayamulabs.art/portfolio) • [Order on VGen](https://vgen.co/ayamulabs) • [Order on Fiverr](https://www.fiverr.com/ayamulabs)

</div>

---

## 📖 Overview

**Ayamu Labs** is a premier digital art studio and character showcase web application. Built around our spirited studio mascot **Ayamu Hamiru** (who proudly rocks her signature yellow chick kigurumi hoodie), this platform serves as an interactive portfolio, commission gateway, and full-featured Content Management System (CMS) for showcasing digital anime illustrations, character turnaround sheets, chibi merchandise, emotes, and background scenery.

---

## ✨ Key Features

### 🌐 1. Public Experience (Showcase & Commissions)
- **Hero Masterpiece Showcase (`/`)**: Animated visual stage with auto-rotating masterpiece showcase, light/dark ambient glows, and quick commission CTAs.
- **Curated Masonry Gallery (`/portfolio`)**: Multi-aspect ratio portfolio grid (portrait, landscape, square) with real-time category filtering, keyword search, and layout mode switcher (masonry/grid).
- **Persistent Real-Time Likes**: Optimistic reactive liking with React `useSyncExternalStore`, localStorage persistence, and atomic database increments.
- **4K Media Inspector (Lightbox Modal)**: GeoGebra-style fixed-point cursor zoom with synchronous coordinate pinning, smooth physics spring animations, drag-to-pan, and automatic reset on close/escape.
- **Interactive Before/After Slider**: High-precision process comparison slider for examining rough sketches against final rendered artworks.
- **Character Lore & Studio Story (`/about`)**: Meet Ayamu Hamiru, explore the 3 pillars of studio philosophy, and discover the creative team roster.
- **Official Commission Hub (`/services`)**: Official commission portals via **VGen (Electric Lime `#A3FF00`)** and **Fiverr (Emerald Green `#1DBF73`)**, complete with service breakdown, 4-step workflow, and FAQs.
- **Circular Ripple Theme Switch**: Modern CSS View Transitions API circular reveal wave with 3D Framer Motion Sun/Moon morphing.
- **Dynamic Animated Studio Marquee**: Infinite smooth marquee with dedicated representative Lucide icons for each studio capability.
- **100% SEO Ready & Structured Data**: Dynamic `sitemap.ts`, `robots.ts`, `manifest.ts`, OpenGraph metadata, and Schema.org JSON-LD (`VisualArtwork`, `CollectionPage`, `AboutPage`, `FAQPage`, `Organization`, `WebSite`).

### 🛡️ 2. Studio Admin CMS (`/admin`)
- **Dashboard Analytics**: Real-time performance metrics (views, likes, published artwork count, storage health).
- **Artwork Vault Manager (`/admin/portfolio`)**: Full CRUD operations for portfolio items, drag-and-drop multi-asset media uploader, before/after comparison sliders, and taxonomy assignment.
- **Taxonomy Manager (`/admin/categories`)**: Create and organize artwork categories with customizable icons and instant tag management.
- **Studio Profile & Roster CMS (`/admin/profile`)**: Live customization of studio identity, commission URLs, social links, and team members with default `/images/ayamu-hamiru.jpg` avatars.
- **Security & Route Proxy**: Route protection using Next.js 16 `proxy.ts` backed by **Supabase Auth (`@supabase/ssr`)**.
- **Admin Logout Flow**: Clean session termination redirecting directly to Home (`/`).

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16.3.3](https://nextjs.org/) (App Router, Turbopack, Server Actions) |
| **UI Library** | [React 19.2.8](https://react.dev/) + [Framer Motion 13](https://www.framer.com/motion/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/) |
| **Database & ORM** | [Prisma ORM 6.19.3](https://www.prisma.io/) + [Supabase PostgreSQL](https://supabase.com/) |
| **Authentication** | [Supabase Auth SSR](https://supabase.com/docs/guides/auth/server-side/nextjs) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```text
ayamulabs-app/
├── prisma/
│   ├── schema.prisma          # Database schema (Artworks, Categories, Tags, Team, Profile)
│   └── seed.ts                # Production database seeder script
├── public/
│   └── images/                # Local brand assets & mascot portraits
│       ├── ayamu-hamiru.jpg   # Signature character asset & favicon
│       ├── vgen-icon.png      # Official VGen branding icon
│       ├── fiverr-icon.ico    # Official Fiverr branding icon
│       ├── x-icon.png         # Official X (Twitter) branding icon
│       ├── artstation-icon.ico# Official ArtStation branding icon
│       └── discord-icon.png   # Official Discord branding icon
├── src/
│   ├── actions/               # Next.js Server Actions (CRUD & business logic)
│   │   ├── auth.ts            # Supabase Auth login/logout
│   │   ├── categories.ts      # Category taxonomy actions
│   │   ├── portfolio.ts       # Artwork CRUD, likes, views & query actions
│   │   ├── profile.ts         # Studio identity & lore actions
│   │   ├── services.ts        # Service offerings & workflow queries
│   │   ├── tags.ts            # Tag management actions
│   │   ├── team.ts            # Team roster actions
│   │   └── upload.ts          # Media upload actions
│   ├── app/
│   │   ├── (home)/            # Isolated Home showcase route & skeleton
│   │   ├── about/             # Studio story & team roster
│   │   ├── admin/             # Protected CMS dashboard & managers
│   │   ├── api/og/            # Dynamic OpenGraph image generator
│   │   ├── portfolio/         # Gallery & dynamic [slug] detail pages
│   │   ├── services/          # Commission portals & workflow
│   │   ├── layout.tsx         # Root layout with navbar, footer, theme & JSON-LD
│   │   ├── sitemap.ts         # Dynamic search engine sitemap
│   │   ├── robots.ts          # Search engine crawler policies
│   │   ├── manifest.ts        # Progressive Web App (PWA) manifest
│   │   └── icon.jpg           # Official app favicon & touch icon
│   ├── components/            # Reusable UI, Layout, Admin & Portfolio components
│   │   ├── admin/             # CMS tables, uploaders, and forms
│   │   ├── character/         # Mascot avatars & easter eggs
│   │   ├── commission/        # VGen & Fiverr buttons and CTA banners
│   │   ├── icons/             # Local brand icons (VGen, Fiverr, X, ArtStation, Discord)
│   │   ├── layout/            # Navbar, footer, theme provider & toggle
│   │   ├── portfolio/         # Masonry grid, cards, lightbox & slider
│   │   └── ui/                # Base UI components & responsive toasts
│   ├── lib/
│   │   ├── mock-data.ts       # Initial seed data and TypeScript interfaces
│   │   ├── prisma.ts          # Global Prisma client singleton
│   │   ├── server-utils.ts    # Server cache revalidation helpers
│   │   ├── supabase/          # Supabase client, server & middleware helpers
│   │   └── utils.ts           # Client-safe UI styling & URL validation helpers
│   └── proxy.ts               # Next.js 16 route proxy & auth protection
└── next.config.ts             # Next.js configuration & image remote patterns
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v20.x or v24.x
- **npm** / **pnpm** / **yarn**
- A **Supabase PostgreSQL** project

### 2. Clone and Install Dependencies
```bash
git clone https://github.com/arifinnh31/ayamulabs-app.git
cd ayamulabs-app
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory by copying `.env.example`:
```bash
cp .env.example .env
```

Fill in your Supabase credentials in `.env`:
```env
# Supabase PostgreSQL Connection (Pooling & Direct)
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

# Supabase API Keys
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT_REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-public-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Public Site URL for SEO & OpenGraph
NEXT_PUBLIC_SITE_URL="https://ayamulabs.art"
```

### 4. Sync Database Schema & Seed Data
```bash
# Push Prisma schema to Supabase PostgreSQL
npx prisma db push

# Seed initial artworks, categories, tags, team members, and profile
npx tsx prisma/seed.ts
```

### 5. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment on Vercel

1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/) &rarr; **Add New Project** &rarr; Select `ayamulabs-app`.
3. Under **Project Settings &rarr; Environment Variables**, add your environment variables:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://ayamulabs.art`)
4. Click **Deploy**. Vercel will automatically run `prisma generate` via `postinstall` and compile the optimized production build.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local Turbopack development server on `http://localhost:3000`. |
| `npm run build` | Compiles an optimized production build of all static and dynamic routes. |
| `npm start` | Starts the Next.js production server. |
| `npm run lint` | Runs ESLint across all project files. |
| `npx prisma studio` | Opens interactive database browser at `http://localhost:5555`. |
| `npx prisma db push` | Synchronizes the Prisma schema with Supabase PostgreSQL without migrations. |

---

## 📄 License

This project is proprietary and crafted with ❤️ by **Ayamu Labs**. All artwork and character assets are property of Ayamu Labs.