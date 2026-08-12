import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { TRUST } from "@/lib/site";

/**
 * Quiet, credible, small. Pin.com does this well — it isn't a selling section,
 * it's there so a security reviewer can tick a box and move on.
 */
const ITEMS = [
  {
    // Deliberately says "in progress" — see the note in lib/site.ts.
    title: TRUST.soc2.short,
    body: TRUST.soc2.detail,
  },
  {
    title: TRUST.encryption,
    body: "Protected in storage and in flight, at every step.",
  },
  {
    title: TRUST.ownership,
    body: "Your roles, shortlists, and history leave with you.",
  },
  {
    title: TRUST.team,
    body: "A named person on our team, not a rotating queue.",
  },
];

export function Trust() {
  return (
    <Section bg="bone" size="sm" bordered aria-labelledby="trust-heading">
      <Container>
        <Reveal>
          <Eyebrow className="mb-3">Security &amp; trust</Eyebrow>
          <h2
            id="trust-heading"
            className="max-w-[20ch] text-[clamp(26px,3vw,34px)] text-balance"
          >
            Candidate data, handled properly.
          </h2>
        </Reveal>

        <dl className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="border-t border-gold-line pt-5">
                <dt className="flex items-start gap-2.5 text-[14.5px] font-semibold text-ink">
                  <span
                    aria-hidden
                    className="mt-[6px] size-2 shrink-0 rotate-45 bg-gold"
                  />
                  {item.title}
                </dt>
                <dd className="mt-2.5 pl-[18px] text-[13.5px] leading-[1.6] text-secondary">
                  {item.body}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
