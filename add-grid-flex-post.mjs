import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://blog:17N13zUy3y4Hkwy0@cluster0.vvmbcal.mongodb.net/blog?retryWrites=true&w=majority";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true, index: true },
    author: { type: String, default: "Wasee" },
    status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

const gridFlexPost = {
  title: "CSS Grid vs Flexbox: The Definitive Guide to Modern Web Layouts",
  slug: "css-grid-vs-flexbox-modern-web-layouts-guide",
  category: "Programming",
  author: "Wasee",
  featured: true,
  status: "published",
  likes: 412,
  views: 5240,
  image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
  excerpt: "Stop guessing between display: flex and display: grid. Learn the fundamental differences between 1D and 2D layout models, when to use each, and how to combine them for bulletproof responsive interfaces.",
  createdAt: new Date("2026-10-04T12:00:00Z"),
  updatedAt: new Date("2026-10-04T12:00:00Z"),
  content: `
<h2>The Age-Old Frontend Question: Grid or Flexbox?</h2>
<p>One of the most persistent debates among web developers is deciding whether to reach for <code>display: flex</code> or <code>display: grid</code> when building a user interface. Early in CSS history, developers had to rely on brittle floats, clearfixes, inline-block spacing hacks, and absolute positioning tricks just to create a basic two-column layout.</p>

<p>Today, CSS gives us two layout titans. While some developers treat them as rivals or default exclusively to one over the other, the secret to modern responsive design is understanding that <strong>Grid and Flexbox were engineered to solve completely different problems</strong>—and they achieve their greatest magic when used together.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1200" alt="UI designer and frontend developer analyzing web typography and layout grids" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">CSS Grid provides two-dimensional structural scaffolding, while Flexbox governs one-dimensional content alignment within components.</figcaption>
</figure>

<h2>The Core Difference: 1D vs. 2D Layouts</h2>
<p>The single most important distinction can be summarized in one sentence:</p>

<blockquote>
  "Flexbox is designed for one-dimensional layouts (a single row OR a single column), while CSS Grid is designed for two-dimensional layouts (rows AND columns simultaneously)."
</blockquote>

<!-- Visual Comparison Block -->
<div class="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#f8f9ff] via-[#f0f2ff] to-[#e8ebff] border border-[#c7c4d7]/40 shadow-sm not-prose">
  <div class="flex items-center gap-2 mb-3">
    <span class="material-symbols-outlined text-[#4648d4] text-[24px]">view_quilt</span>
    <h3 class="text-xl font-bold text-[#131b2e]">Visual Architecture: Flexbox vs. CSS Grid</h3>
  </div>
  <p class="text-sm text-[#464554] mb-6">
    See the physical difference in behavior below. Notice how Flexbox items wrap independently without strict column alignment, while CSS Grid enforces rigid 2D alignment across both rows and columns.
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Flexbox Demo Block -->
    <div class="p-5 rounded-xl bg-white border border-[#c7c4d7]/30 shadow-sm">
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-bold uppercase tracking-wider text-[#4648d4] flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-[#4648d4]"></span>
          Flexbox (1D Content-Driven)
        </span>
        <code class="text-[11px] bg-[#e1e0ff] text-[#4648d4] px-2 py-0.5 rounded font-mono font-semibold">display: flex; flex-wrap: wrap;</code>
      </div>
      <div class="p-3 bg-[#faf8ff] rounded-lg border border-dashed border-[#4648d4]/30 flex flex-wrap gap-2 min-h-[140px] items-start content-start">
        <div class="px-3.5 py-2 rounded-md bg-[#4648d4] text-white text-xs font-semibold shadow-sm flex-1 min-w-[70px] text-center">Item 1 (Wide)</div>
        <div class="px-3 py-2 rounded-md bg-[#6063ee] text-white text-xs font-semibold shadow-sm text-center">Item 2</div>
        <div class="px-4 py-2 rounded-md bg-[#4648d4] text-white text-xs font-semibold shadow-sm flex-1 min-w-[90px] text-center">Item 3 (Expands)</div>
        <div class="px-5 py-2 rounded-md bg-[#6063ee] text-white text-xs font-semibold shadow-sm flex-1 text-center">Item 4 (Wraps alone to row 2)</div>
        <div class="px-3 py-2 rounded-md bg-[#4648d4] text-white text-xs font-semibold shadow-sm text-center">Item 5</div>
      </div>
      <p class="text-[11px] text-[#767585] mt-3 italic">
        ↳ In Flexbox, row 2 items do not align with row 1 columns. Each row is an isolated 1D axis.
      </p>
    </div>

    <!-- CSS Grid Demo Block -->
    <div class="p-5 rounded-xl bg-white border border-[#c7c4d7]/30 shadow-sm">
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-bold uppercase tracking-wider text-[#00628d] flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-[#00628d]"></span>
          CSS Grid (2D Coordinate Matrix)
        </span>
        <code class="text-[11px] bg-[#e0f2fe] text-[#00628d] px-2 py-0.5 rounded font-mono font-semibold">display: grid; grid-template-columns: repeat(3, 1fr);</code>
      </div>
      <div class="p-3 bg-[#f0f9ff] rounded-lg border border-dashed border-[#00628d]/30 grid grid-cols-3 gap-2 min-h-[140px]">
        <div class="p-2 rounded-md bg-[#00628d] text-white text-xs font-semibold shadow-sm flex items-center justify-center text-center">Col 1, Row 1</div>
        <div class="p-2 rounded-md bg-[#0284c7] text-white text-xs font-semibold shadow-sm flex items-center justify-center text-center">Col 2, Row 1</div>
        <div class="p-2 rounded-md bg-[#00628d] text-white text-xs font-semibold shadow-sm flex items-center justify-center text-center">Col 3, Row 1</div>
        <div class="p-2 rounded-md bg-[#0284c7] text-white text-xs font-semibold shadow-sm flex items-center justify-center text-center">Col 1, Row 2</div>
        <div class="p-2 rounded-md bg-[#00628d] text-white text-xs font-semibold shadow-sm flex items-center justify-center text-center">Col 2, Row 2</div>
        <div class="p-2 rounded-md bg-[#0284c7] text-white text-xs font-semibold shadow-sm flex items-center justify-center text-center">Col 3, Row 2</div>
      </div>
      <p class="text-[11px] text-[#767585] mt-3 italic">
        ↳ In Grid, elements lock to mathematical coordinate tracks across both X and Y axes.
      </p>
    </div>
  </div>
</div>

<h3>1. Flexbox: Content-First (One Dimension)</h3>
<p>Flexbox excels when you care about the relationship of items along a single axis. You place items in a container, and Flexbox distributes them based on their intrinsic size, wrapping them to new lines if necessary. However, each wrapped line in Flexbox is completely independent—items on the second row do not align with items on the first row.</p>

<h3>2. CSS Grid: Layout-First (Two Dimensions)</h3>
<p>CSS Grid works from the outside in. You define strict columns and rows on the parent container, creating a rigid coordinate system. When child elements are placed into the grid, they must adhere to the vertical and horizontal grid tracks, guaranteeing strict alignment across both axes simultaneously.</p>

<h2>When Flexbox is the Clear Winner</h2>

<h3>A. Navigation Bars and Header Rows</h3>
<p>A classic top navigation bar needs a logo on the left, navigation links in the center, and a call-to-action button on the right. This is a textbook Flexbox scenario:</p>

<pre><code>.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}</code></pre>

<h3>B. Perfectly Centering Anything</h3>
<p>Before Flexbox, vertical centering was the source of endless developer memes. With Flexbox, centering content in both directions requires just three lines:</p>

<pre><code>.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
}</code></pre>

<h3>C. Tag Clouds and Pill Lists</h3>
<p>When rendering a list of tags or badge filters with variable label lengths, Flexbox allows items to flow naturally and wrap cleanly:</p>

<pre><code>.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}</code></pre>

<h2>When CSS Grid Dominates</h2>

<h3>A. Responsive Card Galleries (Zero Media Queries!)</h3>
<p>With Flexbox, building a responsive 3-column card grid usually requires calculating clumsy percentage widths (<code>width: calc(33.333% - 1rem)</code>) and overriding them with multiple media queries. With CSS Grid, you can create a fully responsive, self-adjusting grid in a single line:</p>

<pre><code>.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}</code></pre>
<p>As the viewport shrinks, the grid automatically drops columns from 4 to 3, 2, and 1 without writing a single <code>@media</code> breakpoint!</p>

<h3>B. The 'Holy Grail' Page Layout</h3>
<p>When orchestrating a full application layout with a header, sticky sidebar, scrollable main content area, and footer, CSS Grid's <code>grid-template-areas</code> makes code readable like an architectural blueprint:</p>

<pre><code>.app-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 260px 1fr;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }</code></pre>

<h3>C. Overlapping Elements (Banners & Hero Badges)</h3>
<p>In CSS Grid, multiple child elements can occupy the exact same row and column coordinates. This eliminates the need for <code>position: absolute</code> when overlaying text or badges over images:</p>

<pre><code>.hero-card {
  display: grid;
}

.hero-image,
.hero-overlay {
  grid-area: 1 / 1; /* Both occupy the exact same cell */
}</code></pre>

<h2>The Golden Combination: Grid on the Outside, Flex on the Inside</h2>
<p>The most resilient, production-grade applications don't pick sides—they compose both layout tools in harmony:</p>

<ul>
  <li>Use <strong>CSS Grid</strong> for the macro layout: page templates, dashboard sidebars, and responsive product card grids.</li>
  <li>Use <strong>Flexbox</strong> for the micro layout: aligning icons with text inside buttons, arranging metadata items inside blog card footers, and spacing navbar links.</li>
</ul>

<pre><code>/* Macro: Grid coordinates the cards */
.blog-feed {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

/* Micro: Flexbox aligns the card contents */
.blog-card {
  display: flex;
  flex-direction: column;
}

.blog-card-footer {
  margin-top: auto; /* Pushes footer to the bottom */
  display: flex;
  justify-content: space-between;
  align-items: center;
}</code></pre>

<h2>Quick Comparison: Flexbox vs. CSS Grid</h2>
<div class="my-8 overflow-x-auto rounded-2xl border border-[#c7c4d7]/30 shadow-sm not-prose bg-white">
  <table class="w-full text-left border-collapse text-xs sm:text-sm">
    <thead>
      <tr class="bg-[#131b2e] text-white">
        <th class="py-3.5 px-4 font-bold">Feature</th>
        <th class="py-3.5 px-4 font-bold text-[#b4b7ff]">Flexbox</th>
        <th class="py-3.5 px-4 font-bold text-[#7dd3fc]">CSS Grid</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-[#c7c4d7]/20 text-[#464554]">
      <tr class="hover:bg-[#f9faff]">
        <td class="py-3 px-4 font-semibold text-[#131b2e]">Dimensionality</td>
        <td class="py-3 px-4">1D (Row OR Column)</td>
        <td class="py-3 px-4">2D (Rows AND Columns)</td>
      </tr>
      <tr class="hover:bg-[#f9faff]">
        <td class="py-3 px-4 font-semibold text-[#131b2e]">Layout Approach</td>
        <td class="py-3 px-4">Content-first (items push boundaries)</td>
        <td class="py-3 px-4">Container-first (grid dictates cells)</td>
      </tr>
      <tr class="hover:bg-[#f9faff]">
        <td class="py-3 px-4 font-semibold text-[#131b2e]">Best For</td>
        <td class="py-3 px-4">Navbars, tags, buttons, vertical centering</td>
        <td class="py-3 px-4">Page templates, card galleries, dashboards</td>
      </tr>
      <tr class="hover:bg-[#f9faff]">
        <td class="py-3 px-4 font-semibold text-[#131b2e]">Item Overlap</td>
        <td class="py-3 px-4">Requires negative margins or absolute position</td>
        <td class="py-3 px-4">Native cell sharing (grid-area: 1 / 1)</td>
      </tr>
      <tr class="hover:bg-[#f9faff]">
        <td class="py-3 px-4 font-semibold text-[#131b2e]">Responsive Breakpoints</td>
        <td class="py-3 px-4">Manual media queries for column counts</td>
        <td class="py-3 px-4">Auto-fitting with repeat(auto-fit, minmax(...))</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Summary Checklist</h2>
<ul>
  <li>Need items in a straight row or column? 👉 <strong>Flexbox</strong></li>
  <li>Need items aligned in both rows and columns? 👉 <strong>Grid</strong></li>
  <li>Need content size to dictate the spacing? 👉 <strong>Flexbox</strong></li>
  <li>Need the container grid structure to dictate the sizing? 👉 <strong>Grid</strong></li>
  <li>Building a card gallery or full dashboard shell? 👉 <strong>Grid</strong></li>
  <li>Centering a modal dialog or aligning icon buttons? 👉 <strong>Flexbox</strong></li>
</ul>
  `
};

async function addPost() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    await Post.findOneAndUpdate(
      { slug: gridFlexPost.slug },
      gridFlexPost,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`Successfully added/updated: "${gridFlexPost.title}"`);

    const total = await Post.countDocuments({ status: "published" });
    console.log(`Total Published Posts: ${total}`);
    process.exit(0);
  } catch (error) {
    console.error("Error adding post:", error);
    process.exit(1);
  }
}

addPost();
