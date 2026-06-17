import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  BookCheck,
  CalendarClock,
  GraduationCap,
  LineChart,
  Trophy,
  Users,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { getAllLessons, getCourses, modules } from "@/content/course";
import { finalExam } from "@/content/final-exam";
import {
  AdminUserTable,
  type AdminUser,
} from "@/components/admin/admin-user-table";
import {
  AdminModeration,
  type AdminBan,
  type AdminChatMessage,
} from "@/components/admin/admin-moderation";
import {
  AnnouncementComposer,
  type AdminAnnouncement,
} from "@/components/admin/announcement-composer";

export const metadata = { title: "Admin" };
export const dynamic = "force-dynamic";

type Overview = {
  users: number;
  enrolled: number;
  lessons_completed: number;
  exam_passes: number;
  active_7d: number;
  active_30d: number;
};

type LessonStat = {
  lesson_slug: string;
  completed_count: number;
  in_progress_count: number;
  attempts: number;
  avg_attempts: number;
};

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Users;
  label: string;
  value: number | string;
  hint?: string;
}) {
  return (
    <Card className="shadow-card">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <div>
          <div className="font-display text-2xl font-bold leading-none">{value}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {label}
            {hint ? ` · ${hint}` : ""}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function AdminPage() {
  const { user, admin } = await getAuth();
  if (!user || !admin) redirect("/dashboard");

  const supabase = await createClient();
  if (!supabase) redirect("/dashboard");

  // Static content health (from code, not the DB).
  const lessons = getAllLessons();
  let chartCount = finalExam.filter((q) => q.chart).length;
  for (const l of lessons) {
    chartCount += l.blocks.filter((b) => b.kind === "chart").length;
    chartCount += l.quiz.filter((q) => q.chart).length;
  }
  const titleBySlug: Record<string, string> = { "final-exam": "Final Exam" };
  for (const l of lessons) titleBySlug[l.slug] = l.title.en;

  // Per-user analytics via admin RPCs + direct reads (admin-read RLS).
  const [overviewRes, usersRes, statsRes, chatRes, bansRes, annRes] =
    await Promise.all([
      supabase.rpc("admin_overview"),
      supabase.rpc("admin_user_list"),
      supabase.rpc("admin_lesson_stats"),
      supabase
        .from("chat_messages")
        .select("id,user_id,display_name,body,created_at,deleted_at")
        .order("created_at", { ascending: false })
        .limit(50),
      supabase.from("chat_bans").select("user_id,reason,until,created_at"),
      supabase
        .from("announcements")
        .select("id,body,created_at,active")
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

  const overview = (overviewRes.data as Overview | null) ?? {
    users: 0,
    enrolled: 0,
    lessons_completed: 0,
    exam_passes: 0,
    active_7d: 0,
    active_30d: 0,
  };
  const users = (usersRes.data as AdminUser[] | null) ?? [];
  const lessonStats = ((statsRes.data as LessonStat[] | null) ?? [])
    .filter((s) => s.lesson_slug)
    .sort((a, b) => b.in_progress_count - a.in_progress_count);
  const chat = (chatRes.data as AdminChatMessage[] | null) ?? [];
  const bans = (bansRes.data as AdminBan[] | null) ?? [];
  const announcements = (annRes.data as AdminAnnouncement[] | null) ?? [];

  return (
    <div className="mx-auto max-w-5xl pb-12">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Dashboard
      </Link>

      <h1 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
        Admin dashboard
      </h1>
      <p className="mt-1.5 text-muted-foreground">
        Learner analytics, content health, community moderation, and announcements.
        Lesson content is authored in code (not editable here).
      </p>

      {/* Overview */}
      <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard icon={Users} label="Total users" value={overview.users} />
        <StatCard icon={GraduationCap} label="Enrolled" value={overview.enrolled} />
        <StatCard
          icon={Activity}
          label="Active"
          value={overview.active_7d}
          hint="last 7 days"
        />
        <StatCard
          icon={BookCheck}
          label="Lessons completed"
          value={overview.lessons_completed}
        />
        <StatCard icon={Trophy} label="Exam passes" value={overview.exam_passes} />
        <StatCard
          icon={CalendarClock}
          label="Active"
          value={overview.active_30d}
          hint="last 30 days"
        />
      </section>

      {/* Content health (from code) */}
      <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={BookCheck} label="Lessons" value={lessons.length} />
        <StatCard icon={GraduationCap} label="Modules" value={modules.length} />
        <StatCard icon={LineChart} label="Charts" value={chartCount} />
        <StatCard icon={BarChart3} label="Courses" value={getCourses().length} />
      </section>

      {/* Learners */}
      <section className="mt-10">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          <Users className="size-4" />
          Learners
        </h2>
        <AdminUserTable users={users} totalLessons={lessons.length} />
      </section>

      {/* Lesson analytics */}
      <section className="mt-10">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          <BarChart3 className="size-4" />
          Lesson analytics
        </h2>
        <p className="mb-3 text-sm text-muted-foreground">
          High average attempts or many learners stuck in progress can signal a lesson
          that needs clearer content.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Lesson</th>
                <th className="px-3 py-2 font-medium">Completed</th>
                <th className="px-3 py-2 font-medium">In progress</th>
                <th className="px-3 py-2 font-medium">Quiz attempts</th>
                <th className="px-3 py-2 font-medium">Avg / learner</th>
              </tr>
            </thead>
            <tbody>
              {lessonStats.map((s) => (
                <tr key={s.lesson_slug} className="border-t border-border">
                  <td className="px-3 py-2">
                    {titleBySlug[s.lesson_slug] ?? s.lesson_slug}
                  </td>
                  <td className="px-3 py-2 font-mono text-xs">{s.completed_count}</td>
                  <td className="px-3 py-2 font-mono text-xs">{s.in_progress_count}</td>
                  <td className="px-3 py-2 font-mono text-xs">{s.attempts}</td>
                  <td className="px-3 py-2 font-mono text-xs">{s.avg_attempts}</td>
                </tr>
              ))}
              {lessonStats.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">
                    No activity yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Announcements */}
      <section className="mt-10">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Announcements
        </h2>
        <AnnouncementComposer announcements={announcements} />
      </section>

      {/* Moderation */}
      <section className="mt-10">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Community moderation
        </h2>
        <AdminModeration messages={chat} bans={bans} />
      </section>
    </div>
  );
}
