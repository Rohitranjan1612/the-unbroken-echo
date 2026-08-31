export type ContentKind = "books" | "blog" | "poetry" | "novels";

export interface BaseContent {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  featured?: boolean;
}

export interface Book extends BaseContent {
  subtitle: string;
  genre: string;
  publisher: string;
  published: string;
  pages: number;
  ageRange: string;
  isbn: string;
  themes: string[];
  buyLinks: {
    amazon: string;
    flipkart: string;
    bluerose: string;
  };
}

export interface BlogPost extends BaseContent {
  category: string;
  readingTime: string;
}

export interface Poem extends BaseContent {
  theme: string;
}

export interface Novel extends BaseContent {
  status: string;
  genre: string;
}

type ContentMap = {
  books: Book;
  blog: BlogPost;
  poetry: Poem;
  novels: Novel;
};

export type ContentEntry<K extends ContentKind> = ContentMap[K] & {
  body: string;
};

export type AuthorStats = {
  publishedBooks?: number | string;
  debutYear?: number | string;
  storiesToTell?: string;
};

export type AuthorProfile = {
  displayName: string;
  bio: string | null;
  contactEmail: string | null;
  avatarUrl: string | null;
  tags: string[];
  storyTitle: string | null;
  storyBody: string | null;
  stats: AuthorStats | null;
  updatedAt: string;
};
