import type { Metadata } from "next";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { Founders } from "@/components/sections/founders";
import { ClientLogos } from "@/components/sections/client-logos";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "About",
  description:
    "ATALNT AI is built by the team behind ATALNT LLC: recruiters who ran these searches by hand for years before building software for them.",
  alternates: { canonical: "/about" },
};

/**
 * The story page. The mission and founder bios moved here from the home page
 * (Nik's call, Aug 2026): the home spine sells the product, this page sells
 * the people, and a reader who wants the second thing will come find it.
 * Client logos repeat here on purpose; next to the bios they read as "who
 * trusts these two," not decoration.
 */
export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Founders />
        <ClientLogos />
        <CtaBand
          title="Meet the person who'd run your searches."
          body="Twenty minutes, no deck. See the platform and leave with a price scoped to the roles you have open."
        />
      </main>
      <SiteFooter />
    </>
  );
}
