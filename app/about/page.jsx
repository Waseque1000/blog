import Link from "next/link";
import { getBaseUrl, siteConfig } from "@/lib/seo";

export const metadata = {
  title: "About Think — Our Mission & Editorial Standards",
  description: "Learn about Think Tech Daily, our editorial mission, engineering principles, and the team behind our in-depth tech analyses and guides.",
  alternates: {
    canonical: `${getBaseUrl()}/about`,
  },
  openGraph: {
    title: "About Think — Our Mission & Editorial Standards",
    description: "Learn about Think Tech Daily, our editorial mission, and the team behind our tech guides.",
    url: `${getBaseUrl()}/about`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "About Think" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Think — Our Mission & Editorial Standards",
    description: "Learn about Think Tech Daily, our editorial mission, and our team.",
    images: [siteConfig.ogImage],
  },
};

export default function AboutPage() {
  const baseUrl = getBaseUrl();

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Think",
    url: `${baseUrl}/about`,
    description: siteConfig.description,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
      logo: `${baseUrl}/logo-mark.png`,
      founder: {
        "@type": "Person",
        name: siteConfig.author,
      },
      publishingPrinciples: `${baseUrl}/terms`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <div className="min-h-screen bg-[#faf8ff] pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#767585] mb-6 font-medium">
            <Link href="/" className="hover:text-[#4648d4] transition-colors">Home</Link>
            <span className="text-[#c7c4d7]">/</span>
            <span className="text-[#131b2e] font-semibold">About</span>
          </nav>

          {/* Hero Header */}
          <header className="bg-white p-6 sm:p-10 md:p-12 rounded-3xl shadow-sm border border-[#c7c4d7]/30 mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaedff] text-[#4648d4] mb-4 text-[11px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4648d4]" />
              Editorial Publication
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#131b2e] tracking-tight mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Independent Tech Journalism &amp; Engineering Analyses
            </h1>
            <p className="text-base sm:text-lg text-[#464554] leading-relaxed max-w-3xl">
              Welcome to <strong>Think</strong> (Think Tech Daily). We produce deep, pragmatic technical breakdowns on artificial intelligence, software engineering, cloud infrastructure, and modern web performance.
            </p>
          </header>

          {/* Mission & Standards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#c7c4d7]/30">
              <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#4648d4] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <h2 className="text-xl font-bold text-[#131b2e] mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Our Editorial Mission
              </h2>
              <p className="text-sm text-[#464554] leading-relaxed">
                The web is flooded with shallow automated summaries. At Think, our mission is to deliver comprehensive, deeply researched, human-written guides that give developers and builders concrete architectural insights they can implement immediately.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#c7c4d7]/30">
              <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#4648d4] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[22px]">code</span>
              </div>
              <h2 className="text-xl font-bold text-[#131b2e] mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Tested &amp; Verified Code
              </h2>
              <p className="text-sm text-[#464554] leading-relaxed">
                Every code snippet, Linux command, and system configuration published on our platform is tested and validated against real production environments before publication.
              </p>
            </div>
          </div>

          {/* Author & Founder Profile */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-[#c7c4d7]/30 mb-8 sm:mb-10">
            <h2 className="text-2xl font-bold text-[#131b2e] mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Author &amp; Lead Editor
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4648d4] to-[#6063ee] text-white flex items-center justify-center text-3xl font-bold shadow-md shrink-0">
                W
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#131b2e]">Waseque Arafat</h3>
                <p className="text-xs font-semibold text-[#4648d4] uppercase tracking-wider mb-2">Founder &amp; Technical Writer</p>
                <p className="text-sm text-[#464554] leading-relaxed max-w-2xl">
                  Software engineer and technology analyst passionate about full-stack web architectures, Next.js, distributed systems, and local AI agent orchestration. Creator of Think Tech Daily to bridge complex engineering concepts with clear, actionable guides.
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Standards & Fact Checking */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-[#c7c4d7]/30">
            <h2 className="text-2xl font-bold text-[#131b2e] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Editorial Integrity &amp; Transparency
            </h2>
            <div className="space-y-4 text-sm text-[#464554] leading-relaxed">
              <p>
                <strong>Zero Sponsored Bias:</strong> We do not accept sponsored article placements that dictate editorial conclusions. When we recommend developer tools, hardware, or cloud providers, recommendations are based purely on benchmark performance and real developer experience.
              </p>
              <p>
                <strong>Corrections &amp; Updates:</strong> Software evolves rapidly. We continuously review and update our published tutorials to ensure package versions, API endpoints, and command flags remain accurate and up-to-date.
              </p>
              <div className="pt-4 border-t border-[#c7c4d7]/30 flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-1.5 text-[#4648d4] font-semibold hover:underline text-sm">
                  <span>Contact Editorial Team</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
                <Link href="/privacy" className="inline-flex items-center gap-1.5 text-[#464554] font-medium hover:text-[#131b2e] text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="inline-flex items-center gap-1.5 text-[#464554] font-medium hover:text-[#131b2e] text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
