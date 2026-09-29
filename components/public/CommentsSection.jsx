"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMessageSquare, FiSend, FiUser, FiCheckCircle } from "react-icons/fi";

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const AVATAR_GRADIENTS = [
  "from-indigo-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-violet-500 to-fuchsia-600",
];

function getGradient(name) {
  let hash = 0;
  for (let i = 0; i < (name || "").length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}

function formatDate(isoString) {
  try {
    const d = new Date(isoString);
    const now = new Date();
    const diffSec = Math.floor((now - d) / 1000);

    if (diffSec < 45) return "Just now";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)} min ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;

    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  } catch {
    return "";
  }
}

export default function CommentsSection({ postId, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [author, setAuthor] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return localStorage.getItem("think_commenter_name") || localStorage.getItem("kronikl_commenter_name") || "";
    } catch {
      return "";
    }
  });
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const trimmedAuthor = author.trim();
    const trimmedContent = content.trim();

    if (!trimmedAuthor) {
      setError("Please enter your name");
      return;
    }
    if (!trimmedContent) {
      setError("Please write a comment before submitting");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: trimmedAuthor,
          content: trimmedContent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to post comment");
      }

      // Prepend newly posted comment
      setComments((prev) => [data, ...prev]);
      setContent("");
      setSuccessMessage("Comment published!");

      // Save name for convenience
      try {
        localStorage.setItem("think_commenter_name", trimmedAuthor);
      } catch {}

      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err) {
      setError(err.message || "Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-14 pt-10 border-t border-[#c7c4d7]/30" id="comments">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#e2e7ff] text-[#4648d4] flex items-center justify-center">
            <FiMessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3
              className="text-xl md:text-2xl font-bold text-[#131b2e] tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Discussion
            </h3>
            <p className="text-xs text-[#767585]">
              {comments.length === 1
                ? "1 thought shared"
                : `${comments.length} thoughts shared`}
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#eaedff] text-[#4648d4] text-xs font-semibold">
          {comments.length}
        </span>
      </div>

      {/* Comment Form */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-7 border border-[#c7c4d7]/30 shadow-sm mb-8 sm:mb-10 transition-all focus-within:border-[#4648d4]/50 focus-within:shadow-md">
        <h4 className="text-sm font-semibold text-[#131b2e] mb-4 flex items-center gap-2">
          <span>Leave a reply</span>
          <span className="text-xs font-normal text-[#767585]">&bull; No registration needed</span>
        </h4>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="comment-author" className="block text-xs font-semibold text-[#464554] mb-1.5">
              Your Name or Nickname <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <FiUser className="w-4 h-4" />
              </span>
              <input
                id="comment-author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                maxLength={60}
                placeholder="e.g. Tanvir Ahmed"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf8ff] border border-[#c7c4d7]/40 text-sm text-[#131b2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4648d4]/20 focus:border-[#4648d4] transition"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="comment-content" className="block text-xs font-semibold text-[#464554]">
                Comment <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-gray-400">
                {content.length}/1500
              </span>
            </div>
            <textarea
              id="comment-content"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={1500}
              placeholder="What are your thoughts on this? Ask questions, share your experience, or give feedback..."
              className="w-full p-3.5 rounded-xl bg-[#faf8ff] border border-[#c7c4d7]/40 text-sm text-[#131b2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4648d4]/20 focus:border-[#4648d4] transition resize-y"
              disabled={isSubmitting}
            />
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-2">
              <FiCheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
            <span className="text-[11px] text-[#767585]">
              By posting, you agree to our <Link href="/privacy" className="underline hover:text-[#4648d4]">Privacy Policy</Link>.
            </span>
            <button
              type="submit"
              disabled={isSubmitting || !author.trim() || !content.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#4648d4] hover:bg-[#3b3dbb] text-white text-xs font-semibold shadow-sm hover:shadow transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <FiSend className="w-3.5 h-3.5" />
                  <span>Post Comment</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-white/70 border border-dashed border-[#c7c4d7]/60">
            <div className="w-12 h-12 rounded-full bg-[#eaedff] text-[#4648d4] flex items-center justify-center mx-auto mb-3">
              <FiMessageSquare className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-[#131b2e] mb-1">
              No comments yet
            </p>
            <p className="text-xs text-[#767585] max-w-sm mx-auto">
              Be the first to share your thoughts, questions, or recommendations on this guide.
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-white rounded-2xl p-5 md:p-6 border border-[#c7c4d7]/30 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${getGradient(
                    comment.author
                  )} text-white flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-sm`}
                >
                  {getInitials(comment.author)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-sm font-semibold text-[#131b2e] truncate">
                      {comment.author}
                    </span>
                    <span className="text-[11px] text-[#767585] flex-shrink-0" suppressHydrationWarning>
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <div className="text-sm text-[#464554] leading-relaxed whitespace-pre-line break-words">
                    {comment.content}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
