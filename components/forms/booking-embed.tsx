"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { BOOKING } from "@/lib/site";

/**
 * Calendly, inline embed (replaced Zoho Bookings, Aug 2026).
 *
 * This uses Calendly's own widget.js and the data-url div, which is the
 * configuration they publish and support. Rolling our own iframe also works,
 * but their loader handles the embed parameters and any future changes to how
 * the booking page boots, and that is worth more than saving one script.
 *
 * The skeleton stays for the same reason it did with Zoho: a third-party
 * embed paints nothing for a beat, and a blank box reads as broken. Calendly
 * is much faster, so the hold is short and released as soon as the widget
 * puts its iframe in the DOM.
 *
 * Fixed height because a cross-origin embed cannot report its own height.
 * 700px is Calendly's own recommendation for the inline embed.
 */
export function BookingEmbed() {
  const holder = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [stalled, setStalled] = useState(false);

  // The widget signals arrival by inserting an iframe into our div.
  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    if (el.querySelector("iframe")) {
      setReady(true);
      return;
    }
    const obs = new MutationObserver(() => {
      if (el.querySelector("iframe")) {
        setReady(true);
        obs.disconnect();
      }
    });
    obs.observe(el, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  // Privacy blockers can stop the script outright. There is no fallback link
  // under the calendar, so the skeleton's own line becomes the way out.
  useEffect(() => {
    if (ready) return;
    const t = setTimeout(() => setStalled(true), 8000);
    return () => clearTimeout(t);
  }, [ready]);

  return (
    <div className="relative overflow-hidden rounded-hero border border-line bg-surface shadow-raised">
      <div
        ref={holder}
        className="calendly-inline-widget block h-[700px] w-full"
        data-url={BOOKING.embedUrl}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />

      <div
        className={`absolute inset-0 flex flex-col bg-surface p-6 transition-opacity duration-500 sm:p-8 ${
          ready ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div aria-hidden className="contents">
          <div className="shimmer h-5 w-44 rounded-sm" />
          <div className="shimmer mt-3 h-3.5 w-64 max-w-full rounded-sm" />
          <div className="mt-8 grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className="shimmer aspect-square rounded-sm" />
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-2.5">
            <div className="shimmer h-3.5 w-full rounded-sm" />
            <div className="shimmer h-3.5 w-4/5 rounded-sm" />
          </div>
        </div>
        {stalled && !ready ? (
          <p className="pointer-events-auto mt-auto text-[13px] text-muted">
            Taking a while?{" "}
            <a
              href={BOOKING.directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-secondary underline underline-offset-4 hover:text-ink"
            >
              Open the calendar in a new tab
            </a>
            .
          </p>
        ) : (
          <p className="mt-auto text-[13px] text-muted">
            Loading the calendar&hellip;
          </p>
        )}
      </div>
    </div>
  );
}
