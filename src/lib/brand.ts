/**
 * Single source of truth for brand identity. Change the name/tagline here and it
 * updates everywhere. Color tokens live in src/app/globals.css (see BRAND.md).
 */
export const brand = {
  name: "SMC Course",
  shortName: "SMC",
  tagline: "Learn Smart Money Concepts for free.",
  description:
    "A free, self-paced Smart Money Concepts trading course. Modules, lessons, interactive charts, and quizzes, built for traders, by traders.",
  defaultLocale: "en" as const,
} as const;

export type Locale = "en" | "tl";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  tl: "Taglish",
};
