# Assignment 8.1 (FL-09) — Live Demo Narration Script & Showcase Submission

## Assignment Details
- **Assignment Code**: `FL-09` (Documentation and Demo)
- **Target URL**: [https://flyrank-capstone-git-feat-settings-v2-yaseen-raza-dev.vercel.app/](https://flyrank-capstone-git-feat-settings-v2-yaseen-raza-dev.vercel.app/)
- **Repository**: [https://github.com/Talha-Yaseen-Hub/flyrank-capstone](https://github.com/Talha-Yaseen-Hub/flyrank-capstone)
- **Demo Length**: 3 to 5 minutes (Live application run, zero slides).

---

## 1. 3–5 Minute Video Narration Script (Timecoded)

### `00:00 – 00:45` | Hero Section & Proof Statement
> *"Hello! My name is Talha Yaseen, and this is the live demo of my FlyRank AI Capstone application — a personal brand portal backed by an automated 16-test Vitest suite, a live serverless AI representative, and an interactive 3D WebGL core configurator."*
>
> *"When you land on the page, the hero states my core proof statement: I build accessible, WCAG AA compliant React components backed by 100% test coverage. Notice right away that my Vitest test suite status pill confirms 16/16 tests passed in JSDOM."*

---

### `00:45 – 01:45` | Live 3D Experience & Case Studies (Design Decision Explained)
> *"Scrolling down, we see the 3D WebGL AI Core Configurator rendered with Three.js. You can drag to rotate the geometry, swap material color themes in real time, toggle wireframe lattice mode, or adjust auto-orbit speeds."*
>
> *"Here is the primary **Design Decision** I want to highlight on camera: In Case Study A (The React Priority Planner), I encountered a subtle bug where timezone shifts marked tasks as overdue when users accessed the app in different timezones. Instead of writing complex server-side date conversions, I built a local-midnight comparator function that truncates both today's date and the target due date to `00:00:00` in the user's local timezone. I then backed this with 16 JSDOM unit tests to guarantee zero regressions."*

---

### `01:45 – 03:00` | Interactive AI Representative & Generative UI
> *"Next is my live **AI Career Agent**, powered by Claude 3.5 Sonnet via Next.js App Router streaming endpoints. Let's click 'Why should we hire Talha?'. As the agent streams token-by-token responses, notice two accessibility features: the conversation container uses `aria-live='polite'` so screen readers politely announce updates, and a keyboard-accessible 'Stop Stream' button appears immediately if we need to abort the request."*
>
> *"If we ask the agent to 'Run SEO Tool Audit', it returns a structured Generative UI card featuring interactive health metric badges, a score progress bar, and issue tables built with Zod schemas."*

---

### `03:00 – 04:15` | Serverless Contact API & Honest Limitation
> *"Finally, let's test the Contact & Lead Capture Form. If I type my name, email, and message, and click 'Send Submission to API', the frontend posts to `/api/contact`. The serverless backend validates the input, enforces a 5-second anti-spam cooldown, and returns a verified JSON submission ID."*
>
> *"Now, here is the honest **Limitation** of my build: Right now, form submissions are stored in an in-memory array on Vercel serverless instances. While this provides instantaneous validation and confirmation feedback for portfolio reviewers without database latency, serverless instances spin down after inactivity, meaning submissions don't persist long-term in a database like PostgreSQL or Supabase. In version 2.0, I will wire this directly to Supabase DB with Resend email triggers."*

---

### `04:15 – 04:45` | Closing & AI Transparency Statement
> *"To close out, I built this application using Claude Code and Claude 3.5 Sonnet as my AI pair programmer for initial scaffolding and Zod schemas, while hand-auditing 100% of the ARIA accessibility attributes, Vitest assertions, and Three.js WebGL canvas parameters. Everything is live at `flyrank-capstone-git-feat-settings-v2-yaseen-raza-dev.vercel.app`. Thank you!"*

---

## 2. AI Transparency Statement
In accordance with the General AI Fluency Transparency Standard:
> *"I built this application with Claude 3.5 Sonnet and Claude Code as my build partner. AI generated initial component wireframes, Zod schema stubs, and CSS class scaffolding. I personally wrote and hand-audited all Vitest unit test assertions, ARIA accessibility linkages (`aria-live="polite"`), AbortController stream cancellation logic, local-midnight date comparator math, and 3D WebGL camera parameters."*
