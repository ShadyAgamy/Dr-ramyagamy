import type { Locale } from "./i18n/routing";
import type messages from "./messages/ar.json";

// Type-checks locales and message keys in useTranslations / getTranslations.
declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
  }
}
