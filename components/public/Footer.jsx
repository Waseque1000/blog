"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="w-full bg-white border-t border-[#c7c4d7]/30 mt-16">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#c7c4d7]/20">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#4648d4] flex items-center justify-center shadow-sm">
                <span className="text-white font-extrabold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>K</span>
              </div>
              <span className="text-xl font-semibold tracking-tight text-[#131b2e]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Kronikl</span>
            </div>
            <p className="text-sm text-[#464554] max-w-sm mb-4 leading-relaxed">
              An intersection of high-velocity social discourse and long-form editorial gravitas. Built for visionary creators, thinkers, and critics.
            </p>
            <div className="flex items-center gap-2 text-[#464554]">
              <span className="material-symbols-outlined text-[18px]">rss_feed</span>
              <span className="text-[11px] font-semibold hover:text-[#131b2e] cursor-pointer transition-colors">Editorial RSS Feed</span>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-semibold text-[#131b2e] uppercase tracking-wider">Curations</span>
              {["Technology", "Programming", "Lifestyle", "Travel"].map(cat => (
                <Link key={cat} href={`/?category=${cat}`} className="text-sm text-[#464554] hover:text-[#131b2e] transition-colors">{cat}</Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-semibold text-[#131b2e] uppercase tracking-wider">Network</span>
              <Link href="/search" className="text-sm text-[#464554] hover:text-[#131b2e] transition-colors">Search</Link>
              <Link href="/admin" className="text-sm text-[#464554] hover:text-[#131b2e] transition-colors">Admin</Link>
              <a href="#" className="text-sm text-[#464554] hover:text-[#131b2e] transition-colors">Privacy</a>
              <a href="#" className="text-sm text-[#464554] hover:text-[#131b2e] transition-colors">Terms</a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <span className="text-[13px] font-semibold text-[#131b2e] uppercase tracking-wider block mb-2">Dispatch Letter</span>
            <p className="text-sm text-[#464554] mb-4">Weekly curated essays and visual features delivered to your inbox.</p>
            <div className="flex items-center gap-2 bg-[#f2f3ff] p-1.5 rounded-full border border-[#c7c4d7]/40">
              <input className="bg-transparent text-sm text-[#131b2e] placeholder:text-[#464554] px-3 py-1 flex-1 focus:outline-none" placeholder="Your email address" type="email" />
              <button className="bg-[#131b2e] text-white hover:bg-[#4648d4] text-[13px] font-semibold px-4 py-1.5 rounded-full transition-colors">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-[#464554]">
          <div>&copy; {new Date().getFullYear()} Kronikl Publishing Platform. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#131b2e] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#131b2e] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
