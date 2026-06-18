import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/supabase/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Per-user / gated areas with no SEO value (they redirect to /login anyway).
        disallow: [
          "/dashboard",
          "/admin",
          "/api/",
          "/auth/",
          "/tools/journal",
          "/community",
          "/exam",
          "/certificate",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
