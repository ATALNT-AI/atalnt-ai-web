import { Container } from "@/components/ui/container";

/**
 * Client roster: the logos atalnt.com ships plus the clients ATALNT named
 * directly. Same search process for all of them, contingent pricing rather
 * than subscription. Scrolls right to left like the parent site.
 *
 * These files come from seventeen different companies in every possible
 * format, so each one gets the treatment its artwork actually needs. The
 * classification was made by measuring each file's alpha channel and mean
 * luminance, then checking the rendered result:
 *
 *   invert   White artwork drawn for atalnt.com's dark site. Invisible on
 *            bone until brightness(0) flips it to ink. Only safe for solid
 *            silhouettes: anything with knockouts inside a shape fills solid.
 *   box      Artwork sitting on an opaque light rectangle. multiply dissolves
 *            the rectangle into the bone ground.
 *   shape    Artwork inside a colored oval, circle, or badge. Neither of the
 *            above works: invert fills the shape, multiply washes it out. A
 *            contrast lift keeps the shape readable in grey.
 *   (none)   Already dark artwork on transparency. Grayscale is enough.
 */
type Treatment = "invert" | "box" | "shape";

type Client = {
  src: string;
  alt: string;
  /** Rendered height in px, tuned so optical sizes match across the row. */
  h: number;
  t?: Treatment;
};

const CLIENTS: Client[] = [
  { src: "/clients/landstar.png", alt: "Landstar", h: 26, t: "box" },
  { src: "/clients/bettaway.png", alt: "Bettaway", h: 34, t: "invert" },
  { src: "/clients/armstrong.png", alt: "Armstrong Transport Group", h: 22, t: "invert" },
  { src: "/clients/007freight.png", alt: "007 Freight", h: 38, t: "invert" },
  { src: "/clients/servefreight.svg", alt: "Serve Freight", h: 36, t: "invert" },
  { src: "/clients/brownlogistics.png", alt: "Brown Logistics", h: 44, t: "box" },
  { src: "/clients/vannoy.png", alt: "Vannoy", h: 40, t: "invert" },
  { src: "/clients/adamselectric.png", alt: "Adams Electric", h: 30, t: "invert" },
  { src: "/clients/danielstire.png", alt: "Daniels Tire Service", h: 38, t: "shape" },
  { src: "/clients/thsnational.png", alt: "THS National", h: 26 },
  { src: "/clients/nuagebuilders.png", alt: "NuAge Builders", h: 34, t: "box" },
  { src: "/clients/creteunited.png", alt: "Crete United", h: 44, t: "shape" },
  { src: "/clients/sttlogistics.webp", alt: "STT Logistics Group", h: 34, t: "invert" },
  { src: "/clients/watsonelec.svg", alt: "Watson Electrical", h: 26 },
  { src: "/clients/proconmfg.png", alt: "Pro-Con Manufacturing", h: 30 },
  { src: "/clients/cadence.svg", alt: "Cadence", h: 26 },
  { src: "/clients/balfour.jpg", alt: "Balfour & Co", h: 34, t: "box" },
];

const TREATMENT: Record<Treatment | "default", string> = {
  invert: "opacity-60 brightness-0",
  box: "opacity-70 grayscale mix-blend-multiply",
  shape: "opacity-80 grayscale contrast-[1.6] brightness-[0.75]",
  default: "opacity-65 grayscale",
};

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-14 pr-14"
    >
      {CLIENTS.map((c) => (
        <li key={c.alt} className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.src}
            alt={hidden ? "" : c.alt}
            style={{ height: c.h }}
            className={`w-auto max-w-none ${TREATMENT[c.t ?? "default"]}`}
          />
        </li>
      ))}
    </ul>
  );
}

export function ClientLogos() {
  return (
    <section
      aria-label="Companies ATALNT has hired for"
      className="border-y border-line bg-bone py-10"
    >
      <Container>
        <p className="text-center text-[11.5px] font-bold tracking-[0.08em] text-muted uppercase">
          Teams we&rsquo;ve hired for
        </p>
      </Container>

      {/* Full-bleed marquee with bone fades at the edges. The track paints its
          own bone ground because the animated transform creates a stacking
          context that would otherwise cut multiply off from the page. */}
      <div className="relative mt-7 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bone to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bone to-transparent"
        />
        <div className="flex w-max animate-at-marquee bg-bone">
          <LogoRow />
          <LogoRow hidden />
        </div>
      </div>
    </section>
  );
}
