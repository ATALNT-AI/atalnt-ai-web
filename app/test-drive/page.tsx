import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/wordmark";
import { BadgePill } from "@/components/ui/badge-pill";
import { CTA_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Test drive",
  description:
    "Take the ATALNT AI platform for a test drive. Click through a real search yourself, no signup and no sales call. Sample data throughout.",
  alternates: { canonical: "/test-drive" },
};

/**
 * Thin branded chrome around the standalone demo bundle in /public/demo.
 * The chrome is what turns a raw build artifact into a marketing surface: it
 * keeps a CTA on screen the whole time someone is playing with it.
 *
 * The bundle is never iframed on the home page. It is ~866KB (about 450KB over
 * the wire after compression), so it stays entirely off the critical path.
 */
export default function TestDrivePage() {
  return (
    <div className="flex h-dvh flex-col bg-bone">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-line bg-bone px-4 py-2.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-4">
          <Link href="/" aria-label="ATALNT AI home">
            <Wordmark size="sm" />
          </Link>
          <span className="hidden sm:block">
            <BadgePill tone="gold">Test drive</BadgePill>
          </span>
          <p className="hidden truncate text-[13px] text-secondary lg:block">
            Click anything. No signup, and every candidate here is sample data.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button href="/" variant="ghost" size="sm" className="hidden sm:flex">
            ← Back to site
          </Button>
          <Button href={CTA_HREF} size="sm">
            Book a walkthrough
          </Button>
        </div>
      </header>

      {/* Desktop-shaped app. On small screens we say so rather than showing a
          broken experience, which would cost the lead. */}
      <div className="flex flex-1 items-center justify-center p-6 md:hidden">
        <div className="max-w-[380px] text-center">
          <h1 className="text-[26px] text-ink">Best seen on a desktop</h1>
          <p className="mt-3 text-[15px] leading-[1.65] text-secondary">
            The demo is a full hiring workspace, so it needs a wider screen to
            be worth your time. Open this page on a laptop, or book a
            walkthrough and we&rsquo;ll run it with you.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Button href={CTA_HREF} size="lg">
              Book a walkthrough
            </Button>
            <Button href="/" variant="secondary" size="lg">
              Back to site
            </Button>
          </div>
        </div>
      </div>

      <iframe
        src="/demo/index.html"
        title="ATALNT AI interactive product demo"
        className="hidden min-h-0 flex-1 border-0 md:block"
      />
    </div>
  );
}
