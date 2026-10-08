import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ClinicCard } from "@/components/clinics/ClinicCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { routing } from "@/i18n/routing";
import { getClinics, getSiteSettings } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("Book");
  return { title: t("title"), description: t("description") };
};

/** /book: contact options. The booking form is added in Phase 5. */
const BookPage = async ({ params }: PageProps<"/[locale]/book">) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("Book");
  const tCta = await getTranslations("Cta");
  const tWhatsApp = await getTranslations("WhatsApp");
  const site = getSiteSettings();
  const clinics = getClinics();

  return (
    <>
      <section className="bg-peach">
        <div className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-14">
          <h1 className="text-3xl font-bold sm:text-4xl">{t("title")}</h1>
          <p className="text-lg">{t("intro")}</p>
          <p role="note" className="rounded-card border border-brand-soft bg-surface p-4 text-ink-muted">
            {t("notice")}
          </p>
          <div className="flex flex-wrap gap-3">
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
        </div>
      </section>

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
