# FlyRank FE-07: Generative UI & Server-Side Tool Contract Specification
**Intern Name:** Talha Yaseen  
**Track:** Frontend AI Engineering  
**Assignment:** FE-07 (Week 5 / Build Phase)  
**Live Preview URL:** [https://flyrank-capstone.vercel.app/](https://flyrank-capstone.vercel.app/)  
**Tool Definition File:** [`lib/tools/seo-audit-tool.js`](file:///c:/Users/User/Desktop/flyrank-capstone-1/lib/tools/seo-audit-tool.js)  
**Route Handler File:** [`app/api/chat/route.js`](file:///c:/Users/User/Desktop/flyrank-capstone-1/app/api/chat/route.js)  
**Chat Component File:** [`app/page.js`](file:///c:/Users/User/Desktop/flyrank-capstone-1/app/page.js)

---

## 1. Tool Contract & Schema Definition

The server-side tool `analyzeSeoHealth` is defined in `lib/tools/seo-audit-tool.js` using a typed parameter schema. It audits target domains for traditional search visibility, AI LLM indexing, and WCAG AA accessibility rules.

```javascript
// Tool Schema Definition (lib/tools/seo-audit-tool.js)
export const analyzeSeoHealthSchema = {
  name: 'analyzeSeoHealth',
  description: 'Audits a target domain for traditional search visibility, AI LLM indexing, and WCAG AA accessibility compliance.',
  parameters: {
    type: 'object',
    properties: {
      domain: { 
        type: 'string', 
        description: 'The target website domain to audit (e.g. flyrank-capstone.vercel.app)' 
      },
      targetKeywords: { 
        type: 'array', 
        items: { type: 'string' },
        description: 'Primary keywords for search visibility checks' 
      },
      includeAccessibilityCheck: { 
        type: 'boolean', 
        description: 'Whether to execute automated JSDOM accessibility checks' 
      }
    },
    required: ['domain']
  }
};
```

---

## 2. Four Tool Part Lifecycle States (Generative UI)

Rather than dumping raw JSON into the chat window, the UI renders the tool lifecycle as distinct, styled visual component states:

```mermaid
flowchart TD
    State1["1. Input Streaming / Invoking"] --> State2["2. Input Available"]
    State2 --> State3{Execution Status}
    State3 -->|Success| State4["3. Output Available (Score Card Component)"]
    State3 -->|Failure (e.g. error.com)| State5["4. Output Error (Designed Failure Card)"]
```

### 🎨 Visual State Matrix

| Tool Lifecycle State | User Question Addressed | Visual Component Treatment |
| :--- | :--- | :--- |
| **1. Input Streaming** | *"What tool is running?"* | **Pulsing Scanner Badge:** Displays an active spinning radar indicator with text `"Invoking analyzeSeoHealth..."`. |
| **2. Input Available** | *"What arguments were passed?"* | **Parsed Arguments Card:** Displays domain badge (`flyrank-capstone.vercel.app`) and target keyword tags in a dark code block. |
| **3. Output Available** | *"What came back?"* | **Generative Score Card & Findings Table:** Renders a 96/100 score badge, progress bar, category checks, and keyword rank metrics. |
| **4. Output Error** | *"What went wrong?"* | **Designed Error Card:** Displays a red alert card with error code `AUDIT_TIMEOUT_ERROR`, explanation message, and a **Retry** button. |

---

## 3. Structured Component Return Shape

When `analyzeSeoHealth` executes successfully, it returns a structured JSON payload rendered as a rich React UI card:

```json
{
  "success": true,
  "data": {
    "domain": "flyrank-capstone.vercel.app",
    "overallHealthScore": 96,
    "categories": [
      { "name": "Meta & Open Graph Tags", "score": 98, "status": "pass" },
      { "name": "WCAG 2.1 AA Accessibility", "score": 100, "status": "pass" },
      { "name": "LLM Crawler Indexing (llms.txt)", "score": 92, "status": "pass" },
      { "name": "Automated Vitest Test Coverage", "score": 100, "status": "pass" }
    ]
  }
}
```

---

## 4. Designed Error State Handling (Zero Crashes)

Passing `domain: "error.com"` triggers a designed failure state without throwing runtime exceptions or breaking the UI:

```json
{
  "success": false,
  "error": {
    "code": "AUDIT_TIMEOUT_ERROR",
    "message": "Failed to connect to automated audit indexer for domain: error.com. Host unreachable.",
    "suggestedAction": "Verify URL hostname and retry tool execution."
  }
}
```
* **UI Behavior:** Displays a dark red border container (`border-red-500/30`), warning icon, failure explanation, and a non-blocking retry control.
