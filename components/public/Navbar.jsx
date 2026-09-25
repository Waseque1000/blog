"use client";

import Link from "next/link";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Tech", href: "/?category=Technology" },
  { label: "Programming", href: "/?category=Programming" },
  { label: "Lifestyle", href: "/?category=Lifestyle" },
  { label: "Travel", href: "/?category=Travel" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <span className="text-black font-black text-sm">D</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
              DailyBlog
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
            >
              <FiSearch className="w-5 h-5" />
            </Link>
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/10 px-4 py-4 space-y-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 text-sm font-medium text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
