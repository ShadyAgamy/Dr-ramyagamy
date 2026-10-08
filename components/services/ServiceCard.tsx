import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { localize, type Service } from "@/lib/content";

/** A card linking to one service page. */
type ServiceCardProps = {
  service: Service;
  /** "h2" on list pages (right under the page's h1), "h3" inside a section. */
  headingLevel?: "h2" | "h3";
};

export const ServiceCard = ({ service, headingLevel: Heading = "h3" }: ServiceCardProps) => {
  const locale = useLocale();

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-soft">
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
      <div className="flex flex-1 flex-col gap-3 p-6">
        <Heading className="text-xl font-bold">
          <Link href={`/services/${service.slug}`} className="hover:text-brand-strong">
            {localize(service.title, locale)}
          </Link>
        </Heading>
        <p className="text-ink-muted">{localize(service.summary, locale)}</p>
      </div>
    </article>
  );
};

/** A responsive grid of service cards. */
export const ServiceGrid = ({ services, headingLevel }: { services: Service[]; headingLevel?: "h2" | "h3" }) => (
  <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {services.map((service) => (
      <li key={service.slug}>
        <ServiceCard service={service} headingLevel={headingLevel} />
      </li>
    ))}
  </ul>
);
