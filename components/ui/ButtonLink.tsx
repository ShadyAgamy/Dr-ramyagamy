import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

const styles = {
  // The brand orange is light, so the primary button carries dark text on it
  // rather than white: that is both the logo's orange and the stronger contrast.
  primary: "bg-brand text-ink shadow-soft hover:opacity-90",
  secondary: "border border-line bg-surface text-ink hover:bg-peach",
  whatsapp: "bg-whatsapp-strong text-white shadow-soft hover:opacity-90",
  // For dark or orange backgrounds.
  light: "bg-white text-brand-strong hover:bg-peach",
  outlineLight: "border border-white/70 text-white hover:bg-white/10",
  // For the bright brand orange, which carries dark text rather than white.
  outlineDark: "border border-ink/35 text-ink hover:bg-ink/5",
};

type ButtonLinkProps = {
  href: ComponentProps<typeof Link>["href"];
  variant?: keyof typeof styles;
  /** Opens an external URL (WhatsApp, maps, tel:) with a plain <a>. */
  external?: boolean;
  children: ReactNode;
};

/** A link styled as a button. Internal links use next-intl's Link (real <a href>). */
export const ButtonLink = ({
  href,
  variant = "primary",
  external = false,
  children,
}: ButtonLinkProps) => {
  const className = `inline-flex items-center justify-center gap-2 rounded-button px-5 py-3 font-medium transition ${styles[variant]}`;

  if (external) {
    const isWeb = String(href).startsWith("http");
    return (
      <a
        href={String(href)}
        className={className}
        {...(isWeb && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};
