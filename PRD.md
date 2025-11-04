# AltruisticXAI - Three-Arm Ecosystem Platform

A comprehensive web application showcasing the self-reinforcing flywheel between Open Source Labs, Consulting Studio, and Policy Alliance - three arms working together to advance ethical AI in the public interest.

**Experience Qualities**:
1. **Transparent** - Every claim is backed by measurable evidence from the Impact Ledger, making the flywheel effect tangible and verifiable
2. **Professional** - Clean, institutional design that builds trust with university administrators, healthcare executives, and government decision-makers
3. **Purposeful** - Every element reinforces the three-arm model and demonstrates how innovation, implementation, and influence create sustainable change

**Complexity Level**: Light Application (multiple features with basic state)
- This is a multi-page informational application with client-side routing, structured data display, and clear navigation between distinct content sections. It presents complex organizational concepts through straightforward UI patterns without requiring user accounts or persistent state.

## Essential Features

### Multi-Page Navigation System
- **Functionality**: Client-side routing between five distinct pages (Home, Labs, Consulting, Policy, Impact Ledger)
- **Purpose**: Allows users to explore each arm independently while maintaining context of the unified ecosystem
- **Trigger**: User clicks navigation links in persistent header or section cards
- **Progression**: Click navigation item → Route change → Page transition → Content loads → Scroll to top
- **Success criteria**: All routes load instantly, active page is visually indicated, navigation is accessible on all pages

### Impact Ledger Timeline Display
- **Functionality**: Chronological table of all organizational milestones across three arms, filterable by event type
- **Purpose**: Demonstrates the flywheel in action by showing how Labs projects lead to consulting engagements that inform policy initiatives
- **Trigger**: User navigates to Impact Ledger page or filters events by type
- **Progression**: Load page → Display all events → User selects filter tab → Table updates with filtered events → Metrics remain visible
- **Success criteria**: Events are chronologically ordered (newest first), filtering is instant, relationships between events are clear through reference IDs

### Project Showcase with Categorization
- **Functionality**: Displays both open-source Labs projects and client consulting engagements with clear visual differentiation
- **Purpose**: Shows how proven open-source tools are adapted for paying clients, validating the Labs → Consulting pipeline
- **Trigger**: User navigates to Labs or Consulting pages
- **Progression**: Load page → Display project grid → User reads descriptions and metrics → Can identify origin (labs vs. client) and status
- **Success criteria**: Projects are visually distinct by origin, metrics are prominently displayed, technical details are accessible but not overwhelming

### Policy Memo Status Tracking
- **Functionality**: Lists policy recommendations with status badges (draft, published, implemented) and links to supporting projects
- **Purpose**: Demonstrates how consulting results translate into policy advocacy and eventually regulatory change
- **Trigger**: User navigates to Policy page
- **Progression**: Load page → Display policy memos → User sees status and jurisdiction → Identifies related projects that provided evidence
- **Success criteria**: Status is immediately visible, relationships to projects are clear, progression from draft to implemented is understandable

### Flywheel Explanation System
- **Functionality**: Visual and textual explanation of how the three arms reinforce each other on the homepage
- **Purpose**: Helps first-time visitors understand the organizational model and value proposition
- **Trigger**: User lands on homepage
- **Progression**: Read headline → Scroll to flywheel diagram → Understand cycle: Labs → Consulting → Policy → back to Labs → View latest impact examples
- **Success criteria**: Concept is clear within 30 seconds, users can articulate how revenue funds research and policy creates demand

## Edge Case Handling

- **Empty states**: If data arrays are empty (no projects, no impact events), display helpful placeholder messages instead of broken layouts
- **Mobile navigation**: Navigation collapses to icon-only labels on small screens while maintaining accessibility and clear active states
- **Long project descriptions**: Text is fully visible without truncation; cards expand vertically to accommodate content
- **Missing metrics**: Metric sections gracefully hide when no metrics are available for a project or event
- **Broken references**: If an impact event references a project ID that doesn't exist, fall back to displaying the raw ID rather than breaking

## Design Direction

The design should feel institutional yet innovative - professional enough for university administrators and government officials, but modern enough to signal technical competence. Think clean government portals mixed with contemporary SaaS landing pages. Generous whitespace, clear hierarchy, and understated animations that guide attention rather than distract. The interface should recede to let the content (measurable outcomes, real client names, specific policy citations) establish credibility.

## Color Selection

Triadic color scheme using cool, trustworthy tones that avoid the aggressive energy of startup branding while maintaining visual interest through complementary accent colors.

- **Primary Color** (Deep Blue-Purple): `oklch(0.55 0.18 260)` - Main brand color representing trust, intelligence, and technological sophistication. Used for Labs-related elements, primary CTAs, and the organizational logo.

- **Secondary Colors**:
  - Teal-Green: `oklch(0.75 0.12 180)` - Represents growth and sustainability, used for Consulting Studio elements and success metrics
  - Soft Purple: `oklch(0.65 0.15 300)` - Represents policy and governance, used for Policy Alliance elements and status indicators

- **Accent Color** (Soft Purple): `oklch(0.65 0.15 300)` - Used sparingly for important CTAs, active states, and to draw attention to key metrics or achievements

- **Foreground/Background Pairings**:
  - Background (Near White): `oklch(0.99 0.005 240)` → Foreground (Charcoal): `oklch(0.15 0.02 250)` - Ratio 14.8:1 ✓
  - Card (Pure White): `oklch(1 0 0)` → Card Foreground (Charcoal): `oklch(0.15 0.02 250)` - Ratio 16.2:1 ✓
  - Primary (Deep Blue-Purple): `oklch(0.55 0.18 260)` → Primary Foreground (Near White): `oklch(0.99 0.005 240)` - Ratio 6.8:1 ✓
  - Secondary (Teal-Green): `oklch(0.75 0.12 180)` → Secondary Foreground (Charcoal): `oklch(0.15 0.02 250)` - Ratio 9.2:1 ✓
  - Accent (Soft Purple): `oklch(0.65 0.15 300)` → Accent Foreground (Near White): `oklch(0.99 0.005 240)` - Ratio 5.4:1 ✓
  - Muted (Light Gray): `oklch(0.96 0.01 240)` → Muted Foreground (Medium Gray): `oklch(0.45 0.02 250)` - Ratio 7.1:1 ✓

## Font Selection

Typography should convey approachability and modernity while maintaining professional legibility. Choose fonts that work well for both technical documentation and executive summaries.

- **Typographic Hierarchy**:
  - H1 (Page Titles): Quicksand Bold/48px/tight letter spacing - Clear entry points for each section
  - H2 (Section Headers): Quicksand SemiBold/30px/normal letter spacing - Delineates major content blocks
  - H3 (Subsection Headers): Quicksand SemiBold/20px/normal letter spacing - Organizes card content
  - Body Text: Quicksand Regular/16px/1.6 line-height - Highly readable for longer descriptions
  - Small Text (Metadata): Quicksand Regular/14px/1.5 line-height - Dates, labels, supporting info
  - Monospace (Technical): JetBrains Mono Regular/14px - Tech stack tags, project IDs

## Animations

Animations should be minimal and purposeful, primarily serving to smooth transitions and guide attention. The institutional audience expects polish but not playfulness.

- **Purposeful Meaning**: Motion reinforces the flywheel concept - elements flow from one arm to another, status badges transition smoothly, page changes feel connected rather than abrupt
- **Hierarchy of Movement**: 
  - High priority: Page transitions and route changes (smooth, directional)
  - Medium priority: Hover states on cards and buttons (subtle scale/border changes)
  - Low priority: Metric pill appearances (no animation, instant display)

## Component Selection

- **Components**: 
  - Cards (shadcn) - Primary content container for projects, policy memos, and process steps; modified with thicker borders on hover to increase interactivity feedback
  - Badge (shadcn) - Status indicators, tech stack tags, metric pills; used extensively with variant customization
  - Button (shadcn) - CTAs and navigation links; minimal customization, rely on variant system
  - Table (shadcn) - Impact Ledger display; modified with enhanced row hover states and responsive column hiding
  - Tabs (shadcn) - Impact Ledger filtering; default styling maintained
  - Navigation (custom) - Built from scratch using React Router Link components with active state detection

- **Customizations**:
  - MetricPill - Custom component combining Badge with specific layout for label:value pairs
  - SectionCard - Reusable card pattern with icon, title, description, and CTA button
  - ImpactTable - Table wrapper with custom type-based styling and icon integration
  - LayoutShell - Full layout component with persistent header/footer navigation

- **States**:
  - Buttons: Default has solid background, hover shows subtle brightness increase, active shows slight scale down, focus has visible ring
  - Cards: Default has thin border, hover shows thicker primary-colored border and shadow, maintains consistent padding
  - Navigation links: Inactive shows muted text, hover shows background fill, active shows primary background with white text and filled icon
  - Badges: Status badges use color-coding (default for active/implemented, secondary for published, outline for draft)

- **Icon Selection**:
  - Flask (Labs) - Represents experimentation and scientific approach
  - Briefcase (Consulting) - Professional services and client work
  - Scroll (Policy) - Governance and regulatory frameworks
  - ChartLineUp (Impact) - Metrics and measurable outcomes
  - Rocket (Pilots/Deployments) - Launch events and active implementations
  - ArrowsClockwise (Flywheel) - Reinforcing cycle concept

- **Spacing**: Consistent spacing using Tailwind scale: 2px gaps in metric pills, 8px gaps in badge groups, 24px gaps in card grids, 64px gaps between major sections, 128px top/bottom page padding

- **Mobile**: 
  - Navigation switches to icon-only labels below 640px
  - Card grids collapse to single column below 768px
  - Table hides metrics column below 1024px (still visible in card view)
  - Page padding reduces from 32px to 16px on mobile
  - Typography scales down: H1 to 40px, H2 to 24px on mobile
