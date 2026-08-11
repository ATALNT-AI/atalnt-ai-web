/**
 * Plans are priced by how many roles a client runs AT ONCE, not by how many
 * people they hire. That distinction is the whole product argument, so the
 * calculator and the pricing page both key off `maxRoles`.
 *
 * Prices confirmed by ATALNT (Aug 2026): $2,000 to $7,000 per month.
 * The two middle tiers are an evenly spaced ladder across that range. If the
 * real Growth and Scale numbers differ, change them here and every surface
 * updates.
 */

export type Plan = {
  id: "core" | "growth" | "scale" | "enterprise";
  name: string;
  /** Monthly price, or null when it's quoted. */
  monthly: number | null;
  minRoles: number;
  /** Inclusive upper bound. Infinity for the top tier. */
  maxRoles: number;
  rolesLabel: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
  /**
   * Stripe Payment Link for this plan. When set, the pricing card shows a
   * direct "Start now" checkout button (card, ACH, Apple Pay, handled by
   * Stripe's hosted page) above the walkthrough CTA. The link should require
   * acceptance of /subscription-terms at checkout, so every self-serve client
   * has a recorded agreement.
   */
  stripeUrl?: string;
};

export const PLANS: Plan[] = [
  {
    id: "core",
    name: "Core",
    monthly: 2000,
    minRoles: 1,
    maxRoles: 5,
    rolesLabel: "Up to 5 active roles",
    blurb:
      "For teams filling a handful of roles at a time who are tired of paying a fee on every one.",
    features: [
      "Up to 5 roles open at once",
      "A named account manager on every search",
      "AI sourcing across all seven channels",
      "Unlimited resume screening",
      "Interview scheduling handled for you",
      "Offer delivery and negotiation",
    ],
    cta: "Book a walkthrough",
    stripeUrl: "https://buy.stripe.com/eVq8wQ4WU8iXgrm3IA2Ji02",
  },
  {
    id: "growth",
    name: "Growth",
    monthly: 3500,
    minRoles: 6,
    maxRoles: 10,
    rolesLabel: "Up to 10 active roles",
    blurb:
      "For teams hiring continuously across departments, where reqs pile up faster than anyone can work them.",
    features: [
      "Everything in Core",
      "Up to 10 roles open at once",
      "Priority sourcing turnaround",
      "Multi-department pipelines",
      "Weekly search reviews with your AM",
    ],
    cta: "Book a walkthrough",
    stripeUrl: "https://buy.stripe.com/fZu4gAahe9n11wsa6Y2Ji03",
    featured: true,
  },
  {
    id: "scale",
    name: "Scale",
    monthly: 5000,
    minRoles: 11,
    maxRoles: 15,
    rolesLabel: "Up to 15 active roles",
    blurb:
      "For companies in a real growth year, running a full slate of searches at the same time.",
    features: [
      "Everything in Growth",
      "Up to 15 roles open at once",
      "A second account manager on your book",
      "Custom intake and scorecards",
      "Quarterly hiring plan review",
    ],
    cta: "Book a walkthrough",
    stripeUrl: "https://buy.stripe.com/eVqeVe9daar5grm2Ew2Ji04",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: null,
    minRoles: 16,
    maxRoles: Infinity,
    rolesLabel: "16+ active roles",
    blurb:
      "For high-volume hiring across sites or business units, scoped to how you actually operate.",
    features: [
      "Everything in Scale",
      "Unlimited active roles",
      "A dedicated account team",
      "ATS and HRIS integration",
      "Custom SLAs and reporting",
    ],
    cta: "Talk to us",
  },
];

/** Cheapest published price, for "starting at" copy. */
export const PRICE_FLOOR = 2000;

/** Pick the plan that covers a given number of concurrent roles. */
export function planForRoles(roles: number): Plan {
  return PLANS.find((p) => roles <= p.maxRoles) ?? PLANS[PLANS.length - 1];
}

/**
 * Enterprise has no published price. For estimating only, assume the top of
 * the published range. Anything using this must label the result an estimate.
 */
export const ENTERPRISE_ESTIMATE = 7000;

export function monthlyFor(plan: Plan): number {
  return plan.monthly ?? ENTERPRISE_ESTIMATE;
}
