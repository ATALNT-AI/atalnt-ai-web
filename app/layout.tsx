import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  // The demo ships Newsreader italic and uses it for pull quotes — keep it.
  style: ["normal", "italic"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "AI recruiting platform",
    "subscription recruiting",
    "recruiting without agency fees",
    "contingent search alternative",
    "AI candidate sourcing",
    "resume screening AI",
    "logistics recruiting",
    "freight recruiting",
  ],
  authors: [{ name: "ATALNT LLC", url: "https://atalnt.com" }],
  creator: "ATALNT LLC",
  publisher: "ATALNT LLC",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} · ${SITE.tagline}`,
    description: SITE.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@AtalntLLC",
    title: `${SITE.name} · ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${hanken.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bone text-ink">
        {children}
      </body>
    </html>
  );
}
