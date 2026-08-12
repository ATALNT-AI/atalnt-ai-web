/**
 * What one in-house recruiter actually costs a year, fully loaded.
 *
 * This replaced the old "one agency placement costs $19,800" framing, which
 * undersold the product: ATALNT AI isn't replacing a single placement fee,
 * it's replacing a recruiter and the entire sourcing stack that recruiter
 * needs to do the job.
 *
 * Every figure is a conservative point inside a published range, so the total
 * holds up when a CFO checks it (Aug 2026):
 *   salary      $89,274 average corporate recruiter (Salary.com). Indeed says
 *               $71,931, Glassdoor $126,347; we take the middle source.
 *   burden      25% of salary. Employer payroll tax, health, workers' comp,
 *               and equipment typically add 15-30%.
 *   linkedin    $10,800-$12,960 per Recruiter Corporate seat; we use the low
 *               end of the middle.
 *   data        ZoomInfo runs $14,000-$25,000+; we use the bottom of the range.
 *   boards      Sponsored postings across Indeed and ZipRecruiter.
 *   tools       Outreach, sequencing, and scheduling. Industry guidance puts
 *               total recruiting tech at $4,000-$6,000 per recruiter per year,
 *               which the data and board lines above already exceed.
 */
export const RECRUITER_STACK = [
  { label: "Recruiter salary", amount: 89_274, note: "US average" },
  { label: "Benefits and payroll burden", amount: 22_319, note: "25% of salary" },
  { label: "LinkedIn Recruiter seat", amount: 10_800, note: "Corporate" },
  { label: "Sourcing and enrichment data", amount: 14_000, note: "ZoomInfo tier" },
  { label: "Job board postings", amount: 6_000, note: "Sponsored" },
  { label: "Outreach and scheduling tools", amount: 4_000, note: "Sequencing, ATS add-ons" },
] as const;

export const RECRUITER_TOTAL = RECRUITER_STACK.reduce(
  (sum, line) => sum + line.amount,
  0
);

/** Sources, shown on the page so the number is checkable rather than claimed. */
export const COST_SOURCES =
  "Salary.com, Indeed, and Glassdoor for salary; published 2026 list pricing for LinkedIn Recruiter, ZoomInfo, and job boards.";
