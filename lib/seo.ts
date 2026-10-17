import type { Metadata } from "next";
import { getSiteSettings, type Locale, localize } from "@/lib/content";
import { routing } from "@/i18n/routing";

/**
 * The site's public address. Share images and canonical links need
 * full URLs. NEXT_PUBLIC_SITE_URL wins; Netlify sets URL automatically.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "http://localhost:3000";

/** The banner, cropped to the 1200×630 size share previews expect. */
const defaultOgImage = { url: "/images/og-default.jpg", width: 1200, height: 630 };

const ogLocales: Record<Locale, string> = { ar: "ar_EG", en: "en_US" };

/** "/services/icsi" → "/services/icsi" in Arabic (no prefix), "/en/services/icsi" in English. */
export const localizedPath = (path: string, locale: Locale) =>
  locale === routing.defaultLocale ? path : `/${locale}${path === "/" ? "" : path}`;

type PageMetadataInput = {
  locale: Locale;
  /** The page's path without the language prefix, e.g. "/services/icsi". */
  path: string;
  /** Languages this page exists in. Only these get an hreflang link. Default: both. */
  locales?: Locale[];
  /** From the content's seo fields. */
  noindex?: boolean;
  canonicalUrl?: string;
  title: string;
  description?: string;
  /** Page-specific share image; falls back to the banner. */
  image?: string;
  /** Only for blog posts. */
  article?: { publishedTime: string };
};

/**
 * Title, description, canonical and hreflang links, and share tags
 * (Open Graph + Twitter) for one page. Every page uses this so the tags stay consistent.
 * URLs are relative here; metadataBase (in the layout) turns them into full URLs.
 */
export const buildPageMetadata = ({
  locale,
  path,
  locales = [...routing.locales],
  noindex,
  canonicalUrl,
  title,
  description,
  image,
  article,
}: PageMetadataInput): Metadata => {
  const siteName = localize(getSiteSettings().doctorName, locale);
  const images = image ? [{ url: image, alt: title }] : [{ ...defaultOgImage, alt: siteName }];
  const canonical = canonicalUrl ?? localizedPath(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical,
      // hreflang: one link per language the page exists in, plus x-default (Arabic).
      languages: {
        ...Object.fromEntries(locales.map((item) => [item, localizedPath(path, item)])),
        "x-default": localizedPath(path, routing.defaultLocale),
      },
    },
    ...(noindex && { robots: { index: false, follow: true } }),
    openGraph: {
      url: canonical,
      title,
      description,
      siteName,
      locale: ogLocales[locale],
      images,
      ...(article
        ? { type: "article", publishedTime: article.publishedTime, authors: [siteName] }
        : { type: "website" }),
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
};
