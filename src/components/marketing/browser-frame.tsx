import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

/** A polished browser/app window mockup used to present the product in the hero. */
export function BrowserFrame({
  children,
  url = "smccourse.app",
  className,
}: {
  children: ReactNode;
  url?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-elevated",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-3.5 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-3 rounded-full bg-bear/70" />
          <span className="size-3 rounded-full bg-gold/70" />
          <span className="size-3 rounded-full bg-bull/70" />
        </span>
        <div className="ml-2 flex flex-1 items-center justify-center gap-1.5 rounded-md bg-background/70 px-3 py-1 text-xs text-muted-foreground">
          <Lock className="size-3" />
          {url}
        </div>
      </div>
      <div className="bg-background">{children}</div>
    </div>
  );
}
