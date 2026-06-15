import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * Brand mark: a price "leg" piercing a level line (a liquidity sweep), in the brand
 * accent. Pairs with the wordmark. See BRAND.md for the logo direction.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-6", className)}
      fill="none"
      aria-hidden="true"
    >
      {/* level line */}
      <line x1="2" y1="9" x2="22" y2="9" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* candle body */}
      <rect x="9.5" y="6" width="5" height="9" rx="1" fill="var(--primary)" />
      {/* wick piercing the level */}
      <line x1="12" y1="2.5" x2="12" y2="20" stroke="var(--primary)" strokeWidth="1.6" />
    </svg>
  );
}

export function Logo({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      {withText && (
        <span className="font-display text-lg font-bold tracking-tight">
          {brand.name}
        </span>
      )}
    </span>
  );
}
