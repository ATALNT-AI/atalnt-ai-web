import { ImageResponse } from "next/og";

/**
 * The link-preview card for iMessage, Slack, LinkedIn, and search.
 * Without this, scrapers grab the largest image on the page, which was a
 * founder headshot. Ink background, the faceted gem, the wordmark, one line.
 */

export const alt =
  "ATALNT AI. Replace the placement fee. Keep the recruiter.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The final mark (B9's monogram, bare since the card ground is already ink).
const GEM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none"><path d="M24 3 L45 24 L24 24 Z" fill="#E8C87E"/><path d="M24 3 L3 24 L24 24 Z" fill="#C8A24C"/><path d="M3 24 L24 45 L24 24 Z" fill="#A8823A"/><path d="M45 24 L24 45 L24 24 Z" fill="#8A6D22"/><path d="M24 12 L31.5 33 H28.2 L26.4 27.6 H21.6 L19.8 33 H16.5 Z M24 19.8 L22.5 24.6 H25.5 Z" fill="#15130E"/></svg>`;
const GEM_URI = `data:image/svg+xml,${encodeURIComponent(GEM_SVG)}`;

/** Fetch a TTF from Google Fonts; the legacy UA makes css2 return truetype. */
async function googleFont(family: string, weight: number) {
  // css2 wants literal + for spaces; %20 returns an error page.
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 6.1; rv:10.0) Gecko/20100101 Firefox/10.0",
        },
      }
    )
  ).text();
  // satori accepts TTF, OTF, and WOFF (not woff2); this UA serves woff/ttf.
  const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype|woff)'\)/)?.[1];
  if (!url) throw new Error(`No TTF for ${family}`);
  return (await fetch(url)).arrayBuffer();
}

export default async function OgImage() {
  const [newsreader, hanken] = await Promise.all([
    googleFont("Newsreader", 500),
    googleFont("Hanken Grotesk", 600),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#15130E",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={GEM_URI} width={110} height={110} alt="" />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginTop: 44,
          }}
        >
          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: 118,
              color: "#F7F4EC",
              letterSpacing: 5,
              lineHeight: 1,
            }}
          >
            ATALNT
          </div>
          <div
            style={{
              fontFamily: "Hanken",
              fontSize: 40,
              color: "#C8A24C",
              letterSpacing: 8,
              marginLeft: 14,
              marginTop: 8,
            }}
          >
            AI
          </div>
        </div>
        <div
          style={{
            fontFamily: "Hanken",
            fontSize: 32,
            color: "#A89F8C",
            marginTop: 34,
          }}
        >
          Replace the placement fee. Keep the recruiter.
        </div>
        <div
          style={{
            fontFamily: "Hanken",
            fontSize: 24,
            color: "#8A6D22",
            marginTop: 44,
            letterSpacing: 3,
          }}
        >
          atalnt.ai
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: newsreader, weight: 500 },
        { name: "Hanken", data: hanken, weight: 600 },
      ],
    }
  );
}
