import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { PIPELINE, PIPELINE_INTRO, PIPELINE_CLOSER } from "@/lib/content/pipeline";

/**
 * Seven steps plus a summary tile fill a 4-column grid exactly, which is why
 * the summary sits in the grid rather than below it: eight cells, two clean
 * rows, no orphan.
 */
export function Pipeline() {
  return (
    <Section bg="bone" size="lg" id="how-it-works" aria-labelledby="pipeline-heading">
      <Container>
        <Reveal>
          <SectionHeader
            id="pipeline-heading"
            align="center"
            eyebrow={PIPELINE_INTRO.eyebrow}
            title={PIPELINE_INTRO.title}
            subtitle={PIPELINE_INTRO.subtitle}
          />
        </Reveal>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PIPELINE.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 60}>
              <article className="flex h-full flex-col rounded-hero border border-line bg-surface p-6 shadow-rest transition-shadow duration-200 hover:shadow-lift">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="font-display text-[15px] leading-none text-gold-deep tabular"
                  >
                    {step.n}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-gold-line" />
                </div>
                <h3 className="mt-4 font-display text-[21px] leading-none text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-secondary">
                  {step.body}
                </p>
              </article>
            </Reveal>
          ))}

          {/* Eighth cell: the seven steps compressed into four verbs. */}
          <Reveal as="li" delay={PIPELINE.length * 60}>
            <div className="flex h-full flex-col justify-center rounded-hero border border-gold-line bg-gold-tint p-6">
              <p className="font-display text-[22px] leading-[1.25] text-ink text-balance">
                {PIPELINE_CLOSER.summary}
              </p>
              <p className="mt-3 text-[13.5px] leading-[1.6] text-gold-deep">
                {PIPELINE_CLOSER.summaryNote}
              </p>
            </div>
          </Reveal>
        </ol>

        {/* The closer: what the seven steps are actually evidence for. */}
        <Reveal delay={160}>
          <div className="mt-14 grid gap-8 border-t border-line pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <h3 className="max-w-[18ch] text-[clamp(26px,3.2vw,36px)] leading-[1.15] text-balance">
              {PIPELINE_CLOSER.title}
            </h3>
            <div className="flex max-w-[58ch] flex-col gap-4 self-center">
              {PIPELINE_CLOSER.body.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-[16.5px] leading-[1.7] text-body"
                      : "text-[16.5px] leading-[1.7] font-medium text-ink"
                  }
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
