# Technical Architecture Documentation

## System Overview

The AltruisticXAI platform is a single-page application (SPA) built with React and TypeScript, featuring real-time API integration, AI-powered analysis, and persistent local storage. The architecture emphasizes modularity, type safety, and user experience.

## Core Technologies

### Frontend Framework
- **React 19**: Latest stable version with hooks-based architecture
- **TypeScript**: Full type coverage for compile-time safety
- **React Router DOM**: Client-side routing with 5 main routes
- **Vite**: Fast build tool and dev server

### UI & Styling
- **Tailwind CSS v4**: Utility-first styling with custom theme
- **shadcn/ui**: Radix UI-based component library
- **Phosphor Icons**: Comprehensive icon set with multiple weights
- **Framer Motion**: Animation library (available but used sparingly)

### State Management
- **React Hooks**: Built-in state management (useState, useEffect)
- **Custom Hooks**: Reusable logic encapsulation (useDiscoveredProjects)
- **Spark KV Store**: Persistent key-value storage (browser-based)

### External APIs
- **GitHub REST API**: Repository search and metadata retrieval
- **Spark LLM API**: AI-powered project analysis (GPT-4o-mini)

## Architecture Layers

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
│  (Pages, Components, UI Components)     │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│          Business Logic Layer           │
│     (Custom Hooks, Data Models)         │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Integration Layer               │
│  (API Clients, AI Analyzer, Storage)    │
└─────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn base components (40+ components)
│   ├── DiscoveredProjectCard.tsx
│   ├── ImpactTable.tsx
│   ├── LayoutShell.tsx
│   ├── MetricPill.tsx
│   └── SectionCard.tsx
├── data/                # Static data models
│   ├── impactEvents.ts
│   ├── policyMemos.ts
│   └── projects.ts
├── hooks/               # Custom React hooks
│   ├── use-discovered-projects.ts
│   └── use-mobile.ts
├── lib/                 # Utility libraries
│   ├── ai-analyzer.ts   # AI-powered analysis
│   ├── github-api.ts    # GitHub API client
│   └── utils.ts         # Helper functions
├── pages/               # Route components
│   ├── HomePage.tsx
│   ├── LabsPage.tsx
│   ├── ConsultingPage.tsx
│   ├── PolicyPage.tsx
│   └── ImpactLedgerPage.tsx
├── App.tsx              # Root component with routing
├── index.css            # Custom styles & theme
└── main.tsx             # Application entry point
```

## Key Components

### Custom Hooks

#### useDiscoveredProjects
**Purpose**: Manages the lifecycle of AI-discovered projects

**State**:
- `projects`: Array of DiscoveredProject objects
- `isLoading`: Boolean loading state
- `error`: Error message string or null

**Methods**:
- `discoverNewProjects(topic?, count?)`: Fetches and analyzes new projects
- `removeProject(repoId)`: Removes a single project
- `clearAll()`: Removes all projects

**Storage**: Uses Spark KV store with key `discovered-projects`

**Flow**:
1. Search GitHub for repositories by topic
2. Filter out already-discovered projects
3. Analyze each new project with AI
4. Filter projects with relevance score ≥60%
5. Persist to storage (max 50 projects)
6. Return newly discovered projects

### API Integration

#### github-api.ts
**Functions**:
- `searchEthicalAIProjects(topic?, perPage?)`: Searches GitHub repositories
  - Uses GitHub Search API
  - Filters: stars>50, not archived, specific topics
  - Returns: Array of GitHubRepo objects

- `getRepoDetails(owner, repo)`: Fetches single repository details
  - Uses GitHub Repos API
  - Returns: Full GitHubRepo object

**Rate Limits**: 60 requests/hour (unauthenticated)

**Error Handling**: Throws errors with HTTP status codes

#### ai-analyzer.ts
**Functions**:
- `analyzeProjectRelevance(repo)`: AI-powered project analysis
  - Uses Spark LLM API (GPT-4o-mini)
  - JSON mode enabled
  - Returns: ProjectAnalysis object with:
    - relevanceScore (0-100)
    - category (explainability|privacy|fairness|sustainability|general-ethics)
    - potentialUseCase (string)
    - alignmentReason (string)
    - recommendedSector (Healthcare|Education|Government|Energy|General)

**Fallback**: Returns default 50% score on AI failure

**Prompt Engineering**: Structured prompt with clear JSON schema

### Data Models

#### Static Data
Located in `src/data/`, these TypeScript files export typed arrays:

**projects.ts**: Internal Labs and Consulting projects
- Type: `Project[]`
- Fields: id, title, description, sector, techStack, origin, status, client, tags, metrics

**impactEvents.ts**: Timeline of milestones
- Type: `ImpactEvent[]`
- Fields: id, date, type, title, description, references, metrics
- Sorted: Newest first

**policyMemos.ts**: Policy initiatives
- Type: `PolicyMemo[]`
- Fields: id, title, status, jurisdiction, relatedProjects, summary, datePublished

#### Dynamic Data
Stored in Spark KV store:

**discovered-projects**: Array of DiscoveredProject objects
- Structure: { repo: GitHubRepo, analysis: ProjectAnalysis, discoveredAt: ISO string }
- Max size: 50 projects
- Persistence: Browser local storage via Spark KV

## State Management Strategy

### Local State (useState)
Used for:
- UI state (selected topic, loading indicators)
- Form inputs
- Temporary calculations
- Component-specific state

### Persistent State (useKV)
Used for:
- Discovered projects collection
- User preferences (if implemented)
- Any data that should survive page refresh

### Derivable State
Calculated from existing state:
- Filtered project lists
- Categorized events
- Statistics and counts

## Routing Architecture

**Router**: BrowserRouter (HTML5 History API)

**Routes**:
- `/` → HomePage
- `/labs` → LabsPage
- `/consulting` → ConsultingPage
- `/policy` → PolicyPage
- `/impact-ledger` → ImpactLedgerPage

**Navigation**: 
- Header with persistent navigation bar
- Active route highlighting
- React Router Link components (client-side navigation)

## Performance Optimizations

### Code Splitting
- React.lazy (if needed for future large components)
- Route-based splitting via Vite

### API Optimization
- Deduplication: Checks for existing projects before analysis
- Batching: Analyzes up to 5 projects per request
- Caching: Stores all discovered projects locally

### Rendering Optimization
- Key props on all list items
- Conditional rendering for large lists
- Memoization opportunities (if needed)

### Asset Optimization
- Tailwind purges unused CSS
- Vite optimizes bundle size
- SVG icons loaded as React components

## Error Handling

### Levels
1. **API Errors**: Caught in async functions, set error state
2. **AI Failures**: Fallback to default values, log to console
3. **React Errors**: ErrorBoundary wraps entire app

### User Feedback
- Toast notifications for success/info
- Alert components for errors
- Loading states for async operations
- Empty states for no data

## Security Considerations

### XSS Prevention
- React escapes all rendered content by default
- No dangerouslySetInnerHTML usage
- All external links have rel="noopener noreferrer"

### API Security
- GitHub API: Read-only public data access
- Spark LLM: Sandboxed environment
- No sensitive data storage

### Data Privacy
- All data stored locally in browser
- No external analytics or tracking
- No personal information collected

## Testing Strategy (Future)

### Unit Tests
- Custom hooks (useDiscoveredProjects)
- Utility functions (ai-analyzer, github-api)
- Component logic

### Integration Tests
- API integration flows
- State management
- Routing

### E2E Tests
- User flows (discover → analyze → persist)
- Cross-page navigation
- Error scenarios

## Deployment

### Build Process
```bash
npm run build
```
- Outputs to `dist/`
- Optimized for production
- Source maps for debugging

### Environment Variables
None currently required (APIs work without auth)

Future considerations:
- `GITHUB_TOKEN`: For authenticated API access
- Feature flags for A/B testing

## Future Architecture Improvements

### Scalability
- React Query for server state management
- Virtual scrolling for large project lists
- Web Workers for heavy AI computations

### Features
- Service Worker for offline support
- IndexedDB for larger storage capacity
- WebSocket for real-time updates

### Code Quality
- Comprehensive test coverage
- Performance monitoring
- Error tracking integration
- Bundle size analysis

## Development Workflow

### Local Development
```bash
npm install
npm run dev
```

### Type Checking
```bash
npx tsc --noEmit
```

### Linting
Automatic via tsgo and eslint

### Adding New Features
1. Define types in appropriate module
2. Implement business logic in lib/ or hooks/
3. Create/update components
4. Update routing if needed
5. Update documentation

## API Reference

### Spark KV API
```typescript
// Get data
const data = await window.spark.kv.get<Type>('key')

// Set data
await window.spark.kv.set('key', value)

// Delete data
await window.spark.kv.delete('key')

// List keys
const keys = await window.spark.kv.keys()
```

### Spark LLM API
```typescript
// Create prompt (string only, not template literal)
const prompt = `Your prompt text here`

// Call LLM
const result = await window.spark.llm(prompt, 'gpt-4o-mini', jsonMode)
```

## Troubleshooting

### Build Issues
- Clear node_modules and reinstall
- Check TypeScript errors with `npx tsc --noEmit`
- Verify all imports use correct paths

### Runtime Issues
- Check browser console for errors
- Verify API rate limits not exceeded
- Clear local storage if state corrupted

### Type Issues
- Ensure all external data has proper type guards
- Use TypeScript strict mode
- Validate API responses before use
