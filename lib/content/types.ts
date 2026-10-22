export type Locale = "ar" | "en";

export type Localized<T> = { ar: T; en?: T };

export type Seo = {
  metaTitle?: Localized<string>;
  metaDescription?: Localized<string>;
  ogImage?: string;
  noindex?: boolean;
  canonicalUrl?: string;
};

export type ImageRef = {
  src: string;
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

/** A number written out as text, e.g. "٥٢٥ ألف" + "متابع على فيسبوك". */
export type Stat = {
  value: Localized<string>;
  label: Localized<string>;
};

/** A number that counts up on the home page, e.g. 6000 + "قصة نجاح". */
export type Counter = {
  value: number;
  /** Shown right after the number, e.g. "+". */
  suffix?: string;
  label: Localized<string>;
};

export type SiteSettings = {
  doctorName: Localized<string>;
  doctorPhoto?: ImageRef;
  heroImage?: ImageRef;
  /** Wide studio banner, for a hero that runs the full width of the screen. */
  bannerImage?: ImageRef;
  /** Numbers that come from his pages, shown as plain text. */
  socialProof?: {
    /** Badge in the hero. */
    followers?: Stat;
    /** Shown with the reviews. */
    recommend?: Stat;
  };
  /** Numbers that count up once they scroll into view. */
  counters?: Counter[];
  specialty: Localized<string>;
  credentials: Localized<string[]>;
  phone: PhoneNumber;
  /** Digits only, with country code, as wa.me expects, e.g. "201097333303". */
  whatsappNumber: string;
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
  slug: string;
  label: Localized<string>;
  /** Exact name as on Google Business Profile. */
  name?: Localized<string>;
  /** Street address, exactly as on Google Business Profile. */
  address?: Localized<string>;
  city: Localized<string>;
  mapsUrl?: string;
  lat?: number;
  lng?: number;
  phone?: PhoneNumber;
  schedule: ScheduleEntry[];
  photos: ImageRef[];
  description?: Localized<string>;
  seo?: Seo;
};

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
  slug: string;
  title: Localized<string>;
  icon?: ServiceIconName;
  summary?: Localized<string>;
  image?: ImageRef;
  order: number;
  seo?: Seo;
};

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
  body: string;
};

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
