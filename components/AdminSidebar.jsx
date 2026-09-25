"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  FiHome, 
  FiFileText, 
  FiPlusSquare, 
  FiSettings, 
  FiLogOut 
} from "react-icons/fi";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: FiHome },
  { name: "Posts", href: "/admin/posts", icon: FiFileText },
  { name: "Create Post", href: "/admin/posts/create", icon: FiPlusSquare },
  { name: "Settings", href: "/admin/settings", icon: FiSettings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col sticky top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tighter">Publishing Admin</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                isActive 
                  ? "bg-black text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
        >
          <FiLogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
