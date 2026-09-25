"use client";

import Link from "next/link";
import { useState } from "react";
import { FiEdit2, FiTrash2, FiExternalLink } from "react-icons/fi";

export default function PostTable({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [isDeleting, setIsDeleting] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(posts.filter((p) => p._id !== id));
      } else {
        alert("Failed to delete post.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
              <th className="px-6 py-4 font-medium">Image</th>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Views / Likes</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  No posts found. <Link href="/admin/posts/create" className="text-black font-medium underline">Create one</Link>
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <img 
                      src={post.image || "https://placehold.co/100x100?text=No+Image"} 
                      alt={post.title} 
                      className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate" title={post.title}>
                    {post.title}
                    {post.featured && (
                      <span className="ml-2 inline-flex px-2 py-0.5 text-[10px] font-bold rounded bg-purple-100 text-purple-700">
                        FEATURED
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{post.category}</td>
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
                    {post.views || 0} / {post.likes || 0}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link 
                      href={`/post/${post.slug}`}
                      target="_blank"
                      className="inline-flex p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                      title="View Public Page"
                    >
                      <FiExternalLink className="w-4 h-4" />
                    </Link>
                    <Link 
                      href={`/admin/posts/${post._id}/edit`}
                      className="inline-flex p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      disabled={isDeleting === post._id}
                      className="inline-flex p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
