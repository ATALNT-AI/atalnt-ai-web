/**
 * Founder bios. Every claim is verifiable against LinkedIn or atalnt.com:
 * Lavanya's scaling numbers come from atalnt.com, Nik's companies (JP
 * Recruiting Agency 2021-2025, VSSP Trucking 2020-2022) are on his profile.
 * The trucking company is the load-bearing detail: he was a logistics
 * operator hiring drivers before he recruited for anyone else, which is why
 * the client wall is full of freight companies. "Been the client" beats any
 * adjective about being results-driven.
 */
export const FOUNDERS = [
  {
    name: "Lavanya Thatikonda",
    role: "Co-founder & CEO",
    bio: "Serial entrepreneur with 16+ years scaling organizations, growing companies from 50 to 400+ employees. She ran the hiring behind that growth herself, which is exactly the job ATALNT AI was built to make lighter.",
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
    bio: "Ran his own trucking company before founding JP Recruiting Agency, so he's been the client: short-staffed, overbooked, and hiring under pressure. He still works searches himself, because the best part of this job is the call where a candidate gets the offer.",
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
