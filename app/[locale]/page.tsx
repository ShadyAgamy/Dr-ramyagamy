import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PostGrid } from "@/components/blog/PostCard";
import { BookingCta } from "@/components/booking/BookingCta";
import { ClinicCard } from "@/components/clinics/ClinicCard";
import { HeroBanner } from "@/components/home/HeroBanner";
import { StatCounters } from "@/components/home/StatCounters";
import { ServiceGrid } from "@/components/services/ServiceCard";
import { CheckIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing } from "@/i18n/routing";
import {
  getClinics,
  getPosts,
  getServices,
  getSiteSettings,
  getTestimonials,
  localize,
  localizeStrict,
} from "@/lib/content";
import { physicianJsonLd } from "@/lib/jsonld";

const HomePage = async ({ params }: PageProps<"/[locale]">) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("Home");
  const tTestimonials = await getTranslations("Testimonials");

  const site = getSiteSettings();
  const recommend = site.socialProof?.recommend;
  // Text sections use localizeStrict: hidden on English pages until translated.
  const credentials = localizeStrict(site.credentials, locale);
  const services = getServices(locale);
  const clinics = getClinics();
  const latestPosts = getPosts(locale).slice(0, 3);
  const testimonials = getTestimonials().filter((item) => item.quote[locale]);

  return (
    <>
      <JsonLd data={physicianJsonLd(locale)} />
      <HeroBanner />
      <StatCounters />

      {credentials && credentials.length > 0 && (
        <section className="bg-surface-dark text-white">
          <div className="mx-auto max-w-site px-4 py-8">
            <h2 className="sr-only">{t("credentialsTitle")}</h2>
            {/* Two rows. On wide screens the columns fit their text and each credential stays on one line. */}
            <ul className="grid gap-x-12 gap-y-4 lg:grid-cols-2 xl:grid-cols-[auto_auto] xl:justify-center">
              {/* The first credential repeats the specialty, so the strip shows the rest. */}
              {credentials.slice(1).map((credential) => (
                <li
                  key={credential}
                  className="flex gap-3 xl:whitespace-nowrap"
                >
                  <CheckIcon className="mt-1 size-5 shrink-0 text-brand" />
                  <span>{credential}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {services.length > 0 && (
        <Section
          title={t("servicesTitle")}
          action={
            <Link
              href="/services"
              className="font-medium text-brand-strong hover:underline"
            >
              {t("allServices")}
            </Link>
          }
        >
          <ServiceGrid services={services.slice(0, 6)} />
        </Section>
      )}

      <div className="mt-8 bg-peach">
        <Section title={t("clinicsTitle")}>
          <ul className="grid gap-6 sm:grid-cols-2">
            {clinics.map((clinic) => (
              <li key={clinic.slug}>
                <ClinicCard clinic={clinic} />
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {latestPosts.length > 0 && (
        <Section
          title={t("latestArticlesTitle")}
          action={
            <Link
              href="/blog"
              className="font-medium text-brand-strong hover:underline"
            >
              {t("allArticles")}
            </Link>
          }
        >
          <PostGrid posts={latestPosts} />
        </Section>
      )}

      {testimonials.length > 0 && (
        <Section
          title={t("testimonialsTitle")}
          action={
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {site.social.facebook && (
                <a
                  href={`${site.social.facebook}/reviews`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-strong hover:underline"
                >
                  {t("allReviews")}
                </a>
              )}
              {site.social.googleReview && (
                <a
                  href={site.social.googleReview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-strong hover:underline"
                >
                  {t("reviewOnGoogle")}
                </a>
              )}
            </div>
          }
        >
          {/* The Facebook rating, next to the reviews it comes from. */}
          {recommend && (
            <p className="-mt-4 mb-6 font-semibold text-brand-strong">
              {localize(recommend.value, locale)}{" "}
              {localize(recommend.label, locale)}
            </p>
          )}
          {/* Horizontal scroll-snap on phones: swipeable like a story feed, the next
              card peeks by ~15% as a hint, no JS and no library. A grid from md up,
              where 4 cards fit side by side anyway. tabIndex lets keyboard users
              focus the list and scroll it with the arrow keys. */}
          <ul
            tabIndex={0}
            aria-label={t("reviewsListLabel")}
            className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4 rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-strong"
          >
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <li
                key={index}
                className="basis-[85%] shrink-0 snap-start md:basis-auto"
              >
                <figure className="relative h-full overflow-hidden rounded-card bg-surface p-7 shadow-soft">
                  {/* Big, soft quote mark as a background shape: fills the empty
                      space left by shorter quotes instead of stretching the layout. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-6 end-4 font-serif text-[7rem] leading-none text-brand-soft"
                  >
                    ”
                  </span>
                  <blockquote className="relative text-lg leading-loose">
                    {localizeStrict(testimonial.quote, locale)}
                  </blockquote>
                  <figcaption className="relative mt-3 text-sm text-ink-muted">
                    {[
                      testimonial.name,
                      tTestimonials(testimonial.source),
                      locale === "en" && tTestimonials("translated"),
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <BookingCta />
    </>
  );
};

export default HomePage;
