"use client";

import { useLocale } from "next-intl";
import { useEffect, useMemo, useRef } from "react";

const DURATION_MS = 2500;
/** Starts the count just before the number scrolls in, so it never starts from a visible zero. */
const ROOT_MARGIN = "0px 0px 120px 0px";

type CountUpNumberProps = {
  value: number;
  /** Shown right after the number, e.g. "+". */
  suffix?: string;
};

/**
 * Counts from zero up to `value` as it scrolls into view.
 *
 * React renders the real number, so that is what ends up in the HTML for search
 * engines and for anyone without JavaScript, and it also stays on screen if the
 * browser never reports the number as visible. Only once it does is the count
 * written straight to the DOM: it runs on every animation frame, and that keeps
 * it off React's render path.
 */
export const CountUpNumber = ({ value, suffix }: CountUpNumberProps) => {
  const locale = useLocale();
  // "ar" on its own formats with Latin digits; the rest of the site writes its
  // numbers in Arabic-Indic ones, so ask for the Egyptian Arabic locale.
  const format = useMemo(
    () => new Intl.NumberFormat(locale === "ar" ? "ar-EG" : locale),
    [locale],
  );
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Someone who asked for less motion just keeps the final number.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // Count once, not every time it scrolls past.
        observer.disconnect();

        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          // Ease in and out: starts gently, speeds up, then settles into the real number.
          const eased = progress < 0.5 ? 2 * progress ** 2 : 1 - (-2 * progress + 2) ** 2 / 2;
          const shown = Math.round(value * eased);
          node.textContent = `${format.format(shown)}${suffix ?? ""}`;
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, suffix, format]);

  return (
    <span ref={ref} className="tabular-nums">
      {format.format(value)}
      {suffix}
    </span>
  );
};
