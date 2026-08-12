/**
 * The end-to-end recruiting workflow, replacing the old problem/answer pair.
 * One section instead of two: the seven steps are a single idea (what happens
 * from first search to scheduled interview), and splitting them across two
 * sections was what made that page feel long.
 *
 * Bodies are capped at one sentence on purpose. The step names carry the
 * argument; the detail is for the walkthrough.
 */
export const PIPELINE = [
  {
    n: "01",
    title: "Discover",
    body: "Find qualified candidates across every talent source with AI search and intelligent matching.",
  },
  {
    n: "02",
    title: "Enrich",
    body: "Build a complete profile automatically, with the detail a recruiter needs to make a call.",
  },
  {
    n: "03",
    title: "Engage",
    body: "Personalized outreach on the channels that actually get replies: email, LinkedIn, and text.",
  },
  {
    n: "04",
    title: "Screen",
    body: "Ask the right questions, understand the experience, and find out who is genuinely qualified.",
  },
  {
    n: "05",
    title: "Respond",
    body: "Replies get managed and moved forward instead of sitting in someone's inbox.",
  },
  {
    n: "06",
    title: "Coordinate",
    body: "Interested and qualified means straight to scheduling, with everyone's availability aligned.",
  },
  {
    n: "07",
    title: "Track",
    body: "Every candidate, conversation, and interview stays connected in one workflow.",
  },
] as const;

export const PIPELINE_INTRO = {
  eyebrow: "From first search to scheduled interview",
  title: "We built something different.",
  subtitle:
    "Our platform doesn't just find candidates. It moves the whole recruiting process forward.",
} as const;

/** The closer. This is the argument the seven steps are evidence for. */
export const PIPELINE_CLOSER = {
  title: "The difference is what happens after the search.",
  body: [
    "Finding 500 candidates isn't the goal. Finding the right one, getting their attention, qualifying them, and getting them in front of your hiring manager is.",
    "That's where most sourcing platforms stop. We don't.",
  ],
  summary: "Find. Engage. Screen. Schedule.",
  summaryNote: "One platform. One connected workflow.",
} as const;
