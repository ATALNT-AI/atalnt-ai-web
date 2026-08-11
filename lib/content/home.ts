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
    body: "You're hiring across a dozen roles. Your team can work three of them properly. The rest sit there getting older while someone asks for a status update.",
  },
  {
    n: "02",
    title: "Every hire costs what the last one did.",
    body: "Contingent search bills 18% to 25% of salary, per placement, with no cap. Fill ten roles and you pay ten times. Your tenth hire costs exactly what your first one did.",
  },
  {
    n: "03",
    title: "And you're still doing the work.",
    body: "Chasing the candidate who went quiet. Finding one hour that works across five calendars. Having the comp conversation nobody wants to have. The fee didn't buy you out of any of it.",
  },
] as const;

export const ANSWERS = [
  {
    n: "01",
    title: "Every open role, worked at the same time.",
    body: "Your plan covers a set number of roles running at once, not a set number of hires. Fill one and the next takes its place. Nothing sits in a queue waiting for capacity.",
    echo: "No more aging reqs",
  },
  {
    n: "02",
    title: "The next hire is free at the margin.",
    body: "One flat monthly price. Hire two people or twelve, it doesn't move. The more you hire, the less each one costs you, which is the exact opposite of how an agency is built.",
    echo: "Your tenth hire costs nothing extra",
  },
  {
    n: "03",
    title: "Someone else does the chasing.",
    body: "A named account manager runs your searches, books the interviews, and delivers the offer. You review shortlists and make decisions. That's the whole job.",
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
  body: "An agency's price scales with your headcount because that's how the model works. It isn't a service problem and a better recruiter won't fix it. The only way out is to stop paying per placement.",
} as const;
