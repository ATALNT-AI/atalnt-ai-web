import type { Metadata } from "next";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BookingEmbed, BookingFallback } from "@/components/forms/booking-embed";
import { TRUST } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Pick a time. Twenty minutes, no deck. See the platform, meet your account manager, and get a plan priced to the roles you have open.",
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
        <section className="relative overflow-hidden bg-bone py-14 sm:py-20">
          <div
            aria-hidden
            className="glow-gold pointer-events-none absolute top-[-200px] right-[-120px] size-[620px] opacity-60"
          />
          <Container className="relative">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div>
                <Eyebrow>Book a demo</Eyebrow>
                <h1 className="mt-4 text-[clamp(32px,4.2vw,46px)] leading-[1.08] text-balance">
                  Pick a time that works.
                </h1>
                <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.65] text-secondary">
                  Thirty minutes, no deck. We&rsquo;ll show you the platform,
                  introduce the account manager who would run your searches, and
                  send you a price scoped to the roles you have open.
                </p>

                <ol className="mt-9 flex flex-col gap-5">
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
                        <p className="mt-1 max-w-[42ch] text-[14.5px] leading-[1.6] text-secondary">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <ul className="mt-8 flex flex-col gap-2.5 border-t border-line pt-6">
                  {[TRUST.soc2.short, TRUST.encryption, TRUST.ownership].map(
                    (t) => (
                      <li
                        key={t}
                        className="flex items-center gap-2.5 text-[13px] text-muted"
                      >
                        <span aria-hidden className="size-1.5 rotate-45 bg-gold" />
                        {t}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <BookingEmbed />
                <BookingFallback />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
