import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { redirects } from "./content/redirects";

const nextConfig: NextConfig = {
  // Old URL → new URL, from content/redirects.ts. Paths are written without
  // the language prefix; each rule is added for Arabic and for /en.
  redirects: async () =>
    redirects.flatMap(({ from, to, permanent }) => [
      { source: from, destination: to, permanent },
      { source: `/en${from}`, destination: `/en${to === "/" ? "" : to}`, permanent },
    ]),
  experimental: {
    // One bilingual 404 page for every unknown URL (app/global-not-found.tsx).
    // Needed because our root layout lives in app/[locale].
    globalNotFound: true,
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
