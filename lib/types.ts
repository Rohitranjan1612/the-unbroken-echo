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
  category: "Thoughts" | "Fiction" | "Tech & Writing" | "Life" | "Letters";
  readingTime: string;
}

export interface Poem extends BaseContent {
  theme: "Memory" | "Love" | "Echoes" | "Loss" | "Reflection";
}

export interface Novel extends BaseContent {
  status: string;
  genre: string;
}
