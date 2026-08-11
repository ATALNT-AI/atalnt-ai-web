import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { TRUST } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a walkthrough",
  description:
    "See the platform, meet your account manager, and get a plan priced to the roles you have open. No commitment.",
  alternates: { canonical: "/demo" },
};

const STEPS = [
  {
    title: "We ask what you're hiring for",
    body: "How many roles are open, which ones keep stalling, and what you're spending on agencies today.",
  },
  {
    title: "We show you the platform",
    body: "The real product with your kind of roles in it, not a slide deck. About twenty minutes.",
  },
  {
    title: "You get a price in writing",
    body: "Scoped to the number of roles you actually run at once, with the cost per hire spelled out.",
  },
];

export default function DemoPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-bone py-16 sm:py-24">
          <div
            aria-hidden
            className="glow-gold pointer-events-none absolute top-[-200px] right-[-120px] size-[620px] opacity-60"
          />
          <Container className="relative">
            <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              <div>
                <Eyebrow>Book a walkthrough</Eyebrow>
                <h1 className="mt-4 text-[clamp(34px,4.6vw,52px)] leading-[1.08] text-balance">
                  See it running against your own roles.
                </h1>
                <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.65] text-secondary">
                  Twenty minutes, no deck. We&rsquo;ll show you the platform,
                  introduce the account manager who would run your searches, and
                  send you a price scoped to the roles you have open.
                </p>

                <ol className="mt-10 flex flex-col gap-6">
                  {STEPS.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span
                        aria-hidden
                        className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-pill border border-gold-line bg-gold-tint font-display text-[13px] text-gold-deep"
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-[15.5px] font-semibold text-ink">
                          {s.title}
                        </p>
                        <p className="mt-1 max-w-[46ch] text-[14.5px] leading-[1.6] text-secondary">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-10 rounded-card border border-line bg-surface p-5">
                  <p className="text-[14px] leading-[1.6] text-secondary">
                    Would rather look around first?{" "}
                    <Button href="/demo-app" variant="ghost" size="sm" className="px-0">
                      Open the live demo →
                    </Button>
                  </p>
                </div>

                <ul className="mt-8 flex flex-col gap-2.5 border-t border-line pt-6">
                  {[TRUST.soc2.short, TRUST.encryption, TRUST.ownership].map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2.5 text-[13px] text-muted"
                    >
                      <span aria-hidden className="size-1.5 rotate-45 bg-gold" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-hero border border-line bg-surface p-6 shadow-raised sm:p-8">
                <Suspense
                  fallback={
                    <div className="h-[520px] animate-pulse rounded-card bg-bone-100" />
                  }
                >
                  <LeadForm />
                </Suspense>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
