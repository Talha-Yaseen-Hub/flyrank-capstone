# FlyRank AI Fluency: Prompt Iteration Log
**Intern Name:** Talha Yaseen  
**Track:** Front-End & AI Engineering  
**Phase:** Foundations (Week 3 Prompt Engineering)  

---

## 1. Selected Task Context
*   **Audit Target Task:** Writing Vitest Unit Tests for Form Validation Components.
*   **Objective:** Validate input fields reactively (username alphanumeric length, email format, password complexity rules, bio character limits) and assert submit button enabled/disabled states.

---

## 2. Prompt Iteration Ladder

### 🔴 Version 0: The Naive Baseline
*   **Prompt:**
    > *"Write unit tests for my settings form validation."*
*   **Output Excerpt:**
    ```javascript
    test('form validation', () => {
      expect(validateForm({ email: 'test@test.com' })).toBe(true);
    });
    ```
*   **Iteration Notes:**
    *   *What Changed:* Baseline naive prompt.
    *   *What Actually Improved:* N/A.
    *   *What Still Failed:* The output is generic, uses a mock function that doesn't interact with the DOM, and doesn't match the specific fields or validation criteria in my project.
    *   *What I Will Try Next:* Apply **Role Assignment** to focus the AI on strict QA testing methodologies.

---

### 🟢 Version 1: Role Assignment
*   **Prompt:**
    > *"Act as a Senior QA and Test Automation Engineer. Write unit tests for my settings form validation."*
*   **Output Excerpt:**
    ```javascript
    describe('Settings Form Validation', () => {
      it('should validate email input field correctly', () => {
        const errors = validateEmail('invalid-email');
        expect(errors).toContain('Invalid email format');
      });
    });
    ```
*   **Iteration Notes:**
    *   *What Changed:* Instructed the AI to act as a "Senior QA and Test Automation Engineer".
    *   *What Actually Improved:* The output tone became professional, structuring tests under describe/it blocks instead of flat test files.
    *   *What Still Failed:* It is still guessing what fields and rules exist, leading to tests checking generic fields (like 'name' or 'phone') that aren't in my component.
    *   *What I Will Try Next:* Add **Context and Motivation** detailing the exact form validation rules.

---

### 🟢 Version 2: Context and Motivation
*   **Prompt:**
    > *"Act as a Senior QA and Test Automation Engineer. I am building a settings form component in vanilla JavaScript. I want to ensure my validations (username: 3-20 alphanumeric, email: standard pattern, password: uppercase/lowercase/number/special character, bio: max 160 characters) work perfectly to prevent database validation errors. Write unit tests for this form validation."*
*   **Output Excerpt:**
    ```javascript
    describe('Field Validation Constraints', () => {
      it('validates username format', () => {
        expect(validateUsername('usr')).toBe(true);
        expect(validateUsername('us')).toBe(false);
      });
    });
    ```
*   **Iteration Notes:**
    *   *What Changed:* Provided the exact validation criteria and stated the goal (preventing database validation crashes).
    *   *What Actually Improved:* The assertions now check the precise field parameters (3-20 character lengths, password regex limits) mapped out in the project specification.
    *   *What Still Failed:* The tests assert pure function returns rather than simulating interactions on actual DOM nodes, which fails to test if the component updates the document correctly.
    *   *What I Will Try Next:* Provide **Few-Shot Examples** to guide the test syntax toward DOM manipulation.

---

### 🟢 Version 3: Few-Shot Examples
*   **Prompt:**
    > *"Act as a Senior QA and Test Automation Engineer. I am building a settings form component in vanilla JavaScript. I want to ensure my validations (username: 3-20 alphanumeric, email: standard pattern, password: uppercase/lowercase/number/special character, bio: max 160 characters) work perfectly to prevent database validation errors. Write unit tests for this form validation.
    
    Here is an example of what a good test looks like for the username field in JSDOM:
    ```js
    it('should fail if username is too short', () => {
      const input = document.getElementById('username');
      input.value = 'ab';
      const isValid = validateUsername(input.value);
      expect(isValid).toBe(false);
    });
    ```
    Write similar unit tests for the rest of the validations."*
*   **Output Excerpt:**
    ```javascript
    it('should fail if email is invalid', () => {
      const input = document.getElementById('email');
      input.value = 'invalid-email';
      const isValid = validateEmail(input.value);
      expect(isValid).toBe(false);
    });
    ```
*   **Iteration Notes:**
    *   *What Changed:* Pasted a code block showing the exact DOM retrieval and assertion style.
    *   *What Actually Improved:* The AI abandoned abstract function testing and outputted DOM-based tests matching the exact format of my test suite.
    *   *What Still Failed:* The test suite lacks setup assertions (mocking JSDOM environment) and doesn't test the form's submit button state behavior.
    *   *What I Will Try Next:* Specify the **Output Structure** in distinct code blocks.

---

### 🟢 Version 4: Output Structure
*   **Prompt:**
    > *"Act as a Senior QA and Test Automation Engineer. I am building a settings form component in vanilla JavaScript. I want to ensure my validations (username: 3-20 alphanumeric, email: standard pattern, password: uppercase/lowercase/number/special character, bio: max 160 characters) work perfectly to prevent database validation errors. Write unit tests for this form validation.
    
    [FEW_SHOT_EXAMPLE]
    
    Structure your output in three distinct code blocks:
    1. Setup & Imports (importing Vitest, JSDOM globals)
    2. Individual Field Validation Tests (using the example pattern)
    3. Form State & Submit Button Tests (asserting reactive button disabled states)"*
*   **Output Excerpt:**
    ```javascript
    // Block 1: Setup & Imports
    import { describe, it, expect, beforeEach } from 'vitest';
    // Block 2: Individual Field Validation Tests
    // ...
    // Block 3: Form State & Submit Button Tests
    // ...
    ```
*   **Iteration Notes:**
    *   *What Changed:* Added instructions to divide the output into Setup, Field Tests, and Form State blocks.
    *   *What Actually Improved:* The tests are grouped cleanly, making it easy to copy the setup script at the top and the assertions at the bottom.
    *   *What Still Failed:* The AI did not cover boundary conditions (e.g. exactly 20 characters vs 21 characters for username), testing only basic lengths.
    *   *What I Will Try Next:* Apply **Step Decomposition** to force the AI to write out boundaries before coding.

---

### 🟢 Version 5: Step Decomposition
*   **Prompt:**
    > *"Act as a Senior QA and Test Automation Engineer. I am building a settings form component in vanilla JavaScript. I want to ensure my validations (username: 3-20 alphanumeric, email: standard pattern, password: uppercase/lowercase/number/special character, bio: max 160 characters) work perfectly to prevent database validation errors. Write unit tests for this form validation.
    
    [FEW_SHOT_EXAMPLE]
    [OUTPUT_STRUCTURE]
    
    Decompose your task into these steps before writing the code:
    1. List all validation rules and identify the boundary conditions (pass and fail cases) for each.
    2. Draft a mock DOM structure representing the settings form.
    3. Write the test suite following the structural blocks."*
*   **Output Excerpt:**
    ```text
    Step 1: Boundary Mapping
    - Username: 2 chars (fail), 3 chars (pass), 20 chars (pass), 21 chars (fail)...
    Step 2: Mock DOM Draft
    - <form id="form">...
    Step 3: Test Implementation
    ...
    ```
*   **Iteration Notes:**
    *   *What Changed:* Instructed the AI to write out boundary maps and mock DOM layouts before generating the code block.
    *   *What Actually Improved:* The generated test suite now explicitly includes critical boundary checks (testing exactly 20-character passes and 21-character failures) that it previously skipped.
    *   *What Still Failed:* The prompt is highly customized to this project, which isn't useful for a developer working on a different component.
    *   *What I Will Try Next:* Generalize it into a reusable, parameter-driven prompt template.

---

## 3. Cross-Model Comparison (Claude vs. ChatGPT)

I evaluated the final decomposed prompt on both **Claude 3.5 Sonnet** and **ChatGPT (GPT-4o)**:

| Evaluation Dimension | Claude 3.5 Sonnet | ChatGPT (GPT-4o) |
|:---|:---|:---|
| **Tone & Style** | Direct, highly technical, minimal conversation. | Polite, slightly wordy introductory sentences. |
| **Accuracy** | 100% correct regex boundaries and environment setups. | Good validation logic, but missed the teardown step. |
| **a11y Mocks** | Correctly asserted `aria-describedby` text content links. | Asserted elements existed, but skipped testing `aria-invalid` values. |
| **Failure Points** | None encountered in the code block. | **JSDOM State Pollution:** Failed to include `afterEach(() => { document.body.innerHTML = ''; })` cleanup, which causes test runs to fail sequentially. |

---

## 🏆 Reusable Prompt Template

```text
Act as a Senior QA and Test Automation Engineer specializing in modern JavaScript environments (Vitest/Jest).

Task:
Write a comprehensive unit test suite for [COMPONENT_OR_MODULE_NAME] that runs in [ENVIRONMENT (e.g. JSDOM/Node)].

Context:
- Target File: [PATH_OR_COMPONENT_DESCRIPTION].
- Core Logic: [EXPLAIN_LOGIC_AND_INPUTS (e.g. Username validations, password constraints)].
- Stated Motivation: [WHY_IT_MATTERS (e.g. Preventing form submission errors before API calls)].

Few-Shot Example:
```js
[PASTE_EXAMPLE_TEST_CASE]
```

Output Structure:
Structure your response in three distinct code blocks:
1. Setup & Imports (including environment mocks and teardowns)
2. Individual Input Validation Tests (covering edge cases and boundary parameters)
3. Component/Form State Tests (asserting interactive changes like button disabled states)

Step Decomposition:
Decompose your task into these steps before writing the code blocks:
1. List all logic rules and identify the boundary conditions (pass and fail cases) for each.
2. Draft a mock DOM structure representing the target component.
3. Write the test suite following the structural blocks.
```
