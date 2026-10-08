import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  experimental: {
    // One bilingual 404 page for every unknown URL (app/global-not-found.tsx).
    // Needed because our root layout lives in app/[locale].
    globalNotFound: true,
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
