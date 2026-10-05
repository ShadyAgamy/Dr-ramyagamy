import { defineRouting } from "next-intl/routing";
import type { Locale } from "@/lib/content/types";

export const routing = defineRouting({
  locales: ["ar", "en"] satisfies Locale[],
  defaultLocale: "ar",
  localePrefix: "as-needed",

  localeDetection: false,
  localeCookie: false,
  // hreflang tags are written per page in metadata (Phase 4), because a page
  // only gets an English alternate when its English version exists.
  alternateLinks: false,
});

export type { Locale };
