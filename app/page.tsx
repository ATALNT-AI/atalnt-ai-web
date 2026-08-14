import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/hero";
import { ClientLogos } from "@/components/sections/client-logos";
import { Difference } from "@/components/sections/difference";
import { SourcingNetwork } from "@/components/sections/sourcing-network";
import { ProofStrip } from "@/components/sections/proof-strip";
import { Agency } from "@/components/sections/agency";
import { CtaBand } from "@/components/sections/cta-band";

/**
 * Page spine: what the platform does, what it replaces, and where candidates
 * come from. The founder story lives on /about now; the home page sells the
 * product and hands off. The two ink sections are separated by the
 * surface-toned math section so they never sit adjacent.
 */
export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-nav focus:bg-ink focus:px-4 focus:py-2.5 focus:text-[14px] focus:font-semibold focus:text-on-dark"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main" className="flex-1">
        <Hero />
        <ClientLogos />
        <Difference />
        <ProofStrip />
        <SourcingNetwork />
        <Agency />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
