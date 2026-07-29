# FlyRank AI Fluency: Workflow Audit & Toolkit Configuration
**Intern Name:** Talha Yaseen  
**Track:** Front-End & AI Engineering  
**Phase:** Setup (FL-01)  

---

## 1. Recurring Weekly Tasks Audit

Below is the workflow audit classifying 12 recurring tasks from my real week (study, work, and side projects). This classification is based on Ethan Mollick's "AI Intern" framework to determine where AI adds high leverage, where it requires review, and where it must not be trusted.

| Task Name | Category | Classification | One-Line Rationale |
|:---|:---|:---|:---|
| **1. Writing JSX/TSX layout components** | Work / Code | **Collaborate with AI** | AI quickly scaffolds layout structures, but manual code hookup is required for states and exact styles. |
| **2. Scaffolding new Vite + React apps** | Side Projects | **Fully automate** | Initial boilerplates, folders, and configs are standard templates easily automated via standard scripts. |
| **3. Writing unit tests for form validation** | Work / QA | **Delegate to AI with review** | AI excels at writing boundary check assertions (e.g. usernames), but I must verify edge cases for logic bugs. |
| **4. Designing custom vector logo/icon assets** | Side Projects | **Just me** | Visual style and brand aesthetic judgments require human intuition and cannot be consistently output by AI. |
| **5. Connecting domains to Search Console** | Work / DevOps | **Just me** | Requires direct secure login credentials, DNS management, and verified security authority that cannot be shared. |
| **6. Refactoring raw CSS files to Tailwind CSS** | Work / Design | **Delegate to AI with review** | AI translates standard CSS rules into utility class strings fast, but I must review responsive layouts manually. |
| **7. Drafting daily stand-up/status updates** | Work / Comm | **Collaborate with AI** | I supply bullet points of what I completed, and the AI drafts a professional, clear paragraph for the team. |
| **8. Researching WCAG 2.2 accessibility rules** | Study | **Collaborate with AI** | AI returns quick examples of accessibility rules, but I must manually verify compatibility with screen readers. |
| **9. Documenting new SEO endpoints (`llms.txt`)** | Work / Docs | **Collaborate with AI** | I provide the raw specifications and crawler rules, and the AI formats them into clean, structured Markdown tables. |
| **10. Managing build deployments to Vercel** | Work / DevOps | **Fully automate** | This is handled via standard CI/CD triggers on GitHub branch merges, eliminating manual deployment. |
| **11. Reviewing teammate pull requests (PRs)** | Work / Code | **Just me** | Code reviews require deep context of business goals and architecture decisions that AI lacks access to. |
| **12. Weekly planning & personal goal setting** | Personal | **Just me** | Deciding on skill focus, time allocation, and career roadmap is highly personal and requires human judgment. |

---

## 2. Toolkit Verification & Academy Status

### Toolkit Accounts Configured:
1. **Claude (Anthropic)**: Configured free account for day-to-day coding, prompting analysis, and structured reasoning.
2. **ChatGPT (OpenAI)**: Configured free account for comparative validation, search surface testing, and multi-model audits.
3. **Anthropic Academy**: Created account and enrolled in the certified course: **AI Fluency: Framework & Foundations**.
   - *Status:* **Module 1 (Core Collaboration Frameworks) Completed**.

---

## 3. Claude Project Custom Instructions

A Claude Project has been set up with custom instructions to act as an context-aware assistant. 

### Configuration Details:
- **Project Name:** `FlyRank-Development`
- **Custom Instructions (System Profile):**
  ```text
  You are an expert AI development assistant paired with Talha Yaseen, a Front-End & AI Engineer Intern at FlyRank.
  
  - Tone Preferences: Direct, concise, technical, and objective. Avoid fluff, excessive greetings, and conversational fillers.
  - Work Context: Focus on building accessible (WCAG AA), responsive React components, writing robust Vitest suites, and optimizing traditional/AI search visibility.
  - Guidelines: Write modular, readable code. Prioritize native semantic HTML elements over complex custom handlers.
  ```

---

## 4. Reusable Target Tasks & Success Definitions

These three specific tasks will be targeted and analyzed in assignments FL-02 through FL-04.

### Task A: Writing Vitest Unit Tests for Form Validation Components
*   **"Done Well" Success Definition (Measurable):** 
    1. achieves 100% statement and branch coverage on input validation logic.
    2. Zero false-positive test passes (asserting that invalid emails/passwords fail).
    3. Runs completely in headless JSDOM in under 3 seconds.
    4. Covers boundary cases (e.g. exactly 3 and 20 character limits for usernames, special characters, and empty spaces).

### Task B: Refactoring Legacy CSS to Tailwind Utility Classes
*   **"Done Well" Success Definition (Measurable):** 
    1. 100% visual styling parity (zero visual layout shift/regression on mobile, tablet, and desktop viewports).
    2. Elimination of redundant CSS custom classes (reducing file size by at least 40%).
    3. Complies with WCAG AA contrast ratio standards (4.5:1 minimum for normal text) using customized Tailwind color stops.

### Task C: Automating Build Validation & Live Status Verification
*   **"Done Well" Success Definition (Measurable):** 
    1. Static checks (ESLint + TypeScript type checking) run automatically on branch push, returning 0 errors.
    2. Production build successfully compiles in under 45 seconds.
    3. Deployments verify system status on completion, with the `/health` endpoint responding with `200 OK` and latency under 150ms.
