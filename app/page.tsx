import Link from "next/link";
import BookCard from "@/components/shared/BookCard";
import NewsletterForm from "@/components/shared/NewsletterForm";
import PostCard from "@/components/shared/PostCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { getAllContent, getAuthorProfile } from "@/lib/api";
import { siteConfig } from "@/lib/config";

export default async function Home() {
  const [author, books, posts, poems] = await Promise.all([
    getAuthorProfile(),
    getAllContent("books"),
    getAllContent("blog"),
    getAllContent("poetry"),
  ]);

  const [book] = books;
  const latestPosts = posts.slice(0, 3);
  const [poem] = poems;

  return (
    <>
      <section className="relative overflow-hidden bg-navy px-0 py-24 text-cream md:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[22vw] font-bold leading-none text-white/[0.025]">
          Echo
        </div>
        <div className="container relative grid items-center gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            {author ? (
              <span className="eyebrow">{author.displayName}</span>
            ) : (
              <span className="eyebrow">{siteConfig.author}</span>
            )}
            <h1 className="display-title mt-6 max-w-4xl">
              The Unbroken <em className="text-gold">Echo</em>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-cream/68">
              {siteConfig.tagline}. {siteConfig.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              {book ? (
                <Link className="btn btn-primary" href={`/books/${book.slug}`}>
                  Explore the Book
                </Link>
              ) : (
                <Link className="btn btn-primary" href="/books">
                  Explore Books
                </Link>
              )}
              <Link className="btn btn-outline" href="/blog">
                Read Essays
              </Link>
            </div>
          </div>

          {book ? (
            <div className="border border-gold/25 bg-navy-mid p-7 shadow-[0_0_48px_rgba(201,168,76,0.16)]">
              <div className="aspect-[2/3] border border-gold/30 bg-gradient-to-br from-navy-light to-[#09111c] p-8">
                <div className="flex h-full flex-col items-center justify-center border border-gold/20 text-center">
                  <p className="font-display text-4xl leading-tight">{book.title}</p>
                  <p className="mt-4 font-display text-xl italic text-gold">
                    {book.subtitle}
                  </p>
                  <div className="my-10 h-px w-16 bg-gold" />
                  {author ? (
                    <p className="ui-text text-xs uppercase tracking-[0.2em] text-cream/50">
                      {author.displayName}
                    </p>
                  ) : null}
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-cream/62">{book.excerpt}</p>
            </div>
          ) : null}
        </div>
      </section>

      {author?.bio ? (
        <section className="bg-cream py-20">
          <div className="container grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
            <div>
              <span className="eyebrow">About the Author</span>
              <h2 className="section-title mt-5 text-navy">Code meets prose.</h2>
            </div>
            <div className="border-l border-gold/40 pl-6 text-lg leading-9 text-ink-mid">
              <p>{author.bio}</p>
              <Link
                className="ui-text mt-5 inline-block text-sm font-bold uppercase tracking-[0.12em] text-gold-dim"
                href="/about"
              >
                Read the full story
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {book ? (
        <section className="py-20">
          <div className="container">
            <SectionHeader
              eyebrow="Featured Book"
              title="A debut novel about love, memory, and what refuses to fade."
            />
            <BookCard book={book} authorName={author?.displayName} />
          </div>
        </section>
      ) : null}

      {latestPosts.length > 0 ? (
        <section className="bg-cream py-20">
          <div className="container">
            <SectionHeader
              eyebrow="Latest Notes"
              title="Essays from the edge of memory and making."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {latestPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {poem ? (
        <section className="py-20">
          <div className="reading text-center">
            <span className="tag">{poem.theme}</span>
            <h2 className="mt-5 font-display text-5xl text-navy">{poem.title}</h2>
            <p className="mt-8 whitespace-pre-line font-display text-3xl italic leading-snug text-ink-mid">
              {poem.excerpt}
            </p>
            <Link className="btn btn-primary mt-9" href={`/poetry/${poem.slug}`}>
              Read the Poem
            </Link>
          </div>
        </section>
      ) : null}

      <section className="bg-navy px-0 py-20 text-center text-cream">
        <div className="reading">
          <span className="eyebrow">Newsletter</span>
          <h2 className="section-title mt-5 text-cream">
            Letters from <em className="text-gold">the echo.</em>
          </h2>
          <p className="mt-5 text-cream/65">
            Stories, thoughts, and occasional letters delivered to your inbox. No
            noise. Just words that matter.
          </p>
          <NewsletterForm />
          <p className="ui-text mt-4 text-xs uppercase tracking-[0.1em] text-cream/38">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  );
}
