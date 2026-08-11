import { CALC_DEFAULTS } from "./site";

export type RoiInput = {
  hiresPerYear: number;
  averageSalary: number;
  agencyFeePct: number;
};

export type RoiResult = {
  /** Fee for a single placement at these inputs. */
  feePerHire: number;
  /** What contingent search costs you across a year. */
  contingentAnnual: number;
  /** Low/high bound of what you'd spend with ATALNT AI. */
  atalntLow: number;
  atalntHigh: number;
  /** Low/high bound of what you keep. */
  savingsLow: number;
  savingsHigh: number;
  /** Cost per hire, contingent vs. the ATALNT AI midpoint. */
  costPerHireContingent: number;
  costPerHireAtalnt: number;
};

/**
 * Pricing is quoted per account rather than published, so this models the
 * savings as the stated 50–70% band against current agency spend rather than
 * against a specific plan price. Every figure it produces is a range, and the
 * UI must present it as one.
 */
export function computeRoi(input: RoiInput): RoiResult {
  const { hiresPerYear, averageSalary, agencyFeePct } = input;
  const { savingsFloor, savingsCeiling } = CALC_DEFAULTS;

  const feePerHire = averageSalary * (agencyFeePct / 100);
  const contingentAnnual = feePerHire * hiresPerYear;

  // Saving 70% means spending 30%. High savings = low spend.
  const atalntLow = contingentAnnual * (1 - savingsCeiling);
  const atalntHigh = contingentAnnual * (1 - savingsFloor);

  const savingsLow = contingentAnnual * savingsFloor;
  const savingsHigh = contingentAnnual * savingsCeiling;

  const midSpend = (atalntLow + atalntHigh) / 2;

  return {
    feePerHire,
    contingentAnnual,
    atalntLow,
    atalntHigh,
    savingsLow,
    savingsHigh,
    costPerHireContingent: feePerHire,
    costPerHireAtalnt: midSpend / Math.max(1, hiresPerYear),
  };
}

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const formatUsd = (n: number) => USD.format(Math.round(n));

/** Compact form for headline numerals: $158,400 → $158.4k */
export function formatUsdCompact(n: number) {
  const v = Math.round(n);
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 10_000) return `$${Math.round(v / 1000)}k`;
  return USD.format(v);
}
