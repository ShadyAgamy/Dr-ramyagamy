# Dr. Ramy Agamy website

Personal site for Dr. Ramy Agamy (د. رامي عجمي), consultant of obstetrics, gynecology and ICSI.
Live at **https://ramyagamy.com**. Arabic is the default language (`/`), English is under `/en`.

Built with Next.js (App Router), TypeScript, Tailwind CSS, next-intl and MDX. Every page is
generated at build time; there is no database and no CMS. All content lives in `content/`.
`CLAUDE.md` is the full project brief, with every decision so far.

## Setup

```bash
nvm use                      # Node 22, from .nvmrc
npm install
cp .env.example .env.local   # optional locally
npm run dev                  # http://localhost:3000
```

Before pushing, check that it builds:

```bash
npm run lint
npm run build
```

## Environment variables

| Key                    | What it does                                                                                                                                                         |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | The public address (`https://ramyagamy.com`), used in canonical links, the sitemap, share images and structured data. Falls back to Netlify's `URL`, then localhost. |
| `NEXT_PUBLIC_GTM_ID`   | Google Tag Manager container (`GTM-THJXPFZW`). GTM only loads when this is set. GA4 is a tag inside GTM, not in the code.                                            |

`NEXT_PUBLIC_` means the value is sent to the browser, so never use that prefix for a secret
(for example a payment key). The values are read at build time: after changing one in Netlify,
trigger a new deploy.

## Where things live

| Path                          | Content                                                                    |
| ----------------------------- | -------------------------------------------------------------------------- |
| `content/site.ts`             | Name, specialty, credentials, phone, WhatsApp, social links, photos, stats |
| `content/clinics.ts`          | Clinics: address, map link, coordinates, hours, photos                     |
| `content/services.ts`         | Services: title, icon, short summary, order                                |
| `content/services/<slug>/`    | The long service page, `ar.mdx` and `en.mdx`                               |
| `content/posts/<slug>/`       | Articles, `ar.mdx` and optional `en.mdx`                                   |
| `content/testimonials.ts`     | Patient reviews                                                            |
| `content/redirects.ts`        | Old URL → new URL                                                          |
| `content/pages/privacy/`      | Privacy policy                                                             |
| `messages/ar.json`, `en.json` | Button labels, menus and other interface text                              |
| `app/globals.css`             | Colours and other design tokens                                            |

Pages read content only through `lib/content/index.ts`. A wrong or missing field stops the build
with a message that names the file.

## Add an article

1. Create `content/posts/<slug>/ar.mdx`. The slug is the URL, in English letters, e.g. `amh-test`.
2. Start it with:

   ```yaml
   ---
   title: "..."
   excerpt: "..." # one or two sentences, shown on cards and in Google
   publishedAt: "2026-10-26"
   relatedServices: ["icsi-ivf"] # optional, slugs from content/services.ts
   videoUrl: "https://..." # optional, his reel
   ---
   ```

3. Write the body in Markdown below it (`## Heading`, `- list`, `**bold**`).
4. For English, add `en.mdx` in the same folder. Without it, the article is Arabic only and is
   left out of the English site and sitemap.

## Add a service or update a clinic

- **Service:** add an entry to `content/services.ts` (`slug`, `title`, `summary`, `icon`, `order`).
  For a full page, add `content/services/<slug>/ar.mdx` and `en.mdx` with the body only.
- **Clinic:** edit its entry in `content/clinics.ts`. Write the name, address and phone exactly as
  on Google Business Profile. Hours are 24-hour `"HH:MM"`. To show Suez again, add it back here.

## Add a redirect

When a URL changes, add the old one to `content/redirects.ts`:

```ts
{ from: "/services/ivf", to: "/services/icsi-ivf", permanent: true },
```

Write paths without `/en`; the English version is added automatically.

## Deploy

Every push to `main` deploys on Netlify. See `DEPLOY.md` for the Netlify setup, the custom domain,
the Egypt reachability issue and the launch checklist.
