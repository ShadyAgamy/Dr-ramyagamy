import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { type Clinic, localize } from "@/lib/content";

/** A card linking to one clinic page. */
export const ClinicCard = ({ clinic }: { clinic: Clinic }) => {
  const t = useTranslations("Clinics");
  const locale = useLocale();
  const label = localize(clinic.label, locale);
  const title = clinic.name ? localize(clinic.name, locale) : t("title", { label });

  return (
    <article className="flex h-full flex-col gap-3 rounded-card bg-surface p-6 shadow-soft">
      <h3 className="text-xl font-bold">{title}</h3>
      {clinic.address && (
        // The address may only exist in Arabic; mark its language for screen readers.
        <p className="text-ink-muted" lang={clinic.address[locale] ? locale : "ar"} dir={clinic.address[locale] ? undefined : "rtl"}>
          {localize(clinic.address, locale)}
        </p>
      )}
      <Link href={`/clinics/${clinic.slug}`} className="mt-auto font-medium text-brand-strong hover:underline">
        {t("viewClinic")}
      </Link>
    </article>
  );
};
