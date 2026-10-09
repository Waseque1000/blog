import { getAllPosts, getAllCategories } from "@/lib/posts";
import PostCard from "@/components/public/PostCard";
import Link from "next/link";
import { getBaseUrl, siteConfig } from "@/lib/seo";

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
};

export default function HomePage() {
  const posts = getAllPosts();
  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  const mainFeatured = featuredPosts.length > 0 ? featuredPosts[0] : null;
  const displayPosts = mainFeatured
    ? posts.filter((p) => p._id !== mainFeatured._id)
    : posts;

  const allCategories = ["All", ...getAllCategories()];

  const baseUrl = getBaseUrl();
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Latest Technology & Developer Insights",
    description: siteConfig.description,
    itemListElement: posts.slice(0, 10).map((post, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: post.title,
      url: `${baseUrl}/post/${post.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="relative w-full max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 overflow-hidden">

        {/* Ambient glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-tr from-[#4648d4]/10 via-[#c7c4d7]/40 to-transparent blur-[120px] -z-10 pointer-events-none rounded-full" />

        {/* Hero / Masthead */}
        <section className="pt-8 pb-6 sm:pt-12 sm:pb-8 md:pt-16 md:pb-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e2e7ff] text-[#4648d4] mb-3 sm:mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#4648d4] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">Curated Editorial Feed</span>
            </div>
            <h1
              className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold max-w-4xl text-[#131b2e] tracking-tight mb-3 leading-tight sm:leading-snug md:leading-[62px]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.03em' }}
            >
              Stories worth reading. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#4648d4] via-[#6063ee] to-[#0284c7] bg-clip-text text-transparent">
                Ideas worth sharing.
              </span>
            </h1>
            <p className="text-xs sm:text-base md:text-lg text-[#464554] max-w-2xl mx-auto mb-5 sm:mb-8 leading-relaxed px-1 sm:px-2">
              Discover thoughtful perspectives, deep technical dives, and visual stories curated from independent thinkers across the digital vanguard.
            </p>

            {/* Search Input Bar */}
            <div className="w-full max-w-2xl relative mb-5 sm:mb-6 group px-1 sm:px-0">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4648d4]/20 via-[#00628d]/20 to-[#ba0035]/20 rounded-full blur-md opacity-40 group-focus-within:opacity-100 transition duration-300" />
              <form action="/search" method="GET" className="relative flex items-center bg-white rounded-full shadow-md px-2.5 sm:px-4 py-1.5 sm:py-2.5 border border-[#c7c4d7]/30">
                <span className="material-symbols-outlined text-[#767586] text-[18px] sm:text-[22px] ml-1">search</span>
                <input
                  name="q"
                  className="w-full bg-transparent text-xs sm:text-base text-[#131b2e] placeholder:text-[#767586] px-2 sm:px-3 focus:outline-none"
                  placeholder="Search tech articles, coding tutorials, and guides..."
                  type="text"
                />
                <button
                  type="submit"
                  className="bg-[#131b2e] text-white hover:bg-[#4648d4] transition-all duration-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-semibold flex items-center gap-1 shrink-0"
                >
                  <span>Find</span>
                  <span className="material-symbols-outlined text-[14px] sm:text-[15px]">arrow_forward</span>
                </button>
              </form>
            </div>
          </section>

        {/* Category Filter Pills - Horizontally scrollable on mobile */}
        <div className="relative mb-6 sm:mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full justify-start md:justify-center py-2 px-1 scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
            {allCategories.map((cat) => {
              const isActive = cat === "All";
              return (
                <Link
                  key={cat}
                  href={cat === "All" ? "/" : `/category/${encodeURIComponent(cat.toLowerCase())}`}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-bold tracking-wide transition-all duration-200 shrink-0 ${
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
        </div>

        {/* Featured Post Card */}
        {mainFeatured && (
          <section className="my-6 sm:my-8">
            <PostCard post={mainFeatured} featured={true} />
          </section>
        )}

        {/* Feed Header */}
        <section className="mt-8 sm:mt-12 mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#c7c4d7]/30 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#4648d4] uppercase tracking-widest">Feed Stream</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c7c4d7]" />
              <span className="text-[10px] sm:text-[11px] text-[#767585]">Live Editorial Feed</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#131b2e] tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
            >
              Recent Dispatches
            </h2>
          </div>
          <span className="text-xs sm:text-sm text-[#767585] font-medium">{posts.length} articles</span>
        </section>

        {/* Post Grid (1 col on mobile, 2 on tablet, 3 on desktop) */}
        {displayPosts.length === 0 ? (
          <div className="text-center py-16 sm:py-24 bg-white rounded-2xl shadow-sm border border-[#c7c4d7]/30 px-4">
            <span className="material-symbols-outlined text-[48px] sm:text-[60px] text-[#c7c4d7] mb-3 block">search_off</span>
            <p className="text-lg sm:text-xl font-bold text-[#131b2e] mb-1">No stories found</p>
            <p className="text-xs sm:text-sm text-[#464554]">Try selecting a different category or clearing search filters.</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {displayPosts.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </section>
        )}

        {/* Newsletter Banner */}
        <section className="my-8 sm:my-14 bg-gradient-to-r from-[#283044] via-[#283044] to-[#131b2e] text-[#eef0ff] rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#4648d4]/20 blur-3xl pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#c0c1ff] text-[10px] sm:text-[11px] font-semibold mb-3">
                  <span className="material-symbols-outlined text-[15px]">mail</span>
                  <span>Sunday Morning Salon</span>
                </div>
                <h2
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-2 leading-snug"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  The intellectual diet you actually look forward to.
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-xl leading-relaxed">
                  A weekly collection of extraordinary essays and visual features. Uncluttered. Zero sponsor bloat.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="flex flex-col sm:flex-row gap-2 bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/10">
                  <input
                    className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm text-white placeholder:text-gray-400 focus:outline-none"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <button className="bg-[#4648d4] hover:bg-[#3b3dbb] text-white text-xs sm:text-[13px] font-bold px-5 py-2.5 rounded-xl transition whitespace-nowrap flex items-center justify-center gap-1.5 shadow-sm">
                    <span>Subscribe</span>
                    <span className="material-symbols-outlined text-[16px]">send</span>
                  </button>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 mt-3 ml-1 text-gray-400 text-[10px] sm:text-[11px]">
                  <span>• <Link href="/privacy" className="hover:underline">Privacy Policy</Link></span>
                  <span>• Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </section>
      </div>
    </div>
  );
}
