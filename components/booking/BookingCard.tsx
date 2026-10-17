import Image from "next/image";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/icons";
import { getClinics, getSiteSettings, localize } from "@/lib/content";
import { formatTime, groupSchedule } from "@/lib/schedule";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/** Sidebar card on service and article pages: the doctor, clinic hours and booking buttons. */
export const BookingCard = () => {
  const t = useTranslations("Cta");
  const tWhatsApp = useTranslations("WhatsApp");
  const tWeekdays = useTranslations("Weekdays");
  const locale = useLocale();
  const format = useFormatter();
  const site = getSiteSettings();

  return (
    <div className="flex flex-col gap-4 rounded-card bg-surface p-6 shadow-soft">
      <div className="flex items-center gap-3">
        {site.doctorPhoto && (
          <Image
            src={site.doctorPhoto.src}
            alt=""
            width={64}
            height={64}
            className="size-16 rounded-full bg-brand-soft object-cover object-top"
          />
        )}
        <div className="leading-snug">
          <p className="font-bold">{localize(site.doctorName, locale)}</p>
          <p className="text-sm text-ink-muted">{localize(site.specialty, locale)}</p>
        </div>
      </div>

      <p className="text-lg font-bold">{t("title")}</p>
      <ul className="flex flex-col gap-2 text-sm">
        {getClinics().map((clinic) => (
          <li key={clinic.slug} className="rounded-xl bg-peach px-4 py-3">
            <p className="font-bold">{localize(clinic.label, locale)}</p>
            {groupSchedule(clinic.schedule).map((group) => (
              <p key={group.opens} className="text-ink-muted">
                {group.days.map((day) => tWeekdays(day)).join(locale === "ar" ? " و" : " & ")} · {formatTime(format, group.opens)} –{" "}
                {formatTime(format, group.closes)}
              </p>
            ))}
          </li>
        ))}
      </ul>

      <ButtonLink href={buildWhatsAppUrl(site.whatsappNumber, tWhatsApp("prefilledMessage"))} variant="whatsapp" external>
        <WhatsAppIcon className="size-5" />
        {t("whatsapp")}
      </ButtonLink>
      <ButtonLink href={`tel:${site.phone.e164}`} variant="secondary" external>
        <span dir="ltr">{site.phone.display}</span>
      </ButtonLink>
    </div>
  );
};
