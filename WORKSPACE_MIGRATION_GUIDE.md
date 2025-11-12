# Workspace Migration Guide

This document explains the workspace packages and migration tools that have been added to the AltruisticXAI Ecosystem Hub repository.

## What Changed?

This PR adds:
1. **packages/lib** - Shared TypeScript types and API client
2. **packages/ui** - Package that re-exports UI components
3. **CI/CD workflows** - Automated build, test, and deployment
4. **Migration script** - Tool to update imports from `@/components/ui` to `@repo/ui`
5. **Configuration files** - SEO, PWA, and development tools

## New Workspace Packages

### @repo/lib

Located in `packages/lib/`, this package provides:
- Common TypeScript types (`ApiResponse`, `User`, `PagedResult`, etc.)
- An `ApiClient` class for HTTP requests
- Reusable utilities for API communication

**Usage:**
```typescript
import { ApiClient, User, ApiResponse } from "@repo/lib";

const client = new ApiClient({ baseUrl: "https://api.example.com" });
const response: ApiResponse<User> = await client.get("/users/123");
```

### @repo/ui

Located in `packages/ui/`, this package:
- Re-exports all UI components from `src/components/ui/`
- Provides a clean import path for UI components
- Uses source files directly (no build step needed)

**Usage:**
```typescript
// Old way (still works)
import { Button, Card } from "@/components/ui/button";

// New way (after migration)
import { Button, Card } from "@repo/ui/button";
```

## Import Migration

### Why Migrate?

Migrating imports from `@/components/ui/*` to `@repo/ui/*` provides:
- ✅ Cleaner, more semantic import paths
- ✅ Better workspace organization
- ✅ Easier to share UI components across multiple apps (if needed in the future)
- ✅ Consistent with workspace package naming conventions

### How to Migrate

**Option 1: Use the helper script (recommended)**

```bash
bash scripts/run-apply-changes.sh
```

This interactive script will:
1. Show you a preview of all changes
2. Ask for confirmation before applying
3. Run build to verify changes work
4. Commit and push to a branch

**Option 2: Manual migration**

```bash
# Preview changes
node scripts/replace-imports.js --dry-run

# Apply changes
node scripts/replace-imports.js

# Verify build works
npm run build

# Commit changes
git add .
git commit -m "refactor: migrate imports from @/components/ui to @repo/ui"
```

### What the Script Does

The migration script (`scripts/replace-imports.js`):
- Searches all TypeScript/JavaScript files in `src/`
- Replaces `@/components/ui/*` with `@repo/ui/*`
- Preserves subpaths (e.g., `button`, `card`, etc.)
- Can be run multiple times safely (idempotent)
- Supports dry-run mode to preview changes

**Examples:**

| Before | After |
|--------|-------|
| `import { Button } from "@/components/ui/button"` | `import { Button } from "@repo/ui/button"` |
| `import { Card } from "@/components/ui/card"` | `import { Card } from "@repo/ui/card"` |
| `import * as ui from "@/components/ui"` | `import * as ui from "@repo/ui"` |

## CI/CD Workflows

### CI Workflow (`.github/workflows/ci.yml`)

Runs on every push and pull request:
- ✅ Install dependencies
- ✅ Lint code
- ✅ Run tests
- ✅ Build project

### Deploy Workflow (`.github/workflows/deploy-pages.yml`)

Runs on every push to `main`:
- ✅ Build project
- ✅ Deploy to GitHub Pages

## Development Commands

### Build Packages
```bash
npm run build:packages
```

### Build Entire Project
```bash
npm run build
```

### Development Server
```bash
npm run dev
```

### Lint
```bash
npm run lint
```

### Test
```bash
npm run test
```

## Configuration Files Added

- **lighthouserc.js** - Lighthouse CI configuration for performance testing
- **public/robots.txt** - SEO optimization for search engines
- **public/sitemap.xml** - Site map for better indexing
- **CONTRIBUTING.md** - Contribution guidelines

## Path Mappings

The following path aliases are configured:

| Alias | Resolves To | Where Configured |
|-------|-------------|------------------|
| `@/*` | `./src/*` | tsconfig.json, vite.config.ts |
| `@repo/lib` | `./packages/lib/src` | tsconfig.json, vite.config.ts |
| `@repo/ui` | `./packages/ui/src` | tsconfig.json, vite.config.ts |
| `@repo/ui/*` | `./src/components/ui/*` | tsconfig.json |

## Troubleshooting

### Build fails after migration

1. Make sure all imports were migrated:
   ```bash
   grep -r "@/components/ui" src/
   ```

2. Rebuild packages:
   ```bash
   npm run build:packages
   ```

3. Clear cache and rebuild:
   ```bash
   rm -rf node_modules dist
   npm install
   npm run build
   ```

### Import not found errors

Check that the component exists in `src/components/ui/` and is exported in `packages/ui/src/index.ts`.

### TypeScript errors

Run TypeScript compiler to check for issues:
```bash
npx tsc --noEmit
```

## Next Steps

1. **Review the changes** in this PR
2. **Test the build** locally with `npm run build`
3. **Optionally apply import migration** using the script
4. **Merge** when CI is green and everything works

## Questions?

If you have questions or run into issues:
1. Check this guide
2. Review the PR description in `PR_BODY.md`
3. Open an issue on GitHub

---

**Note:** The import migration is optional and can be done in this PR or a follow-up PR. All existing imports will continue to work.
