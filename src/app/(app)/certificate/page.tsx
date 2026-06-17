import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { isAdmin } from "@/lib/auth";
import { getProgressMap } from "@/lib/progress";
import { Certificate } from "@/components/tools/certificate";

export const metadata = { title: "Certificate" };
export const dynamic = "force-dynamic";

export default async function CertificatePage() {
  if (!isSupabaseConfigured) redirect("/dashboard");

  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  if (!user) redirect("/login?next=/certificate");

  const progress = await getProgressMap();
  const exam = progress["final-exam"];
  const passed = exam?.status === "completed";
  const admin = isAdmin(user);
  const name =
    (user.user_metadata?.name as string | undefined) ??
    user.email?.split("@")[0] ??
    "Trader";

  return (
    <Certificate
      name={name}
      passed={passed}
      preview={!passed && admin}
      completedAt={exam?.completed_at ?? null}
    />
  );
}
