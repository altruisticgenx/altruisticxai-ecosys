# Contributing

Thank you for contributing to AltruisticXAI Ecosystem Hub!

## Quick Start

### Install dependencies:
```bash
npm install
```

### Build packages:
```bash
npm run build:packages
```

### Build the app:
```bash
npm run build
```

### Development:
```bash
npm run dev
```

### Lint:
```bash
npm run lint
```

### Test:
```bash
npm run test
```

## Workspace Structure

This repository uses npm workspaces to manage shared packages:

### Shared packages:
- **packages/lib** — Shared TypeScript types & API client
- **packages/ui** — Shared UI components (re-exports from src/components/ui)

### Main app:
- **src/** — Main application source code

## Development Guidelines

### Making Changes

1. **Create feature branches** off main
2. **Make focused changes** - keep PRs small and scoped
3. **Test your changes** - ensure builds pass and functionality works
4. **Update documentation** - if you change APIs or add features

### Pull Requests

- Open PRs with clear descriptions
- Include screenshots for UI changes
- Ensure CI passes before requesting review
- Link related issues

### Import Conventions

The project now uses workspace packages for better code organization:

```typescript
// For shared types and API utilities
import { ApiClient, User, ApiResponse } from "@repo/lib";

// For UI components (instead of @/components/ui/*)
import { Button, Card } from "@repo/ui/button";
```

## Code Style

- Follow the existing code style in the repository
- Use TypeScript for type safety
- Write descriptive variable and function names
- Add comments for complex logic

## Testing

Currently testing infrastructure is minimal. When adding tests:
- Place tests near the code they test
- Use descriptive test names
- Test both success and error cases

## Questions?

Feel free to open an issue for questions or discussions about contributing.
