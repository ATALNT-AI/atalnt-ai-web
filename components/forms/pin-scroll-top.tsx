"use client";

import { useEffect } from "react";

/**
 * Holds the page at the top while a third-party iframe finishes loading.
 *
 * The Zoho Bookings widget focuses a control inside itself once its calendar
 * renders, and a focus inside an iframe makes the browser scroll every
 * ancestor to reveal it. On /demo that dragged the visitor down to the bottom
 * edge of the 760px iframe, so the page appeared to open half-way down with
 * the heading and the first half of the calendar above the viewport.
 *
 * There is no way to refuse a cross-origin focus, so instead we undo the
 * scroll it causes, and only until the visitor does something themselves.
 *
 * Deliberately inert in three cases, so this never fights a real intention:
 *   - the page did not open at the top (a restored scroll position, or a hash)
 *   - the visitor scrolls, taps, or presses a key
 *   - the grace period expires
 */
export function PinScrollTop({ graceMs = 4000 }: { graceMs?: number }) {
  useEffect(() => {
    // Someone arriving mid-page meant to be there. Leave them alone.
    if (window.scrollY > 0 || window.location.hash) return;

    const INTENT = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    let released = false;

    const onScroll = () => {
      if (!released && window.scrollY > 0) {
        // `instant` so this does not animate against the smooth scrolling
        // declared on <html>.
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };

    const release = () => {
      released = true;
      cleanup();
    };

    function cleanup() {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      INTENT.forEach((e) => window.removeEventListener(e, release));
    }

    const timer = setTimeout(release, graceMs);
    window.addEventListener("scroll", onScroll, { passive: true });
    INTENT.forEach((e) =>
      window.addEventListener(e, release, { passive: true, once: true })
    );

    return cleanup;
  }, [graceMs]);

  return null;
}
