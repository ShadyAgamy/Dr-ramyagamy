import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getClinics, getPage, getPagePaths, getPosts, getServices, type Locale } from "@/lib/content";
import { localizedPath, siteUrl } from "@/lib/seo";

/** Paths marked noindex in the content: kept out of the sitemap. */
const getNoindexPaths = (locale: Locale) =>
  new Set([
    ...getPosts(locale)
      .filter((post) => post.noindex)
      .map((post) => `/blog/${post.slug}`),
    ...getServices(locale)
      .filter((service) => service.seo?.noindex)
      .map((service) => `/services/${service.slug}`),
    ...getClinics()
      .filter((clinic) => clinic.seo?.noindex)
      .map((clinic) => `/clinics/${clinic.slug}`),
    ...(getPage("privacy", locale)?.noindex ? ["/privacy"] : []),
  ]);

/** Article dates, so Google knows when a post was published. */
const getLastModified = (path: string, locale: Locale) =>
  getPosts(locale).find((post) => `/blog/${post.slug}` === path)?.publishedAt;

/**
 * /sitemap.xml: every indexable page in each language. Each entry lists its
 * other-language version only when that version exists (hreflang).
 */
const sitemap = (): MetadataRoute.Sitemap => {
  const pathsByLocale = Object.fromEntries(
    routing.locales.map((locale) => {
      const noindex = getNoindexPaths(locale);
      return [locale, getPagePaths(locale).filter((path) => !noindex.has(path))];
    }),
  ) as Record<Locale, string[]>;

  return routing.locales.flatMap((locale) =>
    pathsByLocale[locale].map((path) => {
      const languages = Object.fromEntries(
        routing.locales
          .filter((item) => pathsByLocale[item].includes(path))
          .map((item) => [item, siteUrl + localizedPath(path, item)]),
      );
      const lastModified = getLastModified(path, locale);

      return {
        url: siteUrl + localizedPath(path, locale),
        ...(lastModified && { lastModified }),
        alternates: { languages: { ...languages, "x-default": siteUrl + localizedPath(path, routing.defaultLocale) } },
      };
    }),
  );
};

export default sitemap;
