import Link from "next/link";
import { getBaseUrl, siteConfig } from "@/lib/seo";

export const metadata = {
  title: "Privacy Policy",
  description: "Read the Privacy Policy for Think. Learn how your data, comments, and newsletter preferences are handled.",
  alternates: {
    canonical: `${getBaseUrl()}/privacy`,
  },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: "Learn how your data, comments, and email preferences are handled.",
    url: `${getBaseUrl()}/privacy`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] pt-20 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 md:p-12 rounded-2xl shadow-sm border border-[#c7c4d7]/30">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#767585] mb-6 font-medium">
          <Link href="/" className="hover:text-[#4648d4] transition-colors">Home</Link>
          <span className="text-[#c7c4d7]">/</span>
          <span className="text-[#131b2e] font-semibold">Privacy Policy</span>
        </nav>

        <h1
          className="text-3xl sm:text-4xl font-extrabold text-[#131b2e] tracking-tight mb-2"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Privacy Policy
        </h1>
        <p className="text-xs text-[#767585] mb-8">Effective Date: September 29, 2026</p>

        <div className="space-y-6 text-sm sm:text-base text-[#464554] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#131b2e] mb-3">1. Overview</h2>
            <p>
              Welcome to Think (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the Publication&rdquo;). We respect your privacy and are committed to protecting any personal information you provide while browsing our articles, subscribing to updates, or engaging with our editorial content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#131b2e] mb-3">2. Information We Collect</h2>
            <p className="mb-2">We collect only the minimum information necessary to operate this blog:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Newsletter Subscriptions:</strong> If you voluntarily subscribe to our Sunday editorial dispatch, we store your email address solely to deliver these updates. We do not sell or rent our subscriber list.
              </li>
              <li>
                <strong>Public Comments:</strong> When you leave a comment on an article, we record the name you provide and the comment text. We recommend avoiding sensitive personal information in public comments.
              </li>
              <li>
                <strong>Anonymous Analytics:</strong> We use Google Tag / Analytics to measure aggregate page visits, device types, and popular content. IP addresses are anonymized, and no personally identifiable information is collected by analytics trackers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#131b2e] mb-3">3. Cookies and Local Storage</h2>
            <p>
              We use lightweight local browser storage to remember simple client-side preferences (such as your liked articles) without tracking you across third-party websites. You may disable cookies through your browser settings at any time without losing access to our articles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#131b2e] mb-3">4. Third-Party Links</h2>
            <p>
              Our guides may link to official developer documentation, open-source repositories, or external resources for informational convenience. We do not control or endorse the privacy practices of external websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#131b2e] mb-3">5. Data Retention &amp; Rights</h2>
            <p>
              You may unsubscribe from email updates at any time using the unsubscribe link in our dispatches or request the removal of your public comments by contacting our editorial desk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#131b2e] mb-3">6. Contact</h2>
            <p>
              For privacy inquiries, editorial questions, or data correction requests, please reach out via our contact channels or repository issues.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
