import Link from "next/link";
import type { Book } from "@/lib/types";

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="grid gap-8 border border-cream-dark bg-white p-6 shadow-[0_14px_40px_rgba(15,27,45,0.08)] md:grid-cols-[220px_1fr]">
      <div className="aspect-[2/3] border border-gold/30 bg-gradient-to-br from-navy-light to-navy p-6 text-center text-cream">
        <div className="flex h-full flex-col items-center justify-center border border-gold/25 p-5">
          <p className="font-display text-3xl leading-tight">{book.title}</p>
          <p className="mt-4 font-display text-lg italic text-gold">
            {book.subtitle}
          </p>
          <div className="mt-8 h-px w-12 bg-gold" />
          <p className="ui-text mt-8 text-xs uppercase tracking-[0.18em] text-cream/60">
            Rohit Ranjan
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <span className="tag w-fit">{book.genre}</span>
        <h2 className="mt-4 font-display text-4xl leading-tight text-navy">
          {book.title}: <em className="text-gold">{book.subtitle}</em>
        </h2>
        <p className="mt-4 max-w-2xl text-ink-mid">{book.excerpt}</p>
        <div className="ui-text mt-5 flex flex-wrap gap-4 text-xs uppercase tracking-[0.12em] text-ghost">
          <span>{book.publisher}</span>
          <span>{book.published}</span>
          <span>{book.pages} pages</span>
        </div>
        <Link className="btn btn-primary mt-7 w-fit" href={`/books/${book.slug}`}>
          Explore the Book
        </Link>
      </div>
    </article>
  );
}
