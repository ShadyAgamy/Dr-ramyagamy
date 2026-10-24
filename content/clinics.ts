import type { Clinic, ImageRef } from "@/lib/content/types";

/** One New Cairo clinic photo (900×1200, portrait). */
const newCairoPhoto = (file: string, ar: string, en: string): ImageRef => ({
  src: `/images/clinics/${file}`,
  alt: { ar, en },
  width: 899,
  height: 1200,
});

// Order matters: Cairo clinics come first everywhere (SEO focus is Cairo).
// Address, name and hours must match Google Business Profile exactly.
// Suez is left out for now: its address may change. Add it back here when confirmed.
// Its hours (2026-10-17): Saturday, Sunday and Tuesday, 13:00 to midnight.
export const clinics: Clinic[] = [
  {
    slug: "new-cairo",
    label: { ar: "التجمع الخامس", en: "New Cairo" },
    address: {
      ar: "التجمع الخامس- ش التسعين الشمالي خلف المستشفى الجوي-مركز HCC-الدور الثالث عيادة 331",
      // Our translation; building name and street as on Google Maps ("Health Care City", "90 N Teseen").
      en: "Health Care City (HCC), 3rd floor, clinic 331, 90 North Teseen St., behind the Air Force Hospital, Fifth Settlement, New Cairo",
    },
    city: { ar: "القاهرة", en: "Cairo" },
    // His own Google Maps listing (shared by the developer 2026-10-17).
    mapsUrl: "https://maps.app.goo.gl/Nx9impNYht2tGKfHA",
    lat: 30.019826,
    lng: 31.435876,
    schedule: [
      { day: "monday", opens: "15:00", closes: "19:00" },
      { day: "wednesday", opens: "15:00", closes: "19:00" },
    ],
    // The first photo is the one shown on clinic cards.
    photos: [
      newCairoPhoto(
        "new-cairo-consultation-room.jpg",
        "غرفة الكشف في عيادة التجمع الخامس",
        "Consultation room at the New Cairo clinic",
      ),
      newCairoPhoto(
        "new-cairo-reception.jpg",
        "استقبال عيادة التجمع الخامس",
        "Reception at the New Cairo clinic",
      ),
      newCairoPhoto(
        "new-cairo-waiting-area.jpg",
        "منطقة الانتظار في عيادة التجمع الخامس",
        "Waiting area at the New Cairo clinic",
      ),
      newCairoPhoto(
        "new-cairo-ultrasound-room.jpg",
        "غرفة السونار في عيادة التجمع الخامس",
        "Ultrasound room at the New Cairo clinic",
      ),
      newCairoPhoto(
        "new-cairo-corridor.jpg",
        "ممر عيادة التجمع الخامس",
        "Corridor at the New Cairo clinic",
      ),
    ],
  },
  {
    // A shared medical center, not his own clinic: no photos on purpose.
    slug: "madinaty",
    label: { ar: "مدينتي", en: "Madinaty" },
    // From the clinic's Google Maps listing, confirmed by the developer 2026-10-17.
    address: {
      ar: "Medical Hub Center، المركز التجاري ايست هب، بلوك ١١ الطابق الثاني، ثانى القاهرة الجديدة",
      // Our translation of the Arabic, as above.
      en: "Medical Hub Center, East Hub Mall, Block 11, 2nd floor, Madinaty, New Cairo",
    },
    city: { ar: "القاهرة", en: "Cairo" },
    // The Medical Hub Center listing on Google Maps (shared by the developer 2026-10-17).
    mapsUrl: "https://maps.app.goo.gl/uuQDutCftQwzvzRZA",
    lat: 30.0802,
    lng: 31.673373,
    schedule: [
      { day: "monday", opens: "19:00", closes: "21:00" },
      { day: "wednesday", opens: "19:00", closes: "21:00" },
    ],
    photos: [],
  },
];
