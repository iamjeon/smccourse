import { AppShell } from "@/components/shell/app-shell";

/** Authenticated learning area: responsive app shell (sidebar + mobile drawer). */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
