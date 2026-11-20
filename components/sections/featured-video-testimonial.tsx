"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { VideoTestimonial } from "@/lib/content/testimonials";

/**
 * A client video testimonial, self-hosted like the launch film: nothing but
 * the poster loads until the visitor presses play. Captions are burned into
 * the video (most people start it muted), so there is no separate track to
 * double them up. The cuts toggle swaps the source and keeps playing if it
 * already was. React owns the src; setting it here too would start a second
 * load that cancels the play request.
 */
export function FeaturedVideoTestimonial({ t }: { t: VideoTestimonial }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [cut, setCut] = useState(0);
  const active = t.cuts[cut];

  useEffect(() => {
    if (playing) videoRef.current?.play().catch(() => {});
  }, [cut, playing]);

  function play() {
    setPlaying(true);
    // Start inside the click itself: Safari only allows play() during the gesture.
    videoRef.current?.play().catch(() => {});
  }

  function choose(i: number) {
    if (i !== cut) setCut(i);
  }

  return (
    <figure className="grid overflow-hidden rounded-hero border border-ink-line bg-ink shadow-dark lg:grid-cols-[1.5fr_1fr]">
      {/* The quote column can make this row taller than 16:9, so the video
          and its poster overlay sit centred in a box of their own. */}
      <div className="flex items-center bg-ink">
        <div className="relative w-full overflow-hidden">
          <video
            ref={videoRef}
            controls={playing}
            preload="none"
            playsInline
            poster={t.poster}
            className="block aspect-video w-full"
            src={active.src}
          >
            Your browser can&rsquo;t play this video.
          </video>

          {!playing && (
            <button
              type="button"
              onClick={play}
              aria-label={`Play ${t.author}'s video testimonial, ${active.label.toLowerCase()}, ${active.duration}`}
              className="group absolute inset-0 flex items-end justify-end p-4 sm:justify-start sm:p-7"
            >
              <Image
                src={t.poster}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0"
              />
              <span className="relative flex items-center gap-3.5">
                <span className="flex size-12 items-center justify-center rounded-pill bg-gold-bright shadow-dark ring-4 ring-gold-bright/25 transition-transform duration-200 group-hover:scale-105 sm:size-16 sm:ring-8 lg:size-[72px]">
                  <span
                    aria-hidden
                    className="ml-1 block size-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-ink sm:border-y-[11px] sm:border-l-[18px]"
                  />
                </span>
                <span className="hidden text-left sm:block">
                  <span className="block text-[15px] font-semibold text-on-dark">
                    Watch {t.author.split(" ")[0]}&rsquo;s story
                  </span>
                  <span className="block text-[13px] text-on-dark-muted">
                    {active.label} &middot; {active.duration}
                  </span>
                </span>
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-8 p-7 sm:p-9 lg:p-10">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.14em] text-gold-bright uppercase">
            Client story
          </p>
          <span
            aria-hidden
            className="mt-3 block h-[2px] w-12 bg-gold-bright"
          />
          <blockquote className="mt-6 font-display text-[26px] leading-[1.25] text-on-dark italic text-pretty sm:text-[30px]">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
        </div>

        <div>
          <figcaption className="border-t border-ink-line pt-5">
            <p className="text-[15px] font-semibold text-on-dark">{t.author}</p>
            <p className="mt-0.5 text-[13px] text-on-dark-muted">
              {t.role}, {t.company}
            </p>
            {t.linkedin && (
              <a
                href={t.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.author} on LinkedIn`}
                className="mt-2 inline-block py-1.5 text-[13px] font-semibold text-gold-bright underline-offset-4 transition-colors hover:text-on-dark hover:underline"
              >
                LinkedIn &#8599;
              </a>
            )}
          </figcaption>

          {t.cuts.length > 1 && (
            <div
              role="group"
              aria-label="Choose a cut"
              className="mt-5 inline-flex rounded-pill border border-ink-line bg-ink-raised p-1"
            >
              {t.cuts.map((c, i) => (
                <button
                  key={c.src}
                  type="button"
                  onClick={() => choose(i)}
                  aria-pressed={i === cut}
                  className={`rounded-pill px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-150 ${
                    i === cut
                      ? "bg-gold-bright text-ink"
                      : "text-on-dark-muted hover:text-on-dark"
                  }`}
                >
                  {c.label} &middot; {c.duration}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </figure>
  );
}
