import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { getSiteSettings, localize } from "@/lib/content";

// Placeholder home page. The real home page is built in Phase 3.
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return null;
  const site = getSiteSettings();

  return (
    <section className="mx-auto flex max-w-site flex-col items-center gap-3 px-4 py-24 text-center">
      <h1 className="text-3xl font-bold sm:text-4xl">{localize(site.doctorName, locale)}</h1>
      <p className="text-lg text-ink-muted">{localize(site.specialty, locale)}</p>
    </section>
  );
}
