# FlyRank FE-08: Error States, Empty States & Edge Cases Audit Specification
**Intern Name:** Talha Yaseen  
**Track:** Frontend AI Engineering  
**Assignment:** FE-08 (Week 5 / Build Phase)  
**Live Preview URL:** [https://flyrank-capstone.vercel.app/](https://flyrank-capstone.vercel.app/)  
**Route Handler File:** [`app/api/chat/route.js`](file:///c:/Users/User/Desktop/flyrank-capstone-1/app/api/chat/route.js)  
**Chat Component File:** [`app/page.js`](file:///c:/Users/User/Desktop/flyrank-capstone-1/app/page.js)  
**Tool Definition File:** [`lib/tools/seo-audit-tool.js`](file:///c:/Users/User/Desktop/flyrank-capstone-1/lib/tools/seo-audit-tool.js)

---

## 1. Primary Flow Failure & Edge Case Inventory

| Failure / Edge Case Scenario | Trigger / Root Cause | Designed Failure State & Recovery Action |
| :--- | :--- | :--- |
| **1. First-Run Empty State** | Initial page load with empty chat history. | **Designed Onboarding State:** Displays agent active badge, bio summary, and 4 click-to-fill sample prompts (`"Why should we hire Talha?"`, `"Run SEO Tool Audit"`). |
| **2. Mid-Stream Interruption (User Abort)** | User clicks "Stop Stream" mid-generation. | **Abort Recovery:** Invokes `AbortController.abort()`, preserves generated text so far, updates state to `'stopped'`, and re-enables input for the next prompt. |
| **3. API Error / Rate Limit (HTTP 500 / 429)** | Server route failure or missing credentials. | **Simulated Fallback Parser:** Smoothly switches to localized streaming simulation engine without throwing unhandled JS exceptions. |
| **4. Server Tool Execution Error** | Tool called on domain `error.com`. | **Designed Tool Error Card:** Displays a red alert container with error code `AUDIT_TIMEOUT_ERROR`, explanation message, and a **Retry** button. |
| **5. Empty Whitespace Submission** | User presses Enter on empty or `" "` input. | **Input Guard:** Validation handler enforces `!input.trim()`, disabling submit button and blocking empty payload transmissions. |
| **6. Mobile Safari Keyboard Viewport Push** | Virtual keyboard resizes viewport on iOS. | **CSS Viewport Pinning:** Message container uses `h-[520px]` with internal overflow scrolling, preventing viewport destruction or input truncation. |

---

## 2. Sabotage Testing Checklist & Results

```text
================================================================================
🧪 SABOTAGE TESTING & EDGE CASE VERIFICATION LOG
================================================================================

[SABOTAGE TEST 1: Empty Input Submission]
• Action: Typed spaces "    " into chat input and hit Enter.
• Expected Behavior: Submission blocked; input field cleaned.
• Result: PASS. Submit button remained disabled; no payload sent.

[SABOTAGE TEST 2: Mid-Stream Cancellation (Stop Button)]
• Action: Sent prompt and clicked "Stop Stream" halfway through streaming response.
• Expected Behavior: Stream halts instantly; partial response stays intact; input re-enables.
• Result: PASS. AbortController aborted fetch stream, status set to 'stopped', input ready for next prompt.

[SABOTAGE TEST 3: Tool Execution Failure (error.com)]
• Action: Clicked "Test Tool Error State (error.com)" prompt button.
• Expected Behavior: Renders designed error card with error code and Retry control; zero page crash.
• Result: PASS. Server returned structured error payload; UI rendered styled red alert card.

[SABOTAGE TEST 4: Console Error Check on Happy Path]
• Action: Executed 3 sequential multi-turn chat questions and 1 tool audit.
• Expected Behavior: Zero unhandled console warnings or exceptions.
• Result: PASS. 0 console errors logged in Chrome DevTools.
================================================================================
```

---

## 3. Empty State Onboarding Design

> **Empty states are onboarding, not apologies.**

Instead of displaying a dead-end message like *"No messages yet"*, the chat assistant initializes with an active persona card and four direct click-to-fill sample prompt buttons:

1. `"Why should we hire Talha?"` -> Demonstrates WCAG AA accessibility & test coverage credentials.
2. `"Run SEO Tool Audit (analyzeSeoHealth)"` -> Demonstrates FE-07 Generative UI tool execution.
3. `"Test Tool Error State (error.com)"` -> Demonstrates FE-08 designed error handling.
4. `"How do you add the next case study?"` -> Demonstrates Capstone maintenance protocol.

---

## 4. Designed Error Component Contract

When `analyzeSeoHealth` encounters a failure state, it renders a designed error card rather than throwing an exception:

```jsx
// Rendered Designed Error Card in app/page.js
<div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 space-y-2">
  <div className="flex items-center gap-2 font-bold text-xs">
    <AlertTriangle className="w-4 h-4 text-red-500" />
    <span>Tool Execution Error: AUDIT_TIMEOUT_ERROR</span>
  </div>
  <p className="text-xs leading-relaxed">
    Failed to connect to automated audit indexer for domain: error.com. Host unreachable.
  </p>
  <button onClick={handleRetry} className="text-xs underline font-semibold hover:text-red-300">
    Retry Tool Call
  </button>
</div>
```
