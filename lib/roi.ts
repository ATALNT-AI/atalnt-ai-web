import { monthlyFor, planForRoles, type Plan } from "./pricing";

export type RoiInput = {
  /** Roles open at the same time. This is what sets the plan. */
  activeRoles: number;
  /** Hires completed in a year. This is what sets the agency bill. */
  hiresPerYear: number;
  averageSalary: number;
  agencyFeePct: number;
};

export type RoiResult = {
  plan: Plan;
  feePerHire: number;
  contingentAnnual: number;
  atalntAnnual: number;
  savingsAnnual: number;
  /** 0..1. Negative when the subscription costs more than agency fees. */
  savingsPct: number;
  costPerHireContingent: number;
  costPerHireAtalnt: number;
  /** Hires per year at which the subscription starts winning. */
  breakEvenHires: number;
  /** True when ATALNT is genuinely the more expensive option. */
  agencyIsCheaper: boolean;
  /** True when the plan price is quoted rather than published. */
  isEstimate: boolean;
};

/**
 * Honest by construction: when the numbers favour agencies, this returns a
 * negative saving and sets `agencyIsCheaper`. The UI must say so out loud
 * rather than hiding it. A calculator that admits when it loses is worth far
 * more than one that always shows a win.
 */
export function computeRoi(input: RoiInput): RoiResult {
  const { activeRoles, hiresPerYear, averageSalary, agencyFeePct } = input;

  const plan = planForRoles(activeRoles);
  const atalntAnnual = monthlyFor(plan) * 12;

  const feePerHire = averageSalary * (agencyFeePct / 100);
  const contingentAnnual = feePerHire * hiresPerYear;

  const savingsAnnual = contingentAnnual - atalntAnnual;
  const savingsPct = contingentAnnual > 0 ? savingsAnnual / contingentAnnual : 0;

  return {
    plan,
    feePerHire,
    contingentAnnual,
    atalntAnnual,
    savingsAnnual,
    savingsPct,
    costPerHireContingent: feePerHire,
    costPerHireAtalnt: atalntAnnual / Math.max(1, hiresPerYear),
    breakEvenHires: Math.ceil(atalntAnnual / feePerHire),
    agencyIsCheaper: savingsAnnual <= 0,
    isEstimate: plan.monthly === null,
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
