"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { BadgePill } from "@/components/ui/badge-pill";
import { Reveal } from "@/components/motion/reveal";
import { computeRoi, formatUsd } from "@/lib/roi";
import { CALC_DEFAULTS, CTA_HREF } from "@/lib/site";

type SliderProps = {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  valueText: string;
  onChange: (n: number) => void;
};

function Slider({
  label,
  hint,
  value,
  min,
  max,
  step,
  display,
  valueText,
  onChange,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const id = `slider-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[13.5px] font-medium text-secondary">
          {label}
        </label>
        <output
          htmlFor={id}
          className="font-display text-[22px] leading-none text-ink tabular"
        >
          {display}
        </output>
      </div>
      {hint && <p className="mt-1 text-[12px] text-muted">{hint}</p>}
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
        className="mt-3.5 h-1.5 w-full cursor-pointer appearance-none rounded-pill outline-offset-4
          [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-pill [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-gold [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:shadow-lift
          [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-pill
          [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gold
          [&::-moz-range-thumb]:bg-white"
      />
    </div>
  );
}

export function SavingsCalculator() {
  const [roles, setRoles] = useState<number>(CALC_DEFAULTS.activeRoles);
  const [hires, setHires] = useState<number>(CALC_DEFAULTS.hiresPerYear);
  const [salary, setSalary] = useState<number>(CALC_DEFAULTS.averageSalary);
  const [fee, setFee] = useState<number>(CALC_DEFAULTS.agencyFeePct);

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

  const quoteHref = `${CTA_HREF}?roles=${roles}&hires=${hires}&salary=${salary}&fee=${fee}`;

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
            eyebrow="The cost offset"
            title="Run your own numbers."
            subtitle="Your plan is set by how many roles you run at once. Your agency bill is set by how many people you hire. That gap is the whole point."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-14 grid max-w-[1080px] gap-10 rounded-hero border border-line bg-bone p-6 shadow-raised sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* ---- inputs ---- */}
            <div className="flex flex-col gap-7">
              <Slider
                label="Roles open at once"
                hint="This sets your plan"
                value={roles}
                min={1}
                max={20}
                step={1}
                display={roles >= 20 ? "20+" : String(roles)}
                valueText={`${roles} roles open at once`}
                onChange={setRoles}
              />
              <Slider
                label="Hires per year"
                hint="This sets your agency bill"
                value={hires}
                min={1}
                max={50}
                step={1}
                display={String(hires)}
                valueText={`${hires} hires per year`}
                onChange={setHires}
              />
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

              <div className="rounded-card border border-gold-line bg-gold-tint p-4">
                <p className="text-[13px] leading-[1.6] text-gold-deep">
                  At {roles} {roles === 1 ? "role" : "roles"} open at once,
                  you&rsquo;d be on{" "}
                  <strong className="font-semibold">
                    {roi.plan.name}
                    {roi.plan.monthly
                      ? ` at ${formatUsd(roi.plan.monthly)} a month`
                      : ", priced to your setup"}
                  </strong>
                  . Fill one and the next takes its place, at no extra cost.
                </p>
              </div>
            </div>

            {/* ---- output ---- */}
            <div className="flex flex-col justify-center">
              {roi.agencyIsCheaper ? (
                /* The honest case. At low volume, agencies genuinely win. */
                <div className="rounded-hero border border-line bg-surface p-6">
                  <BadgePill tone="neutral">Straight answer</BadgePill>
                  <p className="mt-4 font-display text-[26px] leading-[1.25] text-ink text-balance">
                    At {hires} {hires === 1 ? "hire" : "hires"} a year, an
                    agency is cheaper. We&rsquo;d tell you that on the call.
                  </p>
                  <p className="mt-4 text-[15px] leading-[1.7] text-secondary">
                    Paying per placement makes sense when you hire rarely.
                    ATALNT AI starts paying off at{" "}
                    <strong className="font-semibold text-ink">
                      {roi.breakEvenHires} hires a year
                    </strong>{" "}
                    on this plan, and every hire after that is close to free.
                  </p>
                  <p className="mt-4 text-[15px] leading-[1.7] text-secondary">
                    Move the hires slider up to where you actually expect to
                    land this year.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-[13.5px] font-medium text-secondary">
                    You keep
                  </p>
                  <p className="mt-2 font-display text-[clamp(46px,7.5vw,80px)] leading-[1.02] text-ink tabular">
                    {formatUsd(roi.savingsAnnual)}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <BadgePill tone="gold">
                      {Math.round(roi.savingsPct * 100)}% below contingent
                      search
                    </BadgePill>
                    {roi.isEstimate && (
                      <BadgePill tone="neutral">Estimate</BadgePill>
                    )}
                  </div>

                  <div className="mt-9 flex flex-col gap-5">
                    <div>
                      <div className="flex items-baseline justify-between gap-3 text-[13px]">
                        <span className="font-medium text-secondary">
                          Contingent search today
                        </span>
                        <span className="font-semibold text-decline tabular">
                          {formatUsd(roi.contingentAnnual)}
                        </span>
                      </div>
                      <div className="mt-2 h-11 w-full rounded-pill border-l-[3px] border-decline bg-decline-tint" />
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-3 text-[13px]">
                        <span className="font-medium text-secondary">
                          ATALNT AI {roi.plan.name}
                        </span>
                        <span className="font-semibold text-ink tabular">
                          {formatUsd(roi.atalntAnnual)}
                        </span>
                      </div>
                      <div className="mt-2 h-11 w-full rounded-pill bg-line-inner">
                        <div
                          className="h-full min-w-[6px] rounded-pill border-r-[3px] border-gold bg-ink transition-[width] duration-500 ease-out"
                          style={{ width: `${share}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 rounded-card border border-line bg-surface p-5">
                    <p className="text-[11.5px] font-bold tracking-[0.06em] text-eyebrow uppercase">
                      Your cost per hire
                    </p>
                    <div className="mt-3.5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                      <span className="font-display text-[26px] leading-none text-decline line-through decoration-decline-mid/60 tabular">
                        {formatUsd(roi.costPerHireContingent)}
                      </span>
                      <span aria-hidden className="text-[18px] text-muted">
                        →
                      </span>
                      <span className="font-display text-[34px] leading-none text-success tabular">
                        {formatUsd(roi.costPerHireAtalnt)}
                      </span>
                    </div>
                    <p className="mt-3 text-[13px] leading-[1.6] text-secondary">
                      Spread across {hires} {hires === 1 ? "hire" : "hires"}.
                      The price is flat, so this keeps falling every time you
                      fill another role.
                    </p>
                  </div>
                </>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={quoteHref} size="lg" variant="primary">
                  Get this in writing
                </Button>
                <Button href="/pricing" variant="ghost" size="sm">
                  See all plans →
                </Button>
              </div>

              <p className="mt-6 border-t border-line pt-5 text-[12px] leading-[1.6] text-muted">
                Estimates only. Agency fees vary by role and market, and your
                actual plan depends on how many roles you run at once. Enterprise
                pricing is quoted, so figures above that tier are indicative.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
