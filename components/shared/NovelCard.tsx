import type { Novel } from "@/lib/types";

export default function NovelCard({ novel }: { novel: Novel }) {
  return (
    <article className="border border-gold/20 bg-navy-mid p-7 text-cream">
      <span className="tag bg-gold/20 text-gold">{novel.status}</span>
      <h2 className="mt-5 font-display text-3xl">{novel.title}</h2>
      <p className="ui-text mt-2 text-xs uppercase tracking-[0.15em] text-cream/45">
        {novel.genre}
      </p>
      <p className="mt-5 leading-8 text-cream/65">{novel.excerpt}</p>
    </article>
  );
}
