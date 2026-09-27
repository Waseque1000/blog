import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import { getBaseUrl } from "@/lib/seo";

export default async function sitemap() {
  const baseUrl = getBaseUrl();

  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  let postRoutes = [];
  try {
    await connectToDatabase();
    const posts = await Post.find({ status: "published" }, "slug updatedAt createdAt")
      .sort({ createdAt: -1 })
      .lean();

    postRoutes = posts.map((post) => ({
      url: `${baseUrl}/post/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.createdAt || Date.now()),
      changeFrequency: "weekly",
      priority: 0.85,
    }));
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
  }

  return [...staticRoutes, ...postRoutes];
}
