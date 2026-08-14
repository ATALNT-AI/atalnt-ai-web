/**
 * Single source of truth for site-wide constants.
 * Anything that appears in more than one place — nav, footer, metadata,
 * structured data — reads from here.
 */

export const SITE = {
  name: "ATALNT AI",
  tagline: "AI recruiting with a human on your side",
  url: "https://atalnt.ai",
  description:
    "Replace contingent search fees with a subscription. Submit a role, and your account manager sources, screens, and vets candidates, then hands you a ranked shortlist that's ready to interview.",
  parent: {
    name: "ATALNT LLC",
    url: "https://atalnt.com",
  },
  social: {
    twitter: "@AtalntLLC",
  },
} as const;

/** Primary conversion endpoint. Every CTA in the site points here. */
export const CTA_HREF = "/demo";

/**
 * Zoho Bookings, service "ATALNT AI Demo" (30 min) on the ATALNT portal.
 * `portal-embed` is the iframe-safe variant; `portal` is the standalone page
 * we link to when the iframe is blocked.
 */
export const BOOKING = {
  serviceId: "4732308000001686006",
  embedUrl:
    "https://admin-atalnt.zohobookings.com/portal-embed#/4732308000001686006",
  directUrl:
    "https://admin-atalnt.zohobookings.com/portal/4732308000001686006",
} as const;

/**
 * Launch nav. Only routes that exist.
 * Platform, How it works, Pricing, Who it's for, and About are the next build
 * phase; add them here as they ship rather than linking ahead of the pages.
 */
export const NAV_LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Testimonials", href: "/testimonials" },
] as const;

/**
 * Sourcing channels the product searches across.
 * Taken from the product itself — do not embellish this list.
 */
export const SOURCING_CHANNELS = [
  "Internal Databases",
  "External Databases",
  "LinkedIn",
  "Job Postings",
  "Email Campaigns",
  "Voice Campaigns",
  "Text Campaigns",
] as const;

/**
 * Headline proof points.
 * `profilesIndexed` is still pending substantiation from ATALNT — confirm the
 * source and as-of date before launch, or pull it.
 */
/**
 * `costReduction` is ONE number, used everywhere. The site used to ship three
 * at once: this constant said 70–85%, the hero eyebrow directly above it said
 * "Up to 80%", and both sales scripts said 50–70%. A reader saw two of them
 * stacked in the same hero.
 *
 * "Up to 80%" is the number that survives every comparison the site makes:
 *   vs an in-house recruiter  $146,393 → Growth $42,000 = 71%, Core $24,000 = 84%
 *   vs agency fees            varies with volume, and the calculator computes
 *                             it live rather than claiming it
 * Below roughly 3 hires a year an agency is cheaper, and the calculator says so
 * rather than pretending otherwise.
 */
export const STATS = {
  costReduction: "Up to 80%",
  profilesIndexed: "2.4M",
  accountManager: "1:1",
} as const;

/**
 * Trust claims. Worded once, here, so the qualifier can never be dropped in
 * one place and kept in another.
 *
 * SOC 2 Type II is IN PROGRESS, not achieved (confirmed by ATALNT, Aug 2026).
 * The product demo's login screen reads "Protected by ATALNT · SOC 2 Type II"
 * with no qualifier — that wording must NOT be carried onto the public site.
 * Asserting a certification you don't yet hold is a misrepresentation an
 * enterprise buyer's security review will catch.
 */
export const TRUST = {
  soc2: {
    label: "SOC 2 Type II audit in progress",
    short: "SOC 2 Type II in progress",
    detail:
      "We're working toward SOC 2 Type II certification. Candidate data is encrypted in transit and at rest today.",
    /** Flip to true only when the report is actually issued. */
    certified: false,
  },
  encryption: "Candidate PII encrypted in transit and at rest",
  ownership: "You own your data and can export it any time",
  team: "A U.S.-based account management team",
} as const;

/**
 * Defaults for the savings calculator.
 * These land on the Growth plan and a genuine, defensible saving, which is the
 * story we want a first-time visitor to see before they touch anything.
 *
 * `agencyFeePct` is 20 because that is the figure ATALNT quotes on calls. It
 * sits inside the "18% to 25%" the rest of the site states, so the slider range
 * stays wider than the default.
 */
export const CALC_DEFAULTS = {
  activeRoles: 6,
  hiresPerYear: 12,
  averageSalary: 90_000,
  agencyFeePct: 20,
} as const;
