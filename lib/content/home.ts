/**
 * The home page argument.
 *
 * ICP: HR leaders and hiring managers at companies hiring across many roles at
 * once and struggling to fill them. Deliberately NOT industry-specific. The
 * demo's freight seed data is sample data, not the target market, so nothing
 * here should read as a logistics point solution.
 *
 * Structure: three pains, stacked and escalating, then three answers in the
 * SAME ORDER. The mirror is the point. An unresolved problem is an open loop,
 * and resolving them in order makes the back half read as payoff instead of a
 * feature list.
 *
 * Order within the stack: capacity first, cost second. This buyer feels the
 * aging req before they feel the invoice.
 */

export const PAINS = [
  {
    n: "01",
    title: "The reqs keep stacking up.",
    body: "Your team can properly work three searches at a time. The rest just sit there, getting older.",
  },
  {
    n: "02",
    title: "Every hire costs what the last one did.",
    body: "Agencies bill 18% to 25% of salary, every placement, no cap. Your tenth hire costs what your first did.",
  },
  {
    n: "03",
    title: "And you're still doing the work.",
    body: "The chasing, the scheduling, the comp conversation. The fee didn't buy you out of any of it.",
  },
] as const;

export const ANSWERS = [
  {
    n: "01",
    title: "Every open role, worked at the same time.",
    body: "Your plan covers roles running at once, not hires. Fill one and the next takes its place.",
    echo: "No more aging reqs",
  },
  {
    n: "02",
    title: "The next hire is free at the margin.",
    body: "One flat monthly price. Hire two people or twelve, it doesn't move.",
    echo: "Your tenth hire costs nothing extra",
  },
  {
    n: "03",
    title: "Someone else does the chasing.",
    body: "A named recruiter runs the searches, books the interviews, and delivers the offers. You decide.",
    echo: "You stop being the recruiter",
  },
] as const;

/**
 * The reframe an agency structurally cannot answer, because it's their pricing
 * model rather than their service quality.
 */
export const VOLUME_REFRAME = {
  eyebrow: "Why agencies get worse as you grow",
  title: "Contingent search punishes you for hiring.",
  body: "An agency's price scales with your hiring because that's the model. The only way out is to stop paying per placement.",
} as const;
