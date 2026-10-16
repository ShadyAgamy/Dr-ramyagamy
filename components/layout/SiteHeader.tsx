import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getPagePaths, getPosts, getSiteSettings, localize } from "@/lib/content";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MainNav } from "./MainNav";
import { MobileMenu } from "./MobileMenu";
import { bookHref, visibleNavItems } from "./nav-items";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const site = getSiteSettings();
  const otherLocalePaths = getPagePaths(locale === "ar" ? "en" : "ar");
  const navItems = visibleNavItems(getPosts(locale).length > 0);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-site items-center justify-between gap-4 px-4">
        {/* Temporary PNG made from a WhatsApp JPEG; swap for the original SVG when it arrives. */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/brand/logo-wordmark.png"
            alt={localize(site.doctorName, locale)}
            width={548}
            height={370}
            priority
            className="h-14 w-auto"
          />
        </Link>

        <MainNav items={navItems} />

        <div className="flex items-center gap-2">
          <LanguageSwitcher otherLocalePaths={otherLocalePaths} />
          <Link
            href={bookHref}
            className="hidden rounded-button bg-brand-strong px-4 py-2 font-medium text-white shadow-soft hover:opacity-90 md:inline-block"
          >
            {t("book")}
          </Link>
          <MobileMenu items={navItems} />
        </div>
      </div>
    </header>
  );
}
