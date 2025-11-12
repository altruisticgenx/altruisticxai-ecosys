# AltruisticXAI Platform - User Guide

## Overview

The AltruisticXAI platform showcases the three-arm approach to ethical AI: Open Source Labs, Consulting Studio, and Policy Alliance. It now includes advanced features for discovering and analyzing open-source projects that align with ethical AI principles.

## Navigation

The platform consists of five main sections accessible via the top navigation:

1. **Home** - Overview of the three-arm flywheel model
2. **Labs** - Open-source projects and AI-powered project discovery
3. **Consulting** - Service tiers and client case studies
4. **Policy** - Policy memos and legislative initiatives
5. **Impact** - Comprehensive ledger of all milestones

## Key Features

### 1. AI-Powered Project Discovery (Labs Page)

#### Purpose
Discover open-source projects on GitHub that align with ethical AI principles using AI-powered analysis.

#### How to Use
1. Navigate to the **Labs** page
2. Click the **AI Discovery** tab
3. Select a topic from the dropdown menu (e.g., "Explainable AI", "Privacy-Preserving ML")
4. Click the **Discover Projects** button
5. Wait for AI to analyze repositories (typically 10-30 seconds)
6. Review the discovered projects with relevance scores

#### Understanding the Results

Each discovered project card shows:
- **Project Name & GitHub Link**: Direct link to the repository
- **Relevance Score**: 0-100 score indicating alignment with ethical AI principles
  - 80-100: Highly relevant (green)
  - 60-79: Moderately relevant (yellow)
  - Below 60: Filtered out automatically
- **Category Badge**: Classification (explainability, privacy, fairness, sustainability, general-ethics)
- **Recommended Sector**: Best-fit industry (Healthcare, Education, Government, Energy, General)
- **Potential Use Case**: AI-generated description of practical applications
- **Alignment Reason**: Why this project fits ethical AI principles
- **GitHub Stars**: Community engagement metric
- **Primary Language**: Main programming language
- **Topics**: GitHub repository topics

#### Managing Discovered Projects

- **Remove Individual Projects**: Click the X button in the top-right of any card
- **Clear All Projects**: Click "Clear All" button above the project grid
- **Persistence**: All discovered projects are saved automatically and persist between sessions

#### Tips for Best Results

- **Try Different Topics**: Each topic searches different aspects of ethical AI
- **Be Patient**: AI analysis takes time to ensure quality results
- **Check Back Later**: GitHub rate limits may temporarily prevent discovery (60 requests/hour without authentication)
- **Explore Diverse Categories**: Different topics yield different types of projects

### 2. Three-Arm Showcase

#### Open Source Labs
- View curated internal projects
- See detailed technical stacks
- Access GitHub repositories
- Understand project status (Active, Pilot, Archived)

#### Consulting Studio
- Browse service tiers with pricing
- Review client case studies
- See quantified impact metrics
- Understand the consulting process

#### Policy Alliance
- Read policy memos by status (Concept, In Discussion, Enacted)
- See connections to evidence from Labs and Consulting
- Track legislative progress
- Understand evidence-based policy approach

### 3. Impact Ledger

#### Features
- **Comprehensive Timeline**: All milestones across all three arms
- **Type Filtering**: Filter by Pilot, Policy, Publication, or Partnership
- **Metrics Display**: Quantified outcomes for each event
- **Interconnections**: See how events in one arm reinforce others

#### How to Use
1. Navigate to **Impact Ledger** page
2. View summary statistics at the top
3. Use tabs to filter by event type or view all
4. Review detailed metrics for each milestone
5. Understand the flywheel effect

## Troubleshooting

### "GitHub API error" Message
**Cause**: GitHub rate limit exceeded (60 requests/hour)
**Solution**: Wait an hour and try again, or try a different topic

### "AI analysis failed" Message
**Cause**: Temporary AI service unavailability
**Solution**: Projects still appear with default 50% relevance score; refresh may help

### No Projects Found
**Cause**: Topic may have limited matches or all found projects scored below 60%
**Solution**: Try a different topic from the list

### Slow Loading
**Cause**: AI analysis of multiple projects takes time
**Solution**: Normal behavior; each project requires individual AI evaluation

## Data Privacy

- **No Account Required**: All features work without authentication
- **Local Storage**: Discovered projects stored in your browser only
- **No Tracking**: No analytics or tracking of your searches
- **GitHub Public Data**: Only searches publicly available repositories

## Technical Details

### API Limits
- **GitHub API**: 60 requests/hour (unauthenticated)
- **Project Analysis**: Up to 5 projects per discovery request
- **Storage Limit**: Maximum 50 discovered projects stored

### Browser Requirements
- Modern browser with JavaScript enabled
- LocalStorage support for persistence
- Internet connection for API access

### Performance
- Initial page load: <2 seconds
- Project discovery: 10-30 seconds (depends on AI analysis)
- Navigation between pages: Instant

## Best Practices

1. **Start with Broad Topics**: Begin with "AI Ethics" or "Responsible AI" to get diverse results
2. **Narrow Down**: Use specific topics like "Differential Privacy" for targeted discovery
3. **Review Carefully**: Check relevance scores and alignment reasons before exploring projects
4. **Manage Your Collection**: Remove irrelevant projects to keep your collection focused
5. **Explore Cross-References**: Note how Labs projects connect to Consulting cases and Policy initiatives

## Getting Help

For questions, issues, or suggestions about the platform:
- Review the README.md for technical details
- Check the PRD.md for design decisions
- Explore the codebase for implementation details

## Future Enhancements

The platform is continuously evolving. Upcoming features may include:
- GitHub authentication for higher rate limits
- Export functionality for discovered projects
- Custom project collections
- AI-powered policy recommendations
- Integration with academic databases
