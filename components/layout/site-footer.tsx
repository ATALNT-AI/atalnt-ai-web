import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";
import { SITE } from "@/lib/site";
import { LEGAL_CONTACT, SMS_PHONE, SMS_PHONE_HREF } from "@/lib/content/legal";

/** Launch footer. Only routes that exist, same rule as the nav. */
const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Testimonials", href: "/testimonials" },
          ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Book a demo", href: "/demo" },
      { label: "Contact", href: "mailto:admin@atalnt.com" },
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
              AI recruiting with a real person on every search.
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
                        className="inline-block py-2.5 text-[14px] text-on-dark-muted transition-colors hover:text-on-dark"
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

        <div className="mt-16 border-t border-ink-line pt-12">
          <p className="mx-auto max-w-[30ch] text-center font-display text-[clamp(19px,2.3vw,26px)] leading-[1.35] text-gold-bright text-balance">
            Built for companies done paying agencies for every hire, and done
            building expensive internal recruiting teams and infrastructure.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-ink-line pt-7 text-[13px] text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.parent.name}. All rights
            reserved.
          </p>
          {/* Legal name, phone, and email in the footer are an A2P 10DLC
              registration requirement; they must match the privacy policy. */}
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-5">
            <a
              href={SMS_PHONE_HREF}
              className="inline-block py-2 transition-colors hover:text-on-dark"
            >
              {SMS_PHONE}
            </a>
            <a
              href={`mailto:${LEGAL_CONTACT}`}
              className="inline-block py-2 transition-colors hover:text-on-dark"
            >
              {LEGAL_CONTACT}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
