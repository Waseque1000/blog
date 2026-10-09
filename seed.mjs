import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://blog:17N13zUy3y4Hkwy0@cluster0.vvmbcal.mongodb.net/?appName=Cluster0";
const MONGODB_DB = "blog";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, default: "Admin" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

const demoPosts = [
  {
    title: "Minimalism in UI Design",
    slug: "minimalism-in-ui-design",
    excerpt: "Exploring the aesthetic appeal and usability benefits of minimalist user interfaces in modern web development.",
    content: "<h2>Less is More</h2><p>In the digital age, attention is a scarce resource...</p>",
    image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=1200",
    category: "Design",
    author: "Elena Rivera",
    status: "published",
    featured: true,
    views: 4521,
    likes: 892,
    createdAt: new Date(Date.now() - 100000000)
  },
  {
    title: "The Architecture of Tomorrow",
    slug: "the-architecture-of-tomorrow",
    excerpt: "How parametric design and sustainable materials are reshaping the skylines of our cities.",
    content: "<h2>Building for the Future</h2><p>Architects are increasingly turning to sustainable materials...</p>",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    category: "Architecture",
    author: "Marcus Chen",
    status: "published",
    featured: false,
    views: 3210,
    likes: 645,
    createdAt: new Date(Date.now() - 200000000)
  },
  {
    title: "Mastering the Art of Coffee",
    slug: "mastering-the-art-of-coffee",
    excerpt: "A comprehensive guide to understanding roast profiles, brewing methods, and the perfect pour.",
    content: "<h2>From Bean to Cup</h2><p>Coffee is more than just a morning ritual...</p>",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200",
    category: "Lifestyle",
    author: "Sarah Jenkins",
    status: "published",
    featured: false,
    views: 8900,
    likes: 1250,
    createdAt: new Date(Date.now() - 300000000)
  },
  {
    title: "Urban Photography: Capturing the Soul of the City",
    slug: "urban-photography-capturing-the-soul",
    excerpt: "Tips and techniques for finding beauty in the concrete jungle and telling stories through your lens.",
    content: "<h2>The Streets Are Alive</h2><p>Urban photography is about capturing the essence of city life...</p>",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=1200",
    category: "Photography",
    author: "David Kim",
    status: "published",
    featured: false,
    views: 5600,
    likes: 980,
    createdAt: new Date(Date.now() - 400000000)
  },
  {
    title: "The Psychology of Color in Branding",
    slug: "psychology-of-color-branding",
    excerpt: "Understanding how different hues influence consumer behavior and brand perception.",
    content: "<h2>Color Speaks Louder Than Words</h2><p>Have you ever wondered why fast food chains use red...</p>",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200",
    category: "Marketing",
    author: "Laura Croft",
    status: "published",
    featured: false,
    views: 2300,
    likes: 450,
    createdAt: new Date(Date.now() - 500000000)
  },
  {
    title: "Mastering Docker & Containerization for Modern DevOps",
    slug: "mastering-docker-containerization-modern-devops",
    excerpt: "Learn how Linux namespaces and cgroups power containers and how to write lean multi-stage Dockerfiles.",
    content: "<h2>Deterministic Environments</h2><p>Containerization has fundamentally altered how engineers build and deploy software...</p>",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=1200",
    category: "Technology",
    author: "Elena Rivera",
    status: "published",
    featured: false,
    views: 7800,
    likes: 1120,
    createdAt: new Date(Date.now() - 600000000)
  },
  {
    title: "Deep Dive into React Server Components",
    slug: "deep-dive-react-server-components",
    excerpt: "An advanced look at how RSCs work under the hood and how they optimize web performance.",
    content: "<h2>The New Paradigm</h2><p>React Server Components represent a fundamental shift...</p>",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    category: "Technology",
    author: "Alex Mercer",
    status: "published",
    featured: false,
    views: 6500,
    likes: 800,
    createdAt: new Date(Date.now() - 700000000)
  },
  {
    title: "The Art of Slow Living",
    slug: "the-art-of-slow-living",
    excerpt: "Finding balance and peace in a hyper-connected, fast-paced world.",
    content: "<h2>Disconnect to Reconnect</h2><p>In our constant pursuit of productivity...</p>",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=1200",
    category: "Lifestyle",
    author: "Mia Wong",
    status: "published",
    featured: false,
    views: 9200,
    likes: 1450,
    createdAt: new Date(Date.now() - 800000000)
  }
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB });
    console.log("Connected successfully!");

    console.log("Clearing existing posts...");
    await Post.deleteMany({});
    
    console.log("Inserting demo posts...");
    await Post.insertMany(demoPosts);
    
    console.log("Demo data added successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected.");
  }
}

seed();
