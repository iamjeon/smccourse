import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { JournalView, type JournalEntry } from "@/components/tools/journal-view";

export const metadata = { title: "Trading journal" };
export const dynamic = "force-dynamic";

export default async function JournalPage() {
  if (!isSupabaseConfigured) return <JournalView entries={[]} />;

  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  if (!user) redirect("/login?next=/tools/journal");

  const { data } = await supabase!
    .from("journal_entries")
    .select("id,pair,direction,setup,lesson_slug,entry,stop,target,rr,outcome,notes,traded_at")
    .order("traded_at", { ascending: false });

  return <JournalView entries={(data as JournalEntry[]) ?? []} />;
}
