import { useLocale } from "next-intl";
import { CountUpNumber } from "@/components/home/CountUpNumber";
import { getSiteSettings, localize } from "@/lib/content";

/** The three numbers under the hero, counting up as they come into view. */
export const StatCounters = () => {
  const locale = useLocale();
  const counters = getSiteSettings().counters ?? [];

  if (counters.length === 0) return null;

  return (
    <section className="mx-auto max-w-site px-4 py-12 sm:py-16">
      <dl className="grid grid-cols-3 gap-4 sm:gap-8">
        {counters.map((counter) => (
          <div key={counter.label.ar} className="text-center">
            <dd className="bg-linear-to-l from-brand-strong to-accent-cyan-strong bg-clip-text text-4xl font-extrabold text-transparent ltr:bg-linear-to-r sm:text-5xl lg:text-6xl">
              <CountUpNumber value={counter.value} suffix={counter.suffix} />
            </dd>
            <dt className="mt-2 text-sm text-balance text-ink-muted sm:text-base">
              {localize(counter.label, locale)}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
};
