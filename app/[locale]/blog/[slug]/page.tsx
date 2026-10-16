import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getFormatter, getTranslations } from "next-intl/server";
import { MdxContent } from "@/components/mdx/MdxContent";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getPost, getPosts } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

/**
 * Which articles to pre-build: every (language, slug) pair that has a file,
 * e.g. { locale: "ar", slug: "amh-test" }. Returned all at once on purpose:
 * in Next 16, if the per-language version returns [] for one language
 * (no English posts yet), no article is built at all.
 */
export const generateStaticParams = () =>
  routing.locales.flatMap((locale) => getPosts(locale).map((post) => ({ locale, slug: post.slug })));

// Any slug not returned above is a 404 (e.g. /en/blog/<arabic-only-post>).
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const post = getPost(slug, locale);
  if (!post) return {};

  return buildPageMetadata({
    locale,
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    image: post.cover?.src,
    article: { publishedTime: post.publishedAt },
  });
}

/** /blog/<slug> and /en/blog/<slug>: one article. */
export default async function PostPage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const post = getPost(slug, locale);
  if (!post) notFound();

  const t = await getTranslations("Blog");
  const format = await getFormatter();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/blog" className="text-sm font-medium text-brand-strong hover:underline">
        {t("allArticles")}
      </Link>

      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{post.title}</h1>
      <time dateTime={post.publishedAt} className="mt-3 block text-ink-muted">
        {format.dateTime(new Date(post.publishedAt), { dateStyle: "long" })}
      </time>

      {/* Link out to the reel. Never embed the video player (too heavy). */}
      {post.videoUrl && (
        <a
          href={post.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-button bg-brand-strong px-5 py-2 font-medium text-white hover:opacity-90"
        >
          {t("watchVideo")}
        </a>
      )}

      <div className="mt-8">
        <MdxContent source={post.body} />
      </div>
    </article>
  );
}
