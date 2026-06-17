"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Calculator, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/components/locale-provider";
import { cn } from "@/lib/utils";

const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "PHP", symbol: "₱" },
  { code: "JPY", symbol: "¥" },
];

const RISK_PRESETS = ["0.5", "1", "2"];

function num(v: string): number {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : NaN;
}

function fmt(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <Input
        type="number"
        inputMode="decimal"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "primary" | "gold";
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div
        className={cn(
          "mt-1 font-mono text-lg font-semibold",
          accent === "primary" && "text-primary",
          accent === "gold" && "text-gold",
        )}
      >
        {value}
      </div>
    </div>
  );
}

/** Position-size + R:R calculator. Pure client-side math; nothing leaves the device. */
export function RiskCalculator() {
  const { locale } = useLocale();
  const tl = locale === "tl";

  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [riskPct, setRiskPct] = useState("1");
  const [entry, setEntry] = useState("");
  const [stop, setStop] = useState("");
  const [targets, setTargets] = useState<string[]>([""]);

  const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "$";
  const money = (n: number) => (Number.isFinite(n) ? `${symbol}${fmt(n)}` : "—");

  const r = useMemo(() => {
    const bal = num(balance);
    const pct = num(riskPct);
    const e = num(entry);
    const s = num(stop);

    const riskAmount =
      Number.isFinite(bal) && Number.isFinite(pct) ? (bal * pct) / 100 : NaN;
    const stopDist = Number.isFinite(e) && Number.isFinite(s) ? Math.abs(e - s) : NaN;
    const size = Number.isFinite(riskAmount) && stopDist > 0 ? riskAmount / stopDist : NaN;
    const notional = Number.isFinite(size) && Number.isFinite(e) ? size * e : NaN;
    const direction =
      Number.isFinite(e) && Number.isFinite(s)
        ? e > s
          ? "long"
          : e < s
            ? "short"
            : null
        : null;

    const tps = targets
      .map((tStr, i) => {
        const t = num(tStr);
        if (!Number.isFinite(t) || !Number.isFinite(e) || !(stopDist > 0)) return null;
        const valid =
          direction === "long" ? t > e : direction === "short" ? t < e : true;
        const rewardDist = Math.abs(t - e);
        return {
          i: i + 1,
          price: t,
          rr: rewardDist / stopDist,
          profit: Number.isFinite(size) ? size * rewardDist : NaN,
          valid,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    return { riskAmount, stopDist, size, notional, direction, tps, breakeven: e };
  }, [balance, riskPct, entry, stop, targets]);

  function setTarget(i: number, v: string) {
    setTargets((prev) => prev.map((t, idx) => (idx === i ? v : t)));
  }
  function addTarget() {
    setTargets((prev) => (prev.length < 3 ? [...prev, ""] : prev));
  }
  function removeTarget(i: number) {
    setTargets((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {tl ? "Mga tool" : "Tools"}
      </Link>

      <h1 className="mt-3 flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
        <Calculator className="size-6 text-primary" />
        {tl ? "Risk calculator" : "Risk calculator"}
      </h1>
      <p className="mt-1.5 text-muted-foreground">
        {tl
          ? "Alamin ang tamang laki ng posisyon para hindi lumampas sa risk mo bawat trade."
          : "Find the right position size so you never risk more than you planned per trade."}
      </p>

      {/* Inputs */}
      <div className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">
              {tl ? "Account balance" : "Account balance"}
            </span>
            <div className="flex gap-2">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                aria-label="Currency"
                className="h-11 rounded-md border border-border bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.symbol} {c.code}
                  </option>
                ))}
              </select>
              <Input
                type="number"
                inputMode="decimal"
                step="any"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="1000"
              />
            </div>
          </label>

          <div>
            <span className="mb-1 block text-sm font-medium">
              {tl ? "Risk bawat trade (%)" : "Risk per trade (%)"}
            </span>
            <div className="flex gap-2">
              {RISK_PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setRiskPct(p)}
                  className={cn(
                    "h-11 flex-1 rounded-md border text-sm font-medium transition-colors",
                    riskPct === p
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {p}%
                </button>
              ))}
              <Input
                type="number"
                inputMode="decimal"
                step="any"
                value={riskPct}
                onChange={(e) => setRiskPct(e.target.value)}
                className="w-20"
                aria-label="Custom risk percent"
              />
            </div>
          </div>

          <Field
            label={tl ? "Entry price" : "Entry price"}
            value={entry}
            onChange={setEntry}
            placeholder="100"
          />
          <Field
            label={tl ? "Stop loss price" : "Stop loss price"}
            value={stop}
            onChange={setStop}
            placeholder="98"
          />
        </div>

        {/* Targets */}
        <div>
          <span className="mb-1 block text-sm font-medium">
            {tl ? "Mga target" : "Targets"}
          </span>
          <div className="space-y-2">
            {targets.map((tval, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-10 shrink-0 text-xs text-muted-foreground">
                  TP{i + 1}
                </span>
                <Input
                  type="number"
                  inputMode="decimal"
                  step="any"
                  value={tval}
                  onChange={(e) => setTarget(i, e.target.value)}
                  placeholder={i === 0 ? "106" : ""}
                />
                {targets.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTarget(i)}
                    aria-label="Remove target"
                    className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:text-destructive"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
            ))}
            {targets.length < 3 && (
              <button
                type="button"
                onClick={addTarget}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary"
              >
                <Plus className="size-4" />
                {tl ? "Dagdag na target" : "Add target"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 rounded-xl border border-border bg-card/40 p-5 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">
            {tl ? "Resulta" : "Results"}
          </h2>
          {r.direction && (
            <Badge variant={r.direction === "long" ? "primary" : "outline"}>
              {r.direction === "long" ? "Long" : "Short"}
            </Badge>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat label={tl ? "Risk na halaga" : "Amount at risk"} value={money(r.riskAmount)} />
          <Stat label={tl ? "Layo ng stop" : "Stop distance"} value={fmt(r.stopDist, 4)} />
          <Stat
            label={tl ? "Laki (units)" : "Position size (units)"}
            value={fmt(r.size, 4)}
            accent="primary"
          />
          <Stat label={tl ? "Halaga ng posisyon" : "Position value"} value={money(r.notional)} />
          <Stat
            label={tl ? "Breakeven (SL→entry)" : "Breakeven (SL→entry)"}
            value={fmt(r.breakeven, 4)}
          />
        </div>

        {r.tps.length > 0 && (
          <div className="mt-4">
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {tl ? "Mga target" : "Targets"}
            </div>
            <div className="space-y-2">
              {r.tps.map((tp) => (
                <div
                  key={tp.i}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm"
                >
                  <span className="font-medium">TP{tp.i}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    @ {fmt(tp.price, 4)}
                  </span>
                  <span className="font-mono text-gold">1:{fmt(tp.rr)}</span>
                  <span className="font-mono">{money(tp.profit)}</span>
                  {!tp.valid && (
                    <span className="text-xs text-destructive">
                      {tl ? "maling panig" : "wrong side"}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="mt-4 text-xs text-muted-foreground">
          {tl
            ? "Para sa forex, i-adjust ayon sa pip value ng pair. Tool sa pag-aaral, hindi financial advice."
            : "For forex, adjust for the pair's pip value. A learning tool, not financial advice."}
        </p>
      </div>
    </div>
  );
}
