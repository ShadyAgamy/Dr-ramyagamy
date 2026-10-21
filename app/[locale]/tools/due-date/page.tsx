import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { DueDateCalculator } from "@/components/tools/DueDateCalculator";
import { ToolPage } from "@/components/tools/ToolPage";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

export const generateMetadata = async ({ params }: PageProps<"/[locale]/tools/due-date">): Promise<Metadata> => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations("Tools.dueDate");
  return buildPageMetadata({ locale, path: "/tools/due-date", title: t("title"), description: t("description") });
};

/** /tools/due-date */
const Page = async ({ params }: PageProps<"/[locale]/tools/due-date">) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations("Tools.dueDate");

  return (
    <ToolPage title={t("title")} intro={t("description")} howTitle={t("howTitle")} how={t("how")}>
      <DueDateCalculator />
    </ToolPage>
  );
};

export default Page;
