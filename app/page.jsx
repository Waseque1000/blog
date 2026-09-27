import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import PostCard from "@/components/public/PostCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }) {
  await connectToDatabase();

  const resolvedParams = await searchParams;
  const category = resolvedParams?.category;

  const query = { status: "published" };
  if (category) query.category = category;

  const posts = await Post.find(query).sort({ createdAt: -1 }).lean();
  const featuredPosts = posts.filter(p => p.featured);
  const regularPosts = posts.filter(p => !p.featured);

  const mainFeatured = !category && featuredPosts.length > 0 ? featuredPosts[0] : null;
  const displayPosts = mainFeatured ? regularPosts : posts;

  const serialize = (post) => ({
    ...post,
    _id: post._id.toString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  });

  const allCategories = ["All", "Technology", "Programming", "Lifestyle", "Travel", "Education", "Tutorial"];

  return (
    <div className="min-h-screen bg-[#faf8ff] pt-16">
      <div className="relative w-full max-w-[1320px] mx-auto px-4 md:px-8 overflow-hidden">

        {/* Ambient glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-tr from-[#4648d4]/10 via-[#c7c4d7]/40 to-transparent blur-[120px] -z-10 pointer-events-none rounded-full" />

        {/* Hero / Masthead */}
        {!category && (
          <section className="pt-10 pb-6 md:pt-16 md:pb-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e2e7ff] text-[#4648d4] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#e21e49] animate-pulse" />
              <span className="text-[11px] font-semibold tracking-wider uppercase">Curated Editorial Feed</span>
            </div>
            <h1 className="text-4xl md:text-[56px] md:leading-[64px] font-extrabold max-w-4xl text-[#131b2e] tracking-tight mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.03em' }}>
              Stories worth reading. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#4648d4] via-[#6063ee] to-[#ba0035] bg-clip-text text-transparent">Ideas worth sharing.</span>
            </h1>
            <p className="text-lg text-[#464554] max-w-2xl mx-auto mb-8 leading-relaxed" style={{ letterSpacing: '-0.005em' }}>
              Discover thoughtful perspectives, deep technical dives, and visual stories curated from independent thinkers across the digital vanguard.
            </p>

            {/* Search */}
            <div className="w-full max-w-2xl relative mb-6 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4648d4]/20 via-[#00628d]/20 to-[#ba0035]/20 rounded-full blur-md opacity-40 group-focus-within:opacity-100 transition duration-300" />
              <form action="/search" method="GET" className="relative flex items-center bg-white rounded-full shadow-md px-4 py-2.5">
                <span className="material-symbols-outlined text-[#767586] text-[22px] ml-1">search</span>
                <input
                  name="q"
                  className="w-full bg-transparent text-base text-[#131b2e] placeholder:text-[#767586] px-3 focus:outline-none"
                  placeholder="Search essays, authors, or ideas..."
                  type="text"
                />
                <button type="submit" className="bg-[#131b2e] text-white hover:bg-[#4648d4] hover:text-white transition-all duration-200 px-4 py-2 rounded-full text-[13px] font-semibold flex items-center gap-1 shrink-0">
                  <span>Find</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </form>
            </div>
          </section>
        )}

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full justify-start md:justify-center py-2 mb-6 scrollbar-hide">
          {allCategories.map(cat => {
            const isActive = (!category && cat === "All") || category === cat;
            return (
              <Link
                key={cat}
                href={cat === "All" ? "/" : `/?category=${cat}`}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 shrink-0 ${
                  isActive
                    ? "bg-[#4648d4] text-white shadow-sm"
                    : "bg-[#eaedff] text-[#464554] hover:bg-[#e2e7ff]"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Featured Post */}
        {mainFeatured && !category && (
          <section className="my-6">
            <PostCard post={serialize(mainFeatured)} featured={true} />
          </section>
        )}

        {/* Feed Header */}
        <section className="mt-10 mb-4 flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-[#4648d4] uppercase tracking-widest">Feed Stream</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c7c4d7]" />
              <span className="text-[11px] text-[#464554]">Live Community Pulse</span>
            </div>
            <h2 className="text-3xl font-bold text-[#131b2e] tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>
              {category ? category : "Recent Dispatches"}
            </h2>
          </div>
          <span className="text-sm text-[#464554]">{displayPosts.length} articles</span>
        </section>

        {/* Post Grid */}
        {displayPosts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-[#c7c4d7]/30">
            <span className="material-symbols-outlined text-[60px] text-[#c7c4d7] mb-4 block">search_off</span>
            <p className="text-xl font-bold text-[#131b2e] mb-2">No stories found</p>
            <p className="text-[#464554]">Try selecting a different category.</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {displayPosts.map(post => (
              <PostCard key={post._id} post={serialize(post)} />
            ))}
          </section>
        )}

        {/* Newsletter Banner */}
        {!category && (
          <section className="my-12 bg-gradient-to-r from-[#283044] via-[#283044] to-[#131b2e] text-[#eef0ff] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#4648d4]/20 blur-3xl pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#c0c1ff] text-[11px] font-semibold mb-3">
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                  <span>Sunday Morning Salon</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  The intellectual diet you actually look forward to.
                </h2>
                <p className="text-base text-gray-400 max-w-xl">
                  A weekly collection of extraordinary essays and visual features. Uncluttered. Zero sponsor bloat.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="flex flex-col sm:flex-row gap-2 bg-white/10 p-2 rounded-2xl backdrop-blur-md">
                  <input className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none" placeholder="Enter your email" type="email" />
                  <button className="bg-[#4648d4] hover:bg-[#6063ee] text-white text-[13px] font-semibold px-6 py-3 rounded-xl transition whitespace-nowrap flex items-center justify-center gap-1.5">
                    <span>Subscribe</span>
                    <span className="material-symbols-outlined text-[16px]">send</span>
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-3 ml-2 text-gray-500 text-[11px]">
                  <span>• Join 42,000+ readers</span>
                  <span>• Unsubscribe in 1-click</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
