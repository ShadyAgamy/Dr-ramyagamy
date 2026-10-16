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
  // The WhatsApp banner. Replace with a photographer's wide shot when it arrives.
  heroImage: {
    src: "/images/hero-doctor.jpg",
    alt: {
      ar: "د. رامي عجمي",
      en: "Dr. Ramy Agamy",
    },
    width: 1600,
    height: 837,
  },
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
  },
};
