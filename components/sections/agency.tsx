import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";

/**
 * The credibility argument: ATALNT is a working search firm, not a software
 * startup. Kept to one line per card; the titles carry the argument.
 */
const BUILT = [
  {
    title: "A sourcing engine, already running",
    body: "Databases, job boards, and outbound by email, phone, and text. Live on day one.",
  },
  {
    title: "Screening calibrated on real placements",
    body: "Shortlist scoring built on thousands of real hiring decisions.",
  },
  {
    title: "Recruiters who do this all day",
    body: "The scheduling, the follow-up, the comp conversation. Handled.",
  },
  {
    title: "A process that doesn't live in someone's head",
    body: "Intake to offer in one place, not in whoever ran it last time.",
  },
];

export function Agency() {
  return (
    <Section bg="sand" size="lg" aria-labelledby="agency-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <SectionHeader
              id="agency-heading"
              eyebrow="What you're actually buying"
              title="We're a recruiting firm that decided to hand you the machinery."
              subtitle="Twenty years of combined recruiting built it. You get it on day one."
            />
            <p className="mt-7 max-w-[52ch] text-[16px] leading-[1.7] font-medium text-body">
              Your options were: spend years building this yourself, or pay an
              agency per placement forever. This is the third one.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {BUILT.map((b) => (
                <li
                  key={b.title}
                  className="rounded-card border border-line bg-surface p-5 shadow-rest"
                >
                  <p className="text-[15px] font-semibold text-ink text-balance">
                    {b.title}
                  </p>
                  <p className="mt-2.5 text-[13.5px] leading-[1.6] text-secondary">
                    {b.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
