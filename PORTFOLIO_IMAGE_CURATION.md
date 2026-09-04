# FlyRank AI Fluency: Week 3 Asset Curation & Image Discernment Audit (FL-03)
**Intern Name:** Talha Yaseen  
**Track:** Front-End & AI Engineering  
**Phase:** Week 3 / Kill Your Darlings: Image Curation & Discernment  
**Live Application:** [https://flyrank-capstone.vercel.app/](https://flyrank-capstone.vercel.app/)

---

## 1. Portfolio Image Need Mapping (The Keepers Set)

Every image and visual asset in this portfolio maps directly to a specific technical proof requirement. There are no decorative filler images.

| Asset Name | Type | Source | Purpose & Placement in Portfolio |
| :--- | :--- | :--- | :--- |
| **Personal Profile Identifier** | Real Identity | Real Initials Badge (`TY`) / Photo | **Hero Section:** Establishes authentic human identity without fake stock photos. |
| **React Planner Live UI Capture** | Real Work Capture | Real App Screen (`/Vite-react-app`) | **Case Study A Card:** Demonstrates real UI layout, midnight timezone date checks, and local storage state. |
| **MVC Settings Form UI Capture** | Real Work Capture | Real App Screen (`/playground`) | **Case Study B Card:** Shows real reactive `aria-describedby` error labels and JSDOM validation rules. |
| **Vitest Console Execution Runner** | Real Code Capture | Interactive DOM Component | **Test Verification Suite Section:** Live terminal executing 16 JSDOM unit test cases in real-time. |
| **Monogram Favicon / Brand Logo** | Generated Vector | AI Curation (Prompted) | **Header & Favicon:** Minimalist geometric `TY` monogram in `Outfit` font with `#10B981` emerald accent dot. |
| **Hero Ambient Depth Mesh** | Generated Texture | AI Curation (Prompted) | **Hero Background:** Subtle `rgba(16,185,129,0.05)` backdrop mesh providing visual polish without lowering WCAG AA contrast. |

---

## 2. Real Work Captures vs. AI Stand-Ins

### 🚫 Why Fake AI Screenshots were Banned
AI image generators can produce polished "SaaS Dashboard" mockups in seconds. However, for a Front-End & AI Engineer portfolio, **using an AI-generated screenshot is an anti-proof**. It tricks the visitor into thinking a feature exists when there is no code behind it.

### ✅ Where Real Captures Were Used
1. **Case Study A (React Priority Planner):** Replaced static mockups with a real link to `/Vite-react-app` and an interactive code drawer displaying the exact `checkIfOverdue()` date truncation function.
2. **Case Study B (MVC Settings Form):** Replaced generic form templates with a live interactive JSDOM sandbox at `/playground` backed by 16 automated Vitest assertions.
3. **Test Suite Proof:** Built a real interactive terminal component (`app/page.js` Line 408) that simulates headless Vitest runner outputs line-by-line in the browser.

---

## 3. Connective AI Image Set: Consistent Style & Mood

All generated connective assets share **one unified technical aesthetic** that strictly matches the identity kit:

* **Color Palette:** `#09090B` (Zinc Dark), `#0F172A` (Slate Text), `#10B981` (Emerald Accent), `#6366F1` (Indigo Accent).
* **Typography:** `Outfit` geometric headings + `Inter` UI body text.
* **Mood:** Minimalist technical interface focusing on clarity, code contrast, and functional accessibility borders.

### 🎨 Monogram Logo Prompt Iteration Log
* **Prompt 1 (Vague - Rejected):** *"Cool tech logo for developer portfolio"*  
  * *Result:* Complex 3D gradient cube with glowing lens flare. Discarded because it felt amateurish and upstaged the content.
* **Prompt 2 (Iterated - Accepted):** *"Minimalist flat vector circular monogram logo featuring initials TY in geometric Outfit font, dark background #09090B with a subtle emerald green #10B981 accent dot, high contrast, clean SVG icon vector"*  
  * *Result:* Crisp, professional monogram logo that matches the portfolio color tokens perfectly.

---

## 4. Ruthless Curation: Rejection Log (Discernment & Judgment)

The core skill of AI fluency is knowing what to **reject**. Below are the specific AI-generated assets that were tested and ruthlessly discarded:

### ❌ Rejection 1: Futuristic 3D AI Robot Face / Hologram Header
* **Prompt Used:** *"Futuristic glowing 3D AI robot head hovering over a neon matrix circuit background, 8k resolution, photorealistic"*
* **Why it was Rejected:** Upstages the engineering proof. A hiring manager evaluating a front-end developer cares about semantic HTML and unit test coverage, not generic sci-fi stock graphics. It makes the portfolio look like a template rather than an engineering platform.

### ❌ Rejection 2: Fake AI-Generated SaaS Dashboard Screenshot
* **Prompt Used:** *"Modern SaaS analytics web application user interface dashboard with dark theme, colorful charts, and high resolution data tables"*
* **Why it was Rejected:** It undermines trust. Presenting a generated fake screenshot pretends work was done that does not exist in code. Showing real inspectable code snippet drawers and live test suites provides authentic proof.

### ❌ Rejection 3: Photorealistic Stock Developer Photo
* **Prompt Used:** *"Professional male software engineer writing React code on a MacBook Pro in a brightly lit modern tech office"*
* **Why it was Rejected:** Using stock photo models for personal identity is deceptive. Using authentic initials (`TY`) and real developer profiles maintains integrity and human connection.
