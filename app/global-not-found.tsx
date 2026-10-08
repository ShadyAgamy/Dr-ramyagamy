import type { Metadata } from "next";
import Link from "next/link";
import ar from "@/messages/ar.json";
import en from "@/messages/en.json";
import { arabicFont, latinFont } from "./fonts";
import "./globals.css";

// Shown for every URL that matches no page. It skips the normal layout
// (no header or footer) and does not know the visitor's language,
// so it shows both languages. Next sends it with a 404 status and noindex.

export const metadata: Metadata = {
  title: `${ar.NotFound.title} | ${en.NotFound.title}`,
};

const linkClass = "rounded-button px-5 py-3 font-medium";
const primary = `${linkClass} bg-brand-strong text-white shadow-soft hover:opacity-90`;
const secondary = `${linkClass} border border-line bg-surface text-ink hover:bg-peach`;

const GlobalNotFound = () => (
  <html lang="ar" dir="rtl" className={`${arabicFont.variable} ${latinFont.variable}`}>
    <body className="flex min-h-dvh flex-col items-center justify-center gap-12 px-4 py-16 text-center font-sans antialiased">
      <p className="text-6xl font-bold text-brand">404</p>

      <section className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">{ar.NotFound.title}</h1>
        <p className="text-ink-muted">{ar.NotFound.text}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className={primary}>{ar.NotFound.home}</Link>
          <Link href="/book" className={secondary}>{ar.NotFound.book}</Link>
        </div>
      </section>

      <section lang="en" dir="ltr" className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold">{en.NotFound.title}</h2>
        <p className="text-ink-muted">{en.NotFound.text}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/en" className={primary}>{en.NotFound.home}</Link>
          <Link href="/en/book" className={secondary}>{en.NotFound.book}</Link>
        </div>
      </section>
    </body>
  </html>
);

export default GlobalNotFound;
