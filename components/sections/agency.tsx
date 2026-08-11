import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";

/**
 * The credibility argument: ATALNT is a working search firm, not a software
 * startup. A new or fast-growing HR team gets twenty years of built process
 * on day one instead of assembling it themselves.
 */
const BUILT = [
  {
    title: "A sourcing engine, already running",
    body: "Databases, job boards, and outbound by email, phone, and text. Building that stack in-house takes years and a team. You get it on your first day.",
  },
  {
    title: "Screening that's been calibrated on real placements",
    body: "The scoring behind your shortlist comes from thousands of real hiring decisions, not a model guessing at what good looks like.",
  },
  {
    title: "Account managers who do this all day",
    body: "The scheduling, the follow-up, the comp conversation. Not a coordinator you had to hire and train first.",
  },
  {
    title: "A process that doesn't live in someone's head",
    body: "Intake, shortlist, interview, debrief, offer. Every step is in one place, so nothing depends on the person who happened to run it last time.",
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
              subtitle="ATALNT has spent two decades of combined experience building the systems and processes that make a search firm work. Most of that is unglamorous, and all of it takes years."
            />

            <div className="mt-8 max-w-[56ch] space-y-5 text-[16px] leading-[1.7] text-secondary">
              <p>
                If your HR team is new, or growing faster than it can staff up,
                you have two options. Spend the next few years building that
                same machinery yourself. Or rent an agency and pay per
                placement, forever.
              </p>
              <p className="font-medium text-body">
                This is a third one. You get the agency, running the searches
                the way an agency runs them, for a fraction of what contingent
                search or staffing would cost you.
              </p>
            </div>
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
