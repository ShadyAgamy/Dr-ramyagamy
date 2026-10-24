import type { ReactNode } from "react";

type PageHeaderProps = {
  /** Shown above the title, e.g. breadcrumbs. */
  top?: ReactNode;
  title: string;
  intro?: string;
  /** Shown under the intro, e.g. buttons or the author. */
  children?: ReactNode;
};

/**
 * The warm band at the top of inner pages, holding the page's <h1>. It fades
 * from peach into the cream page the same way the home page hero does, with the
 * same soft brand halo kept faint behind the text.
 */
export const PageHeader = ({
  top,
  title,
  intro,
  children,
}: PageHeaderProps) => (
  <section className="relative overflow-hidden bg-linear-to-b from-peach to-cream">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-28 -start-24 size-80 rounded-full bg-linear-to-br from-brand/25 to-accent-cyan/25 blur-3xl"
    />
    <div className="relative mx-auto flex max-w-site flex-col gap-4 px-4 pt-8 pb-12 sm:pb-14">
      {top}
      <h1 className="mt-2 max-w-4xl text-3xl leading-snug font-bold sm:text-5xl">
        {title}
      </h1>
      {intro && (
        <p className="max-w-3xl text-lg text-ink-muted sm:text-xl">{intro}</p>
      )}
      {children}
    </div>
  </section>
);
