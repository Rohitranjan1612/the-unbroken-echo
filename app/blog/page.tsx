import PostCard from "@/components/shared/PostCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { getAllContent, getBlogCategories } from "@/lib/api";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllContent("blog"),
    getBlogCategories(),
  ]);
  const featured = posts.find((post) => post.featured);
  const rest = posts.filter((post) => post.slug !== featured?.slug);

  return (
    <section className="py-20">
      <div className="container">
        <SectionHeader
          eyebrow="Blog"
          title="Thoughts, letters, and notes from the writing desk."
          copy="Long-form reflections on fiction, memory, creative discipline, and the strange overlap between engineering and storytelling."
        />

        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <span key={category} className="tag">
              {category}
            </span>
          ))}
        </div>

        {featured ? (
          <article className="mb-10 grid overflow-hidden border border-gold/25 bg-white shadow-[0_16px_44px_rgba(15,27,45,0.09)] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex min-h-72 items-center justify-center bg-navy p-8">
              <span className="font-display text-5xl italic text-gold">
                Featured
              </span>
            </div>
            <div className="p-8 lg:p-10">
              <span className="tag">{featured.category}</span>
              <h2 className="mt-5 font-display text-5xl leading-tight text-navy">
                {featured.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-ink-mid">
                {featured.excerpt}
              </p>
              <a className="btn btn-primary mt-8" href={`/blog/${featured.slug}`}>
                Read Featured Post
              </a>
            </div>
          </article>
        ) : null}

        <div className="grid gap-6 md:grid-cols-3">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
