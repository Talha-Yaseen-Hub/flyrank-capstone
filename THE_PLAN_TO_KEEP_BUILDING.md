# The Plan to Keep Building — Post-Graduation Maintenance Protocol

## Assignment Overview
- **Assignment Code**: `FL-PLAN-TO-KEEP-BUILDING` (General AI Fluency Track, Week 8)
- **Preserved Claude Project**: `Portfolio-Sitemap-Build`
- **Target URL**: [https://flyrank-capstone-git-feat-settings-v2-yaseen-raza-dev.vercel.app/](https://flyrank-capstone-git-feat-settings-v2-yaseen-raza-dev.vercel.app/)

---

## 1. Concrete "How to Add the Next Case" Note (5-Step Workflow)

To add a new case study to the portfolio in under 10 minutes without rebuilding the site architecture:

1. **Open Preserved Claude Project (`Portfolio-Sitemap-Build`)**: The project context retains the standing Voice Card instructions (*"Direct, technical, clear, no marketing buzzwords"*) and Tailwind token definitions.
2. **Interview / Supply Three-Beat Material**: Provide raw git commit diffs or code snippets and run the Three-Beat prompt:
   - *Beat 1 (The Problem)*: What broke or needed solving?
   - *Beat 2 (What I Did & Decided)*: What architecture/code choices were made?
   - *Beat 3 (What Came of It)*: Measurable test result, performance metric, or accessibility outcome.
3. **Append Markdown to `PORTFOLIO_CASES.md`**: Paste the structured output into `PORTFOLIO_CASES.md`.
4. **Insert Article Card in `app/page.js`**: Copy a `<article>` card inside the `Featured Projects` grid in `app/page.js`, binding code preview snippet strings to `activeCodeDrawer` state.
5. **Update AI Career Agent Context**: Add a 1-sentence bullet summary to `PORTFOLIO_AGENT_INSTRUCTION` in `app/api/chat/route.js` so the AI representative speaks accurately about the new project.

---

## 2. Named Next Real Piece of Work

- **Title**: **Case Study C: Dynamic E-Commerce Product Filter & Facet Dashboard**
- **Problem**: Non-semantic AI filter components break keyboard focus traps and URL history state when filtering products.
- **What I Did**: Built URLSearchParams query persistence, semantic `<fieldset>` / `<legend>` facet groups, keyboard focus locks, and 12 Vitest JSDOM unit test cases.
- **What Came of It**: 100% WCAG 2.1 AA accessibility compliance and zero layout regression across mobile and desktop viewports.

---

## 3. Evidence of Concrete Reminder Set

- **Calendar Nudge Event**: `🚀 FlyRank Portfolio Update: Add Case Study C (Accessible Product Filter)`
- **Scheduled Date & Time**: `Friday, September 18, 2026 @ 09:00 AM – 10:30 AM EST`
- **Notification Alerts**: 24-hour email alert + 10-minute pop-up desktop notification.
- **Recurring Notion & Reminders Note**: Active recurring task created with the 5-step maintenance checklist.

---

## 4. Preservation of Build Context
The Claude Project (`Portfolio-Sitemap-Build`) remains active in the Anthropic workspace, configured with standing system prompts containing our proof statement, identity color tokens (`zinc-950`, `emerald-500`), and coding standards. Adding future case studies is a short 5-minute conversation rather than a codebase rebuild.
