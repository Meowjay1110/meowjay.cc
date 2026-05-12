---
name: new-component
description: Scaffold a new Astro component following the project's TypeScript and Tailwind conventions
---

Create a new Astro component in `src/components/`. Follow these conventions exactly as used in this project.

Ask the user for:
1. Component name (PascalCase, e.g. `TagCloud`)
2. What it does (one sentence)
3. What props it needs (types, optional/required, defaults)
4. Whether it receives `CollectionEntry<"blog">` data (yes/no)

Then create `src/components/<Name>.astro` with this structure:

```astro
---
// Type-only imports use `import type`
import type { CollectionEntry } from "astro:content";
// Internal imports use @/ alias
import { someUtil } from "@/utils/example";

type Props = {
  // Required props first, then optional
  requiredProp: string;
  optionalProp?: boolean;
};

// Destructure with defaults for optional props
const { requiredProp, optionalProp = false } = Astro.props;
---

<div class="...tailwind classes...">
  <!-- template -->
</div>
```

Rules to follow:
- Use `import type` for type-only imports (TypeScript strict mode)
- Always define `type Props = { ... }` — never use `interface`
- Use `@/` for all internal imports, never relative paths like `../../`
- Use `class:list={[...]}` for conditional Tailwind classes, not string concatenation
- Never use `console.log` (ESLint `no-console: error` rule)
- No `client:*` directives unless the user explicitly asks for interactivity — this site is mostly static
- Use `focus-visible:` for keyboard focus styles on interactive elements

After creating the file, show the user the component and ask if they want to add it to any existing page or layout.
