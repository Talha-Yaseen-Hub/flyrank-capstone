# WORKFLOW.md: AI-Driven Software Engineering Comparison

## Correctness & Edge Cases
In **Round One (V1)**, the vague prompt yielded a settings form that was barely functional. While it succeeded in basic length check for password and standard email regex, it failed on several critical correctness criteria:
- The username field allowed special characters, numbers-only, or whitespace-only inputs, which are invalid for standard username specs.
- The password field validation was weak (only checking `length < 6`), allowing insecure passwords (e.g., "123456").
- The bio text area lacked a character limit, allowing users to input arbitrary lengths, violating database constraints.
- Form inputs were read directly from the DOM on submit, meaning there was no reactive validation or live feedback.

In **Round Two (V2)**, the precise prompt forced a clean MVC/component-based architecture (`src/components/SettingsForm.js`).
- Reactive validation was implemented using input event listeners to validate username (3-20 characters, alphanumeric), email (robust regex), and password (enforcing uppercase, lowercase, numbers, and special characters).
- The bio field included a character counter (`X / 160`) and blocked inputs exceeding 160 characters.
- The save button was disabled reactively whenever there were validation errors, preventing invalid form submissions.

## Accessibility (a11y)
- **V1**: Had major accessibility issues. It used basic text styling, lacked labels linked explicitly to input fields, and provided no aria annotations. Users on screen readers would receive no feedback on validation errors.
- **V2**: Leveraged semantic HTML (`<fieldset>`, `<legend>`, and `<form>`). Inputs were linked to error messages via `aria-describedby` and dynamically set `aria-invalid="true"` on validation errors. Contrast ratios matched WCAG AA guidelines, and custom focus states were added for keyboard navigation.

## Review Effort & AI Mistakes Caught
- **V1 review**: The review took considerable manual effort. I had to manually spot missing dark mode support, notice that the bio input was unchecked, and identify the lack of modularity (all code was inside a single, tightly-coupled event listener).
- **V2 review**: Since the precise prompt requested unit tests, the AI produced a test suite (`SettingsForm.test.js`). The tests immediately caught a ReferenceError in the email validator: the validator code tried to call `emailRegex.test(email)` using an undefined variable `email` instead of the function parameter `value`. The automated test run failed and pointed directly to the line of error, allowing me to instantly fix it to `emailRegex.test(value)` without manual browser debugging.

## Time Analysis
- **Round One**: Took ~5 minutes to prompt and write, but review and manual debugging would take ~30 minutes to make production-ready.
- **Round Two**: Took ~15 minutes to write the precise prompt and review the modular structure. Running the tests took ~1 minute. It was immediately production-ready.
End-to-end, Round Two was significantly faster and much more robust.
