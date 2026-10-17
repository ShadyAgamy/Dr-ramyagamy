import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getFormatter, getTranslations } from "next-intl/server";
import { BookingCard } from "@/components/booking/BookingCard";
import { MdxContent } from "@/components/mdx/MdxContent";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getPost, getPosts, getService, getSiteSettings, localize } from "@/lib/content";
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
  const tNav = await getTranslations("Nav");
  const format = await getFormatter();
  const site = getSiteSettings();
  const mainService = post.relatedServices[0] ? getService(post.relatedServices[0], locale) : undefined;
  const moreArticles = getPosts(locale).filter((item) => item.slug !== slug).slice(0, 4);

  return (
    <>
      <PageHeader
        top={
          <div className="flex flex-col items-start gap-4">
            <Breadcrumbs
              items={[
                { label: tNav("home"), href: "/" },
                { label: tNav("blog"), href: "/blog" },
              ]}
            />
            {mainService && (
              <Link
                href={`/services/${mainService.slug}`}
                className="rounded-full bg-surface px-3.5 py-1 text-sm font-medium text-brand-strong hover:underline"
              >
                {localize(mainService.title, locale)}
              </Link>
            )}
          </div>
        }
        title={post.title}
        intro={post.excerpt}
      >
        <div className="mt-2 flex items-center gap-3">
          {site.doctorPhoto && (
            <Image
              src={site.doctorPhoto.src}
              alt=""
              width={52}
              height={52}
              className="size-13 rounded-full bg-brand-soft object-cover object-top"
            />
          )}
          <div className="leading-snug">
            <p className="font-bold">{localize(site.doctorName, locale)}</p>
            <time dateTime={post.publishedAt} className="text-sm text-ink-muted">
              {format.dateTime(new Date(post.publishedAt), { dateStyle: "long" })}
            </time>
          </div>
        </div>
      </PageHeader>

      <div className="mx-auto grid max-w-site items-start gap-10 px-4 py-14 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <article className="max-w-3xl text-lg">
          {/* Link out to the reel. Never embed the video player (too heavy). */}
          {post.videoUrl && (
            <a
              href={post.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 inline-block rounded-button bg-brand-strong px-5 py-2 font-medium text-white hover:opacity-90"
            >
              {t("watchVideo")}
            </a>
          )}
          <MdxContent source={post.body} />
        </article>

        <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
          <BookingCard />
          {moreArticles.length > 0 && (
            <nav aria-labelledby="more-articles" className="rounded-card border border-line bg-surface p-6">
              <h2 id="more-articles" className="mb-3 font-bold">
                {t("moreArticles")}
              </h2>
              <ul className="flex flex-col gap-3">
                {moreArticles.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/blog/${item.slug}`} className="text-brand-strong hover:underline">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </div>
    </>
  );
}
