# Dr. Ramy Agamy Website: Project Brief

## 1. Overview

Personal website for **Dr. Ramy Agamy (د. رامي عجمي)**, consultant of obstetrics, gynecology and ICSI (IVF) in Egypt.

He already has a strong social presence (about 525K Facebook followers, reels with 1M+ views, 34 reviews at 100% recommend). He has no website yet.

**Clinics**

- **Suez**: the main clinic.
- **New Cairo (Fifth Settlement / التجمع الخامس)**: 2 or 3 days a week, at the HCC center.
- Surgeries happen in different hospitals. Hospitals are NOT clinic locations.

**Goals**

1. Rank first on Google for his name (Arabic and English spellings).
2. Rank locally for each clinic (Suez first, New Cairo second).
3. Turn visitors into bookings: WhatsApp and phone (the clinic handles every booking).
4. Publish articles based on patient questions from his reels.

**Content approach: static first, no CMS.**
All content lives in the repo as typed data files and MDX. The developer edits content and deploys. A headless CMS (likely Sanity) may be added later, so **all content access must go through a small content layer** (see section 5). Swapping to a CMS later should only require rewriting that layer, not pages or components.

## 2. Tech stack

- **Next.js** (latest stable, App Router), **TypeScript**, **Tailwind CSS**
- **next-intl** for Arabic and English
- **MDX** for articles: `gray-matter` for frontmatter + `next-mdx-remote` (RSC) for rendering
- **Netlify** for hosting (free plan, commercial use allowed). Do NOT target Vercel. Known issue: `*.netlify.app` is unreachable from Egypt; see `DEPLOY.md` for the launch plan (custom domain A record to `75.2.60.5`).
- **Google Tag Manager** via `@next/third-parties`

Rendering: every public page is statically generated at build time (`generateStaticParams`). No page depends on client-side fetching for its main content.

## 3. Languages and URLs

- **Arabic is the default** language, served at `/` with no prefix, `dir="rtl"`, `lang="ar"`.
- **English** is served under `/en`, `dir="ltr"`, `lang="en"`.
- Use next-intl `localePrefix: 'as-needed'`.
- **Slugs are Latin (English) and shared by both languages.** Example: `/services/icsi` and `/en/services/icsi`. No Arabic characters in URLs.
- Every page outputs `hreflang` alternates for `ar`, `en`, and `x-default` (pointing to Arabic).
- If a page has no English version yet, do not output an `en` alternate for it, and do not include it in the English sitemap.
- A language switcher keeps the user on the same page (falls back to the English home page if the English version does not exist).
- Build RTL first. Use logical CSS properties (Tailwind `ms-`, `me-`, `ps-`, `pe-`, `start`, `end`), never `left`/`right` for layout.
- UI strings (buttons, labels, nav) live in next-intl message files: `messages/ar.json`, `messages/en.json`.

## 4. Pages and routes

| Route              | Content                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `/`                | Home: hero with photo and name, short credentials, services overview, the two clinics, latest articles, testimonials, booking CTA |
| `/about`           | Full bio, credentials, hospitals where he operates                                                                                |
| `/services`        | List of services                                                                                                                  |
| `/services/[slug]` | One service page                                                                                                                  |
| `/clinics/[slug]`  | One clinic page: address, map link, phone, days and hours, photos, booking CTA. Slugs: `suez`, `new-cairo`                        |
| `/blog`            | Articles list                                                                                                                     |
| `/blog/[slug]`     | One article                                                                                                                       |
| `/book`            | How to book: WhatsApp and call buttons, the two clinics. No form                                                                  |
| `/privacy`         | Privacy policy (MDX)                                                                                                              |
| 404                | Custom, bilingual, with links home and to booking                                                                                 |

All internal navigation uses `next/link` (real `<a href>` tags). Never navigate with JS buttons.

## 5. Content structure

### Folder layout

```
content/
  site.ts            # siteSettings
  clinics.ts         # Clinic[]
  services.ts        # Service[] (summary data)
  hospitals.ts       # Hospital[]
  testimonials.ts    # Testimonial[]
  redirects.ts       # Redirect[]
  services/
    <slug>/ar.mdx    # long body for a service (optional)
    <slug>/en.mdx
  posts/
    <slug>/ar.mdx
    <slug>/en.mdx    # optional, may not exist yet
  pages/
    privacy/ar.mdx
    privacy/en.mdx
lib/content/
  types.ts           # all content types
  index.ts           # the content layer (only place that reads /content)
```

### Types

```ts
type Locale = "ar" | "en";
type Localized<T> = { ar: T; en?: T }; // Arabic required, English optional

type Seo = {
  metaTitle?: Localized<string>;
  metaDescription?: Localized<string>;
  ogImage?: string;
  noindex?: boolean;
  canonicalUrl?: string;
};

type ImageRef = {
  src: string;
  alt: Localized<string>;
  width: number;
  height: number;
};
```

Content types to define: `SiteSettings`, `Clinic` (name, slug, address, city, mapsUrl, lat, lng, phone, schedule as `{ day, opens, closes }[]`, photos, description, seo), `Service` (title, slug, summary, image, order, seo), `Hospital` (name, city), `Testimonial` (quote, name?, source), `Redirect` (from, to, permanent).

**Every image has a required alt text.**

### MDX frontmatter for posts

```yaml
title: ""
excerpt: ""
publishedAt: "YYYY-MM-DD"
coverImage: ""
coverAlt: ""
videoUrl: "" # optional, link to the reel
relatedServices: [] # service slugs
metaTitle: "" # optional, falls back to title
metaDescription: "" # optional, falls back to excerpt
noindex: false
```

Validate frontmatter with a simple TypeScript check or `zod`, and fail the build with a clear error if a required field is missing.

### Content layer API

`lib/content/index.ts` exposes functions like:

```ts
getSiteSettings();
(getClinics(), getClinic(slug));
(getServices(), getService(slug, locale));
(getPosts(locale), getPost(slug, locale));
(getHospitals(), getTestimonials());
getPage(slug, locale);
getRedirects();
```

Pages and components must import content ONLY from this module. Never read `/content` directly from a page.

## 6. SEO requirements

- All pages are pre-rendered. Title and main content must be in the HTML.
- `generateMetadata` on every route, from the `seo` fields, with fallbacks from `site.ts`.
- Open Graph and Twitter tags on every page.
- `app/sitemap.ts` generated from the content layer, with both languages and `alternates` (only where the English version exists).
- `app/robots.ts` pointing to the sitemap.
- Respect `noindex` and `canonicalUrl`.
- **Redirects:** `next.config` `redirects()` reads `content/redirects.ts`.
- **JSON-LD structured data:**
  - `Physician` for the doctor (name, medical specialty, image, `sameAs` social links).
  - `MedicalClinic` for each clinic (name, address, geo, telephone, `openingHoursSpecification` from the schedule).
  - `BreadcrumbList` on inner pages.
  - `Article` on blog posts (author = the doctor).
- One `h1` per page. Headings in order.
- `next/image` for all images, with alt text.
- `next/font`: an Arabic font (for example IBM Plex Sans Arabic or Tajawal) plus a matching Latin font.
- **Video:** never embed Facebook/Instagram/TikTok players (too heavy). Show a thumbnail with a play icon that links out to the video.
- Clinic name, address and phone must be written exactly the same everywhere on the site (same as Google Business Profile).
- Target Lighthouse 90+ on Performance, Accessibility, Best Practices and SEO, on mobile.

## 7. Booking

**Decision (2026-10-16): no booking form.** Patients book on WhatsApp or by phone; the clinic assistant handles every booking.

- `/book` shows WhatsApp and call buttons, the two clinics, and a notice: do not send medical details in booking messages.
- **WhatsApp:** a floating WhatsApp button on every page, using `https://wa.me/<number>` with a prefilled message in the current language. Also a WhatsApp button on each clinic page and on `/book`.
- No double-booking logic. The clinic confirms each request by phone or WhatsApp.
- **Later (after launch), see Phase 7:** online consultations with payment and scheduling.

## 8. Design direction

Match his existing social media brand:

- Warm **orange** as the main color, with **peach and cream** backgrounds, white surfaces, and dark text.
- Friendly, warm, modern medical look. Rounded corners, soft shadows, lots of white space.
- Real photos of the doctor and clinics, not stock illustrations.
- Mobile first. Most visitors come from social media on phones.
- Define colors and spacing as design tokens (CSS variables + Tailwind theme) so exact brand hex values can be swapped in later.

## 9. Known data (safe to use)

- Name: Dr. Ramy Agamy / د. رامي عجمي
- Specialty: consultant of obstetrics, gynecology and ICSI
- Credentials (from his Facebook bio, Arabic):
  - جراح النساء والتوليد والحقن المجهري
  - استشاري الحقن المجهري برمنجهام - انجلترا (corrected spelling, confirmed)
  - دبلومة المناظير عالية الدقة كليرمونت - فرنسا
  - دكتوراه النساء والتوليد والعقم - جامعة الأزهر
  - خبرة أكثر من ١٥ عام في الإخصاب المساعد
- Phone: 010 97333303
- WhatsApp: +20 10 97333303
- Instagram: `drramyagamy`
- TikTok: `drramiagamy.obg`
- Facebook page: "Dr. Ramy Agamy - د.رامي عجمي"
- New Cairo clinic address (Arabic, from Facebook): التجمع الخامس - ش التسعين الشمالي خلف المستشفى الجوي - مركز HCC الدور الثالث، عيادة 336
- Suez clinic address (given by the developer, **not yet confirmed** against Google Business Profile): الملاحه الجديده, بجوار مستشفي قناه السويس التخصصي
- Clinic email (accounts, not shown on the site): ramytagamo3clinic@gmail.com
- Facebook page URL: https://www.facebook.com/RamyElAgamyClinic
- Name spelling: use "رامي عجمي" / "Ramy Agamy" for now. "رامي العجمي" / "El-Agamy" also appear (his bio, Facebook URL); use them as alternate names in structured data.

## 10. Missing data (do NOT invent)

These will be added to the content files later. Leave them out or as optional fields. Never write placeholder medical text, fake reviews, fake credentials, fake hours or fake addresses.

- Suez clinic hours (and confirmation of its address)
- New Cairo clinic days and hours
- Final list of services and their content
- Clinic names exactly as on Google Business Profile
- Whether there is a Madinaty (مدينتي) clinic (mentioned on his Instagram)
- Hospitals where he operates, testimonials, articles
- Logo files and exact brand colors
- Photos
- English versions of content
- Final domain (start on the Netlify subdomain)

The site must build and render cleanly when this data is missing. Hide empty sections instead of breaking or showing placeholders.

## 11. Environment variables

```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GTM_ID=
```

Provide a `.env.example` with these keys and no values. GTM loads only if the ID is set.

## 12. Build phases

Work in this order. **Stop after each phase** and summarize what changed, so the developer can review and understand it before continuing.

**Phase 0: Deploy first**
Scaffold Next.js + TypeScript + Tailwind. Add a simple page. Add `netlify.toml` if needed. Write the steps to connect the repo to Netlify. Goal: a live URL on day one.

**Phase 1: Layout and languages**
next-intl setup, RTL/LTR, fonts, design tokens, header, footer, language switcher, floating WhatsApp button.

**Phase 2: Content layer**
Types, content files with only the known data from section 9, MDX loading with frontmatter validation, and the content layer API from section 5.

**Phase 3: Pages**
All routes from section 4 using the content layer and static generation. Empty sections hide gracefully.

**Phase 4: SEO**
Everything in section 6: metadata, hreflang, sitemap, robots, JSON-LD, redirects.

**Phase 5: Booking**
WhatsApp and phone only (section 7). Already covered by Phases 1 and 3; no form.

**Phase 6: Finish**
GTM, Lighthouse pass on mobile, fix issues, and a short README covering: setup, env vars, how to add an article, how to add a service or update a clinic, how to add a redirect, and how to deploy. Then launch (custom domain, remove `noindex`, Google Search Console).

**Phase 7 (after launch): Online consultations with payment**
A learning project for the developer, built step by step with short lessons first: Paymob payments (start in test mode; call its REST API directly, since there is no official Node SDK) via Next.js Route Handlers and a verified webhook (HMAC), then the clinic's own scheduling (availability slots, no double booking) with a database. Payments settle to the doctor's bank account. The real merchant account needs the clinic's papers.

## 12b. Decisions so far

- **Launch without articles.** "Articles" is hidden from the nav and footer until the first post exists, per language. Later: turn his own reels into articles (transcribe with Whisper, draft, doctor approves, link the reel). Never copy other doctors' articles.
- **404:** `notFound()` inside pages renders an empty document in Next 16 (vercel/next.js#99287), so unknown URLs go to one bilingual `app/global-not-found.tsx` (experimental `globalNotFound` flag), and dynamic routes use `dynamicParams = false`.
- **Workflow:** leave changes uncommitted for review; commit on the developer's OK and push on a separate OK. The developer is learning Next.js: explain new concepts briefly, keep replies short, use arrow functions.

## 13. Rules

- Never invent medical content, statistics, credentials, reviews or contact details.
- Keep dependencies minimal. Explain any new dependency before adding it.
- Write readable code with clear names. The developer must be able to understand and maintain every part.
- Commit in small, clear steps.
