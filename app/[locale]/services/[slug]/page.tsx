import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PostCard } from "@/components/blog/PostCard";
import { BookingCard } from "@/components/booking/BookingCard";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { MdxContent } from "@/components/mdx/MdxContent";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  getAvailableLocales,
  getPostsForService,
  getService,
  getServices,
  getSiteSettings,
  localize,
  localizeStrict,
} from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Pre-build one page per service and language it exists in. Returned all at
 * once (not per language): in Next 16 an empty list for one language
 * stops every page of this route from being built.
 */
export const generateStaticParams = () =>
  routing.locales.flatMap((locale) =>
    getServices(locale).map((service) => ({ locale, slug: service.slug })),
  );

export const dynamicParams = false;

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> => {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const service = getService(slug, locale);
  if (!service) return {};

  const title = localize(service.title, locale);
  const t = await getTranslations("Services");

  return buildPageMetadata({
    locale,
    path: `/services/${slug}`,
    locales: getAvailableLocales("service", slug),
    noindex: service.seo?.noindex,
    canonicalUrl: service.seo?.canonicalUrl,
    title: localizeStrict(service.seo?.metaTitle, locale) ?? title,
    description:
      localizeStrict(service.seo?.metaDescription, locale) ??
      localizeStrict(service.summary, locale) ??
      t("metaDescription", { title }),
    image: service.seo?.ogImage ?? service.image?.src,
  });
};

/** /services/<slug>: one service, its long description, and related articles. */
const ServicePage = async ({
  params,
}: PageProps<"/[locale]/services/[slug]">) => {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const service = getService(slug, locale);
  if (!service) notFound();

  const t = await getTranslations("Services");
  const tNav = await getTranslations("Nav");
  const tCta = await getTranslations("Cta");
  const tWhatsApp = await getTranslations("WhatsApp");
  const site = getSiteSettings();
  const title = localize(service.title, locale);
  // Up to 4 related articles, so the page stays short; the rest are on /blog.
  const relatedPosts = getPostsForService(slug, locale).slice(0, 4);
  const otherServices = getServices(locale)
    .filter((item) => item.slug !== slug)
    .slice(0, 5);

  return (
    <>
      <PageHeader
        top={
          <div className="flex flex-col items-start gap-6">
            <Breadcrumbs
              items={[
                { label: tNav("home"), href: "/" },
                { label: tNav("services"), href: "/services" },
                { label: title },
              ]}
            />
            {service.icon && (
              <ServiceIcon name={service.icon} className="size-16 bg-surface" />
            )}
          </div>
        }
        title={title}
        intro={service.summary && localize(service.summary, locale)}
      >
        <div className="mt-2 flex flex-wrap gap-3">
          <ButtonLink href="/book">{tCta("book")}</ButtonLink>
          <ButtonLink
            href={buildWhatsAppUrl(
              site.whatsappNumber,
              tWhatsApp("prefilledMessage"),
            )}
            variant="whatsapp"
            external
          >
            <WhatsAppIcon className="size-5" />
            {tCta("whatsapp")}
          </ButtonLink>
        </div>
      </PageHeader>

      <div className="mx-auto grid max-w-site items-start gap-10 px-4 py-14 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex flex-col gap-12">
          {service.image && (
            <Image
              src={service.image.src}
              alt={localize(service.image.alt, locale)}
              width={service.image.width}
              height={service.image.height}
              sizes="(min-width: 1024px) 800px, 100vw"
              priority
              className="w-full rounded-card object-cover"
            />
          )}
          {service.body && <MdxContent source={service.body} />}

          {relatedPosts.length > 0 && (
            <section>
              <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
                {t("relatedArticles")}
              </h2>
              <ul className="grid gap-5 sm:grid-cols-2">
                {relatedPosts.map((post) => (
                  <li key={post.slug}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
          <BookingCard />
          {otherServices.length > 0 && (
            <nav
              aria-labelledby="other-services"
              className="rounded-card border border-line bg-surface p-6"
            >
              <h2 id="other-services" className="mb-3 font-bold">
                {t("otherServices")}
              </h2>
              <ul className="flex flex-col gap-2">
                {otherServices.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/services/${item.slug}`}
                      className="text-brand-strong hover:underline"
                    >
                      {localize(item.title, locale)}
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
};

export default ServicePage;
