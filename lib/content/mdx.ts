// Reads MDX files from /content. Used only by the content layer (./index.ts).

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { slugSchema } from "./schemas";
import type { Locale } from "./types";

/** Thrown when a content file is invalid. Fails the build with the file path and the reason. */
export class ContentError extends Error {
  constructor(file: string, details: string) {
    super(`Invalid content in ${file}:\n${details}`);
    this.name = "ContentError";
  }
}

/** The slug folders in content/<section>, e.g. ["icsi", "pregnancy-tips"]. */
export function listSlugs(section: string): string[] {
  const dir = path.join(process.cwd(), "content", section);
  if (!fs.existsSync(dir)) return [];

  const slugs = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const slug of slugs) {
    const result = slugSchema.safeParse(slug);
    if (!result.success) {
      throw new ContentError(`content/${section}/${slug}`, `folder name ${result.error.issues[0].message}`);
    }
    // Arabic is the default language, so every item needs an Arabic file.
    if (!fs.existsSync(path.join(dir, slug, "ar.mdx"))) {
      throw new ContentError(`content/${section}/${slug}`, "ar.mdx is missing (Arabic is required)");
    }
  }

  return slugs;
}

/**
 * Reads content/<section>/<slug>/<locale>.mdx and validates its frontmatter.
 * Returns undefined if the file does not exist (e.g. no English version yet).
 */
export function readMdxFile<Schema extends z.ZodType>(
  section: string,
  slug: string,
  locale: Locale,
  schema: Schema,
): { data: z.output<Schema>; body: string } | undefined {
  const relativePath = `content/${section}/${slug}/${locale}.mdx`;
  const fullPath = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(fullPath)) return undefined;

  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ContentError(relativePath, z.prettifyError(result.error));
  }

  return { data: result.data, body: content.trim() };
}
