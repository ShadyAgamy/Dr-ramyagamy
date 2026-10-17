import { useLocale, useTranslations } from "next-intl";
import { JsonLd } from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/jsonld";

type Crumb = { label: string; href?: string };

/** "Home / Services / ICSI". The last item is the current page (no link). Also writes the BreadcrumbList data for Google. */
export const Breadcrumbs = ({ items }: { items: Crumb[] }) => {
  const t = useTranslations("Breadcrumbs");
  const locale = useLocale() as Locale;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items, locale)} />
      <nav aria-label={t("label")} className="text-sm text-ink-muted">
      <ol className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <li key={item.label} className="flex gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-strong">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
      </nav>
    </>
  );
};
