// The content layer: the only module that reads from /content.
// Pages and components import content from here, never from /content directly.
// Phase 2 adds clinics, services, posts, hospitals, testimonials and redirects.

import { siteSettings } from "@/content/site";
import type { Locale, Localized, SiteSettings } from "./types";

export type { Locale, Localized, SiteSettings };

export function getSiteSettings(): SiteSettings {
  return siteSettings;
}

/** Returns the value for `locale`, falling back to Arabic. */
export function localize<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value.ar;
}
