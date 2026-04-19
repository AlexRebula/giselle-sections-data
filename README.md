# @alexrebula/giselle-sections-data

**TypeScript types, utility helpers, and sample data for React section-based UIs.**

This package is the reusable core extracted from the `sections-api` data layer pattern, originally used in my portfolio website, currently being built. Its goal is to provide the type contracts, pure utility functions, and generic sample data that any React project can use to build a clean, typed data layer — without any personal content or presentation logic.

No JSX. No MUI. No hardcoded content. Just types, utilities, and samples.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the design rationale behind this package and the `sections-api` pattern it supports.

---

## Status

**In active development — `v0.1.0`**

Will be used in production by the Alex Rebula portfolio website when published. First public npm release planned after the portfolio ships.

---

## What's in the box

| Module      | Contents                                                                                                          |
| ----------- | ----------------------------------------------------------------------------------------------------------------- |
| `types`     | All shared TypeScript interfaces — `BaseSectionProps`, `HomeItemProps`, `TestimonialItemProps`, `FAQItemProps`, `ServicePackageProps`, `DashboardPreviewContentConfig`, and more |
| `utils`     | Pure, stateless helpers — `createDataFactory`, `mapDataArray`, `filterDataArray`, `createFaqToolButtons`         |
| `samples`   | Generic placeholder data for tests and Storybook — `HOME_ITEMS_SAMPLE`, `HOME_TESTIMONIALS_SAMPLE`, `HOME_FAQS_SAMPLE`, and more |

Everything is exported from the root:

```ts
import type { HomeItemProps, FAQItemProps, ServicePackageProps } from '@alexrebula/giselle-sections-data';
import { createDataFactory, mapDataArray, HOME_ITEMS_SAMPLE } from '@alexrebula/giselle-sections-data';
```

---

## Installation (not yet vailable, but planned upon portfolio publish)

```bash
npm install @alexrebula/giselle-sections-data
```

**Peer dependency:** React `^18.0.0 || ^19.0.0` is required. The types use `ReactNode` for rich content fields.

---

## Usage

The examples below show how to use this package **in your consuming app's data layer** — typically inside your own `sections-api/`, `sections-data/` or equivalent directory. The hardcoded values in factory functions are your real content; the package only provides the type contracts.

### Typing your data factories

In your app, write a factory function that returns typed props. The types come from this package; the content is yours:

```ts
// your-app/src/sections-api/home/data.ts
import type { HomeItemProps } from '@alexrebula/giselle-sections-data';

export const createFeatureItems = (): HomeItemProps[] => [
  {
    id: 'react',
    icon: 'logos:react',
    title: 'React & Next.js',
    description: 'Your real description here.',
  },
];
```

### Building a typed section factory

```ts
// your-app/src/sections-api/home/data.ts
import type { BaseSectionProps, FAQItemProps } from '@alexrebula/giselle-sections-data';

type FaqSectionData = BaseSectionProps & { faqs: FAQItemProps[] };

export const createFaqSectionData = (): FaqSectionData => ({
  title: 'Your Section Title',
  faqs: [
    { question: 'Your question', answer: 'Your answer.' },
  ],
});
```

### Using utilities

```ts
import { createDataFactory, mapDataArray } from '@alexrebula/giselle-sections-data';
import type { HomeItemProps } from '@alexrebula/giselle-sections-data';

const base: HomeItemProps = { id: 'base', icon: 'solar:star-bold', title: 'Base Item' };
const item = createDataFactory(base, { title: 'Custom Title' });

const labels = mapDataArray(items, (item) => item.title);
```

### Using samples in tests

```ts
import { HOME_ITEMS_SAMPLE, HOME_TESTIMONIALS_SAMPLE } from '@alexrebula/giselle-sections-data';

it('renders all items', () => {
  render(<MySection items={HOME_ITEMS_SAMPLE} />);
  expect(screen.getAllByRole('article')).toHaveLength(HOME_ITEMS_SAMPLE.length);
});
```

---

## Contributing / working on this package locally

If you are developing this package alongside a consuming app (before publishing to npm), reference it from disk using the `file:` protocol:

```json
// your-app/package.json
"@alexrebula/giselle-sections-data": "file:../path/to/giselle-sections-data"
```

Run `npm install` in the consuming app once to create the symlink in `node_modules/`. After that, TypeScript changes in `src/` are picked up immediately — no rebuild needed. Re-run `npm install` only if you change this package's `package.json` (e.g. add a new export entry).

---

## Build

```bash
npm run build       # tsup → dist/index.js (ESM) + dist/index.cjs (CJS) + dist/index.d.ts
npm run typecheck   # tsc --noEmit
npm run test        # vitest run
```

Build output:

```
ESM  dist/index.js      ~2.2 KB
CJS  dist/index.cjs     ~3.7 KB
DTS  dist/index.d.ts    ~9.4 KB
```

---

## Design decisions

- **React-first.** Types use `ReactNode` for rich content fields. React is declared as a peer dependency. No JSX in the package — just types compatible with React props.
- **No MUI.** The consuming app extends these types with `sx: SxProps<Theme>` where needed. MUI stays an app-level concern.
- **No personal content.** Domain data factories (`home/data.tsx`, `about/data.ts`, etc.) contain real personal content and live in the consuming app only.
- **Single extraction boundary.** If someone else dropped this package into their project, none of my personal data would appear. Types are shapes; utils are pure functions; samples use placeholder text.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full rationale.
Tools for easy migration to real backend data sources

```bash
npm install
npm run typecheck
npm run build
npm test
```

### License
MIT

Made with ❤️ by Alex Rebula