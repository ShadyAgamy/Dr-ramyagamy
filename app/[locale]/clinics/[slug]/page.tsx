import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getFormatter, getTranslations } from "next-intl/server";
import { BookingCta } from "@/components/booking/BookingCta";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { routing } from "@/i18n/routing";
import { type Clinic, getClinic, getClinics, getSiteSettings, type Locale, localize, localizeStrict } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/** Pre-build one page per clinic, in both languages. */
export const generateStaticParams = () => getClinics().map((clinic) => ({ slug: clinic.slug }));

export const dynamicParams = false;

const getClinicTitle = async (clinic: Clinic, locale: Locale) => {
  if (clinic.name) return localize(clinic.name, locale);
  const t = await getTranslations("Clinics");
  return t("title", { label: localize(clinic.label, locale) });
};

export const generateMetadata = async ({ params }: PageProps<"/[locale]/clinics/[slug]">): Promise<Metadata> => {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const clinic = getClinic(slug);
  if (!clinic) return {};

  return {
    title: localizeStrict(clinic.seo?.metaTitle, locale) ?? (await getClinicTitle(clinic, locale)),
    description: localizeStrict(clinic.seo?.metaDescription, locale) ?? localizeStrict(clinic.description, locale),
  };
};

/** /clinics/<slug>: address, phone, map, hours, photos. Missing data is hidden. */
const ClinicPage = async ({ params }: PageProps<"/[locale]/clinics/[slug]">) => {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const clinic = getClinic(slug);
  if (!clinic) notFound();

  const t = await getTranslations("Clinics");
  const tCta = await getTranslations("Cta");
  const tWhatsApp = await getTranslations("WhatsApp");
  const tWeekdays = await getTranslations("Weekdays");
  const format = await getFormatter();

  const site = getSiteSettings();
  const phone = clinic.phone ?? site.phone;
  const description = localizeStrict(clinic.description, locale);

  // "17:00" → "5:00 PM" / "5:00 م". UTC on both sides so the time does not shift.
  const formatTime = (time: string) =>
    format.dateTime(new Date(`1970-01-01T${time}:00Z`), { hour: "numeric", minute: "2-digit", timeZone: "UTC" });

  return (
    <>
      <section className="bg-peach">
        <div className="mx-auto flex max-w-site flex-col gap-5 px-4 py-14">
          <h1 className="text-3xl font-bold sm:text-4xl">{await getClinicTitle(clinic, locale)}</h1>

          <dl className="grid gap-4 sm:grid-cols-2">
            {clinic.address && (
              <div>
                <dt className="font-bold">{t("address")}</dt>
                {/* The address may only exist in Arabic: <bdi> keeps its text direction separate, lang helps screen readers. */}
                <dd className="mt-1 text-ink-muted">
                  <bdi lang={clinic.address[locale] ? locale : "ar"}>{localize(clinic.address, locale)}</bdi>
                  {locale === "ar" ? "، " : ", "}
                  {localize(clinic.city, locale)}
                </dd>
              </div>
            )}
            <div>
              <dt className="font-bold">{t("phone")}</dt>
              <dd className="mt-1">
                <a href={`tel:${phone.e164}`} dir="ltr" className="text-ink-muted hover:text-brand-strong">
                  {phone.display}
                </a>
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/book">{tCta("book")}</ButtonLink>
            <ButtonLink
              href={buildWhatsAppUrl(site.whatsappNumber, tWhatsApp("prefilledMessage"))}
              variant="whatsapp"
              external
            >
              <WhatsAppIcon className="size-5" />
              {tCta("whatsapp")}
            </ButtonLink>
            <ButtonLink href={`tel:${phone.e164}`} variant="secondary" external>
              {tCta("call")}
            </ButtonLink>
            {clinic.mapsUrl && (
              <ButtonLink href={clinic.mapsUrl} variant="secondary" external>
                {t("openMap")}
              </ButtonLink>
            )}
          </div>
        </div>
      </section>

      {description && (
        <section className="mx-auto max-w-3xl px-4 pt-12">
          <p className="text-lg leading-loose">{description}</p>
        </section>
      )}

      {clinic.schedule.length > 0 && (
        <Section title={t("hours")}>
          <table className="w-full max-w-md overflow-hidden rounded-card bg-surface shadow-soft">
            <tbody>
              {clinic.schedule.map((entry) => (
                <tr key={entry.day} className="border-b border-line last:border-0">
                  <th scope="row" className="p-4 text-start font-medium">{tWeekdays(entry.day)}</th>
                  <td className="p-4 text-ink-muted">
                    {formatTime(entry.opens)} – {formatTime(entry.closes)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      {clinic.photos.length > 0 && (
        <Section title={t("photos")}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clinic.photos.map((photo) => (
              <li key={photo.src}>
                <Image
                  src={photo.src}
                  alt={localize(photo.alt, locale)}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/3] w-full rounded-card object-cover"
                />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <BookingCta />
    </>
  );
};

export default ClinicPage;
