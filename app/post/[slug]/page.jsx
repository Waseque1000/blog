import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import PostActions from "@/components/public/PostActions";
import CommentsSection from "@/components/public/CommentsSection";
import { getBaseUrl, siteConfig } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function getCleanTags(post) {
  if (Array.isArray(post.tags) && post.tags.length > 0) {
    return post.tags;
  }
  const stopWords = /^(with|best|time|routes|tips|guide|that|this|what|which|about|under|from|your|step|steps|free|look|when|into|then|than|some|more)$/i;
  const words = (post.title || "")
    .split(/[\s,()—–:."']+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 3 && !stopWords.test(w));
  return [post.category, ...Array.from(new Set(words)).slice(0, 3)];
}

function normalizeHeadings(htmlContent) {
  if (!htmlContent) return "";
  let content = htmlContent;
  // If first heading in content is an h3, elevate to h2
  const firstHeading = content.match(/<h([1-6])/i);
  if (firstHeading && firstHeading[1] === "3") {
    content = content.replace(/<h3([^>]*)>(.*?)<\/h3>/i, "<h2$1>$2</h2>");
  }
  // Convert h4 elements to h3 for proper heading hierarchy
  content = content.replace(/<h4([^>]*)>(.*?)<\/h4>/gi, "<h3$1>$2</h3>");
  return content;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found on Think.",
      robots: { index: false, follow: true },
    };
  }

  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/post/${post.slug}`;
  const tags = getCleanTags(post);
  const absoluteImage = post.image?.startsWith("http")
    ? post.image
    : `${baseUrl}${post.image?.startsWith("/") ? "" : "/"}${post.image || siteConfig.ogImage}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, ...tags],
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
      tags: tags,
      images: [
        {
          url: absoluteImage,
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
      images: [absoluteImage],
      creator: siteConfig.twitterHandle,
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return notFound();

  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/post/${post.slug}`;
  const categorySlug = encodeURIComponent(post.category.toLowerCase());
  const tags = getCleanTags(post);
  const absoluteImage = post.image?.startsWith("http")
    ? post.image
    : `${baseUrl}${post.image?.startsWith("/") ? "" : "/"}${post.image || siteConfig.ogImage}`;

  // Related posts for topic clustering
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => (p.category || "").toLowerCase() === (post.category || "").toLowerCase() && p.slug !== post.slug)
    .slice(0, 3);

  // Trending posts
  const trendingTopics = allPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 4);

  const serializedComments = [];

  const rawCreated = post.createdAt ? new Date(post.createdAt) : new Date();
  const dateObj = isNaN(rawCreated.getTime()) ? new Date() : rawCreated;
  const dateStr = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const isoPublishedDate = dateObj.toISOString();
  const rawUpdated = post.updatedAt ? new Date(post.updatedAt) : dateObj;
  const isoModifiedDate = isNaN(rawUpdated.getTime()) ? dateObj.toISOString() : rawUpdated.toISOString();

  // Word count and read time
  const plainText = (post.content || "").replace(/<[^>]+>/g, " ");
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Normalized content for clean H1 -> H2 -> H3 hierarchy
  const sanitizedContent = normalizeHeadings(post.content);

  // Schema.org BlogPosting
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [absoluteImage],
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
        url: `${baseUrl}/logo-mark.png`,
      },
    },
    articleSection: post.category,
    keywords: [post.category, ...tags].join(", "),
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
        item: `${baseUrl}/category/${categorySlug}`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="bg-[#faf8ff] min-h-screen pt-16" itemScope itemType="https://schema.org/BlogPosting">
        <meta itemProp="headline" content={post.title} />
        <meta itemProp="datePublished" content={isoPublishedDate} />
        <meta itemProp="dateModified" content={isoModifiedDate} />
        <meta itemProp="image" content={absoluteImage} />
        <meta itemProp="author" content={post.author} />

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-10 md:pt-14 pb-6 sm:pb-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs text-[#767585] mb-4 sm:mb-5 font-medium">
            <Link href="/" className="hover:text-[#4648d4] transition-colors">Home</Link>
            <span className="text-[#c7c4d7]">/</span>
            <Link
              href={`/category/${categorySlug}`}
              className="hover:text-[#4648d4] transition-colors text-[#4648d4] font-semibold"
            >
              {post.category}
            </Link>
            <span className="text-[#c7c4d7]">/</span>
            <span className="text-[#464554] truncate max-w-[200px] sm:max-w-xs md:max-w-md">{post.title}</span>
          </nav>

          {/* Category Pill */}
          <div className="mb-3 sm:mb-4">
            <Link
              href={`/category/${categorySlug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaedff] text-[#4648d4] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider hover:bg-[#4648d4] hover:text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4648d4]" />
              {post.category}
            </Link>
          </div>

          {/* Article Title */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-extrabold text-[#131b2e] tracking-tight mb-5 leading-tight md:leading-[1.2]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {post.title}
          </h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-y-2.5 gap-x-3 sm:gap-x-5 text-xs sm:text-sm text-[#767585] pb-5 border-b border-[#c7c4d7]/40">
            <span className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#4648d4] to-[#6063ee] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                {post.author?.charAt(0)?.toUpperCase()}
              </div>
              <span className="text-[#131b2e] font-semibold">{post.author}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c7c4d7] hidden sm:inline-block" />
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-[#4648d4]" aria-hidden="true">calendar_today</span>
              <time dateTime={isoPublishedDate}>{dateStr}</time>
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c7c4d7] hidden sm:inline-block" />
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-[#4648d4]" aria-hidden="true">schedule</span>
              {readTimeMinutes} min read
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c7c4d7] hidden sm:inline-block" />
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-[#4648d4]" aria-hidden="true">visibility</span>
              {post.views || 0} views
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c7c4d7] hidden sm:inline-block" />
            <a href="#comments" className="flex items-center gap-1.5 text-[#4648d4] font-medium hover:underline transition-all">
              <span className="material-symbols-outlined text-[15px] sm:text-[16px]" aria-hidden="true">chat_bubble</span>
              {serializedComments.length} {serializedComments.length === 1 ? "comment" : "comments"}
            </a>
          </div>
        </header>

        {/* Featured Hero Image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mb-8 sm:mb-10">
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[280px] sm:max-h-[400px] md:max-h-[520px] overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg border border-[#c7c4d7]/30 bg-[#131b2e]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <div className="text-lg sm:text-xl md:text-2xl text-[#131b2e] font-medium leading-relaxed mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-[#c7c4d7]/30 italic">
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
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {/* Keyword Pill Cloud for Internal Topic Relevance */}
          <div className="mt-10 pt-6 border-t border-[#c7c4d7]/30">
            <span className="text-xs font-semibold text-[#767585] uppercase tracking-wider block mb-3">Topic Exploration</span>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/category/${categorySlug}`}
                className="px-3 py-1 rounded-lg bg-[#eaedff] text-[#4648d4] text-xs font-semibold hover:bg-[#4648d4] hover:text-white transition-colors"
              >
                #{post.category}
              </Link>
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 rounded-lg bg-[#eaedff] text-[#464554] text-xs font-medium hover:bg-[#e2e7ff] transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          <PostActions
            postId={post._id.toString()}
            initialLikes={post.likes || 0}
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
            canonicalUrl={canonicalUrl}
          />

          {/* Comments Section */}
          <CommentsSection
            postId={post._id.toString()}
            initialComments={serializedComments}
          />
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-[#c7c4d7]/30 bg-white">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#4648d4] uppercase tracking-widest">Related Analysis</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c7c4d7]" />
                <span className="text-[10px] sm:text-[11px] text-[#767585]">More within {post.category}</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight mb-6 sm:mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Continue Reading
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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

        {/* Global Topic Cluster: Trending */}
        {trendingTopics.length > 0 && (
          <section className="border-t border-[#c7c4d7]/20 bg-[#f7f6fd] py-12">
            <div className="max-w-[1320px] mx-auto px-4 md:px-8">
              <h4 className="text-xs font-bold text-[#767585] uppercase tracking-wider mb-4">
                Trending Discussions on Think
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
