import type { MetadataRoute } from "next";
import { getAllLessons } from "@/content/course";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://smccourse.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lessons = getAllLessons();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/login`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const lessonPages: MetadataRoute.Sitemap = lessons.map((lesson) => ({
    url: `${siteUrl}/learn/${lesson.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...lessonPages];
}
