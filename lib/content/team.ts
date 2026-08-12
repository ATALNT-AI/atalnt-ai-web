/**
 * Founder bios, taken from atalnt.com so the two sites stay consistent.
 * Headshots are the same source images, saved to /public/team.
 */
export const FOUNDERS = [
  {
    name: "Lavanya Thatikonda",
    role: "Co-founder & CEO",
    bio: "Serial entrepreneur with 16+ years scaling organizations, growing companies from 50 to 400+ employees.",
    image: "/team/lavanya-thatikonda.jpeg",
    width: 864,
    height: 1184,
    /** Framing hint carried over from atalnt.com. */
    objectPosition: "50% 15%",
    linkedin: "https://www.linkedin.com/in/lavanyapoosarla/",
  },
  {
    name: "Nik Jain",
    role: "Co-founder & COO",
    bio: "Founded JP Recruiting Agency and now leads the AI practice at ATALNT.",
    image: "/team/nik-jain.png",
    width: 1069,
    height: 1336,
    objectPosition: "50% 50%",
    linkedin: "https://www.linkedin.com/in/jainnik/",
  },
] as const;

export const MISSION = {
  eyebrow: "Why we built this",
  title: "Recruiting should feel better than this.",
  body: [
    "We want hiring to feel better than it usually does. For the candidate, and for the company trying to reach them.",
    "AI is good at the parts nobody enjoys: reading a thousand resumes, ranking a stack against a brief. What it can't do is have the conversation where someone decides to join your company. So we let the software do the sorting, and we keep a real person on every search.",
  ],
  /** 16+ years (Lavanya) plus Nik's agency and logistics background. */
  experienceLine: "20+ years of combined recruiting experience",
} as const;
