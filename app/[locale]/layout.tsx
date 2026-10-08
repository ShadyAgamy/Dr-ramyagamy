import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getSiteSettings, localize } from "@/lib/content";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { arabicFont, latinFont } from "../fonts";
import "../globals.css";

// Pre-render both languages at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const site = getSiteSettings();

  // Temporary. Real SEO metadata comes in Phase 4.
  return {
    title: localize(site.doctorName, locale),
    description: localize(site.specialty, locale),
    // Keep the site out of search results until real content exists.
    robots: { index: false, follow: false },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("Common");

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${arabicFont.variable} ${latinFont.variable}`}
    >
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-button focus:bg-surface focus:px-4 focus:py-2 focus:shadow-soft"
          >
            {t("skipToContent")}
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
