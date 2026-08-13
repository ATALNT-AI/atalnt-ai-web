import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { STAGES, STAGES_INTRO, STAGES_CLOSER } from "@/lib/content/pipeline";

/**
 * The workflow argument, on ink. Keeps `id="how-it-works"` because the nav and
 * footer both anchor to it.
 */
export function Difference() {
  return (
    <Section bg="ink" size="lg" id="how-it-works" aria-labelledby="difference-heading">
      <div aria-hidden className="dots-dark pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="glow-gold pointer-events-none absolute top-0 right-0 size-[560px] opacity-25"
      />
      <Container className="relative">
        <Reveal>
          <SectionHeader
            id="difference-heading"
            tone="dark"
            align="center"
            eyebrow={STAGES_INTRO.eyebrow}
            title={STAGES_INTRO.title}
            subtitle={STAGES_INTRO.subtitle}
          />
        </Reveal>

        <ol className="mt-16 grid gap-5 md:grid-cols-3">
          {STAGES.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 90}>
              <article className="flex h-full flex-col rounded-hero border border-ink-line bg-ink-raised p-7 shadow-dark transition-colors duration-200 hover:border-gold/40">
                <p className="font-display text-[23px] leading-[1.25] text-gold-bright text-balance">
                  &ldquo;{s.pull}&rdquo;
                </p>
                <div className="rule-dashed my-6 opacity-25" />
                <h3 className="text-[12px] font-bold tracking-[0.08em] text-on-dark uppercase">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-on-dark/70">
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={160}>
          <div className="mt-16 border-t border-ink-line pt-12 text-center">
            <p className="font-display text-[clamp(26px,3.6vw,40px)] leading-[1.2] text-gold-bright text-balance">
              {STAGES_CLOSER.summary}
            </p>
            <div className="mx-auto mt-7 flex max-w-[62ch] flex-col gap-4">
              {STAGES_CLOSER.body.map((p, i) => (
                <p
                  key={i}
                  className="text-[16.5px] leading-[1.7] text-on-dark/75 text-pretty"
                >
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-6 font-display text-[clamp(22px,2.8vw,30px)] text-on-dark">
              {STAGES_CLOSER.kicker}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
