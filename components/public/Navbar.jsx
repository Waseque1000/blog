"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#c7c4d7]/30 shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
      <div className="h-16 max-w-[1320px] mx-auto px-4 md:px-8 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.png" alt="Think" className="w-7 h-auto object-contain transition-transform group-hover:scale-105" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#131b2e] leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Think</span>
            <span className="text-[10px] font-semibold text-[#767585] uppercase tracking-wider mt-1 hidden sm:inline-block" style={{ letterSpacing: '0.04em' }}>Editorial & Insights</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { label: "Home", href: "/" },
            { label: "Explore", href: "/?category=Technology" },
            { label: "Categories", href: "/?category=Programming" },
            { label: "About", href: "#" },
          ].map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] font-semibold text-[#464554] hover:text-[#131b2e] transition-colors"
              style={{ letterSpacing: '0.02em' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link href="/search" className="p-1.5 text-[#464554] hover:text-[#131b2e] transition-colors">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </Link>
          <Link href="/admin" className="p-1.5 text-[#464554] hover:text-[#4648d4] transition-colors hidden sm:block">
            <span className="material-symbols-outlined text-[19px]">key</span>
          </Link>
          <div className="w-8 h-8 rounded-full bg-[#4648d4] flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </div>
          <button
            className="md:hidden p-1.5 text-[#464554] hover:text-[#131b2e] transition-colors ml-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined text-[24px]">{isOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-[#c7c4d7]/30 px-4 py-4 space-y-1">
          {[
            { label: "Home", href: "/" },
            { label: "Explore", href: "/?category=Technology" },
            { label: "Categories", href: "/?category=Programming" },
            { label: "Admin", href: "/admin" },
          ].map(link => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 text-sm font-semibold text-[#464554] hover:text-[#131b2e] hover:bg-[#eaedff] rounded-lg transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
