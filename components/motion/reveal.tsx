"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

type RevealProps = {
  as?: ElementType;
  /** Delay in ms before this element's transition starts. */
  delay?: number;
  /** Stagger direct children off their own `--i` index instead. */
  stagger?: boolean;
  once?: boolean;
  threshold?: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * Flips a data attribute when the element scrolls into view. All the actual
 * motion lives in globals.css, so nothing animates from JS — which keeps the
 * work off the main thread and out of the INP budget.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  stagger = false,
  once = true,
  threshold = 0.15,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: show everything immediately and skip the observer.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      // Fire slightly before center so it reads as responsive, not laggy.
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  const attr = stagger ? "data-reveal-stagger" : "data-reveal";

  return (
    <Tag
      ref={ref}
      {...{ [attr]: inView ? "in" : "out" }}
      style={{ "--reveal-delay": delay } as React.CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}
