import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import { getBaseUrl } from "@/lib/seo";

export default async function sitemap() {
  const baseUrl = getBaseUrl();

  let latestPostDate = new Date("2026-09-01");
  let postRoutes = [];
  let categoryRoutes = [];

  try {
    await connectToDatabase();

    const posts = await Post.find(
      { status: "published" },
      "slug category updatedAt createdAt"
    )
      .sort({ createdAt: -1 })
      .lean();

    if (posts.length > 0) {
      const topDate = posts[0].updatedAt || posts[0].createdAt;
      if (topDate) latestPostDate = new Date(topDate);
    }

    // Dynamic Post URLs
    postRoutes = posts.map((post) => ({
      url: `${baseUrl}/post/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.createdAt || Date.now()),
      changeFrequency: "weekly",
      priority: 0.85,
    }));

    // Dynamic Category URLs (only index categories that actually have published posts)
    const uniqueCategories = [...new Set(posts.map((p) => p.category).filter(Boolean))];
    categoryRoutes = uniqueCategories.map((cat) => ({
      url: `${baseUrl}/category/${encodeURIComponent(cat.toLowerCase())}`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.75,
    }));
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
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
