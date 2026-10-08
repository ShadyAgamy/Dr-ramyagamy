import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/icons";
import { getSiteSettings } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/** "Book your appointment" band with booking and WhatsApp buttons. */
export const BookingCta = () => {
  const t = useTranslations("Cta");
  const tWhatsApp = useTranslations("WhatsApp");
  const site = getSiteSettings();

  return (
    <section className="mx-auto max-w-site px-4 py-12">
      <div className="flex flex-col items-center gap-4 rounded-card bg-peach px-6 py-10 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">{t("title")}</h2>
        <p className="max-w-xl text-ink-muted">{t("text")}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/book">{t("book")}</ButtonLink>
          <ButtonLink
            href={buildWhatsAppUrl(site.whatsappNumber, tWhatsApp("prefilledMessage"))}
            variant="whatsapp"
            external
          >
            <WhatsAppIcon className="size-5" />
            {t("whatsapp")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};
