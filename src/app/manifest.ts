import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ayamu Labs - Creative Studio",
    short_name: "Ayamu Labs",
    description: "Official anime illustration & creative character design studio portfolio.",
    start_url: "/",
    display: "standalone",
    background_color: "#090a0f",
    theme_color: "#fbbf24",
    icons: [
      {
        src: "/images/ayamu-hamiru.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/images/ayamu-hamiru.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
