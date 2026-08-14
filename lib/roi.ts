import { monthlyFor, planForRoles, type Plan } from "./pricing";
import { inHouseAnnual } from "./recruiter-cost";

/**
 * Which comparison applies to the reader.
 *
 * The site used to argue only one of these, and it argued a different one on
 * each page: the home page ledger compares against an in-house recruiter, the
 * pricing calculator compared against agency fees. A visitor who already had a
 * recruiter got measured against a cost they might not carry, and a visitor
 * about to hire one never saw that math where they decide.
 *
 * Both arguments are true. Which one lands depends entirely on where the
 * reader is standing, so let them say.
 */
export type RoiMode = "no-recruiter" | "has-recruiter";

/**
 * Below this many roles running at once, nobody hires a full-time recruiter,
 * so comparing against one would be flattering rather than honest. The UI says
 * so instead of showing a number.
 */
export const MIN_ROLES_FOR_IN_HOUSE = 3;

export type RoiInput = {
  mode: RoiMode;
  /** Roles open at the same time. This is what sets the plan. */
  activeRoles: number;
  /** Hires completed in a year. This is what sets the agency bill. */
  hiresPerYear: number;
  averageSalary: number;
  agencyFeePct: number;
  /** What they would pay the recruiter they are about to hire. */
  recruiterSalary: number;
};

export type RoiResult = {
  mode: RoiMode;
  plan: Plan;
  atalntAnnual: number;
  /** What the reader spends a year today, under whichever comparison applies. */
  comparisonAnnual: number;
  /** What to call that spend on the chart. */
  comparisonLabel: string;
  savingsAnnual: number;
  /** 0..1. Negative when the subscription costs more. */
  savingsPct: number;
  /** True when the thing we are compared against is genuinely the cheaper option. */
  alternativeIsCheaper: boolean;
  /** True when the plan price is quoted rather than published. */
  isEstimate: boolean;

  /** Agency mode. Both are zero when there are no hires to divide by. */
  feePerHire: number;
  costPerHireAtalnt: number;
  /** Hires per year at which the subscription starts winning. */
  breakEvenHires: number;
};

/**
 * Honest by construction: when the numbers favour the alternative, this returns
 * a negative saving and sets `alternativeIsCheaper`. The UI must say so out
 * loud rather than hiding it. A calculator that admits when it loses is worth
 * far more than one that always shows a win.
 */
export function computeRoi(input: RoiInput): RoiResult {
  const {
    mode,
    activeRoles,
    hiresPerYear,
    averageSalary,
    agencyFeePct,
    recruiterSalary,
  } = input;

  const plan = planForRoles(activeRoles);
  const atalntAnnual = monthlyFor(plan) * 12;

  const feePerHire = averageSalary * (agencyFeePct / 100);
  const contingentAnnual = feePerHire * hiresPerYear;

  const comparisonAnnual =
    mode === "no-recruiter" ? inHouseAnnual(recruiterSalary) : contingentAnnual;

  const comparisonLabel =
    mode === "no-recruiter" ? "Hiring in-house" : "Agencies today";

  const savingsAnnual = comparisonAnnual - atalntAnnual;

  return {
    mode,
    plan,
    atalntAnnual,
    comparisonAnnual,
    comparisonLabel,
    savingsAnnual,
    savingsPct: comparisonAnnual > 0 ? savingsAnnual / comparisonAnnual : 0,
    alternativeIsCheaper: savingsAnnual <= 0,
    isEstimate: plan.monthly === null,

    feePerHire,
    costPerHireAtalnt: atalntAnnual / Math.max(1, hiresPerYear),
    // Guard the divide: the fee slider can't reach zero today, but a zero here
    // would put Infinity on the page.
    breakEvenHires: feePerHire > 0 ? Math.ceil(atalntAnnual / feePerHire) : 0,
  };
}

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const formatUsd = (n: number) => USD.format(Math.round(n));

/** Compact form for headline numerals: $158,400 → $158k */
export function formatUsdCompact(n: number) {
  const v = Math.round(Math.abs(n));
  const sign = n < 0 ? "-" : "";
  if (v >= 1_000_000) return `${sign}$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 10_000) return `${sign}$${Math.round(v / 1000)}k`;
  return sign + USD.format(v);
}
