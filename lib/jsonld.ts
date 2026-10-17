// Structured data (schema.org JSON-LD) for Google. Built from the content layer;
// missing data is left out, never guessed. Test with https://search.google.com/test/rich-results
import { type Clinic, getSiteSettings, type Locale, localize, type Post } from "@/lib/content";
import { groupSchedule } from "@/lib/schedule";
import { localizedPath, siteUrl } from "@/lib/seo";

const absoluteUrl = (path: string, locale: Locale) => siteUrl + localizedPath(path, locale);

/** Stable IDs so items can point to each other, e.g. an article's author → the doctor. */
const physicianId = `${siteUrl}/#physician`;

/** The doctor: on the home and About pages. */
export const physicianJsonLd = (locale: Locale) => {
  const site = getSiteSettings();
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": physicianId,
    name: localize(site.doctorName, locale),
    // Other spellings people search for (his Facebook URL and Google listing use العجمي / El-Agamy).
    alternateName: ["د. رامي عجمي", "د. رامي العجمي", "Dr. Ramy Agamy", "Dr. Ramy El-Agamy"],
    description: localize(site.specialty, locale),
    medicalSpecialty: ["Obstetric", "Gynecologic"],
    url: absoluteUrl("/", locale),
    ...(site.doctorPhoto && { image: siteUrl + site.doctorPhoto.src }),
    telephone: site.phone.e164,
    sameAs: [site.social.facebook, site.social.instagram, site.social.tiktok].filter(Boolean),
  };
};

const weekdayNames = {
  saturday: "Saturday",
  sunday: "Sunday",
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
} as const;

/** One clinic: on its clinic page. */
export const clinicJsonLd = (clinic: Clinic, title: string, locale: Locale) => {
  const site = getSiteSettings();
  const address = clinic.address && localize(clinic.address, locale);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${absoluteUrl(`/clinics/${clinic.slug}`, locale)}#clinic`,
    name: title,
    url: absoluteUrl(`/clinics/${clinic.slug}`, locale),
    telephone: (clinic.phone ?? site.phone).e164,
    medicalSpecialty: ["Obstetric", "Gynecologic"],
    ...(address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
        addressLocality: localize(clinic.city, locale),
        addressCountry: "EG",
      },
    }),
    ...(clinic.lat !== undefined &&
      clinic.lng !== undefined && { geo: { "@type": "GeoCoordinates", latitude: clinic.lat, longitude: clinic.lng } }),
    ...(clinic.mapsUrl && { hasMap: clinic.mapsUrl }),
    ...(clinic.photos.length > 0 && { image: clinic.photos.map((photo) => siteUrl + photo.src) }),
    ...(clinic.schedule.length > 0 && {
      openingHoursSpecification: groupSchedule(clinic.schedule).map((group) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: group.days.map((day) => weekdayNames[day]),
        opens: group.opens,
        closes: group.closes,
      })),
    }),
    // The doctor who works here.
    employee: { "@id": physicianId },
  };
};

/** Home › Section › Page. `href` is a path without the language prefix; the last item has none. */
export const breadcrumbJsonLd = (items: { label: string; href?: string }[], locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    ...(item.href && { item: absoluteUrl(item.href, locale) }),
  })),
});

/** One article: on the article page. The author is the doctor. */
export const articleJsonLd = (post: Post, locale: Locale) => {
  const site = getSiteSettings();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    inLanguage: locale,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`, locale),
    image: siteUrl + (post.cover?.src ?? "/images/og-default.jpg"),
    author: {
      "@type": "Physician",
      "@id": physicianId,
      name: localize(site.doctorName, locale),
      url: absoluteUrl("/about", locale),
    },
  };
};
