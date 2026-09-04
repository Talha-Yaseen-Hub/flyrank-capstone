# FlyRank AI Fluency: Week 4 "Three Roads" Stack Selection Rationale (FL-04)
**Intern Name:** Talha Yaseen  
**Track:** General AI Fluency  
**Assignment:** Week 4 / Three Roads: Choose Your Stack with AI  
**Live Production URL:** [https://flyrank-capstone.vercel.app/](https://flyrank-capstone.vercel.app/)  
**GitHub Repository:** [https://github.com/Talha-Yaseen-Hub/flyrank-capstone](https://github.com/Talha-Yaseen-Hub/flyrank-capstone)

---

## 1. The Four Core Constraints

To evaluate architecture options objectively, four strict constraints were fed into the AI pressure-testing prompt:

1. **Budget:** **100% Free Only ($0)** – Must run on free hosting tiers (Vercel, GitHub Pages, Netlify) with zero infrastructure billing.
2. **Honest Skill Level:** Intermediate Front-End & AI Engineering Intern comfortable with React, JavaScript (ES6+), HTML5/CSS3, Vitest JSDOM testing, and Node.js fetch APIs.
3. **Portfolio Requirements:** Single-page scrolling layout, 3-beat framed case studies, interactive JSDOM test runner console, dark/light theme persistence, and an inspectable live AI Career Agent.
4. **Display & Dynamic Needs:** Requires a lightweight serverless backend route to call Anthropic Claude / Google Gemini APIs streaming tokens to the client while keeping API keys isolated server-side. No heavy database required yet.

---

## 2. Three Roads: Architecture Comparison

| Metric / Feature | Option 1: Simplest (Static HTML + Vanilla JS) | Option 2: Chosen Front-Runner (Next.js + Tailwind + Vercel) | Option 3: Most Powerful (Remix + PostgreSQL + Prisma + Railway) |
| :--- | :--- | :--- | :--- |
| **Hosting (Free)** | GitHub Pages | **Vercel Managed Hosting** | Render / Railway Free Tiers |
| **Backend Required?** | ❌ No (Static only) | **⚡ Lightweight Serverless API Route** | 🐘 Yes (Dedicated Node + Postgres DB) |
| **API Key Security** | ❌ Fails (Client keys exposed) | **✅ Secure (Server-side process.env)** | ✅ Secure (Server environment) |
| **AI Stream Support** | ⚠️ Simulated client stream only | **✅ Real Token SSE Stream (30ms)** | ✅ Real Stream + DB persistence |
| **Code Modularity** | ⚠️ Low (Single script files) | **✅ High (React Components + Hooks)** | ✅ High (Full-Stack Routes) |
| **Build Velocity** | 1 Day | **2–3 Days (Finished in 2 Weeks)** | 1–2 Weeks (High overhead) |
| **Maintenance Burden** | Zero | **Minimal (Zero DB migrations)** | High (DB schemas & server uptime) |

---

## 3. Pressure-Testing the Options & Trade-Offs

### 🔴 Option 1: Static HTML5 + Vanilla JS (GitHub Pages)
* **What breaks if I pick this?**  
  Without a server-side route handler, calling Claude or Gemini APIs requires embedding secret keys inside client-side JS bundles, exposing API keys publicly. Furthermore, building complex interactive test simulators in vanilla JS leads to tightly coupled DOM code that is difficult to maintain.

### 🟣 Option 3: Full-Stack Remix + PostgreSQL + Prisma ORM (Railway / Render)
* **What do I maintain if I pick this?**  
  Setting up PostgreSQL databases, managing Prisma ORM migrations, and maintaining custom server containers adds immense infrastructure overhead. For a recruiter portfolio, a database is an unnecessary failure point. Railway and Render free tiers also go to sleep after inactivity, creating a 30-second cold start delay for visitors.

### 🟢 Option 2 (The Chosen Stack): Next.js App Router + Tailwind CSS + Vitest + Vercel
* **Why this is the optimal choice:**  
  Next.js App Router provides serverless route handlers (`app/api/chat/route.js`) to securely query Anthropic Claude / Gemini APIs without exposing keys, while serving static frontend assets instantly via Vercel's global CDN.

---

## 4. Written Rationale in My Own Words

> **"Can I maintain this, and does it show my work well?"**
> 
> I chose **Option 2 (Next.js + Tailwind CSS + Vercel)** because it hits the exact sweet spot between developer leverage, security, and zero maintenance cost. 
> 
> I rejected **Option 1 (Static HTML + GitHub Pages)** because it cannot securely handle API keys server-side or stream Claude responses cleanly without security risks. I rejected **Option 3 (Full-Stack Remix + PostgreSQL)** because spending hours setting up database tables and ORM schemas does not help me prove my core claim—building accessible, test-backed React UIs. A database creates cold-start latency and unnecessary maintenance overhead for a portfolio website.
> 
> **Can I maintain this?** Yes. Next.js on Vercel requires zero server management. Deployments trigger automatically on `git push`, static pages render in under 150ms, and serverless functions sleep when idle without cold starts.
> 
> **Does it show my work well?** Absolutely. Next.js allows me to embed interactive React components, collapsible code drawers, and a live Vitest test execution simulator directly on the page, proving my frontend engineering capability directly inside the browser of the hiring manager.
> 
> **The Backend Question:** I answered this honestly—I need a **lightweight serverless backend route** for AI API streaming, but **not a database**. Next.js route handlers satisfy this perfectly for $0.
