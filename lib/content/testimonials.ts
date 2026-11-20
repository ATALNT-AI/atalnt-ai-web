export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

/**
 * Written client testimonials. Empty on purpose: the three carried over from
 * atalnt.com (Steve Morrison, Tom Mena, Emily Hudson) could not be traced to
 * real clients, so they came off the site on Nov 20, 2026. Add only quotes a
 * real, named client has approved. The grid renders only when this has entries.
 */
export const CLIENT_TESTIMONIALS: Testimonial[] = [];

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
