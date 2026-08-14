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
 * Two comparisons, one calculator.
 *
 * Which argument lands depends on where the reader is standing. Someone with no
 * recruiting function is weighing us against building one. Someone who already
 * has a recruiter is weighing us against the fee they pay when that person runs
 * out of hours. Showing only the first reads as "don't hire your recruiter,"
 * which attacks a headcount the buyer usually just fought to win.
 *
 * In agency mode concurrent roles are estimated at roughly one active role per
 * three hires a year, which maps a hiring pace onto a plan without asking a
 * second question. In in-house mode the reader gives us the role count directly,
 * because that is the number they know.
 */
const rolesForHires = (hires: number) => Math.max(1, Math.ceil(hires / 3));

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
  const activeRoles = inHouse ? roles : rolesForHires(hires);

  const roi = useMemo(
    () =>
      computeRoi({
        mode,
        activeRoles,
        hiresPerYear: hires,
        averageSalary: salary,
        agencyFeePct: fee,
        recruiterSalary,
      }),
    [mode, activeRoles, hires, salary, fee, recruiterSalary]
  );

  const share = Math.min(
    100,
    Math.round((roi.atalntAnnual / Math.max(1, roi.comparisonAnnual)) * 100)
  );

  /** Below three concurrent roles, nobody hires a full-time recruiter. */
  const tooFewRoles = inHouse && activeRoles < MIN_ROLES_FOR_IN_HOUSE;
  const straightAnswer = tooFewRoles || roi.alternativeIsCheaper;

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
            eyebrow="The comparison"
            title="Two ways companies pay for recruiting."
            subtitle="Most teams either build the function in-house or pay a fee on every hire. Pick the one that describes you and see what the same year costs on a subscription."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-14 max-w-[880px] rounded-hero border border-line bg-bone p-6 shadow-raised sm:p-10">
            <ModeToggle mode={mode} onChange={setMode} />

            <div className="rule-dashed my-7" />

            {inHouse ? (
              <>
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
                <p className="mt-3 text-[13px] text-muted">
                  That puts you on{" "}
                  <strong className="font-semibold text-gold-deep">
                    {roi.plan.name}
                    {roi.plan.monthly
                      ? ` at ${formatUsd(roi.plan.monthly)}/mo`
                      : ", priced to your setup"}
                  </strong>
                  .
                </p>
              </>
            ) : (
              <>
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
                  Your team can properly work about three searches at a time, so
                  that&rsquo;s roughly {activeRoles}{" "}
                  {activeRoles === 1 ? "role" : "roles"} running at once, which
                  puts you on{" "}
                  <strong className="font-semibold text-gold-deep">
                    {roi.plan.name}
                    {roi.plan.monthly
                      ? ` at ${formatUsd(roi.plan.monthly)}/mo`
                      : ", priced to your setup"}
                  </strong>
                  .
                </p>
              </>
            )}

            <div className="rule-dashed my-7" />

            {straightAnswer ? (
              <div className="rounded-card border border-line bg-surface p-6">
                <BadgePill tone="neutral">Straight answer</BadgePill>
                {tooFewRoles ? (
                  <>
                    <p className="mt-3 font-display text-[24px] leading-[1.3] text-ink text-balance">
                      At {activeRoles} {activeRoles === 1 ? "role" : "roles"},
                      nobody hires a full-time recruiter. Comparing us to one
                      wouldn&rsquo;t be honest.
                    </p>
                    <p className="mt-3 text-[14.5px] leading-[1.7] text-secondary">
                      Core still covers you at{" "}
                      <strong className="font-semibold text-ink">
                        {formatUsd(roi.plan.monthly ?? 0)} a month
                      </strong>
                      , and the fairer comparison is what an agency would charge
                      on those roles. Switch the answer above and see.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-3 font-display text-[24px] leading-[1.3] text-ink text-balance">
                      At {hires} {hires === 1 ? "hire" : "hires"} a year, an
                      agency is cheaper. We&rsquo;d tell you that on the call.
                    </p>
                    <p className="mt-3 text-[14.5px] leading-[1.7] text-secondary">
                      The subscription starts winning at about{" "}
                      <strong className="font-semibold text-ink">
                        {roi.breakEvenHires} hires a year
                      </strong>
                      . Drag the slider to where you actually expect to land.
                    </p>
                  </>
                )}
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
                      {Math.round(roi.savingsPct * 100)}% less than{" "}
                      {inHouse ? "building it in-house" : "agencies"}
                    </BadgePill>
                    {roi.isEstimate && (
                      <BadgePill tone="neutral">Estimate</BadgePill>
                    )}
                  </div>

                  <div className="mt-7 flex flex-col gap-4">
                    <div>
                      <div className="flex items-baseline justify-between text-[12.5px]">
                        <span className="text-secondary">
                          {roi.comparisonLabel}
                        </span>
                        <span className="font-semibold text-decline tabular">
                          {formatUsd(roi.comparisonAnnual)}
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

                {inHouse ? (
                  /* The bridge. This is what keeps the in-house comparison from
                     reading as "don't hire your recruiter": we are not
                     competing with the req, we are competing with the months
                     before that person starts. */
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
                      a month of approved salary sits unspent. We can work those
                      roles now, and hand the searches over when your recruiter
                      starts.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-card border border-line bg-surface p-5">
                    <p className="text-[11.5px] font-bold tracking-[0.06em] text-eyebrow uppercase">
                      Cost per hire
                    </p>
                    <p className="mt-3 font-display text-[24px] leading-none text-decline line-through decoration-decline-mid/60 tabular">
                      {formatUsd(roi.feePerHire)}
                    </p>
                    <p className="mt-2 font-display text-[38px] leading-none text-success tabular">
                      {formatUsd(roi.costPerHireAtalnt)}
                    </p>
                    <p className="mt-3 text-[12.5px] leading-[1.6] text-secondary">
                      And it keeps falling with every extra hire, because the
                      price doesn&rsquo;t move.
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={CTA_HREF} size="lg">
                Book a demo
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
                  {formatUsd(RECRUITER_TOOLS_TOTAL)} a year for the LinkedIn
                  seat, sourcing data, job boards, and tooling that role needs.{" "}
                  {COST_SOURCES} Agency fees sit on top of this and are not
                  counted in it. Pricing above 10 roles is quoted.
                </>
              ) : (
                <>
                  Estimates only. Assumes {formatUsd(salary)} average salary and
                  a {fee}% agency fee. Your plan depends on how many roles you
                  run at once; pricing above 10 roles is quoted.
                </>
              )}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
