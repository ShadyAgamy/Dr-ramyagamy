// Main navigation. `key` is the label in the "Nav" messages.
export const navItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/blog", key: "blog" },
] as const;

export type NavItem = (typeof navItems)[number];

/** The nav without links to empty sections: "Articles" shows once a post exists. */
export const visibleNavItems = (hasPosts: boolean): NavItem[] =>
  navItems.filter((item) => item.href !== "/blog" || hasPosts);

export const bookHref = "/book";
