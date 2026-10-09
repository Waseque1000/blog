import { getAllPosts } from "@/lib/posts";
import { getBaseUrl, siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = getBaseUrl();
  const posts = getAllPosts().slice(0, 50);

  const latestBuildDate = posts.length > 0 && posts[0].createdAt
    ? new Date(posts[0].createdAt).toUTCString()
    : new Date().toUTCString();

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${baseUrl}/post/${post.slug}`;
      const pubDate = new Date(post.createdAt || Date.now()).toUTCString();
      const cleanExcerpt = (post.excerpt || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      const cleanTitle = (post.title || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      return `
    <item>
      <title>${cleanTitle}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${cleanExcerpt}</description>
      <category>${post.category || "Technology"}</category>
      <author>${post.author || siteConfig.author}</author>
      <pubDate>${pubDate}</pubDate>
      ${post.image ? `<enclosure url="${post.image}" type="image/jpeg" />` : ""}
    </item>`;
    })
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.title}</title>
    <link>${baseUrl}</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <lastBuildDate>${latestBuildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
    },
  });
}
