"use client";

import { useLocale } from "next-intl";
import { useEffect, useMemo, useRef } from "react";

const DURATION_MS = 3200;
/** How long the number takes to fade and rise into place. */
const REVEAL_MS = 900;
/** Starts once the number is a little way into the screen, so the whole animation is seen. */
const ROOT_MARGIN = "0px 0px -15% 0px";

type CountUpNumberProps = {
  value: number;
  /** Shown right after the number, e.g. "+". */
  suffix?: string;
  /** Wait before starting, so several counters start one after another. */
  delayMs?: number;
  className?: string;
};

/** Starts slowly, speeds up, then settles very gently into the real number. */
const easeInOutSine = (progress: number) =>
  -(Math.cos(Math.PI * progress) - 1) / 2;

/**
 * Fades the number in and counts from zero up to `value` as it scrolls into view.
 *
 * React renders the real number, so that is what ends up in the HTML for search
 * engines and for anyone without JavaScript. Screen readers read a hidden copy
 * of the final number, never the moving one. The count is written straight to
 * the DOM on every animation frame, which keeps it off React's render path.
 */
export const CountUpNumber = ({
  value,
  suffix = "",
  delayMs = 0,
  className = "",
}: CountUpNumberProps) => {
  const locale = useLocale();
  // "ar" on its own formats with Latin digits; the rest of the site writes its
  // numbers in Arabic-Indic ones, so ask for the Egyptian Arabic locale.
  const format = useMemo(
    () => new Intl.NumberFormat(locale === "ar" ? "ar-EG" : locale),
    [locale],
  );
  const ref = useRef<HTMLSpanElement>(null);
  const finalText = `${format.format(value)}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Someone who asked for less motion just keeps the final number.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Hidden at zero until it scrolls in.
    node.style.transition = `opacity ${REVEAL_MS}ms ease-out, transform ${REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    node.style.opacity = "0";
    node.style.transform = "translateY(1rem) scale(0.92)";
    node.textContent = `${format.format(0)}${suffix}`;

    let frame = 0;
    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // Count once, not every time it scrolls past.
        observer.disconnect();

        timer = window.setTimeout(() => {
          node.style.opacity = "1";
          node.style.transform = "none";

          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / DURATION_MS, 1);
            const shown = Math.round(value * easeInOutSine(progress));
            node.textContent = `${format.format(shown)}${suffix}`;
            if (progress < 1) frame = requestAnimationFrame(step);
          };
          frame = requestAnimationFrame(step);
        }, delayMs);
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      node.textContent = finalText;
      node.style.opacity = "";
      node.style.transform = "";
    };
  }, [value, suffix, delayMs, format, finalText]);

  return (
    <>
      <span className="sr-only">{finalText}</span>
      {/* inline-block so it can rise and scale; the gradient sits on this span
          because background-clip text does not paint through a moving child. */}
      <span
        ref={ref}
        aria-hidden="true"
        className={`inline-block tabular-nums ${className}`}
      >
        {finalText}
      </span>
    </>
  );
};
