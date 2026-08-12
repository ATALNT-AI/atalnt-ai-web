import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { BadgePill } from "@/components/ui/badge-pill";
import { Reveal } from "@/components/motion/reveal";
import { PLANS } from "@/lib/pricing";
import { formatUsd } from "@/lib/roi";
import { RECRUITER_STACK, RECRUITER_TOTAL, COST_SOURCES } from "@/lib/recruiter-cost";
import { CTA_HREF } from "@/lib/site";

/**
 * The money section, itemized. A single headline number invites doubt; a
 * ledger a CFO can check line by line does the opposite, and it makes the
 * real point: this replaces a recruiter and their whole stack, not one fee.
 */
const GROWTH = PLANS.find((p) => p.id === "growth")!;
const GROWTH_ANNUAL = (GROWTH.monthly ?? 0) * 12;
const SAVINGS = RECRUITER_TOTAL - GROWTH_ANNUAL;
const SAVINGS_PCT = Math.round((SAVINGS / RECRUITER_TOTAL) * 100);

export function ProofStrip() {
  return (
    <Section bg="surface" size="lg" bordered id="savings" aria-labelledby="math-heading">
      <Container>
        <Reveal>
          <SectionHeader
            id="math-heading"
            align="center"
            eyebrow="The math"
            title="One recruiter costs more than the whole platform."
            subtitle="Not one placement fee. A recruiter, their seat licences, their data, and their job boards, against what we charge to run every one of your searches."
          />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-[1000px] gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* The ledger */}
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
            </div>
          </Reveal>

          {/* The answer */}
          <Reveal delay={100}>
            <div className="flex h-full flex-col justify-center rounded-hero border border-gold-line bg-gold-tint p-6 sm:p-8">
              <p className="text-[11.5px] font-bold tracking-[0.06em] text-gold-deep uppercase">
                ATALNT AI {GROWTH.name}, per year
              </p>
              <p className="mt-5 font-display text-[clamp(38px,5.5vw,58px)] leading-none text-ink tabular">
                {formatUsd(GROWTH_ANNUAL)}
              </p>
              <p className="mt-3 text-[14px] leading-[1.6] text-body">
                {GROWTH.rolesLabel.toLowerCase()}, a dedicated account manager,
                and every tool above included.
              </p>

              <div className="mt-6 border-t border-gold-line pt-5">
                <p className="text-[13px] text-gold-deep">You keep</p>
                <p className="mt-1 font-display text-[30px] leading-none text-success tabular">
                  {formatUsd(SAVINGS)}
                </p>
                <div className="mt-3">
                  <BadgePill tone="green">{SAVINGS_PCT}% less</BadgePill>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-2">
                <Button href={CTA_HREF} size="lg" className="w-full justify-center">
                  Book a demo
                </Button>
                <Button href="/pricing" variant="ghost" size="sm">
                  See all plans →
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
