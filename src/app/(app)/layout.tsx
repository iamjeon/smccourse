import { SiteHeader } from "@/components/site-header";
import { MobileTabBar } from "@/components/mobile-nav";

/** Layout for the authenticated learning area: header + content + mobile tab bar. */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      {/* pb to clear the fixed mobile tab bar */}
      <main className="container pb-24 pt-6 sm:pb-12">{children}</main>
      <MobileTabBar />
    </>
  );
}
