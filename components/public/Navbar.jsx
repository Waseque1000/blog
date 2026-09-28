"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (pathname.startsWith("/admin")) return null;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Technology", href: "/?category=Technology" },
    { label: "Travel", href: "/?category=Travel" },
    { label: "Programming", href: "/?category=Programming" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf8ff]/95 backdrop-blur-xl border-b border-[#c7c4d7]/30 shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
        <div className="h-16 max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark.png" alt="Think" className="w-6 sm:w-7 h-auto object-contain transition-transform group-hover:scale-105" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#131b2e] leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Think</span>
              <span className="text-[10px] font-semibold text-[#767585] uppercase tracking-wider mt-1 hidden sm:inline-block" style={{ letterSpacing: '0.04em' }}>Editorial & Insights</span>
            </div>
          </Link>

          {/* Desktop & Tablet Nav */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7">
            {navLinks.map(link => (
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
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/search"
              aria-label="Search articles"
              className="w-9 h-9 flex items-center justify-center rounded-full text-[#464554] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </Link>

            <Link
              href="/admin"
              aria-label="Admin dashboard"
              className="w-9 h-9 items-center justify-center rounded-full text-[#464554] hover:text-[#4648d4] hover:bg-[#eaedff] transition-colors hidden sm:flex"
            >
              <span className="material-symbols-outlined text-[19px]">key</span>
            </Link>

            <Link
              href="/admin"
              className="w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-[#4648d4] flex items-center justify-center text-white text-xs font-bold shadow-sm"
              title="Admin: Wasee"
            >
              W
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#464554] hover:text-[#131b2e] hover:bg-[#eaedff] active:scale-95 transition-all ml-0.5"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="material-symbols-outlined text-[24px]">
                {isOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm md:hidden animate-fadeIn"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-Down / Slide-Over Navigation */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 bg-white border-b border-[#c7c4d7]/40 shadow-2xl px-5 py-6 md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-1.5">
          <span className="text-[11px] font-bold text-[#767585] uppercase tracking-wider px-3 mb-1">
            Navigation
          </span>
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3 py-3 text-base font-semibold text-[#131b2e] hover:bg-[#eaedff] rounded-xl transition-all"
            >
              <span>{link.label}</span>
              <span className="material-symbols-outlined text-[18px] text-[#767585]">arrow_forward_ios</span>
            </Link>
          ))}

          <div className="pt-3 mt-2 border-t border-[#c7c4d7]/30">
            <span className="text-[11px] font-bold text-[#767585] uppercase tracking-wider px-3 mb-1 block">
              Quick Actions
            </span>
            <Link
              href="/search"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-[#464554] hover:bg-[#eaedff] hover:text-[#131b2e] rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-[20px] text-[#4648d4]">search</span>
              <span>Search All Articles</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-[#464554] hover:bg-[#eaedff] hover:text-[#131b2e] rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-[20px] text-[#4648d4]">admin_panel_settings</span>
              <span>Admin Portal (Wasee)</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
