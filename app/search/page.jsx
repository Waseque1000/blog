import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import PostCard from "@/components/public/PostCard";

export const metadata = {
  title: "Search Articles",
  description: "Search across hundreds of tech analyses, AI developments, and coding tutorials on Think.",
  robots: {
    index: false,
    follow: true,
  },
};
export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }) {
  await connectToDatabase();
  const resolvedParams = await searchParams;
  const queryParam = resolvedParams?.q || "";

  let posts = [];
  if (queryParam) {
    posts = await Post.find({
      status: "published",
      $or: [
        { title: { $regex: queryParam, $options: "i" } },
        { content: { $regex: queryParam, $options: "i" } },
        { category: { $regex: queryParam, $options: "i" } },
      ],
    }).sort({ createdAt: -1 }).lean();
  }

  const serialize = (post) => ({
    ...post,
    _id: post._id.toString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  });

  return (
    <div className="min-h-screen bg-[#faf8ff] pt-16">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-16 md:py-20">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#131b2e] mb-2 sm:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.03em' }}>
            Search
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#464554] mb-6 sm:mb-8">Find articles by title, content, or category</p>

          {/* Search with ambient glow */}
          <div className="relative group px-1 sm:px-0">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4648d4]/20 via-[#00628d]/20 to-[#ba0035]/20 rounded-full blur-md opacity-40 group-focus-within:opacity-100 transition duration-300" />
            <form action="/search" method="GET" className="relative flex items-center bg-white rounded-full shadow-md px-3 sm:px-4 py-2 sm:py-2.5 border border-[#c7c4d7]/30">
              <span className="material-symbols-outlined text-[#767586] text-[20px] sm:text-[22px] ml-1">search</span>
              <input
                type="text"
                name="q"
                defaultValue={queryParam}
                placeholder="Search essays, guides, or ideas..."
                className="w-full bg-transparent text-sm sm:text-base text-[#131b2e] placeholder:text-[#767586] px-2.5 sm:px-3 focus:outline-none"
              />
              <button type="submit" className="bg-[#131b2e] text-white hover:bg-[#4648d4] transition-all px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-[13px] font-semibold flex items-center gap-1 shrink-0">
                <span>Find</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>

        {/* Results */}
        {queryParam && (
          <div>
            <div className="flex items-center justify-between mb-6 sm:mb-8 border-b border-[#c7c4d7]/30 pb-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#131b2e]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Results for &ldquo;{queryParam}&rdquo;
              </h2>
              <span className="text-xs sm:text-sm text-[#767585] font-medium">{posts.length} found</span>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-16 sm:py-24 bg-white rounded-2xl shadow-sm border border-[#c7c4d7]/30 px-4">
                <span className="material-symbols-outlined text-[48px] sm:text-[60px] text-[#c7c4d7] mb-3 block">search_off</span>
                <p className="text-lg sm:text-xl font-bold text-[#131b2e] mb-1">No results</p>
                <p className="text-xs sm:text-sm text-[#464554]">Try a different search term or explore categories.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {posts.map(post => (
                  <PostCard key={post._id} post={serialize(post)} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
