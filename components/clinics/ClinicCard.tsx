import Image from "next/image";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowIcon, MapPinIcon } from "@/components/ui/icons";
import { Link } from "@/i18n/navigation";
import { type Clinic, localize } from "@/lib/content";
import { formatTime, groupSchedule } from "@/lib/schedule";

/**
 * A clinic card: first photo (or a dark panel), address and hours. The whole card
 * links to the clinic page (stretched title link, see PostCard); "Open in maps"
 * sits above that link so it stays its own link.
 */
export const ClinicCard = ({ clinic }: { clinic: Clinic }) => {
  const t = useTranslations("Clinics");
  const tWeekdays = useTranslations("Weekdays");
  const locale = useLocale();
  const format = useFormatter();
  const label = localize(clinic.label, locale);
  const title = clinic.name ? localize(clinic.name, locale) : t("title", { label });
  const photo = clinic.photos[0];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
      {photo ? (
        <Image
          src={photo.src}
          alt={localize(photo.alt, locale)}
          width={photo.width}
          height={photo.height}
          sizes="(min-width: 640px) 50vw, 100vw"
          className="h-56 w-full object-cover"
        />
      ) : (
        // No photo yet (e.g. a shared medical center): a light panel with a faint dot pattern.
        <div className="flex h-56 items-center justify-center bg-brand-soft bg-[radial-gradient(var(--color-brand)_1px,transparent_1px)] bg-size-[18px_18px]">
          <div className="flex flex-col items-center gap-3">
            <span className="grid size-16 place-items-center rounded-full bg-surface shadow-soft">
              <MapPinIcon className="size-8 text-brand-strong" />
            </span>
            <span className="rounded-full bg-surface px-4 py-1 text-lg font-bold">{label}</span>
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-7">
        <h3 className="text-2xl font-bold">
          <Link
            href={`/clinics/${clinic.slug}`}
            className="after:absolute after:inset-0 after:rounded-card group-hover:text-brand-strong"
          >
            {title}
          </Link>
        </h3>
        {clinic.address && (
          // The address may only exist in Arabic; mark its language for screen readers.
          <p className="text-ink-muted" lang={clinic.address[locale] ? locale : "ar"} dir={clinic.address[locale] ? undefined : "rtl"}>
            {localize(clinic.address, locale)}
          </p>
        )}
        {clinic.schedule.length > 0 && (
          <ul className="flex flex-wrap gap-2 text-sm font-medium">
            {groupSchedule(clinic.schedule).map((group) => (
              <li key={group.opens} className="rounded-full bg-peach px-3.5 py-1.5">
                {group.days.map((day) => tWeekdays(day)).join(locale === "ar" ? " و" : " & ")} ·{" "}
                {formatTime(format, group.opens)} – {formatTime(format, group.closes)}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex min-h-12 flex-wrap items-center justify-between gap-3 pt-2">
          <span className="flex items-center gap-2 font-medium text-brand-strong" aria-hidden="true">
            {t("viewClinic")}
            <ArrowIcon className="size-4" />
          </span>
          {clinic.mapsUrl && (
            // relative z-10: above the card's stretched link, so it opens the map.
            <span className="relative z-10">
              <ButtonLink href={clinic.mapsUrl} variant="secondary" external>
                {t("openMap")}
              </ButtonLink>
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
