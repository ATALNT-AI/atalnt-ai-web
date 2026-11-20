import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { FeaturedVideoTestimonial } from "@/components/sections/featured-video-testimonial";
import { VIDEO_TESTIMONIALS } from "@/lib/content/testimonials";

/** Homepage: the lead client video, so a visitor hears a client before the pricing math. */
export function ClientStory() {
  const t = VIDEO_TESTIMONIALS[0];
  if (!t) return null;
  return (
    <Section bg="sand" size="md" aria-labelledby="client-story-heading">
      <Container>
        <Reveal>
          <SectionHeader
            id="client-story-heading"
            align="center"
            eyebrow="Client story"
            title="Hear it straight from our clients."
            subtitle="What changed for the HR teams who hire with ATALNT AI."
          />
        </Reveal>
        <Reveal delay={100} className="mt-12 block">
          <FeaturedVideoTestimonial t={t} />
        </Reveal>
      </Container>
    </Section>
  );
}
