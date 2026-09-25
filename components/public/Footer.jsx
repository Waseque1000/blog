"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiGithub, FiTwitter, FiInstagram } from "react-icons/fi";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                <span className="text-black font-black text-sm">D</span>
              </div>
              <span className="text-white font-bold text-lg">DailyBlog</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              A modern content platform for thinkers, builders, and explorers.
              Stories worth reading. Ideas worth sharing.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="p-2 text-gray-600 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-gray-600 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-gray-600 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                <FiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-3">
              {["Technology", "Programming", "Lifestyle", "Travel", "Education"].map(cat => (
                <li key={cat}>
                  <Link href={`/?category=${cat}`} className="text-gray-500 hover:text-emerald-400 text-sm transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">More</h4>
            <ul className="space-y-3">
              <li><Link href="/search" className="text-gray-500 hover:text-emerald-400 text-sm transition-colors">Search</Link></li>
              <li><Link href="/admin" className="text-gray-500 hover:text-emerald-400 text-sm transition-colors">Admin</Link></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-400 text-sm transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-emerald-400 text-sm transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} DailyBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
