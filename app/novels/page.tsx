import NovelCard from "@/components/shared/NovelCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { getAllContent } from "@/lib/api";

export const metadata = {
  title: "Web Novel",
};

export default async function NovelsPage() {
  const novels = await getAllContent("novels");

  return (
    <section className="bg-navy py-20 text-cream">
      <div className="container">
        <SectionHeader
          eyebrow="Web Novel"
          title="A serialized story space, opening soon."
          copy="The architecture is ready for episodic fiction, chapters, and reading updates as the next long-form project develops."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {novels.map((novel) => (
            <NovelCard key={novel.slug} novel={novel} />
          ))}
        </div>
      </div>
    </section>
  );
}
