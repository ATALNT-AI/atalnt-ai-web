"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { CTA_HREF, NAV_LINKS } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "glass-bone sticky top-0 z-50 transition-shadow duration-200",
        scrolled ? "border-b border-line shadow-rest" : "border-b border-transparent"
      )}
    >
      <Container>
        <nav
          aria-label="Main"
          className="flex h-16 items-center justify-between gap-6"
        >
          <Link href="/" className="shrink-0" aria-label="ATALNT AI home">
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[14.5px] font-medium text-secondary transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Button href="/test-drive" variant="ghost" size="sm">
              Test drive
            </Button>
            <Button href={CTA_HREF} size="sm">
              Book a walkthrough
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-10 items-center justify-center rounded-nav border border-line-input bg-surface lg:hidden"
          >
            <span className="relative block h-[10px] w-[18px]" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full bg-ink transition-transform duration-200",
                  open ? "top-[4px] rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full bg-ink transition-transform duration-200",
                  open ? "top-[4px] -rotate-45" : "top-[9px]"
                )}
              />
            </span>
          </button>
        </nav>
      </Container>

      {open && (
        <div
          id="mobile-nav"
          className="glass-bone fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line lg:hidden"
        >
          <Container className="py-8">
            <ul className="flex flex-col">
              {NAV_LINKS.map((l, i) => (
                <li key={l.href} style={{ "--i": i } as React.CSSProperties}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line-inner py-4 font-display text-[26px] text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <Button href={CTA_HREF} size="lg" className="w-full">
                Book a walkthrough
              </Button>
              <Button href="/test-drive" variant="secondary" size="lg" className="w-full">
                Take a test drive
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
