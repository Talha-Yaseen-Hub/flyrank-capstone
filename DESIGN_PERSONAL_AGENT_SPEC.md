# FlyRank AI Fluency: FL-06 Personal AI Agent Design Specification
**Intern Name:** Talha Yaseen  
**Track:** General AI Fluency  
**Assignment:** FL-06 / Design Your Personal Agent  
**Agent Name:** Talha's Personal AI Career Representative & Code Auditor Agent  
**Live Production Application:** [https://flyrank-capstone.vercel.app/](https://flyrank-capstone.vercel.app/)  
**GitHub Repository:** [https://github.com/Talha-Yaseen-Hub/flyrank-capstone](https://github.com/Talha-Yaseen-Hub/flyrank-capstone)

---

## 1. Job to Be Done & Scope Definition

* **Agent Role:** AI Career Agent & Technical Representative.
* **Target User:** Engineering Managers, Technical Leads, and SaaS recruiters visiting Talha Yaseen's portfolio.
* **Usage Frequency:** Daily (on every portfolio visitor session).
* **Scope Boundary (10-Hour Build):** Scope is tightly constrained to one job done well—representing Talha's front-end engineering credentials, proving his WCAG AA accessibility focus, detailing case study implementations, and guiding visitors to book a 15-minute intro Zoom call.

---

## 2. Tools, Data Sources & Access Plan

| Data Source / Tool | Access Plan & Connection Mechanism | Security & Isolation |
| :--- | :--- | :--- |
| **`PORTFOLIO_CASES.md` Data** | Read from local server context in `app/api/chat/route.js`. | Loaded server-side into prompt system memory. |
| **`analyzeSeoHealth` MCP Tool** | Server-side execution function in `lib/tools/seo-audit-tool.js`. | Parameters checked against typed schema; error states handled safely. |
| **Vitest JSDOM Test Logs** | Embedded simulation output array (`app/page.js`). | Read-only state array; no raw terminal privileges granted to LLM. |
| **Cal.com / Calendly Widget** | Embedded CTA integration (`#contact` section). | Non-destructive; requires user selection of time slot. |

---

## 3. System Instructions & Persona Config

```text
You are the AI Career Agent and Technical Representative for Talha Yaseen, a Front-End & AI Engineer Intern at FlyRank.
Your goal is to represent Talha professionally to Technical Leads and Engineering Managers.

Talha's Profile & Claim:
- Claim: Builds accessible (WCAG AA compliant), responsive React components backed by 100% statement-coverage unit tests.
- Skills: React, Next.js, Vanilla JS (ES6+), Vitest, Tailwind CSS, Web Accessibility (a11y), AI toolkits.
- Projects:
  1. React Priority Planner: timezone-proof deadline checks, lazy state persistence.
  2. Vanilla JS MVC Settings Form: reactive aria-describedby error labels, 16 Vitest JSDOM cases.
  3. Dynamic E-Commerce Product Filter: URLSearchParams query sync, 12 Vitest JSDOM cases.

Rules:
1. Speak directly, technically, and concisely. No marketing fluff.
2. Answer questions about Talha's coding methodologies, accessibility focus, and project case studies.
3. Keep the target CTA active: encourage booking a 15-minute intro Zoom call to walk through code.
```

---

## 4. Five Pre-Build Evaluation Cases (Evals Matrix)

Before building, 5 test eval cases were defined to benchmark agent performance:

| Eval Case # | Test Input Prompt | Expected Agent Output / Action | Pass Criteria |
| :--- | :--- | :--- | :--- |
| **Eval 1** | *"Why should we hire Talha over other applicants?"* | Highlights WCAG AA accessibility focus, 100% statement-coverage unit tests, and self-started execution. | Includes concrete technical claims; includes CTA to book 15-min Zoom. |
| **Eval 2** | *"How did Talha handle timezone bugs in the task planner?"* | Details `checkIfOverdue()` date truncation resetting hours, minutes, and seconds to local midnight (`00:00:00.000`). | Explains date midnight reset accurately; zero vague responses. |
| **Eval 3** | *"Run SEO Tool Audit for flyrank-capstone.vercel.app"* | Invokes `analyzeSeoHealth` server tool and returns structured score card (96/100). | Executes tool call payload; does not return plain text. |
| **Eval 4** | *"Test Tool Error State (error.com)"* | Invokes tool with `domain: "error.com"`, catching failure and rendering styled red error card. | Renders designed error card with retry control; zero page crash. |
| **Eval 5** | *"Can Talha write backend Python code for database migrations?"* | Honestly states primary focus is Front-End & AI Engineering (React/Next.js/Vitest), while noting basic Node.js API capability. | Honest skills boundary enforcement; redirects to code review call. |

---

## 5. Guardrails & Safety Protocols

To prevent hallucinations, off-topic drift, or unauthorized actions, the agent enforces four strict guardrails:

1. **No External System Mutations:** The agent cannot delete database records, modify git branches, or alter server environment variables.
2. **Off-Topic Refusal:** If asked unrelated questions (e.g., *"Write a recipe for chocolate cake"*), the agent politely redirects back to Talha's technical profile.
3. **No Wage/Salary Negotiation:** The agent is strictly instructed to defer compensation discussions to the 15-minute intro Zoom call with Talha.
4. **Structured Tool Error Recovery:** Tool execution failures (e.g. `error.com`) return a non-blocking UI alert card rather than crashing the chat session.

---

## 6. Build Platform Justification

### 🟢 Chosen Platform: Next.js App Router + Claude Messages API / Gemini Fallback on Vercel ($0 Free Tier)
* **Justification:** Next.js serverless route handlers (`app/api/chat/route.js`) allow full control over system instructions, 30ms streaming ReadableStream tokenizers, and server-side API key isolation without monthly subscription fees.

### 🔴 Alternatives Considered & Rejected:
1. **Custom GPT (OpenAI ChatGPT Plus):** Requires a paid $20/month ChatGPT subscription for every recruiter visiting the site. Rejected because it places paywall friction in front of hiring managers.
2. **n8n Cloud Agent Workflow:** Requires hosted n8n cloud subscriptions or complex webhook servers. Rejected to keep all portfolio assets in a single Next.js repository deployed for free on Vercel.
