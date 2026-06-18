"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import {
  ArrowLeft,
  ExternalLink,
  NotebookPen,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/components/locale-provider";
import { getAllLessons, getLesson } from "@/content/course";
import { t } from "@/content/schema";
import {
  addJournalEntry,
  deleteJournalEntry,
  updateJournalEntry,
} from "@/app/journal-actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export type JournalEntry = {
  id: string;
  pair: string;
  direction: "long" | "short";
  setup: string | null;
  lesson_slug: string | null;
  entry: number | null;
  stop: number | null;
  target: number | null;
  rr: number | null;
  outcome: "win" | "loss" | "breakeven" | "open";
  notes: string | null;
  traded_at: string;
};

type Outcome = JournalEntry["outcome"];
type OutcomeFilter = "all" | Outcome;
type DirFilter = "all" | "long" | "short";

const outcomeBadge: Record<Outcome, "primary" | "destructive" | "outline" | "default"> = {
  win: "primary",
  loss: "destructive",
  breakeven: "outline",
  open: "default",
};

function numOrNull(v: string): number | null {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : null;
}

export function JournalView({ entries }: { entries: JournalEntry[] }) {
  const { locale } = useLocale();
  const tl = locale === "tl";
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const lessons = useMemo(() => getAllLessons(), []);

  // editing: null = closed, "new" = adding, entry = editing that row
  const [editing, setEditing] = useState<JournalEntry | "new" | null>(null);
  const [outcomeFilter, setOutcomeFilter] = useState<OutcomeFilter>("all");
  const [dirFilter, setDirFilter] = useState<DirFilter>("all");

  // form state
  const [pair, setPair] = useState("");
  const [direction, setDirection] = useState<"long" | "short">("long");
  const [setup, setSetup] = useState("");
  const [lessonSlug, setLessonSlug] = useState("");
  const [entry, setEntry] = useState("");
  const [stop, setStop] = useState("");
  const [target, setTarget] = useState("");
  const [outcome, setOutcome] = useState<Outcome>("open");
  const [notes, setNotes] = useState("");
  const [tradedAt, setTradedAt] = useState(() => new Date().toISOString().slice(0, 10));

  const stats = useMemo(() => {
    const closed = entries.filter((e) => e.outcome !== "open");
    const wins = closed.filter((e) => e.outcome === "win").length;
    const losses = closed.filter((e) => e.outcome === "loss").length;
    const rrs = entries.map((e) => e.rr).filter((v): v is number => v != null);
    const avgRR = rrs.length ? rrs.reduce((a, b) => a + b, 0) / rrs.length : NaN;
    const winRate = closed.length ? (wins / closed.length) * 100 : NaN;
    const netR = closed.reduce(
      (sum, e) => sum + (e.outcome === "win" ? (e.rr ?? 0) : e.outcome === "loss" ? -1 : 0),
      0,
    );
    return { total: entries.length, wins, losses, winRate, avgRR, netR };
  }, [entries]);

  const filtered = useMemo(
    () =>
      entries.filter(
        (e) =>
          (outcomeFilter === "all" || e.outcome === outcomeFilter) &&
          (dirFilter === "all" || e.direction === dirFilter),
      ),
    [entries, outcomeFilter, dirFilter],
  );

  function openNew() {
    setEditing("new");
    setPair("");
    setDirection("long");
    setSetup("");
    setLessonSlug("");
    setEntry("");
    setStop("");
    setTarget("");
    setOutcome("open");
    setNotes("");
    setTradedAt(new Date().toISOString().slice(0, 10));
  }

  function openEdit(e: JournalEntry) {
    setEditing(e);
    setPair(e.pair);
    setDirection(e.direction);
    setSetup(e.setup ?? "");
    setLessonSlug(e.lesson_slug ?? "");
    setEntry(e.entry?.toString() ?? "");
    setStop(e.stop?.toString() ?? "");
    setTarget(e.target?.toString() ?? "");
    setOutcome(e.outcome);
    setNotes(e.notes ?? "");
    setTradedAt(new Date(e.traded_at).toISOString().slice(0, 10));
  }

  function submit() {
    if (!pair.trim() || !editing) return;
    setError(null);
    const e = numOrNull(entry);
    const s = numOrNull(stop);
    const tp = numOrNull(target);
    let rr: number | null = null;
    if (e != null && s != null && tp != null && Math.abs(e - s) > 0) {
      rr = Math.round((Math.abs(tp - e) / Math.abs(e - s)) * 100) / 100;
    }
    const payload = {
      pair: pair.trim(),
      direction,
      setup: setup.trim() || null,
      lessonSlug: lessonSlug || null,
      entry: e,
      stop: s,
      target: tp,
      rr,
      outcome,
      notes: notes.trim() || null,
      tradedAt,
    };
    startTransition(async () => {
      const res =
        editing === "new"
          ? await addJournalEntry(payload)
          : await updateJournalEntry({ id: editing.id, ...payload });
      if (!res.ok) {
        setError(res.reason ?? "Could not save");
        toast.error(res.reason ?? "Could not save trade");
        return;
      }
      toast.success(editing === "new" ? "Trade logged" : "Trade updated");
      setEditing(null);
      router.refresh();
    });
  }

  function remove(id: string) {
    startTransition(async () => {
      const res = await deleteJournalEntry({ id });
      if (res.ok) toast.success("Trade deleted");
      else toast.error(res.reason ?? "Could not delete");
      router.refresh();
    });
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {tl ? "Mga tool" : "Tools"}
      </Link>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
            <NotebookPen className="size-6 text-primary" />
            {tl ? "Trading journal" : "Trading journal"}
          </h1>
          <p className="mt-1.5 text-muted-foreground">
            {tl
              ? "Itala ang bawat trade para makita ang pattern at win rate mo."
              : "Log every trade to see your patterns and win rate."}
          </p>
        </div>
        <Button onClick={() => (editing ? setEditing(null) : openNew())} className="shrink-0">
          {editing ? <X className="size-4" /> : <Plus className="size-4" />}
          {editing ? (tl ? "Isara" : "Close") : tl ? "Trade" : "Add trade"}
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: tl ? "Mga trade" : "Trades", value: `${stats.total}` },
          {
            label: tl ? "Win rate" : "Win rate",
            value: Number.isFinite(stats.winRate) ? `${Math.round(stats.winRate)}%` : "—",
          },
          {
            label: "Avg R:R",
            value: Number.isFinite(stats.avgRR) ? stats.avgRR.toFixed(2) : "—",
          },
          {
            label: "Net R",
            value: `${stats.netR > 0 ? "+" : ""}${stats.netR.toFixed(2)}`,
          },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="font-display text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Add / edit form */}
      {editing && (
        <div className="mt-4 rounded-xl border border-border bg-card p-4 shadow-card">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium">
                {tl ? "Pair / asset" : "Pair / asset"}
              </span>
              <Input value={pair} onChange={(e) => setPair(e.target.value)} placeholder="EURUSD, BTCUSD..." />
            </label>
            <div>
              <span className="mb-1 block text-sm font-medium">{tl ? "Direksyon" : "Direction"}</span>
              <div className="flex gap-2">
                {(["long", "short"] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDirection(d)}
                    className={cn(
                      "h-11 flex-1 rounded-md border text-sm font-medium capitalize transition-colors",
                      direction === d
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">
                {tl ? "Setup (hal. OB + FVG)" : "Setup (e.g. OB + FVG)"}
              </span>
              <Input value={setup} onChange={(e) => setSetup(e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">
                {tl ? "Konsepto / lesson" : "Concept / lesson"}
              </span>
              <select
                value={lessonSlug}
                onChange={(e) => setLessonSlug(e.target.value)}
                className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">{tl ? "— wala —" : "— none —"}</option>
                {lessons.map((l) => (
                  <option key={l.slug} value={l.slug}>
                    {t(l.title, locale)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">{tl ? "Entry" : "Entry"}</span>
              <Input type="number" inputMode="decimal" value={entry} onChange={(e) => setEntry(e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">{tl ? "Stop" : "Stop"}</span>
              <Input type="number" inputMode="decimal" value={stop} onChange={(e) => setStop(e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">{tl ? "Target" : "Target"}</span>
              <Input type="number" inputMode="decimal" value={target} onChange={(e) => setTarget(e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">{tl ? "Petsa" : "Date"}</span>
              <Input type="date" value={tradedAt} onChange={(e) => setTradedAt(e.target.value)} />
            </label>
            <div className="sm:col-span-2">
              <span className="mb-1 block text-sm font-medium">{tl ? "Resulta" : "Outcome"}</span>
              <div className="flex flex-wrap gap-2">
                {(["open", "win", "loss", "breakeven"] as const).map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setOutcome(o)}
                    className={cn(
                      "h-9 rounded-md border px-3 text-xs font-medium capitalize transition-colors",
                      outcome === o
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-sm font-medium">{tl ? "Notes" : "Notes"}</span>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
            </label>
          </div>
          {error && <p role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
          <div className="mt-3 flex justify-end">
            <Button onClick={submit} disabled={pending || !pair.trim()}>
              {editing === "new"
                ? tl
                  ? "I-save ang trade"
                  : "Save trade"
                : tl
                  ? "I-update"
                  : "Update trade"}
            </Button>
          </div>
        </div>
      )}

      {/* Filters */}
      {entries.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {(["all", "win", "loss", "breakeven", "open"] as const).map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setOutcomeFilter(o)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors",
                outcomeFilter === o
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {o === "all" ? (tl ? "Lahat" : "All") : o}
            </button>
          ))}
          <span className="mx-1 h-4 w-px bg-border" />
          {(["all", "long", "short"] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDirFilter(d)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors",
                dirFilter === d
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {d === "all" ? (tl ? "Lahat" : "All") : d}
            </button>
          ))}
        </div>
      )}

      {/* List */}
      <ul className="mt-3 space-y-2">
        {entries.length === 0 && (
          <li className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
            {tl ? "Wala pang trade na nakatala." : "No trades logged yet."}
          </li>
        )}
        {filtered.map((e) => {
          const lesson = e.lesson_slug ? getLesson(e.lesson_slug) : undefined;
          return (
            <li
              key={e.id}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-card"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display font-semibold">{e.pair}</span>
                  <Badge variant={e.direction === "long" ? "primary" : "outline"}>
                    {e.direction}
                  </Badge>
                  <Badge variant={outcomeBadge[e.outcome]}>{e.outcome}</Badge>
                  {e.rr != null && <span className="text-xs text-gold">R:R 1:{e.rr}</span>}
                  <span className="text-xs text-muted-foreground">
                    {new Date(e.traded_at).toLocaleDateString()}
                  </span>
                </div>
                {e.setup && <p className="mt-1 text-sm text-muted-foreground">{e.setup}</p>}
                {(e.entry != null || e.stop != null || e.target != null) && (
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {e.entry != null && `E ${e.entry}`}
                    {e.stop != null && `  SL ${e.stop}`}
                    {e.target != null && `  TP ${e.target}`}
                  </p>
                )}
                {e.notes && <p className="mt-1 text-sm">{e.notes}</p>}
                {lesson && (
                  <Link
                    href={`/learn/${lesson.slug}`}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    <ExternalLink className="size-3.5" />
                    {t(lesson.title, locale)}
                  </Link>
                )}
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label="Edit trade"
                  disabled={pending}
                  onClick={() => openEdit(e)}
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label="Delete trade"
                  disabled={pending}
                  onClick={() => remove(e.id)}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
