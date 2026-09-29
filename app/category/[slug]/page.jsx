import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import PostCard from "@/components/public/PostCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBaseUrl, siteConfig } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categoryName = decodeURIComponent(slug);

  await connectToDatabase();
  const count = await Post.countDocuments({
    status: "published",
    category: { $regex: new RegExp(`^${categoryName}$`, "i") },
  });

  if (count === 0) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found on Think.",
      robots: { index: false, follow: true },
    };
  }

  // Capitalize properly
  const formattedTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/category/${encodeURIComponent(slug.toLowerCase())}`;

  return {
    title: `${formattedTitle} Articles & Editorial Guides`,
    description: `Browse all in-depth articles, guides, and critical analyses in ${formattedTitle} published on Think.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${formattedTitle} | ${siteConfig.name}`,
      description: `In-depth ${formattedTitle} analyses, guides, and tutorials on Think.`,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${formattedTitle} | ${siteConfig.name}`,
      description: `In-depth ${formattedTitle} analyses and guides on Think.`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const categoryParam = decodeURIComponent(slug);

  await connectToDatabase();

  // Find posts matching category case-insensitively
  const posts = await Post.find({
    status: "published",
    category: { $regex: new RegExp(`^${categoryParam}$`, "i") },
  })
    .sort({ createdAt: -1 })
    .lean();

  if (!posts || posts.length === 0) {
    return notFound();
  }

  const categoryName = posts[0].category;
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/category/${encodeURIComponent(slug.toLowerCase())}`;

  // Get all active categories with published posts for filter pills
  const allCategoriesRaw = await Post.distinct("category", { status: "published" });

  const serialize = (post) => ({
    ...post,
    _id: post._id.toString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt ? post.updatedAt.toISOString() : post.createdAt.toISOString(),
  });

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} Articles`,
    description: `All published articles in ${categoryName} on ${siteConfig.name}`,
    url: canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
    },
  };

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
        name: categoryName,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-[#faf8ff] pt-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#767585] mb-6 font-medium">
            <Link href="/" className="hover:text-[#4648d4] transition-colors">Home</Link>
            <span className="text-[#c7c4d7]">/</span>
            <span className="text-[#131b2e] font-semibold">{categoryName}</span>
          </nav>

          {/* Category Header */}
          <header className="mb-8 sm:mb-12 border-b border-[#c7c4d7]/30 pb-6 sm:pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaedff] text-[#4648d4] mb-3 text-[11px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4648d4]" />
              Editorial Collection
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#131b2e] tracking-tight mb-3"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {categoryName}
            </h1>
            <p className="text-sm sm:text-base text-[#464554] max-w-2xl leading-relaxed">
              Explore in-depth articles, practical tutorials, and curated field guides in {categoryName}.
            </p>
            <div className="mt-4 text-xs font-semibold text-[#767585]">
              {posts.length} {posts.length === 1 ? "article" : "articles"} available
            </div>
          </header>

          {/* Category Nav Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            <Link
              href="/"
              className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide bg-[#eaedff] text-[#464554] hover:bg-[#e2e7ff] hover:text-[#131b2e] transition-colors whitespace-nowrap"
            >
              All Articles
            </Link>
            {allCategoriesRaw.map((cat) => {
              const isActive = cat.toLowerCase() === categoryParam.toLowerCase();
              return (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase()}`}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-[#4648d4] text-white shadow-sm"
                      : "bg-[#eaedff] text-[#464554] hover:bg-[#e2e7ff] hover:text-[#131b2e]"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {/* Post Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-16">
            {posts.map((post) => (
              <PostCard key={post._id} post={serialize(post)} />
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
