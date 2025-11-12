# @repo/lib

Shared TypeScript types and a small API client for use across apps in this monorepo.

## Usage

1. Build:
```bash
cd packages/lib
npm install
npm run build
```

2. Import:
```typescript
import { ApiClient, defaultClient, ApiResponse, User } from "@repo/lib";
```

## Notes

- This package is private to the repo and meant for local workspace consumption.
- Replace the default base URL via VITE_API_URL or NX_API_URL environment var.
