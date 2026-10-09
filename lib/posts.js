import postsData from "@/data/posts.json";

export function getAllPosts() {
  return [...postsData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getPostBySlug(slug) {
  if (!slug) return null;
  const decoded = decodeURIComponent(slug).toLowerCase();
  return postsData.find((p) => p.slug.toLowerCase() === decoded) || null;
}

export function getPostsByCategory(category) {
  if (!category || category.toLowerCase() === "all") return getAllPosts();
  const lowerCat = decodeURIComponent(category).toLowerCase();
  return getAllPosts().filter((p) => (p.category || "").toLowerCase() === lowerCat);
}

export function getAllCategories() {
  const categories = postsData.map((p) => p.category).filter(Boolean);
  return Array.from(new Set(categories));
}

export function getFeaturedPosts() {
  return getAllPosts().filter((p) => Boolean(p.featured));
}

export function searchPosts({ q = "", category = "", tag = "" } = {}) {
  let results = getAllPosts();

  if (category) {
    const lowerCat = category.toLowerCase();
    results = results.filter((p) => (p.category || "").toLowerCase() === lowerCat);
  }

  if (tag) {
    const lowerTag = tag.toLowerCase();
    results = results.filter(
      (p) =>
        (p.tags || []).some((t) => t.toLowerCase() === lowerTag) ||
        (p.category || "").toLowerCase() === lowerTag
    );
  }

  if (q) {
    const query = q.toLowerCase().trim();
    results = results.filter((p) => {
      const titleMatch = (p.title || "").toLowerCase().includes(query);
      const excerptMatch = (p.excerpt || "").toLowerCase().includes(query);
      const categoryMatch = (p.category || "").toLowerCase().includes(query);
      const tagMatch = (p.tags || []).some((t) => t.toLowerCase().includes(query));
      return titleMatch || excerptMatch || categoryMatch || tagMatch;
    });
  }

  return results;
}
