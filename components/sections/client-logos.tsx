import { Container } from "@/components/ui/container";

/**
 * Client roster: the 8 logos atalnt.com ships plus the additional clients
 * ATALNT named directly (same search process, contingent pricing). Rendered
 * as a right-to-left marquee to match the parent site.
 *
 * Treatments (verified against each file's alpha channel):
 *   - `box`: dark art on an opaque white rectangle (landstar, brownlogistics).
 *     grayscale + multiply dissolves the box into the bone ground.
 *   - everything else: transparent art (some white, some colored).
 *     brightness-0 flattens all of it into uniform ink silhouettes.
 *
 * Balfour & Co is pending: their site sits behind a bot wall, so the file
 * comes from the client directly. Add it to CLIENTS when it lands.
 */
const CLIENTS = [
  { src: "/clients/landstar.png", alt: "Landstar", h: 26, box: true },
  { src: "/clients/bettaway.png", alt: "Bettaway", h: 34 },
  { src: "/clients/armstrong.png", alt: "Armstrong Transport Group", h: 22 },
  { src: "/clients/007freight.png", alt: "007 Freight", h: 38 },
  { src: "/clients/servefreight.svg", alt: "Serve Freight", h: 36 },
  { src: "/clients/brownlogistics.png", alt: "Brown Logistics", h: 44, box: true },
  { src: "/clients/vannoy.png", alt: "Vannoy", h: 40 },
  { src: "/clients/adamselectric.png", alt: "Adams Electric", h: 30 },
  { src: "/clients/danielstire.png", alt: "Daniels Tire Service", h: 34 },
  { src: "/clients/thsnational.png", alt: "THS National", h: 26 },
  { src: "/clients/nuagebuilders.png", alt: "NuAge Builders", h: 40 },
  { src: "/clients/creteunited.png", alt: "Crete United", h: 40 },
  { src: "/clients/sttlogistics.webp", alt: "STT Logistics Group", h: 34 },
  { src: "/clients/watsonelec.svg", alt: "Watson Electrical", h: 26 },
  { src: "/clients/proconmfg.png", alt: "Pro-Con Manufacturing", h: 30 },
  { src: "/clients/cadence.svg", alt: "Cadence", h: 26 },
];

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
            className={
              "box" in c && c.box
                ? "w-auto max-w-none opacity-70 grayscale mix-blend-multiply"
                : "w-auto max-w-none opacity-60 brightness-0"
            }
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

      {/* Full-bleed marquee with bone fade at the edges. */}
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
