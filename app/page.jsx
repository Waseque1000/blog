import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import PostCard from "@/components/public/PostCard";
import Link from "next/link";
import { FiArrowRight, FiTrendingUp } from "react-icons/fi";

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
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Hero Section */}
      {!category && mainFeatured && (
        <section className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium text-emerald-400 uppercase tracking-wider">Featured Story</span>
            </div>
            <PostCard post={serialize(mainFeatured)} featured={true} />
          </div>
        </section>
      )}

      {/* Category Filter + Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">

        {/* Category Pills */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {allCategories.map(cat => {
            const isActive = (!category && cat === "All") || category === cat;
            return (
              <Link
                key={cat}
                href={cat === "All" ? "/" : `/?category=${cat}`}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-emerald-500 text-black"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiTrendingUp className="w-5 h-5 text-emerald-400" />
            {category ? category : "Latest Stories"}
          </h2>
          <span className="text-sm text-gray-500">{displayPosts.length} articles</span>
        </div>

        {/* Posts Grid */}
        {displayPosts.length === 0 ? (
          <div className="text-center py-24 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-xl font-bold text-white mb-2">No stories found</p>
            <p className="text-gray-500">Try selecting a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPosts.map(post => (
              <PostCard key={post._id} post={serialize(post)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
