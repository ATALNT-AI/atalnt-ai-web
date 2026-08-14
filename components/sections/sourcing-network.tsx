import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { SOURCING_CHANNELS } from "@/lib/site";

/**
 * The "2.4M profiles, seven channels" claim rendered as a living diagram:
 * every channel feeds the gold diamond, which feeds one ranked shortlist.
 * Pure SVG + the at* keyframes, no canvas and no libraries, so it costs
 * nothing and respects prefers-reduced-motion like everything else.
 *
 * Channel y-positions are spaced evenly for the seven SOURCING_CHANNELS.
 */
const NODE_YS = [40, 95, 150, 205, 260, 315, 370];
const HUB = { x: 420, y: 205 };
const OUT = { x: 610, y: 205 };

export function SourcingNetwork() {
  return (
    <Section bg="ink" size="lg" aria-labelledby="network-heading">
      <div aria-hidden className="dots-dark pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeader
              tone="dark"
              eyebrow="Where candidates come from"
              title="Seven channels. One shortlist."
              subtitle="Your recruiter works every source we index at once, and the AI narrows millions of profiles to the handful worth your time."
            />
            {/* The accessible version of the diagram. */}
            <ul className="mt-8 flex flex-wrap gap-2 lg:hidden">
              {SOURCING_CHANNELS.map((c, i) => (
                <li
                  key={c}
                  style={{ "--i": i } as React.CSSProperties}
                  className="rounded-pill border border-ink-line bg-ink-raised px-3.5 py-1.5 text-[12.5px] font-semibold text-gold-bright"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150} className="hidden w-full max-w-[640px] justify-self-center lg:block">
            <svg
              viewBox="0 0 720 410"
              role="img"
              aria-label="Diagram: seven sourcing channels flow into ATALNT AI, which produces one ranked shortlist"
              className="w-full"
            >
              {/* flow lines: channel -> hub */}
              {NODE_YS.map((y, i) => (
                <path
                  key={`line-${i}`}
                  d={`M 218 ${y} C 320 ${y}, 330 ${HUB.y}, ${HUB.x - 26} ${HUB.y}`}
                  fill="none"
                  stroke="var(--color-gold)"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                  strokeDasharray="5 6"
                  className="animate-at-dash"
                  style={{ animationDelay: `${i * 0.18}s` }}
                />
              ))}
              {/* hub -> shortlist */}
              <path
                d={`M ${HUB.x + 26} ${HUB.y} L ${OUT.x - 8} ${OUT.y}`}
                fill="none"
                stroke="var(--color-gold-bright)"
                strokeWidth="2"
                strokeDasharray="5 6"
                className="animate-at-dash"
              />

              {/* channel nodes */}
              {SOURCING_CHANNELS.map((c, i) => (
                <g key={c}>
                  <rect
                    x="8"
                    y={NODE_YS[i] - 17}
                    width="210"
                    height="34"
                    rx="17"
                    fill="var(--color-ink-raised)"
                    stroke="var(--color-ink-line)"
                  />
                  <circle
                    cx="30"
                    cy={NODE_YS[i]}
                    r="3.5"
                    fill="var(--color-gold)"
                    className="animate-at-pulse"
                    style={{ animationDelay: `${i * 0.25}s` }}
                  />
                  <text
                    x="46"
                    y={NODE_YS[i] + 4.5}
                    fontSize="13"
                    fontWeight="600"
                    fill="var(--color-on-dark)"
                    opacity="0.85"
                  >
                    {c}
                  </text>
                </g>
              ))}

              {/* the hub: ATALNT's gold diamond */}
              <g transform={`translate(${HUB.x} ${HUB.y})`}>
                <rect
                  x="-19"
                  y="-19"
                  width="38"
                  height="38"
                  rx="4"
                  transform="rotate(45)"
                  fill="var(--color-gold)"
                  className="animate-at-glow"
                />
                <text
                  y="52"
                  textAnchor="middle"
                  fontSize="11.5"
                  fontWeight="700"
                  letterSpacing="0.08em"
                  fill="var(--color-gold-bright)"
                >
                  ATALNT AI
                </text>
              </g>

              {/* the output: a miniature ranked shortlist */}
              <g>
                <rect
                  x={OUT.x}
                  y={OUT.y - 64}
                  width="104"
                  height="128"
                  rx="12"
                  fill="var(--color-bone)"
                />
                <text
                  x={OUT.x + 12}
                  y={OUT.y - 42}
                  fontSize="9"
                  fontWeight="700"
                  letterSpacing="0.08em"
                  fill="var(--color-gold-ink)"
                >
                  SHORTLIST
                </text>
                {[0, 1, 2].map((r) => (
                  <g key={r}>
                    <circle
                      cx={OUT.x + 20}
                      cy={OUT.y - 18 + r * 32}
                      r="8"
                      fill="var(--color-gold-tint)"
                      stroke="var(--color-gold-line)"
                    />
                    <rect
                      x={OUT.x + 34}
                      y={OUT.y - 23 + r * 32}
                      width={r === 0 ? 56 : r === 1 ? 46 : 38}
                      height="5"
                      rx="2.5"
                      fill="var(--color-line-hover)"
                    />
                    <rect
                      x={OUT.x + 34}
                      y={OUT.y - 13 + r * 32}
                      width="26"
                      height="4"
                      rx="2"
                      fill="var(--color-line)"
                    />
                  </g>
                ))}
              </g>
            </svg>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
