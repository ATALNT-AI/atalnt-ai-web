import { inHouseAnnual } from "./recruiter-cost";

/**
 * Which cost the reader carries today.
 *
 * With pricing quote-only (Aug 2026), the calculator no longer computes a
 * saving against a published plan price, because there isn't one to show.
 * Instead it puts a number on the reader's status quo, which is the number
 * that starts the pricing conversation. Naming their cost and not ours is the
 * same stance the home page ledger takes: provoke the question, answer it on
 * the call.
 */
export type RoiMode = "no-recruiter" | "has-recruiter";

/**
 * Below this many concurrent roles, nobody hires a full-time recruiter, so
 * pricing the reader against one would be flattering rather than honest. The
 * UI says so instead of showing a number.
 */
export const MIN_ROLES_FOR_IN_HOUSE = 3;

export type RoiInput = {
  mode: RoiMode;
  /** Hires completed in a year. This is what sets the agency bill. */
  hiresPerYear: number;
  averageSalary: number;
  agencyFeePct: number;
  /** What they would pay the recruiter they are about to hire. */
  recruiterSalary: number;
};

export type RoiResult = {
  mode: RoiMode;
  /** What the reader spends a year today, under whichever cost applies. */
  comparisonAnnual: number;
  /** What to call that spend on the chart. */
  comparisonLabel: string;
  /** Agency mode: the fee a single hire costs. */
  feePerHire: number;
};

export function computeRoi(input: RoiInput): RoiResult {
  const { mode, hiresPerYear, averageSalary, agencyFeePct, recruiterSalary } =
    input;

  const feePerHire = averageSalary * (agencyFeePct / 100);

  return mode === "no-recruiter"
    ? {
        mode,
        comparisonAnnual: inHouseAnnual(recruiterSalary),
        comparisonLabel: "Hiring in-house",
        feePerHire,
      }
    : {
        mode,
        comparisonAnnual: feePerHire * hiresPerYear,
        comparisonLabel: "Agency fees this year",
        feePerHire,
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
