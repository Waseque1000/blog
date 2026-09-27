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

async function addPosts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas");

    const posts = [
      {
        title: "The Future of Remote Work: Finding Balance in a Hybrid World",
        slug: "future-of-remote-work",
        excerpt: "As the dust settles on the global shift to remote work, we're finding that the future isn't entirely remote or entirely in-office. It's hybrid. Here's how to navigate it.",
        content: `
<p>As the dust settles on the global shift to remote work, we're finding that the future isn't entirely remote or entirely in-office. It's hybrid.</p>

<h3>The Best of Both Worlds</h3>
<p>For many, the initial novelty of working from the kitchen table has worn off. We miss the spontaneous water-cooler conversations and the clear boundary between "work" and "home." Yet, very few people want to return to a five-day commute.</p>
<p>The hybrid model promises the best of both worlds: focused, deep work at home, and collaborative, energized sessions in the office.</p>

<h3>Setting Boundaries</h3>
<p>The biggest challenge in a hybrid setup is maintaining boundaries. When your office is also your living room, the temptation to "just check one more email" is ever-present.</p>
<ul>
<li><strong>Establish a dedicated workspace:</strong> Even if it's just a specific corner of a room, having a physical boundary helps create a mental one.</li>
<li><strong>Set clear hours:</strong> Communicate your working hours to your team and stick to them. When the day is done, close the laptop.</li>
<li><strong>Embrace asynchronous communication:</strong> Not everything requires a meeting. Learning to communicate effectively via text and document sharing is crucial for remote teams.</li>
</ul>

<h3>The Role of the Office</h3>
<p>In a hybrid world, the office is no longer just a place to sit at a desk and type. It's a hub for collaboration, culture-building, and mentorship. Companies are redesigning their spaces to reflect this, focusing on meeting rooms, comfortable lounge areas, and technology that seamlessly connects in-person and remote attendees.</p>

<p>The future of work is flexible. By intentionally designing our hybrid routines, we can create a work life that is both productive and balanced.</p>
        `,
        image: "/remote-work.jpg",
        author: "Sarah Jenkins",
        category: "Productivity",
        status: "published",
        featured: false,
        likes: 12,
        views: 340
      },
      {
        title: "Embracing AI: How to Use Tools Without Losing Your Creativity",
        slug: "embracing-ai-creativity",
        excerpt: "Artificial Intelligence is transforming the creative process. But how do we ensure it remains a tool that enhances our vision, rather than a crutch that replaces it?",
        content: `
<p>Artificial Intelligence is no longer just a sci-fi concept; it's a daily reality for many creators. From generating images to drafting text, AI tools are transforming the creative process at an unprecedented pace.</p>

<h3>The Fear of Replacement</h3>
<p>It's natural to feel a sense of apprehension. If an AI can generate a stunning illustration in seconds, what does that mean for human artists? The truth is, AI is a tool, not a replacement. Just as the camera didn't kill painting, AI won't kill human creativity.</p>

<h3>AI as a Collaborator</h3>
<p>The most exciting way to view AI is as a collaborator. It can help you brainstorm ideas, overcome creative blocks, and iterate rapidly.</p>
<ul>
<li><strong>Brainstorming:</strong> Use AI to generate a list of concepts or angles you might not have considered.</li>
<li><strong>Prototyping:</strong> Quickly create mockups or rough drafts to visualize your ideas before committing to a final direction.</li>
<li><strong>Refining:</strong> Use AI tools to edit, polish, or analyze your work, identifying areas for improvement.</li>
</ul>

<h3>Maintaining Your Unique Voice</h3>
<p>The key to using AI effectively is to ensure your unique voice remains central to the work. AI tends to regress to the mean—it produces what is average or expected based on its training data. It's up to you to inject the specific, the weird, and the deeply human elements that make art resonate.</p>

<p>Don't be afraid to experiment with AI, but always remember that the final creative vision belongs to you. Use the tools to amplify your creativity, not to outsource it.</p>
        `,
        image: "/ai-creativity.jpg",
        author: "David Chen",
        category: "Technology",
        status: "published",
        featured: true,
        likes: 45,
        views: 890
      }
    ];

    for (const postData of posts) {
      const newPost = new Post(postData);
      await newPost.save();
      console.log(`Added: ${postData.title}`);
    }

    console.log("All posts added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding posts:", error);
    process.exit(1);
  }
}

addPosts();
