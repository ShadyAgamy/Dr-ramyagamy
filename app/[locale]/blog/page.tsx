import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PostGrid } from "@/components/blog/PostCard";
import { routing } from "@/i18n/routing";
import { getPosts } from "@/lib/content";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("Blog");
  return { title: t("title"), description: t("description") };
};

/** /blog and /en/blog: the list of articles, newest first. */
const BlogPage = async ({ params }: PageProps<"/[locale]/blog">) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("Blog");
  const posts = getPosts(locale);

  return (
    <div className="mx-auto max-w-site px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">{t("title")}</h1>
      {posts.length === 0 ? (
        <p className="text-ink-muted">{t("empty")}</p>
      ) : (
        <PostGrid posts={posts} headingLevel="h2" />
      )}
    </div>
  );
};

export default BlogPage;
