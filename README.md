# AltruisticXAI - Ethical AI Platform

A comprehensive platform showcasing the three-arm approach to ethical AI: Open Source Labs, Consulting Studio, and Policy Alliance. Features real-time AI-powered project discovery and analysis of open-source ethical AI initiatives.

## Features

### Core Platform
- **Multi-page Application**: Home, Labs, Consulting, Policy, and Impact Ledger
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Real-time Data**: Integration with GitHub API and Grants.gov API
- **AI-Powered Analysis**: Automatic relevance scoring and categorization of discovered projects and grants
- **Live Federal Grant Discovery**: Connected to official Grants.gov API v2 for real-time federal funding opportunities

### Open Source Labs
- Showcase of internal open-source projects
- **AI Discovery Tool**: Real-time discovery of aligned open-source projects from GitHub
- AI-powered analysis of project relevance to ethical AI principles
- Categorization by topic: explainability, privacy, fairness, sustainability
- Relevance scoring and sector recommendations

### Consulting Studio
- Service tier breakdown (Discovery, Pilot, Scale)
- Client case studies with measurable impact metrics
- Integration with Labs projects
- **Grant Opportunity Alignment**: Match consulting capabilities with federal funding

### Policy Alliance
- Policy memos and initiatives
- Evidence-based recommendations
- Status tracking (Concept, In Discussion, Enacted)
- **Federal Grant Intelligence**: Track policy-relevant funding opportunities

### Impact Ledger
- Comprehensive tracking of milestones across all three arms
- Filterable events by type (Pilot, Policy, Publication, Partnership, Grant Award)
- Quantified metrics for each impact event

### Data Integration Hub
- **Real Grants.gov API**: Live federal grant opportunity search via `api.grants.gov/v2`
- **AI Analysis**: Automated alignment scoring for discovered grants
- **Multi-Source Crawler**: Unified ingestion from Grants.gov, GitHub, Data.gov, and more
- **Persistent Storage**: Save and track promising opportunities across sessions

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Routing**: React Router DOM
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS v4
- **Icons**: Phosphor Icons
- **State Management**: React hooks + Spark KV persistence
- **AI Integration**: Spark LLM API (GPT-4o-mini)
- **API Integrations**: 
  - GitHub REST API (open-source project discovery)
  - **Grants.gov API v2** (federal grant opportunities)
  - Data.gov CKAN API (federal datasets)
  - NSF Awards API (research funding)
  - USAspending.gov API (federal contracts & awards)

## AI Features

### Grant Discovery & Analysis
The platform integrates with the official **Grants.gov API v2** to:

1. **Search Federal Grants** in real-time across categories:
   - Energy & AI
   - Education Technology
   - Local Government
   - University Research
2. **Analyze each grant** using AI (GPT-4o) to determine:
   - Alignment score (0-100) with AltruisticXAI mission
   - Recommended pillar (Labs/Consulting/Policy)
   - Key strengths and challenges
   - Actionable insights and next steps
3. **Filter by priority agencies**: DOE, NSF, ED, ARPA-E, EDA, EERE, NETL
4. **Track opportunities** with starring, notes, and persistent storage

**API Endpoint**: `POST https://api.grants.gov/v2/opportunities/search`

See [GRANTS_GOV_INTEGRATION.md](./GRANTS_GOV_INTEGRATION.md) for full documentation.

### Project Discovery
The platform includes an intelligent project discovery system that:

1. **Searches GitHub** for repositories tagged with ethical AI topics
2. **Analyzes each project** using AI to determine:
   - Relevance score (0-100)
   - Category (explainability, privacy, fairness, sustainability, general-ethics)
   - Potential use case for institutions
   - Alignment with ethical AI principles
   - Recommended sector (Healthcare, Education, Government, Energy, General)
3. **Filters** projects with relevance scores ≥60%
4. **Persists** discoveries for future reference

### Topics Supported
- Explainable AI
- AI Ethics
- Fairness in ML
- Privacy-Preserving ML
- Federated Learning
- Differential Privacy
- Bias Detection
- AI Transparency
- Responsible AI
- Interpretable ML

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn components
│   ├── DiscoveredProjectCard.tsx
│   ├── ImpactTable.tsx
│   ├── LayoutShell.tsx
│   ├── MetricPill.tsx
│   └── SectionCard.tsx
├── data/
│   ├── impactEvents.ts
│   ├── policyMemos.ts
│   ├── projects.ts
│   └── schema.ts        # TypeScript interfaces for all data
├── data-ingest/
│   ├── apis/
│   │   ├── grantsGov.ts    # Real Grants.gov API integration
│   │   ├── usaspending.ts  # USAspending.gov API
│   │   ├── nsfAwards.ts    # NSF Awards API
│   │   └── dataGov.ts      # Data.gov CKAN API
│   ├── transform/
│   └── store/
├── hooks/
│   ├── use-grant-discovery.ts    # Grant discovery hook with AI
│   ├── use-discovered-projects.ts
│   └── use-mobile.ts
├── lib/
│   ├── ai-analyzer.ts        # AI-powered project analysis
│   ├── grant-analyzer.ts     # AI-powered grant analysis
│   ├── grants-api.ts         # Grants.gov API client
│   ├── github-api.ts         # GitHub API integration
│   └── utils.ts
├── pages/
│   ├── HomePage.tsx
│   ├── LabsPage.tsx
│   ├── ConsultingPage.tsx
│   ├── PolicyPage.tsx
│   ├── ImpactLedgerPage.tsx
│   └── DataIntegrationPage.tsx  # Grant & project discovery
├── App.tsx
└── index.css
```

## Key Improvements Made

### Architecture
1. **Modular API Layer**: Separated GitHub API calls into dedicated module
2. **AI Analysis System**: Created reusable AI analyzer for project evaluation
3. **Custom Hooks**: Built `useDiscoveredProjects` for state management
4. **Type Safety**: Full TypeScript coverage with proper interfaces

### Features
1. **Real-time Discovery**: GitHub API integration with AI-powered analysis
2. **Smart Filtering**: Only shows projects with 60%+ relevance scores
3. **Persistent Storage**: Discoveries saved using Spark KV store
4. **Error Handling**: Comprehensive error states and loading indicators
5. **Progressive Enhancement**: Graceful degradation when APIs fail

### UX/UI
1. **Tabbed Interface**: Clean separation of curated vs. discovered projects
2. **Visual Feedback**: Progress bars for relevance scores, loading states
3. **Color-coded Categories**: Easy visual identification of project types
4. **Responsive Cards**: Mobile-optimized project displays
5. **Empty States**: Helpful guidance when no projects are discovered

## Usage

### Discovering Projects
1. Navigate to the Labs page
2. Click the "AI Discovery" tab
3. Select a topic from the dropdown
4. Click "Discover Projects"
5. AI will analyze GitHub repositories and show relevant matches

### Managing Discoveries
- Remove individual projects with the X button
- Clear all discoveries with "Clear All"
- Discoveries persist between sessions

## Development

The application uses Vite for development and builds. All AI and API functionality works in the browser with no backend required.

### API Rate Limits
- GitHub API: 60 requests/hour (unauthenticated)
- Spark LLM: Based on user's quota

### Future Enhancements
- GitHub authentication for higher rate limits
- More sophisticated AI prompts for better analysis
- Export discovered projects
- Create custom project collections
- Integration with academic databases
- Policy recommendation generator using AI
