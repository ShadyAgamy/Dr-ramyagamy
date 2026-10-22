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
      <div className="relative flex flex-col gap-6 overflow-hidden rounded-[2rem] bg-brand-strong px-6 py-10 text-white sm:px-12 sm:py-14 lg:flex-row lg:items-center lg:justify-between">
        {/* Solid, not a gradient: the brand orange is light enough that white text
            on it fails contrast, so the band stays on the dark end of the hue and
            cyan comes in only as a small accent glow. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -start-16 size-56 rounded-full bg-accent-cyan/25 blur-3xl"
        />
        <div className="relative max-w-2xl">
          <h2 className="text-3xl leading-snug font-bold">{t("title")}</h2>
          <p className="mt-2 text-lg">{t("text")}</p>
        </div>
        <div className="relative flex flex-wrap gap-3">
          <ButtonLink href={buildWhatsAppUrl(site.whatsappNumber, tWhatsApp("prefilledMessage"))} variant="light" external>
            <WhatsAppIcon className="size-5" />
            {t("whatsapp")}
          </ButtonLink>
          <ButtonLink href={`tel:${site.phone.e164}`} variant="outlineLight" external>
            <span dir="ltr">{site.phone.display}</span>
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};
