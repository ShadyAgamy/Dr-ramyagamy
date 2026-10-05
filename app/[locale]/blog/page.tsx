import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getFormatter, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getPosts } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Blog");
  return { title: t("title"), description: t("description") };
}

/** /blog and /en/blog: the list of articles, newest first. */
export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("Blog");
  const format = await getFormatter();
  const posts = getPosts(locale);

  return (
    <div className="mx-auto max-w-site px-4 py-12">
      <h1 className="text-3xl font-bold">{t("title")}</h1>

      {posts.length === 0 ? (
        <p className="mt-6 text-ink-muted">{t("empty")}</p>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="flex h-full flex-col gap-3 rounded-card bg-surface p-6 shadow-soft">
                <time dateTime={post.publishedAt} className="text-sm text-ink-muted">
                  {format.dateTime(new Date(post.publishedAt), { dateStyle: "long" })}
                </time>
                <h2 className="text-xl font-bold">
                  <Link href={`/blog/${post.slug}`} className="hover:text-brand-strong">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-ink-muted">{post.excerpt}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
