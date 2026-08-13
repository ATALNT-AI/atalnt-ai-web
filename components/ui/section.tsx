import { cn } from "@/lib/cn";

type SectionProps = {
  /**
   * Background rhythm across the page. Never place two `ink` sections
   * adjacent — the tonal break is what gives them their weight.
   */
  bg?: "bone" | "surface" | "sand" | "ink";
  size?: "sm" | "md" | "lg";
  bordered?: boolean;
  id?: string;
  className?: string;
  children: React.ReactNode;
  "aria-labelledby"?: string;
};

const BG = {
  bone: "bg-bone",
  surface: "bg-surface",
  sand: "bg-bone-100",
  ink: "bg-ink text-on-dark",
} as const;

const SIZE = {
  sm: "py-16 sm:py-20",
  md: "py-20 sm:py-28",
  lg: "py-20 sm:py-28",
} as const;

export function Section({
  bg = "bone",
  size = "md",
  bordered = false,
  id,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        // Sections are full-bleed bands, so clipping is always right here.
        // Without it the decorative glows (720px and 560px squares pinned to
        // the right edge) push the document wider than the viewport, which
        // showed up as a sideways scroll on phones.
        "relative overflow-hidden",
        BG[bg],
        SIZE[size],
        bordered && "border-y border-line",
        className
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
