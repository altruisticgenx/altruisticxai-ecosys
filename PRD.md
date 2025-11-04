# Product Requirements Document: AltruisticXAI Data Integration Hub

Turn high-leverage federal grants and open datasets into strategic pipeline fuel for the Labs → Consulting → Policy ecosystem.

**Experience Qualities**:
1. **Systematic Discovery** - Users should feel like they're tapping into vast federal resources with precision, not drowning in bureaucratic complexity.
2. **AI-Augmented Intelligence** - The system amplifies human decision-making by surfacing alignment scores and strategic insights automatically.
3. **Action-Oriented** - Every piece of data discovered should lead to clear next steps, whether it's applying for a grant, integrating a dataset into Labs, or building policy evidence.

**Complexity Level**: Light Application (multiple features with basic state)
- This is a data discovery and curation tool that connects external APIs (Grants.gov, Data.gov) with AI analysis to help users build their strategic pipeline. It manages persistent state for saved grants and datasets but doesn't require complex workflows or account systems beyond basic data management.

## Essential Features

### Federal Grant Discovery
- **Functionality**: Search Grants.gov API by category (Energy & AI, Education & AI, Local Government, University Research) and surface relevant funding opportunities
- **Purpose**: Connect the ecosystem to federal funding that can fuel pilots, research, and policy initiatives
- **Trigger**: User selects a grant category and clicks "Discover Grants"
- **Progression**: Category selection → API search → GPT-4 batch analysis → Display ranked results with alignment scores → User can star/save/remove grants
- **Success criteria**: Users find at least 3-5 relevant grants per search with actionable AI insights about strategic fit

### AI Grant Alignment Analysis
- **Functionality**: GPT-4 analyzes each grant for alignment with the three ecosystem pillars (Labs, Consulting, Policy)
- **Purpose**: Save users hours of manual grant reading by providing strategic assessment automatically
- **Trigger**: Automatically runs after discovering new grants (when "Analyze with AI" is enabled)
- **Progression**: Grant metadata → GPT-4 strategic analysis → Alignment score (0-100) → Recommended pillar → Key strengths → Challenges → Actionable insights
- **Success criteria**: 80%+ of analyzed grants receive meaningful, accurate strategic recommendations that users find valuable

### Open Dataset Discovery
- **Functionality**: Search Data.gov catalog by category (Energy, AI Research, Education, Municipal, Climate) and surface relevant open datasets
- **Purpose**: Provide raw data that can feed Labs prototypes, Consulting pilots, and Policy evidence
- **Trigger**: User selects a dataset category and clicks "Discover Datasets"
- **Progression**: Category selection → Data.gov API search → Display results with metadata → User can star/save/remove datasets → Download links provided
- **Success criteria**: Users discover datasets with clear resource formats (CSV, JSON, API) and documentation

### Persistent Pipeline Management
- **Functionality**: Save discovered grants and datasets to persistent storage with star/favorite system
- **Purpose**: Build a curated pipeline of opportunities and data sources over time
- **Trigger**: User stars a grant or dataset, or the system auto-saves discoveries
- **Progression**: Discover item → Save to KV store → Display in persistent list → User can filter by starred, pillar, or alignment score
- **Success criteria**: Zero data loss between sessions; users can build a collection of 50-100+ items and easily filter/manage them

### Strategic Dashboard
- **Functionality**: Show aggregate metrics (total grants, total datasets, high-alignment count, ready-to-apply count)
- **Purpose**: Give users a bird's-eye view of their pipeline health at a glance
- **Trigger**: Page load; updates automatically as grants/datasets are added/removed
- **Progression**: Calculate totals from KV store → Display in stat cards → Update in real-time
- **Success criteria**: Metrics are accurate and update smoothly; users can quickly assess pipeline status

## Edge Case Handling

- **API Rate Limits**: Graceful error messages when Grants.gov or Data.gov rate limits are hit; suggest retry timing
- **No Results Found**: Clear empty states with suggestions to try different categories or check back later
- **AI Analysis Failures**: Fallback to showing raw grant data without analysis if GPT-4 call fails; user can still star/save
- **Duplicate Discoveries**: Filter out grants/datasets already in the user's collection before displaying new results
- **Stale Data**: Show "Discovered At" timestamp so users know how fresh their pipeline is; could add "Refresh" actions in future

## Design Direction

The design should feel **systematic, authoritative, and efficient** - like a Bloomberg terminal for public sector opportunities, not a casual consumer app. It should communicate seriousness and strategic value while remaining accessible to non-technical stakeholders.

Minimal interface with dense information display. Use cards for grant/dataset entries with clear visual hierarchy. Emphasize data and metrics over decorative elements.

## Color Selection

Triadic color scheme (three equally spaced colors on the color wheel) - Primary (warm orange), Secondary (cool purple), and Accent (bright green) - creates visual energy and helps differentiate the three ecosystem pillars while maintaining harmony.

- **Primary Color (oklch(0.65 0.30 45))**: Warm orange - represents Labs innovation and experimentation; used for Labs-recommended grants and primary CTAs
- **Secondary Colors (oklch(0.85 0.25 280))**: Cool purple - represents Consulting professionalism and revenue; used for Consulting-recommended items and secondary actions  
- **Accent Color (oklch(0.75 0.28 120))**: Bright green - represents Policy growth and systemic change; used for Policy-recommended items and success states
- **Foreground/Background Pairings**:
  - Background (oklch(0.98 0.002 0)): Near-white → Foreground (oklch(0.05 0.005 0)) Dark text - Ratio 19.2:1 ✓
  - Card (oklch(1.00 0 0)): Pure white → Card Foreground (oklch(0.05 0.005 0)) Dark text - Ratio 21:1 ✓
  - Primary (oklch(0.65 0.30 45)): Warm orange → Primary Foreground (oklch(0.05 0.005 0)) Dark text - Ratio 8.3:1 ✓
  - Secondary (oklch(0.85 0.25 280)): Light purple → Secondary Foreground (oklch(0.05 0.005 0)) Dark text - Ratio 12.1:1 ✓
  - Accent (oklch(0.75 0.28 120)): Bright green → Accent Foreground (oklch(0.05 0.005 0)) Dark text - Ratio 9.8:1 ✓
  - Muted (oklch(0.92 0.001 0)): Light gray → Muted Foreground (oklch(0.35 0.003 0)) Medium gray - Ratio 5.1:1 ✓

## Font Selection

Typography should convey **technical precision and institutional credibility** while remaining highly readable for dense information displays.

- **Typographic Hierarchy**:
  - H1 (Page Title): Oswald Bold/48px/tight letter spacing - Commands attention
  - H2 (Section Titles): Oswald SemiBold/32px/tight - Organizes major sections
  - H3 (Card Titles): Roboto Slab SemiBold/18px/normal - Readable, authoritative
  - Body Text: Roboto Slab Regular/14px/1.5 line-height - Highly legible for data
  - Data/Metrics: Space Mono Regular/24px/tabular - Technical precision for numbers
  - Small Text (metadata): Roboto Slab Regular/12px/1.4 - Compact but readable

## Animations

Contextual animations that **confirm actions and guide attention** without slowing down power users. The tool should feel responsive and instantaneous.

- **Purposeful Meaning**: Animations reinforce the "discovery → analysis → curation" flow. New grants/datasets should slide in smoothly to suggest arrival of new intelligence. Star/favorite actions should provide immediate haptic-like feedback.
- **Hierarchy of Movement**: 
  - Priority 1: Loading states and AI analysis progress (users need to know the system is working)
  - Priority 2: Card entry/exit animations (smooth transitions maintain spatial continuity)
  - Priority 3: Subtle hover states on interactive elements (guide without distraction)

## Component Selection

- **Components**: 
  - **Tabs** (shadcn) - Organize Grants vs Datasets cleanly
  - **Select** (shadcn) - Category choosers with clear options
  - **Card** (shadcn) - Grant and dataset display with dense information layout
  - **Badge** (shadcn) - Pillar recommendations, status indicators, tags
  - **Button** (shadcn) - Primary CTAs (Discover), secondary actions (Star, Remove)
  - **Alert** (shadcn) - Error messaging for API failures
  - **Skeleton** (potential) - Loading states during discovery
- **Customizations**: 
  - Custom GrantCard and DatasetCard components with tri-color pillar badges
  - Alignment score display with color-coded thresholds (80+ green, 60-79 yellow, <60 orange)
  - Stat cards with large metric display and secondary metadata
- **States**: 
  - Buttons: Default → Hover (slight lift) → Active (subtle press) → Disabled (reduced opacity)
  - Cards: Default → Hover (border color shift, shadow increase) → Selected/Starred (persistent highlight)
  - Loading: Spinner with stage text ("Searching...", "Analyzing with AI...")
- **Icon Selection**: 
  - Database (duotone) - Data Hub branding
  - Money (duotone) - Grants
  - Sparkle (fill) - AI features
  - Star (fill/regular toggle) - Favorites
  - ArrowSquareOut - External links
  - Trash - Remove actions
  - Download - Dataset downloads
- **Spacing**: 
  - Cards: 4 (1rem) padding, 4 gap in grids
  - Sections: 12 (3rem) vertical spacing
  - Stat metrics: 1 gap between label and number
- **Mobile**: 
  - Single column layouts for cards
  - Stack category selector above Discover button
  - Tabs remain horizontal with abbreviated labels
  - Reduce stat card grid from 4 columns to 2
  - External link buttons go full-width on mobile
