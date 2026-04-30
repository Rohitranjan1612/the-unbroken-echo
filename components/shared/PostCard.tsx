import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group overflow-hidden border border-cream-dark bg-white shadow-[0_10px_32px_rgba(15,27,45,0.07)] transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,27,45,0.12)]">
      <div className="flex h-40 items-center justify-center bg-navy text-center">
        <span className="font-display text-3xl italic text-gold">
          {post.category}
        </span>
      </div>
      <div className="p-6">
        <div className="ui-text flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.12em] text-ghost">
          <span className="text-gold-dim">{post.category}</span>
          <span>{formatDate(post.date)}</span>
        </div>
        <h2 className="mt-3 font-display text-2xl leading-tight text-navy">
          <Link href={`/blog/${post.slug}`} className="hover:text-gold-dim">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-mid">{post.excerpt}</p>
        <div className="ui-text mt-5 flex items-center justify-between text-xs uppercase tracking-[0.1em] text-ghost">
          <span>{post.readingTime}</span>
          <Link href={`/blog/${post.slug}`} className="text-gold-dim">
            Read
          </Link>
        </div>
      </div>
    </article>
  );
}
