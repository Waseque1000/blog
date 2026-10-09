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

const additionalTechPosts = [
  {
    title: "Full-Stack TypeScript in 2026: Why End-to-End Type Safety is Non-Negotiable",
    slug: "full-stack-typescript-end-to-end-type-safety",
    category: "Programming",
    author: "Alex Mercer",
    featured: false,
    status: "published",
    likes: 318,
    views: 4120,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Learn how modern full-stack architectures combine TypeScript, Zod schema validation, and Next.js Server Actions to eliminate runtime API mismatch bugs forever.",
    createdAt: new Date("2026-10-03T09:00:00Z"),
    updatedAt: new Date("2026-10-03T09:00:00Z"),
    content: `
<h2>The Cost of Siloed Codebases</h2>
<p>For decades, web development operated across a harsh architectural boundary: frontend engineers wrote in JavaScript or TypeScript, backend engineers wrote in Java, Python, or Go, and the contract between them was maintained via manually written API documentation that inevitably drifted out of date.</p>

<p>When a backend engineer renamed a database column from <code>user_id</code> to <code>userId</code>, the client application would fail silently at runtime, resulting in frustrated users and emergency hotfixes. In 2026, <strong>end-to-end type safety</strong> has emerged as the definitive solution.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" alt="Full-stack TypeScript development code" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">Shared type definitions across the entire network boundary eliminate API contract drift and runtime errors.</figcaption>
</figure>

<h2>How End-to-End Type Safety Works</h2>
<p>Instead of manually constructing HTTP requests and guessing response payloads, modern TypeScript frameworks share contracts directly between client and server:</p>

<ol>
  <li><strong>Single Source of Truth:</strong> Validation schemas defined with <a href="/category/programming" class="text-[#4648d4] font-semibold underline">Zod or Valibot</a> serve as both the runtime validator and the compile-time TypeScript type.</li>
  <li><strong>Automatic Autocomplete:</strong> In your React components, typing <code>api.posts.create.useMutation()</code> gives you full intellisense for input arguments, response types, and loading states.</li>
  <li><strong>Instant Refactor Safety:</strong> If you rename a field in your database query, your entire client-side build flags every single component that relied on the old property name before code ever reaches staging.</li>
</ol>

<pre><code>// 1. Define shared contract with Zod
export const PostInputSchema = z.object({
  title: z.string().min(5).max(120),
  content: z.string().min(20),
  category: z.enum(['Technology', 'Programming', 'Tutorial']),
});

// 2. Derive TypeScript type automatically
export type PostInput = z.infer&lt;typeof PostInputSchema&gt;;</code></pre>

<h2>Productivity and Reliability Gains</h2>
<p>Engineering teams that migrate to unified TypeScript stacks report up to <strong>40% fewer production regressions</strong> and dramatically faster onboarding cycles for junior engineers. When the compiler guards your data contracts, developers spend time building customer features rather than debugging undefined payload errors.</p>
    `
  },
  {
    title: "Mastering SQL vs NoSQL: When to Choose PostgreSQL vs MongoDB for Web Apps",
    slug: "sql-vs-nosql-postgresql-vs-mongodb-guide",
    category: "Technology",
    author: "Wasee",
    featured: true,
    status: "published",
    likes: 420,
    views: 5670,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=1200",
    excerpt: "A pragmatic comparison of relational databases (PostgreSQL) and document stores (MongoDB). Understand ACID guarantees, JSONB performance, horizontal scaling, and migration strategies.",
    createdAt: new Date("2026-10-02T16:00:00Z"),
    updatedAt: new Date("2026-10-02T16:00:00Z"),
    content: `
<h2>The Eternal Database Debate</h2>
<p>One of the most consequential architectural decisions for any new project is selecting the underlying database engine. For years, developers were told that SQL was rigid and legacy, while NoSQL was modern and infinitely scalable. The truth is far more nuanced.</p>

<p>Both PostgreSQL and MongoDB are world-class, mature databases capable of handling billions of records. The secret lies in aligning the database's core design philosophy with your application's data access patterns.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200" alt="Server rack and database storage cluster" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">Relational and document storage engines provide specialized trade-offs between consistency, indexing, and flexibility.</figcaption>
</figure>

<h2>When to Choose PostgreSQL</h2>
<p>PostgreSQL is the Swiss Army knife of modern software engineering. It excels in environments where data relationships are heavily interconnected and data integrity is paramount:</p>

<ul>
  <li><strong>Financial & Transactional Systems:</strong> Strict ACID compliance guarantees that account balances and ledger entries never enter inconsistent states.</li>
  <li><strong>Complex Joins & Aggregations:</strong> Powerful SQL query optimization allows you to join dozens of tables across normalized schemas efficiently.</li>
  <li><strong>Hybrid Flexibility with JSONB:</strong> PostgreSQL's native <code>JSONB</code> type and GIN indexes let you store schemaless documents inside a relational table with query speeds matching dedicated document stores.</li>
</ul>

<h2>When to Choose MongoDB</h2>
<p>MongoDB shines when your data naturally represents hierarchical documents and your schema evolves rapidly during early product iteration:</p>

<ul>
  <li><strong>Content Management & Blogs:</strong> An article containing nested comments, tags, and revision histories naturally maps to a single BSON document retrieved in a single read operation.</li>
  <li><strong>High-Velocity Event Logging:</strong> Flexible schemaless collections allow telemetry events with varied metadata payloads to be stored without schema migrations.</li>
  <li><strong>Native Horizontal Sharding:</strong> Built-in partition keys allow MongoDB clusters to distribute terabytes of read/write traffic across geographical shards seamlessly.</li>
</ul>

<blockquote>
  "Don't choose your database based on internet hype. If your data is relational and requires foreign keys, choose PostgreSQL. If your data is naturally hierarchical and read as self-contained documents, choose MongoDB."
</blockquote>
    `
  },
  {
    title: "The Ultimate Web Security Checklist: OWASP Top 10 Defenses for Developers",
    slug: "ultimate-web-security-owasp-top-10-checklist",
    category: "Tutorial",
    author: "David Kim",
    featured: false,
    status: "published",
    likes: 295,
    views: 3780,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Protect your web applications against Cross-Site Scripting (XSS), SQL/NoSQL injection, Broken Access Control, and CSRF attacks with practical code examples and defensive headers.",
    createdAt: new Date("2026-10-01T11:45:00Z"),
    updatedAt: new Date("2026-10-01T11:45:00Z"),
    content: `
<h2>Security Must Be Baked In, Not Bolted On</h2>
<p>Every single day, automated scanning bots probe millions of public web domains for known vulnerabilities. Developing secure software is not an optional extra—it is a core engineering requirement. The Open Web Application Security Project (OWASP) maintains a definitive ranking of the most critical security risks facing web applications.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200" alt="Cybersecurity lock and encryption matrix" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">Implementing defense-in-depth ensures that a failure in one protective layer does not compromise user data.</figcaption>
</figure>

<h2>1. Neutralizing Injection Attacks</h2>
<p>Injection occurs when untrusted user input is concatenated directly into database queries or shell commands. Never concatenate raw strings into SQL or NoSQL queries:</p>

<pre><code>// ❌ DANGEROUS: Susceptible to NoSQL Injection
const user = await db.collection('users').findOne({
  username: req.body.username,
  password: req.body.password
});

// ✅ SECURE: Strict input sanitization with Zod
const parsedInput = LoginSchema.parse(req.body);
const user = await User.findOne({ username: String(parsedInput.username) });</code></pre>

<h2>2. Preventing Cross-Site Scripting (XSS)</h2>
<p>Modern frontend frameworks like React and Next.js automatically escape text inserted into JSX. However, using <code>dangerouslySetInnerHTML</code> without sanitization creates immediate XSS vulnerabilities.</p>

<ul>
  <li>Always pass untrusted HTML through a certified sanitizer like <strong>DOMPurify</strong> or <strong>sanitize-html</strong> before rendering.</li>
  <li>Deploy a strict <strong>Content Security Policy (CSP)</strong> header to restrict which domains can execute JavaScript on your domain.</li>
</ul>

<h2>3. Hardening HTTP Response Headers</h2>
<p>Add these defensive headers in your reverse proxy or <a href="/category/tutorial" class="text-[#4648d4] font-semibold underline">Next.js middleware</a>:</p>

<pre><code>Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()</code></pre>
    `
  },
  {
    title: "Building Real-Time Web Applications with WebSockets and Server-Sent Events (SSE)",
    slug: "real-time-web-apps-websockets-server-sent-events",
    category: "Programming",
    author: "Elena Rivera",
    featured: false,
    status: "published",
    likes: 245,
    views: 3190,
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Compare full-duplex WebSockets with unidirectional Server-Sent Events. Learn how to stream live telemetry, AI tokens, and collaborative updates with minimal connection overhead.",
    createdAt: new Date("2026-09-30T10:15:00Z"),
    updatedAt: new Date("2026-09-30T10:15:00Z"),
    content: `
<h2>The Shift Beyond Short Polling</h2>
<p>In the early days of the web, applications simulated real-time updates by aggressively polling the backend every three seconds via <code>setInterval()</code>. This flooded servers with millions of redundant HTTP requests, consuming bandwidth and battering database connections.</p>

<p>Today, developers have two standardized real-time transmission protocols: <strong>WebSockets</strong> and <strong>Server-Sent Events (SSE)</strong>.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200" alt="Microprocessor circuitry and real-time data bus" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">Streaming protocols maintain persistent connections, eliminating HTTP handshake latency on every message.</figcaption>
</figure>

<h2>Server-Sent Events (SSE): The Lightweight Champion</h2>
<p>If your application only needs to push data from server to client—such as streaming LLM completion tokens, live stock price tickers, or background job progress bars—SSE is the superior choice:</p>

<ul>
  <li><strong>Runs over standard HTTP:</strong> SSE operates directly over HTTP/2 and HTTP/3 without requiring protocol upgrades.</li>
  <li><strong>Automatic Reconnection:</strong> The browser's native <code>EventSource</code> API automatically reconnects if the connection drops and sends the last received message ID.</li>
  <li><strong>Firewall Friendly:</strong> Because it is standard HTTP, enterprise proxies and corporate firewalls do not block SSE connections.</li>
</ul>

<pre><code>// Client-side EventSource in 4 lines of code
const eventSource = new EventSource('/api/live-feed');
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("New update:", data);
};</code></pre>

<h2>WebSockets: Full-Duplex Power</h2>
<p>When you require bidirectional, low-latency communication—such as multiplayer browser games, collaborative canvas editors (like Figma), or chat applications—WebSockets provide an open TCP channel where both client and server can send binary or text frames instantaneously.</p>

<p>By pairing WebSockets with a distributed message broker like Redis Pub/Sub, you can easily scale real-time chat rooms across thousands of concurrent microservice instances.</p>
    `
  },
  {
    title: "Linux Server Hardening Guide: Setting Up a Bulletproof Ubuntu VPS for Production",
    slug: "linux-server-hardening-ubuntu-vps-guide",
    category: "Tutorial",
    author: "Wasee",
    featured: false,
    status: "published",
    likes: 380,
    views: 4890,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=1200",
    excerpt: "A complete step-by-step checklist to secure a fresh Ubuntu cloud VPS: non-root sudo users, SSH key authentication, UFW firewall, fail2ban protection, and automated security updates.",
    createdAt: new Date("2026-09-29T14:30:00Z"),
    updatedAt: new Date("2026-09-29T14:30:00Z"),
    content: `
<h2>The First 15 Minutes on a Cloud Server</h2>
<p>When you spin up a brand new virtual private server (VPS) on DigitalOcean, Hetzner, AWS, or Linode, automated reconnaissance bots will attempt to brute-force your SSH port within sixty seconds. Leaving default configurations active is a recipe for server compromise.</p>

<p>Follow this exact checklist to transform a fresh Ubuntu installation into an enterprise-hardened production bastion.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1200" alt="Linux terminal shell running security configuration commands" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">Disabling password authentication and configuring automated packet filtering drastically minimizes your server attack surface.</figcaption>
</figure>

<h2>Step 1: Create a Dedicated Deploy User</h2>
<p>Never run your production applications as <code>root</code>. Create a dedicated user with administrative privileges:</p>

<pre><code># 1. Add user
adduser deployer

# 2. Grant sudo permissions
usermod -aG sudo deployer

# 3. Copy your local SSH key to the new user
rsync --archive --chown=deployer:deployer ~/.ssh /home/deployer</code></pre>

<h2>Step 2: Disable Root Login and Password Authentication</h2>
<p>Edit your OpenSSH daemon configuration at <code>/etc/ssh/sshd_config.d/security.conf</code>:</p>

<pre><code>PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
X11Forwarding no
MaxAuthTries 3</code></pre>

<p>Restart the SSH service with <code>sudo systemctl restart ssh</code>. <strong>Crucial tip:</strong> Keep your existing terminal session open and test logging in through a second terminal before closing your root window!</p>

<h2>Step 3: Configure UFW (Uncomplicated Firewall)</h2>
<p>Block all incoming traffic by default, permitting only SSH, HTTP, and HTTPS:</p>

<pre><code>sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow http
sudo ufw allow https
sudo ufw enable</code></pre>

<h2>Step 4: Automatic Patching with Unattended-Upgrades</h2>
<p>Zero-day Linux vulnerabilities are patched rapidly by the open-source community, but you must ensure your server applies them automatically:</p>

<pre><code>sudo apt install unattended-upgrades fail2ban -y
sudo dpkg-reconfigure -plow unattended-upgrades</code></pre>

<p>With these four foundational steps complete, your Ubuntu server is robustly shielded against opportunistic cyber scans, leaving you free to focus on deploying your containerized applications.</p>
    `
  },
  {
    title: "Modern State Management in React: Zustand, TanStack Query, and Context Compared",
    slug: "react-state-management-zustand-tanstack-query-guide",
    category: "Programming",
    author: "Sarah Jenkins",
    featured: false,
    status: "published",
    likes: 260,
    views: 3450,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Why Redux is no longer the default answer: learn how modern React engineers separate asynchronous server state (TanStack Query) from transient client UI state (Zustand).",
    createdAt: new Date("2026-09-28T13:20:00Z"),
    updatedAt: new Date("2026-09-28T13:20:00Z"),
    content: `
<h2>The Great State Management Enlightenment</h2>
<p>In the early days of React, developers stuffed everything into a global Redux store: form inputs, fetched database posts, modal open/close states, and user sessions. This required hundreds of lines of boilerplate actions, reducers, and thunks for the simplest UI updates.</p>

<p>The turning point arrived when engineers realized that web application state falls into two fundamentally distinct categories: <strong>Server State</strong> and <strong>Client State</strong>.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200" alt="React developer laptop with code and clean state store" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">Differentiating between asynchronous cached server data and local component UI state creates clean, maintainable frontends.</figcaption>
</figure>

<h2>Server State: TanStack Query (React Query)</h2>
<p>Server state is asynchronous, owned remotely, and requires caching, background re-fetching, and deduplication. TanStack Query manages this out-of-the-box:</p>

<ul>
  <li>Eliminates manual <code>useEffect</code> fetch calls and tracking loading/error booleans.</li>
  <li>Provides instant optimistic UI updates and automated window-focus revalidation.</li>
  <li>Deduplicates simultaneous identical requests across separate components automatically.</li>
</ul>

<h2>Client State: Zustand</h2>
<p>For client-only state that does not come from a database—such as dark mode toggles, shopping cart drawers, or audio player progress—<strong>Zustand</strong> provides an ultra-lightweight store with zero boilerplate:</p>

<pre><code>import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));</code></pre>

<p>Zustand uses subscription-based selectors, meaning components only re-render when the exact state slice they consume changes—completely bypassing React Context's infamous tree-wide re-render cascade!</p>
    `
  },
  {
    title: "AI-Assisted Software Engineering: Context Windows, System Prompts & Coding Agents",
    slug: "ai-assisted-software-engineering-agents-guide",
    category: "Technology",
    author: "Alex Mercer",
    featured: true,
    status: "published",
    likes: 510,
    views: 6890,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
    excerpt: "How to move beyond simple code autocomplete: learn how Model Context Protocol (MCP), agentic loops, and context engineering turn LLMs into autonomous developer pair-programmers.",
    createdAt: new Date("2026-09-27T15:00:00Z"),
    updatedAt: new Date("2026-09-27T15:00:00Z"),
    content: `
<h2>The Evolution from Tab-Complete to Agentic Coworkers</h2>
<p>The first generation of AI coding tools acted essentially as glorified autocomplete engines. They suggested the next three lines of a for-loop or filled in boilerplate variable declarations. While convenient, they lacked awareness of your larger project structure, your database schema, and your test suites.</p>

<p>We are now living in the era of <strong>autonomous coding agents</strong>. These systems don't just write code—they read directory structures, execute terminal commands, run tests, diagnose compiler errors, and iterate until the feature is complete.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200" alt="Artificial intelligence neural connections and autonomous agent graph" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">Agentic frameworks pair LLMs with real-world tool execution, creating reliable loop-based developer assistants.</figcaption>
</figure>

<h2>Context Engineering: The Real Secret to High-Quality Output</h2>
<p>An AI model is only as smart as the context provided to its inference window. Simply pasting raw code into a prompt leads to hallucinations. High-performing engineering teams employ context engineering patterns:</p>

<ol>
  <li><strong>Abstract Syntax Tree (AST) Indexing:</strong> Parsing source code into structured symbol graphs so the model receives exact function signatures rather than thousands of irrelevant lines.</li>
  <li><strong>System Prompts with Strict Guardrails:</strong> Instructing models on architectural principles, naming conventions, and linting rules specific to your repository.</li>
  <li><strong>Model Context Protocol (MCP):</strong> A standardized protocol that enables AI models to connect securely to local filesystems, Docker engines, GitHub APIs, and database instances.</li>
</ol>

<blockquote>
  "The best software engineers of the next decade won't be those who memorize syntax, but those who excel at orchestrating AI agents, verifying architecture, and designing bulletproof systems."
</blockquote>
    `
  },
  {
    title: "How DNS Actually Works: From Domain Query to IP Address Resolution",
    slug: "how-dns-works-domain-resolution-explained",
    category: "Technology",
    author: "David Kim",
    featured: false,
    status: "published",
    likes: 330,
    views: 4250,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Demystifying the phonebook of the internet: follow the journey of a DNS query through recursive resolvers, root servers, TLD servers, and authoritative nameservers in under 30 milliseconds.",
    createdAt: new Date("2026-09-26T17:15:00Z"),
    updatedAt: new Date("2026-09-26T17:15:00Z"),
    content: `
<h2>The Unsung Backbone of the Global Internet</h2>
<p>Whenever you type a URL like <code>example.com</code> into your browser's address bar, your device executes a distributed lookup across the globe before transferring a single byte of HTML. This system is the <strong>Domain Name System (DNS)</strong>.</p>

<p>Humans remember words and names; computer networks communicate exclusively in numerical binary IP addresses (like <code>192.0.2.1</code> or IPv6 <code>2001:db8::1</code>). DNS translates human intent into machine routing.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=1200" alt="Global cloud datacenter networking infrastructure" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">Geographically distributed anycast DNS resolvers resolve domain queries in under 20 milliseconds worldwide.</figcaption>
</figure>

<h2>The 4 Key Players in a DNS Resolution</h2>
<p>When your computer cannot find the domain in its local operating system cache, the query embarks on a four-stage hierarchy:</p>

<ol>
  <li><strong>DNS Recursive Resolver:</strong> Usually provided by your ISP or a public provider (like Cloudflare's <code>1.1.1.1</code> or Google's <code>8.8.8.8</code>). It acts as the detective responsible for querying each subsequent server on your behalf.</li>
  <li><strong>Root Nameservers:</strong> Thirteen root IP clusters distributed worldwide that direct queries to the appropriate Top-Level Domain (TLD) registry.</li>
  <li><strong>TLD Nameservers:</strong> Servers responsible for managing specific domain extensions (such as <code>.com</code>, <code>.org</code>, <code>.dev</code>).</li>
  <li><strong>Authoritative Nameserver:</strong> The final stop (often hosted by DNS providers like Cloudflare, AWS Route 53, or Namecheap). This server holds the actual DNS records for the domain and returns the destination IP address.</li>
</ol>

<h2>Core DNS Record Types Every Developer Must Know</h2>
<ul>
  <li><strong>A Record:</strong> Maps a domain or subdomain to an IPv4 address.</li>
  <li><strong>AAAA Record:</strong> Maps a domain to a 128-bit IPv6 address.</li>
  <li><strong>CNAME (Canonical Name):</strong> Aliases one domain name to another domain name (cannot coexist with other records at the apex root).</li>
  <li><strong>MX (Mail Exchange):</strong> Directs incoming email traffic to your mail server (e.g. Google Workspace, Proton).</li>
  <li><strong>TXT Record:</strong> Holds arbitrary text used for domain verification, SPF email authentication, and DKIM keys.</li>
</ul>

<p>Understanding DNS TTL (Time To Live) caching settings and Anycast routing empowers web engineers to execute zero-downtime server migrations and deploy resilient global web applications.</p>
    `
  }
];

async function addSeoPosts() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    console.log(`Upserting ${additionalTechPosts.length} new high-impact SEO tech posts...`);
    for (const postData of additionalTechPosts) {
      await Post.findOneAndUpdate(
        { slug: postData.slug },
        postData,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`Added/Updated: "${postData.title}" [${postData.category}]`);
    }

    const totalCount = await Post.countDocuments({ status: "published" });
    const categoryStats = await Post.aggregate([
      { $match: { status: "published" } },
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    console.log("\n=== Current Published Posts Breakdown ===");
    console.log(`Total Published Posts: ${totalCount}`);
    console.log(categoryStats);

    process.exit(0);
  } catch (error) {
    console.error("Error adding SEO posts:", error);
    process.exit(1);
  }
}

addSeoPosts();
