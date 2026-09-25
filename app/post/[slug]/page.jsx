import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiEye, FiUser } from "react-icons/fi";
import PostActions from "@/components/public/PostActions";

export async function generateMetadata({ params }) {
  await connectToDatabase();
  const { slug } = await params;
  const post = await Post.findOne({ slug, status: "published" }).lean();

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} - DailyBlog`,
    description: post.excerpt,
    openGraph: { images: [post.image] },
  };
}

export default async function PostPage({ params }) {
  await connectToDatabase();
  const { slug } = await params;

  const post = await Post.findOneAndUpdate(
    { slug, status: "published" },
    { $inc: { views: 1 } },
    { new: true }
  ).lean();

  if (!post) return notFound();

  const relatedPosts = await Post.find({
    category: post.category,
    _id: { $ne: post._id },
    status: "published",
  })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <article className="bg-[#0a0a0a] min-h-screen text-white">
      {/* Hero */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium mb-6 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Feed
            </Link>

            <div className="mb-4">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-500 text-black rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black font-bold text-xs">
                  {post.author?.charAt(0)?.toUpperCase()}
                </div>
                <span className="text-white font-medium">{post.author}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <FiCalendar className="w-4 h-4" />
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <FiEye className="w-4 h-4" />
                {post.views} views
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div
          className="prose prose-lg prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-a:text-emerald-400 hover:prose-a:text-emerald-300
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-strong:text-white
            prose-blockquote:border-l-emerald-500 prose-blockquote:text-gray-400
            prose-code:text-emerald-400 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-img:rounded-xl prose-img:border prose-img:border-white/10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Actions */}
        <PostActions
          postId={post._id.toString()}
          initialLikes={post.likes || 0}
          title={post.title}
          slug={post.slug}
          excerpt={post.excerpt}
        />
      </div>

      {/* Related */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-white/10 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              More from {post.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(rp => (
                <Link
                  key={rp._id}
                  href={`/post/${rp.slug}`}
                  className="group block rounded-xl overflow-hidden bg-[#111] border border-white/10 hover:border-emerald-500/30 transition-all duration-500"
                >
                  <div className="aspect-[16/10] relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-gray-500">
                      {new Date(rp.createdAt).toLocaleDateString()}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                      {rp.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
