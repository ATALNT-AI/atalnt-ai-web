/**
 * Plans are priced by how many roles a client runs AT ONCE, not by how many
 * people they hire. That distinction is the whole product argument, so the
 * calculator and the pricing page both key off `maxRoles`.
 *
 * Prices confirmed by ATALNT (Aug 2026): $2,000 to $7,000 per month.
 * The two middle tiers are an evenly spaced ladder across that range. If the
 * real Growth number differs, change it here and every surface
 * updates.
 */

export type Plan = {
  id: "core" | "growth" | "enterprise";
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
    cta: "Book a demo",
    stripeUrl: "https://buy.stripe.com/28E9AUcpmczd7UQfri2Ji05",
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
    cta: "Book a demo",
    stripeUrl: "https://buy.stripe.com/5kQ28sbli2YD8YUdja2Ji06",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Custom",
    monthly: null,
    minRoles: 11,
    maxRoles: Infinity,
    rolesLabel: "11+ active roles",
    blurb:
      "For companies in a real growth year, hiring at volume across sites or business units. Scoped to how you actually operate.",
    features: [
      "Everything in Growth",
      "As many active roles as you need",
      "A dedicated account team",
      "Custom intake and scorecards",
      "ATS and HRIS integration",
      "Custom SLAs and reporting",
    ],
    cta: "Talk to us",
  },
];

/**
 * What the account manager commits, worded once so all three cards say the
 * same thing.
 *
 * Every clause is already published elsewhere and defensible today: "named
 * account manager" is a Core feature, U.S.-based is TRUST.team, and the
 * candidate list inside a week matches the service-levels clause in the
 * subscription agreement, which correctly states it as a target.
 *
 * Deliberately no hours-per-week figure. Publishing one moves the buyer's
 * comparison to an hourly rate against fractional recruiters, which is not the
 * comparison this product wins. Revisit only when the AM time data exists.
 */
export const AM_COMMITMENT =
  "A named, U.S.-based account manager runs your searches: sourcing, screening conversations, interview scheduling, and offer delivery. Sourced candidate list within a week of intake.";

/**
 * The buyers who do not fit a tier. Volume is only one of five reasons, and it
 * was the only one the page used to acknowledge, so everyone else bounced.
 *
 * Two of these are quote-only on purpose. "Platform only" has no published
 * price because dropping the account manager has to cost visibly less than
 * $2,000, and that number is a pricing decision. "Recruiters in-house" is
 * ATALNT LLC's staffing business rather than this subscription, so it routes to
 * a conversation rather than a checkout.
 */
export const CUSTOM_SITUATIONS = [
  {
    title: "Platform only",
    body: "You want the sourcing and screening engine, and your own team runs it. No account manager.",
  },
  {
    title: "Recruiters in-house",
    body: "You need recruiting people embedded with your team rather than a subscription.",
  },
  {
    title: "Procurement",
    body: "You need an MSA, an order form, an annual term, and a security review before anything starts.",
  },
  {
    title: "Real volume",
    body: "You are hiring across sites or business units, well past ten roles at once.",
  },
  {
    title: "Custom terms",
    body: "Unusual roles, a fixed project, a defined ramp, or anything the three plans do not cover.",
  },
] as const;

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
