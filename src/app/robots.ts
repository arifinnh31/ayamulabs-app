import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ayamulabs.art";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/portfolio", "/portfolio/*", "/services", "/about"],
        disallow: ["/admin", "/admin/*", "/login", "/api/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
