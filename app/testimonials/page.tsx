import type { Metadata } from "next";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { ClientLogos } from "@/components/sections/client-logos";
import { CtaBand } from "@/components/sections/cta-band";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { FeaturedVideoTestimonial } from "@/components/sections/featured-video-testimonial";
import {
  CLIENT_TESTIMONIALS,
  CANDIDATE_TESTIMONIALS,
  VIDEO_TESTIMONIALS,
  type Testimonial,
} from "@/lib/content/testimonials";

const SHARE_DESCRIPTION =
  "Nelly Schlack, HR Manager at MMI Industrial & Steel, on agencies charging 20%+ of salary, and why ATALNT AI filled her roles faster. Watch her story.";
const SHARE_IMAGE = {
  url: "/testimonials/mmi/nelly-share.jpg",
  width: 1200,
  height: 630,
  alt: "Nelly Schlack, HR Manager at MMI Industrial & Steel: \u201cIf there\u2019s going to be a test, this is it.\u201d",
};

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Hear it straight from our clients. Watch Nelly Schlack, HR Manager at MMI Industrial & Steel, on hiring with ATALNT AI.",
  alternates: { canonical: "/testimonials" },
  // Child metadata replaces the layout's openGraph and twitter whole, so every
  // field is restated. This is the card people see when the link is shared.
  openGraph: {
    type: "website",
    siteName: "ATALNT AI",
    url: "https://atalnt.ai/testimonials",
    title: "How MMI Industrial & Steel fixed a broken hiring process with ATALNT AI",
    description: SHARE_DESCRIPTION,
    locale: "en_US",
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AtalntLLC",
    title: "How MMI Industrial & Steel fixed a broken hiring process with ATALNT AI",
    description: SHARE_DESCRIPTION,
    images: [SHARE_IMAGE.url],
  },
};

function QuoteCard({ t, dark = false }: { t: Testimonial; dark?: boolean }) {
  return (
    <figure
      className={
        dark
          ? "flex h-full flex-col rounded-hero border border-ink-line bg-ink-raised p-7 shadow-dark sm:p-8"
          : "flex h-full flex-col rounded-hero border border-line bg-surface p-7 shadow-rest transition-shadow duration-200 hover:shadow-lift sm:p-8"
      }
    >
      <span
        aria-hidden
        className={`font-display text-[40px] leading-none ${dark ? "text-gold-bright" : "text-gold-line"}`}
      >
        &ldquo;
      </span>
      <blockquote
        className={`mt-2 flex-1 text-[16px] leading-[1.65] text-pretty ${dark ? "text-on-dark/85" : "text-body"}`}
      >
        {t.quote}
      </blockquote>
      <figcaption
        className={`mt-6 border-t pt-5 ${dark ? "border-ink-line" : "border-line-inner"}`}
      >
        <p
          className={`text-[15px] font-semibold ${dark ? "text-on-dark" : "text-ink"}`}
        >
          {t.author}
        </p>
        <p
          className={`mt-0.5 text-[13px] ${dark ? "text-on-dark-muted" : "text-secondary"}`}
        >
          {t.role}, {t.company}
        </p>
        {t.linkedin && (
          <a
            href={t.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.author} on LinkedIn`}
            className={`mt-2 inline-block py-1.5 text-[13px] font-semibold underline-offset-4 transition-colors hover:underline ${dark ? "text-gold-bright hover:text-on-dark" : "text-secondary hover:text-ink"}`}
          >
            LinkedIn &#8599;
          </a>
        )}
      </figcaption>
    </figure>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Section bg="bone" size="md">
          <Container>
            <Reveal>
              <SectionHeader
                align="center"
                eyebrow="Testimonials"
                title="Hear it straight from our clients."
                subtitle="What changed for the HR teams who hire with ATALNT AI."
              />
            </Reveal>

            {VIDEO_TESTIMONIALS.map((t, i) => (
              <Reveal
                key={t.author}
                delay={100 + i * 80}
                className="mt-14 block"
              >
                <FeaturedVideoTestimonial t={t} />
              </Reveal>
            ))}

            {/* Renders only once real, approved client quotes exist. */}
            {CLIENT_TESTIMONIALS.length > 0 && (
              <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {CLIENT_TESTIMONIALS.map((t, i) => (
                  <Reveal key={t.author} as="li" delay={i * 80}>
                    <QuoteCard t={t} />
                  </Reveal>
                ))}
              </ul>
            )}
          </Container>
        </Section>

        <ClientLogos />

        {/* Renders only once real candidate quotes exist. */}
        {CANDIDATE_TESTIMONIALS.length > 0 && (
          <Section bg="ink" size="md" aria-labelledby="candidates-heading">
            <div
              aria-hidden
              className="dots-dark pointer-events-none absolute inset-0"
            />
            <Container className="relative">
              <Reveal>
                <SectionHeader
                  id="candidates-heading"
                  tone="dark"
                  align="center"
                  eyebrow="From candidates"
                  title="The other side of the shortlist."
                  subtitle="How the process felt for the people we placed."
                />
              </Reveal>
              <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {CANDIDATE_TESTIMONIALS.map((t, i) => (
                  <Reveal key={t.author} as="li" delay={i * 80}>
                    <QuoteCard t={t} dark />
                  </Reveal>
                ))}
              </ul>
            </Container>
          </Section>
        )}

        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
