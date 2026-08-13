import { BOOKING } from "@/lib/site";

/**
 * Zoho Bookings, embedded. Replaces the old lead form: a booked slot beats a
 * form submission that still needs a reply.
 *
 * The iframe is fixed-height because Zoho's widget cannot report its own
 * height to a cross-origin parent, so there is no way to size it to content.
 * 760px fits the calendar and the details step on a laptop without an inner
 * scrollbar; the widget scrolls internally on shorter screens.
 */
export function BookingEmbed() {
  return (
    <div className="overflow-hidden rounded-hero border border-line bg-surface shadow-raised">
      <iframe
        src={BOOKING.embedUrl}
        title="Book an ATALNT AI demo"
        className="block h-[760px] w-full border-0"
        allow="camera; microphone; fullscreen"
      />
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
        className="font-semibold text-secondary underline underline-offset-4 hover:text-ink"
      >
        Open it in a new tab
      </a>{" "}
      or email{" "}
      <a
        href="mailto:hello@atalnt.com"
        className="font-semibold text-secondary underline underline-offset-4 hover:text-ink"
      >
        hello@atalnt.com
      </a>
      .
    </p>
  );
}
