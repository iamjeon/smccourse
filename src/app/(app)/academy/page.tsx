import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { ensureEnrolled, getProgressMap } from "@/lib/progress";
import { DashboardCourses } from "@/components/dashboard-courses";

export const metadata = { title: "Academy" };
export const dynamic = "force-dynamic";

export default async function AcademyPage() {
  if (!isSupabaseConfigured) {
    return <DashboardCourses progress={{}} />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };

  if (!user) redirect("/login?next=/academy");

  await ensureEnrolled();
  const progress = await getProgressMap();

  return <DashboardCourses progress={progress} />;
}
