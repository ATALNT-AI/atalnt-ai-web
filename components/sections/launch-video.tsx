"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";

/**
 * The launch film, self-hosted. 720p H.264 at /public/launch, 57MB, so the
 * video preloads NOTHING: the poster (a 94KB jpg of its own first frame)
 * stands in until the visitor presses play, and only then does a byte of
 * video move. Sits between the ink Difference band and the surface math
 * section, on bone, which keeps the two dark sections from touching.
 */
export function LaunchVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function play() {
    setPlaying(true);
    // play() after user gesture; controls take over from here.
    videoRef.current?.play();
  }

  return (
    <Section bg="bone" size="md" aria-labelledby="launch-heading">
      <Container>
        <Reveal>
          <SectionHeader
            id="launch-heading"
            align="center"
            eyebrow="The launch"
            title="See it in sixty seconds."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="relative mx-auto mt-10 max-w-[880px] overflow-hidden rounded-hero border border-line bg-ink shadow-raised">
            <video
              ref={videoRef}
              controls={playing}
              preload="none"
              playsInline
              poster="/launch/launch-poster.jpg"
              className="block aspect-video w-full"
              src="/launch/atalnt-ai-launch.mp4"
            />

            {!playing && (
              <button
                type="button"
                onClick={play}
                aria-label="Play the launch video"
                className="group absolute inset-0 flex items-center justify-center"
              >
                {/* Poster re-rendered above the video element so the play
                    affordance is ours, not the browser's. */}
                <Image
                  src="/launch/launch-poster.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 880px) 100vw, 880px"
                  className="object-cover"
                  priority={false}
                />
                <span className="relative flex size-20 items-center justify-center rounded-pill border border-gold-line bg-bone/90 shadow-lift backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
                  <span
                    aria-hidden
                    className="ml-1.5 block size-0 border-y-[13px] border-l-[22px] border-y-transparent border-l-gold-deep"
                  />
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
