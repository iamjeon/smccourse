/**
 * Renders a JSON-LD <script> for structured data (SEO + GEO / AI-engine grounding).
 *
 * Safe under our strict CSP: script-src includes 'unsafe-inline', and ld+json
 * scripts are data, not executed. Keep every field FAITHFUL to visible content —
 * Google ignores (and can penalize) structured data that doesn't match the page.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
