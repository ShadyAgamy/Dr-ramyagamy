import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { BookingCta } from "@/components/booking/BookingCta";
import { Section } from "@/components/ui/Section";
import { routing } from "@/i18n/routing";
import {
  getHospitals,
  getSiteSettings,
  localize,
  localizeStrict,
} from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const generateMetadata = async ({ params }: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations("About");
  return buildPageMetadata({ locale, title: t("title"), description: t("metaDescription") });
};

/** /about: name, specialty, credentials and hospitals. */
const AboutPage = async ({ params }: PageProps<"/[locale]/about">) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("About");
  const site = getSiteSettings();
  const credentials = localizeStrict(site.credentials, locale);
  const hospitals = getHospitals();

  return (
    <>
      <section className="bg-peach">
        {/* items-end + no bottom padding: the cut-out photo stands on the section's bottom edge. */}
        <div className="mx-auto grid max-w-site items-end gap-10 px-4 pt-14 md:grid-cols-2">
          <div className="flex flex-col gap-3 self-center">
            <h1 className="text-3xl font-bold sm:text-4xl">{t("title")}</h1>
            <p className="text-2xl font-bold">
              {localize(site.doctorName, locale)}
            </p>
            <p className="text-lg text-brand-strong">
              {localize(site.specialty, locale)}
            </p>

            {credentials && credentials.length > 0 && (
              <div className="mt-3">
                <h2 className="sr-only">{t("credentialsTitle")}</h2>
                <ul className="space-y-2">
                  {credentials.map((credential) => (
                    <li key={credential} className="flex gap-2">
                      <span aria-hidden="true" className="text-brand">
                        ✓
                      </span>
                      <span>{credential}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {site.doctorPhoto && (
            <Image
              src={site.doctorPhoto.src}
              alt={localize(site.doctorPhoto.alt, locale)}
              width={site.doctorPhoto.width}
              height={site.doctorPhoto.height}
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="mx-auto w-full max-w-md"
            />
          )}
        </div>
      </section>

      {hospitals.length > 0 && (
        <Section title={t("hospitalsTitle")}>
          <ul className="grid gap-4 sm:grid-cols-2">
            {hospitals.map((hospital) => (
              <li
                key={hospital.name.ar}
                className="rounded-card bg-surface p-4 shadow-soft"
              >
                <p className="font-bold">{localize(hospital.name, locale)}</p>
                <p className="text-ink-muted">
                  {localize(hospital.city, locale)}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <BookingCta />
    </>
  );
};

export default AboutPage;
