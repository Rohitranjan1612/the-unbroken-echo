import { cookies } from "next/headers";
import { getApiUrl } from "./config";
import {
  getAllContent as getAllContentFromMdx,
  getContentBySlug as getContentBySlugFromMdx,
  type ContentEntry,
} from "./mdx";
import type { BlogPost, Book, ContentKind, Novel, Poem } from "./types";

export type { ContentEntry };

const DEFAULT_BUY_LINKS: Book["buyLinks"] = {
  amazon: "#",
  flipkart: "#",
  bluerose: "#",
};

type ApiBookSummary = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  genre: string;
  date: string;
};

type ApiBookDetail = ApiBookSummary & {
  publisher: string;
  published: string;
  pages: number;
  ageRange: string;
  isbn: string;
  themes: string[];
  buyLinks: Book["buyLinks"];
  body: string;
};

type ApiBlogSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
};

type ApiBlogDetail = ApiBlogSummary & {
  body: string;
};

type ApiPoemSummary = {
  slug: string;
  title: string;
  excerpt: string;
  theme: string;
  date: string;
};

type ApiPoemDetail = ApiPoemSummary & {
  body: string;
};

type ApiNovelSummary = {
  slug: string;
  title: string;
  excerpt: string;
  status: string;
  genre: string;
  date: string;
};

type ApiMetaOption = {
  value: string;
  label: string;
};

async function fetchApiServer<T>(path: string, init?: RequestInit): Promise<T | null> {
  let cookieHeader = "";
  try {
    const cookieStore = await cookies();
    cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
  } catch {
    // Outside request scope (e.g. generateStaticParams at build time).
  }

  try {
    const res = await fetch(`${getApiUrl()}${path}`, {
      ...init,
      headers: {
        ...(init?.headers ?? {}),
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

function toDateString(iso: string): string {
  return iso.split("T")[0] ?? iso;
}

function mapBook(api: ApiBookSummary | ApiBookDetail): Book {
  const detail = api as ApiBookDetail;
  return {
    slug: api.slug,
    title: api.title,
    subtitle: api.subtitle,
    excerpt: api.excerpt,
    genre: api.genre,
    date: toDateString(api.date),
    publisher: detail.publisher ?? "",
    published: detail.published ?? "",
    pages: detail.pages ?? 0,
    ageRange: detail.ageRange ?? "",
    isbn: detail.isbn ?? "",
    themes: detail.themes ?? [],
    buyLinks: detail.buyLinks ?? DEFAULT_BUY_LINKS,
  };
}

function mapBlogPost(api: ApiBlogSummary): BlogPost {
  return {
    slug: api.slug,
    title: api.title,
    excerpt: api.excerpt,
    category: api.category as BlogPost["category"],
    readingTime: api.readingTime,
    date: toDateString(api.date),
  };
}

function mapPoem(api: ApiPoemSummary): Poem {
  return {
    slug: api.slug,
    title: api.title,
    excerpt: api.excerpt,
    theme: api.theme as Poem["theme"],
    date: toDateString(api.date),
  };
}

function mapNovel(api: ApiNovelSummary): Novel {
  return {
    slug: api.slug,
    title: api.title,
    excerpt: api.excerpt,
    status: api.status,
    genre: api.genre,
    date: toDateString(api.date),
  };
}

export async function getBlogCategories(): Promise<string[]> {
  const categories = await fetchApiServer<ApiMetaOption[]>("/meta/blog-categories");
  if (categories) {
    return ["All", ...categories.map((item) => item.label)];
  }
  return ["All", "Thoughts", "Fiction", "Tech & Writing", "Life", "Letters"];
}

export async function getPoetryThemes(): Promise<string[]> {
  const themes = await fetchApiServer<ApiMetaOption[]>("/meta/poetry-themes");
  if (themes) {
    return ["All", ...themes.map((item) => item.label)];
  }
  return ["All", "Memory", "Love", "Echoes", "Loss", "Reflection"];
}

export async function getAllContent<K extends ContentKind>(
  kind: K,
): Promise<ContentEntry<K>[]> {
  switch (kind) {
    case "books": {
      const books = await fetchApiServer<ApiBookSummary[]>("/books");
      if (books) {
        const entries = await Promise.all(
          books.map(async (summary) => {
            const detail = await fetchApiServer<ApiBookDetail>(
              `/books/${summary.slug}`,
            );
            if (detail) {
              return {
                ...mapBook(detail),
                body: detail.body,
              } as unknown as ContentEntry<K>;
            }
            return {
              ...mapBook(summary),
              body: "",
            } as unknown as ContentEntry<K>;
          }),
        );
        return entries;
      }
      break;
    }
    case "blog": {
      const posts = await fetchApiServer<ApiBlogSummary[]>("/blog");
      if (posts) {
        return posts.map(
          (post) =>
            ({
              ...mapBlogPost(post),
              body: "",
            }) as unknown as ContentEntry<K>,
        );
      }
      break;
    }
    case "poetry": {
      const poems = await fetchApiServer<ApiPoemSummary[]>("/poetry");
      if (poems) {
        return poems.map(
          (poem) =>
            ({
              ...mapPoem(poem),
              body: "",
            }) as unknown as ContentEntry<K>,
        );
      }
      break;
    }
    case "novels": {
      const novels = await fetchApiServer<ApiNovelSummary[]>("/novels");
      if (novels) {
        return novels.map(
          (novel) =>
            ({
              ...mapNovel(novel),
              body: "",
            }) as unknown as ContentEntry<K>,
        );
      }
      break;
    }
  }

  return getAllContentFromMdx(kind);
}

export async function getContentBySlug<K extends ContentKind>(
  kind: K,
  slug: string,
): Promise<ContentEntry<K> | null> {
  switch (kind) {
    case "books": {
      const book = await fetchApiServer<ApiBookDetail>(`/books/${slug}`);
      if (book) {
        return {
          ...mapBook(book),
          body: book.body,
        } as unknown as ContentEntry<K>;
      }
      break;
    }
    case "blog": {
      const post = await fetchApiServer<ApiBlogDetail>(`/blog/${slug}`);
      if (post) {
        return {
          ...mapBlogPost(post),
          body: post.body,
        } as unknown as ContentEntry<K>;
      }
      break;
    }
    case "poetry": {
      const poem = await fetchApiServer<ApiPoemDetail>(`/poetry/${slug}`);
      if (poem) {
        return {
          ...mapPoem(poem),
          body: poem.body,
        } as unknown as ContentEntry<K>;
      }
      break;
    }
  }

  return getContentBySlugFromMdx(kind, slug);
}
