# Add @repo/lib, @repo/ui packages, CI workflows, and migrate imports

## Summary

This PR sets up a proper workspace structure with shared packages and adds CI/CD workflows for the AltruisticXAI Ecosystem Hub.

## Changes

### 🎁 New Workspace Packages

- **packages/lib**: Shared TypeScript types and a small ApiClient (private workspace package)
  - Provides common types: `ApiResponse`, `User`, `PagedResult`
  - Includes a reusable `ApiClient` class for HTTP requests
  
- **packages/ui**: Package that re-exports UI components from `src/components/ui/`
  - Enables cleaner imports via `@repo/ui/*` instead of `@/components/ui/*`
  - Maintains all existing UI components (accordion, button, card, etc.)

### 🔧 Configuration Updates

- **package.json**: Added `build:packages` script and workspace configuration
- **tsconfig.json**: Added path mappings for `@repo/ui` and `@repo/ui/*`
- **vite.config.ts**: Added Vite alias for `@repo/ui`

### 🔄 Import Migration

- **scripts/replace-imports.js**: Automated script to migrate imports from `@/components/ui/*` to `@repo/ui/*`
  - Safe to run with `--dry-run` flag to preview changes
  - Preserves subpaths correctly
  - Can be run multiple times idempotently

### 🚀 CI/CD Workflows

- **.github/workflows/ci.yml**: Build, lint, and test workflow for PRs and main branch
- **.github/workflows/deploy-pages.yml**: Automated deployment to GitHub Pages on main branch pushes

### 📄 Documentation & Configuration

- **CONTRIBUTING.md**: Comprehensive contribution guidelines
- **public/robots.txt**: SEO optimization for search engines
- **public/sitemap.xml**: Site map for better indexing
- **lighthouserc.js**: Lighthouse CI configuration for performance monitoring

### 🔨 Helper Script

- **scripts/run-apply-changes.sh**: Interactive script that:
  - Creates a branch
  - Installs dependencies
  - Builds packages
  - Shows import replacement preview
  - Optionally applies import replacements
  - Commits and pushes changes

## Validation Steps

To validate this PR locally:

```bash
# 1. Install dependencies
npm install

# 2. Build workspace packages
npm run build:packages

# 3. Preview import replacements (optional, imports not changed yet)
node scripts/replace-imports.js --dry-run

# 4. Build the main app
npm run build

# 5. Run linter
npm run lint
```

## Migration Path

The import replacement is **not automatically applied** in this PR to allow for review. To apply the migration:

```bash
# Preview changes
node scripts/replace-imports.js --dry-run

# Apply changes
node scripts/replace-imports.js

# Verify build still works
npm run build
```

This will replace ~61 import statements from `@/components/ui/*` to `@repo/ui/*` across the codebase.

## Benefits

✅ **Better code organization**: Shared code is now in workspace packages  
✅ **Cleaner imports**: Use `@repo/ui` instead of `@/components/ui`  
✅ **CI/CD pipeline**: Automated testing and deployment  
✅ **Type safety**: Shared types available across the workspace  
✅ **Reusable API client**: Common HTTP client for all apps  
✅ **SEO improvements**: robots.txt and sitemap.xml  
✅ **Documentation**: Clear contribution guidelines  

## Notes

- All existing UI components remain in `src/components/ui/` and are re-exported through `@repo/ui`
- No breaking changes to existing functionality
- The migration script is safe and can be run multiple times
- CI workflows use npm (not pnpm) to match the existing setup
- Import migration can be done in this PR or a follow-up PR

## Testing

- ✅ Packages build successfully
- ✅ Main app builds successfully
- ✅ All existing imports continue to work
- ✅ New `@repo/lib` and `@repo/ui` imports work correctly
- ✅ Import replacement script tested with dry-run

## Files Added/Modified

**Added:**
- `packages/lib/` (complete package)
- `packages/ui/` (complete package)
- `scripts/replace-imports.js`
- `scripts/run-apply-changes.sh`
- `.github/workflows/ci.yml`
- `.github/workflows/deploy-pages.yml`
- `lighthouserc.js`
- `CONTRIBUTING.md`
- `public/robots.txt`
- `public/sitemap.xml`

**Modified:**
- `package.json` (added build:packages script)
- `tsconfig.json` (added @repo/ui path mappings)
- `vite.config.ts` (added @repo/ui alias)

---

**⚠️ CI Requirement**: Do not merge until CI is green and local build/tests pass.
