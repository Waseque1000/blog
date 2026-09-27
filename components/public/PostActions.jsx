"use client";

import { useState, useEffect } from "react";

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
      try { await navigator.share({ title, text: excerpt, url: window.location.href }); }
      catch (err) { console.error("Share error", err); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 py-10 mt-10 border-t border-[#c7c4d7]/30">
      <button
        onClick={handleLike}
        disabled={hasLiked}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
          hasLiked
            ? "bg-[#ffdada] text-[#e21e49] border border-[#e21e49]/20 cursor-default"
            : "bg-[#eaedff] text-[#464554] border border-[#c7c4d7]/30 hover:bg-[#e2e7ff] hover:text-[#131b2e]"
        }`}
      >
        <span className="material-symbols-outlined text-[18px]" style={hasLiked ? { fontVariationSettings: "'FILL' 1" } : {}}>favorite</span>
        {likes} {likes === 1 ? "Like" : "Likes"}
      </button>

      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#eaedff] text-[#464554] border border-[#c7c4d7]/30 hover:bg-[#e2e7ff] hover:text-[#131b2e] transition-all"
      >
        <span className="material-symbols-outlined text-[18px]">share</span>
        {copied ? "Copied!" : "Share"}
      </button>

      <button className="p-2.5 rounded-full bg-[#eaedff] text-[#464554] border border-[#c7c4d7]/30 hover:bg-[#e2e7ff] hover:text-[#4648d4] transition-all">
        <span className="material-symbols-outlined text-[18px]">bookmark</span>
      </button>
    </div>
  );
}
