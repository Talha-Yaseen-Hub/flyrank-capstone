# NOTES.md — Accessibility & Source Analysis

This document provides a detailed comparative analysis between our custom scratch-built interactive components and the industry-standard implementations from **shadcn/ui** (which wraps **Radix UI Primitives**).

---

## 1. Scratch vs. Shadcn: Dialog (Modal) Comparison

Our scratch-built `<Modal>` component handles the core ARIA modal behavior: setting `role="dialog"`, `aria-modal="true"`, trapping focus using a keyboard loop on `Tab` / `Shift+Tab`, closing on `Escape`, and restoring focus to the triggering element on close. 

When comparing this against the shadcn/ui source (`dialog.tsx`), we identified the following concrete architectural and accessibility gaps that Radix/Shadcn solves:

### Gap A: DOM Isolation & Portal Insertion
*   **Scratch Version**: Renders inline inside the DOM tree where the component is invoked. If any parent container has `overflow: hidden`, `clip-path`, or a relative stacking context with low `z-index`, the modal overlay can be visually cut off or obscured.
*   **Shadcn/Radix**: Uses `DialogPortal` to inject the modal markup directly at the root of `document.body`. This guarantees that it bypasses all parent container styling restrictions. Even though it is physically teleported in the DOM, Radix maintains the context and visual focus state correctly.

### Gap B: Background Inertness & Pointer Events Blocking
*   **Scratch Version**: Only traps keyboard focus and prevents standard scrolling via `overflow: hidden` on the body. However, background content is not marked as `inert`, and pointer interactions are not blocked. Screen reader users could theoretically navigate outside the modal container using virtual search commands, and mouse users can hover over background content.
*   **Shadcn/Radix**: Dynamically sets `pointer-events: none` on the HTML body when the dialog opens, preventing all hover/click interactions outside the modal. Furthermore, it automatically appends `aria-hidden="true"` to all top-level sibling DOM elements, preventing assistive screen readers from accessing background elements.

### Gap C: Focus Restoration Safeguards & Timing
*   **Scratch Version**: Synchronously calls `previousActiveElement.focus()` when closing. If the closing action is triggered by unmounting the parent or transitioning pages, the element may no longer exist, causing focus to drop silently back to the `<body>` element.
*   **Shadcn/Radix**: Employs deferred focus scheduling. It tracks whether the trigger element remains mounted in the DOM. If the trigger is removed, it intelligently falls back to focus the nearest sensible parent container or document body. It also prevents focus from snapping back during a transition, ensuring a smooth transition without screen reader jitter.

---

## 2. Scratch vs. Shadcn: Tabs Comparison

Our scratch `<Tabs>` component implements horizontal arrow navigation (ArrowLeft/ArrowRight), auto-activation of panels, Home/End boundaries, and setting `tabIndex={0}` on the active trigger and `tabIndex={-1}` on others.

Here are the key gaps between our custom version and shadcn's Tabs:

### Gap D: Focus Ring & Keyboard-Only Outline
*   **Scratch Version**: Custom focus styling can appear on standard mouse clicks, which may look visually cluttered for normal pointer users.
*   **Shadcn/Radix**: Uses Radix's state selectors. Trigger styles use focus-visible states: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`. This ensures focus rings only appear when navigating via keyboard (tab/arrows), maintaining clean design for mouse users.

### Gap E: Activation Modes (Automatic vs. Manual)
*   **Scratch Version**: Hardcoded for automatic activation (as arrow keys focus a tab, it is instantly selected and its panel renders). While compliant for simple structures, it is problematic if tab panels contain dynamic data fetching or heavy rendering payloads, leading to performance bottlenecks when navigating via keyboard.
*   **Shadcn/Radix**: Allows swapping between `automatic` and `manual` activation mode. In manual mode, arrow keys navigate focus between tab headers, but the user must press `Space` or `Enter` to select and load the panel content.

---

## 3. Summary Lessons

1.  **Semantic HTML + Native Elements are Key**: For disclosures, using a native `<button>` element automatically registers Space/Enter key presses, eliminating the need to write custom keyboard listeners and improving reliability.
2.  **Focus Traps are Deceptively Complex**: A robust focus trap must handle dynamic children, iframes, disabled elements, and window focus blur events. Relying on headless libraries like Radix UI for production apps protects against edge cases (like multi-modal stacking and browser-specific quirks).
