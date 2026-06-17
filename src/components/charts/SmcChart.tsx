"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import type { Annotation, ChartSpec } from "@/content/schema";
import { t } from "@/content/schema";
import { useLocale } from "@/components/locale-provider";
import { PAD, boxTone, computeLayout, markerLabel, toneColor } from "./chartMath";
import { cn } from "@/lib/utils";

const W = 820;

/**
 * The SVG body shared by the static chart and the guided (step-through) chart.
 * - `revealCandles` limits how many candles are drawn (axis stays fixed to the full spec).
 * - `activeStep` (when set) gates annotations by their `appearAtStep`: only those at or
 *   before the step show, earlier ones dim, and the one introduced this step pops.
 */
function ChartSvg({
  spec,
  revealCandles,
  activeStep,
}: {
  spec: ChartSpec;
  revealCandles?: number;
  activeStep?: number;
}) {
  const { locale } = useLocale();
  const layout = useMemo(() => computeLayout(spec, W), [spec]);
  const { x, y, candleWidth, width, height } = layout;
  const annotations = spec.annotations ?? [];
  const gridYs = [0.25, 0.5, 0.75].map(
    (f) => PAD.top + f * (height - PAD.top - PAD.bottom),
  );

  const reveal = revealCandles ?? spec.candles.length;
  const stepOf = (a: Annotation) => a.appearAtStep ?? 0;
  const visible = (a: Annotation) =>
    activeStep == null || stepOf(a) <= activeStep;
  const dimmed = (a: Annotation) =>
    activeStep != null && stepOf(a) < activeStep;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label={
        (spec.title ? t(spec.title, locale) + ". " : "") +
        (spec.caption ? t(spec.caption, locale) : "SMC concept chart")
      }
    >
      {/* gridlines */}
      {gridYs.map((gy, i) => (
        <line
          key={i}
          x1={PAD.left}
          x2={width - PAD.right}
          y1={gy}
          y2={gy}
          stroke="var(--border)"
          strokeWidth={1}
          opacity={0.5}
        />
      ))}

      {/* boxes (behind candles) */}
      {annotations.map((a, i) => {
        if (a.type !== "box" || !visible(a)) return null;
        const tone = boxTone(a.kind, a.tone);
        const color = toneColor(tone);
        const left = x(a.from) - candleWidth / 2 - 2;
        const right = a.extend ? width - PAD.right : x(a.to) + candleWidth / 2 + 2;
        const top = y(a.top);
        const bottom = y(a.bottom);
        return (
          <g key={`box-${a.id ?? i}`} opacity={dimmed(a) ? 0.4 : 1}>
            <rect
              x={left}
              y={top}
              width={Math.max(2, right - left)}
              height={Math.max(2, bottom - top)}
              fill={color}
              fillOpacity={0.14}
              stroke={color}
              strokeOpacity={0.6}
              strokeWidth={1}
              rx={2}
            />
            {a.label && (
              <text
                x={left + 5}
                y={top + 13}
                fontSize={11}
                fontWeight={600}
                fill={color}
                stroke="var(--chart-bg)"
                strokeWidth={3}
                paintOrder="stroke"
                strokeLinejoin="round"
              >
                {t(a.label, locale)}
              </text>
            )}
          </g>
        );
      })}

      {/* paths */}
      {annotations.map((a, i) => {
        if (a.type !== "path" || !visible(a)) return null;
        const color = toneColor(a.tone, "var(--primary)");
        const d = a.points
          .map((p, idx) => `${idx === 0 ? "M" : "L"} ${x(p.index)} ${y(p.price)}`)
          .join(" ");
        return (
          <path
            key={`path-${a.id ?? i}`}
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeOpacity={dimmed(a) ? 0.4 : 0.9}
            strokeDasharray={a.dashed ? "5 4" : undefined}
          />
        );
      })}

      {/* horizontal lines (liquidity / levels) */}
      {annotations.map((a, i) => {
        if (a.type !== "line" || !visible(a)) return null;
        const color = toneColor(
          a.tone ?? (a.kind === "liquidity" ? "gold" : "neutral"),
        );
        const x1 = a.from != null ? x(a.from) : PAD.left;
        const x2 = a.to != null ? x(a.to) : width - PAD.right;
        const yy = y(a.price);
        const centered = a.labelPlacement === "center";
        return (
          <g key={`line-${a.id ?? i}`} opacity={dimmed(a) ? 0.4 : 1}>
            <line
              x1={x1}
              x2={x2}
              y1={yy}
              y2={yy}
              stroke={color}
              strokeWidth={1.5}
              strokeDasharray={(a.dashed ?? true) ? "6 4" : undefined}
            />
            {a.label && (
              <text
                x={centered ? (x1 + x2) / 2 : x2 + 4}
                y={centered ? yy : yy + 3.5}
                fontSize={10.5}
                fontWeight={700}
                fill={color}
                textAnchor={centered ? "middle" : "start"}
                dominantBaseline={centered ? "central" : undefined}
                stroke="var(--chart-bg)"
                strokeWidth={centered ? 4 : 3}
                paintOrder="stroke"
                strokeLinejoin="round"
              >
                {t(a.label, locale)}
              </text>
            )}
          </g>
        );
      })}

      {/* candles (revealed up to `reveal`) */}
      {spec.candles.slice(0, reveal).map((c, i) => {
        const bull = c.c >= c.o;
        const color = bull ? "var(--bull)" : "var(--bear)";
        const bodyTop = y(Math.max(c.o, c.c));
        const bodyH = Math.max(1.5, Math.abs(y(c.o) - y(c.c)));
        return (
          <g key={`c-${i}`}>
            <line x1={x(i)} x2={x(i)} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth={1.4} />
            <rect
              x={x(i) - candleWidth / 2}
              y={bodyTop}
              width={candleWidth}
              height={bodyH}
              fill={color}
              rx={1}
            />
          </g>
        );
      })}

      {/* markers + text labels (on top) */}
      {annotations.map((a, i) => {
        if (a.type === "marker") {
          if (!visible(a)) return null;
          const defaultTone =
            a.kind === "sl"
              ? "bear"
              : a.kind === "tp"
                ? "bull"
                : a.kind === "mss" || a.kind === "sweep"
                  ? "gold"
                  : "neutral";
          const color = toneColor(a.tone ?? defaultTone, "var(--primary)");
          const label = a.label ? t(a.label, locale) : markerLabel[a.kind] ?? "";
          return (
            <g key={`m-${a.id ?? i}`} opacity={dimmed(a) ? 0.4 : 1}>
              <circle
                cx={x(a.index)}
                cy={y(a.price)}
                r={3.6}
                fill={color}
                stroke="var(--chart-bg)"
                strokeWidth={1.5}
              />
              {label && (
                <text
                  x={x(a.index) + 6}
                  y={y(a.price) + 3.5}
                  fontSize={10.5}
                  fontWeight={700}
                  fill={color}
                  stroke="var(--chart-bg)"
                  strokeWidth={3}
                  paintOrder="stroke"
                  strokeLinejoin="round"
                >
                  {label}
                </text>
              )}
            </g>
          );
        }
        if (a.type === "label") {
          if (!visible(a)) return null;
          const color = toneColor(a.tone, "var(--foreground)");
          return (
            <text
              key={`l-${a.id ?? i}`}
              x={x(a.index)}
              y={y(a.price)}
              fontSize={12}
              fontWeight={700}
              fill={color}
              textAnchor="middle"
              opacity={dimmed(a) ? 0.4 : 1}
              stroke="var(--chart-bg)"
              strokeWidth={3.5}
              paintOrder="stroke"
              strokeLinejoin="round"
            >
              {t(a.text, locale)}
            </text>
          );
        }
        return null;
      })}
    </svg>
  );
}

/** Plain, static SMC chart: renders everything at once. Used in quizzes and simple figures. */
export function SmcChart({ spec }: { spec: ChartSpec }) {
  const { locale } = useLocale();
  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-border bg-card">
      {spec.title && (
        <figcaption className="border-b border-border px-4 py-2.5 text-sm font-medium text-foreground">
          {t(spec.title, locale)}
        </figcaption>
      )}
      <div className="p-2 sm:p-3" style={{ background: "var(--chart-bg)" }}>
        <ChartSvg spec={spec} />
      </div>
      {spec.caption && (
        <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
          {t(spec.caption, locale)}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Guided, beginner-first chart: reveals the story one beat at a time. Each step shows a
 * plain-language explanation and highlights the concept being introduced, so a newbie can
 * see exactly which candles are which and why. Falls back to the static chart if no steps.
 */
export function GuidedChart({ spec }: { spec: ChartSpec }) {
  const { locale } = useLocale();
  const tl = locale === "tl";
  const steps = spec.steps ?? [];
  const [i, setI] = useState(0);

  if (!steps.length) return <SmcChart spec={spec} />;
  const idx = Math.min(i, steps.length - 1);
  const step = steps[idx];
  const last = idx === steps.length - 1;

  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-border bg-card shadow-card">
      {spec.title && (
        <figcaption className="border-b border-border px-4 py-2.5 text-sm font-medium text-foreground">
          {t(spec.title, locale)}
        </figcaption>
      )}

      <div className="p-2 sm:p-3" style={{ background: "var(--chart-bg)" }}>
        <ChartSvg spec={spec} revealCandles={step.revealCandles} activeStep={idx} />
      </div>

      {/* guided controls + plain-language explanation */}
      <div className="border-t border-border p-4">
        <div className="mb-2 flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground">
            {tl ? "Hakbang" : "Step"} {idx + 1}/{steps.length}
          </span>
          <div className="flex flex-1 gap-1">
            {steps.map((_, s) => (
              <span
                key={s}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  s <= idx ? "bg-primary" : "bg-border",
                )}
              />
            ))}
          </div>
        </div>

        <p className="leading-relaxed text-foreground/90">
          {t(step.caption, locale)}
        </p>

        {step.tip && (
          <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-gold/40 bg-gold/10 px-3 py-2.5">
            <Eye className="mt-0.5 size-4 shrink-0 text-gold" />
            <p className="text-sm leading-relaxed text-foreground/90">
              <span className="font-semibold text-gold">
                {tl ? "Paano makilala: " : "Spot it: "}
              </span>
              {t(step.tip, locale)}
            </p>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setI((v) => Math.max(0, v - 1))}
            disabled={idx === 0}
            className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
            {tl ? "Bumalik" : "Back"}
          </button>
          <button
            type="button"
            onClick={() => setI((v) => Math.min(steps.length - 1, v + 1))}
            disabled={last}
            className="inline-flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {last ? (tl ? "Tapos" : "Done") : tl ? "Susunod" : "Next"}
            {!last && <ChevronRight className="size-4" />}
          </button>
        </div>
      </div>

      {spec.caption && (
        <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
          {t(spec.caption, locale)}
        </figcaption>
      )}
    </figure>
  );
}
