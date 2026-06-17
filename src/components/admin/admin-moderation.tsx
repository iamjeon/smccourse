"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Ban, ShieldOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  banChatUser,
  deleteChatMessage,
  unbanChatUser,
} from "@/app/admin-actions";

export type AdminChatMessage = {
  id: string;
  user_id: string;
  display_name: string;
  body: string;
  created_at: string;
  deleted_at: string | null;
};

export type AdminBan = {
  user_id: string;
  reason: string | null;
  until: string | null;
  created_at: string;
};

function time(d: string): string {
  return new Date(d).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Chat moderation: hide messages, ban/unban users. */
export function AdminModeration({
  messages,
  bans,
}: {
  messages: AdminChatMessage[];
  bans: AdminBan[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function run(fn: () => Promise<{ ok: boolean; reason?: string }>) {
    setError(null);
    startTransition(async () => {
      const res = await fn();
      if (!res.ok) setError(res.reason ?? "Action failed");
      router.refresh();
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Recent messages
        </h3>
        <div className="max-h-96 space-y-2 overflow-y-auto rounded-lg border border-border p-2">
          {messages.length === 0 && (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">
              No messages yet.
            </p>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className="flex items-start gap-2 rounded-md border border-border bg-card p-2.5 text-sm"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{m.display_name}</span>
                  <span className="text-xs text-muted-foreground">
                    {time(m.created_at)}
                  </span>
                  {m.deleted_at && <Badge variant="destructive">Hidden</Badge>}
                </div>
                <p className="mt-0.5 break-words text-muted-foreground">{m.body}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                {!m.deleted_at && (
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    title="Hide message"
                    disabled={pending}
                    onClick={() => run(() => deleteChatMessage({ id: m.id }))}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                )}
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  title="Ban this user (permanent)"
                  disabled={pending}
                  onClick={() =>
                    run(() =>
                      banChatUser({ userId: m.user_id, reason: "Moderation" }),
                    )
                  }
                >
                  <Ban className="size-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Banned from chat
        </h3>
        <div className="space-y-2 rounded-lg border border-border p-2">
          {bans.length === 0 && (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">
              Nobody is banned.
            </p>
          )}
          {bans.map((b) => (
            <div
              key={b.user_id}
              className="flex items-center gap-2 rounded-md border border-border bg-card p-2.5 text-sm"
            >
              <div className="min-w-0 flex-1">
                <div className="truncate font-mono text-xs">{b.user_id}</div>
                <div className="text-xs text-muted-foreground">
                  {b.reason || "No reason"} ·{" "}
                  {b.until ? `until ${time(b.until)}` : "permanent"}
                </div>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={pending}
                onClick={() => run(() => unbanChatUser({ userId: b.user_id }))}
              >
                <ShieldOff className="size-4" />
                Unban
              </Button>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive lg:col-span-2">{error}</p>
      )}
    </div>
  );
}
