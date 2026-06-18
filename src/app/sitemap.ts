import type { MetadataRoute } from "next";
import { getAllLessons } from "@/content/course";
import { siteUrl } from "@/lib/supabase/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const lessons = getAllLessons();

  // Only publicly crawlable pages belong here. Gated, per-user pages (dashboard,
  // journal, community, exam, certificate, admin) are intentionally excluded.
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/academy`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/courses/smc`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/tools/glossary`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/tools/calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/login`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  const lessonPages: MetadataRoute.Sitemap = lessons.map((lesson) => ({
    url: `${siteUrl}/learn/${lesson.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...lessonPages];
}
