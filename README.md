# Think — Editorial Publishing & Content Platform

<div align="center">

![Think Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&auto=format&fit=crop&q=80)

### *An intersection of high-velocity social discourse and long-form editorial gravitas.*

[![Next.js](https://img.shields.io/badge/Next.js-16.3.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**[Explore Live Publication](https://blog-zeta-nine-22.vercel.app/)** • **[Report an Issue](https://github.com/Waseque1000/blog/issues)**

</div>

---

## 📖 Overview

**Think** is a production-ready, full-stack editorial publishing platform engineered with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **MongoDB**. Designed for tech journalists, independent critics, and tech writers, Think bridges the visual appeal of modern social platforms with the depth, typography, and search indexability of high-end editorial publications.

### Key Architectural Highlights
- **100% Server-First Architecture:** Instant First Contentful Paint (FCP) and optimal Largest Contentful Paint (LCP) via Next.js React Server Components (RSC).
- **Enterprise-Grade Technical SEO:** Automated dynamic XML sitemap (`/sitemap.xml`), robots protocol (`/robots.txt`), self-referencing canonical URLs, Open Graph / Twitter Card automation, and comprehensive JSON-LD structured data.
- **Dedicated Topic Hubs:** Dynamic, canonical category hubs (`/category/[slug]`) for clean link equity distribution and crawl paths.
- **Smart Relevance Search:** Regex-safe word-boundary search engine (`\bkeyword\b`) with weighted ranking that prevents false-positive substring matches (e.g. searching "AI" won't match "email" or "maintain").
- **Bot-Resistant Analytics:** View counter decoupling ensures search crawlers, RSS feeds, and SSR pre-renders never inflate reader metrics.
- **Built-in Administrative CMS:** Full post lifecycle management (drafting, rich-text formatting with TipTap, cover asset linking, category assignments, and featured pinning).

---

## 🚀 Feature Tour

```
┌────────────────────────────────────────────────────────────────────────┐
│ Think Editorial Architecture                                           │
├──────────────────┬───────────────────┬─────────────────────────────────┤
│ Public Frontend  │ Administrative    │ SEO & Discovery Engine          │
├──────────────────┼───────────────────┼─────────────────────────────────┤
│ • Curated Feed   │ • Auth Guard      │ • Dynamic Sitemap (17 routes)   │
│ • Featured Hero  │ • Dashboard Stats │ • Schema.org (BlogPosting, etc) │
│ • Category Hubs  │ • TipTap Editor   │ • Bot-Safe View Tracking        │
│ • Reader Comms   │ • Post Publishing │ • Word-Boundary Search          │
│ • Backlink Citer │ • Draft Manager   │ • OpenGraph & Twitter Cards     │
└──────────────────┴───────────────────┴─────────────────────────────────┘
```

### 1. Reader Experience
- **Fluid Masthead & Feed:** Split-hero for featured analyses accompanied by responsive card grids (375px mobile to 1920px 4K).
- **Editorial Typography:** Tailored typography powered by `@tailwindcss/typography`, Google Font `Geist` for code/body text, and `Plus Jakarta Sans` for headlines.
- **Engagement Toolkit:** 
  - One-click native Web Share API dialog with fallback clipboard triggers.
  - **Cite Article** utility generating ready-to-paste Markdown backlink citations for GitHub and blogs.
  - Frictionless, un-authenticated discussion engine with avatar generation and local storage memory.

### 2. Search Engine & Discovery
- **Dedicated Category Hubs:** `/category/technology`, `/category/programming`, and `/category/tutorial`.
- **Structured Data (JSON-LD):**
  - `BlogPosting` on all articles (word count, reading time, ISO dates, author identity, publisher schema).
  - `BreadcrumbList` on category and article pages.
  - `CollectionPage` on topic index pages.
  - `WebSite` & `Organization` on the root layout.
- **Clean Document Outlining:** Automated heading hierarchy normalizer enforcing strict `H1 -> H2 -> H3` semantic flow.

### 3. Editorial CMS (Admin)
- **Protected Workspace:** Cookie-backed session authentication through Next.js middleware guards (`/admin/*`).
- **Rich-Text Engine:** Powered by TipTap (`@tiptap/react`, `@tiptap/starter-kit`) supporting headings, code blocks, blockquotes, lists, and inline links.
- **Publishing Control:** Toggle between `draft` and `published` states, feature pinning, and cover image management.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | [Next.js 16.3](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19.2](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), `@tailwindcss/typography` |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/) via [Mongoose 9](https://mongoosejs.com/) |
| **Rich Text** | [TipTap](https://tiptap.dev/) (`@tiptap/react`, `@tiptap/starter-kit`) |
| **Authentication** | Custom session cookie validation & Firebase Admin SDK |
| **Icons & Typography** | Google Fonts (`Geist`, `Plus Jakarta Sans`, `Material Symbols Outlined`), `react-icons` |
| **Deployment** | [Vercel](https://vercel.app/) with Edge Caching & Automated CI/CD |

---

## 📂 Project Structure

```
.
├── app/
│   ├── (public)/
│   │   ├── category/[slug]/    # Dynamic SEO Category Hubs (Technology, Programming, Tutorial)
│   │   ├── post/[slug]/        # Individual Article Reader + JSON-LD Schema
│   │   ├── privacy/            # Privacy Policy (Legally accurate, form-linked)
│   │   ├── search/             # Word-Boundary Ranked Search Interface
│   │   ├── terms/              # Terms of Service & Editorial Disclaimers
│   │   ├── not-found.jsx       # Custom Branded 404 Page
│   │   ├── page.jsx            # Homepage / Curated Editorial Stream
│   │   └── layout.jsx          # Root Layout (Fonts, Global Meta, Org Schema)
│   ├── admin/
│   │   ├── (dashboard)/        # Admin CMS (Posts Table, Editor, Metrics)
│   │   └── login/              # Secure Admin Gateway
│   ├── api/
│   │   ├── admin/              # Authentication Endpoints (Login/Logout)
│   │   └── posts/              # Post CRUD, Comments, Likes, and View Tracking
│   ├── robots.js               # Crawl Engine Directives
│   └── sitemap.js              # Automated Dynamic XML Sitemap Generator
├── components/
│   ├── admin/                  # CMS UI (PostTable, TipTap Editor, etc.)
│   ├── public/                 # Navbar, Footer, PostCard, PostActions, Comments
│   └── AdminSidebar.jsx        # Responsive CMS Navigation Drawer
├── lib/
│   ├── mongodb.js              # Global Mongoose Connection Pooling
│   └── seo.js                  # Site Metadata, Base URL Resolvers, and Site Config
├── models/
│   ├── Post.js                 # Schema for Articles, Slugs, Status, Tags
│   ├── Comment.js              # Schema for Reader Discussions
│   └── User.js                 # Schema for Administrative Users
├── public/                     # Static Web Assets (Logos, Icons, Fallback Media)
└── middleware.js               # Edge Protection for CMS Routes
```

---

## ⚡ Quickstart Guide

### 1. Prerequisites
- **Node.js:** v18.18.0 or newer (v20+ recommended)
- **Package Manager:** `npm`, `pnpm`, or `yarn`
- **Database:** A free or dedicated [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

### 2. Clone & Install
```bash
git clone https://github.com/Waseque1000/blog.git
cd blog
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Populate the required keys:

```ini
# MongoDB Connection
MONGODB_URI="mongodb+srv://<username>:<password>@cluster.example.mongodb.net/blog?retryWrites=true&w=majority"
MONGODB_DB="blog"

# Site URL (Optional, for custom domain canonicals)
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=""

# Firebase Credentials (For media storage & admin)
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
FIREBASE_CLIENT_EMAIL=""
FIREBASE_PRIVATE_KEY=""
```

### 4. Seed the Database
Populate your MongoDB database with starter editorial articles:

```bash
node seed.mjs
```

### 5. Launch the Development Server
```bash
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser to inspect the application.

---

## 🔍 Technical SEO Architecture

Think is engineered to achieve perfect crawl efficiency, indexation clarity, and rich-snippet eligibility:

### 1. Base Domain & Canonical Safety
`lib/seo.js` resolves the canonical domain hierarchically:
1. `process.env.NEXT_PUBLIC_SITE_URL` (Custom Domain).
2. Production default configured in `lib/seo.js` (or deployment origin).

*Prevents temporary Vercel preview URLs (`*-waseque-arafats-projects.vercel.app`) from leaking into canonical tags, Open Graph meta, and shared links.*

### 2. XML Sitemap (`/sitemap.xml`)
Automatically queries MongoDB on request:
- **100% Indexable:** Automatically strips noindex endpoints (`/search`, `/admin`, `/api`).
- **Dynamic Last-Modified Dates:** Reflects actual article `updatedAt` timestamps rather than runtime dates.
- **Includes Category Collections:** Generates verified priority routes for `/category/[slug]`.

### 3. Word-Boundary Search Engine
Avoids loose regex matching by compiling bounded patterns for short queries:
```javascript
// Matches "AI", but rejects "email", "maintain", and "wait"
const pattern = queryParam.length <= 4 ? `\\b${escaped}\\b` : escaped;
```

---

## 📋 Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Starts Next.js development server with Turbopack |
| `npm run build` | Compiles optimized production bundle and runs static analysis |
| `npm run start` | Boots the compiled production server |
| `npm run lint` | Runs ESLint 9 checks across all components and pages |
| `node seed.mjs` | Populates demo editorial stories into MongoDB |
| `node add-new-post.mjs` | Adds fresh articles with formatted HTML to MongoDB |

---

## 🔒 Security & Performance Best Practices

- **Strict Route Protection:** Unauthenticated requests to `/admin/*` are automatically redirected by edge middleware.
- **No-Index on Query Results:** Search result pages emit `robots: { index: false, follow: true }` to protect search engine crawl budget.
- **Zero Hydration Mismatch:** Clean dynamic date serializations and lazy-initialized states across client boundaries.
- **Resource Hints:** Critical hero assets use `priority` / `fetchPriority="high"`; external font links use `&display=swap` to avoid render blocking.

---

## 🤝 Contributing

Contributions, feedback, and feature requests are welcome!
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/editorial-enhancement`).
3. Commit your Changes (`git commit -m 'Add markdown export feature'`).
4. Push to the Branch (`git push origin feature/editorial-enhancement`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to customize and deploy it for your own publications.

---

<div align="center">
Crafted with precision by <strong>Wasee</strong> • Built with <strong>Next.js 16 & React 19</strong>
</div>
