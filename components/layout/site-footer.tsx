import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";
import { SITE } from "@/lib/site";

/** Launch footer. Only routes that exist, same rule as the nav. */
const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#main" },
      { label: "Pricing", href: "/pricing" },
      { label: "Test drive", href: "/test-drive" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Book a walkthrough", href: "/demo" },
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
            <p className="mt-5 text-[13px] text-on-dark-muted">
              A product of{" "}
              <a
                href={SITE.parent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-bright underline-offset-4 hover:underline"
              >
                {SITE.parent.name}
              </a>
            </p>
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
