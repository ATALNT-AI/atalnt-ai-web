import { cn } from "@/lib/cn";
import { Eyebrow } from "./eyebrow";

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
  id,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto text-center",
        align === "center" ? "max-w-[760px]" : "max-w-[720px]",
        className
      )}
    >
      {eyebrow && (
        <Eyebrow tone={tone === "dark" ? "onDark" : "default"} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        id={id}
        className={cn(
          "text-[clamp(30px,3.6vw,42px)] text-balance",
          tone === "dark" ? "text-on-dark" : "text-ink"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-[17px] leading-[1.65] text-pretty",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-on-dark-muted" : "text-secondary"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
