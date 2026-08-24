import type { Metadata } from "next";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { SavingsCalculator } from "@/components/sections/savings-calculator";
import { CtaBand } from "@/components/sections/cta-band";
import {
  CUSTOM_SITUATIONS,
  INCLUDED,
  PRICING_MODEL,
  RECRUITER_COMMITMENT,
} from "@/lib/pricing";
import { CTA_HREF, TRUST } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Priced by how many roles you run at once and quoted to your setup. Dedicated recruiter and AI sourcing included. No placement fees, no per-hire charges.",
  alternates: { canonical: "/pricing" },
};

/**
 * Quote-only pricing page (Nik's call, Aug 2026). No dollar amount renders
 * anywhere on the site; the page explains how the price is scoped, what every
 * plan includes, and the situations a quote gets shaped around, then routes
 * everything to the demo call where the number is given in writing.
 */
const FAQ = [
  {
    q: "Why don't you publish prices?",
    a: "Because the right number depends on how many roles you run at once and what kind of roles they are. You'll get an exact monthly price in writing on the first call, and it stays flat from there. No percentages, no per-hire math.",
  },
  {
    q: "How is this different from hiring the recruiter we posted for?",
    a: "We're not competing with that req. Filling it takes 90 to 120 days, plus ramp, and your open roles age the whole time. We work them now. When your recruiter starts, they walk into a running sourcing engine instead of a purchase-order queue.",
  },
  {
    q: "What happens when we do hire an in-house recruiter?",
    a: "Nothing changes on our side. Most clients keep the subscription and their recruiter runs intake and closes, while we carry the sourcing and screening volume. If you'd rather stop, give us fifteen days' notice after the ninety-day initial commitment and it ends with that billing month.",
  },
  {
    q: "Who actually does the work?",
    a: "The AI does the heavy lifting: sourcing across seven channels, screening, and ranking, around the clock. A dedicated recruiter oversees your searches and is your point of contact throughout. You'll meet them on the demo call, before you buy anything.",
  },
  {
    q: "What counts as an active role?",
    a: "A role that we're actively sourcing and screening for right now. When you fill or close one, the slot frees up immediately and the next role takes its place. You can swap roles in and out whenever your priorities change.",
  },
  {
    q: "What if we hire a lot of people into one role?",
    a: "One requisition with multiple openings still counts as one active role. Hiring five dispatchers off one shortlist doesn't use five slots.",
  },
  {
    q: "How fast does this start?",
    a: "There's no implementation and no setup fee. We do intake on the first call, and your sourced candidate list lands within the week.",
  },
  {
    q: "Do you integrate with our ATS?",
    a: "Usually you don't need one. What we hand you is a scheduled interview and a ranked shortlist, not another tool for your team to run, so most clients work straight out of email and their calendar. If you do want candidates written back into Greenhouse, Lever, Workday, or whatever you run, we'll scope that into your plan.",
  },
  {
    q: "When does this not make sense?",
    a: "If you hire once or twice a year, an agency's per-placement fee is genuinely cheaper and we'll tell you so. The subscription starts winning at roughly three hires a year.",
  },
  {
    q: "Can the scope change later?",
    a: "Yes. Add or drop active roles and the price adjusts at the next billing month. Most clients scale up during heavy quarters and back down after.",
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Section bg="bone" className="py-10 sm:py-14">
          <Container>
            <Reveal>
              <SectionHeader
                align="center"
                eyebrow="Pricing"
                title="Pay for your hiring capacity, not every hire."
                subtitle="Every plan is scoped to how many roles you run at once and quoted to your setup, with the exact monthly price in writing after one call. No placement fees. No per-hire charges."
              />
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {PRICING_MODEL.map((m, i) => (
                <Reveal key={m.title} delay={i * 80}>
                  <div className="h-full rounded-hero border border-line bg-surface p-6 shadow-rest">
                    <p className="font-display text-[19px] text-ink">
                      {m.title}
                    </p>
                    <p className="mt-2.5 text-[13.5px] leading-[1.65] text-secondary">
                      {m.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* One plan description instead of three cards: the recruiter
                block plus everything included, then the single CTA. */}
            <Reveal delay={120}>
              <div className="mx-auto mt-8 max-w-[760px] rounded-hero border border-gold-line bg-surface p-7 shadow-raised sm:p-9">
                <div className="rounded-card border border-gold-line bg-gold-tint p-4">
                  <p className="text-[11px] font-bold tracking-[0.08em] text-gold-deep uppercase">
                    AI + a real recruiter
                  </p>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-body">
                    {RECRUITER_COMMITMENT}
                  </p>
                </div>

                <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {INCLUDED.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2.5 text-[13.5px] leading-[1.55] text-body"
                    >
                      <span
                        aria-hidden
                        className="mt-[7px] size-1.5 shrink-0 rotate-45 bg-gold"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <Button href={CTA_HREF} size="lg">
                    Get your price
                  </Button>
                  <p className="text-[12.5px] text-muted">
                    Twenty minutes. Exact monthly price, in writing.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Quiet, because it is only load-bearing for the one reader who
                needs it. A Director-level buyer at a 600-person company has to
                see that this vendor has been through procurement before. */}
            <Reveal delay={140}>
              <p className="mt-7 text-center text-[12.5px] text-muted">
                MSA and order form available · DPA on request ·{" "}
                {TRUST.soc2.short}
              </p>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-9 text-center font-display text-[clamp(19px,2.2vw,24px)] leading-[1.4] text-ink text-balance">
                Your hiring volume shouldn&rsquo;t determine your recruiting
                cost.
              </p>
            </Reveal>
          </Container>
        </Section>

        <Section bg="sand" size="sm" aria-labelledby="custom-plans">
          <Container>
            <Reveal>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <Eyebrow className="mb-3">Scoped to you</Eyebrow>
                  <h2
                    id="custom-plans"
                    className="text-[clamp(26px,3.2vw,36px)]"
                  >
                    Every quote is shaped around a situation.
                  </h2>
                </div>
                <Button href={CTA_HREF} variant="secondary">
                  Talk to us
                </Button>
              </div>
            </Reveal>

            <ul className="mt-9 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {CUSTOM_SITUATIONS.map((s, i) => (
                <Reveal
                  key={s.title}
                  as="li"
                  delay={i * 60}
                  className="border-t border-line pt-4"
                >
                  <p className="text-[15px] font-semibold text-ink">
                    {s.title}
                  </p>
                  <p className="mt-1.5 max-w-[34ch] text-[13.5px] leading-[1.6] text-secondary">
                    {s.body}
                  </p>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>

        <SavingsCalculator />

        <Section bg="bone" size="md" aria-labelledby="pricing-faq">
          <Container size="sm">
            <Reveal>
              <Eyebrow className="mb-3">Questions</Eyebrow>
              <h2 id="pricing-faq" className="text-[clamp(28px,3.4vw,38px)]">
                The fine print, plainly.
              </h2>
            </Reveal>
            <dl className="mt-10 flex flex-col gap-8">
              {FAQ.map((item, i) => (
                <Reveal key={item.q} delay={i * 60}>
                  <div className="border-t border-line pt-6">
                    <dt className="text-[17px] font-semibold text-ink">
                      {item.q}
                    </dt>
                    <dd className="mt-2.5 max-w-[62ch] text-[15px] leading-[1.7] text-secondary">
                      {item.a}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </Container>
        </Section>

        <CtaBand
          title="Get a plan priced to your roles."
          body="Twenty minutes. We'll look at what you're hiring for, show you the platform, and put a number in writing."
        />
      </main>
      <SiteFooter />
    </>
  );
}
