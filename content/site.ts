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
  // Exactly as in his Facebook bio. English not provided yet.
  credentials: {
    ar: [
      "جراح النساء والتوليد والحقن المجهري",
      "استشاري الحقن المجهري برنامجهام - انجلترا",
      "دبلومة المناظير عالية الدقة كليرمونت - فرنسا",
      "دكتوراه النساء والتوليد والعقم - جامعة الأزهر",
      "خبرة أكثر من ١٥ عام في الإخصاب المساعد",
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
