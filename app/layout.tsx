import type { Metadata } from "next";
import "./globals.css";

// Temporary Phase 0 metadata. Real SEO metadata comes in Phase 4.
export const metadata: Metadata = {
  title: "د. رامي عجمي",
  description: "استشاري النساء والتوليد والحقن المجهري",
  // Keep the placeholder site out of search results until real content exists.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
