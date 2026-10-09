import Link from "next/link";
import { getBaseUrl, siteConfig } from "@/lib/seo";

export const metadata = {
  title: "Contact Think — Editorial Inquiries & Feedback",
  description: "Get in touch with the editorial team at Think Tech Daily for article feedback, technical corrections, or business inquiries.",
  alternates: {
    canonical: `${getBaseUrl()}/contact`,
  },
  openGraph: {
    title: "Contact Think — Editorial Inquiries & Feedback",
    description: "Get in touch with the editorial team at Think Tech Daily.",
    url: `${getBaseUrl()}/contact`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Contact Think" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Think — Editorial Inquiries & Feedback",
    description: "Get in touch with Think Tech Daily.",
    images: [siteConfig.ogImage],
  },
};

export default function ContactPage() {
  const baseUrl = getBaseUrl();

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Think",
    url: `${baseUrl}/contact`,
    description: "Contact the editorial team at Think Tech Daily.",
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
      email: "contact@thinktechdaily.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <div className="min-h-screen bg-[#faf8ff] pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#767585] mb-6 font-medium">
            <Link href="/" className="hover:text-[#4648d4] transition-colors">Home</Link>
            <span className="text-[#c7c4d7]">/</span>
            <span className="text-[#131b2e] font-semibold">Contact</span>
          </nav>

          {/* Header */}
          <header className="bg-white p-6 sm:p-10 md:p-12 rounded-3xl shadow-sm border border-[#c7c4d7]/30 mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaedff] text-[#4648d4] mb-4 text-[11px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4648d4]" />
              Get In Touch
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#131b2e] tracking-tight mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Contact Our Editorial Desk
            </h1>
            <p className="text-base sm:text-lg text-[#464554] leading-relaxed max-w-2xl">
              Have feedback on an article, noticed a code error that needs correction, or want to discuss a technical collaboration? We welcome thoughtful dialogue.
            </p>
          </header>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#c7c4d7]/30 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#4648d4] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[22px]">mail</span>
                </div>
                <h2 className="text-xl font-bold text-[#131b2e] mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  General &amp; Editorial Inquiries
                </h2>
                <p className="text-sm text-[#464554] mb-4 leading-relaxed">
                  For corrections, article feedback, or general questions regarding our publications:
                </p>
              </div>
              <div className="pt-4 border-t border-[#c7c4d7]/30">
                <a
                  href="mailto:contact@thinktechdaily.com"
                  className="text-base font-semibold text-[#4648d4] hover:underline flex items-center gap-2"
                >
                  <span>contact@thinktechdaily.com</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </a>
                <span className="text-xs text-[#767585] mt-1 block">Response within 24–48 hours</span>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#c7c4d7]/30 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#4648d4] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[22px]">bug_report</span>
                </div>
                <h2 className="text-xl font-bold text-[#131b2e] mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Technical Corrections
                </h2>
                <p className="text-sm text-[#464554] mb-4 leading-relaxed">
                  Did an API change break one of our tutorial guides? Let us know with the article title and broken step so our team can verify and publish an immediate update.
                </p>
              </div>
              <div className="pt-4 border-t border-[#c7c4d7]/30">
                <a
                  href="mailto:corrections@thinktechdaily.com"
                  className="text-base font-semibold text-[#4648d4] hover:underline flex items-center gap-2"
                >
                  <span>corrections@thinktechdaily.com</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </a>
                <span className="text-xs text-[#767585] mt-1 block">Prioritized editorial review</span>
              </div>
            </div>
          </div>

          {/* Editorial Office & Verification */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-[#c7c4d7]/30">
            <h2 className="text-2xl font-bold text-[#131b2e] mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Publication Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-[#464554]">
              <div>
                <span className="text-xs font-bold text-[#767585] uppercase tracking-wider block mb-1">Entity</span>
                <span className="text-[#131b2e] font-semibold">Think Tech Daily</span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#767585] uppercase tracking-wider block mb-1">Website</span>
                <a href="https://thinktechdaily.com" className="text-[#4648d4] font-semibold hover:underline">thinktechdaily.com</a>
              </div>
              <div>
                <span className="text-xs font-bold text-[#767585] uppercase tracking-wider block mb-1">Operating Hours</span>
                <span>Sun – Thu, 9AM – 6PM (UTC)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
