# CLAUDE.md — FlyRankAi Capstone Guidelines

## Project Stack
- **Core**: HTML5, Vanilla JavaScript (ES6+)
- **Styling**: Vanilla CSS (Modern CSS variables, Flexbox/Grid)
- **Tooling**: Vite (for local development and bundling)

## Development Commands
- **Start local dev server**: `npm run dev`
- **Build production bundle**: `npm run build`
- **Preview production build**: `npm run preview`
- **Run linter**: `npm run lint`
- **Run unit tests**: `npm run test`

## Code Style & Conventions
- **JavaScript**: Use modern ES6+ features, prefer functional programming patterns, and maintain clean separation of concerns.
- **CSS**: Organize layout with Flexbox and Grid. Use CSS custom properties (variables) for theme values (colors, spacing, typography).
- **Naming**: Use camelCase for variables/functions, PascalCase for classes/components, and kebab-case for CSS classes.
- **Git**: Follow Conventional Commits 1.0.0 specification for commit messages.

## Project-Specific Rules Learned
1. **Forms Validation**: Always implement reactive, event-driven input validation. Submit buttons must be disabled when validation errors are present.
2. **Accessibility (a11y)**: Link form fields to helper/error text using `aria-describedby` and set `aria-invalid` dynamically to alert assistive technologies.
3. **Modularity & Testing**: Business/validation logic must be decoupled from the DOM and placed in unit-testable components (e.g., using Vitest + JSDOM).
