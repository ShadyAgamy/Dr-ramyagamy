import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PostGrid } from "@/components/blog/PostCard";
import { BookingCta } from "@/components/booking/BookingCta";
import { MdxContent } from "@/components/mdx/MdxContent";
import { Section } from "@/components/ui/Section";
import { routing } from "@/i18n/routing";
import { getPostsForService, getService, getServices, localize, localizeStrict } from "@/lib/content";

/** Pre-build one page per service that exists in this language. */
export const generateStaticParams = ({ params }: { params: { locale: string } }) => {
  if (!hasLocale(routing.locales, params.locale)) return [];
  return getServices(params.locale).map((service) => ({ slug: service.slug }));
};

export const dynamicParams = false;

export const generateMetadata = async ({ params }: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> => {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const service = getService(slug, locale);
  if (!service) return {};

  return {
    title: localizeStrict(service.seo?.metaTitle, locale) ?? localize(service.title, locale),
    description: localizeStrict(service.seo?.metaDescription, locale) ?? localize(service.summary, locale),
  };
};

/** /services/<slug>: one service, its long description, and related articles. */
const ServicePage = async ({ params }: PageProps<"/[locale]/services/[slug]">) => {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const service = getService(slug, locale);
  if (!service) notFound();

  const t = await getTranslations("Services");
  const relatedPosts = getPostsForService(slug, locale);

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold sm:text-4xl">{localize(service.title, locale)}</h1>
        <p className="mt-4 text-lg text-ink-muted">{localize(service.summary, locale)}</p>
        {service.image && (
          <Image
            src={service.image.src}
            alt={localize(service.image.alt, locale)}
            width={service.image.width}
            height={service.image.height}
            sizes="(min-width: 768px) 768px, 100vw"
            priority
            className="mt-8 w-full rounded-card object-cover"
          />
        )}
        {service.body && (
          <div className="mt-8">
            <MdxContent source={service.body} />
          </div>
        )}
      </article>

      {relatedPosts.length > 0 && (
        <Section title={t("relatedArticles")}>
          <PostGrid posts={relatedPosts} />
        </Section>
      )}

      <BookingCta />
    </>
  );
};

export default ServicePage;
