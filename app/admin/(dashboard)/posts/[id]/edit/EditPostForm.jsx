"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { FiSave, FiUpload } from "react-icons/fi";

export default function EditPostForm({ initialData }) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    slug: initialData.slug || "",
    category: initialData.category || "Technology",
    excerpt: initialData.excerpt || "",
    content: initialData.content || "",
    image: initialData.image || "",
    featured: initialData.featured || false,
    status: initialData.status || "draft",
  });
  const [loading, setLoading] = useState(false);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditorChange = (html) => {
    setFormData((prev) => ({ ...prev, content: html }));
  };

  const handleSubmit = async (e, submitStatus) => {
    e.preventDefault();
    setLoading(true);

    const postData = { ...formData, status: submitStatus };

    try {
      const response = await fetch(`/api/posts/${initialData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        router.push("/admin/posts");
        router.refresh();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to update post.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
        <p className="text-gray-500 mt-1">Update your article.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title..."
                required
                className="w-full text-xl px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="post-url-slug"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="Technology">Technology</option>
                  <option value="Programming">Programming</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Travel">Travel</option>
                  <option value="Education">Education</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  required
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                />
              </div>
              {formData.image && (
                <div className="mt-4 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 aspect-video relative max-w-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Short description for the homepage card..."
                rows={3}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <RichTextEditor content={formData.content} onChange={handleEditorChange} />
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                Featured Post
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, "draft")}
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <FiSave />
              <span>Save Draft</span>
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, "published")}
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <FiUpload />
              <span>Update & Publish</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
