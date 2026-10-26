import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/**
 * /robots.txt: lets search engines crawl everything and points them to the sitemap.
 * To keep one page out of Google, set noindex on it in the content (it is then
 * also left out of the sitemap); robots.txt must still allow it, or Google never
 * sees that tag.
 */
const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: "*", allow: "/" },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
