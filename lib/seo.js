export const siteConfig = {
  name: "Think",
  title: "Think — High-Impact Tech Analysis, Programming Guides & Modern Engineering",
  description: "In-depth engineering analysis on AI, cloud architecture, TypeScript, web performance, and modern developer tooling. Curated for developers, builders, and technical leaders.",
  url: getBaseUrl(),
  ogImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&auto=format&fit=crop&q=80",
  twitterHandle: "@think_tech",
  keywords: [
    "Technology",
    "Programming",
    "Web Development",
    "Next.js",
    "React Server Components",
    "Artificial Intelligence",
    "Local AI",
    "Docker & Containers",
    "Cybersecurity",
    "TypeScript",
    "Software Engineering",
    "Developer Tutorials",
    "Cloud Computing",
    "Core Web Vitals",
    "Tech Architecture",
    "Think Tech Blog"
  ],
  author: "Wasee",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_ID || "G-E6KLLDLN03",
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  bingVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
};

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  return "https://blog-zeta-nine-22.vercel.app";
}
