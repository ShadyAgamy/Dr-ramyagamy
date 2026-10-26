import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/icons";
import { getSiteSettings, localize } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * The home page hero: the studio banner runs the full width of the screen and
 * the text sits on top of it. He stands in the middle of that photo, so the text
 * takes the start side (the empty window wall) and a soft cream scrim keeps it
 * readable: from the bottom on phones, from the side on wider screens.
 */
export const HeroBanner = () => {
  const t = useTranslations("Home");
  const tCta = useTranslations("Cta");
  const tWhatsApp = useTranslations("WhatsApp");
  const locale = useLocale();

  const site = getSiteSettings();
  const followers = site.socialProof?.followers;
  const banner = site.bannerImage;

  return (
    /*
     * Height: narrow screens are taller than the banner's 1200x630, so the photo
     * only loses its sides. From lg the height follows the banner's own ratio
     * (52.5vw), so nothing is cut; past the max height it anchors to the top,
     * because his head sits close to the top edge of the photo and a centred
     * crop takes it off.
     */
    <section className="relative flex min-h-[34rem] items-end overflow-hidden bg-cream sm:min-h-[36rem] md:min-h-[40rem] lg:h-[52.5vw] lg:max-h-[56rem] lg:min-h-[40rem] lg:items-center">
      {banner && (
        <Image
          src={banner.src}
          alt={localize(banner.alt, locale)}
          fill
          sizes="100vw"
          preload
          fetchPriority="high"
          className="object-cover object-center lg:object-top"
        />
      )}

      {/* Phones and tablets: the photo fades into cream from the bottom, under
            the text. Side by side only works once the screen is wide enough that
            the text does not land on him, so that starts at lg. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-cream from-30% via-cream/90 via-65% to-transparent lg:hidden"
      />
      {/* Wide screens: the fade comes from the text side instead, so he stays clear. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 start-0 hidden w-[62%] bg-linear-to-l from-cream from-5% via-cream/70 via-50% to-transparent ltr:bg-linear-to-r lg:block"
      />
      {/* A last soft edge so the photo meets the cream page instead of cutting off. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-cream to-transparent"
      />

      <div className="relative mx-auto w-full max-w-site px-4 pb-10 lg:py-16">
        <div className="flex max-w-xl flex-col items-start gap-4">
          {followers && (
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-semibold text-ink shadow-soft">
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full bg-brand"
              />
              {localize(followers.value, locale)}{" "}
              {localize(followers.label, locale)}
            </p>
          )}

          <h1 className="text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            {/* Orange only, like the counters: orange into cyan mixes into olive
                in the middle. Vertical, so it reads the same in Arabic and English. */}
            <span className="bg-linear-to-b from-brand-vivid to-brand-strong bg-clip-text text-transparent">
              {localize(site.doctorName, locale)}
            </span>
            <span className="mt-2 block text-balance text-ink">
              {t("heroTagline")}
            </span>
          </h1>

          {/* Solid ink, not the muted grey: this text sits over the photo, and the
              muted grey only holds up against a solid background. */}
          <p className="font-semibold text-ink">
            {localize(site.specialty, locale)}
          </p>
          {/* Narrow screens keep the hero short: the clinics have their own section
              below. The width keeps this line inside the strong part of the fade,
              instead of running on over his jacket. */}
          <p className="hidden max-w-md text-lg text-ink lg:block">
            {t("heroText")}
          </p>

          <div className="mt-1 flex flex-wrap gap-3">
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
        </div>
      </div>
    </section>
  );
};
