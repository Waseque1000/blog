import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import PostCard from "@/components/public/PostCard";
import { FiSearch } from "react-icons/fi";

export const metadata = { title: "Search - DailyBlog" };
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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Search</h1>
          <p className="text-gray-500 mb-8">Find articles by title, content, or category</p>
          <form action="/search" method="GET" className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              name="q"
              defaultValue={queryParam}
              placeholder="Search articles..."
              className="w-full pl-14 pr-28 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-lg transition-all"
            />
            <button
              type="submit"
              className="absolute inset-y-2 right-2 px-6 bg-emerald-500 text-black rounded-full font-bold text-sm hover:bg-emerald-400 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        {queryParam && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">
                Results for &ldquo;{queryParam}&rdquo;
              </h2>
              <span className="text-sm text-gray-500">{posts.length} found</span>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-24 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-xl font-bold text-white mb-2">No results</p>
                <p className="text-gray-500">Try a different search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
