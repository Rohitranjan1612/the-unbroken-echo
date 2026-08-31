import { getAuthorProfile } from "@/lib/api";

export default async function AuthorCard() {
  const author = await getAuthorProfile();

  if (!author) {
    return null;
  }

  return (
    <aside className="border border-cream-dark bg-white p-7 shadow-[0_10px_32px_rgba(15,27,45,0.06)]">
      <span className="eyebrow">Author</span>
      <h2 className="mt-4 font-display text-3xl text-navy">{author.displayName}</h2>
      {author.bio ? (
        <p className="mt-4 leading-8 text-ink-mid">{author.bio}</p>
      ) : null}
    </aside>
  );
}
