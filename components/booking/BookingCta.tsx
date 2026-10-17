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
      <div className="flex flex-col gap-6 rounded-[2rem] bg-brand-strong px-6 py-10 text-white sm:px-12 sm:py-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-snug font-bold">{t("title")}</h2>
          <p className="mt-2 text-lg">{t("text")}</p>
        </div>
        <div className="flex flex-wrap gap-3">
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
