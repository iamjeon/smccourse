"use client";

import dynamic from "next/dynamic";

const CommunityChat = dynamic(
  () =>
    import("@/components/community/community-chat").then(
      (m) => m.CommunityChat,
    ),
  { ssr: false },
);

export default function CommunityPage() {
  return <CommunityChat />;
}
