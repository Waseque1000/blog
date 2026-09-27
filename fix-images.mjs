import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://blog:17N13zUy3y4Hkwy0@cluster0.vvmbcal.mongodb.net/blog?retryWrites=true&w=majority";

const postSchema = new mongoose.Schema({
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  image: String,
  author: String,
  category: String,
  status: String,
  featured: Boolean,
  likes: Number,
  views: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

async function fixImages() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas");

    const postsToUpdate = [
      "apple-iphone-duo-18-pro-recap",
      "ios-27-ipados-27-release",
      "apple-2000-foldable-iphone-debate",
      "siri-ai-overhaul-apple",
      "metas-muse-ai-product",
      "openclaw-new-ai-agent-tool",
      "agentic-ai-shift-replacing-apps",
      "ai-doom-debate-safety",
      "windows-patch-tuesday-vulnerabilities",
      "metas-18b-social-media-settlement",
      "local-ai-models-vs-frontier",
      "data-centers-climate-change-ai",
      "gta-6-scams-cybercriminals",
      "wearables-health-age-metrics",
      "new-mac-mini-update",
      "regulation-calls-for-ai-adversarial-clothing",
      "cedia-2026-smart-home-tech",
      "corporate-surveillance-watermarking",
      "orbital-salvage-technology-space",
      "bill-gates-ai-risks-commentary"
    ];

    for (const slug of postsToUpdate) {
      // Using Picsum with a seed to get a consistent working image for each post
      const newImage = `https://picsum.photos/seed/${slug}/800/500`;
      await Post.findOneAndUpdate(
        { slug: slug },
        { image: newImage },
        { returnDocument: 'after' }
      );
      console.log(`Fixed image for: ${slug}`);
    }

    console.log("All 20 post images fixed!");
    process.exit(0);
  } catch (error) {
    console.error("Error fixing images:", error);
    process.exit(1);
  }
}

fixImages();
