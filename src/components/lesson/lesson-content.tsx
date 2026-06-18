"use client";

import { Lightbulb, AlertTriangle, KeyRound, ImageIcon } from "lucide-react";
import type { Block } from "@/content/schema";
import { t } from "@/content/schema";
import { useLocale } from "@/components/locale-provider";
import { SmcChart, GuidedChart } from "@/components/charts/SmcChart";
import { cn } from "@/lib/utils";

const calloutStyles = {
  tip: {
    icon: Lightbulb,
    cls: "border-primary/30 bg-primary/5",
    iconCls: "text-primary",
    iconBg: "bg-primary/10",
  },
  warning: {
    icon: AlertTriangle,
    cls: "border-destructive/30 bg-destructive/5",
    iconCls: "text-destructive",
    iconBg: "bg-destructive/10",
  },
  key: {
    icon: KeyRound,
    cls: "border-gold/30 bg-gold/5 shadow-sm shadow-gold/5",
    iconCls: "text-gold",
    iconBg: "bg-gold/10",
  },
} as const;

export function LessonContent({ blocks }: { blocks: Block[] }) {
  const { locale } = useLocale();

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "heading": {
            const Tag = block.level === 3 ? "h3" : "h2";
            return (
              <Tag
                key={i}
                className={cn(
                  "scroll-mt-20 font-display font-semibold tracking-tight text-foreground",
                  block.level === 3 ? "text-lg mt-6" : "text-2xl mt-8",
                )}
              >
                {t(block.text, locale)}
              </Tag>
            );
          }
          case "paragraph":
            return (
              <p key={i} className="leading-relaxed text-foreground/95">
                {t(block.text, locale)}
              </p>
            );
          case "list":
            return block.ordered ? (
              <ol
                key={i}
                className="list-decimal space-y-1.5 pl-5 leading-relaxed text-foreground/95 marker:text-primary"
              >
                {block.items.map((it, j) => (
                  <li key={j}>{t(it, locale)}</li>
                ))}
              </ol>
            ) : (
              <ul
                key={i}
                className="list-disc space-y-1.5 pl-5 leading-relaxed text-foreground/95 marker:text-primary"
              >
                {block.items.map((it, j) => (
                  <li key={j}>{t(it, locale)}</li>
                ))}
              </ul>
            );
          case "callout": {
            const s = calloutStyles[block.tone];
            const Icon = s.icon;
            return (
              <div
                key={i}
                className={cn("rounded-lg border p-4", s.cls)}
                role="note"
              >
                <div className="flex gap-3">
                  <div className={cn("mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md", s.iconBg)}>
                    <Icon className={cn("size-4", s.iconCls)} />
                  </div>
                  <div>
                    {block.title && (
                      <p className="mb-1 font-semibold text-foreground">
                        {t(block.title, locale)}
                      </p>
                    )}
                    <p className="leading-relaxed text-foreground/95">
                      {t(block.text, locale)}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
          case "chart":
            return block.spec.steps?.length ? (
              <GuidedChart key={i} spec={block.spec} />
            ) : (
              <SmcChart key={i} spec={block.spec} />
            );
          case "imageSlot":
            return (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground"
              >
                <ImageIcon className="mt-0.5 size-5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground/80">
                    {t(block.note, locale)}
                  </p>
                  {block.suggestedCapture && (
                    <p className="mt-1 text-xs">
                      Suggested screenshot: {block.suggestedCapture}
                    </p>
                  )}
                </div>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
