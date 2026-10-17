import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PostGrid } from "@/components/blog/PostCard";
import { BookingCta } from "@/components/booking/BookingCta";
import { ClinicCard } from "@/components/clinics/ClinicCard";
import { ServiceGrid } from "@/components/services/ServiceCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CheckIcon, WhatsAppIcon } from "@/components/ui/icons";
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
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { physicianJsonLd } from "@/lib/jsonld";

// Every section below hides itself when its data is empty.
const HomePage = async ({ params }: PageProps<"/[locale]">) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("Home");
  const tCta = await getTranslations("Cta");
  const tWhatsApp = await getTranslations("WhatsApp");
  const tTestimonials = await getTranslations("Testimonials");

  const site = getSiteSettings();
  // Text sections use localizeStrict: hidden on English pages until translated.
  const credentials = localizeStrict(site.credentials, locale);
  const stats = site.stats ?? [];
  const services = getServices(locale);
  const clinics = getClinics();
  const latestPosts = getPosts(locale).slice(0, 3);
  const testimonials = getTestimonials().filter((item) => item.quote[locale]);

  return (
    <>
      <JsonLd data={physicianJsonLd(locale)} />
      {/* Hero: text beside the cut-out photo, on a peach-to-cream background. */}
      <section className="overflow-hidden bg-linear-to-b from-peach to-cream">
        <div className="mx-auto grid max-w-site items-end gap-10 px-4 pt-12 md:grid-cols-[1.1fr_0.9fr] md:pt-16">
          <div className="flex flex-col gap-5 md:pb-20">
            <p className="self-start rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-brand-strong">
              {localize(site.specialty, locale)}
            </p>
            <h1 className="text-4xl leading-tight font-bold sm:text-5xl">
              {localize(site.doctorName, locale)}
              <span className="mt-2 block text-balance text-brand-strong">{t("heroTagline")}</span>
            </h1>
            <p className="max-w-xl text-lg text-ink-muted">{t("heroText")}</p>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/book">{tCta("book")}</ButtonLink>
              <ButtonLink
                href={buildWhatsAppUrl(site.whatsappNumber, tWhatsApp("prefilledMessage"))}
                variant="whatsapp"
                external
              >
                <WhatsAppIcon className="size-5" />
                {tCta("whatsapp")}
              </ButtonLink>
            </div>

            {stats.length > 0 && (
              <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6">
                {stats.map((stat) => (
                  <div key={stat.value.ar} className="flex flex-col-reverse">
                    <dt className="text-sm text-ink-muted">{localize(stat.label, locale)}</dt>
                    <dd className="text-3xl font-bold text-brand-strong">{localize(stat.value, locale)}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {site.heroImage && (
            <div className="relative mx-auto w-full max-w-sm">
              {/* Soft arch behind the photo. */}
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 aspect-square rounded-t-full bg-brand-soft" />
              <Image
                src={site.heroImage.src}
                alt={localize(site.heroImage.alt, locale)}
                width={site.heroImage.width}
                height={site.heroImage.height}
                sizes="(min-width: 768px) 384px, 90vw"
                priority
                className="relative w-full"
              />
            </div>
          )}
        </div>
      </section>

      {credentials && credentials.length > 0 && (
        <section className="bg-ink text-white">
          <div className="mx-auto max-w-site px-4 py-8">
            <h2 className="sr-only">{t("credentialsTitle")}</h2>
            {/* Two rows. On wide screens the columns fit their text and each credential stays on one line. */}
            <ul className="grid gap-x-12 gap-y-4 lg:grid-cols-2 xl:grid-cols-[auto_auto] xl:justify-center">
              {/* The first credential repeats the specialty, so the strip shows the rest. */}
              {credentials.slice(1).map((credential) => (
                <li key={credential} className="flex gap-3 xl:whitespace-nowrap">
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
            site.social.facebook && (
              <a
                href={`${site.social.facebook}/reviews`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-strong hover:underline"
              >
                {t("allReviews")}
              </a>
            )
          }
        >
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              // Phones show the first 3 only, so the page does not get too long.
              <li key={index} className={index >= 3 ? "hidden md:block" : undefined}>
                <figure className="flex h-full flex-col gap-4 rounded-card bg-surface p-7 shadow-soft">
                  <span aria-hidden="true" className="font-serif text-5xl leading-none text-brand">
                    ”
                  </span>
                  <blockquote className="flex-1 text-lg leading-loose">
                    {localizeStrict(testimonial.quote, locale)}
                  </blockquote>
                  <figcaption className="text-sm text-ink-muted">
                    {[testimonial.name, tTestimonials(testimonial.source), locale === "en" && tTestimonials("translated")]
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
