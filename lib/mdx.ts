import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, Book, ContentKind, Novel, Poem } from "@/lib/types";

const contentRoot = path.join(process.cwd(), "content");

type ContentMap = {
  books: Book;
  blog: BlogPost;
  poetry: Poem;
  novels: Novel;
};

export type ContentEntry<K extends ContentKind> = ContentMap[K] & {
  body: string;
};

function getDir(kind: ContentKind) {
  return path.join(contentRoot, kind);
}

export function getAllContent<K extends ContentKind>(
  kind: K,
): ContentEntry<K>[] {
  const dir = getDir(kind);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fullPath = path.join(dir, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");

      if (!data.title) {
        return null;
      }

      return {
        slug,
        readingTime: readingTime(content).text,
        ...data,
        body: content,
      } as unknown as ContentEntry<K>;
    })
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b!.date ?? "2000-01-01").getTime() -
        new Date(a!.date ?? "2000-01-01").getTime(),
    ) as ContentEntry<K>[];
}

export function getContentBySlug<K extends ContentKind>(
  kind: K,
  slug: string,
): ContentEntry<K> | null {
  return getAllContent(kind).find((entry) => entry.slug === slug) ?? null;
}
