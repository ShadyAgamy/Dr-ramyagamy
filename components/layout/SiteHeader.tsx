import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getPagePaths, getSiteSettings, localize } from "@/lib/content";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MainNav } from "./MainNav";
import { MobileMenu } from "./MobileMenu";
import { bookHref } from "./nav-items";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const site = getSiteSettings();
  const otherLocalePaths = getPagePaths(locale === "ar" ? "en" : "ar");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-site items-center justify-between gap-4 px-4">
        {/* Text logo until the logo files arrive. */}
        <Link href="/" className="text-lg font-bold text-ink">
          {localize(site.doctorName, locale)}
        </Link>

        <MainNav />

        <div className="flex items-center gap-2">
          <LanguageSwitcher otherLocalePaths={otherLocalePaths} />
          <Link
            href={bookHref}
            className="hidden rounded-button bg-brand-strong px-4 py-2 font-medium text-white shadow-soft hover:opacity-90 md:inline-block"
          >
            {t("book")}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
