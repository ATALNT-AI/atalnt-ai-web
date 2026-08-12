import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/hero";
import { ClientLogos } from "@/components/sections/client-logos";
import { Pipeline } from "@/components/sections/pipeline";
import { SourcingNetwork } from "@/components/sections/sourcing-network";
import { ProofStrip } from "@/components/sections/proof-strip";
import { Agency } from "@/components/sections/agency";
import { Wedge } from "@/components/sections/wedge";
import { Founders } from "@/components/sections/founders";
import { Trust } from "@/components/sections/trust";
import { CtaBand } from "@/components/sections/cta-band";

/**
 * Page spine: three escalating pains, answered in the same order, then the
 * money, then who we are. Capacity before cost, because this buyer feels the
 * aging req before they feel the invoice.
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
        <Pipeline />
        <SourcingNetwork />
        <ProofStrip />
        <Agency />
        <Wedge />
        <Founders />
        <Trust />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
