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

export type VideoCut = { label: string; duration: string; src: string };

export type VideoTestimonial = Testimonial & {
  poster: string;
  /** First cut plays by default. */
  cuts: VideoCut[];
};

/**
 * Client video testimonials. Recorded on Teams Nov 19, 2026; source, cut
 * list and notes live in testimonials/mmi-nelly/. Nelly approved the final
 * cut on Nov 20, 2026. The poster uses the headshot she sent for it.
 */
export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    quote:
      "Some of the jobs ATALNT AI helped fill were jobs we had open on our own job boards, and so did our third-party agencies. I found myself wondering, where are they sourcing? I guess that's the secret sauce.",
    author: "Nelly Schlack",
    role: "Human Resources Manager",
    company: "MMI Industrial & Steel",
    poster: "/testimonials/mmi/nelly-poster-2.jpg",
    cuts: [
      { label: "Full story", duration: "3:26", src: "/testimonials/mmi/mmi-full-story.mp4" },
      { label: "Highlights", duration: "1:13", src: "/testimonials/mmi/mmi-highlights.mp4" },
    ],
  },
];
