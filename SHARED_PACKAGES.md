# Shared Packages Migration

## Completed Work

**Structure**:

├── README.md

**Structure**:
   
        ├── i
```
**Shared Type
- `Prove
- `ProjectMetric` - Project measurement data
- `GrantOpport
    │   ├── index.ts          # Type exports
    │   ├── schema.ts         # Core domain types
    │   └── api.ts            # API request/response types
    └── api/
        ├── index.ts          # API exports
        └── client.ts         # API client implementation
```

**Shared Types** (`@repo/lib/types`):
- `SourceSystem` - Data source enum
- `Provenance` - Data lineage tracking
- `LocationInfo` - Geographic information
- `ProjectMetric` - Project measurement data
- `Project` - Core project entity
- `GrantOpportunity` - Grant data structure
- `PolicyMemo` - Policy document structure
  - `@repo/lib` → `./packages/lib/src/in
- `OpenDataset` - Open dataset metadata
  - `@repo/lib` → `./packages/lib/


- `APIClient` class with methods for:
  - Grants.gov search
  - USASpending.gov search
import { apiClient } 
  - Project management
const response = awa
  - Crawler control
- Singleton `apiClient` instance

**Configuration Updates**:
- Updated `tsconfig.json` with path aliases:
  - `@repo/lib` → `./packages/lib/src/index.ts`
  - `@repo/lib/*` → `./packages/lib/src/*`
- Updated `vite.config.ts` with alias:
  - `@repo/lib` → `./packages/lib/src`

### 2. Usage Examples

```typescript
- Creating pack
import type { Project, GrantOpportunity, APIResponse } from '@repo/lib/types'

// Import API client


3. **Maintainability
const response = await apiClient.searchGrantsGov({








































