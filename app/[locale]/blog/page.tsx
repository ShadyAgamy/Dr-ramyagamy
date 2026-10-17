import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PostGrid } from "@/components/blog/PostCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PlayIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { routing } from "@/i18n/routing";
import { getPosts, getSiteSettings } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const generateMetadata = async ({ params }: PageProps<"/[locale]/blog">): Promise<Metadata> => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations("Blog");
  return buildPageMetadata({ locale, path: "/blog", title: t("title"), description: t("description") });
};

/** /blog and /en/blog: the list of articles, newest first. */
const BlogPage = async ({ params }: PageProps<"/[locale]/blog">) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("Blog");
  const posts = getPosts(locale);
  const site = getSiteSettings();

  return (
    <>
      <PageHeader title={t("title")} intro={t("description")}>
        {site.social.facebookReels && (
          <div className="mt-2">
            <ButtonLink href={site.social.facebookReels} external>
              <PlayIcon className="size-5" />
              {t("watchReels")}
            </ButtonLink>
          </div>
        )}
      </PageHeader>
      <div className="mx-auto max-w-site px-4 py-14">
        {posts.length === 0 ? (
          <p className="text-ink-muted">{t("empty")}</p>
        ) : (
          <PostGrid posts={posts} headingLevel="h2" />
        )}
      </div>
    </>
  );
};

export default BlogPage;
