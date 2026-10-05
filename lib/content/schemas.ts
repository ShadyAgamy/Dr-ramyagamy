// Rules for MDX frontmatter. The build fails with a clear message
// when a file breaks them (see readMdxFile in ./mdx.ts).

import { z } from "zod";

/** Optional text. An empty string ("") counts as missing. */
const optionalText = z
  .string()
  .trim()
  .optional()
  .transform((value) => value || undefined);

const requiredText = z.string({ error: "is required" }).trim().min(1, "is required");

/**
 * A "YYYY-MM-DD" date. YAML turns unquoted dates (publishedAt: 2026-10-05)
 * into Date objects, so convert those back to text first.
 */
const dateText = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.iso.date("must be a date like 2026-10-05"),
);

/** Lowercase Latin words joined by dashes, e.g. "icsi" or "pregnancy-tips". */
export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "must be lowercase Latin letters, numbers and dashes");

export const postFrontmatterSchema = z
  .object({
    title: requiredText,
    excerpt: requiredText,
    publishedAt: dateText,
    coverImage: optionalText,
    coverAlt: optionalText,
    videoUrl: optionalText.pipe(z.url("must be a full URL").optional()),
    relatedServices: z.array(slugSchema).default([]),
    metaTitle: optionalText,
    metaDescription: optionalText,
    noindex: z.boolean().default(false),
  })
  .refine((post) => !post.coverImage || post.coverAlt, {
    message: "is required when coverImage is set",
    path: ["coverAlt"],
  });

export const pageFrontmatterSchema = z.object({
  title: requiredText,
  updatedAt: dateText.optional(),
  metaDescription: optionalText,
  noindex: z.boolean().default(false),
});

/** Service bodies need no frontmatter: title and summary live in content/services.ts. */
export const serviceBodyFrontmatterSchema = z.object({});
