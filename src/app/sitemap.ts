import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date("2026-08-22"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/privacy-policy`,
      lastModified: new Date("2026-08-22"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_CONFIG.url}/cookie-policy`,
      lastModified: new Date("2026-08-22"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
