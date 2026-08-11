import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { PAINS } from "@/lib/content/home";
import { formatUsd } from "@/lib/roi";

/**
 * Illustrative, not a client. Roles are deliberately sector-neutral: the ICP
 * is any team hiring at volume, and freight-specific rows would read as a
 * logistics point solution.
 */
const LEDGER = [
  { role: "Operations Manager", salary: 95_000, fee: 0.2 },
  { role: "Controller", salary: 125_000, fee: 0.2 },
  { role: "Account Executive", salary: 85_000, fee: 0.2 },
  { role: "Project Manager", salary: 105_000, fee: 0.2 },
];

const TOTAL = LEDGER.reduce((sum, r) => sum + r.salary * r.fee, 0);

/** Depicted scenario. Never present these day counts as an industry statistic. */
const AGING = [
  { role: "Operations Manager", days: 47 },
  { role: "Controller", days: 62 },
  { role: "Project Manager", days: 88 },
];

export function Problem() {
  return (
    <Section bg="ink" size="lg" aria-labelledby="problem-heading">
      <div
        aria-hidden
        className="glow-gold pointer-events-none absolute top-0 right-0 size-[560px] opacity-30"
      />
      <Container className="relative">
        <Reveal>
          <SectionHeader
            id="problem-heading"
            tone="dark"
            eyebrow="What's actually happening"
            title="You're not short on candidates. You're short on capacity."
            subtitle="Three things are true at once for almost every team hiring at volume, and they compound in this order."
          />
        </Reveal>

        <ol className="mt-16 flex flex-col gap-px overflow-hidden rounded-hero border border-ink-line bg-ink-line">
          {PAINS.map((p, i) => (
            <Reveal key={p.n} as="li" delay={i * 100}>
              <div className="bg-ink-raised p-7 sm:p-9">
                <div className="grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-10">
                  <span
                    aria-hidden
                    className="font-display text-[28px] leading-none text-gold"
                  >
                    {p.n}
                  </span>

                  <div className="max-w-[52ch]">
                    <h3 className="text-[clamp(22px,2.6vw,30px)] text-on-dark text-balance">
                      {p.title}
                    </h3>
                    <p className="mt-3.5 text-[15.5px] leading-[1.7] text-on-dark/70">
                      {p.body}
                    </p>
                  </div>

                  {/* Pain 01: reqs aging. */}
                  {i === 0 && (
                    <ul className="flex w-full shrink-0 flex-col gap-2 lg:w-[248px]">
                      {AGING.map((r) => (
                        <li
                          key={r.role}
                          className="flex items-center justify-between gap-3 rounded-card border border-ink-line bg-ink px-3.5 py-2.5"
                        >
                          <span className="truncate text-[12.5px] text-on-dark-muted">
                            {r.role}
                          </span>
                          <span className="shrink-0 text-[12.5px] font-bold text-decline-mid tabular">
                            {r.days}d open
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Pain 02: the fee ledger. */}
                  {i === 1 && (
                    <div className="w-full shrink-0 rounded-card border border-ink-line bg-ink p-4 lg:w-[248px]">
                      <table className="w-full">
                        <caption className="sr-only">
                          Four illustrative placements and the agency fee for
                          each
                        </caption>
                        <tbody>
                          {LEDGER.map((r) => (
                            <tr key={r.role}>
                              <th
                                scope="row"
                                className="py-1.5 pr-3 text-left text-[12px] font-normal text-on-dark-muted"
                              >
                                {r.role}
                              </th>
                              <td className="py-1.5 text-right text-[12.5px] font-semibold whitespace-nowrap text-on-dark tabular">
                                {formatUsd(r.salary * r.fee)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="rule-dashed my-3 opacity-30" />
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[10.5px] font-bold tracking-[0.06em] text-on-dark-muted uppercase">
                          Four hires
                        </span>
                        <span className="font-display text-[24px] leading-none text-decline-mid tabular">
                          {formatUsd(TOTAL)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <p className="mt-6 text-[12px] text-on-dark-muted">
            Figures above are illustrative, based on a 20% fee.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
