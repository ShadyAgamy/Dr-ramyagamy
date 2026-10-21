import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { OvulationCalculator } from "@/components/tools/OvulationCalculator";
import { ToolPage } from "@/components/tools/ToolPage";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

export const generateMetadata = async ({ params }: PageProps<"/[locale]/tools/ovulation">): Promise<Metadata> => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations("Tools.ovulation");
  return buildPageMetadata({ locale, path: "/tools/ovulation", title: t("title"), description: t("description") });
};

/** /tools/ovulation */
const Page = async ({ params }: PageProps<"/[locale]/tools/ovulation">) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations("Tools.ovulation");

  return (
    <ToolPage title={t("title")} intro={t("description")} howTitle={t("howTitle")} how={t("how")}>
      <OvulationCalculator />
    </ToolPage>
  );
};

export default Page;
