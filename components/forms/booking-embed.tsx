"use client";

import { useEffect, useState } from "react";
import { BOOKING } from "@/lib/site";

/**
 * Zoho Bookings, embedded. Replaces the old lead form: a booked slot beats a
 * form submission that still needs a reply.
 *
 * The widget is slow by construction: a 0.5s HTML shell, then an Ember app
 * from static.zohocdn.com, then API calls to three more Zoho origins before
 * the calendar paints. Two things here take the edge off:
 *
 *  - Preconnects (rendered by the page, see /demo) warm DNS and TLS to every
 *    origin the iframe is about to hit, so its requests start on open sockets.
 *  - A skeleton stands in for the calendar while it boots. The iframe's load
 *    event fires when the shell arrives, not when Ember renders, so the fade
 *    waits a beat after it. Without this the reader stares at a white box and
 *    reads it as broken.
 *
 * The iframe is fixed-height because Zoho's widget cannot report its own
 * height to a cross-origin parent, so there is no way to size it to content.
 * 760px fits the calendar and the details step on a laptop without an inner
 * scrollbar; the widget scrolls internally on shorter screens.
 */
export function BookingEmbed() {
  const [shellLoaded, setShellLoaded] = useState(false);
  const [settled, setSettled] = useState(false);
  const [stalled, setStalled] = useState(false);

  useEffect(() => {
    if (!shellLoaded) return;
    // The Ember app keeps working after the shell's load event; hold the
    // skeleton a moment longer so the fade lands near the real paint.
    const t = setTimeout(() => setSettled(true), 1200);
    return () => clearTimeout(t);
  }, [shellLoaded]);

  // Privacy blockers can kill the iframe outright. There is deliberately no
  // fallback link under the calendar (removed at Nik's request), so if the
  // shell never arrives, the skeleton's own loading line becomes the way out.
  useEffect(() => {
    if (shellLoaded) return;
    const t = setTimeout(() => setStalled(true), 8000);
    return () => clearTimeout(t);
  }, [shellLoaded]);

  return (
    <div className="relative overflow-hidden rounded-hero border border-line bg-surface shadow-raised">
      <iframe
        src={BOOKING.embedUrl}
        title="Book an ATALNT AI demo"
        loading="eager"
        onLoad={() => setShellLoaded(true)}
        className="block h-[760px] w-full border-0"
        allow="camera; microphone; fullscreen"
      />

      {/* Calendar-shaped placeholder, painted instantly. The shimmer block is
          aria-hidden scenery, but the wrapper is not: in the stalled state the
          loading line becomes a real link, and it must stay reachable. Stays
          mounted through the fade so the transition can actually play. */}
      <div
        className={`absolute inset-0 flex flex-col bg-surface p-6 transition-opacity duration-500 sm:p-8 ${
          settled ? "pointer-events-none opacity-0" : "opacity-100"
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
        {stalled && !shellLoaded ? (
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

