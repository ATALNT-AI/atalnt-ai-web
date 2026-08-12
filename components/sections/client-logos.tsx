import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

/**
 * Client roster from atalnt.com: companies the firm behind ATALNT AI has
 * actually hired for. Same assets as the parent site so the proof matches.
 *
 * Treatment: grayscale + multiply flattens every logo (including the
 * white-background ones) into uniform ink marks on bone. Hover restores the
 * original. Heights are tuned per file so optical sizes match.
 */
/**
 * `box` logos are dark art on a white rectangle: multiply hides the box.
 * The rest are white art on transparency (drawn for atalnt.com's dark site):
 * brightness(0) turns them into ink silhouettes that read on bone.
 */
const CLIENTS = [
  { src: "/clients/landstar.png", alt: "Landstar", h: 26, box: true },
  { src: "/clients/bettaway.png", alt: "Bettaway", h: 34 },
  { src: "/clients/armstrong.png", alt: "Armstrong", h: 22 },
  { src: "/clients/007freight.png", alt: "007 Freight", h: 38 },
  { src: "/clients/servefreight.svg", alt: "Serve Freight", h: 36 },
  { src: "/clients/brownlogistics.png", alt: "Brown Logistics", h: 44, box: true },
  { src: "/clients/vannoy.png", alt: "Vannoy", h: 40 },
  { src: "/clients/adamselectric.png", alt: "Adams Electric", h: 30 },
];

export function ClientLogos() {
  return (
    <section
      aria-label="Companies ATALNT has hired for"
      className="border-y border-line bg-bone py-10"
    >
      <Container>
        <Reveal>
          <p className="text-center text-[11.5px] font-bold tracking-[0.08em] text-muted uppercase">
            Teams we&rsquo;ve hired for
          </p>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {CLIENTS.map((c) => (
              <li key={c.alt} className="flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.src}
                  alt={c.alt}
                  style={{ height: c.h }}
                  className={
                    "box" in c && c.box
                      ? "w-auto opacity-70 grayscale mix-blend-multiply"
                      : "w-auto opacity-60 brightness-0"
                  }
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
