import type { SiteSettings } from "@/lib/content/types";

export const siteSettings: SiteSettings = {
  doctorName: {
    ar: "د. رامي عجمي",
    en: "Dr. Ramy Agamy",
  },
  specialty: {
    ar: "استشاري النساء والتوليد والحقن المجهري",
    en: "Consultant of Obstetrics, Gynecology and ICSI",
  },
  // Retouched studio photo HOSS2542 (scrubs), background removed so it sits on the peach section.
  doctorPhoto: {
    src: "/images/doctor-about-cutout.webp",
    alt: {
      ar: "د. رامي عجمي، استشاري النساء والتوليد والحقن المجهري",
      en: "Dr. Ramy Agamy, consultant of obstetrics, gynecology and ICSI",
    },
    width: 1000,
    height: 1043,
  },
  // Retouched studio photo HOSS2573 (suit), background removed.
  heroImage: {
    src: "/images/doctor-hero-suit.webp",
    alt: {
      ar: "د. رامي عجمي",
      en: "Dr. Ramy Agamy",
    },
    width: 1000,
    height: 1613,
  },
  // From the brief: his bio, Facebook page and reviews.
  stats: [
    { value: { ar: "+١٥", en: "15+" }, label: { ar: "عامًا من الخبرة", en: "years of experience" } },
    { value: { ar: "٥٢٥ ألف", en: "525K" }, label: { ar: "متابع على فيسبوك", en: "Facebook followers" } },
    { value: { ar: "١٠٠٪", en: "100%" }, label: { ar: "يوصون به (٣٤ تقييمًا)", en: "recommend him (34 reviews)" } },
  ],
  // From his Facebook bio.
  credentials: {
    ar: [
      "جراح النساء والتوليد والحقن المجهري",
      "استشاري الحقن المجهري برمنجهام - انجلترا",
      "دبلومة المناظير عالية الدقة كليرمونت - فرنسا",
      "دكتوراه النساء والتوليد والعقم - جامعة الأزهر",
      "خبرة أكثر من ١٥ عام في الإخصاب المساعد",
    ],
    // Translated from the Arabic above. To confirm with the doctor before launch.
    en: [
      "Obstetrics, Gynecology and ICSI Surgeon",
      "ICSI Consultant – Birmingham, England",
      "Diploma in High-Precision Endoscopy – Clermont, France",
      "Doctorate in Obstetrics, Gynecology and Infertility – Al-Azhar University",
      "More than 15 years of experience in assisted reproduction",
    ],
  },
  phone: {
    display: "010 97333303",
    e164: "+201097333303",
  },
  whatsappNumber: "201097333303",
  email: "ramytagamo3clinic@gmail.com",
  social: {
    instagram: "https://www.instagram.com/drramyagamy",
    tiktok: "https://www.tiktok.com/@drramiagamy.obg",
    facebook: "https://www.facebook.com/RamyElAgamyClinic",
    // His reels on Facebook: linked from the articles page.
    facebookReels: "https://www.facebook.com/RamyElAgamyClinic/reels/",
  },
};
