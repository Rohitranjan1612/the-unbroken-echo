import SectionHeader from "@/components/shared/SectionHeader";
import { getAuthorProfile } from "@/lib/api";
import type { AuthorStats } from "@/lib/types";
import { notFound } from "next/navigation";

export const metadata = {
  title: "About",
};

function formatStatValue(value: number | string | undefined): string {
  if (value === undefined || value === null) return "";
  return String(value);
}

function statEntries(stats: AuthorStats | null) {
  if (!stats) return [];

  const entries: { value: string; label: string }[] = [];

  if (stats.publishedBooks !== undefined) {
    const count = Number(stats.publishedBooks);
    entries.push({
      value: formatStatValue(stats.publishedBooks),
      label: count === 1 ? "Published Book" : "Published Books",
    });
  }

  if (stats.debutYear !== undefined) {
    entries.push({
      value: formatStatValue(stats.debutYear),
      label: "Debut Year",
    });
  }

  if (stats.storiesToTell !== undefined) {
    entries.push({
      value: formatStatValue(stats.storiesToTell),
      label: "Stories still to tell",
    });
  }

  return entries;
}

export default async function AboutPage() {
  const author = await getAuthorProfile();

  if (!author) {
    notFound();
  }

  const storyParagraphs =
    author.storyBody
      ?.split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean) ?? [];

  const stats = statEntries(author.stats);

  return (
    <>
      <section className="bg-navy py-20 text-cream">
        <div className="container grid gap-10 lg:grid-cols-[360px_1fr] lg:items-center">
          <div className="flex aspect-[4/5] items-center justify-center border border-gold/25 bg-navy-mid">
            {author.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={author.avatarUrl}
                alt={author.displayName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-center">
                <div className="mx-auto mb-5 h-24 w-24 rounded-full border border-gold/40" />
                <p className="ui-text text-xs uppercase tracking-[0.18em] text-cream/45">
                  Author Photo
                </p>
              </div>
            )}
          </div>
          <div>
            <span className="eyebrow">The Author</span>
            <h1 className="display-title mt-5">
              {author.displayName.split(" ").map((part, index, parts) =>
                index === parts.length - 1 ? (
                  <em key={part} className="text-gold">
                    {part}
                  </em>
                ) : (
                  <span key={part}>{part} </span>
                ),
              )}
            </h1>
            {author.tags.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {author.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className={`tag ${index === 0 ? "bg-gold text-navy" : "bg-cream/10 text-cream"}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            {author.bio ? (
              <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/68">
                {author.bio}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="prose-echo">
            {author.storyTitle ? (
              <SectionHeader eyebrow="Story" title={author.storyTitle} />
            ) : null}
            {storyParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </article>
          {stats.length > 0 ? (
            <aside className="h-fit border border-cream-dark bg-white p-7">
              <h2 className="ui-text text-xs font-bold uppercase tracking-[0.16em] text-gold-dim">
                By the Numbers
              </h2>
              <div className="mt-6 space-y-6">
                {stats.map((stat) => (
                  <Stat key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
            </aside>
          ) : null}
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-5xl text-navy">{value}</div>
      <div className="ui-text text-xs uppercase tracking-[0.14em] text-ghost">
        {label}
      </div>
    </div>
  );
}
