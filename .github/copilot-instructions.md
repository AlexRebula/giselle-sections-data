# @alexrebula/giselle-sections-sdk — Copilot Instructions

This is a **public, MIT-licensed** TypeScript SDK package.
It is the framework-agnostic data layer of the sections-api pattern.

## ⚠️ Copyright rule — read this first

This package is MIT-licensed and public. It must contain **zero code derived from any
proprietary theme or kit** — including the Minimals MUI kit used in the sibling
`alexrebula` portfolio project.

**Hard rules — non-negotiable:**

1. **No Minimals code.** The following identifiers must never appear in this package:
   `varAlpha`, `varFade`, `varBlur`, `customShadows`, `_mock`, or any other utility
   that originated in the Minimals theme. If similar functionality is needed, write it
   from scratch independently.

2. **No imports from the `alexrebula` portfolio.** This package must not import from
   `alexrebula/src/` or any path inside that private repo.

3. **No proprietary dependencies.** Only pure TypeScript and `react` types (for `ReactNode`)
   are permitted. No UI frameworks, no theme packages, no commercial libraries.

## What this package is

A provider-agnostic, typed data SDK for React portfolio and product sites.
No JSX. No MUI. No personal content. Just types, builders, utilities, and samples.

- `src/types/` — shared TypeScript interfaces (`BaseSectionProps`, `HomeItemProps`, etc.)
- `src/utils/` — pure, stateless helpers (`createDataFactory`, `mapDataArray`, etc.)
- `src/samples/` — generic placeholder data for tests and Storybook (safe to publish)

## Stack

- TypeScript 5.x (strict, no `any`)
- `react` (types only, for `ReactNode` — not a runtime dependency)
- tsup for building (ESM + CJS)
- No runtime UI framework dependency — consumers bring their own

## Session bootstrap: where Copilot should look first

At the start of every new Copilot session in this package, read these files:

| File | Purpose |
|------|---------|
| [`ARCHITECTURE.md`](../ARCHITECTURE.md) | Design rationale: the sections-api pattern, why this is open-source, provider model, migration path |
| [`IMPLEMENTATION_PLAN.md`](../IMPLEMENTATION_PLAN.md) | Per-phase task checklist with `[x]` / `[ ]` status |

### Current status

- **Phase 0** (package skeleton): mostly done. Still open: `vitest.config.ts` explicit setup, smoke test, GitHub Actions CI, `.npmignore`.
- **Phase 1** (types, utils, samples): active. Core types and builders shipped. Open: additional `BaseSectionProps` variants, generic builder utilities, sample data.
- **Phase 2** (async provider interface): not started.

### What belongs in this package

- Shared TypeScript interfaces that any sections-api consumer would need (`BaseSectionProps`, `SectionItemBase`, etc.)
- Pure utility helpers (`createDataFactory`, `mapDataArray`, `pickFields`, etc.) — no side effects, no JSX
- Generic sample/placeholder data safe to publish (no personal content)
- **NOT** personal content (names, images, specific copy from `alexrebula`)
- **NOT** UI components, MUI wrappers, or any CSS

### What Copilot should help build

- New shared type interfaces following strict TypeScript conventions
- Pure utility functions with Vitest unit tests
- Generic sample data objects for each section type
- `IMPLEMENTATION_PLAN.md` updates when tasks are completed
