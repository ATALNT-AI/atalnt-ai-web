import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";
import { SITE } from "@/lib/site";

/** Launch footer. Only routes that exist, same rule as the nav. */
const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Pricing", href: "/pricing" },
          ],
  },
  {
    title: "Company",
    links: [
      { label: "Book a demo", href: "/demo" },
      { label: "ATALNT LLC", href: SITE.parent.url },
      { label: "Contact", href: "mailto:hello@atalnt.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "SMS terms", href: "/sms-terms" },
      { label: "Subscription agreement", href: "/subscription-terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-on-dark">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-[300px]">
            <Wordmark tone="dark" />
            <p className="mt-5 text-[14.5px] leading-[1.6] text-on-dark-muted">
              AI recruiting with a real account manager on every search. On a
              subscription, not a placement fee.
            </p>
            <a
              href={SITE.parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-3 text-[13px] text-on-dark-muted transition-colors hover:text-on-dark"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/atalnt-logo.png"
                alt="ATALNT LLC logo"
                width={40}
                height={30}
                className="h-[30px] w-auto"
              />
              <span>
                A product of{" "}
                <span className="text-gold-bright">{SITE.parent.name}</span>
              </span>
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[12px] font-semibold tracking-[0.06em] text-gold-bright uppercase">
                {col.title}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => {
                  const external = /^https?:\/\//.test(l.href);
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-[14px] text-on-dark-muted transition-colors hover:text-on-dark"
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink-line pt-7 text-[13px] text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.parent.name}. All rights
            reserved.
          </p>
          <p>Built for teams who are done paying per placement.</p>
        </div>
      </Container>
    </footer>
  );
}
