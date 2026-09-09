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
    "Replace contingent search fees with a subscription. Submit a role, and AI sourcing overseen by a dedicated recruiter hands you a ranked shortlist that's ready to interview.",
  /**
   * atalnt.com 301-redirects to this site (Cloudflare redirect rule, Aug
   * 2026), so the parent has no separate URL to link to any more. Linking it
   * would bounce a reader back to the page they are already on, and telling
   * search engines the two domains are related now describes a loop.
   */
  parent: {
    name: "ATALNT LLC",
  },
  social: {
    twitter: "@AtalntLLC",
  },
} as const;

/** Primary conversion endpoint. Every CTA in the site points here. */
export const CTA_HREF = "/demo";

/**
 * Calendly, event type "ATALNT AI [Overview & Demo]" (30 min, Microsoft
 * Teams), replacing Zoho Bookings in Aug 2026.
 *
 * `embedUrl` carries Calendly's own query flags: the cookie banner and the
 * page details are hidden because the surrounding page already says what the
 * meeting is, and the accent colours are the site's gold and ink so the widget
 * stops looking like someone else's product. `directUrl` is the plain public
 * page, used when the embed is blocked.
 */
const CALENDLY_EVENT = "https://calendly.com/atalntai/30min";

/**
 * Calendly's widget.js appends `embed_domain` and `embed_type` itself, so the
 * data-url only carries the display flags: the cookie banner and page details
 * are hidden because the surrounding page already says what the meeting is,
 * and the accent colours are the site's gold and ink so the widget stops
 * looking like someone else's product.
 */
export const BOOKING = {
  directUrl: CALENDLY_EVENT,
  embedUrl:
    `${CALENDLY_EVENT}?hide_gdpr_banner=1&hide_event_type_details=1` +
    "&background_color=ffffff&text_color=15130e&primary_color=b5903f",
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
  { label: "About", href: "/about" },
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
 *   vs an in-house recruiter  $146,393 → Growth $34,200 = 77%, Core $22,200 = 85%
 *   vs agency fees            varies with volume, and the calculator computes
 *                             it live rather than claiming it
 * Note the calculator can exceed 80% on both comparisons at the low end of the
 * plan ladder. It is computed live and labelled an estimate, so it under-claims
 * rather than over-claims, but revisit the headline if that starts to jar.
 * Below roughly 3 hires a year an agency is cheaper, and the calculator says so
 * rather than pretending otherwise.
 */
export const STATS = {
  costReduction: "Up to 80%",
  profilesIndexed: "2.4M",
  recruiter: "1:1",
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
  team: "A team of experienced recruiters",
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
