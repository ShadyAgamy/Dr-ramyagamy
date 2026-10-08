import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";

// Shared by the locale layout and the global 404 page (which skips the layout).
export const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const latinFont = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});
