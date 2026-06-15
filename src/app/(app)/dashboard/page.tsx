import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { ensureEnrolled, getProgressMap } from "@/lib/progress";
import { DashboardView } from "@/components/dashboard-view";

export const metadata = { title: "Dashboard" };

// Per-user page — always rendered dynamically (never cached).
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // If Supabase isn't set up yet, show the dashboard in a logged-out preview state.
  if (!isSupabaseConfigured) {
    return <DashboardView progress={{}} displayName={null} />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };

  if (!user) redirect("/login?next=/dashboard");

  await ensureEnrolled();
  const progress = await getProgressMap();
  const displayName =
    (user.user_metadata?.name as string | undefined) ??
    user.email?.split("@")[0] ??
    null;

  return <DashboardView progress={progress} displayName={displayName} />;
}
