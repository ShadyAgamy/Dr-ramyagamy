import type { Clinic } from "@/lib/content/types";

// Order matters: Suez is the main clinic and comes first everywhere.
// Address, name and hours must match Google Business Profile exactly.
export const clinics: Clinic[] = [
  {
    slug: "suez",
    label: { ar: "السويس", en: "Suez" },
    // TODO: confirm the exact address text from Google Business Profile.
    address: { ar: "الملاحه الجديده, بجوار مستشفي قناه السويس التخصصي" },
    city: { ar: "السويس", en: "Suez" },
    schedule: [],
    photos: [],
  },
  {
    slug: "new-cairo",
    label: { ar: "التجمع الخامس", en: "New Cairo" },
    address: {
      ar: "التجمع الخامس- ش التسعين الشمالي خلف المستشفى الجوي-مركز HCC-الدور الثالث عيادة 336",
    },
    city: { ar: "القاهرة", en: "Cairo" },
    schedule: [],
    photos: [],
  },
];
