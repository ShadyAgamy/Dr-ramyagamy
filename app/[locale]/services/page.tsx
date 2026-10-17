import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { BookingCta } from "@/components/booking/BookingCta";
import { ServiceGrid } from "@/components/services/ServiceCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { routing } from "@/i18n/routing";
import { getServices } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const generateMetadata = async ({ params }: PageProps<"/[locale]/services">): Promise<Metadata> => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations("Services");
  return buildPageMetadata({ locale, title: t("title"), description: t("description") });
};

/** /services: every service available in this language. */
const ServicesPage = async ({ params }: PageProps<"/[locale]/services">) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("Services");
  const services = getServices(locale);

  return (
    <>
      <PageHeader title={t("title")} intro={t("description")} />
      <div className="mx-auto max-w-site px-4 py-14">
        {services.length === 0 ? (
          <p className="text-ink-muted">{t("empty")}</p>
        ) : (
          <ServiceGrid services={services} headingLevel="h2" />
        )}
      </div>
      <BookingCta />
    </>
  );
};

export default ServicesPage;
