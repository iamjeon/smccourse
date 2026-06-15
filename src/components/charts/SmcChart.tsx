"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import type { ChartSpec } from "@/content/schema";
import { t } from "@/content/schema";
import { useLocale } from "@/components/locale-provider";
import { cn } from "@/lib/utils";
import {
  PAD,
  boxTone,
  computeLayout,
  markerLabel,
  toneColor,
  visibleAt,
} from "./chartMath";

/**
 * Interactive, animated SMC chart. Renders idealized candlesticks plus SMC
 * annotations (order blocks, FVG, liquidity, BOS/MSS, entries, AMD labels). When the
 * spec has `steps`, it becomes a play / step-through explainer that reveals the concept
 * beat by beat. Fully bilingual and reduced-motion aware.
 */
export function SmcChart({ spec }: { spec: ChartSpec }) {
  const { locale } = useLocale();
  const reduce = useReducedMotion();
  const W = 820;
  const layout = useMemo(() => computeLayout(spec, W), [spec]);
  const { x, y, candleWidth, width, height } = layout;

  const hasSteps = !!spec.steps && spec.steps.length > 1;
  const stepCount = spec.steps?.length ?? 1;
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance while playing.
  useEffect(() => {
    if (!playing) return;
    if (step >= stepCount - 1) {
      setPlaying(false);
      return;
    }
    timer.current = setTimeout(() => setStep((s) => s + 1), 1900);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [playing, step, stepCount]);

  const revealCandles = spec.steps
    ? spec.steps[step].revealCandles
    : spec.candles.length;
  const caption = spec.steps?.[step]?.caption ?? spec.caption;

  const dur = reduce ? 0 : 0.45;

  // Horizontal gridlines (subtle).
  const gridYs = [0.25, 0.5, 0.75].map(
    (f) => PAD.top + f * (height - PAD.top - PAD.bottom),
  );

  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-border bg-card">
      {spec.title && (
        <figcaption className="border-b border-border px-4 py-2.5 text-sm font-medium text-foreground">
          {t(spec.title, locale)}
        </figcaption>
      )}

      <div className="bg-[#0c1018] p-2 sm:p-3">
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
              opacity={0.4}
            />
          ))}

          {/* boxes (behind candles) */}
          {(spec.annotations ?? [])
            .filter((a) => a.type === "box" && visibleAt(a, step))
            .map((a, i) => {
              if (a.type !== "box") return null;
              const tone = boxTone(a.kind, a.tone);
              const color = toneColor(tone);
              const left = x(a.from) - candleWidth / 2 - 2;
              const right = a.extend
                ? width - PAD.right
                : x(a.to) + candleWidth / 2 + 2;
              const top = y(a.top);
              const bottom = y(a.bottom);
              return (
                <motion.g
                  key={`box-${a.id ?? i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: dur }}
                >
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
                    >
                      {t(a.label, locale)}
                    </text>
                  )}
                </motion.g>
              );
            })}

          {/* paths (idealized price delivery) */}
          {(spec.annotations ?? [])
            .filter((a) => a.type === "path" && visibleAt(a, step))
            .map((a, i) => {
              if (a.type !== "path") return null;
              const color = toneColor(a.tone, "var(--primary)");
              const d = a.points
                .map(
                  (p, idx) =>
                    `${idx === 0 ? "M" : "L"} ${x(p.index)} ${y(p.price)}`,
                )
                .join(" ");
              return (
                <motion.path
                  key={`path-${a.id ?? i}`}
                  d={d}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  strokeDasharray={a.dashed ? "5 4" : undefined}
                  initial={{ pathLength: reduce ? 1 : 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ duration: reduce ? 0 : 0.8 }}
                />
              );
            })}

          {/* horizontal lines (liquidity / levels) */}
          {(spec.annotations ?? [])
            .filter((a) => a.type === "line" && visibleAt(a, step))
            .map((a, i) => {
              if (a.type !== "line") return null;
              const color = toneColor(
                a.tone ?? (a.kind === "liquidity" ? "gold" : "neutral"),
              );
              const x1 = a.from != null ? x(a.from) : PAD.left;
              const x2 = a.to != null ? x(a.to) : width - PAD.right;
              const yy = y(a.price);
              return (
                <motion.g
                  key={`line-${a.id ?? i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: dur }}
                >
                  <line
                    x1={x1}
                    x2={x2}
                    y1={yy}
                    y2={yy}
                    stroke={color}
                    strokeWidth={1.5}
                    strokeDasharray={a.dashed ?? true ? "6 4" : undefined}
                  />
                  {a.label && (
                    <text
                      x={x2 + 4}
                      y={yy + 3.5}
                      fontSize={10.5}
                      fontWeight={600}
                      fill={color}
                    >
                      {t(a.label, locale)}
                    </text>
                  )}
                </motion.g>
              );
            })}

          {/* candles */}
          {spec.candles.slice(0, revealCandles).map((c, i) => {
            const bull = c.c >= c.o;
            const color = bull ? "var(--bull)" : "var(--bear)";
            const bodyTop = y(Math.max(c.o, c.c));
            const bodyH = Math.max(1.5, Math.abs(y(c.o) - y(c.c)));
            return (
              <motion.g
                key={`c-${i}`}
                initial={{ opacity: 0, scaleY: reduce ? 1 : 0.4 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: reduce ? 0 : 0.3 }}
                style={{ transformOrigin: `${x(i)}px ${y(c.l)}px` }}
              >
                <line
                  x1={x(i)}
                  x2={x(i)}
                  y1={y(c.h)}
                  y2={y(c.l)}
                  stroke={color}
                  strokeWidth={1.4}
                />
                <rect
                  x={x(i) - candleWidth / 2}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyH}
                  fill={color}
                  rx={1}
                />
              </motion.g>
            );
          })}

          {/* markers + text labels (on top) */}
          {(spec.annotations ?? [])
            .filter(
              (a) =>
                (a.type === "marker" || a.type === "label") && visibleAt(a, step),
            )
            .map((a, i) => {
              if (a.type === "marker") {
                const defaultTone =
                  a.kind === "sl"
                    ? "bear"
                    : a.kind === "tp"
                      ? "bull"
                      : a.kind === "mss" || a.kind === "sweep"
                        ? "gold"
                        : "neutral";
                const color = toneColor(a.tone ?? defaultTone, "var(--primary)");
                const label = a.label
                  ? t(a.label, locale)
                  : markerLabel[a.kind] ?? "";
                return (
                  <motion.g
                    key={`m-${a.id ?? i}`}
                    initial={{ opacity: 0, scale: reduce ? 1 : 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: dur }}
                  >
                    <circle cx={x(a.index)} cy={y(a.price)} r={3.2} fill={color} />
                    {label && (
                      <text
                        x={x(a.index) + 6}
                        y={y(a.price) + 3.5}
                        fontSize={10.5}
                        fontWeight={700}
                        fill={color}
                      >
                        {label}
                      </text>
                    )}
                  </motion.g>
                );
              }
              if (a.type === "label") {
                const color = toneColor(a.tone, "var(--foreground)");
                return (
                  <motion.text
                    key={`l-${a.id ?? i}`}
                    x={x(a.index)}
                    y={y(a.price)}
                    fontSize={11}
                    fontWeight={600}
                    fill={color}
                    textAnchor="middle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: dur }}
                  >
                    {t(a.text, locale)}
                  </motion.text>
                );
              }
              return null;
            })}
        </svg>
      </div>

      {/* caption + step controls */}
      {(caption || hasSteps) && (
        <div className="flex flex-col gap-2 border-t border-border px-4 py-3">
          {caption && (
            <p className="text-sm text-muted-foreground">{t(caption, locale)}</p>
          )}
          {hasSteps && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (step >= stepCount - 1) {
                    setStep(0);
                    setPlaying(true);
                  } else setPlaying((p) => !p);
                }}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                aria-label={playing ? "Pause" : "Play"}
              >
                {step >= stepCount - 1 ? (
                  <RotateCcw className="size-4" />
                ) : playing ? (
                  <Pause className="size-4" />
                ) : (
                  <Play className="size-4" />
                )}
                {step >= stepCount - 1 ? "Replay" : playing ? "Pause" : "Play"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setStep((s) => Math.max(0, s - 1));
                }}
                disabled={step === 0}
                className="rounded-md border border-border p-1.5 text-muted-foreground disabled:opacity-40"
                aria-label="Previous step"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setStep((s) => Math.min(stepCount - 1, s + 1));
                }}
                disabled={step >= stepCount - 1}
                className="rounded-md border border-border p-1.5 text-muted-foreground disabled:opacity-40"
                aria-label="Next step"
              >
                <ChevronRight className="size-4" />
              </button>
              <div className="ml-1 flex flex-1 items-center gap-1">
                {Array.from({ length: stepCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setPlaying(false);
                      setStep(i);
                    }}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors",
                      i <= step ? "bg-primary" : "bg-border",
                    )}
                    aria-label={`Go to step ${i + 1}`}
                  />
                ))}
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {step + 1}/{stepCount}
              </span>
            </div>
          )}
        </div>
      )}
    </figure>
  );
}
