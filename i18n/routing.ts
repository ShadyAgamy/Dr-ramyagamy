import { defineRouting } from "next-intl/routing";
import type { Locale } from "@/lib/content/types";

export const routing = defineRouting({
  locales: ["ar", "en"] satisfies Locale[],
  defaultLocale: "ar",
  // Arabic lives at "/" with no prefix, English under "/en".
  localePrefix: "as-needed",
  // Always serve the language in the URL. Never redirect based on the
  // browser language: most content is Arabic-only for now.
  localeDetection: false,
  localeCookie: false,
  // hreflang tags are written per page in metadata (Phase 4), because a page
  // only gets an English alternate when its English version exists.
  alternateLinks: false,
});

export type { Locale };
