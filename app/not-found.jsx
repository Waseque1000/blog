import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist on Think.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-[#faf8ff]">
      <div className="w-16 h-16 rounded-2xl bg-[#eaedff] flex items-center justify-center text-[#4648d4] mb-6 shadow-sm">
        <span className="material-symbols-outlined text-[36px]">travel_explore</span>
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-[#e21e49] mb-2">404 Error</span>
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#131b2e] tracking-tight mb-4"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        Page Not Found
      </h1>
      <p className="text-sm sm:text-base text-[#464554] max-w-md mx-auto mb-8 leading-relaxed">
        The article or resource you requested may have been moved, renamed, or is temporarily unavailable.
      </p>

      {/* Search box fallback */}
      <form action="/search" method="GET" className="w-full max-w-md flex items-center bg-white rounded-full shadow-sm border border-[#c7c4d7]/40 px-3 py-1.5 mb-8">
        <span className="material-symbols-outlined text-[#767586] text-[20px] ml-1">search</span>
        <input
          name="q"
          type="text"
          placeholder="Search for an article..."
          className="w-full bg-transparent px-2.5 py-1.5 text-sm text-[#131b2e] focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#131b2e] hover:bg-[#4648d4] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
        >
          Find
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full bg-[#4648d4] text-white text-xs sm:text-sm font-semibold hover:bg-[#3b3dbb] transition-colors shadow-sm"
        >
          Return to Homepage
        </Link>
        <Link
          href="/search"
          className="px-5 py-2.5 rounded-full bg-[#eaedff] text-[#131b2e] text-xs sm:text-sm font-semibold hover:bg-[#e2e7ff] transition-colors"
        >
          Explore All Topics
        </Link>
      </div>
    </div>
  );
}
