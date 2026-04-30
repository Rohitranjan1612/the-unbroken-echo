import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/mdx";

const baseUrl = "https://theunbrokenecho.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/books",
    "/novels",
    "/poetry",
    "/blog",
    "/about",
    "/contact",
    "/newsletter",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const books = getAllContent("books").map((book) => ({
    url: `${baseUrl}/books/${book.slug}`,
    lastModified: new Date(book.date),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const posts = getAllContent("blog").map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.85 : 0.7,
  }));

  const poems = getAllContent("poetry").map((poem) => ({
    url: `${baseUrl}/poetry/${poem.slug}`,
    lastModified: new Date(poem.date),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...books, ...posts, ...poems];
}
