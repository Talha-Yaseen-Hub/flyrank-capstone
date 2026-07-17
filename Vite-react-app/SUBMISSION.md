# Task 1 Homework Submission Log — AI-Assisted React Development

## 1. Prompts Used

### Prompt 1: Initial Scaffolding
> *"Scaffold a modern React task planner application under a subdirectory `Vite-react-app`. Include a package.json referencing React, Lucide Icons, and Vite, and configure `vite.config.js` and a mountable `index.html`. Provide clean code structure."*

### Prompt 2: Core Components Design
> *"Implement the UI components for the React task planner. I need three main components: `TaskForm.jsx` for creating tasks with validation, categories, and due dates; `TaskList.jsx` rendering items, displaying colored badges, and editing items inline; and `TaskStats.jsx` showing totals, completed rate, and overdue task alerts."*

### Prompt 3: App Orchestration & Local Storage
> *"Create `App.jsx` and styling files. App must load initial template task records, persist additions/changes to localStorage, filter items by categories/priorities/status, allow full-text search, support a light/dark theme switch, and maintain clean CSS variables."*

---

## 2. AI Assistance Explanation

The AI development assistant facilitated the implementation by:
1. **Scaffolding Tooling Configurations**: Instantly generated standard configuration files (`vite.config.js`, `package.json`, `index.html`) aligning React dependency rules, saving boilerplate setup time.
2. **Modular Components Decoupling**: Suggested breaking down the task planner dashboard into decoupled visual areas (`TaskStats`, `TaskForm`, `TaskList`), which made code modification straightforward and maintainable.
3. **SVG & Icon Integration**: Recommended standard Lucide Icon combinations (`Sun`, `Moon`, `Search`, `Trash2`, etc.) to enhance the visual appeal of actions.
4. **State Management Flow**: Prepared standard hook structures (`useState`, `useEffect`) for state tracking and local storage writes.

---

## 3. Manual Improvements & Corrections Made

During the review and test phases, I identified several bugs and architectural weaknesses in the generated code and made the following manual corrections:

### A. Overdue Tasks Comparison Correction
*   **AI Error**: The generated code used `new Date(task.dueDate) < new Date()` to check if a task was overdue. This compared milliseconds and marked tasks due today as "overdue" because of timezone or timestamp hour offsets.
*   **Correction**: I manually reset the time variables to midnight (`00:00:00.000`) before running the date check:
    ```javascript
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate);
    return due < today;
    ```
    This resolved false-positive alerts on task cards.

### B. Title Space Validation Trim
*   **AI Error**: The AI allowed submission of empty space characters as valid titles (e.g. `"   "`), which created blank task items.
*   **Correction**: I added `.trim()` validation in the submission handler to ensure only non-empty task titles can be added:
    ```javascript
    if (!title.trim()) {
      setError('Task Title is required.');
      return;
    }
    ```

### C. Unique State Initialization Safeguards
*   **AI Error**: The initial local storage load in `App.jsx` lacked a fallback check, leading to potential null errors on clean browser loads.
*   **Correction**: I structured a fallback loader utilizing React state lazy initialization:
    ```javascript
    const [tasks, setTasks] = useState(() => {
      const saved = localStorage.getItem('vite-react-tasks');
      return saved ? JSON.parse(saved) : DEFAULT_TASKS;
    });
    ```

### D. CSS Dark Mode Color Contrast Fixes
*   **AI Error**: The generated dark mode styling variables had poor text contrast (dark grey text on dark background).
*   **Correction**: I manually refactored the design variables inside `src/index.css` to align with WCAG AA accessibility standards:
    ```css
    :root.dark {
      --bg-color: #0b0f19;
      --text-color: #f8fafc;
      --card-bg: rgba(20, 26, 43, 0.8);
      --text-muted: #94a3b8;
    }
    ```
