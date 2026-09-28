import AdminSidebar from "@/components/AdminSidebar";

export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 text-gray-900 font-sans">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
