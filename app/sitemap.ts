import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/api";
import { getSiteUrl } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();

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

  const [books, posts, poems] = await Promise.all([
    getAllContent("books"),
    getAllContent("blog"),
    getAllContent("poetry"),
  ]);

  const bookRoutes = books.map((book) => ({
    url: `${baseUrl}/books/${book.slug}`,
    lastModified: new Date(book.date),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.85 : 0.7,
  }));

  const poemRoutes = poems.map((poem) => ({
    url: `${baseUrl}/poetry/${poem.slug}`,
    lastModified: new Date(poem.date),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...bookRoutes, ...postRoutes, ...poemRoutes];
}
