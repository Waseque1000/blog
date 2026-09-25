"use client";

import { useState, useEffect } from "react";
import { FiHeart, FiShare2, FiBookmark } from "react-icons/fi";

export default function PostActions({ postId, initialLikes, title, excerpt, slug }) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    if (likedPosts[postId]) setHasLiked(true);
  }, [postId]);

  const handleLike = async () => {
    if (hasLiked || isLiking) return;
    setIsLiking(true);
    try {
      const res = await fetch(`/api/posts/${postId}/like`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setLikes(data.likes);
        setHasLiked(true);
        const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
        likedPosts[postId] = true;
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
      }
    } catch (error) {
      console.error("Failed to like post", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: excerpt, url: window.location.href });
      } catch (err) {
        console.error("Share error", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 py-10 mt-10 border-t border-white/10">
      <button
        onClick={handleLike}
        disabled={hasLiked}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
          hasLiked
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-default"
            : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
        }`}
      >
        <FiHeart className={`w-4 h-4 ${hasLiked ? "fill-current" : ""}`} />
        {likes} {likes === 1 ? "Like" : "Likes"}
      </button>

      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
      >
        <FiShare2 className="w-4 h-4" />
        {copied ? "Copied!" : "Share"}
      </button>
    </div>
  );
}
