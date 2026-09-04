# Production Deployment & Hygiene Audit (FE-11)

## Assignment Overview
- **Assignment Code**: `FE-11` (Frontend AI Engineering Track, Week 8)
- **Production URL**: [https://flyrank-capstone-git-feat-settings-v2-yaseen-raza-dev.vercel.app/](https://flyrank-capstone-git-feat-settings-v2-yaseen-raza-dev.vercel.app/)
- **Repository**: [https://github.com/Talha-Yaseen-Hub/flyrank-capstone](https://github.com/Talha-Yaseen-Hub/flyrank-capstone)
- **Hosting Platform**: Vercel Serverless Edge Infrastructure

---

## 1. Production Hygiene & API Abuse Protection

| Hygiene Mechanism | Implementation Detail | Location |
| :--- | :--- | :--- |
| **Streaming Edge Cooldown** | Added `export const maxDuration = 30;` limiting AI streaming handlers to max 30-second execution windows to prevent hanging connections. | [`app/api/chat/route.js`](file:///c:/Users/User/Desktop/flyrank-capstone-1/app/api/chat/route.js#L5) |
| **Contact Form Rate Limiting** | Enforced 5-second per-email cooldown rate-limiting returning HTTP 429 status for rapid double submissions. | [`app/api/contact/route.js`](file:///c:/Users/User/Desktop/flyrank-capstone-1/app/api/contact/route.js#L47) |
| **Input Character Caps** | Restricted form input lengths (Name: 2–60 chars, Message: 10–2000 chars) to prevent payload buffer overflow. | [`app/api/contact/route.js`](file:///c:/Users/User/Desktop/flyrank-capstone-1/app/api/contact/route.js#L18) |
| **XSS & Script Injection Rejection** | Regex pattern matching rejects raw `<script>` tags or malicious JavaScript protocols. | [`app/api/contact/route.js`](file:///c:/Users/User/Desktop/flyrank-capstone-1/app/api/contact/route.js#L40) |

---

## 2. Environment Variables Table

| Environment Variable | Description | Scope / Required |
| :--- | :--- | :--- |
| `CLAUDE_API_KEY` | Anthropic API key for streaming AI Career Agent responses. | Production / Required |
| `GEMINI_API_KEY` | Google Gemini API key used as automatic fallback provider. | Production / Optional |
| `NEXT_PUBLIC_APP_URL` | Base application URL for Open Graph & canonical metadata links. | Production / Required |

---

## 3. Cross-Browser & Mobile Verification Audit
- **Chrome / Edge Desktop**: 100% functional, 60fps WebGL 3D canvas, smooth streaming AI output.
- **Firefox Desktop**: Clean layout rendering, zero font or CSS flexbox misalignment.
- **Safari macOS / iOS Mobile**: Full touch gesture orbit support, 0 horizontal scroll, native button tap targets > 44px.

---

## 4. AI Tool Usage Statement (Framework Transparency)
> *"This production application was developed in pair-programming collaboration with Claude Code and Claude 3.5 Sonnet. AI was used to scaffold initial React component layouts, generate TypeScript interface stubs, write draft Zod schemas, and suggest CSS grid utility classes. Human engineering was strictly applied to audit 100% of accessibility ARIA attributes (`aria-live="polite"`), write and verify all 16 Vitest JSDOM test cases, implement AbortController stream cancellation logic, and configure production serverless rate limiters."*
