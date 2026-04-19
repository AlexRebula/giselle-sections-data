# Architecture: The `sections-api` Pattern and Why This Package Exists

This document explains the design thinking behind `@alexrebula/giselle-sections-data` — what problem it solves, how the data layer pattern works, and why the extraction boundary sits where it does.

---

## Why This Is Open Source

Every React project I start from scratch goes through the same bootstrapping work: defining section types, writing the same utility helpers, setting up the same data layer pattern. This package is my attempt to stop doing that work twice. I had this in mind for a long time — and I am now finally doing it.

The immediate goal is selfish — reuse these types and utilities across my own projects without copying files. But the extraction boundary was drawn carefully enough that anyone building a section-based React UI could drop this in and get the same head start. If the package becomes robust enough, I hope someone else benefits from it too.

That is the real reason this is a published package rather than a private utility folder.

---

## The Problem with Inline Portfolio Data

Portfolio sites typically scatter content across JSX files: hardcoded strings in props, inline image paths, copy-pasted arrays of objects directly inside component render trees. This approach works until it doesn't:

- Content changes require navigating JSX to find the right string
- There is no separation between "what data looks like" and "how data is rendered"
- Adding a CMS later means rewriting components, not just swapping the data source
- Nothing about the architecture signals to a technical reviewer that the developer builds real systems

---

## The `sections-api` Pattern

Treat the portfolio like a product: a pure data layer of typed factory functions that return typed props, consumed by presentation components that know nothing about data sources.

```
sections-api/
  types.ts          ← type contracts (interfaces, not values)
  api.ts            ← view-level orchestration (calls factories, assembles view data)
  home/
    data.tsx        ← createHomeHeroData(), createExpertiseAreasData(), ...
  about/
    data.ts         ← createAboutHeroData(), ...
  services/
    data.tsx        ← createServicePackagesData(), ...
```

**The rule:** Components receive typed props and render. They never import from `data.ts` files directly, never reach into a data store, and never hardcode strings. All content flows in from the data layer.

```ts
// ✗ inline data in JSX
<Section title="What I Do" items={[{ id: '1', icon: 'solar:code-bold', title: 'React' }]} />

// ✓ data layer returns typed props; component is a pure consumer
const homeView = buildHomeView();
<Section {...homeView.expertise} />
```

### The migration path

When the time comes to add a CMS, a database, or an API:

1. Factory functions become async adapters
2. They fetch from the real source and return the same typed props they return today
3. **Components are untouched** — they still just receive typed props and render

The data layer is the seam. Change what's behind it without touching what's in front of it.

---

## What Was Extracted into This Package

The `sections-api` lives inside the consuming app. But three things inside it have no app-specific content and are genuinely reusable:

| What             | Why it belongs in the package                                                      |
| ---------------- | ---------------------------------------------------------------------------------- |
| `types/index.ts` | Pure TypeScript interfaces — shapes, not values. No personal data.                |
| `utils/index.ts` | `createDataFactory`, `mapDataArray`, `filterDataArray` — pure functions, no state |
| `samples/index.ts` | Generic placeholder data for tests and Storybook                                |

Everything else stays in the consuming app:

| What stays in the app        | Why                                                                 |
| ---------------------------- | ------------------------------------------------------------------- |
| `home/data.tsx`              | Contains real names, testimonials, image paths, career history      |
| `about/data.ts`              | Personal bio, client logos, employment timeline                     |
| `services/data.tsx`          | Pricing, deliverables, process steps with personal content          |
| `api.ts`                     | Orchestrates the app's specific view structure                      |
| MUI-extended types (`sx:`)   | MUI is an app-level concern, not part of the generic type contracts |

### The extraction boundary test

> _"If someone else dropped this package into their project, would any of my personal content appear?"_

- **Types:** No. They are shapes.
- **Utils:** No. They are pure functions.
- **Samples:** No. They use "Sample Client", "Feature Title", placeholder hrefs.
- **Domain data factories:** Yes — names, testimonials, client logos, image paths. These stay in the app.

---

## React-First Design Decision

The types use `ReactNode` for rich content fields (`description`, `content`, `answer`, etc.). React is declared as a peer dependency (`^18.0.0 || ^19.0.0`).

This is a deliberate choice, not an oversight. The package is designed to be used in React/Next.js projects. Making it "framework-agnostic" would mean swapping `ReactNode` for `string | unknown` and losing the ability to pass rich content — which is a real use case for section descriptions and FAQ answers.

There is no JSX in the package. The types are compatible with React props but contain no rendering logic.

---

## Keeping MUI Out of the Package

The consuming app uses MUI v7. Many app-level types extend the package types with `sx: SxProps<Theme>` for styling. This extension lives in the app's own `types.ts`, not in this package.

Keeping MUI out of the package means:

- The package has no dependency on `@mui/material`
- Any React project can use the package, regardless of which component library it uses
- The styling layer is always an app-level concern

---

## Package Build

Built with [`tsup`](https://tsup.egoist.dev/) — zero-config bundler that handles ESM + CJS + TypeScript declarations in one command.

```ts
// tsup.config.ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  external: ['react'],
  clean: true,
});
```

`react` is marked external — it is not bundled into the output. The consuming app provides it via the peer dependency.

The `exports` field in `package.json` handles both ESM (`import`) and CJS (`require`) consumers:

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js",
    "require": "./dist/index.cjs"
  }
}
```

---

## Local Development (`file:` protocol)

During development, before the package is published to npm, the consuming app references it locally:

```json
// consuming-app/package.json
"@alexrebula/giselle-sections-data": "file:../../../giselle-sections-data"
```

After any changes to the package, run `npm install` in the consuming app to re-link. `npm run build` in the package is not required for the type-check step (TypeScript resolves from `src/` via the local symlink), but is required for the published dist output.

---

## The TypeScript Duplicate-Export Catch

When the three Dashboard Preview types (`DashboardPreviewContentConfig`, `DashboardPreviewVisualConfig`, `SectionPreviewConfig`) were moved to the package, they weren't immediately removed from the app's `types.ts`. The app's `sections-api/index.ts` re-exports both `./api` (which imports from the package) and `./types` (which still had the same types defined locally). TypeScript caught it immediately:

```
TS2308: Module './api' has already exported a member named 'DashboardPreviewContentConfig'.
Consider explicitly re-exporting to resolve the ambiguity.
```

**Fix:** Remove the duplicate definitions from `types.ts`, import them from the package, and re-export them so nothing downstream needs to change its import paths:

```ts
// app/src/sections-api/types.ts
import type {
  DashboardPreviewContentConfig,
  DashboardPreviewVisualConfig,
  SectionPreviewConfig,
} from '@alexrebula/giselle-sections-data';

export type { DashboardPreviewContentConfig, DashboardPreviewVisualConfig, SectionPreviewConfig };
```

This is the canonical pattern for moving a type from an internal module to a package without breaking any consumers: import and re-export from the same location. Downstream code continues to `import from './types'` and sees nothing change.

This error is a good example of why a single source of truth for shared types matters. When the same type is defined in two places and both are re-exported through the same barrel, TypeScript gives you no choice but to fix it.
