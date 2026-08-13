import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { CTA_HREF } from "@/lib/site";

export function CtaBand({
  title = "Your next hire shouldn\u2019t require five different tools.",
  body = "From sourcing and enrichment to outreach, screening, and scheduling, ATALNT AI brings the recruiting workflow together in one platform.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <Section bg="ink" size="lg" className="overflow-hidden">
      <div
        aria-hidden
        className="glow-gold pointer-events-none absolute top-1/2 left-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2 animate-at-float opacity-50"
      />
      <div aria-hidden className="dots-dark pointer-events-none absolute inset-0" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[clamp(32px,4.4vw,50px)] text-on-dark text-balance">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-[56ch] text-[17px] leading-[1.65] text-on-dark/75 text-pretty">
            {body}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={CTA_HREF} variant="onDark" size="lg">
              Book a demo
            </Button>
          </div>
          <p className="mt-6 text-[13px] text-on-dark-muted">
            No implementation fee · First shortlist inside a week
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
