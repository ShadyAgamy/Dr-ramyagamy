import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Maps "/" to Arabic and "/en/..." to English.
export default createMiddleware(routing);

export const config = {
  // Skip Next internals and files with an extension (images, favicon, etc.).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
