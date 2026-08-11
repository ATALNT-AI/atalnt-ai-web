import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "gold";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  // Ink on bone — the demo's default action.
  primary:
    "bg-ink text-on-dark hover:bg-black hover:shadow-lift active:translate-y-px",
  // Outlined, for the secondary action beside a primary.
  secondary:
    "bg-surface text-body border border-line-input hover:border-line-hover hover:shadow-rest active:translate-y-px",
  // Text-only.
  ghost: "text-muted hover:text-ink",
  // Inverted, for use inside ink bands.
  onDark:
    "bg-bone text-ink hover:bg-white hover:shadow-dark active:translate-y-px",
  // Gold, used sparingly — one per page at most.
  gold: "bg-gold text-ink hover:bg-gold-bright hover:shadow-lift active:translate-y-px",
};

const SIZES: Record<Size, string> = {
  sm: "text-[13.5px] px-4 py-2.5 rounded-sm",
  md: "text-[15px] px-[22px] py-[13px] rounded-btn",
  lg: "text-[15.5px] px-[30px] py-[15px] rounded-btn",
};

const BASE =
  "inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap " +
  "transition-[background-color,box-shadow,color,border-color,transform] duration-150 " +
  "disabled:pointer-events-none disabled:bg-line disabled:text-placeholder disabled:shadow-none";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href" | "className">;

type ButtonAsButton = CommonProps & {
  href?: never;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    const external = /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
