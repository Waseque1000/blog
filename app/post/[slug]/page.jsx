import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import { notFound } from "next/navigation";
import Link from "next/link";
import PostActions from "@/components/public/PostActions";

export async function generateMetadata({ params }) {
  await connectToDatabase();
  const { slug } = await params;
  const post = await Post.findOne({ slug, status: "published" }).lean();
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — Kronikl`,
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
    { returnDocument: 'after' }
  ).lean();

  if (!post) return notFound();

  const relatedPosts = await Post.find({
    category: post.category,
    _id: { $ne: post._id },
    status: "published",
  }).sort({ createdAt: -1 }).limit(3).lean();

  const dateStr = new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <article className="bg-[#faf8ff] min-h-screen pt-16">
      {/* Hero Image */}
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden bg-[#131b2e]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/90 via-[#131b2e]/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium mb-6 transition-colors">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back to Feed
            </Link>
            <div className="mb-4">
              <span className="px-3 py-1 rounded-full bg-[#e21e49] text-white text-[11px] font-semibold uppercase tracking-wider">{post.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4648d4] to-[#6063ee] flex items-center justify-center text-white font-bold text-xs">
                  {post.author?.charAt(0)?.toUpperCase()}
                </div>
                <span className="text-white font-medium">{post.author}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                {dateStr}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                {post.views} views
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-a:text-[#4648d4] hover:prose-a:text-[#6063ee]
            prose-p:text-[#464554] prose-p:leading-relaxed
            prose-strong:text-[#131b2e]
            prose-blockquote:border-l-[#4648d4] prose-blockquote:text-[#464554]
            prose-code:text-[#4648d4] prose-code:bg-[#e1e0ff] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-img:rounded-2xl prose-img:shadow-md"
          style={{ fontFamily: "'Geist', system-ui, sans-serif" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <PostActions
          postId={post._id.toString()}
          initialLikes={post.likes || 0}
          title={post.title}
          slug={post.slug}
          excerpt={post.excerpt}
        />
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-[#c7c4d7]/30 bg-white">
          <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-16">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-[#4648d4] uppercase tracking-widest">Related</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c7c4d7]" />
              <span className="text-[11px] text-[#464554]">More from {post.category}</span>
            </div>
            <h3 className="text-2xl font-bold text-[#131b2e] tracking-tight mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Continue Reading
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(rp => (
                <Link key={rp._id} href={`/post/${rp.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#c7c4d7]/20">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e2e7ff] text-[#4648d4] text-[11px] font-semibold">{rp.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-semibold text-[#131b2e] line-clamp-2 group-hover:text-[#4648d4] transition-colors leading-snug" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {rp.title}
                    </h4>
                    <div className="text-[11px] text-[#464554] mt-2">{new Date(rp.createdAt).toLocaleDateString()}</div>
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
