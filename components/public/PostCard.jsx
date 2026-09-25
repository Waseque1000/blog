"use client";

import Link from "next/link";
import { FiHeart, FiShare2, FiClock, FiEye } from "react-icons/fi";
import { format } from "date-fns";

export default function PostCard({ post, featured = false }) {
  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: `/post/${post.slug}`,
        });
      } catch (err) {
        console.error("Share error", err);
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/post/${post.slug}`);
    }
  };

  if (featured) {
    return (
      <Link href={`/post/${post.slug}`} className="group block">
        <article className="relative rounded-2xl overflow-hidden bg-[#111] border border-white/10 hover:border-emerald-500/30 transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-500 text-black rounded-full">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-gray-500 text-sm mb-4">
                <span className="flex items-center gap-1">
                  <FiClock className="w-3.5 h-3.5" />
                  {format(new Date(post.createdAt), "MMM d, yyyy")}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <FiEye className="w-3.5 h-3.5" />
                  {post.views || 0}
                </span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                {post.title}
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed line-clamp-3 mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black font-bold text-sm">
                    {post.author?.charAt(0)?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-300">{post.author}</span>
                </div>
                <span className="text-sm text-emerald-400 font-medium group-hover:translate-x-1 transition-transform">
                  Read more →
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/post/${post.slug}`} className="group block h-full">
      <article className="h-full rounded-xl overflow-hidden bg-[#111] border border-white/10 hover:border-emerald-500/30 transition-all duration-500 flex flex-col">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur-sm text-white rounded-full border border-white/20">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-3 text-gray-500 text-xs mb-3">
            <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
            <span>·</span>
            <span>{post.views || 0} views</span>
          </div>

          <h3 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black font-bold text-[10px]">
                {post.author?.charAt(0)?.toUpperCase()}
              </div>
              <span className="text-xs text-gray-400 font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <span className="flex items-center gap-1 text-xs">
                <FiHeart className="w-3.5 h-3.5" /> {post.likes || 0}
              </span>
              <button
                onClick={handleShare}
                className="hover:text-white transition-colors"
              >
                <FiShare2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
