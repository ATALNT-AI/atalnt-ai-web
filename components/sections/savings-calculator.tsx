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
  value,
  min,
  max,
  step,
  display,
  valueText,
  onChange,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={`slider-${label}`}
          className="text-[13.5px] font-medium text-secondary"
        >
          {label}
        </label>
        <output
          htmlFor={`slider-${label}`}
          className="font-display text-[22px] leading-none text-ink tabular"
        >
          {display}
        </output>
      </div>
      <input
        id={`slider-${label}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={valueText}
        onChange={(e) => onChange(Number(e.target.value))}
        // Gold-filled track to the left of the thumb, line to the right.
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
  const [hires, setHires] = useState<number>(CALC_DEFAULTS.hiresPerYear);
  const [salary, setSalary] = useState<number>(CALC_DEFAULTS.averageSalary);
  const [fee, setFee] = useState<number>(CALC_DEFAULTS.agencyFeePct);

  const roi = useMemo(
    () =>
      computeRoi({
        hiresPerYear: hires,
        averageSalary: salary,
        agencyFeePct: fee,
      }),
    [hires, salary, fee]
  );

  // The ATALNT bar's width as a share of the contingent bar.
  const atalntShare = Math.round(
    ((roi.atalntLow + roi.atalntHigh) / 2 / roi.contingentAnnual) * 100
  );

  const perHireLow = roi.atalntLow / Math.max(1, hires);
  const perHireHigh = roi.atalntHigh / Math.max(1, hires);

  const quoteHref = `${CTA_HREF}?hires=${hires}&salary=${salary}&fee=${fee}`;

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
            subtitle="Move the sliders to match your hiring plan. This is the same math your CFO will do."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-14 grid max-w-[1080px] gap-10 rounded-hero border border-line bg-bone p-6 shadow-raised sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* ---- inputs ---- */}
            <div className="flex flex-col gap-8">
              <Slider
                label="Hires per year"
                value={hires}
                min={1}
                max={40}
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
                  At {fee}% of {formatUsd(salary)}, every single placement costs
                  you{" "}
                  <strong className="font-semibold">
                    {formatUsd(roi.feePerHire)}
                  </strong>
                  . Your plan is priced by how many roles you run at once, not
                  by how many people you hire.
                </p>
              </div>
            </div>

            {/* ---- output ---- */}
            <div className="flex flex-col justify-center">
              <p className="text-[13.5px] font-medium text-secondary">
                You could keep
              </p>
              <p className="mt-2 font-display text-[clamp(44px,7vw,76px)] leading-[1.02] text-ink tabular">
                {formatUsd(roi.savingsLow)}
                <span className="text-muted">–</span>
                {formatUsd(roi.savingsHigh)}
              </p>
              <div className="mt-4">
                <BadgePill tone="gold">
                  50–70% below contingent search
                </BadgePill>
              </div>

              <div className="mt-10 flex flex-col gap-5">
                {/* contingent */}
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

                {/* atalnt */}
                <div>
                  <div className="flex items-baseline justify-between gap-3 text-[13px]">
                    <span className="font-medium text-secondary">
                      With ATALNT AI
                    </span>
                    <span className="font-semibold text-ink tabular">
                      {formatUsd(roi.atalntLow)}–{formatUsd(roi.atalntHigh)}
                    </span>
                  </div>
                  <div className="mt-2 h-11 w-full rounded-pill bg-line-inner">
                    <div
                      className="h-full rounded-pill border-r-[3px] border-gold bg-ink transition-[width] duration-500 ease-out"
                      style={{ width: `${atalntShare}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Cost per hire is the number an HR leader reports upward, and
                  it's where the volume argument lands hardest. */}
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
                    {formatUsd(perHireLow)}–{formatUsd(perHireHigh)}
                  </span>
                </div>
                <p className="mt-3 text-[13px] leading-[1.6] text-secondary">
                  Spread across {hires} hires. Because the price is flat, this
                  number keeps dropping every time you fill another role.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={quoteHref} size="lg" variant="primary">
                  Get your exact number
                </Button>
                <p className="text-[12.5px] leading-[1.5] text-muted">
                  We&rsquo;ll price it to your roles and put it in writing.
                </p>
              </div>

              <p className="mt-6 border-t border-line pt-5 text-[12px] leading-[1.6] text-muted">
                Estimates only. Agency fees vary by role and market. ATALNT AI
                pricing is confirmed on your walkthrough, and the savings range
                reflects typical accounts rather than a guarantee.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
