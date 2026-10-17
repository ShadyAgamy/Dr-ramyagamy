import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowIcon } from "@/components/ui/icons";
import { ServiceIcon } from "./ServiceIcon";
import { Link } from "@/i18n/navigation";
import { localize, type Service } from "@/lib/content";

type ServiceCardProps = {
  service: Service;
  /** "h2" on list pages (right under the page's h1), "h3" inside a section. */
  headingLevel?: "h2" | "h3";
};

/** A card linking to one service page. The whole card is clickable (see PostCard). */
export const ServiceCard = ({ service, headingLevel: Heading = "h3" }: ServiceCardProps) => {
  const t = useTranslations("Services");
  const locale = useLocale();

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
      {service.image && (
        <Image
          src={service.image.src}
          alt={localize(service.image.alt, locale)}
          width={service.image.width}
          height={service.image.height}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-video w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col gap-3 p-7">
        {service.icon && <ServiceIcon name={service.icon} />}
        <Heading className="text-xl font-bold">
          <Link
            href={`/services/${service.slug}`}
            className="after:absolute after:inset-0 after:rounded-card group-hover:text-brand-strong"
          >
            {localize(service.title, locale)}
          </Link>
        </Heading>
        {service.summary && <p className="text-ink-muted">{localize(service.summary, locale)}</p>}
        <span className="mt-auto flex items-center gap-2 pt-2 font-medium text-brand-strong" aria-hidden="true">
          {t("learnMore")}
          <ArrowIcon className="size-4" />
        </span>
      </div>
    </article>
  );
};

/** A responsive grid of service cards. */
export const ServiceGrid = ({ services, headingLevel }: { services: Service[]; headingLevel?: "h2" | "h3" }) => (
  <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {services.map((service) => (
      <li key={service.slug}>
        <ServiceCard service={service} headingLevel={headingLevel} />
      </li>
    ))}
  </ul>
);
