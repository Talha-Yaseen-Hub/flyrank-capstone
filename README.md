<a id="top"></a>
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6C63FF,50:00C9A7,100:00B4D8&height=220&section=header&text=FlyRankAi%20Capstone%20Project&fontSize=44&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Reactive%20Settings%20Form%20%E2%80%94%20AI-Assisted%20Development%20Workflow&descAlignY=58&descSize=17&animation=twinkling"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=600&size=22&duration=3000&pause=900&color=00C9A7&center=true&vCenter=true&width=850&lines=Reactive+Form+Validation+in+Pure+JavaScript;Light+%2F+Dark+%2F+System+Theme+Persistence;Live+Character+Counting+%26+a11y+States;Comparing+Vague+vs.+Precise+AI+Prompts;Built+for+the+FlyRankAi+Internship"/>

</div>

<br/>

<div align="center">

| 🏢 Program | 🧭 Phase | 🧩 Deliverable Type | 📌 Status | 👤 Work Type |
|:---:|:---:|:---:|:---:|:---:|
| FlyRankAi Internship 2026 | Foundations | Capstone Project | In Progress | Solo |

</div>

<div align="center">

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
<img src="https://img.shields.io/badge/MIT%20License-3DA639?style=for-the-badge&logo=opensourceinitiative&logoColor=white"/>

</div>

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00B4D8,100:6C63FF&height=50&section=footer"/>
</div>

## 📖 Table of Contents

<details open>
<summary><b>Click to expand / collapse</b></summary>

- [📖 About FlyRankAi](#about-flyrank)
- [🎯 About This Capstone](#about-capstone)
- [✨ Features](#features)
- [🛠️ Technologies Used](#tech)
- [🧱 Component Architecture](#architecture)
- [🗂️ Repository Structure](#structure)
- [🧪 The v1 vs v2 Experiment](#experiment)
- [🔄 Component State Flows](#states)
- [📨 Form Submission Sequence](#sequence)
- [🗺️ Build & Automation Workflow](#workflow)
- [✅ Testing Strategy](#testing)
- [🚀 Setup & Execution Instructions](#setup)
- [⚠️ Notes & Future Improvements](#issues)
- [🎓 Internship Context](#academic)
- [👨‍💻 Author](#author)
- [📜 License](#license)
- [⭐ Support](#support)

</details>

---

<a id="about-flyrank"></a>
## 📖 About FlyRankAi

**FlyRankAi** is an all-in-one SEO and AI-search optimization platform that combines automated SEO audits, AI-driven content suggestions, keyword tracking, and analytics into a single dashboard — helping brands grow both traditional organic traffic and visibility inside AI-driven search surfaces like ChatGPT, Perplexity, Gemini, and Claude.

This repository is **not** the platform itself — it's a capstone exercise from the FlyRankAi internship program, used to build the foundational front-end engineering skills (reactive UI, validation, accessibility, testing discipline) that feed into how production features actually get built at FlyRankAi.

| Aspect | Detail |
|---|---|
| 🌐 Product Focus | SEO audits + AI-search visibility, in one dashboard |
| 🎯 Target Surfaces | Traditional search **and** AI assistants (ChatGPT, Perplexity, Gemini, Claude) |
| 🧭 This Repo's Role | Internship capstone — not the production platform |

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

<a id="about-capstone"></a>
## 🎯 About This Capstone

The deliverable is a **user settings form** — username, email, password, bio, and a theme preference control — built entirely in vanilla JavaScript with no frameworks. The twist: it's built **twice**, from two different prompts, to make a measurable point about how much prompt precision changes AI-assisted output.

| Objective | Description |
|-----------|--------------|
| 🧩 **Framework-Free Discipline** | Prove that reactive, production-quality UI doesn't require React/Vue — just disciplined vanilla JS |
| ⚡ **Real-Time Validation** | Give users immediate, specific feedback instead of a single submit-time error dump |
| 🎨 **Persisted Theming** | Respect light / dark / system preference and remember the user's choice across sessions |
| ♿ **Accessibility by Default** | Every interactive element is screen-reader friendly, not bolted on after the fact |
| 🧪 **Verifiable Correctness** | Back every validation rule and stateful behavior with an automated test, not just a manual click-through |

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

<a id="features"></a>
## ✨ Features

| Feature | Description |
|---------|--------------|
| ⚡ **Reactive Input Validation** | Validates fields as the user types — alphanumeric username limits, standard email format, and password rules requiring uppercase, lowercase, numbers, and special characters |
| 🎯 **Dynamic Visual State Cues** | Green border/shadow on valid input, red border plus helper text on invalid input, submit button disabled until the form is genuinely valid |
| 📝 **Live Bio Character Counter** | Real-time `X / 160` counter on the bio textarea; blocks submission once the 160-character limit is exceeded |
| 🌗 **Persisted Theme Controller** | Light, dark, and system-preference toggle that applies root-level class changes and remembers the choice via `localStorage` |
| ♿ **Screen-Reader Accessibility (a11y)** | Semantic HTML, labeled inputs, error text linked via `aria-describedby`, and reactive `aria-invalid` states |
| 🧪 **Automated Test Coverage** | 16 Vitest cases covering validation boundaries, storage read/write, and theme-state transitions in a headless DOM |

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

<a id="tech"></a>
## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic, accessible markup for all form elements |
| **Vanilla JavaScript (ES6+)** | All reactivity, validation, and state handling — no framework |
| **Vanilla CSS** | Custom properties (theme tokens), Flexbox/Grid layout, transition keyframes for UI feedback |
| **Vite** | Local dev server with fast HMR, and production bundling |
| **Vitest** | Automated unit testing in a simulated JSDOM browser environment |
| **localStorage** | Client-side persistence of theme preference (no backend/database involved) |
| **Node.js** | Runs `build_assignment.cjs` — the automation script that scaffolds, tests, and pushes the v1/v2 comparison branches |

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

<a id="architecture"></a>
## 🧱 Component Architecture

How the pieces of the form talk to each other at runtime:

```mermaid
flowchart TD
    U([👤 User Input]) --> F[Settings Form Component]
    F --> V[Validation Engine]
    F --> C[Bio Character Counter]
    F --> T[Theme Controller]

    V -->|valid / invalid| S[Submit Button State]
    V -->|error messages| A[aria-describedby Text]

    T -->|read/write| L[(localStorage)]
    T --> R[Root Document Class]

    C -->|count > 160| V

    S --> O([✅ Form Submission])
```

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

<a id="structure"></a>
## 🗂️ Repository Structure

```text
.
├── .assignment/
│   ├── v1/              # Baseline build — from a vague prompt
│   └── v2/              # Premium build — from a precise prompt
├── src/                 # Foundations-phase source (form component, styles, logic)
├── build_assignment.cjs # Automation script (CommonJS) — scaffolds/tests/pushes v1 & v2
├── build_assignment.js  # Automation script (ESM variant)
├── index.html           # Entry point for local Vite dev/preview
├── package.json         # Scripts & dependencies
├── vite.config.js       # Vite build/dev configuration
├── CLAUDE.md            # AI-assistant working guidelines for this repo
├── LICENSE
└── README.md
```

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

<a id="experiment"></a>
## 🧪 The v1 vs v2 Experiment

The `.assignment/` directory is the heart of the exercise: the **same settings form**, built from two different prompt qualities, kept side by side for direct comparison.

| Dimension | `.assignment/v1/` — Vague Prompt | `.assignment/v2/` — Precise Prompt |
|---|---|---|
| **Structure** | Minimal, ad-hoc | Fully modular |
| **Validation** | Basic `alert()`-based | Live, field-level, reactive |
| **Testing** | None | Full Vitest suite |
| **Theming** | No dark mode | Light / dark / system, persisted |
| **Accessibility** | No a11y tags | `aria-describedby`, `aria-invalid`, semantic labeling |

```mermaid
flowchart LR
    P1[Vague Prompt] --> V1["v1 Build<br/>alert() validation<br/>no tests, no a11y"]
    P2[Precise Prompt] --> V2["v2 Build<br/>reactive validation<br/>full test suite, a11y, theming"]
    V1 -.compared against.-> V2
```

The point isn't that v1 is "wrong" — it's an honest snapshot of what a vague prompt produces from an AI assistant by default, so the gap to v2 is measurable rather than anecdotal.

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

<a id="states"></a>
## 🔄 Component State Flows

### 🎯 Field Validation Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Untouched
    Untouched --> Typing : User input
    Typing --> Valid : Passes rule set
    Typing --> Invalid : Fails rule set
    Valid --> Typing : Further edits
    Invalid --> Typing : Further edits
    Valid --> [*] : Form submit enabled
    Invalid --> [*] : Submit blocked
```

### 🌗 Theme Preference Lifecycle

```mermaid
stateDiagram-v2
    [*] --> System : Default on first load
    System --> Light : User selects Light
    System --> Dark : User selects Dark
    Light --> Dark : Toggle
    Dark --> Light : Toggle
    Light --> System : Reset preference
    Dark --> System : Reset preference
    Light --> [*] : Persisted to localStorage
    Dark --> [*] : Persisted to localStorage
    System --> [*] : Persisted to localStorage
```

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

<a id="sequence"></a>
## 📨 Form Submission Sequence

What happens, in order, from keystroke to a successful submit:

```mermaid
sequenceDiagram
    participant User
    participant Form as Settings Form
    participant Val as Validation Engine
    participant UI as Visual State (border/aria)
    participant Btn as Submit Button

    User->>Form: Types into a field
    Form->>Val: Run field validator
    Val-->>UI: Set valid/invalid state
    UI-->>Btn: Enable / disable submit
    User->>Form: All fields valid
    Form->>Btn: Enable submit
    User->>Btn: Click Submit
    Btn-->>User: ✅ Form submitted
```

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

<a id="workflow"></a>
## 🗺️ Build & Automation Workflow

`build_assignment.cjs` turns the v1/v2 comparison into a reproducible pipeline instead of a manual copy-paste exercise.

```mermaid
flowchart TD
    A[Run build_assignment.cjs] --> B[Scaffold .assignment/v1<br/>from vague-prompt baseline]
    A --> C[Scaffold .assignment/v2<br/>from precise-prompt build]
    B --> D[Commit to feat/settings-v1]
    C --> E[Commit to feat/settings-v2]
    D --> F[Run Vitest suite]
    E --> F
    F --> G{All tests pass?}
    G -- Yes --> H[Push branches to GitHub]
    G -- No --> I[Fail build & report]
    H --> J[Open for review /<br/>diff comparison]
```

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

<a id="testing"></a>
## ✅ Testing Strategy

The component ships with **16 Vitest cases** run against a headless JSDOM environment, grouped into three areas:

| Area | What's Covered | Approx. Share |
|------|-----------------|:---:|
| 🔠 **Validation Boundaries** | Username length limits, email format edge cases, password complexity rules, bio 160-character ceiling | ~50% |
| 💾 **Storage Interactions** | Correct read/write of theme preference to `localStorage`, fallback when nothing is stored | ~25% |
| 🌗 **Theme State Transitions** | Light → Dark → System cycling applies the correct root class and persists across a simulated reload | ~25% |

```mermaid
pie showData
    title Illustrative Test Distribution (16 cases)
    "Validation Boundaries" : 8
    "Storage Interactions" : 4
    "Theme State Transitions" : 4
```

```bash
# Run the full test suite
npm run test

# Watch mode while developing
npm run test -- --watch
```

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

<a id="setup"></a>
## 🚀 Setup & Execution Instructions

### ✅ Prerequisites

- **Node.js** (LTS recommended) and **npm**
- A modern browser for manual preview

### 🗺️ Getting Started

```mermaid
flowchart LR
    A[1. Clone Repository] --> B[2. npm install]
    B --> C[3. npm run dev<br/>Vite local server]
    C --> D[4. npm run test<br/>Vitest suite]
    D --> E[5. node build_assignment.cjs<br/>optional: rebuild v1/v2 branches]
```

| Step | Command | Purpose |
|:----:|---------|---------|
| 1 | `git clone <repo-url>` | Clone the repository locally |
| 2 | `npm install` | Install Vite, Vitest, and any dev dependencies |
| 3 | `npm run dev` | Launch the Vite dev server and preview the form in-browser |
| 4 | `npm run test` | Run the Vitest suite against the current build |
| 5 | `node build_assignment.cjs` | (Optional) regenerate and push the `feat/settings-v1` / `feat/settings-v2` comparison branches |

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

<a id="issues"></a>
## ⚠️ Notes & Future Improvements

> Honest notes for picking this back up later — not criticisms, just a real next-steps list.

| # | Observation | Suggested Direction |
|---|--------------|------------------|
| 1 | No backend currently exists — validation and persistence are entirely client-side | Introduce a lightweight API layer if the form needs to sync across devices |
| 2 | Theme preference is scoped to `localStorage` only | Consider syncing to a user profile once auth/backend exists |
| 3 | v1 is intentionally left "unpolished" as a baseline | Keep it frozen for comparison — resist the urge to quietly improve it |

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

<a id="academic"></a>
## 🎓 Internship Context

| Item | Details |
|------|---------|
| 🏢 Program | FlyRankAi Internship 2026 |
| 📚 Phase | Foundations |
| 🧩 Deliverable | Capstone — Reactive Settings Form (v1 vs v2 prompt comparison) |
| 🧑‍💻 Work Type | Solo project |

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

<a id="author"></a>
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00B4D8,50:00C9A7,100:6C63FF&height=150&section=header&text=About%20The%20Author&fontSize=34&fontColor=ffffff&animation=fadeIn"/>

## 👨‍💻 Author

FlyRankAi Internship — Foundations Phase Capstone (2026)

</div>

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

<a id="license"></a>
## 📜 License

<div align="center">

<img src="https://img.shields.io/badge/License-MIT-3DA639?style=for-the-badge&logo=opensourceinitiative&logoColor=white"/>

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for full details.

</div>

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

<a id="support"></a>
<div align="center">

# ⭐ Support

If this repository is useful as a reference for prompt-quality comparisons or vanilla-JS form patterns, consider giving it a **⭐ Star**.

<br>

### 🌟 *"The gap between a vague prompt and a precise one is a whole test suite, a theme system, and accessibility."*

<br>

<img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=500&size=18&duration=3000&pause=1000&color=00C9A7&center=true&vCenter=true&width=600&lines=Thanks+for+Reading%21;Keep+Building%2C+Keep+Testing;See+You+in+the+Next+Phase"/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6C63FF,50:00C9A7,100:00B4D8&height=140&section=footer"/>

</div>