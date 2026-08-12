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
import { PLANS } from "@/lib/pricing";
import { formatUsd } from "@/lib/roi";
import { CTA_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Plans from $2,000 a month, priced by how many roles you run at once. Every plan includes a dedicated account manager. No placement fees.",
  alternates: { canonical: "/pricing" },
};

const FAQ = [
  {
    q: "What counts as an active role?",
    a: "A role that we're actively sourcing and screening for right now. When you fill or close one, the slot frees up immediately and the next role takes its place. You can swap roles in and out whenever your priorities change.",
  },
  {
    q: "What if we hire a lot of people into one role?",
    a: "One requisition with multiple openings still counts as one active role. Hiring five dispatchers off one shortlist doesn't use five slots.",
  },
  {
    q: "Is there a placement fee on top?",
    a: "No. The monthly price is the whole price, however many people you hire. That's the point.",
  },
  {
    q: "Is there a setup fee?",
    a: "No. There's nothing to implement and nothing to pay up front. Your first shortlist is moving within the week, and billing terms are agreed on your demo call.",
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
                title="Priced by roles open, not people hired."
                subtitle="Every plan includes a dedicated account manager, AI sourcing across seven channels, and unlimited resume screening. No placement fees."
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

            <Reveal delay={120}>
              <p className="mt-8 text-center text-[13.5px] text-secondary">
                One agency placement at a $90,000 salary runs about
                {" "}{formatUsd(19_800)}. Core costs {formatUsd(24_000)} for the
                whole year, however many people you hire.
              </p>
            </Reveal>
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
