import Link from "next/link";
import { getBaseUrl, siteConfig } from "@/lib/seo";

export const metadata = {
  title: "Terms of Service",
  description: "Read the Terms of Service for Think editorial publication and guides.",
  alternates: {
    canonical: `${getBaseUrl()}/terms`,
  },
  openGraph: {
    title: `Terms of Service | ${siteConfig.name}`,
    description: "Terms and guidelines for using Think.",
    url: `${getBaseUrl()}/terms`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Terms of Service" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Terms of Service | ${siteConfig.name}`,
    description: "Terms and guidelines for using Think.",
    images: [siteConfig.ogImage],
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] pt-20 pb-16 px-3.5 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white p-4 sm:p-8 md:p-12 rounded-2xl shadow-sm border border-[#c7c4d7]/30">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#767585] mb-5 sm:mb-6 font-medium">
          <Link href="/" className="hover:text-[#4648d4] transition-colors">Home</Link>
          <span className="text-[#c7c4d7]">/</span>
          <span className="text-[#131b2e] font-semibold">Terms of Service</span>
        </nav>

        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#131b2e] tracking-tight mb-2"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Terms of Service
        </h1>
        <p className="text-xs text-[#767585] mb-6 sm:mb-8">Effective Date: September 29, 2026</p>

        <div className="space-y-6 text-sm sm:text-base text-[#464554] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#131b2e] mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using Think, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, please discontinue your use of the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#131b2e] mb-3">2. Editorial &amp; Informational Content</h2>
            <p>
              All articles, tutorials, hardware comparisons, and tech guides are published for general informational and educational purposes. While we strive to ensure our benchmarks, software tips, and product specifications remain accurate, rates and technology specifications change over time. Readers should independently verify time-sensitive details before making purchasing or deployment decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#131b2e] mb-3">3. User Comments &amp; Community Guidelines</h2>
            <p>
              Readers may post comments on select articles. You agree not to post comments that are unlawful, abusive, harassing, defamatory, or promotional spam. We reserve the right to moderate or remove comments that violate these principles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#131b2e] mb-3">4. Intellectual Property</h2>
            <p>
              All original editorial text, compilation, and branding on Think are protected by copyright laws. You are welcome to cite our analyses or link to our articles provided proper attribution and a backlink are included.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#131b2e] mb-3">5. Disclaimer of Warranties</h2>
            <p>
              This publication is provided on an &ldquo;as is&rdquo; basis without warranties of any kind. We make no warranty that the site will be uninterrupted, error-free, or entirely up-to-date at any given moment.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
