export const siteConfig = {
  name: "Think",
  title: "Think — Tech Insights, Programming & Modern Gadgets",
  description: "In-depth analysis on technology, programming guides, hardware upgrades, and budget smartphones. Built for students, builders, and developers.",
  url: process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ogImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&auto=format&fit=crop&q=80",
  twitterHandle: "@think_tech",
  keywords: [
    "Technology",
    "Programming",
    "Student Laptops",
    "Budget Phones",
    "Tech Guides",
    "Software Engineering",
    "Web Development",
    "Next.js",
    "Developer Blog",
    "Think"
  ],
  author: "Think Editorial Team",
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
