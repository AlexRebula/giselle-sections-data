# Giselle Sections Data

**Pure, type-safe data factories for section-based user interfaces.**

This package provides clean, reusable data factories that return fully typed props. No JSX. No presentation logic. Just pure data.

It is designed as a single source of truth for all sections and components, making UI code predictable, testable, and easy to maintain.

### Status
- **In active development**
- First public release planned in the coming months

### Features
- Fully typed data factories with TypeScript 5.9 (strict mode)
- Zero runtime dependencies
- Framework agnostic — works with React, Angular, Vue, or any TypeScript frontend
- Easy to test in isolation
- Built with future migration to a real database or API layer in mind

### Installation

```bash
npm install @alexrebula/giselle-sections-data
```

### Usage Example

```TypeScript
import { 
  createHomeHeroData, 
  createExpertiseAreasData, 
  createServicePackagesData 
} from '@alexrebula/giselle-sections-data';

const hero = createHomeHeroData();
const expertise = createExpertiseAreasData();
const services = createServicePackagesData();
```

### Vision

giselle-sections-data separates data from presentation.
This clean boundary makes components more reusable, easier to test, and simpler to evolve over time.
It is the foundation of the Giselle UI ecosystem and can be used independently in any project.

### Roadmap

Expand factory coverage with more complex section patterns
Add comprehensive examples and documentation
Support for additional frameworks (Angular and Vue planned)
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