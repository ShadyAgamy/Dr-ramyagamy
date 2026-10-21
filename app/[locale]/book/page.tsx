import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getFormatter, getTranslations } from "next-intl/server";
import { ClinicCard } from "@/components/clinics/ClinicCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LockIcon, WhatsAppIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getClinics, getPage, getSiteSettings } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { buildPageMetadata } from "@/lib/seo";

export const generateMetadata = async ({ params }: PageProps<"/[locale]/book">): Promise<Metadata> => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations("Book");
  return buildPageMetadata({ locale, path: "/book", title: t("title"), description: t("description") });
};

/** /book: booking is by WhatsApp or phone, handled by the clinic. */
const BookPage = async ({ params }: PageProps<"/[locale]/book">) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("Book");
  const tCta = await getTranslations("Cta");
  const tWhatsApp = await getTranslations("WhatsApp");
  const format = await getFormatter();
  const site = getSiteSettings();
  const clinics = getClinics();
  const steps = t.raw("steps") as { title: string; text: string }[];
  const hasPrivacyPage = Boolean(getPage("privacy", locale));

  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")}>
        <div className="mt-2 flex flex-wrap gap-3">
          <ButtonLink
            href={buildWhatsAppUrl(site.whatsappNumber, tWhatsApp("prefilledMessage"))}
            variant="whatsapp"
            external
          >
            <WhatsAppIcon className="size-5" />
            {tCta("whatsapp")}
          </ButtonLink>
          <ButtonLink href={`tel:${site.phone.e164}`} variant="secondary" external>
            {tCta("call")} <span dir="ltr">{site.phone.display}</span>
          </ButtonLink>
        </div>
        <p role="note" className="max-w-3xl rounded-card border border-brand-soft bg-surface p-4 text-ink-muted">
          {t("notice")}
        </p>
      </PageHeader>

      <Section title={t("stepsTitle")}>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3 rounded-card bg-surface p-6 shadow-soft">
              <span className="grid size-10 place-items-center rounded-full bg-brand-strong font-bold text-white">
                {format.number(index + 1)}
              </span>
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="text-ink-muted">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex items-start gap-3 rounded-card bg-peach p-5">
          <LockIcon className="mt-1 size-5 shrink-0 text-brand-strong" />
          <p>
            <strong>{t("privacyTitle")}:</strong> {t("privacyText")}{" "}
            {hasPrivacyPage && (
              <Link href="/privacy" className="font-medium text-brand-strong underline underline-offset-4">
                {t("privacyLink")}
              </Link>
            )}
          </p>
        </div>
      </Section>

      <Section title={t("clinicsTitle")}>
        <ul className="grid gap-6 sm:grid-cols-2">
          {clinics.map((clinic) => (
            <li key={clinic.slug}>
              <ClinicCard clinic={clinic} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
};

export default BookPage;
