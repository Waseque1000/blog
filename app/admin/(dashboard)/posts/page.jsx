import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import PostTable from "@/components/admin/PostTable";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export const metadata = {
  title: "Manage Posts - Admin",
};

export default async function AdminPostsPage() {
  await connectToDatabase();
  
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .lean();

  // Convert ObjectIds and Dates to strings for passing to Client Component
  const serializedPosts = posts.map(post => ({
    ...post,
    _id: post._id.toString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
          <p className="text-gray-500 mt-1">Manage your blog content.</p>
        </div>
        <Link 
          href="/admin/posts/create"
          className="inline-flex items-center justify-center space-x-2 bg-black text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          <span>Create Post</span>
        </Link>
      </div>

      <PostTable initialPosts={serializedPosts} />
    </div>
  );
}
