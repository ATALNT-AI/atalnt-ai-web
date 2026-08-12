import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { PRICE_FLOOR } from "@/lib/pricing";
import { formatUsd } from "@/lib/roi";

/**
 * The calculator's best sentence, promoted to a static band. The interactive
 * version lives on /pricing where comparison-shoppers actually model; home
 * just needs the one number that makes someone sit up. Keeps id="savings" so
 * old anchor links still land somewhere sensible.
 */
const AGENCY_FEE_PER_HIRE = 90_000 * 0.22;

export function ProofStrip() {
  return (
    <Section bg="surface" size="sm" bordered id="savings" aria-labelledby="proof-heading">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center gap-8 text-center">
            <Eyebrow>The math</Eyebrow>
            <h2
              id="proof-heading"
              className="max-w-[24ch] text-[clamp(30px,4.2vw,48px)] leading-[1.12] text-balance"
            >
              <span className="text-decline line-through decoration-decline-mid/50">
                {formatUsd(AGENCY_FEE_PER_HIRE)}
              </span>{" "}
              a hire becomes{" "}
              <span className="text-gold-ink">{formatUsd(PRICE_FLOOR)}</span> a
              month.
            </h2>
            <p className="max-w-[48ch] text-[16px] leading-[1.6] text-secondary">
              One agency placement at a $90,000 salary costs more than nine
              months of Core, however many people you hire.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/pricing#savings" size="lg">
                Run your numbers
              </Button>
              <Button href="/pricing" variant="secondary" size="lg">
                See plans
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
