import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

const styles = {
  primary: "bg-brand-strong text-white shadow-soft hover:opacity-90",
  secondary: "border border-line bg-surface text-ink hover:bg-peach",
  whatsapp: "bg-whatsapp-strong text-white shadow-soft hover:opacity-90",
};

type ButtonLinkProps = {
  href: ComponentProps<typeof Link>["href"];
  variant?: keyof typeof styles;
  /** Opens an external URL (WhatsApp, maps, tel:) with a plain <a>. */
  external?: boolean;
  children: ReactNode;
};

/** A link styled as a button. Internal links use next-intl's Link (real <a href>). */
export const ButtonLink = ({ href, variant = "primary", external = false, children }: ButtonLinkProps) => {
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
