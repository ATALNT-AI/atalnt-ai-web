/**
 * "The difference": the recruiting workflow, paired into three stages.
 *
 * This replaces both the old seven-step Pipeline and the separate Wedge
 * section. The seven steps and this copy made the same argument in the same
 * words, so running both would have said everything twice on one page. Three
 * pairs is also easier to hold than seven singles.
 */
export const STAGES = [
  {
    pull: "From search to shortlist, and beyond.",
    title: "Discover + Enrich",
    body: "Find qualified candidates across multiple talent sources with AI-powered search and intelligent matching. ATALNT AI then enriches each profile with the information your team needs to evaluate fit and make better decisions.",
  },
  {
    pull: "The shortlist is only the start.",
    title: "Engage + Screen",
    body: "Reach candidates through personalized email, LinkedIn, and text outreach. Keep conversations moving, ask the right questions, understand their experience, and determine whether they are genuinely qualified for the role.",
  },
  {
    pull: "Keep the process moving.",
    title: "Coordinate + Track",
    body: "When a qualified candidate is ready to move forward, coordinate availability, schedule the interview, and keep everyone aligned. Candidates, conversations, responses, screening, and interviews stay connected in one workflow.",
  },
] as const;

export const STAGES_INTRO = {
  eyebrow: "The difference",
  title: "More than sourcing. A recruiting engine that keeps hiring moving.",
  subtitle:
    "ATALNT AI combines AI-powered recruiting intelligence with human recruiting expertise to take your search from the first candidate to the scheduled interview.",
} as const;

/** The closer. This is the argument the three stages are evidence for. */
export const STAGES_CLOSER = {
  summary: "Find. Engage. Screen. Schedule.",
  body: [
    "Finding 500 candidates is not the goal. Finding the right candidate, getting their attention, qualifying them, and getting them in front of the hiring manager is.",
    "That is where most sourcing platforms stop.",
  ],
  kicker: "ATALNT AI keeps going.",
} as const;
