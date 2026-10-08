import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PostGrid } from "@/components/blog/PostCard";
import { BookingCta } from "@/components/booking/BookingCta";
import { ClinicCard } from "@/components/clinics/ClinicCard";
import { ServiceGrid } from "@/components/services/ServiceCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
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
  const services = getServices(locale);
  const clinics = getClinics();
  const latestPosts = getPosts(locale).slice(0, 3);
  const testimonials = getTestimonials().filter((item) => item.quote[locale]);

  return (
    <>
      {/* Hero */}
      <section className="bg-peach">
        <div className="mx-auto grid max-w-site items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl font-bold sm:text-5xl">{localize(site.doctorName, locale)}</h1>
            <p className="text-xl text-brand-strong">{localize(site.specialty, locale)}</p>

            {credentials && credentials.length > 0 && (
              <div>
                <h2 className="sr-only">{t("credentialsTitle")}</h2>
                <ul className="space-y-2">
                  {credentials.map((credential) => (
                    <li key={credential} className="flex gap-2">
                      <span aria-hidden="true" className="text-brand">✓</span>
                      <span>{credential}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
          </div>

          {site.doctorPhoto && (
            <Image
              src={site.doctorPhoto.src}
              alt={localize(site.doctorPhoto.alt, locale)}
              width={site.doctorPhoto.width}
              height={site.doctorPhoto.height}
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="w-full rounded-card object-cover shadow-soft"
            />
          )}
        </div>
      </section>

      {services.length > 0 && (
        <Section
          title={t("servicesTitle")}
          action={<Link href="/services" className="font-medium text-brand-strong hover:underline">{t("allServices")}</Link>}
        >
          <ServiceGrid services={services} />
        </Section>
      )}

      <Section title={t("clinicsTitle")}>
        <ul className="grid gap-6 sm:grid-cols-2">
          {clinics.map((clinic) => (
            <li key={clinic.slug}>
              <ClinicCard clinic={clinic} />
            </li>
          ))}
        </ul>
      </Section>

      {latestPosts.length > 0 && (
        <Section
          title={t("latestArticlesTitle")}
          action={<Link href="/blog" className="font-medium text-brand-strong hover:underline">{t("allArticles")}</Link>}
        >
          <PostGrid posts={latestPosts} />
        </Section>
      )}

      {testimonials.length > 0 && (
        <Section title={t("testimonialsTitle")}>
          <ul className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <li key={index}>
                <figure className="h-full rounded-card bg-surface p-6 shadow-soft">
                  <blockquote className="leading-loose">“{localizeStrict(testimonial.quote, locale)}”</blockquote>
                  <figcaption className="mt-4 text-sm text-ink-muted">
                    {[testimonial.name, tTestimonials(testimonial.source)].filter(Boolean).join(" · ")}
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
