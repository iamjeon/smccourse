"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Eye,
  Loader2,
  Pencil,
  Plus,
  StickyNote,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/components/locale-provider";
import { getLesson } from "@/content/course";
import { t } from "@/content/schema";
import { toast } from "sonner";
import {
  createNote,
  deleteNote,
  saveNote,
  type NoteRow,
} from "@/app/notes-actions";

function lessonSlugFromPath(path: string): string | null {
  const m = path.match(/^\/learn\/([^/]+)/);
  return m ? m[1] : null;
}

function preview(content: string): string {
  const line = content
    .trim()
    .split("\n")
    .find((l) => l.trim().length > 0);
  return (line ?? "").replace(/^#{1,3}\s+|[-*]\s+/, "").slice(0, 60);
}

/** Minimal inline markdown: **bold**, *italic*, `code`. */
function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[2] != null) nodes.push(<strong key={key++}>{m[2]}</strong>);
    else if (m[3] != null) nodes.push(<em key={key++}>{m[3]}</em>);
    else if (m[4] != null)
      nodes.push(
        <code key={key++} className="rounded bg-secondary px-1 font-mono text-xs">
          {m[4]}
        </code>,
      );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** Light markdown block renderer (headings, bullet lists, paragraphs). */
function NoteMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];
  let key = 0;
  const flush = () => {
    if (bullets.length) {
      blocks.push(
        <ul key={key++} className="ml-4 list-disc space-y-0.5">
          {bullets.map((b, i) => (
            <li key={i}>{renderInline(b)}</li>
          ))}
        </ul>,
      );
      bullets = [];
    }
  };
  for (const line of lines) {
    if (/^\s*[-*]\s+/.test(line)) {
      bullets.push(line.replace(/^\s*[-*]\s+/, ""));
    } else {
      flush();
      if (/^#{1,3}\s+/.test(line)) {
        blocks.push(
          <p key={key++} className="font-display font-semibold">
            {renderInline(line.replace(/^#{1,3}\s+/, ""))}
          </p>,
        );
      } else if (line.trim() === "") {
        blocks.push(<div key={key++} className="h-2" />);
      } else {
        blocks.push(<p key={key++}>{renderInline(line)}</p>);
      }
    }
  }
  flush();
  return <div className="space-y-1 text-sm leading-relaxed">{blocks}</div>;
}

/** Private notes scratchpad with light markdown + lesson tagging. */
export function NotesPanel() {
  const { locale } = useLocale();
  const tl = locale === "tl";
  const pathname = usePathname();

  const [notes, setNotes] = useState<NoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [savingState, setSavingState] = useState<"idle" | "saving" | "saved">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      return;
    }
    let active = true;
    supabase
      .from("notes")
      .select("id,content,lesson_slug,updated_at,created_at")
      .order("updated_at", { ascending: false })
      .then(({ data }) => {
        if (!active) return;
        setNotes((data as NoteRow[]) ?? []);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const active = notes.find((n) => n.id === activeId) ?? null;

  const flushSave = useCallback((id: string, content: string) => {
    setSavingState("saving");
    saveNote({ id, content }).then((res) => {
      setSavingState(res.ok ? "saved" : "idle");
      setNotes((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, content, updated_at: new Date().toISOString() } : n,
        ),
      );
    });
  }, []);

  function onDraftChange(value: string) {
    setDraft(value);
    if (!activeId) return;
    setSavingState("saving");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => flushSave(activeId, value), 800);
  }

  async function onNew() {
    const res = await createNote({
      content: "",
      lessonSlug: lessonSlugFromPath(pathname),
    });
    if (!res.ok) return;
    setNotes((prev) => [res.note, ...prev]);
    setActiveId(res.note.id);
    setDraft(res.note.content);
    setMode("write");
    setSavingState("idle");
  }

  function openNote(n: NoteRow) {
    if (timer.current) clearTimeout(timer.current);
    setActiveId(n.id);
    setDraft(n.content);
    setMode("write");
    setSavingState("idle");
  }

  function back() {
    if (activeId) {
      if (timer.current) clearTimeout(timer.current);
      flushSave(activeId, draft);
    }
    setActiveId(null);
  }

  async function onDelete(id: string) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (activeId === id) setActiveId(null);
    const res = await deleteNote({ id });
    if (res.ok) toast.success("Note deleted");
    else toast.error("Could not delete note");
  }

  // ── Editor view ────────────────────────────────────────────────────────────
  if (active) {
    const lesson = active.lesson_slug ? getLesson(active.lesson_slug) : undefined;
    return (
      <div className="flex min-h-0 flex-1 flex-col p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <Button variant="ghost" size="sm" onClick={back}>
            <ArrowLeft className="size-4" />
            {tl ? "Mga note" : "All notes"}
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {savingState === "saving"
                ? tl
                  ? "Sine-save..."
                  : "Saving..."
                : savingState === "saved"
                  ? tl
                    ? "Na-save"
                    : "Saved"
                  : ""}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMode((m) => (m === "write" ? "preview" : "write"))}
            >
              {mode === "write" ? (
                <>
                  <Eye className="size-4" />
                  {tl ? "Preview" : "Preview"}
                </>
              ) : (
                <>
                  <Pencil className="size-4" />
                  {tl ? "I-edit" : "Write"}
                </>
              )}
            </Button>
          </div>
        </div>

        {lesson && (
          <Link
            href={`/learn/${lesson.slug}`}
            className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
          >
            <ExternalLink className="size-3.5" />
            {t(lesson.title, locale)}
          </Link>
        )}

        {mode === "write" ? (
          <Textarea
            autoFocus
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            placeholder={
              tl
                ? "Isulat ang note. Markdown: **bold**, *italic*, - bullet"
                : "Write your note. Markdown: **bold**, *italic*, - bullet"
            }
            className="min-h-0 flex-1 resize-none font-mono"
          />
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto rounded-md border border-border bg-background p-3">
            {draft.trim() ? (
              <NoteMarkdown text={draft} />
            ) : (
              <p className="text-sm text-muted-foreground">
                {tl ? "(walang laman)" : "(empty)"}
              </p>
            )}
          </div>
        )}

        <div className="mt-2 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(active.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="size-4" />
            {tl ? "Burahin" : "Delete"}
          </Button>
        </div>
      </div>
    );
  }

  // ── List view ────────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-0 flex-1 flex-col p-3">
      <Button onClick={onNew} className="mb-3 w-full">
        <Plus className="size-4" />
        {tl ? "Bagong note" : "New note"}
      </Button>

      {loading ? (
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
        </div>
      ) : notes.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center text-muted-foreground">
          <StickyNote className="size-8" />
          <p className="text-sm">
            {tl
              ? "Wala pang note. Gumawa ng isa para tumandaan ang mga setup at aral."
              : "No notes yet. Jot down setups and lessons as you learn."}
          </p>
        </div>
      ) : (
        <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto">
          {notes.map((n) => {
            const lesson = n.lesson_slug ? getLesson(n.lesson_slug) : undefined;
            return (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => openNote(n)}
                  className="w-full rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-primary/40"
                >
                  <div className="truncate text-sm font-medium">
                    {preview(n.content) || (tl ? "(walang laman)" : "(empty note)")}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    {lesson && (
                      <span className="rounded-full bg-secondary px-2 py-0.5">
                        {t(lesson.title, locale)}
                      </span>
                    )}
                    <span>{new Date(n.updated_at).toLocaleDateString()}</span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
