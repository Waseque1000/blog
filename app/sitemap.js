import { getAllPosts, getAllCategories } from "@/lib/posts";
import { getBaseUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default async function sitemap() {
  const baseUrl = getBaseUrl();

  let latestPostDate = new Date("2026-09-01");
  let postRoutes = [];
  let categoryRoutes = [];

  try {
    const posts = getAllPosts();

    if (posts.length > 0) {
      const topDate = posts[0].updatedAt || posts[0].createdAt;
      if (topDate) latestPostDate = new Date(topDate);
    }

    // Dynamic Post URLs
    postRoutes = posts.map((post) => ({
      url: `${baseUrl}/post/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.createdAt || Date.now()),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

    // Dynamic Category URLs (only index categories that actually have published posts)
    const uniqueCategories = getAllCategories();
    categoryRoutes = uniqueCategories.map((cat) => ({
      url: `${baseUrl}/category/${encodeURIComponent(cat.toLowerCase())}`,
      lastModified: latestPostDate,
      changeFrequency: "daily",
      priority: 0.85,
    }));
  } catch (error) {
    console.error("Error generating static sitemap:", error);
  }

  // Canonical indexable static pages (Note: /search is noindex and excluded)
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: latestPostDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-09-29"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-09-29"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
