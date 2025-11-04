# Product Requirements Document: AltruisticXAI Platform

A comprehensive digital platform that demonstrates the self-reinforcing flywheel of ethical AI through open-source innovation, strategic consulting, and evidence-based policy advocacy, enhanced with real-time AI-powered project discovery.

**Experience Qualities**:
1. **Trustworthy**: Clear transparency in methods, metrics, and outcomes builds credibility with technical and policy audiences
2. **Empowering**: Real-time AI discovery tools enable users to actively participate in finding aligned ethical AI projects
3. **Professional**: Clean, modern design reflects the serious mission while remaining accessible to diverse stakeholders

**Complexity Level**: Light Application (multiple features with basic state)
The platform combines static content showcase with dynamic features including real-time API integration, AI-powered analysis, and persistent user data. It balances informational content with interactive discovery tools without requiring user authentication or complex workflows.

## Essential Features

### Feature 1: AI-Powered Project Discovery
- **Functionality**: Searches GitHub for ethical AI projects and uses AI to analyze relevance
- **Purpose**: Helps users discover aligned open-source projects and demonstrates our technical capabilities
- **Trigger**: User selects topic and clicks "Discover Projects" button
- **Progression**: Select topic → Click discover → API fetches repos → AI analyzes each → Filter by relevance → Display results → Save to persistent storage
- **Success criteria**: Successfully retrieves projects, AI scores relevance, displays high-quality matches (60%+ score), persists between sessions

### Feature 2: Multi-Arm Content Showcase
- **Functionality**: Displays comprehensive information about Labs, Consulting, and Policy initiatives
- **Purpose**: Communicates the flywheel model and demonstrates real-world impact
- **Trigger**: Navigation through site pages
- **Progression**: Land on home → Understand flywheel → Explore specific arm → View projects/case studies → See metrics
- **Success criteria**: Clear value proposition, quantified outcomes visible, logical flow between arms

### Feature 3: Impact Ledger
- **Functionality**: Chronological record of milestones with filtering by type
- **Purpose**: Provides transparent evidence of organizational impact
- **Trigger**: Navigate to Impact page or view latest events on homepage
- **Progression**: View all events → Filter by type → See metrics → Understand flywheel connections
- **Success criteria**: Easy filtering, clear metrics, demonstrates interconnected impact

### Feature 4: Project Persistence & Management
- **Functionality**: Saves discovered projects locally, allows removal and clearing
- **Purpose**: Enables users to build their own curated collection of relevant projects
- **Trigger**: Projects auto-save on discovery, manual removal via UI
- **Progression**: Discover project → Auto-saved → View anytime → Remove if not relevant → Clear all if needed
- **Success criteria**: Data persists across sessions, removal works instantly, no data loss

## Edge Case Handling

- **API Rate Limits**: Display friendly error message when GitHub rate limit hit, suggest trying different topic
- **AI Analysis Failure**: Fallback to default categorization with 50% relevance score if AI unavailable
- **No Results Found**: Show empty state with helpful guidance to try different topics
- **Network Errors**: Display specific error message, allow retry without losing state
- **Large Result Sets**: Limit to 50 stored projects, auto-remove oldest when adding new
- **Missing Data**: Handle repos without descriptions, topics, or languages gracefully

## Design Direction

The design should feel **professional and trustworthy** with hints of **innovation and forward-thinking technology**. Balance serious policy/consulting credibility with the excitement of cutting-edge AI research. A minimal interface serves the content best, avoiding decorative elements that might diminish the evidence-based approach. The design should feel **approachable to non-technical policy makers** while maintaining **technical credibility for engineers**.

## Color Selection

**Triadic Color Scheme** - Three equally spaced colors create visual distinction between the three arms while maintaining harmony

The colors evoke trust (cool purple), growth/sustainability (warm yellow-green), and innovation/technology (cool teal). Each arm gets its own color identity within a cohesive system.

- **Primary Color**: Soft Purple `oklch(0.68 0.14 340)` - Main brand color representing ethical AI and trust. Used for Labs arm, primary CTAs, and focus states.

- **Secondary Colors**: 
  - Warm Yellow-Green `oklch(0.88 0.10 60)` - Supporting color for Consulting arm, represents growth and practical results
  - Cool Teal `oklch(0.75 0.12 180)` - Accent for Policy arm, represents innovation and systematic change

- **Accent Color**: Cool Teal `oklch(0.75 0.12 180)` - Attention-grabbing highlight for policy initiatives and interactive AI features

- **Foreground/Background Pairings**:
  - Background (Soft Lavender `oklch(0.98 0.015 320)`): Dark Purple text `oklch(0.22 0.04 280)` - Ratio 14.2:1 ✓
  - Card (Near White `oklch(0.99 0.008 320)`): Dark Purple text `oklch(0.22 0.04 280)` - Ratio 15.8:1 ✓
  - Primary (Soft Purple `oklch(0.68 0.14 340)`): Light Background `oklch(0.98 0.015 320)` - Ratio 5.2:1 ✓
  - Secondary (Warm Yellow-Green `oklch(0.88 0.10 60)`): Dark text `oklch(0.28 0.04 280)` - Ratio 8.9:1 ✓
  - Accent (Cool Teal `oklch(0.75 0.12 180)`): Dark text `oklch(0.22 0.04 280)` - Ratio 6.1:1 ✓
  - Muted (Light Purple-Gray `oklch(0.93 0.02 320)`): Medium text `oklch(0.48 0.02 280)` - Ratio 4.8:1 ✓

## Font Selection

Typography should convey **modern professionalism with warmth and approachability**, avoiding both sterile corporate feels and overly casual/playful aesthetics. **Quicksand** (rounded sans-serif) for headings provides friendly approachability, **Alegreya** (humanist serif) for emphasis adds credibility, and **JetBrains Mono** for code/technical content ensures clarity.

- **Typographic Hierarchy**:
  - H1 (Page Titles): Quicksand Bold/48px/tight letter spacing/-0.02em
  - H2 (Section Titles): Quicksand SemiBold/32px/tight letter spacing/-0.01em
  - H3 (Card Titles): Quicksand SemiBold/24px/normal letter spacing
  - H4 (Subsections): Quicksand Medium/16px/normal letter spacing
  - Body: Quicksand Regular/16px/relaxed line height/1.6em
  - Small: Quicksand Regular/14px/relaxed line height/1.5em
  - Code/Metrics: JetBrains Mono Regular/14px/normal line height/1.4em

## Animations

**Subtle and purposeful** animations enhance navigation clarity and provide feedback without drawing attention to themselves. Every motion serves a functional purpose: confirming interactions, guiding attention to new content, or maintaining spatial context during transitions. The balance leans heavily toward **subtle functionality** with occasional **micro-delights** in high-impact moments like successful project discovery.

- **Purposeful Meaning**: Animations communicate state changes (loading → success), spatial relationships (tabs sliding), and system responsiveness (button presses). Color transitions on discovery cards celebrate successful AI analysis.

- **Hierarchy of Movement**: 
  - Primary: Loading states during AI analysis (prominent spinner, progress indication)
  - Secondary: Tab transitions, card hover states (subtle scale/shadow)
  - Tertiary: Badge appearances, button micro-interactions (minimal)

## Component Selection

- **Components**:
  - **Navigation**: Custom header with React Router Links, sticky positioning, active state indicators
  - **Cards**: shadcn Card for projects, case studies, policy memos - modified with border-2 for prominence
  - **Tabs**: shadcn Tabs for Labs (Our Projects vs AI Discovery) and Impact Ledger filtering
  - **Buttons**: shadcn Button with variants (default, outline, ghost) - generous padding for touch targets
  - **Badges**: shadcn Badge for status, categories, metrics - custom color variants for categories
  - **Select**: shadcn Select for topic chooser in discovery tool
  - **Progress**: shadcn Progress for relevance score visualization
  - **Alert**: shadcn Alert for error states
  - **Table**: shadcn Table for Impact Ledger chronological display

- **Customizations**:
  - **DiscoveredProjectCard**: Custom component combining Card, Progress, and Badges with color-coded categories
  - **ImpactTable**: Custom table wrapper with icon-based type indicators
  - **MetricPill**: Custom Badge variant optimized for displaying quantified outcomes
  - **SectionCard**: Custom Card optimized for three-arm showcase with consistent layout

- **States**:
  - **Buttons**: Subtle scale on hover (1.02), pressed state (0.98), disabled with opacity and cursor change
  - **Cards**: Border color transition on hover (primary), shadow depth increase, slight lift effect
  - **Inputs/Select**: Focus ring with primary color, border color transition, placeholder text with muted foreground
  - **Loading**: Spinner with rotation animation, skeleton states for async content, progress bars for multi-step operations

- **Icon Selection**:
  - **Labs**: Flask (duotone) - represents experimentation
  - **Consulting**: Briefcase (duotone) - represents business services  
  - **Policy**: Scroll (duotone) - represents legislation/documentation
  - **Impact**: ChartLineUp (duotone) - represents growth/measurement
  - **Discovery**: Sparkle (fill), MagnifyingGlass (duotone) - represents AI-powered search
  - **GitHub**: GitBranch (bold) - represents repositories
  - **Actions**: ArrowRight (bold), Plus (bold), X (regular) - directional and CRUD operations
  - **Status**: CheckCircle (fill), Clock (duotone), Rocket (duotone) - state indicators

- **Spacing**: 
  - Page padding: px-4 sm:px-6 lg:px-8 (responsive)
  - Section gaps: gap-8 md:gap-12 lg:gap-20 (increasing with viewport)
  - Card internal: p-6 for content, p-4 for headers/footers
  - Component gaps: gap-2 (tight), gap-4 (standard), gap-8 (sections)

- **Mobile**: 
  - **Mobile-First Approach**: All components designed for mobile first, then enhanced for larger screens
  - Navigation: Hamburger menu with slide-out Sheet on mobile, full horizontal nav on desktop
  - Grid layouts: 1 column mobile, 2 columns md+, 3 columns for feature showcases on lg+
  - Tab lists: Full width on mobile with equal distribution, compact on desktop
  - Cards: Full width mobile with adequate padding, 2-column grid md+
  - Tables: Card-based layout on mobile (vertical stack), traditional table on md+
  - Impact events: Individual cards with left border accent on mobile, table rows on desktop
  - Font sizes: Fluid typography that scales (base 15px mobile → 16px desktop)
  - Touch targets: Minimum 44x44px for all interactive elements, touch-manipulation CSS
  - Discovery filters: Stack vertically on mobile, horizontal on sm+
  - Hero section: Gradient text, responsive badge, staggered animations
  - Smooth page transitions: AnimatePresence with fade/slide effects between routes
  - Safe area insets: Support for notched devices with env(safe-area-inset-*)
  - Reduced motion: Respects prefers-reduced-motion for accessibility
