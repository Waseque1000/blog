"use client";

import { useState, useEffect } from "react";

export default function PostActions({ postId, initialLikes, title, excerpt, slug, canonicalUrl = "" }) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [copiedType, setCopiedType] = useState(null); // 'url' | 'citation' | null
  const [currentUrl, setCurrentUrl] = useState(canonicalUrl);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

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

  const activeUrl = currentUrl || canonicalUrl;

  const handleCopyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(activeUrl);
      setCopiedType("url");
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  const handleCopyCitation = () => {
    if (navigator?.clipboard) {
      const markdownCitation = `[${title}](${activeUrl}) — via Think`;
      navigator.clipboard.writeText(markdownCitation);
      setCopiedType("citation");
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(activeUrl)}&via=think_tech`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(activeUrl)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(activeUrl)}&title=${encodeURIComponent(title)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${activeUrl}`)}`,
  };

  return (
    <div className="py-10 mt-10 border-t border-[#c7c4d7]/30">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Like & Comment Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            disabled={hasLiked}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              hasLiked
                ? "bg-[#ffdada] text-[#e21e49] border border-[#e21e49]/20 cursor-default"
                : "bg-[#eaedff] text-[#464554] border border-[#c7c4d7]/30 hover:bg-[#e2e7ff] hover:text-[#131b2e] active:scale-95"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]" style={hasLiked ? { fontVariationSettings: "'FILL' 1" } : {}}>
              favorite
            </span>
            <span>{likes} {likes === 1 ? "Like" : "Likes"}</span>
          </button>

          <a
            href="#comments"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#eaedff] text-[#464554] border border-[#c7c4d7]/30 hover:bg-[#e2e7ff] hover:text-[#131b2e] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">
              chat_bubble
            </span>
            <span>Comment</span>
          </a>
        </div>

        {/* Social Share & Backlink Helpers */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Share on X */}
          <a
            href={shareUrls.twitter}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on X (Twitter)"
            className="p-2.5 rounded-full bg-[#eaedff] text-[#464554] hover:bg-[#131b2e] hover:text-white transition-all flex items-center justify-center text-xs font-bold w-10 h-10 border border-[#c7c4d7]/30"
          >
            𝕏
          </a>

          {/* Share on LinkedIn */}
          <a
            href={shareUrls.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on LinkedIn"
            className="p-2.5 rounded-full bg-[#eaedff] text-[#464554] hover:bg-[#0077b5] hover:text-white transition-all flex items-center justify-center text-xs font-bold w-10 h-10 border border-[#c7c4d7]/30"
          >
            in
          </a>

          {/* Share on Reddit */}
          <a
            href={shareUrls.reddit}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Reddit"
            className="p-2.5 rounded-full bg-[#eaedff] text-[#464554] hover:bg-[#ff4500] hover:text-white transition-all flex items-center justify-center text-xs font-bold w-10 h-10 border border-[#c7c4d7]/30"
          >
            r/
          </a>

          {/* Copy URL */}
          <button
            onClick={handleCopyLink}
            title="Copy post link"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#eaedff] text-[#464554] border border-[#c7c4d7]/30 hover:bg-[#e2e7ff] hover:text-[#131b2e] text-xs font-semibold transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">link</span>
            {copiedType === "url" ? "Copied Link!" : "Copy Link"}
          </button>

          {/* Markdown Citation for Backlinks */}
          <button
            onClick={handleCopyCitation}
            title="Copy as Markdown Backlink for blogs/GitHub"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e1e0ff] text-[#4648d4] border border-[#4648d4]/20 hover:bg-[#4648d4] hover:text-white text-xs font-semibold transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">format_quote</span>
            {copiedType === "citation" ? "Citation Copied!" : "Cite Article"}
          </button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-[12px] text-[#767585]">
          Writing a story or research note? Use <span className="font-semibold text-[#4648d4]">Cite Article</span> to easily credit this analysis with a proper backlink.
        </p>
      </div>
    </div>
  );
}
