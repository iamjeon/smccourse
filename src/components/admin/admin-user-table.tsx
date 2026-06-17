"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export type AdminUser = {
  user_id: string;
  display_name: string | null;
  email: string | null;
  locale_pref: string | null;
  enrolled_at: string | null;
  completed_count: number;
  last_viewed: string | null;
  exam_passed: boolean;
};

function fmt(d: string | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Searchable learner table for the admin dashboard. */
export function AdminUserTable({
  users,
  totalLessons,
}: {
  users: AdminUser[];
  totalLessons: number;
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return users;
    return users.filter(
      (u) =>
        (u.display_name ?? "").toLowerCase().includes(needle) ||
        (u.email ?? "").toLowerCase().includes(needle),
    );
  }, [q, users]);

  return (
    <div>
      <div className="relative mb-3 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name or email"
          className="pl-9"
          aria-label="Search learners"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Learner</th>
              <th className="px-3 py-2 font-medium">Enrolled</th>
              <th className="px-3 py-2 font-medium">Progress</th>
              <th className="px-3 py-2 font-medium">Last active</th>
              <th className="px-3 py-2 font-medium">Exam</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.user_id} className="border-t border-border align-top">
                <td className="px-3 py-2">
                  <div className="font-medium">{u.display_name || "—"}</div>
                  <div className="text-xs text-muted-foreground">{u.email}</div>
                </td>
                <td className="px-3 py-2 text-muted-foreground">
                  {u.enrolled_at ? fmt(u.enrolled_at) : "Not enrolled"}
                </td>
                <td className="px-3 py-2 font-mono text-xs">
                  {u.completed_count}/{totalLessons}
                </td>
                <td className="px-3 py-2 text-muted-foreground">{fmt(u.last_viewed)}</td>
                <td className="px-3 py-2">
                  {u.exam_passed ? (
                    <Badge variant="primary">Passed</Badge>
                  ) : (
                    <Badge variant="outline">—</Badge>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">
                  No learners match that search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {filtered.length} of {users.length} learners
      </p>
    </div>
  );
}
