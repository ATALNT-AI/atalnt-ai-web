import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CTA_HREF, STATS } from "@/lib/site";
import { ShortlistPreview } from "./shortlist-preview";

const PROOF = [
  { value: STATS.costReduction, label: "lower cost per hire" },
  { value: STATS.profilesIndexed, label: "profiles indexed" },
  { value: STATS.accountManager, label: "human account manager" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bone pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Signature gold glow + blueprint grid, behind everything. */}
      <div
        aria-hidden
        className="glow-gold pointer-events-none absolute top-[-160px] right-[-140px] size-[720px] opacity-70 animate-at-float"
      />
      <div
        aria-hidden
        className="dots-bone pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] lg:block"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Eyebrow className="animate-at-fade">
              For teams hiring across a lot of roles at once
            </Eyebrow>

            <h1 className="mt-5 animate-at-fade text-[clamp(36px,5.2vw,60px)] leading-[1.06] tracking-[-0.02em] text-balance [animation-delay:80ms]">
              Ten roles open.
              <br />
              Still no shortlist.
            </h1>

            <p className="mt-6 max-w-[54ch] animate-at-fade text-[18px] leading-[1.6] text-secondary text-pretty [animation-delay:160ms]">
              ATALNT AI gives you a dedicated account manager and an AI that
              sources and screens across every role you have open. One flat
              monthly price, however many people you end up hiring.
            </p>

            <div className="mt-9 flex animate-at-fade flex-col gap-3 sm:flex-row [animation-delay:240ms]">
              <Button href={CTA_HREF} size="lg">
                Book a walkthrough
              </Button>
              <Button href="/test-drive" variant="secondary" size="lg">
                Take a test drive →
              </Button>
            </div>

            <p className="mt-5 animate-at-fade text-[13.5px] text-muted [animation-delay:320ms]">
              First month free · No implementation fee · First shortlist inside a week
            </p>

            <dl className="mt-12 flex animate-at-fade flex-wrap gap-x-10 gap-y-6 border-t border-line pt-8 [animation-delay:400ms]">
              {PROOF.map((p) => (
                <div key={p.label}>
                  <dt className="sr-only">{p.label}</dt>
                  <dd>
                    <span className="block font-display text-[34px] leading-none text-gold-ink tabular">
                      {p.value}
                    </span>
                    <span className="mt-2 block max-w-[14ch] text-[13px] leading-[1.4] text-secondary">
                      {p.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <ShortlistPreview />
        </div>
      </Container>
    </section>
  );
}
