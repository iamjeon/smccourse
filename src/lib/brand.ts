/**
 * Single source of truth for brand identity. Change the name/tagline here and it
 * updates everywhere. Color tokens live in src/app/globals.css (see BRAND.md).
 *
 * Working name is "Liquidity Lab" — swap `name` once you pick a final name.
 * Name options proposed: Liquidity Lab · FlowState SMC · Smart Money Academy.
 */
export const brand = {
  name: "Liquidity Lab",
  shortName: "LiqLab",
  tagline: "Learn Smart Money Concepts for free.",
  description:
    "A free, self-paced Smart Money Concepts trading course. Modules, lessons, interactive charts, and quizzes, built for traders, by traders.",
  // Default learning locale shown before a user sets a preference.
  defaultLocale: "en" as const,
} as const;

export type Locale = "en" | "tl";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  tl: "Taglish",
};
