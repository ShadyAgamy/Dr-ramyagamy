import type { Redirect } from "@/lib/content/types";

// Old URL -> new URL, read by next.config.ts. Write paths without the language
// prefix; the /en version is added automatically. permanent: true = 308 (tells
// Google the page moved for good). Example:
//   { from: "/services/ivf", to: "/services/icsi-ivf", permanent: true },
export const redirects: Redirect[] = [];
