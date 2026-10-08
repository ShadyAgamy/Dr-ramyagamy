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
  <section className={`mx-auto max-w-site px-4 py-12 ${className}`}>
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
      {action}
    </div>
    {children}
  </section>
);
