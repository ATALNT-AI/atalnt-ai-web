import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";

/**
 * The differentiator, stated in the demo's own words. This is the one thing
 * recstack, pin, and juicebox cannot say — they sell tools, we sell a person
 * backed by one.
 */
const CARDS = [
  {
    pull: "Messy is fine.",
    title: "Intake",
    body: "Paste the description or drop a file. The AI pulls out the role, the skills, and the seniority, then asks you the few questions that actually sharpen a shortlist.",
  },
  {
    pull: "No links, no back-and-forth.",
    title: "Scheduling",
    body: "Share the times you're free. Your AM confirms directly with the candidate and tells you both once it's booked. You never send a scheduling link again.",
  },
  {
    pull: "No awkward back-and-forth.",
    title: "Offers",
    body: "Set the terms. Your AM extends the offer, handles the negotiation, and closes it. If it's a pass, they let the candidate know, kindly.",
  },
];

export function Wedge() {
  return (
    <Section bg="ink" size="lg" aria-labelledby="wedge-heading">
      <div
        aria-hidden
        className="glow-gold pointer-events-none absolute top-0 left-1/2 size-[680px] -translate-x-1/2 -translate-y-1/3 opacity-40"
      />
      <Container className="relative">
        <Reveal>
          <SectionHeader
            id="wedge-heading"
            tone="dark"
            align="center"
            eyebrow="The difference"
            title="A dedicated account manager, working your search by hand."
            subtitle="Submit a role. Over the next few days your AM sources, screens, and vets candidates, then hands you a ranked shortlist that's ready to interview. Most platforms hand you software and wish you luck. You get a person."
          />
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <article className="group h-full rounded-hero border border-ink-line bg-ink-raised p-7 shadow-dark transition-colors duration-200 hover:border-gold/40">
                <p className="font-display text-[24px] leading-[1.25] text-gold-bright text-balance">
                  &ldquo;{c.pull}&rdquo;
                </p>
                <p className="mt-5 text-[11.5px] font-bold tracking-[0.08em] text-on-dark-muted uppercase">
                  {c.title}
                </p>
                <p className="mt-3 text-[15px] leading-[1.65] text-on-dark/80">
                  {c.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
