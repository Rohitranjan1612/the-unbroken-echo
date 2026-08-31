import PoemCard from "@/components/shared/PoemCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { getAllContent, getPoetryThemes } from "@/lib/api";

export const metadata = {
  title: "Poetry",
};

export default async function PoetryPage() {
  const [poems, themes] = await Promise.all([
    getAllContent("poetry"),
    getPoetryThemes(),
  ]);

  return (
    <section className="py-20">
      <div className="container">
        <SectionHeader
          eyebrow="Poetry"
          title="Small rooms for large feelings."
          copy="A curated collection of poems organised by memory, love, loss, reflection, and the echoes people leave behind."
        />
        <div className="mb-10 flex flex-wrap gap-3">
          {themes.map((theme) => (
            <span className="tag" key={theme}>
              {theme}
            </span>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {poems.map((poem) => (
            <PoemCard key={poem.slug} poem={poem} />
          ))}
        </div>
      </div>
    </section>
  );
}
