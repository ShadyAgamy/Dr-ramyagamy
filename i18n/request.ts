import { locale as rootLocale } from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale: explicitLocale }) => {
  // The [locale] URL segment, read directly from Next.js.
  // `explicitLocale` is set when code asks for a specific language,
  // e.g. getTranslations({ locale: "en" }).
  const requested = explicitLocale ?? (await rootLocale());
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    timeZone: "Africa/Cairo",
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
