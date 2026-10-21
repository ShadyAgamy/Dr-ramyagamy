import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { BookingCta } from "@/components/booking/BookingCta";
import { ArrowIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

export const generateMetadata = async ({ params }: PageProps<"/[locale]/tools">): Promise<Metadata> => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations("Tools");
  return buildPageMetadata({ locale, path: "/tools", title: t("title"), description: t("description") });
};

const tools = [
  { href: "/tools/due-date", key: "dueDate" },
  { href: "/tools/ovulation", key: "ovulation" },
] as const;

/** /tools: the list of calculators. */
const ToolsPage = async ({ params }: PageProps<"/[locale]/tools">) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations("Tools");

  return (
    <>
      <PageHeader title={t("title")} intro={t("description")} />
      <div className="mx-auto max-w-site px-4 py-14">
        <ul className="grid gap-5 sm:grid-cols-2">
          {tools.map((tool) => (
            <li key={tool.href}>
              <article className="group relative flex h-full flex-col gap-3 rounded-card bg-surface p-7 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
                <h2 className="text-xl font-bold">
                  <Link href={tool.href} className="after:absolute after:inset-0 after:rounded-card group-hover:text-brand-strong">
                    {t(`${tool.key}.title`)}
                  </Link>
                </h2>
                <p className="text-ink-muted">{t(`${tool.key}.description`)}</p>
                <span className="mt-auto flex items-center gap-2 pt-2 font-medium text-brand-strong" aria-hidden="true">
                  {t("open")}
                  <ArrowIcon className="size-4" />
                </span>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <BookingCta />
    </>
  );
};

export default ToolsPage;
