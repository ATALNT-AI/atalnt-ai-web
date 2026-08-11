import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { LEGAL_UPDATED, type LegalSection } from "@/lib/content/legal";

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <SiteNav />
      <main className="flex-1 py-16 sm:py-24">
        <Container size="sm">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-4 text-[clamp(32px,4.4vw,48px)] text-balance">
            {title}
          </h1>
          <p className="mt-4 text-[14px] text-muted">
            Last updated: {LEGAL_UPDATED}
          </p>
          {intro && (
            <p className="mt-6 text-[17px] leading-[1.7] text-secondary">
              {intro}
            </p>
          )}

          <div className="mt-14 flex flex-col gap-12">
            {sections.map((s, i) => (
              <section key={s.heading}>
                <h2 className="flex items-baseline gap-3 text-[24px] text-ink">
                  <span
                    aria-hidden
                    className="font-display text-[17px] text-gold-ink tabular"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.heading}
                </h2>

                <div className="mt-4 flex flex-col gap-4 border-l border-line pl-5">
                  {s.blocks.map((b, j) => {
                    if (typeof b === "string") {
                      return (
                        <p
                          key={j}
                          className="text-[15.5px] leading-[1.75] text-secondary"
                        >
                          {b}
                        </p>
                      );
                    }
                    if ("list" in b) {
                      return (
                        <ul key={j} className="flex flex-col gap-2.5">
                          {b.list.map((li) => (
                            <li
                              key={li}
                              className="flex gap-3 text-[15.5px] leading-[1.7] text-secondary"
                            >
                              <span
                                aria-hidden
                                className="mt-[9px] size-1.5 shrink-0 rotate-45 bg-gold-line"
                              />
                              {li}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <div key={j}>
                        <h3 className="text-[15px] font-semibold text-ink">
                          {b.sub}
                        </h3>
                        <p className="mt-1.5 text-[15.5px] leading-[1.75] text-secondary">
                          {b.body}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
