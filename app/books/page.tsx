import BookCard from "@/components/shared/BookCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { getAllContent } from "@/lib/mdx";

export const metadata = {
  title: "Books",
};

export default function BooksPage() {
  const books = getAllContent("books");

  return (
    <section className="py-20">
      <div className="container">
        <SectionHeader
          eyebrow="Books"
          title="Published work from The Unbroken Echo."
          copy="A growing catalog of fiction shaped by love, loss, distance, and the quiet persistence of memory."
        />
        <div className="space-y-8">
          {books.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
