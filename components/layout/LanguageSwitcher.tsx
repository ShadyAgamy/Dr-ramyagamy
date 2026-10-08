"use client";

import NextLink from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";

type LanguageSwitcherProps = {
  /** Paths that exist in the other language, e.g. ["/", "/about", "/blog/some-post"]. */
  otherLocalePaths: string[];
};

/**
 * Links to the same page in the other language.
 * If that page has no version in the other language, links to its home page instead.
 */
export const LanguageSwitcher = ({ otherLocalePaths }: LanguageSwitcherProps) => {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "ar" ? "en" : "ar";

  const targetPath = otherLocalePaths.includes(pathname) ? pathname : "/";

  // Plain next/link with a computed href: next-intl's Link would point to
  // "/ar/..." (which then redirects) instead of the canonical "/...".
  const href = getPathname({ href: targetPath, locale: otherLocale });

  return (
    <NextLink
      href={href}
      hrefLang={otherLocale}
      lang={otherLocale}
      aria-label={t("ariaLabel")}
      className="rounded-button border border-line px-3 py-2 text-sm font-medium text-ink hover:bg-peach"
    >
      {t("label")}
    </NextLink>
  );
};
