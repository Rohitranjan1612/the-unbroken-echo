import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import AuthorCard from "@/components/shared/AuthorCard";
import NewsletterForm from "@/components/shared/NewsletterForm";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { getAllContent, getContentBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getAllContent("blog").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getContentBySlug("blog", slug);
  return {
    title: post?.title ?? "Blog",
    description: post?.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getContentBySlug("blog", slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.body,
    components: mdxComponents,
  });

  return (
    <>
      <header className="bg-navy py-20 text-cream">
        <div className="reading text-center">
          <span className="tag bg-gold/20 text-gold">{post.category}</span>
          <h1 className="mt-6 font-display text-5xl leading-tight md:text-7xl">
            {post.title}
          </h1>
          <p className="ui-text mt-5 text-xs uppercase tracking-[0.16em] text-cream/50">
            {formatDate(post.date)} · {post.readingTime}
          </p>
        </div>
      </header>
      <section className="py-16">
        <article className="reading prose-echo">{content}</article>
        <div className="reading mt-12 grid gap-6">
          <AuthorCard />
          <div className="border border-cream-dark bg-white p-8 text-center">
            <h2 className="font-display text-3xl text-navy">
              More letters from the echo
            </h2>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
