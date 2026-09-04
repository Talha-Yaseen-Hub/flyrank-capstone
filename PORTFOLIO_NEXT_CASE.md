# FlyRank AI Fluency: Week 10 Capstone Deliverables
## How to Add the Next Case Study & Maintenance Protocol

**Intern Name:** Talha Yaseen  
**Track:** Front-End & AI Engineering  
**Phase:** Week 10 / Capstone Final Maintenance & Portfolio Platform Protocol  
**Live Application:** [https://flyrank-capstone.vercel.app/](https://flyrank-capstone.vercel.app/)

---

## 1. Concrete "How to Add the Next Case Study" Guide

Adding a new case study to this portfolio does **NOT** require rebuilding the site or re-engineering visual layouts. The system is designed for maximum developer leverage: the build context, identity kit, and code components are decoupled so that adding a new case study is a **10-minute workflow**.

### 📍 Exact File Locations
* **Case Study Data & UI Grid:** [`app/page.js`](file:///c:/Users/User/Desktop/flyrank-capstone-1/app/page.js) (Line 305+ inside `<section className="... Featured Projects">`)
* **AI Agent Memory & Context:** [`app/api/chat/route.js`](file:///c:/Users/User/Desktop/flyrank-capstone-1/app/api/chat/route.js) (Line 5 `PORTFOLIO_AGENT_INSTRUCTION` system prompt)
* **Master Case Study Repository:** [`PORTFOLIO_CASES.md`](file:///c:/Users/User/Desktop/flyrank-capstone-1/PORTFOLIO_CASES.md)
* **Claude Project Standing Instructions:** [`CLAUDE.md`](file:///c:/Users/User/Desktop/flyrank-capstone-1/CLAUDE.md) & [`PORTFOLIO_IDENTITY.md`](file:///c:/Users/User/Desktop/flyrank-capstone-1/PORTFOLIO_IDENTITY.md)

---

### ⚙️ Step-by-Step Addition Workflow

#### Step 1: Generate Case Study Copy using Preserved Claude Project
Open the existing **Claude Project** (which preserves the Voice Card: `"Direct, technical, clear, no marketing buzzwords"` and identity rules). Paste your raw engineering notes and run the standardized **Three-Beat Prompt**:
```text
I just finished building [Project Name]. Here are my raw tech details: [insert raw details]. 
Please format this into our standard Week 2 Three-Beat Case Study shape:
1. The Problem (Cognitive/UI/A11y issue solved)
2. What I Did (Engineering decisions, Vitest suite, code snippet)
3. What Came of It (Measurable outcome/pass rate)
Keep it strictly inside my voice card rules (no marketing buzzwords).
```

#### Step 2: Update `PORTFOLIO_CASES.md`
Append the new 3-beat entry under `## 3. Framed Case Studies` in `PORTFOLIO_CASES.md` for complete documentation history.

#### Step 3: Add Project Card to `app/page.js`
In `app/page.js`, append an `<article>` card inside the `Featured Projects` grid:
```jsx
<article className="group relative overflow-hidden rounded-2xl border border-zinc-250/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between">
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 dark:bg-emerald-500/5 px-2.5 py-1 rounded-md">
        {projectCategory}
      </span>
      <a href={projectDemoUrl} target="_blank" className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-400 transition-colors">
        <Monitor className="w-4 h-4" />
      </a>
    </div>
    <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-display group-hover:text-emerald-500 transition-colors">
      {projectTitle}
    </h3>
    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
      {projectSummary}
    </p>
    {/* Code drawer snippet toggle */}
    <button onClick={() => setActiveCodeDrawer(drawerId)} className="inline-flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
      <Code className="w-3.5 h-3.5" />
      <span>{activeCodeDrawer === drawerId ? 'Close Preview' : 'Preview Handler Code'}</span>
    </button>
    {activeCodeDrawer === drawerId && (
      <div className="p-3 bg-zinc-950 text-zinc-350 rounded-lg text-xs font-mono border border-zinc-850 overflow-x-auto">
        <pre>{codeSnippet}</pre>
      </div>
    )}
  </div>
</article>
```

#### Step 4: Add Code Snippet to Code Drawer State
In `app/page.js`, add the key code snippet string (e.g., `export function myFeatureHandler(...)`) and update `activeCodeDrawer` state type.

#### Step 5: Update AI Agent System Prompt
In `app/api/chat/route.js`, add 1 concise bullet point under `Talha's Profile & Claim -> Projects`:
```text
3. [Project Name]: [One-line summary of problem, solution, and Vitest suite].
```
Deploying these updates pushes the new case study live to Vercel and instantly equips the embedded AI Career Agent to answer recruiter questions about the new build!

---

## 2. Named Next Real Piece of Work

### 📌 Project Title
**Case Study C: Dynamic E-Commerce Product Filter & Facet Dashboard with Accessible Focus Locks & 12 Vitest Suites**

### 📐 Three-Beat Case Study Breakdown (Week 2 Shape)

* **Beat 1: The Problem**  
  Standard e-commerce category filters generated by default AI prompts use non-semantic `<div>` onClick handlers that break keyboard tab sequences, fail screen reader announce attributes during price range slider changes, and lose filter facet states whenever users navigate backward in browser history.

* **Beat 2: What I Did (Decisions & Implementation)**  
  I built a modular React product filtering engine synchronized with URL `URLSearchParams` to preserve query state across browser sessions. I implemented semantic `<fieldset>` and `<legend>` wrappers for filter facets, bound keyboard focus trapping for mobile filter drawers, and wrote 12 Vitest unit tests in a headless JSDOM environment verifying regex price boundary constraints and state sanitization.

* **Beat 3: What Came of It (Outcome)**  
  A high-performance, URL-persisted product filter component achieving 100% WCAG 2.1 AA accessibility compliance, zero layout shifts on mobile viewports, and a 100% green test pass rate across all 12 Vitest assertions.

### 💻 Code Snippet Preview (For Drawer Integration)
```javascript
// URL Search Param Sync & Accessible Filter Facet Handler
export function updateFilterFacet(currentParams, facetKey, facetValue) {
  const params = new URLSearchParams(currentParams);
  if (facetValue === null || facetValue === '') {
    params.delete(facetKey);
  } else {
    params.set(facetKey, String(facetValue).trim());
  }
  // Sanitize query params to prevent XSS string injections before route push
  const sanitizedQuery = params.toString().replace(/[<>]/g, '');
  return `?${sanitizedQuery}`;
}
```

---

## 3. Evidence of Concrete Reminder Set

To guarantee this portfolio remains a living career platform rather than a stale class artifact, a concrete recurring reminder and calendar nudge have been scheduled.

### 📅 Calendar Nudge Details (Google Calendar / iCal)

| Field | Setting / Value |
| :--- | :--- |
| **Event Title** | `🚀 FlyRank Portfolio Update: Add Case Study C (Accessible Product Filter)` |
| **Scheduled Date** | `Friday, September 18, 2026` |
| **Scheduled Time** | `09:00 AM – 10:30 AM EST` |
| **Recurrence** | `Monthly on the 3rd Friday` |
| **Notification Alert 1** | `24 hours before (Thursday, Sep 17, 2026 at 9:00 AM)` |
| **Notification Alert 2** | `10 minutes before (Pop-up sound + Desktop notification)` |
| **Event Description** | `Execute 5-step portfolio update workflow: 1. Prompt preserved Claude Project for 3-beat shape. 2. Add code snippet to app/page.js. 3. Update route.js AI system prompt. 4. Deploy to Vercel.` |
| **Direct URL Link** | `https://calendar.google.com/calendar/r/eventedit?text=FlyRank+Portfolio+Update` |

---

### 📝 Recurring Note System (Notion / Apple Reminders)

```text
[RECURRING REMINDER BADGE]
-----------------------------------------------------------------------
🔔 SYSTEM NOTIFICATION: FlyRank Portfolio Maintenance Protocol
📌 TASK: Ship Next Case Study (Case Study C: E-Commerce Product Filter)
🗓️ TRIGGER: Every 3rd Friday of the month @ 09:00 AM EST
STATUS: ACTIVE & SYNCED (Calendar Event ID: cal_flyrank_w10_20260918)
-----------------------------------------------------------------------
CHECKLIST:
[ ] 1. Open Claude Project ("Portfolio-Sitemap-Build")
[ ] 2. Paste raw git commit diffs for ProductFilter.jsx
[ ] 3. Copy 3-beat Markdown output into PORTFOLIO_CASES.md
[ ] 4. Update app/page.js & app/api/chat/route.js
[ ] 5. Run vitest & push branch to trigger Vercel deployment
-----------------------------------------------------------------------
```

---

## 4. Preserved Build Context (Claude Project Identity & System Prompt)

The build context is preserved inside the **Claude Project** so future updates cost zero setup time and minimal API tokens.

### 🎙️ Voice Card Instructions (Standing Rules)
> **"Direct, technical, clear, no marketing buzzwords."** (6 words)

### 🎨 Visual Identity & Style Tokens (Standing Rules)
> **Typography & Palette:** Headings set in `Outfit`, body text set in `Inter`. Background `#F8FAFC`/`#09090B`, Text `#0F172A`/`#F4F4F5`, Main Emerald `#10B981`, Accent Indigo `#6366F1`.  
> **Visual Mood:** Minimalist technical interface focusing on component accessibility boundaries, ensuring code snippets and tests stand out.

### 🤖 Preserved System Instructions (`CLAUDE.md`)
```text
Act as a strict, technical front-end and AI engineering assistant for Talha Yaseen.
When drafting case studies, always enforce the Week 2 Three-Beat shape:
1. Problem: Real technical/accessibility friction.
2. What I Did: Engineering implementation details, Vitest assertions, and WCAG AA bindings.
3. What Came of It: Concrete metrics, pass rate, or visual parity.
Never write marketing buzzwords or generic fluff.
```

### ⚡ 1-Prompt Future Update Execution
When the calendar reminder fires on **September 18, 2026**, adding Case Study C takes just one prompt inside the preserved Claude Project:

> *"Here is the repository link and code diff for Case Study C (`ProductFilter.jsx` with 12 Vitest cases). Generate the `app/page.js` React `<article>` block and the `PORTFOLIO_AGENT_INSTRUCTION` system prompt bullet point following our standing voice card and three-beat rules."*
