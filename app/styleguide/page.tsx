import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Wordmark } from "@/components/ui/wordmark";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

// Class names are written out in full, because Tailwind scans source text, so an
// interpolated `bg-${name}` would never be generated.
const SWATCHES: { group: string; items: [string, string][] }[] = [
  {
    group: "Ink",
    items: [
      ["ink", "bg-ink"],
      ["ink-raised", "bg-ink-raised"],
      ["ink-line", "bg-ink-line"],
    ],
  },
  {
    group: "Bone",
    items: [
      ["bone", "bg-bone"],
      ["bone-50", "bg-bone-50"],
      ["bone-100", "bg-bone-100"],
      ["surface", "bg-surface"],
    ],
  },
  {
    group: "Text",
    items: [
      ["body", "bg-body"],
      ["secondary", "bg-secondary"],
      ["eyebrow", "bg-eyebrow"],
      ["muted", "bg-muted"],
      ["tertiary", "bg-tertiary"],
      ["placeholder", "bg-placeholder"],
    ],
  },
  {
    group: "Lines",
    items: [
      ["line", "bg-line"],
      ["line-input", "bg-line-input"],
      ["line-inner", "bg-line-inner"],
      ["line-hover", "bg-line-hover"],
    ],
  },
  {
    group: "Gold",
    items: [
      ["gold", "bg-gold"],
      ["gold-bright", "bg-gold-bright"],
      ["gold-ui", "bg-gold-ui"],
      ["gold-ink", "bg-gold-ink"],
      ["gold-deep", "bg-gold-deep"],
      ["gold-tint", "bg-gold-tint"],
      ["gold-line", "bg-gold-line"],
      ["gold-soft", "bg-gold-soft"],
    ],
  },
  {
    group: "Success",
    items: [
      ["success", "bg-success"],
      ["success-mid", "bg-success-mid"],
      ["success-tint", "bg-success-tint"],
      ["success-line", "bg-success-line"],
    ],
  },
  {
    group: "Decline",
    items: [
      ["decline", "bg-decline"],
      ["decline-mid", "bg-decline-mid"],
      ["decline-tint", "bg-decline-tint"],
      ["decline-line", "bg-decline-line"],
    ],
  },
];

const SHADOWS: [string, string][] = [
  ["rest", "shadow-rest"],
  ["raised", "shadow-raised"],
  ["modal", "shadow-modal"],
  ["lift", "shadow-lift"],
  ["selected", "shadow-selected"],
  ["dark", "shadow-dark"],
];

const RADII: [string, string][] = [
  ["nav", "rounded-nav"],
  ["sm", "rounded-sm"],
  ["btn", "rounded-btn"],
  ["card", "rounded-card"],
  ["hero", "rounded-hero"],
  ["pill", "rounded-pill"],
];

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-12">
      <Eyebrow className="mb-6">{title}</Eyebrow>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <main className="py-16">
      <Container>
        <Wordmark size="lg" />
        <h1 className="mt-8 text-[clamp(38px,5.2vw,64px)] leading-[1.08] tracking-[-0.015em]">
          Design system
        </h1>
        <p className="mt-4 max-w-[54ch] text-[17px] leading-[1.6] text-secondary">
          Every token below is ported from the product demo. Contrast-critical
          values were adjusted for public web use. See the notes in{" "}
          <code className="rounded-[4px] bg-gold-tint px-1.5 py-0.5 text-[14px] text-gold-deep">
            app/globals.css
          </code>
          .
        </p>

        <Row title="Color">
          <div className="flex flex-col gap-8">
            {SWATCHES.map((s) => (
              <div key={s.group}>
                <p className="mb-3 text-[13px] font-semibold text-secondary">
                  {s.group}
                </p>
                <div className="flex flex-wrap gap-3">
                  {s.items.map(([name, cls]) => (
                    <div key={name} className="w-[132px]">
                      <div
                        className={`h-16 rounded-card border border-line ${cls}`}
                      />
                      <p className="mt-2 text-[12px] text-secondary">{name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Row>

        <Row title="Typography">
          <div className="flex flex-col gap-6">
            <p className="font-display text-[46px] leading-[1.12] tracking-[-0.01em]">
              Newsreader 500 · display headline
            </p>
            <p className="font-display text-[24px] italic text-secondary">
              Newsreader 400 italic · pull quotes
            </p>
            <p className="text-[17px] leading-[1.6] text-body">
              Hanken Grotesk 400 · body copy at 17px, the reading size for
              subheads and long prose.
            </p>
            <p className="text-[15px] font-semibold">
              Hanken Grotesk 600 · UI and buttons
            </p>
            <div className="flex flex-wrap gap-6">
              <Eyebrow>Default eyebrow · 5.04:1</Eyebrow>
              <Eyebrow tone="gold">Gold eyebrow · 5.54:1</Eyebrow>
            </div>
          </div>
        </Row>

        <Row title="Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" size="lg">
              Book a demo
            </Button>
            <Button variant="secondary">See how it works</Button>
            <Button variant="gold">Get your number</Button>
            <Button variant="ghost">Ghost link</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-card bg-ink p-6">
            <Button variant="onDark" size="lg">
              On dark
            </Button>
            <Wordmark tone="dark" />
            <Eyebrow tone="onDark">On-dark eyebrow · 7.71:1</Eyebrow>
          </div>
        </Row>

        <Row title="Elevation">
          <div className="flex flex-wrap gap-5">
            {SHADOWS.map(([name, cls]) => (
              <div
                key={name}
                className={`flex h-24 w-[168px] items-center justify-center rounded-card border border-line bg-surface text-[13px] text-secondary ${cls}`}
              >
                shadow-{name}
              </div>
            ))}
          </div>
        </Row>

        <Row title="Radius">
          <div className="flex flex-wrap items-end gap-5">
            {RADII.map(([name, cls]) => (
              <div key={name} className="text-center">
                <div
                  className={`size-20 border border-line-hover bg-gold-tint ${cls}`}
                />
                <p className="mt-2 text-[12px] text-secondary">{name}</p>
              </div>
            ))}
          </div>
        </Row>

        <Row title="Texture">
          <div className="flex flex-wrap gap-5">
            <div className="relative h-28 w-[220px] overflow-hidden rounded-card border border-line bg-bone">
              <div className="glow-gold absolute inset-0" />
              <span className="absolute bottom-3 left-3 text-[12px] text-secondary">
                glow-gold
              </span>
            </div>
            <div className="h-28 w-[220px] rounded-card shimmer" />
            <div className="flex h-28 w-[220px] flex-col justify-center gap-3 rounded-card border border-line bg-surface px-4">
              <div className="rule-dashed" />
              <span className="text-[12px] text-secondary">rule-dashed</span>
            </div>
          </div>
        </Row>

        <Row title="Motion">
          <div className="flex flex-wrap items-center gap-8">
            <div className="size-16 animate-at-float rounded-card bg-gold-tint" />
            <div className="size-16 animate-at-glow rounded-pill bg-gold" />
            <div className="size-4 animate-at-pulse rounded-pill bg-gold" />
            <Reveal
              stagger
              className="flex gap-2"
            >
              {["Sourcing", "Screening", "Shortlist"].map((c, i) => (
                <span
                  key={c}
                  style={{ "--i": i } as React.CSSProperties}
                  className="rounded-pill border border-gold-line bg-gold-tint px-3.5 py-1.5 text-[12px] font-semibold text-gold-deep"
                >
                  {c}
                </span>
              ))}
            </Reveal>
          </div>
          <p className="mt-4 text-[13px] text-secondary">
            Toggle &ldquo;Reduce motion&rdquo; in System Settings and reload,
            everything above should hold still.
          </p>
        </Row>
      </Container>
    </main>
  );
}
