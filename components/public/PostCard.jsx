"use client";

import Link from "next/link";

export default function PostCard({ post, featured = false }) {
  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      try { await navigator.share({ title: post.title, text: post.excerpt, url: `/post/${post.slug}` }); }
      catch (err) { console.error(err); }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/post/${post.slug}`);
    }
  };

  const dateStr = new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  // Featured split hero card
  if (featured) {
    return (
      <Link href={`/post/${post.slug}`} className="group block">
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition duration-300">
          {/* Image column */}
          <div className="lg:col-span-7 relative group overflow-hidden min-h-[340px] md:min-h-[440px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#283044]/80 via-transparent to-transparent lg:hidden" />
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-full bg-[#e21e49] text-white text-[11px] font-semibold uppercase tracking-wider shadow-md">
                Featured Deep-Dive
              </span>
            </div>
            {/* Mobile overlay title */}
            <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
              <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider block">{post.category} • {dateStr}</span>
              <h2 className="text-xl font-bold mt-1 leading-snug">{post.title}</h2>
            </div>
          </div>

          {/* Content column */}
          <div className="lg:col-span-5 p-6 md:p-8 lg:p-10 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#e1e0ff] text-[#4648d4] text-[11px] font-semibold uppercase">{post.category}</span>
                <span className="text-[#464554] text-[11px] font-semibold">• {dateStr}</span>
              </div>
              <h2 className="text-2xl lg:text-[36px] lg:leading-[44px] font-bold text-[#131b2e] tracking-tight mb-3 group-hover:text-[#4648d4] transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>
                {post.title}
              </h2>
              <p className="text-base text-[#464554] leading-relaxed line-clamp-3 mb-6">
                {post.excerpt}
              </p>
            </div>

            {/* Author + Actions */}
            <div>
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#4648d4] to-[#6063ee] flex items-center justify-center text-white font-bold text-sm ring-2 ring-[#4648d4]/20">
                    {post.author?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-[#131b2e]">{post.author}</div>
                    <div className="text-[11px] text-[#464554]">Author</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#eaedff] text-[#464554] hover:bg-[#e1e0ff] hover:text-[#e21e49] transition-colors" onClick={(e) => e.preventDefault()}>
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                    <span className="text-[11px] font-semibold">{post.likes || 0}</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <span className="flex-1 bg-[#4648d4] text-white hover:bg-[#6063ee] px-4 py-3 rounded-full text-[13px] font-bold text-center flex items-center justify-center gap-2 shadow-md transition-all">
                  Read Story
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </span>
                <button onClick={handleShare} className="p-3 rounded-full bg-[#eaedff] text-[#131b2e] hover:bg-[#e2e7ff] transition-colors">
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Instagram-style feed card
  return (
    <Link href={`/post/${post.slug}`} className="group block h-full">
      <article className="h-full flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Instagram-style header */}
        <div className="px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4648d4] to-[#6063ee] flex items-center justify-center text-white font-bold text-xs ring-2 ring-[#4648d4]/20">
              {post.author?.charAt(0)?.toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#131b2e]">{post.author}</span>
              <span className="text-[11px] text-[#464554]">Author</span>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#e2e7ff] text-[#4648d4] text-[11px] font-semibold">{post.category}</span>
        </div>

        {/* 16:10 Cover */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#eaedff]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#283044]/80 text-[#eef0ff] text-[11px] font-semibold backdrop-blur-sm">
            {post.views || 0} views
          </div>
        </div>

        {/* Body */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#131b2e] tracking-tight line-clamp-2 mb-2 group-hover:text-[#4648d4] transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.01em', lineHeight: '28px' }}>
              {post.title}
            </h3>
            <p className="text-sm text-[#464554] line-clamp-2 mb-4" style={{ lineHeight: '20px' }}>
              {post.excerpt}
            </p>
          </div>

          {/* Social bar */}
          <div>
            <div className="flex items-center justify-between pt-3 text-[#464554]">
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 hover:text-[#e21e49] transition-colors" onClick={(e) => e.preventDefault()}>
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                  <span className="text-[11px] font-semibold">{post.likes || 0}</span>
                </button>
                <button onClick={handleShare} className="hover:text-[#4648d4] transition-colors">
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
              </div>
              <button className="hover:text-[#4648d4] transition-colors" onClick={(e) => e.preventDefault()}>
                <span className="material-symbols-outlined text-[20px]">bookmark</span>
              </button>
            </div>
            <div className="text-[11px] text-[#464554] mt-2">{dateStr} • {post.views || 0} views</div>
          </div>
        </div>
      </article>
    </Link>
  );
}
