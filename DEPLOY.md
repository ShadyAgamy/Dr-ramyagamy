# Deploying to Netlify

The site is hosted on Netlify (free plan). Every push to `main` triggers a new deploy.
Build settings live in `netlify.toml`, so you do not need to type them in the Netlify UI.

## 1. Push the code to GitHub

Create an empty repository on GitHub (no README, no .gitignore, no license), then:

```bash
git remote add origin https://github.com/ShadyAgamy/Dr-ramyagamy.git
git push -u origin main
```

## 2. Connect the repository to Netlify

1. Log in at https://app.netlify.com.
2. **Add new project** → **Import an existing project** → **GitHub**.
3. Authorize Netlify and pick the `Dr-ramyagamy` repository.
4. Branch to deploy: `main`. Leave build command and publish directory as detected
   (they come from `netlify.toml`: `npm run build` and `.next`).
5. Click **Deploy**. The first build takes a few minutes.

## 3. Pick the site name

**Project configuration** → **General** → **Project details** → **Change project name**.
For example `drramyagamy`, which gives `https://drramyagamy.netlify.app`.

## 4. Environment variables

**Project configuration** → **Environment variables** → **Add a variable**.
The keys are listed in `.env.example`:

| Key                         | Value                                       | Needed from |
| --------------------------- | ------------------------------------------- | ----------- |
| `NEXT_PUBLIC_SITE_URL`      | The live URL, e.g. `https://drramyagamy.netlify.app` | Phase 4 |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Access key from https://web3forms.com       | Phase 5     |
| `NEXT_PUBLIC_GTM_ID`        | Google Tag Manager ID, e.g. `GTM-XXXXXXX`   | Phase 6     |

`NEXT_PUBLIC_*` values are baked in at build time. After changing one, trigger a new deploy:
**Deploys** → **Trigger deploy** → **Deploy project**.

## 5. Local development

```bash
nvm use          # uses Node 22 from .nvmrc
npm install
cp .env.example .env.local   # fill in values if needed
npm run dev      # http://localhost:3000
```

Check a production build before pushing:

```bash
npm run lint
npm run build
```

## Known issue: `*.netlify.app` does not load from Egypt

Netlify's DNS sends visitors in Egypt to its Frankfurt servers (`63.176.8.218`, `35.157.26.135`),
and those IPs time out from Egyptian networks. The site itself works: it loads from other countries,
and from Egypt when served by other Netlify IPs such as `75.2.60.5`.

- **During development:** open the `netlify.app` URL with a VPN.
- **At launch, with the custom domain:** add an **A record** for the main domain pointing to `75.2.60.5`,
  and point `www` to the same IP. Do not use Netlify DNS or a CNAME to `*.netlify.app`, because both send
  Egyptian visitors back to the Frankfurt servers. Then test on several Egyptian mobile carriers.
- **If that fails:** move hosting to Cloudflare Pages.
