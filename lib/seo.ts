import type { Metadata } from "next";
import { getSiteSettings, type Locale, localize } from "@/lib/content";

/**
 * The site's public address. Share images and (later) canonical links need
 * full URLs. NEXT_PUBLIC_SITE_URL wins; Netlify sets URL automatically.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "http://localhost:3000";

/** The banner, cropped to the 1200×630 size share previews expect. */
const defaultOgImage = { url: "/images/og-default.jpg", width: 1200, height: 630 };

const ogLocales: Record<Locale, string> = { ar: "ar_EG", en: "en_US" };

type PageMetadataInput = {
  locale: Locale;
  title: string;
  description?: string;
  /** Page-specific share image; falls back to the banner. */
  image?: string;
  /** Only for blog posts. */
  article?: { publishedTime: string };
};

/**
 * Title, description and share tags (Open Graph + Twitter) for one page.
 * Every page uses this so the tags stay consistent.
 */
export const buildPageMetadata = ({ locale, title, description, image, article }: PageMetadataInput): Metadata => {
  const siteName = localize(getSiteSettings().doctorName, locale);
  const images = image ? [{ url: image, alt: title }] : [{ ...defaultOgImage, alt: siteName }];

  return {
    title,
    description,
    openGraph: {
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
