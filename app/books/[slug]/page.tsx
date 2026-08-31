import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import AuthorCard from "@/components/shared/AuthorCard";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { getAllContent, getAuthorProfile, getContentBySlug } from "@/lib/api";

export async function generateStaticParams() {
  const books = await getAllContent("books");
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = await getContentBySlug("books", slug);
  return {
    title: book?.title ?? "Book",
    description: book?.excerpt,
  };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [book, author] = await Promise.all([
    getContentBySlug("books", slug),
    getAuthorProfile(),
  ]);

  if (!book) {
    notFound();
  }

  const buyLinks = [
    { label: "Amazon", href: book.buyLinks.amazon },
    { label: "Flipkart", href: book.buyLinks.flipkart },
    { label: "BlueRose", href: book.buyLinks.bluerose },
  ].filter((link) => link.href);

  const { content } = await compileMDX({
    source: book.body,
    components: mdxComponents,
  });

  return (
    <>
      <section className="bg-navy py-20 text-cream">
        <div className="container grid gap-10 lg:grid-cols-[340px_1fr] lg:items-center">
          <div className="aspect-[2/3] border border-gold/30 bg-gradient-to-br from-navy-light to-[#09111c] p-8">
            <div className="flex h-full flex-col items-center justify-center border border-gold/20 text-center">
              <p className="font-display text-4xl leading-tight">{book.title}</p>
              <p className="mt-4 font-display text-xl italic text-gold">
                {book.subtitle}
              </p>
              <div className="my-10 h-px w-16 bg-gold" />
              <p className="ui-text text-xs uppercase tracking-[0.2em] text-cream/50">
                {author?.displayName ?? ""}
              </p>
            </div>
          </div>
          <div>
            <span className="eyebrow">{book.genre}</span>
            <h1 className="display-title mt-5">
              {book.title}: <em className="text-gold">{book.subtitle}</em>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/68">
              {book.excerpt}
            </p>
            <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["Pages", book.pages],
                ["Published", book.published],
                ["Age", book.ageRange],
                ["Publisher", book.publisher],
              ].map(([label, value]) => (
                <div key={label} className="border border-gold/20 p-4">
                  <dt className="ui-text text-xs uppercase tracking-[0.14em] text-cream/45">
                    {label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl text-gold">{value}</dd>
                </div>
              ))}
            </dl>
            {buyLinks.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {buyLinks.map((link, index) => (
                  <a
                    key={link.label}
                    className={index === 0 ? "btn btn-primary" : "btn btn-outline"}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="prose-echo max-w-none">{content}</article>
          <div className="space-y-6">
            <aside className="border border-cream-dark bg-white p-6">
              <h2 className="ui-text text-xs font-bold uppercase tracking-[0.14em] text-gold-dim">
                Themes
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {book.themes.map((theme) => (
                  <span key={theme} className="tag">
                    {theme}
                  </span>
                ))}
              </div>
              <div className="ui-text mt-6 space-y-3 text-sm text-ghost">
                <p>ISBN: {book.isbn}</p>
                <p>Genre: {book.genre}</p>
              </div>
            </aside>
            <AuthorCard />
          </div>
        </div>
      </section>
    </>
  );
}
