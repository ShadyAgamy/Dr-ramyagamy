import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/icons";
import { getSiteSettings } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/** Orange "Book your appointment" band with WhatsApp and call buttons. */
export const BookingCta = () => {
  const t = useTranslations("Cta");
  const tWhatsApp = useTranslations("WhatsApp");
  const site = getSiteSettings();

  return (
    <section className="mx-auto max-w-site px-4 py-14">
      <div className="relative flex flex-col gap-6 overflow-hidden rounded-[2rem] border-b-[6px] border-accent-cyan bg-brand px-6 py-10 text-ink sm:px-12 sm:py-14 lg:flex-row lg:items-center lg:justify-between">
        {/* The band is the brand orange itself, so it carries dark text rather
            than white. The glow is a plain light wash, never cyan: cyan over
            orange mixes towards olive. Cyan instead meets the orange along the
            bottom edge, where a hard border keeps the two from blending at all. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -end-16 size-64 rounded-full bg-white/30 blur-3xl"
        />
        <div className="relative max-w-2xl">
          <h2 className="text-3xl leading-snug font-bold">{t("title")}</h2>
          <p className="mt-2 text-lg">{t("text")}</p>
        </div>
        <div className="relative flex flex-wrap gap-3">
          <ButtonLink
            href={buildWhatsAppUrl(
              site.whatsappNumber,
              tWhatsApp("prefilledMessage"),
            )}
            variant="whatsapp"
            external
          >
            <WhatsAppIcon className="size-5" />
            {t("whatsapp")}
          </ButtonLink>
          <ButtonLink
            href={`tel:${site.phone.e164}`}
            variant="outlineDark"
            external
          >
            <span dir="ltr">{site.phone.display}</span>
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};
