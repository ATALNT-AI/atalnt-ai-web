"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { BadgePill } from "@/components/ui/badge-pill";
import { Reveal } from "@/components/motion/reveal";
import { computeRoi, formatUsd } from "@/lib/roi";
import { CTA_HREF } from "@/lib/site";

/**
 * One question: how many hires this year? Everything else is derived, with
 * salary and fee tucked behind a disclosure for the people who want to tune
 * them. Concurrent roles are estimated at roughly one active role per three
 * hires a year, which maps a hiring pace onto a plan without asking a second
 * question.
 */
const rolesForHires = (hires: number) => Math.max(1, Math.ceil(hires / 3));

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  valueText: string;
  onChange: (n: number) => void;
  big?: boolean;
};

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  valueText,
  onChange,
  big = false,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const id = `slider-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className={
            big
              ? "text-[15px] font-semibold text-ink"
              : "text-[13.5px] font-medium text-secondary"
          }
        >
          {label}
        </label>
        <output
          htmlFor={id}
          className={
            big
              ? "font-display text-[34px] leading-none text-gold-ink tabular"
              : "font-display text-[20px] leading-none text-ink tabular"
          }
        >
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={valueText}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(90deg, var(--color-gold) 0%, var(--color-gold) ${pct}%, var(--color-line-input) ${pct}%, var(--color-line-input) 100%)`,
        }}
        className={`mt-3.5 w-full cursor-pointer appearance-none rounded-pill outline-offset-4 ${big ? "h-2" : "h-1.5"}
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-pill
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gold
          [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lift
          ${big ? "[&::-webkit-slider-thumb]:size-6" : "[&::-webkit-slider-thumb]:size-5"}
          [&::-moz-range-thumb]:rounded-pill [&::-moz-range-thumb]:border-2
          [&::-moz-range-thumb]:border-gold [&::-moz-range-thumb]:bg-white
          ${big ? "[&::-moz-range-thumb]:size-6" : "[&::-moz-range-thumb]:size-5"}`}
      />
    </div>
  );
}

export function SavingsCalculator() {
  const [hires, setHires] = useState<number>(12);
  const [salary, setSalary] = useState<number>(90_000);
  const [fee, setFee] = useState<number>(22);
  const [showDetails, setShowDetails] = useState(false);

  const roles = rolesForHires(hires);

  const roi = useMemo(
    () =>
      computeRoi({
        activeRoles: roles,
        hiresPerYear: hires,
        averageSalary: salary,
        agencyFeePct: fee,
      }),
    [roles, hires, salary, fee]
  );

  const share = Math.min(
    100,
    Math.round((roi.atalntAnnual / Math.max(1, roi.contingentAnnual)) * 100)
  );

  return (
    <Section
      bg="surface"
      size="lg"
      bordered
      id="savings"
      aria-labelledby="savings-heading"
    >
      <Container>
        <Reveal>
          <SectionHeader
            id="savings-heading"
            align="center"
            eyebrow="What are you really paying for?"
            title="Job boards. Recruiters. Tools. More tools."
            subtitle="Recruiter salaries and bonuses, job posts, enrichment, outreach, sourcing and screening tools. The costs add up quickly. ATALNT AI brings the recruiting workflow together in one platform, combining AI-powered sourcing with human recruiting expertise."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-14 max-w-[880px] rounded-hero border border-line bg-bone p-6 shadow-raised sm:p-10">
            <Slider
              big
              label="How many hires this year?"
              value={hires}
              min={1}
              max={50}
              step={1}
              display={String(hires)}
              valueText={`${hires} hires this year`}
              onChange={setHires}
            />
            <p className="mt-3 text-[13px] text-muted">
              That&rsquo;s about {roles} {roles === 1 ? "role" : "roles"} running
              at a time, which puts you on{" "}
              <strong className="font-semibold text-gold-deep">
                {roi.plan.name}
                {roi.plan.monthly
                  ? ` at ${formatUsd(roi.plan.monthly)}/mo`
                  : ", priced to your setup"}
              </strong>
              .
            </p>

            <div className="rule-dashed my-7" />

            {roi.agencyIsCheaper ? (
              <div className="rounded-card border border-line bg-surface p-6">
                <BadgePill tone="neutral">Straight answer</BadgePill>
                <p className="mt-3 font-display text-[24px] leading-[1.3] text-ink text-balance">
                  At {hires} {hires === 1 ? "hire" : "hires"} a year, an agency
                  is cheaper. We&rsquo;d tell you that on the call.
                </p>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-secondary">
                  The subscription starts winning at about{" "}
                  <strong className="font-semibold text-ink">
                    {roi.breakEvenHires} hires a year
                  </strong>
                  . Drag the slider to where you actually expect to land.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-[1.1fr_0.9fr] sm:items-center">
                <div>
                  <p className="text-[13.5px] font-medium text-secondary">
                    You keep
                  </p>
                  <p className="mt-1.5 font-display text-[clamp(40px,6vw,64px)] leading-[1.02] text-ink tabular">
                    {formatUsd(roi.savingsAnnual)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <BadgePill tone="gold">
                      {Math.round(roi.savingsPct * 100)}% less than agencies
                    </BadgePill>
                    {roi.isEstimate && (
                      <BadgePill tone="neutral">Estimate</BadgePill>
                    )}
                  </div>

                  <div className="mt-7 flex flex-col gap-4">
                    <div>
                      <div className="flex items-baseline justify-between text-[12.5px]">
                        <span className="text-secondary">Agencies today</span>
                        <span className="font-semibold text-decline tabular">
                          {formatUsd(roi.contingentAnnual)}
                        </span>
                      </div>
                      <div className="mt-1.5 h-8 rounded-pill border-l-[3px] border-decline bg-decline-tint" />
                    </div>
                    <div>
                      <div className="flex items-baseline justify-between text-[12.5px]">
                        <span className="text-secondary">
                          ATALNT AI {roi.plan.name}
                        </span>
                        <span className="font-semibold text-ink tabular">
                          {formatUsd(roi.atalntAnnual)}
                        </span>
                      </div>
                      <div className="mt-1.5 h-8 rounded-pill bg-line-inner">
                        <div
                          className="h-full min-w-[6px] rounded-pill border-r-[3px] border-gold bg-ink transition-[width] duration-500 ease-out"
                          style={{ width: `${share}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-card border border-line bg-surface p-5">
                  <p className="text-[11.5px] font-bold tracking-[0.06em] text-eyebrow uppercase">
                    Cost per hire
                  </p>
                  <p className="mt-3 font-display text-[24px] leading-none text-decline line-through decoration-decline-mid/60 tabular">
                    {formatUsd(roi.costPerHireContingent)}
                  </p>
                  <p className="mt-2 font-display text-[38px] leading-none text-success tabular">
                    {formatUsd(roi.costPerHireAtalnt)}
                  </p>
                  <p className="mt-3 text-[12.5px] leading-[1.6] text-secondary">
                    And it keeps falling with every extra hire, because the
                    price doesn&rsquo;t move.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={CTA_HREF} size="lg">
                Book a demo
              </Button>
              <Button href="/pricing" variant="ghost" size="sm">
                See plans →
              </Button>
              <button
                type="button"
                onClick={() => setShowDetails((v) => !v)}
                aria-expanded={showDetails}
                className="py-2 text-left text-[13px] font-semibold text-secondary underline-offset-4 hover:text-ink hover:underline sm:ml-auto"
              >
                {showDetails ? "Hide assumptions" : "Adjust assumptions"}
              </button>
            </div>

            {showDetails && (
              <div className="mt-6 grid gap-6 rounded-card border border-line-inner bg-surface p-5 sm:grid-cols-2">
                <Slider
                  label="Average first-year salary"
                  value={salary}
                  min={50_000}
                  max={250_000}
                  step={5_000}
                  display={formatUsd(salary)}
                  valueText={`${formatUsd(salary)} average salary`}
                  onChange={setSalary}
                />
                <Slider
                  label="Agency fee"
                  value={fee}
                  min={15}
                  max={30}
                  step={1}
                  display={`${fee}%`}
                  valueText={`${fee} percent agency fee`}
                  onChange={setFee}
                />
              </div>
            )}

            <p className="mt-6 border-t border-line pt-4 text-[11.5px] leading-[1.6] text-muted">
              Estimates only. Assumes {formatUsd(salary)} average salary and a{" "}
              {fee}% agency fee. Your plan depends on how many roles you run at
              once; pricing above 10 roles is quoted.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
