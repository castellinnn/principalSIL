import type { MetadataRoute } from "next";

const siteUrl = "https://principalsil.it";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-08-22"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date("2026-08-22"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteUrl}/cookie-policy`,
      lastModified: new Date("2026-08-22"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
