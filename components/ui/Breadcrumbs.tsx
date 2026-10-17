import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Crumb = { label: string; href?: string };

/** "Home / Services / ICSI". The last item is the current page (no link). */
export const Breadcrumbs = ({ items }: { items: Crumb[] }) => {
  const t = useTranslations("Breadcrumbs");

  return (
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
  );
};
