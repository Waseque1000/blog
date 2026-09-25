import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import "./globals.css";

export const metadata = {
  title: "DailyBlog",
  description: "A modern content platform. Stories worth reading. Ideas worth sharing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#0a0a0a] text-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
