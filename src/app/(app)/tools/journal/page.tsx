"use client";

import { JournalView } from "@/components/tools/journal-view";
import { useJournalEntries } from "@/lib/hooks/use-user-data";

export default function JournalPage() {
  const { data: entries } = useJournalEntries();
  return <JournalView entries={(entries ?? []) as Parameters<typeof JournalView>[0]["entries"]} />;
}
