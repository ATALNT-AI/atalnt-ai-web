"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { BadgePill } from "@/components/ui/badge-pill";
import { Reveal } from "@/components/motion/reveal";
import {
  computeRoi,
  formatUsd,
  MIN_ROLES_FOR_IN_HOUSE,
  type RoiMode,
} from "@/lib/roi";
import {
  COST_SOURCES,
  RECRUITER_SALARY,
  RECRUITER_TOOLS_TOTAL,
} from "@/lib/recruiter-cost";
import { CALC_DEFAULTS, CTA_HREF } from "@/lib/site";

/**
 * The status-quo calculator. With pricing quote-only there is no plan price
 * to subtract from, so this stopped being a savings calculator: it puts a
 * number on what the reader pays today, and the CTA offers our number in
 * writing. Their cost is public math; ours is the call.
 */
const MODES: { id: RoiMode; label: string }[] = [
  { id: "no-recruiter", label: "We don't have in-house recruiting yet" },
  {
    id: "has-recruiter",
    label: "We have a recruiter and use agencies for overflow",
  },
];

function ModeToggle({
  mode,
  onChange,
}: {
  mode: RoiMode;
  onChange: (m: RoiMode) => void;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  /** Roving tabindex: one stop for the group, arrows move within it. */
  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const delta =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + MODES.length) % MODES.length;
    onChange(MODES[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div>
      <p
        id="calc-mode-label"
        className="text-[11.5px] font-bold tracking-[0.06em] text-eyebrow uppercase"
      >
        Where are you today?
      </p>
      <div
        role="radiogroup"
        aria-labelledby="calc-mode-label"
        className="mt-3 grid gap-2 sm:grid-cols-2"
      >
        {MODES.map((m, i) => {
          const selected = m.id === mode;
          return (
            <button
              key={m.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(m.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`rounded-card border px-4 py-3.5 text-left text-[14px] leading-[1.4] outline-offset-2 transition-colors duration-150 ${
                selected
                  ? "border-gold-line bg-gold-tint font-semibold text-gold-deep"
                  : "border-line-input bg-surface text-secondary hover:border-line-hover hover:text-ink"
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

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
  const [mode, setMode] = useState<RoiMode>("no-recruiter");
  const [roles, setRoles] = useState<number>(CALC_DEFAULTS.activeRoles);
  const [hires, setHires] = useState<number>(CALC_DEFAULTS.hiresPerYear);
  const [salary, setSalary] = useState<number>(CALC_DEFAULTS.averageSalary);
  const [fee, setFee] = useState<number>(CALC_DEFAULTS.agencyFeePct);
  const [recruiterSalary, setRecruiterSalary] =
    useState<number>(RECRUITER_SALARY);
  const [showDetails, setShowDetails] = useState(false);

  const inHouse = mode === "no-recruiter";

  const roi = useMemo(
    () =>
      computeRoi({
        mode,
        hiresPerYear: hires,
        averageSalary: salary,
        agencyFeePct: fee,
        recruiterSalary,
      }),
    [mode, hires, salary, fee, recruiterSalary]
  );

  /** Below three concurrent roles, nobody hires a full-time recruiter. */
  const tooFewRoles = inHouse && roles < MIN_ROLES_FOR_IN_HOUSE;

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
            eyebrow="The math"
            title="What does hiring cost you today?"
            subtitle="Most teams either build recruiting in-house or pay a fee on every hire. Pick the one that describes you and put a number on it. On the call, we'll put our price in writing next to it."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-14 max-w-[880px] rounded-hero border border-line bg-bone p-6 shadow-raised sm:p-10">
            <ModeToggle mode={mode} onChange={setMode} />

            <div className="rule-dashed my-7" />

            {inHouse ? (
              <Slider
                big
                label="How many roles are open right now?"
                value={roles}
                min={1}
                max={20}
                step={1}
                display={String(roles)}
                valueText={`${roles} roles open at once`}
                onChange={setRoles}
              />
            ) : (
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
            )}

            <div className="rule-dashed my-7" />

            {tooFewRoles ? (
              <div className="rounded-card border border-line bg-surface p-6">
                <BadgePill tone="neutral">Straight answer</BadgePill>
                <p className="mt-3 font-display text-[24px] leading-[1.3] text-ink text-balance">
                  At {roles} {roles === 1 ? "role" : "roles"}, nobody hires a
                  full-time recruiter. Comparing you to one wouldn&rsquo;t be
                  honest.
                </p>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-secondary">
                  The fairer comparison at this size is what an agency would
                  charge per hire. Switch the answer above and see, or just ask
                  us for a number scoped to your roles.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-[1.1fr_0.9fr] sm:items-center">
                <div>
                  <p className="text-[13.5px] font-medium text-secondary">
                    {inHouse
                      ? "One recruiter, fully loaded, per year"
                      : "What agencies bill you this year"}
                  </p>
                  <p className="mt-1.5 font-display text-[clamp(40px,6vw,64px)] leading-[1.02] text-decline tabular">
                    {formatUsd(roi.comparisonAnnual)}
                  </p>
                  {inHouse ? (
                    <p className="mt-4 max-w-[44ch] text-[13.5px] leading-[1.65] text-secondary">
                      Salary and burden, plus{" "}
                      <strong className="font-semibold text-ink tabular">
                        {formatUsd(RECRUITER_TOOLS_TOTAL)}
                      </strong>{" "}
                      a year for the LinkedIn seat, sourcing data, job boards,
                      and tooling the role needs. Before they source a single
                      candidate.
                    </p>
                  ) : (
                    <p className="mt-4 max-w-[44ch] text-[13.5px] leading-[1.65] text-secondary">
                      At {fee}% of a {formatUsd(salary)} salary, that&rsquo;s{" "}
                      <strong className="font-semibold text-ink tabular">
                        {formatUsd(roi.feePerHire)}
                      </strong>{" "}
                      per hire. Your tenth hire costs exactly what your first
                      did.
                    </p>
                  )}
                </div>

                {inHouse ? (
                  /* The bridge: we are not competing with the req, we are
                     competing with the months before that person starts. */
                  <div className="rounded-card border border-line bg-surface p-5">
                    <p className="text-[11.5px] font-bold tracking-[0.06em] text-eyebrow uppercase">
                      While you search
                    </p>
                    <p className="mt-3 font-display text-[32px] leading-none text-ink">
                      90 to 120 days
                    </p>
                    <p className="mt-3 text-[12.5px] leading-[1.6] text-secondary">
                      to hire that recruiter and get them ramped. Your open
                      roles age the whole time, and roughly{" "}
                      <strong className="font-semibold text-ink tabular">
                        {formatUsd(recruiterSalary / 12)}
                      </strong>{" "}
                      a month of approved salary sits unspent. We can work
                      those roles now, and hand the searches over when your
                      recruiter starts.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-card border border-line bg-surface p-5">
                    <p className="text-[11.5px] font-bold tracking-[0.06em] text-eyebrow uppercase">
                      The other model
                    </p>
                    <p className="mt-3 font-display text-[24px] leading-[1.25] text-ink text-balance">
                      One flat monthly price. No fee per hire.
                    </p>
                    <p className="mt-3 text-[12.5px] leading-[1.6] text-secondary">
                      Scoped to how many roles you run at once, so every hire
                      inside it is free at the margin. We&rsquo;ll put the
                      number in writing on the call.
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={CTA_HREF} size="lg">
                Get your price
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
                {inHouse ? (
                  <Slider
                    label="Recruiter salary you'd pay"
                    value={recruiterSalary}
                    min={60_000}
                    max={200_000}
                    step={2_000}
                    display={formatUsd(recruiterSalary)}
                    valueText={`${formatUsd(recruiterSalary)} recruiter salary`}
                    onChange={setRecruiterSalary}
                  />
                ) : (
                  <>
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
                  </>
                )}
              </div>
            )}

            <p className="mt-6 border-t border-line pt-4 text-[11.5px] leading-[1.6] text-muted">
              {inHouse ? (
                <>
                  Estimates only. Assumes a {formatUsd(recruiterSalary)}{" "}
                  recruiter plus 25% payroll burden, and{" "}
                  {formatUsd(RECRUITER_TOOLS_TOTAL)} a year for tools.{" "}
                  {COST_SOURCES} Agency fees sit on top of this and are not
                  counted in it. Your price is quoted to your setup and
                  confirmed in writing.
                </>
              ) : (
                <>
                  Estimates only. Assumes {formatUsd(salary)} average salary
                  and a {fee}% agency fee. Your price is quoted to your setup
                  and confirmed in writing.
                </>
              )}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
