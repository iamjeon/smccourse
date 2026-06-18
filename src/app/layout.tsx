import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { brand } from "@/lib/brand";
import { siteUrl } from "@/lib/supabase/env";
import { LocaleProvider } from "@/components/locale-provider";
import { ThemeProvider, themeScript } from "@/components/theme-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { Toaster } from "sonner";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} · ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.name,
  metadataBase: new URL(siteUrl),
  keywords: [
    "Smart Money Concepts",
    "SMC",
    "learn Smart Money Concepts free",
    "free SMC course",
    "free trading course",
    "order block",
    "fair value gap",
    "liquidity",
    "market structure",
    "ICT concepts",
    "Taglish trading course",
  ],
  icons: {
    icon: "/icon.svg",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: `${brand.name} · ${brand.tagline}`,
    description: brand.description,
    images: [{ url: "/logo.png", width: 640, height: 128, alt: brand.name }],
  },
  twitter: {
    card: "summary",
    title: `${brand.name} · ${brand.tagline}`,
    description: brand.description,
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} font-sans min-h-dvh`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: brand.name,
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              description: brand.description,
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: brand.name,
              url: siteUrl,
              description: brand.description,
              inLanguage: ["en", "tl"],
            },
          ]}
        />
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "!bg-card !text-card-foreground !border-border",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
