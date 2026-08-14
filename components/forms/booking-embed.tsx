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

  useEffect(() => {
    if (!shellLoaded) return;
    // The Ember app keeps working after the shell's load event; hold the
    // skeleton a moment longer so the fade lands near the real paint.
    const t = setTimeout(() => setSettled(true), 1200);
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

      {/* Calendar-shaped placeholder, painted instantly. aria-hidden because
          the iframe below carries the accessible name; this is scenery. Stays
          mounted through the fade so the transition can actually play. */}
      <div
        aria-hidden
        className={`absolute inset-0 flex flex-col bg-surface p-6 transition-opacity duration-500 sm:p-8 ${
          settled ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
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
        <p className="mt-auto text-[13px] text-muted">
          Loading the calendar&hellip;
        </p>
      </div>
    </div>
  );
}

/**
 * Shown if the iframe is blocked (strict privacy extensions do this), so the
 * page never becomes a dead end.
 */
export function BookingFallback() {
  return (
    <p className="mt-4 text-center text-[13px] text-muted">
      Calendar not loading?{" "}
      <a
        href={BOOKING.directUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block py-1.5 font-semibold text-secondary underline underline-offset-4 hover:text-ink"
      >
        Open it in a new tab
      </a>{" "}
      or email{" "}
      <a
        href="mailto:hello@atalnt.com"
        className="inline-block py-1.5 font-semibold text-secondary underline underline-offset-4 hover:text-ink"
      >
        hello@atalnt.com
      </a>
      .
    </p>
  );
}
