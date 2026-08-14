import type { Metadata } from "next";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BadgePill } from "@/components/ui/badge-pill";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { SavingsCalculator } from "@/components/sections/savings-calculator";
import { CtaBand } from "@/components/sections/cta-band";
import { RECRUITER_COMMITMENT, CUSTOM_SITUATIONS, PLANS } from "@/lib/pricing";
import { formatUsd } from "@/lib/roi";
import { CTA_HREF, TRUST } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Plans from $1,850 a month, priced by how many roles you run at once. Every plan includes a dedicated recruiter. No placement fees.",
  alternates: { canonical: "/pricing" },
};

/**
 * Ordered by what a reader actually asks, not by what is easiest to answer.
 *
 * The old list argued the agency deal in four of six questions, which is the
 * wrong deal for a buyer who was never paying placement fees. The three
 * questions that lead now are the ones that come up on every first call: how
 * this sits next to the recruiter they are hiring, what happens when that
 * person starts, and whether the recruiter is a real person.
 *
 * "When does this not make sense" stays. Telling a prospect an agency is
 * cheaper for them is the reason they believe the rest of the page.
 */
const FAQ = [
  {
    q: "How is this different from hiring the recruiter we posted for?",
    a: "We're not competing with that req. Filling it takes 90 to 120 days, plus ramp, and your open roles age the whole time. We work them now. When your recruiter starts, they walk into a running sourcing engine instead of a purchase-order queue.",
  },
  {
    q: "What happens when we do hire an in-house recruiter?",
    a: "Nothing changes on our side. Most clients keep the subscription and their recruiter runs intake and closes, while we carry the sourcing and screening volume. If you'd rather stop, you can, effective the end of that billing month.",
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
    a: "Usually you don't need one. What we hand you is a scheduled interview and a ranked shortlist, not another tool for your team to run, so most clients work straight out of email and their calendar. If you do want candidates written back into Greenhouse, Lever, Workday, or whatever you run, that's part of a custom plan.",
  },
  {
    q: "When does this not make sense?",
    a: "If you hire once or twice a year, an agency's per-placement fee is genuinely cheaper and we'll tell you so. The subscription starts winning at roughly three hires a year.",
  },
  {
    q: "Can we change plans?",
    a: "Yes, up or down, effective the next billing month. Most clients start on Core or Growth and move up during heavy quarters.",
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        {/* Compact header: the dollar figures are the content here, so they
            belong above the fold, not below a hero. */}
        <Section bg="bone" className="py-10 sm:py-14">
          <Container>
            <Reveal>
              <SectionHeader
                align="center"
                eyebrow="Pricing"
                title="Pay for your hiring capacity, not every hire."
                subtitle="One flat monthly price covers the roles you have open, with a dedicated recruiter, AI sourcing across seven channels, and unlimited resume screening. No placement fees. No per-hire charges."
              />
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {PLANS.map((plan, i) => (
                <Reveal key={plan.id} delay={i * 80}>
                  <article
                    className={
                      plan.featured
                        ? "animate-at-glow relative flex h-full flex-col rounded-hero border border-gold-line bg-surface p-7 shadow-raised"
                        : "relative flex h-full flex-col rounded-hero border border-line bg-surface p-7 shadow-rest transition-shadow duration-200 hover:shadow-lift"
                    }
                  >
                    {plan.featured && (
                      <>
                        <span
                          aria-hidden
                          className="absolute inset-x-7 top-0 h-px bg-gold"
                        />
                        <div className="absolute -top-3 left-7">
                          <BadgePill tone="gold">Most popular</BadgePill>
                        </div>
                      </>
                    )}

                    <h2 className="font-display text-[22px] text-ink">
                      {plan.name}
                    </h2>
                    <p className="mt-1 text-[13px] font-semibold text-gold-deep">
                      {plan.rolesLabel}
                    </p>

                    <div className="mt-5 flex items-baseline gap-1.5">
                      {plan.monthly ? (
                        <>
                          <span className="font-display text-[40px] leading-none text-ink tabular">
                            {formatUsd(plan.monthly)}
                          </span>
                          <span className="text-[14px] text-muted">/mo</span>
                        </>
                      ) : (
                        <span className="font-display text-[40px] leading-none text-ink">
                          Custom
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-[13.5px] leading-[1.6] text-secondary">
                      {plan.blurb}
                    </p>

                    {/* The human, pulled out of the bullet list. It is what
                        separates this from sourcing software at a quarter the
                        price, so it should not be the fourth bullet down. */}
                    <div className="mt-5 rounded-card border border-gold-line bg-gold-tint p-4">
                      <p className="text-[11px] font-bold tracking-[0.08em] text-gold-deep uppercase">
                        AI + a real recruiter
                      </p>
                      <p className="mt-2 text-[13px] leading-[1.55] text-body">
                        {RECRUITER_COMMITMENT}
                      </p>
                    </div>

                    <div className="rule-dashed my-5" />

                    <ul className="flex flex-1 flex-col gap-2.5">
                      {plan.features.map((f) => (
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

                    <div className="mt-6 flex flex-col gap-2">
                      {plan.stripeUrl ? (
                        <Button
                          href={plan.stripeUrl}
                          variant={plan.featured ? "primary" : "secondary"}
                          className="w-full justify-center"
                        >
                          Start now
                        </Button>
                      ) : (
                        <Button
                          href={CTA_HREF}
                          variant="secondary"
                          className="w-full justify-center"
                        >
                          {plan.cta}
                        </Button>
                      )}
                      {plan.stripeUrl && (
                        <p className="text-center text-[11.5px] text-muted">
                          Billed monthly · card, ACH, or Apple Pay
                        </p>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Quiet, because it is only load-bearing for the one reader who
                needs it. A Director-level buyer at a 600-person company has to
                see that this vendor has been through procurement before. */}
            <Reveal delay={120}>
              <p className="mt-7 text-center text-[12.5px] text-muted">
                MSA and order form available · DPA on request ·{" "}
                {TRUST.soc2.short}
              </p>
            </Reveal>

            <Reveal delay={140}>
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
                  <Eyebrow className="mb-3">Custom</Eyebrow>
                  <h2
                    id="custom-plans"
                    className="text-[clamp(26px,3.2vw,36px)]"
                  >
                    Not everyone fits a plan.
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
