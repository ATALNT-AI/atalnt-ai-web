import { cn } from "@/lib/cn";

type ContainerProps = {
  /** Max content width. `prose` is for long-form reading measure. */
  size?: "sm" | "md" | "lg" | "prose";
  className?: string;
  children: React.ReactNode;
};

const SIZES = {
  sm: "max-w-[760px]",
  md: "max-w-[1040px]",
  lg: "max-w-[1240px]",
  prose: "max-w-[680px]",
} as const;

export function Container({ size = "lg", className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8", SIZES[size], className)}>
      {children}
    </div>
  );
}
