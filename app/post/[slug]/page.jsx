import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import { notFound } from "next/navigation";
import Link from "next/link";
import PostActions from "@/components/public/PostActions";
import { getBaseUrl, siteConfig } from "@/lib/seo";

export async function generateMetadata({ params }) {
  await connectToDatabase();
  const { slug } = await params;
  const post = await Post.findOne({ slug, status: "published" }).lean();
  if (!post) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found on Kronikl.",
    };
  }

  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/post/${post.slug}`;
  const keywords = [
    post.category,
    "Technology",
    "Artificial Intelligence",
    "Analysis",
    "Kronikl",
    ...post.title.split(" ").filter((w) => w.length > 3),
  ];

  return {
    title: post.title,
    description: post.excerpt,
    keywords: keywords,
    authors: [{ name: post.author || siteConfig.author, url: baseUrl }],
    category: post.category,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "article",
      publishedTime: post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
      modifiedTime: post.updatedAt
        ? new Date(post.updatedAt).toISOString()
        : post.createdAt
        ? new Date(post.createdAt).toISOString()
        : undefined,
      authors: [post.author || siteConfig.author],
      section: post.category,
      tags: [post.category, "Technology", "AI"],
      images: [
        {
          url: post.image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image || siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
  };
}

export default async function PostPage({ params }) {
  await connectToDatabase();
  const { slug } = await params;

  const post = await Post.findOneAndUpdate(
    { slug, status: "published" },
    { $inc: { views: 1 } },
    { returnDocument: "after" }
  ).lean();

  if (!post) return notFound();

  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/post/${post.slug}`;

  // Related posts for internal link equity & topic clustering
  const relatedPosts = await Post.find({
    category: post.category,
    _id: { $ne: post._id },
    status: "published",
  })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  // Additional trending topics for site-wide internal link distribution
  const trendingTopics = await Post.find({
    _id: { $ne: post._id },
    status: "published",
  })
    .sort({ views: -1 })
    .limit(4)
    .lean();

  const dateObj = new Date(post.createdAt);
  const dateStr = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const isoPublishedDate = dateObj.toISOString();
  const isoModifiedDate = (post.updatedAt ? new Date(post.updatedAt) : dateObj).toISOString();

  // Word count and estimated read time
  const plainText = (post.content || "").replace(/<[^>]+>/g, " ");
  const wordCount = plainText.trim().split(/\s+/).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Schema.org BlogPosting
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.image || siteConfig.ogImage],
    datePublished: isoPublishedDate,
    dateModified: isoModifiedDate,
    wordCount: wordCount,
    inLanguage: "en-US",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    author: {
      "@type": "Person",
      name: post.author || siteConfig.author,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.ogImage,
      },
    },
    articleSection: post.category,
    keywords: `${post.category}, Technology, Artificial Intelligence, ${post.title}`,
  };

  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.category,
        item: `${baseUrl}/search?category=${encodeURIComponent(post.category)}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      {/* Search Engine Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="bg-[#faf8ff] min-h-screen pt-16" itemScope itemType="https://schema.org/BlogPosting">
        {/* Meta for SEO microdata */}
        <meta itemProp="headline" content={post.title} />
        <meta itemProp="datePublished" content={isoPublishedDate} />
        <meta itemProp="dateModified" content={isoModifiedDate} />
        <meta itemProp="image" content={post.image} />
        <meta itemProp="author" content={post.author} />

        {/* Hero Section */}
        <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden bg-[#131b2e]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/95 via-[#131b2e]/50 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              {/* Semantic SEO Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-300 mb-6 font-medium">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-gray-500">/</span>
                <Link
                  href={`/search?category=${encodeURIComponent(post.category)}`}
                  className="hover:text-white transition-colors text-[#a4a9ff]"
                >
                  {post.category}
                </Link>
                <span className="text-gray-500">/</span>
                <span className="text-gray-400 truncate max-w-[200px] md:max-w-xs">{post.title}</span>
              </nav>

              <div className="mb-4">
                <Link
                  href={`/search?category=${encodeURIComponent(post.category)}`}
                  className="inline-block px-3 py-1 rounded-full bg-[#e21e49] text-white text-[11px] font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  {post.category}
                </Link>
              </div>

              <h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.02em" }}
              >
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4648d4] to-[#6063ee] flex items-center justify-center text-white font-bold text-xs shadow-inner">
                    {post.author?.charAt(0)?.toUpperCase()}
                  </div>
                  <span className="text-white font-medium">{post.author}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  <time dateTime={isoPublishedDate}>{dateStr}</time>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  {readTimeMinutes} min read
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  {post.views} views
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
          {/* Excerpt Lead Paragraph for Featured Snippets */}
          <div className="text-xl md:text-2xl text-[#131b2e] font-medium leading-relaxed mb-8 pb-6 border-b border-[#c7c4d7]/30 italic">
            &ldquo;{post.excerpt}&rdquo;
          </div>

          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#131b2e]
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-a:text-[#4648d4] hover:prose-a:text-[#6063ee] prose-a:font-semibold prose-a:underline
              prose-p:text-[#464554] prose-p:leading-relaxed prose-p:mb-6
              prose-strong:text-[#131b2e]
              prose-blockquote:border-l-[#4648d4] prose-blockquote:text-[#464554] prose-blockquote:bg-[#f0effe]/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-xl
              prose-code:text-[#4648d4] prose-code:bg-[#e1e0ff] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-img:rounded-2xl prose-img:shadow-md"
            style={{ fontFamily: "'Geist', system-ui, sans-serif" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Keyword Pill Cloud for Internal Topic Relevance */}
          <div className="mt-10 pt-6 border-t border-[#c7c4d7]/30">
            <span className="text-xs font-semibold text-[#767585] uppercase tracking-wider block mb-3">Topic Exploration</span>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/search?category=${encodeURIComponent(post.category)}`}
                className="px-3 py-1 rounded-lg bg-[#eaedff] text-[#4648d4] text-xs font-semibold hover:bg-[#4648d4] hover:text-white transition-colors"
              >
                #{post.category}
              </Link>
              <Link
                href="/search?q=AI"
                className="px-3 py-1 rounded-lg bg-[#eaedff] text-[#464554] text-xs font-medium hover:bg-[#e2e7ff] transition-colors"
              >
                #Artificial Intelligence
              </Link>
              <Link
                href="/search?q=Apple"
                className="px-3 py-1 rounded-lg bg-[#eaedff] text-[#464554] text-xs font-medium hover:bg-[#e2e7ff] transition-colors"
              >
                #Tech News
              </Link>
              <Link
                href="/search?q=Software"
                className="px-3 py-1 rounded-lg bg-[#eaedff] text-[#464554] text-xs font-medium hover:bg-[#e2e7ff] transition-colors"
              >
                #Engineering
              </Link>
            </div>
          </div>

          <PostActions
            postId={post._id.toString()}
            initialLikes={post.likes || 0}
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        </div>

        {/* Related Articles - Internal Link Equity Sinks */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-[#c7c4d7]/30 bg-white">
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-16">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold text-[#4648d4] uppercase tracking-widest">Related Analysis</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c7c4d7]" />
                <span className="text-[11px] text-[#464554]">More within {post.category}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Continue Reading
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp._id}
                    href={`/post/${rp.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#c7c4d7]/20"
                  >
                    <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rp.image}
                        alt={rp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#e2e7ff] text-[#4648d4] text-[11px] font-semibold">
                          {rp.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h4
                        className="text-lg font-semibold text-[#131b2e] line-clamp-2 group-hover:text-[#4648d4] transition-colors leading-snug"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {rp.title}
                      </h4>
                      <p className="text-xs text-[#767585] mt-2 line-clamp-2">{rp.excerpt}</p>
                      <div className="text-[11px] text-[#464554] mt-3 font-medium">
                        {new Date(rp.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Global Topic Cluster: Trending Across the Publication */}
        {trendingTopics.length > 0 && (
          <section className="border-t border-[#c7c4d7]/20 bg-[#f7f6fd] py-12">
            <div className="max-w-[1320px] mx-auto px-4 md:px-8">
              <h4 className="text-xs font-bold text-[#767585] uppercase tracking-wider mb-4">
                Trending Discussions on Kronikl
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {trendingTopics.map((tp) => (
                  <Link
                    key={tp._id}
                    href={`/post/${tp.slug}`}
                    className="p-4 bg-white rounded-xl border border-[#c7c4d7]/30 hover:border-[#4648d4] hover:shadow-md transition-all group"
                  >
                    <span className="text-[10px] font-semibold text-[#e21e49] uppercase tracking-wider block mb-1">
                      {tp.category}
                    </span>
                    <h5 className="text-sm font-semibold text-[#131b2e] group-hover:text-[#4648d4] line-clamp-2 leading-snug">
                      {tp.title}
                    </h5>
                    <span className="text-[11px] text-[#767585] mt-2 block">{tp.views || 0} readers</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}

