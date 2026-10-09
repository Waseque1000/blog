"use client";

import Link from "next/link";

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
        console.error(err);
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/post/${post.slug}`);
    }
  };

  const dateStr = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const plainText = (post.content || post.excerpt || "").replace(/<[^>]+>/g, " ");
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  const readTimeMinutes = Math.max(3, Math.ceil(wordCount / 200));

  // Featured split hero card
  if (featured) {
    return (
      <Link href={`/post/${post.slug}`} className="group block">
        <article className="bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-300 border border-[#c7c4d7]/30">
          {/* Image column */}
          <div className="lg:col-span-6 xl:col-span-7 relative group overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[380px] lg:max-h-[460px] bg-[#eaedff]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#131b2e]/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider shadow-lg border border-white/20">
                <span className="w-2 h-2 rounded-full bg-[#4648d4] animate-pulse" />
                Featured Editorial
              </span>
            </div>
          </div>

          {/* Content column */}
          <div className="lg:col-span-6 xl:col-span-5 p-4 sm:p-6 md:p-8 lg:p-9 flex flex-col justify-between bg-white">
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#e1e0ff] text-[#4648d4] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-[#767585] text-[11px] sm:text-xs font-medium">• {dateStr}</span>
                <span className="text-[#767585] text-[11px] sm:text-xs font-medium">• {readTimeMinutes} min read</span>
              </div>
              <h2
                className="text-lg sm:text-2xl lg:text-[28px] xl:text-[32px] sm:leading-snug lg:leading-[36px] xl:leading-[40px] font-extrabold text-[#131b2e] tracking-tight mb-2.5 sm:mb-3 group-hover:text-[#4648d4] transition-colors"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.02em" }}
              >
                {post.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-[#464554] leading-relaxed line-clamp-3 sm:line-clamp-4 mb-3 sm:mb-4">
                {post.excerpt}
              </p>

              {/* Highlights badge row filling the dead space */}
              <div className="flex flex-wrap items-center gap-2 py-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f0effe] text-[#4648d4] text-xs font-semibold">
                  <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
                  Deep Dive
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f4f5f8] text-[#464554] text-xs font-medium">
                  <span className="material-symbols-outlined text-[15px] text-[#767585]">schedule</span>
                  {readTimeMinutes} min read
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f4f5f8] text-[#464554] text-xs font-medium">
                  <span className="material-symbols-outlined text-[15px] text-[#767585]">bookmark</span>
                  Essential Read
                </span>
              </div>
            </div>

            {/* Author + Actions */}
            <div className="pt-4 border-t border-[#c7c4d7]/30 mt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4648d4] to-[#6063ee] flex items-center justify-center text-white font-bold text-sm ring-2 ring-[#4648d4]/20 shadow-sm">
                    {post.author?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-[#131b2e]">{post.author}</div>
                    <div className="text-[11px] text-[#767585]">Author</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#eaedff] text-[#464554] hover:bg-[#e1e0ff] hover:text-[#4648d4] transition-colors text-xs font-semibold"
                    onClick={(e) => e.preventDefault()}
                    aria-label={`${post.likes || 0} likes`}
                  >
                    <span className="material-symbols-outlined text-[17px]">favorite</span>
                    <span>{post.likes || 0}</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="flex-1 bg-[#4648d4] hover:bg-[#3b3dbb] text-white px-4 py-3 rounded-xl text-xs sm:text-[13px] font-bold text-center flex items-center justify-center gap-2 shadow-sm transition-all">
                  <span>Read Story</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </span>
                <button
                  onClick={handleShare}
                  aria-label="Share article"
                  className="p-3 rounded-xl bg-[#eaedff] text-[#131b2e] hover:bg-[#e2e7ff] transition-colors flex items-center justify-center"
                >
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
      <article className="h-full flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#c7c4d7]/30">
        {/* Instagram-style header */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4648d4] to-[#6063ee] flex items-center justify-center text-white font-bold text-xs ring-2 ring-[#4648d4]/20 shadow-sm">
              {post.author?.charAt(0)?.toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-[13px] font-bold text-[#131b2e] leading-tight">{post.author}</span>
              <span className="text-[10px] text-[#767585]">Author</span>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#4648d4] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
            {post.category}
          </span>
        </div>

        {/* 16:10 Responsive Cover */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#eaedff]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#283044]/80 text-[#eef0ff] text-[10px] sm:text-[11px] font-semibold backdrop-blur-sm">
            {readTimeMinutes} min read
          </div>
        </div>

        {/* Body */}
        <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3
              className="text-base sm:text-lg font-bold text-[#131b2e] tracking-tight line-clamp-2 mb-2 group-hover:text-[#4648d4] transition-colors leading-snug"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {post.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#464554] line-clamp-2 mb-4 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Social bar */}
          <div className="pt-3 border-t border-[#c7c4d7]/20">
            <div className="flex items-center justify-between text-[#464554]">
              <div className="flex items-center gap-3">
                <button
                  className="flex items-center gap-1 hover:text-[#4648d4] transition-colors"
                  onClick={(e) => e.preventDefault()}
                  aria-label={`${post.likes || 0} likes`}
                >
                  <span className="material-symbols-outlined text-[19px]">favorite</span>
                  <span className="text-xs font-semibold">{post.likes || 0}</span>
                </button>
                <button
                  onClick={handleShare}
                  aria-label="Share story"
                  className="hover:text-[#4648d4] transition-colors"
                >
                  <span className="material-symbols-outlined text-[19px]">send</span>
                </button>
              </div>
              <span className="text-[11px] text-[#767585]">{dateStr}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
