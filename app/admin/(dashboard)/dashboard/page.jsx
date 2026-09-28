import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";

export default async function AdminDashboard() {
  await connectToDatabase();

  const totalPosts = await Post.countDocuments();
  const publishedPosts = await Post.countDocuments({ status: "published" });
  const draftPosts = await Post.countDocuments({ status: "draft" });
  
  const allPosts = await Post.find({}, "views likes");
  const totalViews = allPosts.reduce((acc, post) => acc + (post.views || 0), 0);
  const totalLikes = allPosts.reduce((acc, post) => acc + (post.likes || 0), 0);

  const recentPosts = await Post.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .select("title status createdAt");

  const statCards = [
    { label: "Total Posts", value: totalPosts },
    { label: "Published", value: publishedPosts },
    { label: "Drafts", value: draftPosts },
    { label: "Total Views", value: totalViews },
    { label: "Total Likes", value: totalLikes },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">Welcome back, Wasee! Here is what is happening with your blog.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Recent Posts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
                <th className="px-6 py-4 font-medium">Post Title</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentPosts.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                    No posts yet. Start writing!
                  </td>
                </tr>
              ) : (
                recentPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                        post.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
