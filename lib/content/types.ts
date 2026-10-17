// All content types. Fields for data we do not have yet are optional,
// so the site builds and renders without them.

export type Locale = "ar" | "en";

/** Arabic is required, English is optional until translated. */
export type Localized<T> = { ar: T; en?: T };

export type Seo = {
  metaTitle?: Localized<string>;
  metaDescription?: Localized<string>;
  ogImage?: string;
  noindex?: boolean;
  canonicalUrl?: string;
};

export type ImageRef = {
  /** Path under /public, e.g. "/images/clinics/new-cairo-reception.jpg". */
  src: string;
  /** Required on every image. */
  alt: Localized<string>;
  width: number;
  height: number;
};

export type PhoneNumber = {
  /** Shown on the page, e.g. "010 97333303". */
  display: string;
  /** E.164 format for tel: links, e.g. "+201097333303". */
  e164: string;
};

export type SiteSettings = {
  doctorName: Localized<string>;
  /** Hidden until a real photo is added. */
  doctorPhoto?: ImageRef;
  /** Cut-out photo beside the text in the home hero. Hidden until added. */
  heroImage?: ImageRef;
  /** Short numbers in the home hero, e.g. years of experience. Hidden when empty. */
  stats?: { value: Localized<string>; label: Localized<string> }[];
  specialty: Localized<string>;
  /** Credentials as written in his Facebook bio. */
  credentials: Localized<string[]>;
  phone: PhoneNumber;
  /** Digits only, with country code, as wa.me expects, e.g. "201097333303". */
  whatsappNumber: string;
  /** Clinic email. Not shown on the site. */
  email?: string;
  social: {
    instagram?: string;
    tiktok?: string;
    facebook?: string;
    facebookReels?: string;
  };
};

export type Weekday =
  | "saturday"
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

export type ScheduleEntry = {
  day: Weekday;
  /** 24-hour "HH:MM", e.g. "17:00". */
  opens: string;
  closes: string;
};

export type Clinic = {
  /** URL slug: /clinics/<slug>. Latin letters only. */
  slug: string;
  /** Short label for menus and cards, e.g. "التجمع الخامس". */
  label: Localized<string>;
  /** Exact name as on Google Business Profile. */
  name?: Localized<string>;
  /** Street address, exactly as on Google Business Profile. */
  address?: Localized<string>;
  city: Localized<string>;
  mapsUrl?: string;
  lat?: number;
  lng?: number;
  /** Clinic phone if different from the main phone in site settings. */
  phone?: PhoneNumber;
  /** Empty until the days and hours are known. */
  schedule: ScheduleEntry[];
  photos: ImageRef[];
  description?: Localized<string>;
  seo?: Seo;
};

/** Line icons available for services (components/services/ServiceIcon.tsx). */
export type ServiceIconName =
  | "microscope"
  | "heart"
  | "egg"
  | "flask"
  | "dna"
  | "baby"
  | "snowflake"
  | "scope"
  | "pulse"
  | "stethoscope"
  | "hospital"
  | "calendar";

export type Service = {
  /** URL slug: /services/<slug>. Latin letters only. */
  slug: string;
  title: Localized<string>;
  icon?: ServiceIconName;
  /** One or two sentences for cards. Hidden until written. */
  summary?: Localized<string>;
  image?: ImageRef;
  /** Sort order on the services list, lowest first. */
  order: number;
  seo?: Seo;
};

/** A service with its long MDX body for one language, if that file exists. */
export type ServiceDetail = Service & {
  body?: string;
};

export type Hospital = {
  name: Localized<string>;
  city: Localized<string>;
};

export type Testimonial = {
  quote: Localized<string>;
  name?: string;
  source: "facebook" | "google" | "other";
};

export type Redirect = {
  from: string;
  to: string;
  permanent: boolean;
};

/** One article in one language, loaded from content/posts/<slug>/<locale>.mdx. */
export type Post = {
  slug: string;
  locale: Locale;
  title: string;
  excerpt: string;
  /** "YYYY-MM-DD". */
  publishedAt: string;
  cover?: { src: string; alt: string };
  /** Link to the reel. Never embedded. */
  videoUrl?: string;
  /** Service slugs. */
  relatedServices: string[];
  metaTitle?: string;
  metaDescription?: string;
  noindex: boolean;
  /** Raw MDX. Rendered in the page (Phase 3). */
  body: string;
};

/** A simple MDX page, e.g. the privacy policy, from content/pages/<slug>/<locale>.mdx. */
export type Page = {
  slug: string;
  locale: Locale;
  title: string;
  /** "YYYY-MM-DD". */
  updatedAt?: string;
  metaDescription?: string;
  noindex: boolean;
  body: string;
};
