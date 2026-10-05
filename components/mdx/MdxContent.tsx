import type { ComponentProps } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

// How each Markdown element is rendered. MDX turns "## Title" into <h2>,
// "- item" into <li>, etc.; these components add our styles.
const components = {
  // The page already has its <h1> (the post title), so a "# Heading"
  // inside the article becomes an <h2> to keep one <h1> per page.
  h1: (props: ComponentProps<"h2">) => <h2 className="mt-10 mb-4 text-2xl font-bold" {...props} />,
  h2: (props: ComponentProps<"h2">) => <h2 className="mt-10 mb-4 text-2xl font-bold" {...props} />,
  h3: (props: ComponentProps<"h3">) => <h3 className="mt-8 mb-3 text-xl font-bold" {...props} />,
  p: (props: ComponentProps<"p">) => <p className="my-4 leading-loose" {...props} />,
  ul: (props: ComponentProps<"ul">) => <ul className="my-4 list-disc space-y-2 ps-6" {...props} />,
  ol: (props: ComponentProps<"ol">) => <ol className="my-4 list-decimal space-y-2 ps-6" {...props} />,
  strong: (props: ComponentProps<"strong">) => <strong className="font-bold" {...props} />,
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote className="my-6 border-s-4 border-brand ps-4 text-ink-muted" {...props} />
  ),
  a: ({ href = "", ...props }: ComponentProps<"a">) => {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className="font-medium text-brand-strong underline underline-offset-4"
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      />
    );
  },
};

/** Renders an MDX string (an article or service body) as HTML, on the server. */
export function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
