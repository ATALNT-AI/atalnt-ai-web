import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Wordmark } from "@/components/ui/wordmark";
import { Reveal } from "@/components/motion/reveal";
import { formatUsd } from "@/lib/roi";
import { RECRUITER_STACK, RECRUITER_TOTAL, COST_SOURCES } from "@/lib/recruiter-cost";
import { CTA_HREF } from "@/lib/site";

/**
 * The cost of the stack a company already runs, itemized, with no ATALNT AI
 * price opposite it.
 *
 * Deliberately no number on the right: naming a figure here answers the
 * question instead of provoking it, and the pricing page is one click away for
 * anyone who wants it. The left column does the work; the right column only
 * has to say "all of that, in one place."
 */
export function ProofStrip() {
  return (
    <Section bg="surface" size="lg" bordered id="savings" aria-labelledby="math-heading">
      <Container>
        <Reveal>
          <SectionHeader
            id="math-heading"
            align="center"
            eyebrow="The math"
            title="Everything you're already paying for."
            subtitle="A recruiter, their seat licences, their data, their job boards, and the tools that stitch it all together. Six line items, six renewal dates, one hire at a time."
          />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-[1000px] gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* What it costs to run this in-house */}
          <Reveal>
            <div className="h-full rounded-hero border border-line bg-bone p-6 sm:p-8">
              <p className="text-[11.5px] font-bold tracking-[0.06em] text-eyebrow uppercase">
                Hiring in-house, per year
              </p>
              <table className="mt-6 w-full">
                <caption className="sr-only">
                  Annual cost of one in-house recruiter and their sourcing stack
                </caption>
                <tbody>
                  {RECRUITER_STACK.map((line) => (
                    <tr key={line.label} className="border-b border-line-inner">
                      <th
                        scope="row"
                        className="py-3 pr-4 text-left text-[14.5px] font-normal text-body"
                      >
                        {line.label}
                        <span className="ml-2 text-[12px] text-muted">
                          {line.note}
                        </span>
                      </th>
                      <td className="py-3 text-right text-[14.5px] font-semibold whitespace-nowrap text-body tabular">
                        {formatUsd(line.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <span className="text-[13px] font-semibold text-ink">
                  Before a single agency fee
                </span>
                <span className="font-display text-[clamp(30px,4vw,42px)] leading-none text-decline tabular">
                  {formatUsd(RECRUITER_TOTAL)}
                </span>
              </div>

              {/* The other path, promoted out of the footnote: readers kept
                  missing the placement-fee comparison entirely. Same 20% the
                  sales calls quote; the calculator's agency mode uses it as
                  its default, so the two surfaces agree. */}
              <div className="mt-5 rounded-card border border-line bg-surface p-4">
                <p className="text-[13px] leading-[1.6] text-secondary">
                  <span className="font-semibold text-ink">
                    Or skip the hire and pay agencies instead:
                  </span>{" "}
                  about 20% of salary per placement. That&rsquo;s $18,000 on
                  one $90,000 role, and again on the next, with no cap.
                </p>
              </div>
            </div>
          </Reveal>

          {/* The alternative, stated without a price */}
          <Reveal delay={100}>
            <div className="flex h-full flex-col justify-center rounded-hero border border-gold-line bg-gold-tint p-6 sm:p-8">
              {/* The brand lockup, not an eyebrow: this is the answer to the
                  column on the left, so it carries the mark at full size. */}
              <div className="flex items-baseline gap-2.5">
                <span className="text-[11.5px] font-bold tracking-[0.06em] text-gold-deep uppercase">
                  With
                </span>
                <span className="relative">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-[2px] h-[9px] bg-gold/25"
                  />
                  <Wordmark size="lg" className="relative" />
                </span>
              </div>
              <p className="mt-6 font-display text-[clamp(28px,3.8vw,40px)] leading-[1.12] text-ink text-balance">
                All of it. One platform.
              </p>
              <p className="mt-4 text-[15px] leading-[1.65] text-body">
                Sourcing, enrichment, outreach, screening, scheduling, and a
                dedicated recruiter who runs your searches. Everything in
                that column, in one place, for one monthly price.
              </p>

              <p className="mt-6 border-t border-gold-line pt-5 text-[13.5px] leading-[1.6] text-gold-deep">
                Priced by the roles you have open, not the people you hire.
              </p>

              <div className="mt-7 flex flex-col gap-2">
                <Button href="/pricing" size="lg" className="w-full justify-center">
                  See what it costs
                </Button>
                <Button href={CTA_HREF} variant="ghost" size="sm">
                  Book a demo →
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <p className="mx-auto mt-8 max-w-[74ch] text-center text-[12px] leading-[1.6] text-muted">
            Illustrative, using conservative published figures: {COST_SOURCES}{" "}
            Agency fees, at 18% to 25% of salary per placement, sit on top of
            the left column and are not counted in it.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
