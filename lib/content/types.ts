// All content types. Phase 2 adds Clinic, Service, Hospital, Testimonial, Redirect.

export type Locale = "ar" | "en";

/** Arabic is required, English is optional until translated. */
export type Localized<T> = { ar: T; en?: T };

export type SiteSettings = {
  doctorName: Localized<string>;
  specialty: Localized<string>;
  phone: {
    /** Shown on the page, e.g. "010 97333303". */
    display: string;
    /** E.164 format for tel: links, e.g. "+201097333303". */
    e164: string;
  };
  /** Digits only, with country code, as wa.me expects, e.g. "201097333303". */
  whatsappNumber: string;
  social: {
    instagram?: string;
    tiktok?: string;
    facebook?: string;
  };
};
