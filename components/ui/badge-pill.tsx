import { cn } from "@/lib/cn";

type BadgeTone = "gold" | "green" | "terracotta" | "neutral" | "onDark";

const TONES: Record<BadgeTone, string> = {
  gold: "bg-gold-tint border-gold-line text-gold-deep",
  green: "bg-success-tint border-success-line text-success",
  terracotta: "bg-decline-tint border-decline-line text-decline",
  neutral: "bg-bone-100 border-line text-secondary",
  onDark: "bg-ink-raised border-ink-line text-gold-bright",
};

/**
 * The demo's badge: 11.5px, bold, wide-tracked, fully rounded.
 */
export function BadgePill({
  tone = "neutral",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border px-[11px] py-[4px]",
        "text-[11.5px] font-bold tracking-[0.03em] uppercase whitespace-nowrap",
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
