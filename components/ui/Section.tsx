import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  /** Optional link or button shown next to the title, e.g. "All articles". */
  action?: ReactNode;
  className?: string;
  children: ReactNode;
};

/** A page section with an <h2> title. Pages render it only when it has content. */
export const Section = ({ title, action, className = "", children }: SectionProps) => (
  <section className={`mx-auto max-w-site px-4 py-14 sm:py-16 ${className}`}>
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <h2 className="text-3xl leading-snug font-bold sm:text-4xl">{title}</h2>
      {action}
    </div>
    {children}
  </section>
);
