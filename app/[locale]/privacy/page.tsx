import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getFormatter, getTranslations } from "next-intl/server";
import { MdxContent } from "@/components/mdx/MdxContent";
import { routing } from "@/i18n/routing";
import { getPage } from "@/lib/content";

export const generateMetadata = async ({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const page = getPage("privacy", locale);
  if (!page) return {};
  return { title: page.title, description: page.metaDescription };
};

/** /privacy: content/pages/privacy/<locale>.mdx. 404 if that language has no file. */
const PrivacyPage = async ({ params }: PageProps<"/[locale]/privacy">) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const page = getPage("privacy", locale);
  if (!page) notFound();

  const t = await getTranslations("Privacy");
  const format = await getFormatter();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">{page.title}</h1>
      {page.updatedAt && (
        <p className="mt-3 text-ink-muted">
          {t.rich("updatedAt", {
            date: () => (
              <time dateTime={page.updatedAt}>
                {format.dateTime(new Date(page.updatedAt!), { dateStyle: "long" })}
              </time>
            ),
          })}
        </p>
      )}
      <div className="mt-8">
        <MdxContent source={page.body} />
      </div>
    </article>
  );
};

export default PrivacyPage;
