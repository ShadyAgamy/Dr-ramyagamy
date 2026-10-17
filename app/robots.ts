import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/**
 * /robots.txt: lets search engines crawl everything and points them to the sitemap.
 * Until launch, pages stay out of Google through the noindex tag in the layout
 * (crawlers must be allowed in to see that tag).
 */
const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: "*", allow: "/" },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
