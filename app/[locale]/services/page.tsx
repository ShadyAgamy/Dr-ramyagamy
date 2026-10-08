import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { BookingCta } from "@/components/booking/BookingCta";
import { ServiceGrid } from "@/components/services/ServiceCard";
import { routing } from "@/i18n/routing";
import { getServices } from "@/lib/content";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("Services");
  return { title: t("title"), description: t("description") };
};

/** /services: every service available in this language. */
const ServicesPage = async ({ params }: PageProps<"/[locale]/services">) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("Services");
  const services = getServices(locale);

  return (
    <>
      <div className="mx-auto max-w-site px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold">{t("title")}</h1>
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
