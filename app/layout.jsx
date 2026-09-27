import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import "./globals.css";

export const metadata = {
  title: "Kronikl — Editorial & Culture",
  description: "Stories worth reading. Ideas worth sharing. Discover thoughtful perspectives and deep dives from independent thinkers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
