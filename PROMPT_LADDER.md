# FlyRank AI Fluency: Prompt Ladder (Prompting Fundamentals)
**Intern Name:** Talha Yaseen  
**Track:** Front-End & AI Engineering  
**Phase:** Prompting Fundamentals (Week 2 / FL-02/03 Build)  

---

## 🪜 The Prompt Ladder Journey

This document chronicles the step-by-step optimization of a prompt to generate a production-ready, accessible, and verified React Settings Form component. Each step attacks a specific output weakness by adding exactly one prompting layer.

---

### 🔴 Version 0: The Embarrassing Baseline
*   **Prompt:**
    > *"Build a React settings form."*
*   **Output Excerpt:**
    ```jsx
    import React from 'react';
    export default function SettingsForm() {
      return (
        <form onSubmit={() => alert('Saved!')}>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <button type="submit">Save</button>
        </form>
      );
    }
    ```
*   **Notes:**
    *   *What Changed:* N/A (Baseline).
    *   *What Actually Improved:* N/A.
    *   *What Still Failed:* The output is completely generic, lacks validation rules, has no theming system, and has no accessibility structure.
    *   *What I Will Try Next:* Add a **clearer goal** listing the required fields and toggle state features.

---

### 🟢 Version 1: Adding a Clearer Goal
*   **Prompt:**
    > *"Build a React settings form that includes a username field, email field, password field, bio textarea with live character counter, and a light/dark theme toggle."*
*   **Output Excerpt:**
    ```jsx
    import React, { useState } from 'react';
    export default function SettingsForm() {
      const [bio, setBio] = useState('');
      const [theme, setTheme] = useState('light');
      return (
        <div className={theme}>
          <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <textarea value={bio} onChange={e => setBio(e.target.value)} maxLength={160} />
            <span>{bio.length}/160</span>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
            <button type="submit">Save</button>
          </form>
        </div>
      );
    }
    ```
*   **Notes:**
    *   *What Changed:* Added a clearer goal specifying required input fields, bio state, and theme toggle mechanism.
    *   *What Actually Improved:* The component now contains the exact state variables and controls required to support the bio character count and the theme switch.
    *   *What Still Failed:* The styling is written using native layout elements without layout spacing, and the theme switcher only toggles a local state container rather than applying to the page document itself.
    *   *What I Will Try Next:* Add **real context** concerning the build environment (Vite + React) and styling utility (Tailwind CSS).

---

### 🟢 Version 2: Adding Real Context
*   **Prompt:**
    > *"Build a React settings form that includes a username field, email field, password field, bio textarea with live character counter, and a light/dark theme toggle. The component runs in a Vite + React application using Tailwind CSS for styling. The theme toggle should add/remove the 'dark' class on the documentElement."*
*   **Output Excerpt:**
    ```jsx
    import React, { useState, useEffect } from 'react';
    export default function SettingsForm() {
      const [bio, setBio] = useState('');
      const [theme, setTheme] = useState('light');
      useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') root.classList.add('dark');
        else root.classList.remove('dark');
      }, [theme]);
      return (
        <form className="max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-4">
          <input className="w-full px-3 py-2 border rounded-md" type="text" placeholder="Username" />
          <input className="w-full px-3 py-2 border rounded-md" type="email" placeholder="Email" />
          <input className="w-full px-3 py-2 border rounded-md" type="password" placeholder="Password" />
          <textarea className="w-full p-2 border rounded-md" value={bio} onChange={e => setBio(e.target.value)} />
          <div className="text-right text-xs text-zinc-500">{bio.length}/160</div>
          <button type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2 border rounded">Theme</button>
          <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded">Save</button>
        </form>
      );
    }
    ```
*   **Notes:**
    *   *What Changed:* Added real context defining the Vite compiler environment, Tailwind CSS class styles, and the `document.documentElement` theme effect.
    *   *What Actually Improved:* The visual design is polished and fits Tailwind layouts, and the theme switcher interacts dynamically with the global document page rather than a local container.
    *   *What Still Failed:* The form lacks validation constraints (users can submit empty spaces, invalid email strings, and insecure passwords).
    *   *What I Will Try Next:* Add clear **constraints** for input validation criteria.

---

### 🟢 Version 3: Adding Constraints
*   **Prompt:**
    > *"Build a React settings form that includes a username field, email field, password field, bio textarea with live character counter, and a light/dark theme toggle. The component runs in a Vite + React application using Tailwind CSS for styling. The theme toggle should add/remove the 'dark' class on the documentElement. Constraints: Validate username is 3-20 alphanumeric characters, email matches standard regex, password requires at least 1 uppercase/1 lowercase/1 number/1 special character, and bio is capped at 160 characters. Disable the submit button reactively if any validations fail or if the form is empty."*
*   **Output Excerpt:**
    ```jsx
    const [errors, setErrors] = useState({});
    const validate = () => {
      const newErrors = {};
      if (!/^[a-zA-Z0-9]{3,20}$/.test(username)) newErrors.username = 'Invalid username';
      if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email';
      if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(password)) newErrors.password = 'Too weak';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    ```
*   **Notes:**
    *   *What Changed:* Added regex constraints for inputs and validation state parameters.
    *   *What Actually Improved:* The submit button is now locked reactively on input checks, preventing database-violating submissions from executing.
    *   *What Still Failed:* Input validation errors are not accessible. Screen readers cannot hear or notice the error paragraphs when moving through fields.
    *   *What I Will Try Next:* Add **quality criteria** focusing on WCAG AA accessibility states.

---

### ⚠️ Version 4: Adding Quality Criteria (The "Worse/Failure" Moment)
*   **Prompt:**
    > *"Build a React settings form that includes a username field, email field, password field, bio textarea with live character counter, and a light/dark theme toggle. The component runs in a Vite + React application using Tailwind CSS for styling. The theme toggle should add/remove the 'dark' class on the documentElement. Constraints: Validate username is 3-20 alphanumeric characters, email matches standard regex, password requires at least 1 uppercase/1 lowercase/1 number/1 special character, and bio is capped at 160 characters. Disable the submit button reactively if any validations fail or if the form is empty. Quality Criteria: The component must comply with WCAG AA accessibility standards. Use semantic HTML (fieldset, button triggers), explicitly link label tags to inputs via htmlFor/id, set aria-invalid dynamically on error, and link validation error paragraphs to inputs using aria-describedby."*
*   **Output Excerpt:**
    ```jsx
    import * as Tooltip from '@radix-ui/react-tooltip';
    // Renders complex aria-describedby popups wrapping input fields...
    ```
*   **Notes:**
    *   *What Changed:* Added WCAG AA accessibility quality criteria (`aria-describedby`, semantic HTML).
    *   *What Actually Improved:* Inputs are now linked to error labels, and screen readers correctly announce validation status.
    *   *This Made It Worse (The Failure Moment):* The AI tried to achieve accessibility by importing a heavy third-party tooltip library (`@radix-ui/react-tooltip`). This cluttered the markup and broke the local Vite dev server because the `@radix-ui/react-tooltip` package was not installed in `package.json`.
    *   *What I Will Try Next:* Add **verification requirements** that demand a clean companion unit test suite to prove validation logic and restrict external library bloating.

---

### 🟢 Version 5: Adding Verification Requirements
*   **Prompt:**
    > *"Build a React settings form that includes a username field, email field, password field, bio textarea with live character counter, and a light/dark theme toggle. The component runs in a Vite + React application using Tailwind CSS for styling. The theme toggle should add/remove the 'dark' class on the documentElement. Constraints: Validate username is 3-20 alphanumeric characters, email matches standard regex, password requires at least 1 uppercase/1 lowercase/1 number/1 special character, and bio is capped at 160 characters. Disable the submit button reactively if any validations fail or if the form is empty. Quality Criteria: The component must comply with WCAG AA accessibility standards. Use semantic HTML (fieldset, button triggers), explicitly link label tags to inputs via htmlFor/id, set aria-invalid dynamically on error, and link validation error paragraphs to inputs using aria-describedby. No external tooltip libraries. Verification Requirements: Provide a companion Vitest unit test suite (SettingsForm.test.jsx) that asserts username alphanumeric rules, email validation, and reactive button disabled states."*
*   **Output Excerpt (Vitest suite):**
    ```javascript
    import { describe, it, expect } from 'vitest';
    import { render, screen, fireEvent } from '@testing-library/react';
    import SettingsForm from './SettingsForm';
    
    describe('SettingsForm Validation', () => {
      it('disables the save button on invalid inputs', () => {
        render(<SettingsForm />);
        const button = screen.getByRole('button', { name: /save/i });
        expect(button).toBeDisabled();
      });
    });
    ```
*   **Notes:**
    *   *What Changed:* Added verification requirements (companion Vitest tests) and restricted third-party tooltip library dependencies.
    *   *What Actually Improved:* The AI reverted to clean, native HTML layout elements to handle errors (avoiding build failures) and provided a complete unit test suite verifying each validation rule in JSDOM.
    *   *What Still Failed:* The prompt is too specific to our settings form. A developer on another track would have to manually edit all the fields to reuse it.
    *   *What I Will Try Next:* Refactor the prompt into a reusable template that any frontend engineer can copy and use immediately.

---

## 🏆 Final Reusable Prompt Template

This prompt is generic, parameterized, and ready to be used by any developer on the team:

```text
Act as a senior front-end engineer specializing in building highly accessible, modular components.

Task:
Build a React component named [COMPONENT_NAME] that accomplishes the following goal: [DETAILED_GOAL].

Context & Tech Stack:
- Build Environment: Vite + React (ESM).
- Styling: Tailwind CSS classes. No inline styles.
- State Scope: [STATE_PERSISTENCE_REQUIREMENTS (e.g. Local Storage / Context)].

Constraints:
1. Input Validations:
   [INPUT_VALIDATION_RULES (e.g. Username: 3-20 alphanumeric, Email: regex check)].
2. Submission Behavior:
   Reactively disable the submit button if any validation checks fail or if the required fields are empty.

Quality Criteria (a11y & code design):
1. Must comply with WCAG AA accessibility guidelines.
2. Use semantic HTML (e.g., fieldset, legend, native buttons).
3. Explicitly connect labels to inputs using htmlFor/id pairs.
4. Set aria-invalid="true" dynamically on invalid fields.
5. Place validation error texts in helper paragraphs and link them to inputs using aria-describedby.
6. Do NOT install or import any third-party UI libraries (like Radix, headless UI, or tooltips) unless they are core React packages.

Verification Requirements:
Provide a companion Vitest unit test suite ([COMPONENT_NAME].test.jsx) using React Testing Library. The suite must verify:
- Initial component states (disabled/enabled buttons).
- Field validation triggers on user inputs (valid and invalid cases).
- Execution of the submission handler on successful submit.
```
