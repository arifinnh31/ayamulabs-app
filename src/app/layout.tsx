import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CharacterEasterEgg } from "@/components/character/character-easter-egg";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { CustomCursor } from "@/components/ui/custom-cursor";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayamulabs.art"),
  title: {
    template: "%s | Ayamu Labs Creative Studio",
    default: "Ayamu Labs - Creative Studio",
  },
  description:
    "Official showcase portfolio of Ayamu Labs Creative Studio & signature character Ayamu Hamiru. Specializing in anime illustrations, character sheets, chibi emotes, and background art.",
  keywords: [
    "Ayamu Labs",
    "Ayamu Hamiru",
    "Clip Studio Paint",
    "Anime Art",
    "Character Design",
    "Chibi Art",
    "Anime Studio",
    "Twitch Emotes",
    "VGen Commission",
    "Fiverr Commission",
  ],
  authors: [{ name: "Ayamu Labs Studio" }],
  openGraph: {
    title: "Ayamu Labs - Creative Studio",
    description:
      "Where Imagination Hatches Into Immersive Visual Masterpieces. Made with ❤️ by Ayamu Labs.",
    url: "https://ayamulabs.art",
    siteName: "Ayamu Labs",
    images: [
      {
        url: "/images/ayamu-hamiru.jpg",
        width: 1200,
        height: 630,
        alt: "Ayamu Labs Studio Character - Ayamu Hamiru",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayamu Labs Creative Studio",
    description:
      "Where Imagination Hatches Into Immersive Visual Masterpieces. Order via VGen and Fiverr.",
    images: ["/images/ayamu-hamiru.jpg"],
    creator: "@ayamulabs",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.jpg", type: "image/jpeg", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/images/ayamu-hamiru.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://ayamulabs.art/#organization",
        name: "Ayamu Labs",
        url: "https://ayamulabs.art",
        logo: "https://ayamulabs.art/images/ayamu-hamiru.jpg",
        description:
          "Anime illustration, character design, and visual art creative studio.",
        sameAs: [
          "https://vgen.co/ayamulabs",
          "https://www.fiverr.com/ayamulabs",
          "https://discord.gg/ayamulabs",
          "https://x.com/ayamulabs",
          "https://artstation.com/ayamulabs",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://ayamulabs.art/#website",
        url: "https://ayamulabs.art",
        name: "Ayamu Labs",
        alternateName: ["Ayamu Labs", "Ayamu Labs Creative Studio"],
        publisher: {
          "@id": "https://ayamulabs.art/#organization",
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={jakartaSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-pop-dots antialiased selection:bg-amber-400 selection:text-zinc-950 relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <AmbientBackground />
            <CustomCursor />
            <Navbar />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
            <CharacterEasterEgg />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
