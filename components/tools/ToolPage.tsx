import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { BookingCta } from "@/components/booking/BookingCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";

type ToolPageProps = {
  title: string;
  intro: string;
  howTitle: string;
  how: string;
  /** The calculator itself. */
  children: ReactNode;
};

/** Shared layout for a calculator page: header, calculator, disclaimer, how it works, booking band. */
export const ToolPage = ({ title, intro, howTitle, how, children }: ToolPageProps) => {
  const t = useTranslations("Tools");
  const tNav = useTranslations("Nav");

  return (
    <>
      <PageHeader
        top={<Breadcrumbs items={[{ label: tNav("home"), href: "/" }, { label: tNav("tools"), href: "/tools" }, { label: title }]} />}
        title={title}
        intro={intro}
      />
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-14">
        {children}
        <p role="note" className="rounded-card border border-brand-soft bg-surface p-4 text-ink-muted">
          {t("disclaimer")}
        </p>
        <section>
          <h2 className="mb-3 text-2xl font-bold">{howTitle}</h2>
          <p className="text-lg leading-loose">{how}</p>
        </section>
      </div>
      <BookingCta />
    </>
  );
};
