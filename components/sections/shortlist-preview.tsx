import { BadgePill } from "@/components/ui/badge-pill";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * The hero's product visual, drawn in the demo's own component language
 * rather than screenshotted — so it stays crisp, themeable, and responsive.
 */

/**
 * Illustrative candidates. Kept sector-neutral on purpose: the ICP is any team
 * hiring at volume, and the demo's freight seed data would make the product
 * look like a logistics point solution.
 */
const CANDIDATES = [
  {
    initials: "EV",
    avatar: "bg-[#E7DCC2]",
    name: "Elena V.",
    title: "Operations Manager · 8 yrs",
    pitch: "Scaled a 40-person team through two back-to-back growth years.",
    skills: ["Team Leadership", "Process Design", "Vendor Management"],
    match: 94,
  },
  {
    initials: "MC",
    avatar: "bg-[#DCE3D2]",
    name: "Marcus C.",
    title: "Operations Manager · 6 yrs",
    pitch: "Cut order cycle time by a third without adding headcount.",
    skills: ["Continuous Improvement", "Forecasting", "NetSuite"],
    match: 89,
  },
  {
    initials: "DA",
    avatar: "bg-[#E2D8E0]",
    name: "Dana A.",
    title: "Operations Lead · 5 yrs",
    pitch: "Ran daily operations across three sites and two shifts.",
    skills: ["Scheduling", "SOP Development", "Safety Compliance"],
    match: 86,
  },
];

export function ShortlistPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] animate-at-rise [animation-delay:240ms]">
      <div className="relative overflow-hidden rounded-hero border border-line bg-surface p-5 shadow-raised sm:p-6">
        {/* Periodic radar sweep: the AI is "reading" the shortlist. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-at-scan bg-gradient-to-r from-transparent via-gold/8 to-transparent"
        />
        <div className="flex items-center justify-between gap-4">
          <div>
            <Eyebrow tone="gold">AI-ranked shortlist</Eyebrow>
            <p className="mt-1.5 font-display text-[21px] text-ink">
              Operations Manager
            </p>
          </div>
          <BadgePill tone="gold">Ready</BadgePill>
        </div>

        <div className="rule-dashed my-5" />

        <ul className="flex flex-col gap-3">
          {CANDIDATES.map((c, i) => (
            <li
              key={c.name}
              style={{ animationDelay: `${420 + i * 90}ms` }}
              className="animate-at-rise rounded-card border border-line-inner bg-white p-4 shadow-rest"
            >
              <div className="flex items-start gap-3.5">
                <span
                  aria-hidden
                  className={`flex size-10 shrink-0 items-center justify-center rounded-pill text-[13px] font-bold text-body ${c.avatar}`}
                >
                  {c.initials}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="truncate text-[15px] font-semibold text-ink">
                      {c.name}
                    </p>
                    <span className="shrink-0 text-right">
                      <span className="font-display text-[19px] leading-none text-gold-ink tabular">
                        {c.match}%
                      </span>
                      <span className="ml-1 text-[9.5px] font-bold tracking-[0.08em] text-muted uppercase">
                        match
                      </span>
                    </span>
                  </div>

                  <p className="mt-0.5 text-[12.5px] text-secondary">
                    {c.title}
                  </p>
                  <p className="mt-2 text-[13px] leading-[1.5] text-body">
                    {c.pitch}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-pill border border-line bg-bone-50 px-2.5 py-1 text-[11px] font-medium text-secondary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* The thesis, rendered as UI: a human is doing the awkward part. */}
      <div className="animate-at-pop absolute -bottom-6 -left-4 max-w-[290px] rounded-card border border-line bg-white p-4 shadow-raised sm:-left-10 [animation-delay:900ms]">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex size-9 shrink-0 items-center justify-center rounded-pill bg-ink text-[12px] font-bold text-gold-bright"
          >
            AR
          </span>
          <div className="min-w-0">
            <p className="text-[13px] leading-[1.45] text-body">
              <span className="font-semibold text-ink">Alex Rivera</span> is
              confirming a time with Elena.
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.04em] text-gold-deep uppercase">
              <span
                aria-hidden
                className="size-1.5 animate-at-pulse rounded-pill bg-gold"
              />
              Your recruiter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
