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
  sm: { text: "text-[17px]", ai: "text-[9px]", gem: 15, gap: "gap-2" },
  md: { text: "text-[21px]", ai: "text-[10px]", gem: 20, gap: "gap-2.5" },
  lg: { text: "text-[30px]", ai: "text-[13px]", gem: 24, gap: "gap-3" },
} as const;

/**
 * The final mark (B9's monogram): four gold facets with the "A" knocked out
 * in the ground color, so the letter reads as cut from the stone. Inline SVG
 * so it stays crisp at every size and needs no asset request.
 */
function Gem({ size, knockout }: { size: number; knockout: string }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className="shrink-0"
    >
      <path d="M24 3 L45 24 L24 24 Z" fill="#E8C87E" />
      <path d="M24 3 L3 24 L24 24 Z" fill="#C8A24C" />
      <path d="M3 24 L24 45 L24 24 Z" fill="#A8823A" />
      <path d="M45 24 L24 45 L24 24 Z" fill="#8A6D22" />
      <path
        d="M24 12 L31.5 33 H28.2 L26.4 27.6 H21.6 L19.8 33 H16.5 Z M24 19.8 L22.5 24.6 H25.5 Z"
        fill={knockout}
      />
    </svg>
  );
}

/**
 * The ATALNT AI wordmark, drawn in code rather than shipped as an image:
 * the faceted gem, "ATALNT" in Newsreader, and a raised gold "AI".
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
      <Gem size={s.gem} knockout={tone === "light" ? "#F7F4EC" : "#15130E"} />
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
