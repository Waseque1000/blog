export const siteConfig = {
  name: "Kronikl",
  title: "Kronikl — Tech Insights, AI News & Modern Engineering",
  description: "In-depth analysis on Artificial Intelligence, agentic workflows, Apple hardware launches, cloud infrastructure, and software engineering. Built for builders, developers, and tech leaders.",
  url: process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ogImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&auto=format&fit=crop&q=80",
  twitterHandle: "@kronikl_tech",
  keywords: [
    "Artificial Intelligence",
    "Agentic AI",
    "Tech News",
    "Apple iPhone 18 Pro",
    "iOS 27",
    "Software Engineering",
    "Cybersecurity",
    "Machine Learning",
    "Web Development",
    "Next.js",
    "Developer Blog",
    "Tech Trends 2026"
  ],
  author: "Kronikl Editorial Team",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_ID || "G-E6KLLDLN03",
};

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
