/**
 * Pricing is QUOTE-ONLY on the website (Nik's call, Aug 2026). No dollar
 * amount renders anywhere; every price is given on the demo call and in
 * writing. The shape of the model is still public because it is the product
 * argument: priced by how many roles run at once, flat monthly, no placement
 * fees.
 *
 * For sales reference, the last published ladder was Core $1,850 (up to 3
 * roles), Growth $2,850 (up to 10), custom above that. The Stripe Payment
 * Links for those amounts still exist and are active; they are no longer
 * linked from the site and are now closing tools for sales to send after a
 * quote.
 */

/** How the price is scoped. Rendered as the top of the pricing page. */
export const PRICING_MODEL = [
  {
    title: "Priced by active roles",
    body: "The only thing that sets your price is how many searches we run at the same time. Not headcount, not hires, not salaries.",
  },
  {
    title: "One flat monthly price",
    body: "Hire two people or twelve inside your allowance. The price doesn't move, and there's nothing to true up at the end of the year.",
  },
  {
    title: "No placement fees",
    body: "No percentages of salary, no per-hire charges, no fee when someone accepts. The monthly price is the whole price.",
  },
] as const;

/** Everything a plan includes, regardless of scope. */
export const INCLUDED = [
  "AI sourcing across all seven channels",
  "Unlimited resume screening",
  "Interview scheduling handled for you",
  "Offer delivery and negotiation",
  "Weekly search reviews",
  "ATS and HRIS integration when you need it",
] as const;

/**
 * What the human side commits, worded once.
 *
 * Deliberately AI-first: the platform does the volume work, the recruiter is
 * oversight and a person to reach. Deliberately no location claim, no task
 * inventory, and no hours-per-week figure. Publishing hours moves the buyer's
 * comparison to an hourly rate against fractional recruiters, which is not
 * the comparison this product wins.
 */
export const RECRUITER_COMMITMENT =
  "The AI works your searches around the clock, and you get direct access to a dedicated recruiter who oversees every one. Sourced candidate list within a week of intake.";

/**
 * The situations a quote gets shaped around. With published tiers gone this
 * is the heart of the page: every one of these routes to a conversation.
 */
export const CUSTOM_SITUATIONS = [
  {
    title: "Platform only",
    body: "You want the sourcing and screening engine, and your own team runs it. No recruiter attached.",
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
    body: "You are hiring across sites or business units, with searches running everywhere at once.",
  },
  {
    title: "Bridge coverage",
    body: "You are hiring your own recruiter and need the open roles worked while that search runs.",
  },
  {
    title: "Custom terms",
    body: "Unusual roles, a fixed project, a defined ramp, or anything a standard scope does not cover.",
  },
] as const;
