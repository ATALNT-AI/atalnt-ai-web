import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BadgePill } from "@/components/ui/badge-pill";
import { Reveal } from "@/components/motion/reveal";
import { FOUNDERS, MISSION } from "@/lib/content/team";

export function Founders() {
  return (
    <Section bg="sand" size="lg" aria-labelledby="mission-heading">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          {/* ---- mission ---- */}
          <Reveal className="min-w-0">
            <Eyebrow className="mb-4">{MISSION.eyebrow}</Eyebrow>
            <h2
              id="mission-heading"
              className="max-w-[16ch] text-[clamp(30px,3.8vw,44px)] text-balance"
            >
              {MISSION.title}
            </h2>

            <div className="mt-7 flex max-w-[58ch] flex-col gap-5">
              {MISSION.body.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "font-display text-[21px] leading-[1.45] text-ink text-pretty"
                      : "text-[16px] leading-[1.7] text-secondary text-pretty"
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 border-l-2 border-gold pl-5">
              <p className="font-display text-[19px] leading-[1.45] text-ink italic">
                &ldquo;We let the AI do what it&rsquo;s best at, and keep a real
                person on every search.&rdquo;
              </p>
            </div>
          </Reveal>

          {/* ---- founders ---- */}
          {/* min-w-0 on the grid item: without it, any non-wrapping child sets
              the column's min-content width and pushes the whole grid past the
              viewport on phones, which the section then clips. That is exactly
              what happened with the badge below on anything narrower than a
              Pro Max. */}
          <Reveal delay={120} className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <Eyebrow tone="gold">Founded by recruiters</Eyebrow>
              <BadgePill tone="neutral" className="whitespace-normal">
                {MISSION.experienceLine}
              </BadgePill>
            </div>

            <ul className="mt-7 flex flex-col gap-5">
              {FOUNDERS.map((f) => (
                <li
                  key={f.name}
                  className="flex gap-5 rounded-hero border border-line bg-surface p-5 shadow-rest transition-shadow duration-200 hover:shadow-lift"
                >
                  <Image
                    src={f.image}
                    alt={`${f.name}, ${f.role} of ATALNT`}
                    width={f.width}
                    height={f.height}
                    sizes="88px"
                    style={{ objectPosition: f.objectPosition }}
                    className="size-[88px] shrink-0 rounded-card object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-[16px] font-semibold text-ink">
                      {f.name}
                    </p>
                    <p className="mt-0.5 text-[12px] font-bold tracking-[0.06em] text-gold-deep uppercase">
                      {f.role}
                    </p>
                    <p className="mt-2.5 text-[13.5px] leading-[1.6] text-secondary">
                      {f.bio}
                    </p>
                    <a
                      href={f.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block py-1.5 text-[13px] font-semibold text-secondary underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      LinkedIn ↗
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[13.5px] leading-[1.6] text-secondary">
              We ran these searches by hand long before we built software for
              them.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
