import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getClinics, getSiteSettings, localize } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { bookHref, navItems } from "./nav-items";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tWhatsApp = useTranslations("WhatsApp");
  const tClinics = useTranslations("Clinics");
  const tHome = useTranslations("Home");
  const locale = useLocale();
  const site = getSiteSettings();
  const doctorName = localize(site.doctorName, locale);

  const socialLinks = [
    { label: "Instagram", href: site.social.instagram },
    { label: "TikTok", href: site.social.tiktok },
    { label: "Facebook", href: site.social.facebook },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  const headingClass = "mb-3 font-bold text-ink";
  const linkClass = "text-ink-muted hover:text-brand-strong";

  return (
    <footer className="mt-16 border-t border-line bg-peach">
      <div className="mx-auto grid max-w-site gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <p className="text-lg font-bold text-ink">{doctorName}</p>
          <p className="mt-1 text-ink-muted">{localize(site.specialty, locale)}</p>
        </div>

        <nav aria-labelledby="footer-quick-links">
          <h2 id="footer-quick-links" className={headingClass}>
            {t("quickLinks")}
          </h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link href={bookHref} className={linkClass}>
                {tNav("book")}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-clinics">
          <h2 id="footer-clinics" className={headingClass}>
            {tHome("clinicsTitle")}
          </h2>
          <ul className="space-y-2">
            {getClinics().map((clinic) => (
              <li key={clinic.slug}>
                <Link href={`/clinics/${clinic.slug}`} className={linkClass}>
                  {clinic.name
                    ? localize(clinic.name, locale)
                    : tClinics("title", { label: localize(clinic.label, locale) })}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>{t("contact")}</h2>
          <ul className="space-y-2">
            <li>
              <span className="text-ink-muted">{t("phone")}: </span>
              <a href={`tel:${site.phone.e164}`} dir="ltr" className={linkClass}>
                {site.phone.display}
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppUrl(site.whatsappNumber, tWhatsApp("prefilledMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {t("whatsapp")}
              </a>
            </li>
          </ul>
        </div>

        {socialLinks.length > 0 && (
          <div>
            <h2 className={headingClass}>{t("followUs")}</h2>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-line">
        {/* Extra bottom padding on mobile so the floating WhatsApp button does not cover this line. */}
        <p className="mx-auto max-w-site px-4 pt-4 pb-24 text-sm text-ink-muted md:pb-4">
          {t("copyright", { year: new Date().getFullYear(), name: doctorName })}
        </p>
      </div>
    </footer>
  );
}
