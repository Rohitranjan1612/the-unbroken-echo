import { cookies } from "next/headers";
import { getApiUrl } from "./config";
import type {
  AuthorProfile,
  BlogPost,
  Book,
  ContentEntry,
  ContentKind,
  Novel,
  Poem,
} from "./types";

export type { ContentEntry };

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

type ApiBookSummary = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  genre: string;
  date: string;
  publisher: string;
  published: string;
  pages: number;
  buyLinks: Book["buyLinks"];
};

type ApiBookDetail = ApiBookSummary & {
  ageRange: string;
  isbn: string;
  themes: string[];
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

const EMPTY_BUY_LINKS: Book["buyLinks"] = {
  amazon: "",
  flipkart: "",
  bluerose: "",
};

async function fetchApi<T>(
  path: string,
  init: RequestInit & { cookieHeader?: string } = {},
): Promise<T> {
  const { cookieHeader, ...rest } = init;
  const headers = new Headers(rest.headers);
  if (cookieHeader) {
    headers.set("Cookie", cookieHeader);
  }

  const res = await fetch(`${getApiUrl()}${path}`, {
    ...rest,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new ApiError(res.status, await res.text());
  }

  return res.json() as Promise<T>;
}

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
    return await fetchApi<T>(path, { ...init, cookieHeader });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    console.warn(`API unavailable for ${path}:`, error);
    return null;
  }
}

function toDateString(iso: string): string {
  return iso.split("T")[0] ?? iso;
}

function normalizeBuyLinks(
  buyLinks: Book["buyLinks"] | null | undefined,
): Book["buyLinks"] {
  if (!buyLinks || typeof buyLinks !== "object") {
    return EMPTY_BUY_LINKS;
  }

  return {
    amazon: String(buyLinks.amazon ?? ""),
    flipkart: String(buyLinks.flipkart ?? ""),
    bluerose: String(buyLinks.bluerose ?? ""),
  };
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
    publisher: api.publisher ?? "",
    published: api.published ?? "",
    pages: api.pages ?? 0,
    ageRange: detail.ageRange ?? "",
    isbn: detail.isbn ?? "",
    themes: detail.themes ?? [],
    buyLinks: normalizeBuyLinks(api.buyLinks),
  };
}

function mapBlogPost(api: ApiBlogSummary): BlogPost {
  return {
    slug: api.slug,
    title: api.title,
    excerpt: api.excerpt,
    category: api.category,
    readingTime: api.readingTime,
    date: toDateString(api.date),
  };
}

function mapPoem(api: ApiPoemSummary): Poem {
  return {
    slug: api.slug,
    title: api.title,
    excerpt: api.excerpt,
    theme: api.theme,
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

export async function getAuthorProfile(): Promise<AuthorProfile | null> {
  return fetchApiServer<AuthorProfile>("/meta/author");
}

export async function getBlogCategories(): Promise<string[]> {
  const categories = await fetchApiServer<ApiMetaOption[]>("/meta/blog-categories");
  if (!categories?.length) {
    return ["All"];
  }
  return ["All", ...categories.map((item) => item.label)];
}

export async function getPoetryThemes(): Promise<string[]> {
  const themes = await fetchApiServer<ApiMetaOption[]>("/meta/poetry-themes");
  if (!themes?.length) {
    return ["All"];
  }
  return ["All", ...themes.map((item) => item.label)];
}

export async function getAllContent<K extends ContentKind>(
  kind: K,
): Promise<ContentEntry<K>[]> {
  switch (kind) {
    case "books": {
      const books = await fetchApiServer<ApiBookSummary[]>("/books");
      return (
        books?.map(
          (book) =>
            ({
              ...mapBook(book),
              body: "",
            }) as unknown as ContentEntry<K>,
        ) ?? []
      );
    }
    case "blog": {
      const posts = await fetchApiServer<ApiBlogSummary[]>("/blog");
      return (
        posts?.map(
          (post) =>
            ({
              ...mapBlogPost(post),
              body: "",
            }) as unknown as ContentEntry<K>,
        ) ?? []
      );
    }
    case "poetry": {
      const poems = await fetchApiServer<ApiPoemSummary[]>("/poetry");
      return (
        poems?.map(
          (poem) =>
            ({
              ...mapPoem(poem),
              body: "",
            }) as unknown as ContentEntry<K>,
        ) ?? []
      );
    }
    case "novels": {
      const novels = await fetchApiServer<ApiNovelSummary[]>("/novels");
      return (
        novels?.map(
          (novel) =>
            ({
              ...mapNovel(novel),
              body: "",
            }) as unknown as ContentEntry<K>,
        ) ?? []
      );
    }
  }
}

export async function getContentBySlug<K extends ContentKind>(
  kind: K,
  slug: string,
): Promise<ContentEntry<K> | null> {
  switch (kind) {
    case "books": {
      const book = await fetchApiServer<ApiBookDetail>(`/books/${slug}`);
      if (!book) return null;
      return {
        ...mapBook(book),
        body: book.body,
      } as unknown as ContentEntry<K>;
    }
    case "blog": {
      const post = await fetchApiServer<ApiBlogDetail>(`/blog/${slug}`);
      if (!post) return null;
      return {
        ...mapBlogPost(post),
        body: post.body,
      } as unknown as ContentEntry<K>;
    }
    case "poetry": {
      const poem = await fetchApiServer<ApiPoemDetail>(`/poetry/${slug}`);
      if (!poem) return null;
      return {
        ...mapPoem(poem),
        body: poem.body,
      } as unknown as ContentEntry<K>;
    }
    case "novels": {
      const novels = await fetchApiServer<ApiNovelSummary[]>("/novels");
      const novel = novels?.find((entry) => entry.slug === slug);
      if (!novel) return null;
      return {
        ...mapNovel(novel),
        body: "",
      } as unknown as ContentEntry<K>;
    }
  }
}

export async function getFeaturedBookBuyLinks(): Promise<Book["buyLinks"] | null> {
  const books = await fetchApiServer<ApiBookSummary[]>("/books");
  const [book] = books ?? [];
  if (!book) return null;
  return normalizeBuyLinks(book.buyLinks);
}
