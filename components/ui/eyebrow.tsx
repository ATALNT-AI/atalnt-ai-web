import { cn } from "@/lib/cn";

type EyebrowProps = {
  /**
   * `default` — warm grey on bone, 5.04:1.
   * `gold` — deep gold on bone, 5.54:1. For emphasis.
   * `onDark` — bright gold on ink, 7.71:1.
   */
  tone?: "default" | "gold" | "onDark";
  as?: "p" | "span" | "div";
  className?: string;
  children: React.ReactNode;
};

/**
 * The demo renders eyebrows in #A89F8C, which is 2.39:1 on bone and fails
 * every WCAG threshold. These use the AA-safe tokens instead — same visual
 * weight, readable by everyone.
 */
const TONES = {
  default: "text-eyebrow text-[12px] font-semibold tracking-[0.06em]",
  gold: "text-gold-deep text-[11.5px] font-bold tracking-[0.08em]",
  onDark: "text-gold-bright text-[11.5px] font-bold tracking-[0.08em]",
} as const;

/**
 * The demo's most reusable signature: a small uppercase label that sits
 * above a display heading.
 */
export function Eyebrow({
  tone = "default",
  as: Tag = "p",
  className,
  children,
}: EyebrowProps) {
  return (
    <Tag className={cn("uppercase", TONES[tone], className)}>{children}</Tag>
  );
}
