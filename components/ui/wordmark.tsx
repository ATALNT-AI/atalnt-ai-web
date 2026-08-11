import { cn } from "@/lib/cn";

type WordmarkProps = {
  /** `light` for bone backgrounds, `dark` for ink bands. */
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  /** Hide the "AI" superscript, for contexts that say ATALNT alone. */
  hideAi?: boolean;
  className?: string;
};

const SIZES = {
  sm: { text: "text-[17px]", ai: "text-[9px]", dot: "size-[7px]", gap: "gap-2" },
  md: { text: "text-[21px]", ai: "text-[10px]", dot: "size-[9px]", gap: "gap-2.5" },
  lg: { text: "text-[30px]", ai: "text-[13px]", dot: "size-[12px]", gap: "gap-3" },
} as const;

/**
 * The ATALNT AI wordmark, drawn in code rather than shipped as an image:
 * a 45°-rotated gold diamond, "ATALNT" in Newsreader, and a raised gold "AI".
 * Built from the demo's own logo treatment.
 */
export function Wordmark({
  tone = "light",
  size = "md",
  hideAi = false,
  className,
}: WordmarkProps) {
  const s = SIZES[size];
  return (
    <span
      className={cn("inline-flex items-center", s.gap, className)}
      aria-label="ATALNT AI"
    >
      <span
        aria-hidden
        className={cn(
          "rotate-45 rounded-[1px]",
          s.dot,
          tone === "light" ? "bg-gold" : "bg-gold-bright"
        )}
      />
      <span
        aria-hidden
        className={cn(
          "font-display font-medium leading-none tracking-[0.04em]",
          s.text,
          tone === "light" ? "text-ink" : "text-on-dark"
        )}
      >
        ATALNT
        {!hideAi && (
          <sup
            className={cn(
              "ml-[3px] align-super font-semibold tracking-[0.12em]",
              s.ai,
              // Logotypes are WCAG-exempt, but this sets at 9–13px —
              // gold-deep keeps it legible without losing the gold read.
              tone === "light" ? "text-gold-deep" : "text-gold-bright"
            )}
          >
            AI
          </sup>
        )}
      </span>
    </span>
  );
}
