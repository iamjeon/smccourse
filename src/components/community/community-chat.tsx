"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Loader2,
  Send,
  SmilePlus,
  Users,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/components/locale-provider";
import { sendChatMessage } from "@/app/chat-actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  user_id: string;
  display_name: string;
  body: string;
  created_at: string;
};

type Reaction = { message_id: string; user_id: string; emoji: string };

const EMOJIS = ["\u{1F44D}", "\u{1F525}", "✅", "\u{1F602}", "\u{1F64F}"];
const OPTIMISTIC_PREFIX = "opt-";
const RELAY_WS = process.env.NEXT_PUBLIC_RELAY_WS_URL;

function clock(d: string): string {
  return new Date(d).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function CommunityChat() {
  const { locale } = useLocale();
  const tl = locale === "tl";

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [me, setMe] = useState<string | null>(null);
  const [online, setOnline] = useState(0);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(true);

  const [counts, setCounts] = useState<
    Record<string, Record<string, number>>
  >({});
  const [mine, setMine] = useState<Record<string, Set<string>>>({});
  const [palette, setPalette] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const shouldAutoScroll = useRef(true);

  /* ── shared helpers ─────────────────────────────────────────── */

  const loadReactions = useCallback(
    async (ids: string[], myId: string | null) => {
      if (!ids.length) return;
      const supabase = createClient();
      if (!supabase) return;
      const { data: rx } = await supabase
        .from("chat_reactions")
        .select("message_id,user_id,emoji")
        .in("message_id", ids);
      const c: Record<string, Record<string, number>> = {};
      const m: Record<string, Set<string>> = {};
      for (const r of (rx as Reaction[]) ?? []) {
        c[r.message_id] = c[r.message_id] ?? {};
        c[r.message_id][r.emoji] = (c[r.message_id][r.emoji] ?? 0) + 1;
        if (r.user_id === myId) {
          m[r.message_id] = m[r.message_id] ?? new Set();
          m[r.message_id].add(r.emoji);
        }
      }
      setCounts(c);
      setMine(m);
    },
    [],
  );

  const applyReaction = useCallback(
    (r: Reaction, delta: 1 | -1, myId: string | null) => {
      setCounts((prev) => {
        const forMsg = { ...(prev[r.message_id] ?? {}) };
        const next = (forMsg[r.emoji] ?? 0) + delta;
        if (next <= 0) delete forMsg[r.emoji];
        else forMsg[r.emoji] = next;
        return { ...prev, [r.message_id]: forMsg };
      });
      if (myId && r.user_id === myId) {
        setMine((prev) => {
          const set = new Set(prev[r.message_id] ?? []);
          if (delta === 1) set.add(r.emoji);
          else set.delete(r.emoji);
          return { ...prev, [r.message_id]: set };
        });
      }
    },
    [],
  );

  /* ── main subscription effect ───────────────────────────────── */

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      return;
    }
    let active = true;
    let myId: string | null = null;

    async function loadFromDb(): Promise<ChatMessage[]> {
      const { data: msgs } = await supabase!
        .from("chat_messages")
        .select("id,user_id,display_name,body,created_at")
        .order("created_at", { ascending: false })
        .limit(50);
      return ((msgs as ChatMessage[]) ?? []).slice().reverse();
    }

    function upsertMessage(msg: ChatMessage) {
      setMessages((prev) => {
        const optIdx = prev.findIndex(
          (m) =>
            m.id.startsWith(OPTIMISTIC_PREFIX) &&
            m.user_id === msg.user_id &&
            m.body === msg.body,
        );
        if (optIdx !== -1) {
          const next = [...prev];
          next[optIdx] = msg;
          return next;
        }
        if (prev.some((x) => x.id === msg.id)) return prev;
        const next = [...prev, msg];
        return next.length > 50 ? next.slice(-50) : next;
      });
    }

    /* ─── Relay path (production — 10K+ concurrent) ─────────── */
    let ws: WebSocket | null = null;
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;
    let retryDelay = 1000;

    function connectRelay() {
      ws = new WebSocket(RELAY_WS!);

      ws.onopen = () => {
        retryDelay = 1000;
        if (active) setConnected(true);
      };

      ws.onmessage = async (event) => {
        if (!active) return;
        const payload = JSON.parse(event.data);
        switch (payload.type) {
          case "init": {
            let msgs: ChatMessage[] = payload.messages;
            if (!msgs.length) msgs = await loadFromDb();
            if (!active) return;
            setMessages(msgs);
            setLoading(false);
            loadReactions(
              msgs.map((m) => m.id),
              myId,
            );
            break;
          }
          case "message":
            upsertMessage(payload.data as ChatMessage);
            break;
          case "presence":
            setOnline(payload.count);
            break;
        }
      };

      ws.onclose = () => {
        if (!active) return;
        setConnected(false);
        retryTimeout = setTimeout(() => {
          if (active) connectRelay();
        }, retryDelay);
        retryDelay = Math.min(retryDelay * 2, 30_000);
      };

      ws.onerror = () => ws?.close();
    }

    /* ─── Supabase Realtime path (fallback for dev / no relay) ─ */
    type Channel = ReturnType<typeof supabase.channel>;
    let channel: Channel | null = null;
    let presence: Channel | null = null;

    function connectSupabase(ordered: ChatMessage[]) {
      if (!active) return;
      setMessages(ordered);
      setLoading(false);
      loadReactions(
        ordered.map((m) => m.id),
        myId,
      );

      channel = supabase!
        .channel("public:community")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "chat_messages" },
          (payload) => upsertMessage(payload.new as ChatMessage),
        )
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "chat_reactions" },
          (payload) => {
            const r = payload.new as Reaction;
            if (r.user_id === myId) return;
            applyReaction(r, 1, myId);
          },
        )
        .on(
          "postgres_changes",
          { event: "DELETE", schema: "public", table: "chat_reactions" },
          (payload) => {
            const r = payload.old as Reaction;
            if (r.user_id === myId) return;
            applyReaction(r, -1, myId);
          },
        )
        .subscribe((status) => {
          if (active) setConnected(status === "SUBSCRIBED");
        });

      presence = supabase!.channel("community-presence", {
        config: { presence: { key: myId ?? crypto.randomUUID() } },
      });
      presence
        .on("presence", { event: "sync" }, () => {
          if (active)
            setOnline(Object.keys(presence!.presenceState()).length);
        })
        .subscribe(async (status) => {
          if (status === "SUBSCRIBED") await presence!.track({ at: Date.now() });
        });
    }

    /* ─── Init ─────────────────────────────────────────────── */
    async function init() {
      const { data: auth } = await supabase!.auth.getUser();
      myId = auth.user?.id ?? null;
      if (active) setMe(myId);

      if (RELAY_WS) {
        connectRelay();
      } else {
        connectSupabase(await loadFromDb());
      }
    }

    init();

    return () => {
      active = false;
      ws?.close();
      if (retryTimeout) clearTimeout(retryTimeout);
      if (channel) supabase!.removeChannel(channel);
      if (presence) supabase!.removeChannel(presence);
    };
  }, [loadReactions, applyReaction]);

  /* ── auto-scroll ────────────────────────────────────────────── */

  useEffect(() => {
    const el = scrollRef.current;
    if (el && shouldAutoScroll.current) el.scrollTop = el.scrollHeight;
  }, [messages]);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    shouldAutoScroll.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  }

  /* ── send ────────────────────────────────────────────────────── */

  async function send() {
    const value = text.trim();
    if (!value || sending || cooldown || !me) return;

    const optimisticId = `${OPTIMISTIC_PREFIX}${Date.now()}`;
    const optimisticMsg: ChatMessage = {
      id: optimisticId,
      user_id: me,
      display_name: "",
      body: value,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMsg]);
    setText("");
    setError(null);
    shouldAutoScroll.current = true;

    setSending(true);
    const res = await sendChatMessage({ body: value });
    setSending(false);

    if (!res.ok) {
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
      const reason = res.reason ?? "Could not send.";
      setError(reason);
      toast.error(reason);
      setText(value);
      return;
    }

    setCooldown(true);
    setTimeout(() => setCooldown(false), 5000);
  }

  /* ── reactions (optimistic + direct Supabase) ────────────────── */

  async function toggleReaction(messageId: string, emoji: string) {
    const supabase = createClient();
    if (!supabase || !me) return;
    setPalette(null);
    const has = mine[messageId]?.has(emoji);

    applyReaction({ message_id: messageId, user_id: me, emoji }, has ? -1 : 1, me);

    if (has) {
      await supabase
        .from("chat_reactions")
        .delete()
        .eq("message_id", messageId)
        .eq("user_id", me)
        .eq("emoji", emoji);
    } else {
      await supabase
        .from("chat_reactions")
        .insert({ message_id: messageId, user_id: me, emoji });
    }
  }

  const onlineLabel = online > 0 ? online : 1;

  /* ── render ──────────────────────────────────────────────────── */

  return (
    <div className="mx-auto flex h-[calc(100dvh-8.5rem)] min-h-[440px] max-w-2xl flex-col lg:h-[calc(100dvh-6rem)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">
            {tl ? "Community chat" : "Community chat"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {tl
              ? "Isang global room para sa lahat ng learner."
              : "One global room for every learner."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!connected && (
            <span
              className="inline-flex items-center gap-1 rounded-full border border-destructive/40 bg-destructive/10 px-2.5 py-1 text-xs text-destructive"
              title={tl ? "Nag-reconnect..." : "Reconnecting..."}
            >
              <WifiOff className="size-3" />
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm">
            <span className="size-2 rounded-full bg-bull" />
            <Users className="size-4 text-muted-foreground" />
            {onlineLabel} {tl ? "online" : "online"}
          </span>
        </div>
      </div>

      {/* Code of conduct */}
      <div className="mb-2 flex items-start gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
        <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-gold" />
        <p>
          {tl
            ? "Maging magalang. Walang spam, scam, o paid signals. Mag-ingat: walang lehitimong tao na hihingi ng pera o password dito."
            : "Be respectful. No spam, scams, or paid signals. Stay safe: nobody legit will DM you for money or passwords here."}
        </p>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        aria-live="polite"
        aria-label="Chat messages"
        className="min-h-0 flex-1 space-y-3 overflow-y-auto rounded-xl border border-border bg-card/40 p-3"
      >
        {loading ? (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <Loader2 className="size-5 animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-muted-foreground">
            {tl
              ? "Wala pang mensahe. Ikaw ang magsimula."
              : "No messages yet. Say hello."}
          </p>
        ) : (
          messages.map((m) => {
            const myMsg = m.user_id === me;
            const isOptimistic = m.id.startsWith(OPTIMISTIC_PREFIX);
            const rx = counts[m.id] ?? {};
            const rxEntries = Object.entries(rx);
            return (
              <div
                key={m.id}
                className={cn(
                  "flex flex-col",
                  myMsg ? "items-end" : "items-start",
                )}
              >
                <div className="group flex max-w-[85%] items-end gap-1">
                  <div
                    className={cn(
                      "rounded-2xl px-3 py-2 text-sm",
                      myMsg
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-secondary text-secondary-foreground",
                      isOptimistic && "opacity-70",
                    )}
                  >
                    {!myMsg && (
                      <div className="mb-0.5 text-xs font-medium text-primary">
                        {m.display_name}
                      </div>
                    )}
                    <p className="whitespace-pre-wrap break-words">{m.body}</p>
                  </div>
                  {!isOptimistic && (
                    <div className="relative">
                      <button
                        type="button"
                        aria-label={tl ? "Mag-react" : "React"}
                        onClick={() =>
                          setPalette(palette === m.id ? null : m.id)
                        }
                        className="rounded-full p-1 text-muted-foreground opacity-0 transition-opacity hover:text-foreground focus:opacity-100 group-hover:opacity-100"
                      >
                        <SmilePlus className="size-4" />
                      </button>
                      {palette === m.id && (
                        <div className="absolute bottom-7 z-10 flex gap-1 rounded-full border border-border bg-popover p-1 shadow-elevated">
                          {EMOJIS.map((e) => (
                            <button
                              key={e}
                              type="button"
                              onClick={() => toggleReaction(m.id, e)}
                              className="rounded-full px-1.5 py-0.5 text-base transition-transform hover:scale-125"
                            >
                              {e}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Reaction chips */}
                {rxEntries.length > 0 && (
                  <div
                    className={cn(
                      "mt-1 flex flex-wrap gap-1",
                      myMsg ? "justify-end" : "justify-start",
                    )}
                  >
                    {rxEntries.map(([emoji, count]) => {
                      const reacted = mine[m.id]?.has(emoji);
                      return (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => toggleReaction(m.id, emoji)}
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition-colors",
                            reacted
                              ? "border-primary/40 bg-primary/10 text-primary"
                              : "border-border bg-card text-muted-foreground hover:text-foreground",
                          )}
                        >
                          <span>{emoji}</span>
                          <span className="font-mono">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
                <span className="mt-0.5 px-1 text-[10px] text-muted-foreground">
                  {isOptimistic
                    ? tl
                      ? "Ipinapadala..."
                      : "Sending..."
                    : clock(m.created_at)}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Composer */}
      <div className="pt-3">
        {error && <p id="chat-error" role="alert" className="mb-2 text-xs text-destructive">{error}</p>}
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={500}
            placeholder={
              cooldown
                ? tl
                  ? "Sandali lang..."
                  : "Slow mode..."
                : tl
                  ? "Mag-type ng mensahe"
                  : "Type a message"
            }
            aria-label="Message"
            aria-describedby={error ? "chat-error" : undefined}
            disabled={sending}
          />
          <Button
            type="submit"
            size="icon"
            disabled={sending || cooldown || !text.trim()}
            aria-label="Send"
          >
            {sending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
