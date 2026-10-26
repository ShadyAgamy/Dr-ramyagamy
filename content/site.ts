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
  // Wide studio banner: he stands in the middle, his signature is on the wall
  // to one side, and the window wall on the other side is empty enough for text.
  bannerImage: {
    src: "/images/doctor-cover.jpg",
    alt: {
      ar: "د. رامي عجمي",
      en: "Dr. Ramy Agamy",
    },
    width: 2400,
    height: 1260,
  },
  // Followers: Facebook 525K + TikTok 100K + Instagram 50K ≈ 675K, rounded (2026-10-23).
  // Recommend: from his Facebook reviews.
  socialProof: {
    followers: {
      value: { ar: "٧٠٠ ألف", en: "700K" },
      label: {
        ar: "متابع على منصات التواصل",
        en: "followers across social media",
      },
    },
    recommend: {
      value: { ar: "١٠٠٪", en: "100%" },
      label: { ar: "يوصون به (٣٤ تقييمًا)", en: "recommend him (34 reviews)" },
    },
  },
  // Counted up on the home page. Numbers and wording from the doctor (confirmed 2026-10-23).
  counters: [
    {
      value: 6000,
      suffix: "+",
      label: { ar: "قصة نجاح", en: "success stories" },
    },
    {
      value: 220,
      label: {
        ar: "بروتوكول علاجي مختلف",
        en: "different treatment protocols",
      },
    },
    {
      value: 15,
      suffix: "+",
      label: { ar: "سنة خبرة", en: "years of experience" },
    },
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
    // From his Google Business Profile (New Cairo), 2026-10-24.
    googleReview: "https://g.page/r/CWIewLmLfrq1EBM/review",
  },
};
