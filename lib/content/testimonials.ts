export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

/**
 * Client testimonials, carried over from atalnt.com with their attribution
 * intact.
 *
 * Note for ATALNT: the company names here do not match any logo on the client
 * wall, so they may be anonymised stand-ins. If they are, swap in the real
 * names or mark them as anonymised, because a prospect who cannot find
 * "LogiPrime Corp" will read the whole page as invented.
 */
export const CLIENT_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We struggled for months to find resources. ATALNT understood the skill sets we needed and delivered professionals who could hit the ground running from day 1.",
    author: "Steve Morrison",
    role: "VP of Operations",
    company: "GlobalShip Logistics",
  },
  {
    quote:
      "ATALNT team made recruitment effortless. They managed the screening and only sent us candidates who were truly qualified. It saved my team countless hours.",
    author: "Tom Mena",
    role: "Director of Operations",
    company: "TechFlow Supply",
  },
  {
    quote:
      "Every candidate we've hired through them has been accurate, detail-oriented, and committed. Their consistency gives me confidence that any future role will be filled just as well.",
    author: "Emily Hudson",
    role: "VP of Finance",
    company: "LogiPrime Corp",
  },
];

/**
 * Candidate testimonials. Empty on purpose: none exist on atalnt.com and
 * inventing words for real people would be dishonest. The section renders
 * itself only when this array has entries, so adding them here is the whole
 * job. Same shape as above; `company` is where they were placed.
 */
export const CANDIDATE_TESTIMONIALS: Testimonial[] = [];
