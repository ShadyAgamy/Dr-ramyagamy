import { useTranslations } from "next-intl";
import { getSiteSettings } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Floating WhatsApp button, shown on every page. */
export function WhatsAppButton() {
  const t = useTranslations("WhatsApp");
  const site = getSiteSettings();

  return (
    <a
      href={buildWhatsAppUrl(site.whatsappNumber, t("prefilledMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("buttonLabel")}
      title={t("buttonLabel")}
      className="fixed bottom-5 end-5 z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="size-8" />
    </a>
  );
}
