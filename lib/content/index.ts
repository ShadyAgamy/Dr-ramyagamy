// The content layer: the only module that reads from /content.
// Pages and components import content from here, never from /content directly.
// To move to a CMS later, rewrite this file (and ./mdx.ts); pages stay the same.

import { cache } from "react";
import { clinics } from "@/content/clinics";
import { hospitals } from "@/content/hospitals";
import { redirects } from "@/content/redirects";
import { services } from "@/content/services";
import { siteSettings } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { contentError, listSlugs, readMdxFile } from "./mdx";
import {
  pageFrontmatterSchema,
  postFrontmatterSchema,
  serviceBodyFrontmatterSchema,
  slugSchema,
} from "./schemas";
import type {
  Clinic,
  Hospital,
  Locale,
  Localized,
  Page,
  Post,
  Redirect,
  Service,
  ServiceDetail,
  SiteSettings,
  Testimonial,
} from "./types";

export type * from "./types";

const locales: Locale[] = ["ar", "en"];

/**
 * Returns the value for `locale`, falling back to Arabic.
 * Use for names and addresses, where Arabic is better than nothing.
 */
export function localize<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value.ar;
}

/**
 * Returns the value for `locale` only, or undefined if it is not translated.
 * Use for text sections, so an English page hides them instead of showing Arabic.
 */
export const localizeStrict = <T>(
  value: Localized<T> | undefined,
  locale: Locale,
): T | undefined => value?.[locale];

// ---------------------------------------------------------------------------
// Site, clinics, hospitals, testimonials, redirects (TypeScript data files)
// ---------------------------------------------------------------------------

export function getSiteSettings(): SiteSettings {
  return siteSettings;
}

export function getClinics(): Clinic[] {
  checkDataFiles();
  return clinics;
}

export function getClinic(slug: string): Clinic | undefined {
  return getClinics().find((clinic) => clinic.slug === slug);
}

export function getHospitals(): Hospital[] {
  return hospitals;
}

export function getTestimonials(): Testimonial[] {
  return testimonials;
}

export function getRedirects(): Redirect[] {
  return redirects;
}

// ---------------------------------------------------------------------------
// Services (summary in content/services.ts, optional body in MDX)
// ---------------------------------------------------------------------------

/** A service has an English version once its title and summary are translated. */
function serviceHasLocale(service: Service, locale: Locale): boolean {
  return locale === "ar" || Boolean(service.title.en && service.summary.en);
}

/** All services, sorted. With a locale, only the ones available in that language. */
export function getServices(locale?: Locale): Service[] {
  checkDataFiles();
  return services
    .filter((service) => !locale || serviceHasLocale(service, locale))
    .sort((a, b) => a.order - b.order);
}

/** One service in one language, with its MDX body if the file exists. */
export function getService(
  slug: string,
  locale: Locale,
): ServiceDetail | undefined {
  const service = getServices(locale).find((item) => item.slug === slug);
  if (!service) return undefined;

  const file = readMdxFile(
    "services",
    slug,
    locale,
    serviceBodyFrontmatterSchema,
  );
  return { ...service, body: file?.body };
}

// ---------------------------------------------------------------------------
// Posts (content/posts/<slug>/<locale>.mdx)
// ---------------------------------------------------------------------------

/** Reads every post file once per build/request. */
const loadAllPosts = cache((): Post[] => {
  const posts: Post[] = [];
  const serviceSlugs = new Set(services.map((service) => service.slug));

  for (const slug of listSlugs("posts")) {
    for (const locale of locales) {
      const file = readMdxFile("posts", slug, locale, postFrontmatterSchema);
      if (!file) continue;
      const { data, body } = file;

      for (const serviceSlug of data.relatedServices) {
        if (!serviceSlugs.has(serviceSlug)) {
          throw contentError(
            `content/posts/${slug}/${locale}.mdx`,
            `relatedServices: "${serviceSlug}" is not a service in content/services.ts`,
          );
        }
      }

      posts.push({
        slug,
        locale,
        title: data.title,
        excerpt: data.excerpt,
        publishedAt: data.publishedAt,
        cover:
          data.coverImage && data.coverAlt
            ? { src: data.coverImage, alt: data.coverAlt }
            : undefined,
        videoUrl: data.videoUrl,
        relatedServices: data.relatedServices,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        noindex: data.noindex,
        body,
      });
    }
  }

  // Newest first.
  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
});

/** All posts in one language, newest first. */
export function getPosts(locale: Locale): Post[] {
  return loadAllPosts().filter((post) => post.locale === locale);
}

export function getPost(slug: string, locale: Locale): Post | undefined {
  return getPosts(locale).find((post) => post.slug === slug);
}

/** Posts in one language that list this service in relatedServices. */
export const getPostsForService = (
  serviceSlug: string,
  locale: Locale,
): Post[] =>
  getPosts(locale).filter((post) => post.relatedServices.includes(serviceSlug));

// ---------------------------------------------------------------------------
// Pages (content/pages/<slug>/<locale>.mdx), e.g. the privacy policy
// ---------------------------------------------------------------------------

export function getPage(slug: string, locale: Locale): Page | undefined {
  const file = readMdxFile("pages", slug, locale, pageFrontmatterSchema);
  if (!file) return undefined;
  return { slug, locale, ...file.data, body: file.body };
}

// ---------------------------------------------------------------------------
// Languages available for a piece of content
// ---------------------------------------------------------------------------

/**
 * Which languages a piece of content exists in. Used for hreflang tags,
 * the sitemap, and the language switcher fallback.
 * Clinic pages exist in both languages: their labels and city are translated.
 */
export function getAvailableLocales(
  kind: "post" | "service" | "page" | "clinic",
  slug: string,
): Locale[] {
  return locales.filter((locale) => {
    switch (kind) {
      case "post":
        return Boolean(getPost(slug, locale));
      case "service":
        return Boolean(getService(slug, locale));
      case "page":
        return Boolean(getPage(slug, locale));
      case "clinic":
        return Boolean(getClinic(slug));
    }
  });
}

/**
 * Every page path that exists in one language, without the locale prefix,
 * e.g. ["/", "/about", "/blog/some-post", ...].
 * Used by the language switcher, and by the sitemap (Phase 4).
 */
export const getPagePaths = (locale: Locale): string[] => [
  "/",
  "/about",
  "/services",
  "/blog",
  "/book",
  ...(getPage("privacy", locale) ? ["/privacy"] : []),
  ...getClinics().map((clinic) => `/clinics/${clinic.slug}`),
  ...getServices(locale).map((service) => `/services/${service.slug}`),
  ...getPosts(locale).map((post) => `/blog/${post.slug}`),
];

// ---------------------------------------------------------------------------
// Checks for the TypeScript data files. TypeScript already checks the shape;
// these catch what it cannot: slug format, duplicates, time format.
// ---------------------------------------------------------------------------

const checkDataFiles = cache(() => {
  checkSlugs(
    "content/clinics.ts",
    clinics.map((clinic) => clinic.slug),
  );
  checkSlugs(
    "content/services.ts",
    services.map((service) => service.slug),
  );

  for (const clinic of clinics) {
    for (const entry of clinic.schedule) {
      for (const time of [entry.opens, entry.closes]) {
        if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
          throw contentError(
            "content/clinics.ts",
            `${clinic.slug} schedule: "${time}" must be 24-hour time like "17:00"`,
          );
        }
      }
    }
  }
});

function checkSlugs(file: string, slugs: string[]) {
  const seen = new Set<string>();
  for (const slug of slugs) {
    const result = slugSchema.safeParse(slug);
    if (!result.success) {
      throw contentError(
        file,
        `slug "${slug}" ${result.error.issues[0].message}`,
      );
    }
    if (seen.has(slug)) {
      throw contentError(file, `slug "${slug}" is used twice`);
    }
    seen.add(slug);
  }
}
