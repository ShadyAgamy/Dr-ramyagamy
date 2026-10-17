import type { ReactNode } from "react";

type PageHeaderProps = {
  /** Shown above the title, e.g. breadcrumbs. */
  top?: ReactNode;
  title: string;
  intro?: string;
  /** Shown under the intro, e.g. buttons or the author. */
  children?: ReactNode;
};

/** The peach band at the top of inner pages, holding the page's <h1>. */
export const PageHeader = ({ top, title, intro, children }: PageHeaderProps) => (
  <section className="bg-peach">
    <div className="mx-auto flex max-w-site flex-col gap-4 px-4 pt-8 pb-12 sm:pb-14">
      {top}
      <h1 className="mt-2 max-w-4xl text-3xl leading-snug font-bold sm:text-5xl">{title}</h1>
      {intro && <p className="max-w-3xl text-lg text-ink-muted sm:text-xl">{intro}</p>}
      {children}
    </div>
  </section>
);
