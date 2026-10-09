import { getBaseUrl, siteConfig } from "@/lib/seo";

export const metadata = {
  title: "Search Articles",
  description: "Search in-depth engineering analyses, tutorials, and technology guides on Think.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${getBaseUrl()}/search`,
  },
};

export default function SearchLayout({ children }) {
  return children;
}
