export const siteConfig = {
  name: "Think",
  title: "Think — Tech Insights, Programming & Modern Gadgets",
  description: "In-depth analysis on technology, programming guides, hardware upgrades, and budget smartphones. Built for students, builders, and developers.",
  url: getBaseUrl(),
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
  author: "Wasee",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_ID || "G-E6KLLDLN03",
};

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  return "https://blog-zeta-nine-22.vercel.app";
}
