"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#c7c4d7]/30 mt-16">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-8 sm:pb-10 border-b border-[#c7c4d7]/20">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-mark.png" alt="Think" className="w-6 h-auto object-contain" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#131b2e]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Think</span>
            </div>
            <p className="text-sm text-[#464554] max-w-sm mb-4 leading-relaxed">
              An intersection of high-velocity social discourse and long-form editorial gravitas. Built for visionary creators, thinkers, and critics.
            </p>
            <Link href="/feed.xml" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#464554] hover:text-[#131b2e] transition-colors w-fit">
              <span className="material-symbols-outlined text-[18px]">rss_feed</span>
              <span className="text-[11px] font-semibold">Editorial RSS Feed</span>
            </Link>
          </div>

          {/* Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-semibold text-[#131b2e] uppercase tracking-wider">Curations</span>
              {["Technology", "Programming", "Tutorial"].map(cat => (
                <Link key={cat} href={`/category/${cat.toLowerCase()}`} className="text-sm text-[#464554] hover:text-[#131b2e] transition-colors">{cat}</Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-semibold text-[#131b2e] uppercase tracking-wider">Network</span>
              <Link href="/about" className="text-sm text-[#464554] hover:text-[#131b2e] transition-colors">About Us</Link>
              <Link href="/contact" className="text-sm text-[#464554] hover:text-[#131b2e] transition-colors">Contact</Link>
              <Link href="/search" className="text-sm text-[#464554] hover:text-[#131b2e] transition-colors">Search</Link>
              <Link href="/privacy" className="text-sm text-[#464554] hover:text-[#131b2e] transition-colors">Privacy</Link>
              <Link href="/terms" className="text-sm text-[#464554] hover:text-[#131b2e] transition-colors">Terms</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <span className="text-[13px] font-semibold text-[#131b2e] uppercase tracking-wider block mb-2">Dispatch Letter</span>
            <p className="text-sm text-[#464554] mb-4">Weekly curated essays and visual features delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-2 bg-[#f2f3ff] p-1.5 rounded-2xl sm:rounded-full border border-[#c7c4d7]/40">
              <input className="bg-transparent text-base sm:text-sm text-[#131b2e] placeholder:text-[#464554] px-3 py-1.5 flex-1 focus:outline-none" placeholder="Your email address" type="email" />
              <button className="bg-[#131b2e] text-white hover:bg-[#4648d4] text-[13px] font-semibold px-4 py-2 sm:py-1.5 rounded-xl sm:rounded-full transition-colors whitespace-nowrap cursor-pointer">Subscribe</button>
            </div>
            <div className="mt-2">
              <span className="text-[11px] text-[#464554]">By subscribing, you agree to our <Link href="/privacy" className="underline">Privacy Policy</Link>.</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-[#464554]">
          <div>&copy; {new Date().getFullYear()} Think Publishing Platform. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#131b2e] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#131b2e] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
