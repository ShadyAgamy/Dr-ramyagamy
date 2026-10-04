"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { isActive } from "./MainNav";
import { bookHref, navItems } from "./nav-items";

/** Menu button and dropdown for small screens. The links are real <a> tags. */
export function MobileMenu() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? t("closeMenu") : t("openMenu")}
        onClick={() => setOpen((value) => !value)}
        className="grid size-11 place-items-center rounded-button text-ink hover:bg-peach"
      >
        {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
      </button>

      <nav
        id="mobile-menu"
        aria-label={t("label")}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-surface shadow-soft"
      >
        {/* Clicking any link closes the menu. */}
        <ul className="mx-auto flex max-w-site flex-col gap-1 px-4 py-4" onClick={() => setOpen(false)}>
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-card px-4 py-3 font-medium hover:bg-peach ${
                    active ? "bg-peach text-brand-strong" : "text-ink"
                  }`}
                >
                  {t(item.key)}
                </Link>
              </li>
            );
          })}
          <li className="pt-2">
            <Link
              href={bookHref}
              className="block rounded-button bg-brand-strong px-4 py-3 text-center font-medium text-white hover:opacity-90"
            >
              {t("book")}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
