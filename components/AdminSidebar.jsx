"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { 
  FiGrid, 
  FiFileText, 
  FiPlusSquare, 
  FiLogOut, 
  FiMenu, 
  FiX, 
  FiSettings 
} from "react-icons/fi";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: FiGrid },
  { name: "All Posts", href: "/admin/posts", icon: FiFileText },
  { name: "Create Post", href: "/admin/posts/create", icon: FiPlusSquare },
  { name: "Settings", href: "/admin/settings", icon: FiSettings },
];

function SidebarContent({ pathname, handleLogout, setIsMobileOpen }) {
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.png" alt="Think" className="w-6 h-auto" />
            <span className="text-xl font-bold tracking-tight text-gray-900 font-sans">Think Admin</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                  isActive 
                    ? "bg-[#131b2e] text-white shadow-sm" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2.5 mb-2 rounded-xl bg-gray-50 border border-gray-100">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4648d4] to-[#6063ee] flex items-center justify-center text-white font-bold text-xs shadow-sm">
            W
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-900 truncate">Wasee</p>
            <p className="text-[10px] text-gray-500 font-medium">Administrator</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm"
        >
          <FiLogOut className="w-5 h-5 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileOpen(false);
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      {/* Mobile & Tablet Header Bar */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            aria-label="Open menu"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.png" alt="Think" className="w-6 h-auto" />
            <span className="text-lg font-bold text-gray-900">Think</span>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            href="/admin/posts/create"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131b2e] text-white text-xs font-semibold hover:bg-gray-800 transition"
          >
            <FiPlusSquare className="w-4 h-4" />
            <span>New Post</span>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden animate-fadeIn backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer (Slide in from left) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 max-w-[85vw] bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent
          pathname={pathname}
          handleLogout={handleLogout}
          setIsMobileOpen={setIsMobileOpen}
        />
      </aside>

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 h-screen sticky top-0 shrink-0 flex-col">
        <SidebarContent
          pathname={pathname}
          handleLogout={handleLogout}
          setIsMobileOpen={setIsMobileOpen}
        />
      </aside>
    </>
  );
}
