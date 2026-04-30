import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Poem } from "@/lib/types";

export default function PoemCard({ poem }: { poem: Poem }) {
  return (
    <article className="border border-cream-dark bg-white p-7 shadow-[0_10px_32px_rgba(15,27,45,0.06)]">
      <span className="tag">{poem.theme}</span>
      <h2 className="mt-5 font-display text-3xl leading-tight text-navy">
        <Link href={`/poetry/${poem.slug}`} className="hover:text-gold-dim">
          {poem.title}
        </Link>
      </h2>
      <p className="mt-4 whitespace-pre-line text-ink-mid">{poem.excerpt}</p>
      <div className="ui-text mt-7 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-ghost">
        <span>{formatDate(poem.date)}</span>
        <Link href={`/poetry/${poem.slug}`} className="text-gold-dim">
          Read
        </Link>
      </div>
    </article>
  );
}
