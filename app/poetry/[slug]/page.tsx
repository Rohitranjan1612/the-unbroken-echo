import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { getAllContent, getContentBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getAllContent("poetry").map((poem) => ({ slug: poem.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const poem = getContentBySlug("poetry", slug);
  return {
    title: poem?.title ?? "Poem",
    description: poem?.excerpt,
  };
}

export default async function PoemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const poem = getContentBySlug("poetry", slug);

  if (!poem) {
    notFound();
  }

  const { content } = await compileMDX({
    source: poem.body,
    components: mdxComponents,
  });

  return (
    <section className="py-20">
      <div className="reading text-center">
        <span className="tag">{poem.theme}</span>
        <h1 className="mt-6 font-display text-6xl leading-none text-navy">
          {poem.title}
        </h1>
        <p className="ui-text mt-5 text-xs uppercase tracking-[0.16em] text-ghost">
          {formatDate(poem.date)}
        </p>
      </div>
      <article className="reading prose-echo mt-12 text-center font-display text-2xl leading-loose text-ink-mid">
        {content}
      </article>
    </section>
  );
}
