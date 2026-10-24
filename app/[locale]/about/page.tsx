import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { BookingCta } from "@/components/booking/BookingCta";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing } from "@/i18n/routing";
import {
  getHospitals,
  getSiteSettings,
  localize,
  localizeStrict,
} from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { physicianJsonLd } from "@/lib/jsonld";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations("About");
  return buildPageMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("metaDescription"),
  });
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
      <JsonLd data={physicianJsonLd(locale)} />
      <section className="overflow-hidden bg-linear-to-b from-peach to-cream">
        {/* items-end + no bottom padding: the cut-out photo stands on the section's bottom edge. */}
        <div className="mx-auto grid max-w-site items-end gap-10 px-4 pt-14 md:grid-cols-2">
          <div className="flex flex-col gap-3 self-center">
            <h1 className="text-3xl font-bold sm:text-4xl">{t("title")}</h1>
            <p className="bg-linear-to-l from-brand-strong to-accent-cyan-strong bg-clip-text text-2xl font-bold text-transparent ltr:bg-linear-to-r">
              {localize(site.doctorName, locale)}
            </p>
            <p className="text-lg font-semibold text-ink-muted">
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
            <div className="relative mx-auto w-full max-w-md">
              {/* The same gradient halo as the home page, behind the cut-out photo. */}
              <div
                aria-hidden="true"
                className="absolute inset-x-4 bottom-0 aspect-square rounded-t-full bg-linear-to-br from-brand/30 via-brand-soft to-accent-cyan/40 blur-[2px]"
              />
              <Image
                src={site.doctorPhoto.src}
                alt={localize(site.doctorPhoto.alt, locale)}
                width={site.doctorPhoto.width}
                height={site.doctorPhoto.height}
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
                className="relative w-full"
              />
            </div>
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
