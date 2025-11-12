# AltruisticXAI - Ethical AI Platform

A comprehensive platform showcasing the three-arm approach to ethical AI: Open Source Labs, Consulting Studio, and Policy Alliance. Features real-time AI-powered project discovery and analysis of open-source ethical AI initiatives.

> 📚 **New to the project?** See [DOCS_INDEX.md](./DOCS_INDEX.md) for a complete guide to all documentation.  
> 🚀 **Want to deploy?** See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for quick setup steps.

## Features

### 2025+ Data Guarantee

**All federal data integrated into this platform is from 2025 onwards.** We use a three-layer validation system to ensure data freshness and accuracy:

1. **API-Level Filtering**: All ingest scripts filter at the source (`time_period: start_date = "2025-01-01"`, `postedDateFrom = "2025-01-01"`)
2. **Client-Side Validation**: Double-check every record's date field and skip pre-2025 data
3. **Automated Verification**: Daily GitHub Action runs validation script and generates reports

**UI Transparency**: The site clearly shows:
- 📅 Last crawl timestamp
- 📊 Data coverage range (e.g., "2025-01-01 → 2025-06-30")
- ✅ Validation badge ("2025+ Validated")

See [DATA_FRESHNESS_2025.md](./DATA_FRESHNESS_2025.md) and [DATA_VALIDATION_2025.md](./DATA_VALIDATION_2025.md) for complete details.

### Core Platform
- **Multi-page Application**: Home, Labs, Consulting, Policy, Impact Ledger, and **Ripples**
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Real-time Data**: Integration with GitHub API and Grants.gov API
- **AI-Powered Analysis**: Automatic relevance scoring and categorization of discovered projects and grants
- **Live Federal Grant Discovery**: Connected to official Grants.gov API v2 for real-time federal funding opportunities
- **2025+ Data Only**: All federal sources filtered to 2025 or newer with transparent validation

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

### Ripples: Truth Supply Chain

**What it is:** A training ground where you practice translating deceptive text into honest communication—and that practice becomes training data for AI.

**The core idea:** Instead of building an app first and hoping it matters, we're building the *workflows* first: how to spot deception, how to translate it into truth, and how to train AI from that process.

---

#### Here's what that page is really saying—plainly, and how the pieces fit.

**The page has 3 tabs:**

1. **Truth (Manifesto)** - The "why"
2. **People (The Foundry)** - Finding aligned collaborators
3. **Practice (The Intentool)** - The actual training game

---

### Tab 1: Truth (Manifesto)

**What you see:**
- Big headline: "Build the Truth, not the App"
- Two cards: "The Foundry" and "The Intentool"
- Button: "Begin the Search"

**What it means:**
This is the philosophy page. It's saying: most products launch hoping to find purpose later. Ripples does the opposite—we define our purpose (truth-seeking) first, then build the tools to support it.

The two cards preview the next two tabs.

---

### Tab 2: People (The Foundry)

**What you see:**
- A sentence completion exercise (mad-lib style):
  - "I believe that a healthy system prioritizes **[concept A]** over **[concept B]**."
  - "I work best when the goal is **[concept C]** rather than **[concept D]**."
- After filling it out, you click "Find Your People"
- A loading animation, then: "Resonance Detected" with a profile match

**What it means:**
This is a *values filter*. It's not asking "where did you go to school?" or "what's your job title?" It's asking: **what structural values do you hold?**

Examples of real answers:
- "evidence over consensus"
- "clarity rather than growth"
- "truth over comfort"

The idea: find collaborators who share deep structural alignment, not just surface-level skills.

**How the pieces fit:**
- You complete the binary filter
- The system (currently a demo, would eventually be real matching) finds others with similar answers
- You get a match profile showing someone who answered similarly
- This creates a "tight mesh" of value-aligned people before any product work begins

---

### Tab 3: Practice (The Intentool)

**What you see:**
- A header: "Translate Deception into Truth"
- A selection of 15 curated deceptive text examples (or click "⚡ Find Real-Time Example" to get fresh ones from the web)
- Three "honesty lenses" to choose from:
  - **⚖️ The Realist** - "Strip the emotion. State the fact."
  - **❤️ The Empath** - "Find the human need hidden in the noise."
  - **🧐 The Skeptic** - "Question the premise. Reveal the motive."
- A text area to write your honest translation
- Two buttons:
  - **"✨ Get Feedback"** - Opens a chat with an AI "Honesty Coach"
  - **"Verify Signal"** - Submits your translation to the dataset

**What it means:**
This is the **core training loop**. Here's the actual workflow:

1. **Pick deceptive text** (corporate jargon, political spin, influencer hype, etc.)
   - Example: *"We are currently right-sizing our resource allocation to optimize for future synergy."*

2. **Choose your lens** 
   - Let's say you pick **The Realist**

3. **Write your honest translation**
   - Example: *"We are laying off employees."*

4. **Click "Get Feedback"**
   - A chat interface opens on the right
   - The AI Honesty Coach (powered by Gemini) responds conversationally
   - Example: *"Good start—you cut through the jargon. Can you add specificity? How many employees? Which departments?"*

5. **Iterate through chat**
   - You refine: *"We are laying off 200 employees across engineering and sales."*
   - AI responds: *"Much better. That's falsifiable and specific. Consider adding: why now?"*
   - You add: *"We are laying off 200 employees across engineering and sales due to missed revenue targets in Q3."*

6. **Click "Verify Signal"**
   - Your final translation gets saved as a labeled data point:
     - **Input (Noise):** Corporate jargon about "right-sizing"
     - **Lens:** Realist
     - **Output (Signal):** Clear statement with specifics and context
   - This data point can now be used to train AI models to detect and translate deception

**How the pieces fit:**

```
You practice honesty → Create labeled data → Data trains AI → AI helps next person practice faster
```

This is the **flywheel**:
- Each person's practice improves the dataset
- Better dataset = better AI feedback
- Better AI feedback = faster learning for new users
- More users = more data = better AI

---

### The Real-Time Example Feature

**What "⚡ Find Real-Time Example" does:**
- Uses **Gemini 2.0 Flash + Google Search Grounding**
- Searches the live web for recent deceptive text (PR spin, corporate announcements, political statements)
- Extracts the source, author, and context
- Presents it as a new challenge for you to translate

**Why it matters:**
- Keeps the training data fresh and diverse
- Exposes you to real-world deception as it happens
- Prevents the dataset from becoming stale or academic

---

### The 15 Deception Categories (Curated Examples)

The page includes 15 real-world deception patterns:

1. **Corporate Jargon** - "Right-sizing our resource allocation"
2. **Political Spin (Non-Denial Denial)** - "We are not going to get into a tit-for-tat..."
3. **Influencer Hype** - "You guys need this. It literally cures everything."
4. **Corporate Spin (Non-Apology)** - "We are sorry if anyone was offended..."
5. **Political Spin (Cherry-Picking)** - "We saw a 20% increase in productivity [in the tech sector only]"
6. **LinkedIn 'Hustle' Post** - "They sleep 8 hours. I sleep 4. We are not the same."
7. **Vaguebooking / Guilt-Trip** - "It's amazing who your 'friends' are when you really need them..."
8. **Burying Bad News** - "Also in today's news, we are announcing minor adjustments..." (released Friday at 8 PM)
9. **Loaded Language** - "This radical, job-killing proposal will destroy..."
10. **PR 'Astroturfing'** - "As a real mom, I'm just so glad that @MegaCorp finally released..."
11. **Euphemism (HR)** - "We are offering you an opportunity to transition to a new role outside the company."
12. **Misleading Statistic** - "Our new snack has 50% LESS fat! (Compared to ice cream)"
13. **Tech 'Solutionism'** - "Our blockchain-powered, AI-driven platform will fundamentally disrupt..."
14. **Dark Pattern (Web)** - "[ ] No, I don't like saving money."
15. **Corporate 'Greenwashing'** - "Our 'Eco-Friendly' bottle is made with 10% recycled materials."

Each example shows:
- **Type** of deception
- **Content** (the deceptive text)
- **Author** (who said it)
- **Source** (where it came from)

---

### Summary: How It All Connects

**The Philosophy (Truth tab):**
- Build workflows before building apps
- Find aligned people before recruiting credentials
- Create training data from human practice

**The Filtering (People tab):**
- Use value-based questions to find structural alignment
- Create a "tight mesh" of collaborators who share deep values
- No resumes, just resonance

**The Training Loop (Practice tab):**
1. Pick deceptive text (curated or real-time)
2. Choose an honesty lens
3. Translate it into truth
4. Get AI feedback through chat
5. Iterate until it's falsifiable and clear
6. Submit to the dataset
7. Your work trains the AI for the next person

**The Result:**
- You build your "honesty muscle" through deliberate practice
- The AI learns what honest communication looks like
- The community grows around shared values, not metrics
- Small, honest actions compound into a "truth supply chain"

---

### Why "Ripples"?

Small actions create ripples. One honest translation might seem tiny, but:
- It becomes training data
- That data improves AI
- Better AI helps more people
- More people create more honest translations
- Those translations create cultural ripples

**The core bet:** If you make the honest path easier than the performative path, honest behavior becomes the default.

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

## Technical Deep Dive: Ripples Implementation

### Frontend Architecture

**Technology Stack:**
- **Framework**: React 19 + TypeScript
- **State Management**: React hooks (`useState`, `useRef`, `useEffect`)
- **Persistence**: Spark KV API for storing translations
- **AI Integration**: Gemini 2.0 Flash via Spark LLM API
- **Icons**: Lucide React
- **Styling**: Tailwind CSS v4

**Key Components:**

1. **RipplesPage.tsx** (Main Container)
   - Tab navigation system (Manifesto → Foundry → Intentool)
   - State management for active tab
   - Layout shell with fixed header

2. **ManifestoSection** (Truth Tab)
   - Typography-focused philosophy page
   - Two preview cards (Foundry, Intentool)
   - Navigation to next section

3. **FoundrySection** (People Tab)
   - Interactive mad-lib style form
   - Binary value completion
   - Simulated matching algorithm (demo)
   - Loading states and success animations

4. **IntentoolGame** (Practice Tab)
   - 15 curated deceptive text examples
   - 3 honesty lens selection
   - Text translation interface
   - AI chat feedback system
   - Real-time example fetcher (Gemini + Google Search)

### Data Structures

**DECEPTIVE_SOURCES** (Array of 15 objects):
```typescript
{
  id: number
  type: string           // e.g., "Corporate Jargon", "Political Spin"
  content: string        // The deceptive text
  author: string         // Who said it
  source: string         // Where it came from
  sourceURL: string      // Reference link
}
```

**HONESTY_PROFILES** (Array of 3 objects):
```typescript
{
  id: string            // 'p1', 'p2', 'p3'
  name: string          // 'The Realist', 'The Empath', 'The Skeptic'
  icon: string          // Emoji representation
  desc: string          // One-line description
}
```

### AI Integration Flow

**1. Real-Time Example Generation**
```
User clicks "⚡ Find Real-Time Example"
    ↓
Prompt sent to Gemini: "Find recent deceptive text from live web"
    ↓
Gemini uses Google Search Grounding
    ↓
Returns: content, source, author, context
    ↓
Displayed as new challenge
```

**2. Honesty Coach Chat**
```
User writes translation → Clicks "✨ Get Feedback"
    ↓
System builds prompt with:
  - Selected lens (Realist/Empath/Skeptic)
  - Original deceptive text
  - User's translation attempt
    ↓
Sent to Gemini with "Honesty Coach" persona
    ↓
AI responds conversationally in chat
    ↓
User iterates → Chat continues
    ↓
Final version → "Verify Signal" → Save to dataset
```

### Prompt Engineering

**Honesty Coach System Instruction:**
- Role: Conversational coach, not judge
- Goal: Help user make translation more specific, falsifiable, clear
- Style: Encouraging but rigorous
- Focus: Evidence, provenance, uncertainty acknowledgment

**Real-Time Example Finder:**
- Search query: Recent corporate announcements, political statements, marketing copy
- Filters: Published within last 30 days, shows clear deception patterns
- Output format: Structured JSON with source attribution

### The Training Data Pipeline

```
User completes translation
    ↓
Data point created:
  {
    input: "original deceptive text",
    lens: "Realist|Empath|Skeptic",
    output: "honest translation",
    iterations: [chat_messages],
    timestamp: ISO_DATE,
    userId: SPARK_USER_ID
  }
    ↓
Stored in Spark KV
    ↓
(Future) → Exported for model fine-tuning
```

### State Management

**Local State (useState):**
- `activeTab`: Current section ('manifesto' | 'foundry' | 'game')
- `selectedSource`: Which deceptive text is active
- `selectedLens`: Which honesty profile is chosen
- `userTranslation`: Text area content
- `chatMessages`: Conversation history with AI
- `isLoading`: Various loading states

**Persistent State (Spark KV):**
- `ripples-translations`: Array of verified translations
- `ripples-user-progress`: User stats and scores
- (Future) `ripples-leaderboard`: Community rankings

### Animation & UX Details

**Micro-interactions:**
- Tab switches with fade-in animations
- Lens selection with scale transforms
- Chat messages slide in from right
- Loading spinners for AI calls
- Success checkmarks on verified submissions

**Accessibility:**
- Keyboard navigation for tab switching
- Focus states on all interactive elements
- Screen reader labels for icon buttons
- Color contrast meets WCAG AA

### Performance Optimizations

1. **Lazy Loading**: Only active tab's component is rendered
2. **Debounced AI Calls**: Chat feedback waits for user to stop typing
3. **Cached Examples**: Deceptive sources loaded once on mount
4. **Memoized Calculations**: Lens descriptions don't re-render unnecessarily

### Future Enhancements

**Planned Features:**
- **Leaderboard**: Score = Evidence × Reproducibility ÷ Corrections
- **Community Voting**: Peer review of translations
- **Export Dataset**: Download your contributions as JSON
- **Advanced Search**: Filter by deception type, lens, date
- **Batch Mode**: Translate multiple examples in sequence
- **Tutorial**: Interactive onboarding flow

**Technical Improvements:**
- WebSocket for real-time collaboration
- IndexedDB for offline translation drafts
- Service Worker for PWA functionality
- Analytics dashboard for dataset quality metrics

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
│   ├── RipplesPage.tsx           # Truth supply chain & Intentool
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

### Using Ripples (Step-by-Step Walkthrough)

#### Getting Started
1. Navigate to `/ripples` in the application
2. You'll land on the **Truth** tab (the manifesto)

#### Step 1: Understanding the Philosophy (Truth Tab)
- Read the manifesto: "Build the Truth, not the App"
- Understand the two core concepts:
  - **The Foundry**: Finding value-aligned collaborators
  - **The Intentool**: The training game itself
- Click "Begin the Search" to proceed

#### Step 2: Finding Your People (People Tab)
1. You'll see a sentence completion exercise:
   ```
   "I believe that a healthy system prioritizes [A] over [B].
   I work best when the goal is [C] rather than [D]."
   ```

2. Fill in your values:
   - Example A: "evidence"
   - Example B: "consensus"
   - Example C: "clarity"
   - Example D: "growth"

3. Click "Find Your People"

4. See your match:
   - A simulated profile of someone with similar values appears
   - This demonstrates the filtering mechanism
   - In production, this would connect real collaborators

**What you're doing:** Broadcasting your structural values to find resonance with like-minded truth-seekers.

#### Step 3: The Training Game (Practice Tab)

**Phase A: Select Deceptive Text**

Option 1 - Use Curated Examples:
- Browse 15 real-world deception patterns
- Categories include: Corporate Jargon, Political Spin, Influencer Hype, etc.
- Click one to select it

Option 2 - Get Real-Time Example:
- Click "⚡ Find Real-Time Example"
- Gemini searches the live web for fresh deceptive text
- Returns: content, source, author, and context
- Automatically loaded as your challenge

**Phase B: Choose Your Honesty Lens**

Three lenses available:
1. **⚖️ The Realist** - "Strip the emotion. State the fact."
   - Best for: Corporate jargon, technical obfuscation
   - Goal: Maximum clarity and specificity

2. **❤️ The Empath** - "Find the human need hidden in the noise."
   - Best for: Influencer hype, emotional manipulation
   - Goal: Acknowledge feelings while adding context

3. **🧐 The Skeptic** - "Question the premise. Reveal the motive."
   - Best for: Political spin, cherry-picked statistics
   - Goal: Expose hidden assumptions and missing context

**Phase C: Write Your Translation**

1. Read the selected deceptive text carefully
2. Apply your chosen lens
3. Write an honest version in the text area
4. Focus on:
   - **Specificity**: Replace vague terms with concrete details
   - **Falsifiability**: Make claims testable
   - **Provenance**: Add context or sources
   - **Uncertainty**: Label what you don't know

**Example Translation Process:**

Original (Corporate Jargon):
> "We are currently right-sizing our resource allocation to optimize for future synergy."

Your first attempt (Realist lens):
> "We are laying off employees."

**Phase D: Get AI Feedback**

1. Click "✨ Get Feedback"
2. A chat interface opens on the right side
3. The AI Honesty Coach responds:
   > "Good start—you cut through the jargon. Can you add specificity? How many employees? Which departments?"

4. You respond in chat:
   > "I don't have those details from the original text."

5. AI replies:
   > "Exactly. That's the problem with the original—it hides crucial information. Your translation should acknowledge that: 'We are laying off an unspecified number of employees—the company has not disclosed how many or which departments.'"

6. Refine your translation in the text area:
   > "We are laying off employees. The company has not disclosed how many or which departments are affected."

7. Continue iterating through chat until satisfied

**Phase E: Verify Your Signal**

1. Once your translation is clear, specific, and honest, click "Verify Signal"
2. Your translation is saved as a labeled data point:
   ```json
   {
     "input": "We are currently right-sizing our resource allocation...",
     "lens": "Realist",
     "output": "We are laying off employees. The company has not disclosed...",
     "iterations": 2,
     "timestamp": "2025-06-15T14:23:00Z",
     "userId": "spark_user_123"
   }
   ```

3. Success animation confirms your contribution
4. This data point is now part of the training dataset

**Phase F: Keep Going**

- Select another deceptive text
- Try a different lens on the same text
- Build your translation skills
- Contribute more training data

#### What You're Building

With each verified translation, you're:
1. **Training yourself** to spot and counter deception
2. **Creating labeled data** that shows AI what honesty looks like
3. **Compounding the flywheel** - better data → better AI → faster practice
4. **Contributing to a truth supply chain** - small honest actions that ripple outward

#### Tips for Good Translations

**Do:**
- Be specific (numbers, names, dates)
- Acknowledge uncertainty ("We don't know..." is valid)
- Add missing context the original hid
- Make it testable/falsifiable
- Keep it concise

**Don't:**
- Add information not in or reasonably inferred from the original
- Be snarky or judgmental
- Over-explain (keep it 1-3 sentences)
- Remove nuance in favor of hot takes
- Ignore your chosen lens

#### The Score (Future Feature)

Eventually, a leaderboard will track:
```
Your Score = (Evidence Quality × Reproducibility) ÷ Corrections Against You
```

- **Evidence Quality**: How well you cite and verify claims
- **Reproducibility**: Can others follow your reasoning?
- **Corrections Against You**: Did someone have to fix your translation?

This creates positive pressure toward rigor over speed.

## Development

The application uses Vite for development and builds. All AI and API functionality works in the browser with no backend required.

### Deployment

For deploying to GitHub Pages, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

For Supabase integration (future analytics/user content), see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md).

### API Rate Limits
- GitHub API: 60 requests/hour (unauthenticated)
- Grants.gov API: Standard federal API rate limits apply
- Gemini API (for Ripples): Configured via environment, used for AI feedback and real-time grounding
- Spark LLM: Based on user's quota

### Future Enhancements
- GitHub authentication for higher rate limits
- More sophisticated AI prompts for better analysis
- Export discovered projects
- Create custom project collections
- Integration with academic databases
- Policy recommendation generator using AI
- **Ripples Leaderboard**: Track evidence quality, reproducibility, and corrections
- **Ripples Community**: Public attribution system with contributor scoring
