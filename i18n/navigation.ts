import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware wrappers around next/link and next/navigation.
// Always import Link, usePathname, etc. from here, not from "next/link".
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
