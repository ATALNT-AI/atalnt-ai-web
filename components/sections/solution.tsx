import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { BadgePill } from "@/components/ui/badge-pill";
import { Reveal } from "@/components/motion/reveal";
import { ANSWERS, VOLUME_REFRAME } from "@/lib/content/home";

/**
 * Answers the three pains in the same order they were raised. The mirror is
 * deliberate: each `echo` closes the loop opened by the matching pain.
 */
export function Solution() {
  return (
    <Section bg="bone" size="lg" aria-labelledby="solution-heading">
      <Container>
        <Reveal>
          <SectionHeader
            id="solution-heading"
            eyebrow="The answer, in the same order"
            title="One subscription. Every role you're working."
            subtitle="Priced by how many roles you run at once, not by how many people you hire."
          />
        </Reveal>

        <ol className="mt-16 grid gap-5 lg:grid-cols-3">
          {ANSWERS.map((a, i) => (
            <Reveal key={a.n} as="li" delay={i * 90}>
              <article className="flex h-full flex-col rounded-hero border border-line bg-surface p-7 shadow-rest transition-shadow duration-200 hover:shadow-lift">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="font-display text-[24px] leading-none text-gold-ink"
                  >
                    {a.n}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-gold-line" />
                </div>

                <h3 className="mt-5 text-[21px] leading-[1.3] text-ink text-balance">
                  {a.title}
                </h3>
                <p className="mt-3.5 flex-1 text-[15px] leading-[1.65] text-secondary">
                  {a.body}
                </p>

                <div className="mt-6">
                  <BadgePill tone="green">{a.echo}</BadgePill>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>

        {/* The reframe an agency cannot answer, because it's their pricing
            model rather than their service quality. */}
        <Reveal delay={120}>
          <div className="mt-14 rounded-hero border border-gold-line bg-gold-tint p-8 sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
              <div>
                <p className="text-[11.5px] font-bold tracking-[0.08em] text-gold-deep uppercase">
                  {VOLUME_REFRAME.eyebrow}
                </p>
                <h3 className="mt-3 text-[clamp(24px,3vw,32px)] text-ink text-balance">
                  {VOLUME_REFRAME.title}
                </h3>
              </div>
              <p className="self-center text-[16px] leading-[1.7] text-body">
                {VOLUME_REFRAME.body}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
