"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Megaphone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { postAnnouncement, setAnnouncementActive } from "@/app/admin-actions";

export type AdminAnnouncement = {
  id: string;
  body: string;
  created_at: string;
  active: boolean;
};

/** Compose + manage announcements shown to all signed-in users. */
export function AnnouncementComposer({
  announcements,
}: {
  announcements: AdminAnnouncement[];
}) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function post() {
    if (!body.trim()) return;
    setError(null);
    startTransition(async () => {
      const res = await postAnnouncement({ body });
      if (!res.ok) {
        setError(res.reason ?? "Could not post");
        return;
      }
      setBody("");
      router.refresh();
    });
  }

  function toggle(id: string, active: boolean) {
    startTransition(async () => {
      await setAnnouncementActive({ id, active });
      router.refresh();
    });
  }

  return (
    <div>
      <div className="rounded-lg border border-border bg-card p-3">
        <label className="mb-1.5 flex items-center gap-2 text-sm font-medium">
          <Megaphone className="size-4 text-primary" />
          New announcement
        </label>
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={1000}
          placeholder="A short message all learners will see as a banner."
          rows={3}
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{body.length}/1000</span>
          <Button type="button" size="sm" onClick={post} disabled={pending || !body.trim()}>
            <Send className="size-4" />
            Post
          </Button>
        </div>
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      </div>

      <div className="mt-3 space-y-2">
        {announcements.map((a) => (
          <div
            key={a.id}
            className="flex items-start gap-2 rounded-md border border-border bg-card p-2.5 text-sm"
          >
            <div className="min-w-0 flex-1">
              <p className="break-words">{a.body}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                {new Date(a.created_at).toLocaleString()}
                {a.active ? (
                  <Badge variant="primary">Active</Badge>
                ) : (
                  <Badge variant="outline">Hidden</Badge>
                )}
              </div>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={pending}
              onClick={() => toggle(a.id, !a.active)}
            >
              {a.active ? "Hide" : "Show"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
