import { useFormatter } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Post } from "@/lib/content";

/** A card linking to one article. Used on /blog, the home page and service pages. */
type PostCardProps = {
  post: Post;
  /** "h2" on list pages (right under the page's h1), "h3" inside a section. */
  headingLevel?: "h2" | "h3";
};

export const PostCard = ({ post, headingLevel: Heading = "h3" }: PostCardProps) => {
  const format = useFormatter();

  return (
    // The title link stretches over the whole card (after:absolute after:inset-0),
    // so the card is clickable while staying one link for screen readers.
    <article className="group relative flex h-full flex-col gap-3 rounded-card bg-surface p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
      <time dateTime={post.publishedAt} className="text-sm text-ink-muted">
        {format.dateTime(new Date(post.publishedAt), { dateStyle: "long" })}
      </time>
      <Heading className="text-xl font-bold">
        <Link
          href={`/blog/${post.slug}`}
          className="after:absolute after:inset-0 after:rounded-card group-hover:text-brand-strong"
        >
          {post.title}
        </Link>
      </Heading>
      <p className="text-ink-muted">{post.excerpt}</p>
    </article>
  );
};

/** A responsive grid of post cards. */
export const PostGrid = ({ posts, headingLevel }: { posts: Post[]; headingLevel?: "h2" | "h3" }) => (
  <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {posts.map((post) => (
      <li key={post.slug}>
        <PostCard post={post} headingLevel={headingLevel} />
      </li>
    ))}
  </ul>
);
