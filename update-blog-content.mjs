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

const newTechPosts = [
  {
    title: "The Rise of Local AI: How to Run Open-Source LLMs Privately on Your Mac or PC",
    slug: "rise-of-local-ai-open-source-llms",
    category: "Technology",
    author: "Wasee",
    featured: true,
    status: "published",
    likes: 342,
    views: 4210,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Discover how tools like Ollama, LM Studio, and llama.cpp enable private, lightning-fast generative AI directly on your consumer hardware without cloud subscription fees or data privacy leaks.",
    createdAt: new Date("2026-10-02T10:30:00Z"),
    updatedAt: new Date("2026-10-02T10:30:00Z"),
    content: `
<h2>Why Local AI is Taking Over Modern Computing</h2>
<p>For the past few years, the dominant paradigm in artificial intelligence has been cloud-first. Whenever you wanted to generate code, draft an email, or analyze data, you sent prompts across the internet to massive data centers operated by OpenAI, Microsoft, or Google. However, in 2026, the pendulum is swinging rapidly toward local, on-device intelligence.</p>

<p>Running large language models locally offers three transformative benefits that cloud APIs cannot match: <strong>complete data sovereignty</strong>, <strong>zero per-token subscription costs</strong>, and <strong>sub-millisecond latency</strong> with zero dependence on internet connectivity.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200" alt="High performance silicon processor and neural engine" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">Dedicated Neural Processors (NPUs) and unified high-bandwidth memory make on-device inference viable on modern laptops.</figcaption>
</figure>

<h2>Hardware Requirements: What Do You Need?</h2>
<p>Contrary to popular belief, you no longer need an industrial cluster of liquid-cooled enterprise GPUs to run capable AI models. The sweet spot for running local LLMs depends heavily on unified memory and quantization techniques:</p>

<ul>
  <li><strong>Apple Silicon (M2/M3/M4 Series):</strong> Because Apple's unified memory architecture allows CPU and GPU to share the same ultra-high-bandwidth RAM pool, an M3 or M4 MacBook with 36GB to 64GB of RAM can run 70B parameter models smoothly at 15–25 tokens per second.</li>
  <li><strong>Windows & Linux Desktops:</strong> An NVIDIA RTX 4070/4080 with 12GB to 16GB of VRAM allows lightning-fast execution for 8B and 14B parameter models using 4-bit and 8-bit quantized weights (GGUF/AWQ).</li>
  <li><strong>Budget Hardware:</strong> Even lightweight laptops with 16GB of system RAM can comfortably execute compact models like Phi-4, Gemma 2 9B, or Mistral 7B using standard CPU inference via llama.cpp.</li>
</ul>

<h2>The Top Tools to Get Started in 5 Minutes</h2>
<p>The developer experience around local inference has reached near-magical simplicity:</p>

<h3>1. Ollama (Command-Line Powerhouse)</h3>
<p>Ollama is the Docker of AI models. Installing it takes a single curl command, after which pulling and running models is as effortless as:</p>
<pre><code>ollama run llama3.3</code></pre>
<p>Ollama also hosts a local OpenAI-compatible REST server at <code>http://localhost:11434/v1</code>, allowing you to plug your local models into popular coding extensions like Continue.dev, VS Code, and Obsidian seamlessly.</p>

<h3>2. LM Studio & Jan.ai (Visual Interfaces)</h3>
<p>If you prefer an elegant graphical application with chat threads, temperature sliders, system prompt customizers, and one-click HuggingFace downloads, LM Studio provides a native, GPU-accelerated chat experience that rivals web-based ChatGPT.</p>

<blockquote>
  "Local AI represents the decentralization of intelligence. When state-of-the-art models fit into your backpack, developers gain true autonomy over their software stack."
</blockquote>

<h2>Conclusion: The Future is Hybrid</h2>
<p>While massive 1-trillion-parameter frontier models will still handle ultra-complex scientific reasoning in the cloud, local AI has officially won the battle for daily coding assistance, private document search, and personal journaling. If you haven't installed Ollama or LM Studio yet, today is the best time to take your privacy back.</p>
    `
  },
  {
    title: "Next.js App Router Masterclass: Server Components, Streaming, and Advanced Caching",
    slug: "nextjs-app-router-server-components-guide",
    category: "Programming",
    author: "Alex Mercer",
    featured: false,
    status: "published",
    likes: 215,
    views: 3890,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Unpack how React Server Components (RSC), Suspense streaming boundaries, and Next.js revalidation primitives collaborate to build blazing-fast web architectures with minimal client JavaScript.",
    createdAt: new Date("2026-10-01T14:15:00Z"),
    updatedAt: new Date("2026-10-01T14:15:00Z"),
    content: `
<h2>The Paradigm Shift of React Server Components</h2>
<p>When Next.js introduced the App Router, many developers were taken aback by the fundamental departure from traditional single-page application (SPA) mental models. In an SPA or early SSR setups, components are rendered on the server and then completely hydrated on the client browser, duplicating both memory and JavaScript bundle size.</p>

<p>React Server Components (RSCs) introduce a revolutionary architecture: components that run <strong>strictly on the server</strong> and emit a compact JSON representation rather than JavaScript bundle payload. They can query databases directly, read the local filesystem, and leverage heavy npm dependencies without adding a single byte to the client bundle.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200" alt="Developer coding React components on laptop" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">Writing modular, composable server-first architectures minimizes bundle payloads transferred across mobile networks.</figcaption>
</figure>

<h2>Streaming and Progressive Hydration with Suspense</h2>
<p>Before React Server Components, slow database queries held up the entire HTML response, resulting in sluggish Time-to-First-Byte (TTFB). With the App Router, you wrap asynchronous server components in <code>&lt;Suspense&gt;</code> boundaries:</p>

<pre><code>import { Suspense } from 'react';
import SlowDatabaseFeed from './SlowDatabaseFeed';
import SkeletonLoader from './SkeletonLoader';

export default function FeedPage() {
  return (
    &lt;main className="max-w-4xl mx-auto p-6"&gt;
      &lt;h1 className="text-2xl font-bold"&gt;Live Activity&lt;/h1&gt;
      &lt;Suspense fallback={&lt;SkeletonLoader /&gt;}&gt;
        &lt;SlowDatabaseFeed /&gt;
      &lt;/Suspense&gt;
    &lt;/main&gt;
  );
}</code></pre>

<p>The browser immediately receives the shell, header, and skeleton loaders over HTTP chunks. As soon as the database query resolves on the edge node, the stream pumps the rendered component HTML directly into the page without a full page refresh.</p>

<h2>Demystifying the Next.js 4-Tier Caching System</h2>
<p>The source of confusion for many newcomers is how Next.js handles caching. Understanding each layer prevents stale data bugs:</p>

<ol>
  <li><strong>Request Memoization:</strong> Deduplicates identical <code>fetch()</code> requests during a single render pass across different server components.</li>
  <li><strong>Data Cache:</strong> Persists data across user requests and server deployments using custom tags like <code>fetch(url, { next: { tags: ['posts'] } })</code>.</li>
  <li><strong>Full Route Cache:</strong> Caches static HTML and RSC payloads at build or revalidation time.</li>
  <li><strong>Router Cache (Client-side):</strong> In-memory client cache that remembers visited routes in the user's browser session.</li>
</ol>

<blockquote>
  "The golden rule of modern Next.js: Keep components as Server Components by default, and only drop down to 'use client' at the very leaves of your component tree where user interaction or event listeners are required."
</blockquote>

<h2>Key Takeaways for Production Codebases</h2>
<p>By leveraging Server Actions for form submissions, granular Suspense boundaries for independent component streams, and on-demand revalidation tags (<code>revalidateTag()</code>), you eliminate state management bloat and deliver websites that load in under 200 milliseconds worldwide.</p>
    `
  },
  {
    title: "Mastering Docker & Containerization: From Local Development to Production",
    slug: "mastering-docker-containerization-guide",
    category: "Tutorial",
    author: "Elena Rivera",
    featured: false,
    status: "published",
    likes: 188,
    views: 2760,
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Learn how Linux namespaces and cgroups power containers, how to write lean multi-stage Dockerfiles, eliminate image bloat, and manage multi-container services with Docker Compose.",
    createdAt: new Date("2026-09-30T16:45:00Z"),
    updatedAt: new Date("2026-09-30T16:45:00Z"),
    content: `
<h2>The 'Works on My Machine' Era is Officially Dead</h2>
<p>Every software engineer has encountered the frustrating scenario where code runs flawlessly on a local MacBook or Linux workstation, only to crash abruptly when deployed onto a staging or production server due to mismatched Node.js versions, missing shared libraries, or altered environment paths.</p>

<p>Docker solves this once and for all by packaging your application code, runtime, system tools, and dependencies into an immutable, portable artifact known as a <strong>container image</strong>.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1200" alt="Terminal shell running automated Docker deployment" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">Containerization eliminates the 'works on my machine' dilemma through deterministic, isolated environments.</figcaption>
</figure>

<h2>How Containers Differ from Virtual Machines</h2>
<p>While traditional virtual machines (VMs) run a complete guest operating system atop a hypervisor—consuming gigabytes of disk space and requiring minutes to boot—containers share the host operating system kernel using two core Linux primitives:</p>

<ul>
  <li><strong>Namespaces:</strong> Provide complete process isolation, guaranteeing that processes inside the container cannot see or interfere with host processes or network interfaces.</li>
  <li><strong>Control Groups (cgroups):</strong> Enforce hardware resource limits, preventing any single container from exhausting CPU cycles or system RAM.</li>
</ul>

<h2>Writing a Production-Ready Multi-Stage Dockerfile</h2>
<p>The biggest beginner mistake is copying the entire project folder and build dependencies into a single production image, resulting in bloated 1.2GB images with open security vulnerabilities. A multi-stage build cleanly separates the build environment from the lean runtime output:</p>

<pre><code># Stage 1: Build & Compile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Minimal Production Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && \\
    adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]</code></pre>

<p>This simple refactor shrinks your production image down to less than 90MB, dramatically speeds up container pull times in CI/CD pipelines, and eliminates build tools from your runtime container for superior security hardening.</p>

<h2>Managing Full Stacks with Docker Compose</h2>
<p>When building modern applications that require a database, cache layer, and reverse proxy, Docker Compose orchestrates the entire fleet with declarative YAML:</p>

<pre><code>version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:password@db:5432/app
    depends_on:
      - db
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: app
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:</code></pre>

<p>A single <code>docker compose up -d</code> spins up the isolated network, provisions the persistent volume, and connects the database automatically, allowing any developer on your team to onboard in seconds.</p>
    `
  },
  {
    title: "Essential Cybersecurity Habits Every Developer and Tech Worker Should Adopt",
    slug: "essential-cybersecurity-habits-developers",
    category: "Technology",
    author: "David Kim",
    featured: false,
    status: "published",
    likes: 270,
    views: 3420,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Secure your digital footprint against credential stuffing, SIM swaps, and supply chain threats using FIDO2 hardware keys, password managers, SSH key hygiene, and Zero-Trust network practices.",
    createdAt: new Date("2026-09-29T11:20:00Z"),
    updatedAt: new Date("2026-09-29T11:20:00Z"),
    content: `
<h2>Developers Are High-Value Targets</h2>
<p>In the modern cyber landscape, individual software developers and system administrators are the premier targets for malicious actors. An attacker who compromises a developer's workstation or personal accounts gains potential access to source code repositories, API secret keys, cloud deployment credentials, and supply chain injection vectors.</p>

<p>Fortunately, maintaining a hardened security posture does not require paranoia—it requires consistent, pragmatic habits enforced through modern tooling.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" alt="Cybersecurity shield and encrypted circuit visualization" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">Adopting hardware-backed authentication shields your critical developer infrastructure from sophisticated credential replay attacks.</figcaption>
</figure>

<h2>1. Kill SMS 2FA: Move to Hardware Keys and Passkeys</h2>
<p>SMS-based two-factor authentication is dangerously obsolete due to widespread SIM swapping attacks and social engineering against telecommunication carriers. Similarly, standard authenticator apps (TOTP) remain vulnerable to real-time reverse-proxy phishing kits like Evilginx.</p>

<p>The gold standard is <strong>FIDO2 / WebAuthn hardware security keys</strong> (such as YubiKey or Titan Security Keys) and modern platform Passkeys. Because FIDO2 relies on public-key cryptography bound directly to the browser's domain, even if you enter your credentials on a pixel-perfect phishing site, your hardware key will refuse to sign the challenge.</p>

<h2>2. Preventing Accidental Secret Leaks in Git</h2>
<p>One of the most common catastrophic mistakes is accidentally committing an <code>.env</code> file containing AWS secret keys, Stripe tokens, or database passwords to a public GitHub repository. Scraper bots scan the public commit feed within seconds of publication.</p>

<ul>
  <li><strong>Install pre-commit hooks:</strong> Tools like <code>gitleaks</code> or <code>trufflehog</code> run locally before every git commit, aborting the operation if regex patterns identify private keys or bearer tokens.</li>
  <li><strong>Use automated secret managers:</strong> Instead of storing plain strings in environment files, adopt tools like 1Password CLI, Doppler, or AWS Secrets Manager to inject environment variables at runtime into your terminal shell.</li>
  <li><strong>Sign your Git commits:</strong> Configure SSH or GPG commit signing so GitHub displays the green "Verified" badge, preventing impersonation of your committer identity.</li>
</ul>

<h2>3. SSH Key Hygiene and Workstation Hardening</h2>
<p>Still using legacy RSA 2048-bit keys? Upgrade immediately to <strong>Ed25519</strong> keys with a strong passphrase:</p>
<pre><code>ssh-keygen -t ed25519 -C "developer@think.com"</code></pre>

<p>Never copy private keys across devices. Use SSH agent forwarding with caution, or configure FIDO2-backed resident SSH keys (<code>ssh-keygen -t ed25519-sk</code>) where the private key requires physical touch on a USB token before each connection is permitted.</p>

<blockquote>
  "Security is not a product you buy; it is a discipline of reducing attack surface area until an exploit becomes economically impractical for the adversary."
</blockquote>
    `
  },
  {
    title: "Modern CSS Architecture: Container Queries, Subgrid, and Utility-First Systems",
    slug: "modern-css-container-queries-subgrid-guide",
    category: "Programming",
    author: "Sarah Jenkins",
    featured: false,
    status: "published",
    likes: 195,
    views: 3120,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
    excerpt: "CSS has undergone a renaissance. Discover how container queries @container, CSS Subgrid, :has() relational selectors, and modern color spaces replace brittle viewport media queries and bloated JavaScript layout recalculations.",
    createdAt: new Date("2026-09-28T09:15:00Z"),
    updatedAt: new Date("2026-09-28T09:15:00Z"),
    content: `
<h2>The Quiet Renaissance of Modern CSS</h2>
<p>For more than a decade, frontend engineers treated CSS as an unpredictable beast that had to be wrangled using preprocessors, heavy JavaScript layout listeners, and rigid viewport-based media queries. Whenever you wanted a card component to display horizontally in a sidebar but vertically in a grid, you had to write complex modifier classes or pass layout props in React.</p>

<p>Today, CSS has evolved into an exceptionally capable layout and styling engine. The modern standard introduces features that were once considered pipe dreams.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1200" alt="Designer reviewing responsive typography and grid alignment" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">Container queries decouple component styling from viewport size, creating truly modular and reusable design components.</figcaption>
</figure>

<h2>1. Container Queries: True Component Modularity</h2>
<p>While viewport media queries (<code>@media (min-width: 768px)</code>) only measure the size of the user's browser window, <strong>container queries</strong> allow a component to query the dimensions of its immediate parent container:</p>

<pre><code>/* 1. Define the parent container */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* 2. Style the card based on container width */
@container card (min-width: 450px) {
  .card-inner {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 1.5rem;
  }
}</code></pre>

<p>This means whether your card is rendered inside a narrow modal dialog, a 3-column dashboard grid, or a full-width blog article, it adapts its layout dynamically without having to know anything about the window size!</p>

<h2>2. CSS Subgrid: Aligning Complex Grid Children</h2>
<p>Before Subgrid, child elements inside neighboring grid items could not align with one another. If card A had a two-line title and card B had a four-line title, their action buttons or footers would misalign awkwardly.</p>

<p>CSS Subgrid allows nested child elements to participate directly in the parent grid's row and column tracks:</p>

<pre><code>.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
}

.grid-card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}</code></pre>

<p>Now, regardless of differences in title or excerpt length, every card header, body, and footer across the entire row aligns with mathematical precision.</p>

<h2>3. The Revolutionary ':has()' Relational Selector</h2>
<p>Often referred to as the "parent selector," <code>:has()</code> lets you style an ancestor or preceding sibling based on whether it contains a particular descendant element:</p>

<pre><code>/* Style the article container if it contains a featured badge */
article:has(.featured-badge) {
  border: 2px solid #4648d4;
  box-shadow: 0 10px 30px rgba(70, 72, 212, 0.1);
}

/* Style label when corresponding input is checked */
label:has(input:checked) {
  background-color: #e2e7ff;
  font-weight: 600;
}</code></pre>

<p>By blending modern CSS primitives with utility frameworks like Tailwind CSS, developers can build responsive, buttery-smooth digital interfaces with drastically reduced JavaScript overhead.</p>
    `
  },
  {
    title: "How Quantum Computing Actually Works: A Pragmatic Primer for Software Engineers",
    slug: "how-quantum-computing-works-explained",
    category: "Technology",
    author: "Wasee",
    featured: true,
    status: "published",
    likes: 495,
    views: 6200,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Strip away the sci-fi hype: understand qubits, superposition, quantum entanglement, and why quantum machines won't replace your MacBook but will disrupt cryptography and molecular modeling.",
    createdAt: new Date("2026-09-27T08:00:00Z"),
    updatedAt: new Date("2026-09-27T08:00:00Z"),
    content: `
<h2>Debunking the Quantum Myths</h2>
<p>Few topics in contemporary computer science are as shrouded in myth and hyperbole as quantum computing. Popular science accounts often proclaim that quantum computers are simply 'infinitely faster PCs' that can test every possible password simultaneously or download the internet in a millisecond. Neither of these claims is true.</p>

<p>Quantum computers will never replace your smartphone, run web browsers, or render video games. Instead, they are specialized co-processors designed to solve a specific mathematical subclass of problems—particularly those involving combinatorial explosion, molecular simulation, and discrete logarithms—that are physically impossible for classical supercomputers.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200" alt="Scientific research and complex mathematics equations" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">Quantum computing leverages quantum mechanical phenomena to solve specialized mathematical problems intractable for classical supercomputers.</figcaption>
</figure>

<h2>Bits vs Qubits: Superposition Explained</h2>
<p>A classical digital computer processes information in discrete bits: electrical voltages representing either a <code>0</code> or a <code>1</code>. At any given instant, an 8-bit register stores exactly one number between 0 and 255.</p>

<p>A <strong>qubit</strong> (quantum bit), by contrast, is a two-state quantum-mechanical system—such as the spin of an electron or the polarization state of a photon. Through the principle of <strong>superposition</strong>, a qubit can exist in a linear combination of states |0⟩ and |1⟩ described by probability amplitudes:</p>

<p>When you have an array of 50 entangled qubits, that register does not represent one configuration at a time; it simultaneously represents <strong>2<sup>50</sup> states</strong> (over 1 quadrillion numbers). By applying quantum logic gates (Hadamard, CNOT, Phase gates), quantum algorithms manipulate these probability waves so that incorrect answers cancel out through destructive interference, while the correct answer is reinforced through constructive interference.</p>

<h2>Quantum Entanglement: Nature's Secret Wire</h2>
<p>When two qubits become entangled, the quantum state of one cannot be described independently of the other, regardless of how far apart they are. Measuring the state of one qubit instantly collapses the state of its entangled partner.</p>

<p>In computational algorithms, entanglement allows parallel computation where operations applied to one qubit instantaneously manipulate the phase relationships of the entire system, enabling exponential speedups in search routines like Grover's algorithm.</p>

<h2>The Post-Quantum Cryptography Race</h2>
<p>The primary concern for modern IT security is <strong>Shor's Algorithm</strong>. Formulated by mathematician Peter Shor in 1994, this algorithm proves that an error-corrected quantum computer can factor large prime numbers in polynomial time, effectively breaking standard RSA, Diffie-Hellman, and Elliptic Curve Cryptography (ECC).</p>

<p>In response, standard bodies like NIST have finalized new <strong>Post-Quantum Cryptography (PQC)</strong> standards—notably <em>ML-KEM</em> (Kyber) and <em>ML-DSA</em> (Dilithium)—which rely on lattice-based mathematics that are resilient against both classical and quantum attacks.</p>

<blockquote>
  "Quantum computing is not the next step in classical computing; it is a completely new alphabet for talking to nature."
</blockquote>
    `
  },
  {
    title: "Optimizing Core Web Vitals: A Step-by-Step Guide to Perfect 100 Lighthouse Scores",
    slug: "optimizing-web-performance-core-web-vitals",
    category: "Tutorial",
    author: "Alex Mercer",
    featured: false,
    status: "published",
    likes: 310,
    views: 4530,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Actionable strategies to conquer Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) on production websites with zero fluff.",
    createdAt: new Date("2026-09-26T12:00:00Z"),
    updatedAt: new Date("2026-09-26T12:00:00Z"),
    content: `
<h2>Performance is Not a Vanity Metric</h2>
<p>Website performance directly dictates business success. Decades of telemetry from Google, Amazon, and Cloudflare demonstrate that each additional 100 milliseconds of latency decreases user engagement and conversion rates by measurable percentages. Furthermore, Google's Core Web Vitals are foundational signals in organic search rankings.</p>

<p>Let's dismantle the three critical metrics that define Core Web Vitals and explore the exact code-level optimizations to earn green scores across the board.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" alt="Web analytics telemetry and performance dashboard" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">Monitoring field metrics through Chrome User Experience Report (CrUX) guarantees authentic end-user satisfaction.</figcaption>
</figure>

<h2>1. Mastering Largest Contentful Paint (LCP &lt; 2.5s)</h2>
<p>LCP measures the time it takes for the largest visual element on the screen (usually a hero image, video poster, or large heading block) to become fully visible to the user.</p>

<h3>The Golden Fixes:</h3>
<ul>
  <li><strong>Never lazy-load your hero image:</strong> Applying <code>loading="lazy"</code> to an above-the-fold image delays browser download until after initial layout computation. Always use <code>loading="eager"</code> and <code>fetchpriority="high"</code> for your primary visual asset.</li>
  <li><strong>Preload critical resources:</strong> Add a preload tag in your HTML head for custom web fonts and hero images:
    <pre><code>&lt;link rel="preload" as="image" href="/hero.webp" fetchpriority="high" /&gt;</code></pre>
  </li>
  <li><strong>Modern Image Encodings:</strong> Convert legacy JPEG/PNG assets into WebP or AVIF formats, which routinely shave 40% to 70% off file payloads with zero perceptible loss in visual fidelity.</li>
</ul>

<h2>2. Taming Interaction to Next Paint (INP &lt; 200ms)</h2>
<p>INP replaced First Input Delay (FID) as an official Core Web Vital. While FID only tested the initial click, INP assesses the responsiveness of <em>every single interaction</em> throughout the entire lifecycle of the page.</p>

<h3>How to Prevent UI Freezes:</h3>
<ul>
  <li><strong>Break up long tasks:</strong> JavaScript tasks taking more than 50ms block the main thread. Break up expensive loops using <code>await scheduler.yield()</code> or <code>requestIdleCallback()</code> to allow the browser to paint intermediate frames.</li>
  <li><strong>Debounce search inputs:</strong> Never trigger heavy state re-renders on raw keystrokes. Debounce input event listeners by 150–250ms so typing remains silky smooth.</li>
</ul>

<h2>3. Eliminating Cumulative Layout Shift (CLS &lt; 0.1)</h2>
<p>Have you ever tried tapping a link on a mobile page, only for an ad or unsized banner to suddenly push the content down, causing you to accidentally tap the wrong button? That is Cumulative Layout Shift.</p>

<h3>Eliminating Shifts Completely:</h3>
<ul>
  <li><strong>Always specify aspect ratio or explicit dimensions:</strong> Use CSS <code>aspect-ratio: 16 / 9;</code> or set explicit <code>width</code> and <code>height</code> attributes on images and iframes so the browser reserves layout space before download completes.</li>
  <li><strong>Font Display Tuning:</strong> Use <code>font-display: swap</code> combined with matching metric fallbacks (using CSS <code>size-adjust</code> and <code>ascent-override</code>) to avoid severe layout jumps when custom web fonts swap in.</li>
</ul>

<p>Consistently testing with Lighthouse audits and verifying real-world telemetry via Google Search Console guarantees a blisteringly fast browsing experience for every visitor.</p>
    `
  },
  {
    title: "Building Resilient REST & GraphQL APIs in Node.js with TypeScript",
    slug: "building-resilient-apis-nodejs-typescript",
    category: "Programming",
    author: "Elena Rivera",
    featured: false,
    status: "published",
    likes: 240,
    views: 3280,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Architect enterprise-grade backend APIs with TypeScript, schema validation using Zod, automated OpenAPI documentation, rate limiting, and centralized error handling middleware.",
    createdAt: new Date("2026-09-25T15:30:00Z"),
    updatedAt: new Date("2026-09-25T15:30:00Z"),
    content: `
<h2>The Pillars of Enterprise Backend Architecture</h2>
<p>Spinning up a basic Express or Fastify server in Node.js takes less than ten lines of code. However, taking an API to production—where it must handle millions of untrusted network payloads, withstand sudden traffic spikes, and degrade gracefully during partial database outages—demands disciplined architecture.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" alt="Clean backend source code in modern IDE" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">Strict typing with TypeScript and runtime validation eliminates whole classes of backend production exceptions.</figcaption>
</figure>

<h2>1. Schema Validation at the Edge with Zod</h2>
<p>TypeScript provides static compile-time checking, but it disappears completely at runtime. When external clients send HTTP POST payloads to your endpoints, you cannot assume the data conforms to your TypeScript interfaces.</p>

<p>Using schema validation libraries like <strong>Zod</strong> bridges this gap by validating payloads at the network boundary while automatically deriving TypeScript types:</p>

<pre><code>import { z } from 'zod';

export const CreatePostSchema = z.object({
  title: z.string().min(5).max(120),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  content: z.string().min(20),
  category: z.enum(['Technology', 'Programming', 'Tutorial']),
  featured: z.boolean().default(false),
});

export type CreatePostInput = z.infer&lt;typeof CreatePostSchema&gt;;</code></pre>

<p>If an invalid payload arrives, your validation middleware rejects the request with HTTP 400 Bad Request and structured error details before any database queries are executed.</p>

<h2>2. Distributed Rate Limiting with Redis</h2>
<p>Public endpoints must be protected against brute-force credential stuffing and scraping attacks. Utilizing an in-memory Redis token bucket algorithm guarantees accurate rate limits even across distributed cluster nodes:</p>

<pre><code>import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redisClient from './redis';

export const apiLimiter = rateLimit({
  store: new RedisStore({ sendCommand: (...args) => redisClient.sendCommand(args) }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});</code></pre>

<h2>3. Graceful Shutdown & Centralized Error Handling</h2>
<p>When Kubernetes or your cloud platform restarts a service pod, active HTTP requests must not be severed abruptly. Implementing SIGTERM listeners drains in-flight requests cleanly:</p>

<pre><code>const server = app.listen(PORT, () => console.log('API listening'));

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received. Closing HTTP server...');
  server.close(async () => {
    await mongoose.connection.close();
    await redisClient.quit();
    console.log('All connections closed cleanly.');
    process.exit(0);
  });
});</code></pre>

<p>Pairing these techniques with structured logging (using Pino) and centralized async error handling middleware creates robust APIs that your team can maintain with total confidence.</p>
    `
  },
  {
    title: "Git Internals Unveiled: How Content-Addressable Storage Really Works",
    slug: "git-internals-content-addressable-storage-guide",
    category: "Tutorial",
    author: "David Kim",
    featured: false,
    status: "published",
    likes: 175,
    views: 2340,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Demystify the .git folder: learn how blobs, trees, commits, and annotated tags form an immutable Directed Acyclic Graph (DAG) and how Git tracks diffs without storing raw file deltas.",
    createdAt: new Date("2026-09-24T18:10:00Z"),
    updatedAt: new Date("2026-09-24T18:10:00Z"),
    content: `
<h2>The Mystery Inside the Hidden '.git' Directory</h2>
<p>Almost every software engineer uses Git every single day. We run <code>git add</code>, <code>git commit</code>, <code>git push</code>, and occasionally invoke panic-induced commands like <code>git reset --hard</code>. Yet to many developers, Git operates like an arcane black box.</p>

<p>In reality, Git is not a complex, monolithic VCS—at its core, Git is a delightfully simple <strong>content-addressable key-value store</strong> with a VCS user interface layered over top.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1200" alt="Code development terminal screen" class="w-full rounded-2xl shadow-md" />
  <figcaption class="text-center text-xs text-[#767585] mt-2">Understanding Git plumbing commands transforms cryptic merge conflicts into clear, solvable graph reconciliations.</figcaption>
</figure>

<h2>The 4 Core Git Objects</h2>
<p>Everything in Git is stored inside the <code>.git/objects/</code> directory as compressed zlib files named after their SHA-1/SHA-256 hash. There are only four primary object types in the entire Git specification:</p>

<ol>
  <li><strong>Blob (Binary Large Object):</strong> Stores raw file contents without any metadata. It doesn't even know the filename or file permissions—just the raw bytes.</li>
  <li><strong>Tree:</strong> Represents a directory. A tree object lists filenames, file permissions (executable vs regular), and pointers to the SHA hashes of corresponding blobs or subtrees.</li>
  <li><strong>Commit:</strong> An immutable snapshot. It contains a pointer to a top-level Tree object, zero or more parent commit SHAs, the author, the committer, a timestamp, and the commit message.</li>
  <li><strong>Tag:</strong> An annotated pointer to a specific commit, often signed with a GPG key for release management.</li>
</ol>

<h2>Building a Commit from Scratch with Plumbing Commands</h2>
<p>You can prove that Git is just a key-value store by creating a valid Git commit without ever typing <code>git add</code> or <code>git commit</code>!</p>

<pre><code># 1. Store a string into the Git object database as a blob
$ echo "Hello Git Internals" | git hash-object -w --stdin
ce013625030ba8dba906f756967f9e9ca394464a

# 2. Add that blob to a temporary index tree
$ git update-index --add --cacheinfo 100644 ce013625030ba8dba906f756967f9e9ca394464a hello.txt

# 3. Write the tree object
$ git write-tree
d8329fc1cc938780ffdd9f94e0d364e0ea74f579

# 4. Create a commit pointing to that tree
$ echo "Initial raw commit" | git commit-tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579
7a829e0b1f2e4c...</code></pre>

<h2>Why Git Never Truly Loses Your Code: The Reflog</h2>
<p>Because commits are immutable nodes in a Directed Acyclic Graph (DAG), running commands like <code>git branch -D</code> or <code>git reset --hard HEAD~3</code> does not immediately delete your data. The commit objects remain in your <code>.git/objects/</code> directory.</p>

<p>By running <code>git reflog</code>, you can inspect the chronological ledger of your HEAD pointer, find the orphaned commit hash, and restore your branch in one command:</p>
<pre><code>git branch recovered-work &lt;commit-hash&gt;</code></pre>

<p>Understanding these plumbing mechanisms transforms confusing Git errors into predictable graph operations, making you the resident version control expert on your team.</p>
    `
  }
];

async function updateBlog() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    // 1. Remove all travel blogs
    console.log("Removing travel blog posts...");
    const deleteResult = await Post.deleteMany({
      $or: [
        { category: { $regex: /^travel$/i } },
        { slug: { $in: [
          "best-tourist-places-in-bangladesh",
          "saint-martin-island-travel-guide",
          "sajek-valley-bandarban-tour-guide",
          "sustainable-travel-exploring-responsibly",
          "best-phones-under-15000-taka-bangladesh",
          "best-phones-for-students-bangladesh",
          "best-laptops-under-50000-taka-students-programming"
        ] } }
      ]
    });
    console.log(`Removed ${deleteResult.deletedCount} unwanted blog posts.`);

    // 2. Insert new tech blog posts
    console.log(`Inserting ${newTechPosts.length} new tech blog posts...`);
    for (const postData of newTechPosts) {
      await Post.findOneAndUpdate(
        { slug: postData.slug },
        postData,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`Upserted: "${postData.title}" (${postData.category})`);
    }

    // 3. Verify total posts in database
    const totalPosts = await Post.countDocuments();
    const categories = await Post.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    console.log("\n=== Current Database Status ===");
    console.log(`Total Published Posts: ${totalPosts}`);
    console.log("Categories Breakdown:", categories);

    console.log("\nSuccessfully updated blog content!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating blog content:", error);
    process.exit(1);
  }
}

updateBlog();
