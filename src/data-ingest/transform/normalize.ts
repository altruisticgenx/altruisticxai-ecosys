import type { IngestedProject, GrantOpportunity } from '../schema'

declare const spark: {
  llmPrompt: (strings: TemplateStringsArray, ...values: unknown[]) => string
  llm: (prompt: string, modelName?: string, jsonMode?: boolean) => Promise<string>
}

export function normalizeProject(raw: IngestedProject): IngestedProject {
  return {
    ...raw,
    title: cleanText(raw.title),
    description: cleanText(raw.description),
    tags: deduplicateTags(raw.tags),
    relevance_score: raw.relevance_score || 0,
    capture_date: raw.capture_date || new Date().toISOString()
  }
}

export function normalizeGrant(raw: GrantOpportunity): GrantOpportunity {
  return {
    ...raw,
    title: cleanText(raw.title),
    description: cleanText(raw.description),
    keywords: deduplicateTags(raw.keywords),
    relevance_score: raw.relevance_score || 0,
    capture_date: raw.capture_date || new Date().toISOString()
  }
}

export async function enrichWithAI(
  item: IngestedProject | GrantOpportunity,
  apiKey?: string
): Promise<IngestedProject | GrantOpportunity> {
  if (!apiKey) return item

  try {
    const prompt = spark.llmPrompt`Here is a breakdown of how to improve your logic, moving from a static prompt to an advanced, real-time, context-aware analysis system.

The primary limitation of your current logic is that it operates *only* on the 500-character snippet provided. An "advanced" system must **"pull all rela data"** as you suggested, using the title and description as a *starting point* to find the full context.

Here is the blueprint for an advanced "AI logic + API" system.

### 1\. The Advanced API & System Logic

Instead of a single prompt, you need a multi-step process that your API will execute in real-time.

**User Interface (UI) Sends:**
Your UI doesn't just send the item; it also sends the *user's current interests* to make the relevance scoring dynamic.

```json
// POST /api/analyze-item
{
  "item": {
    "title": "Project AuraConnect: Local-First AI for Campus Grids",
    "description_snippet": "A new initiative to decentralize energy management on university campuses using swarm AI. This project aims to create resilient, peer-to-peer energy trading networks...",
    "type": "project"
  },
  "user_interests": ["local-first AI", "campus energy", "regenerative systems", "blockchain"]
}
```

-----

**API Backend Logic (The "Real-Time" Part):**

1.  **Receive Request:** Get the `item` and `user_interests` from the UI.
2.  **Step 1: Data Enrichment (Pull Relevant Data):** Use the `item.title` and `item.description_snippet` to search the web for the full project details, the organization behind it, official press releases, or grant databases. This is the *most crucial step* for an "advanced" analysis.
3.  **Step 2: AI Analysis (Advanced Logic):** Combine the *original snippet* with the *search results* and pass them to the AI with a more advanced prompt (see section 2).
4.  **Step 3: Return Enriched JSON:** Send the rich, multi-point JSON analysis back to the UI.

-----

### 2\. The Core "AI Logic" (The New Prompt)

Here is the advanced prompt your API backend would send to the AI model *after* completing the search step.

> **System Prompt:**
>
> You are an expert analyst for a venture fund specializing in deep tech and climate solutions. You will be given a project/grant snippet, a set of web search results for context, and a list of the user's strategic interests.
>
> Your task is to synthesize **all** this information to generate a concise, multi-point analysis in a strict JSON format.
>
> **User's Item:**
>
>   * **Title:** `${item.title}`
>   * **Type:** `${item.type}`
>   * **Description Snippet:** `${item.description_snippet}`
>
> **Web Context (Search Results):**
>
>   * `Source 1: ${search_result_1.snippet}`
>   * `Source 2: ${search_result_2.snippet}`
>   * `Source 3: ${search_result_3.snippet}`
>
> **User's Strategic Interests:**
>
>   * `${user_interests[0]}`
>   * `${user_interests[1]}`
>   * ...
>
> **Analysis Task:**
>
> Analyze the item based *only* on the provided context. Return a single JSON object with the following schema:
>
>   * `summary`: (String) A 1-sentence summary focusing on the project's core **innovation** and potential **impact**.
>   * `primary_sector`: (String) The primary industry classification (e.g., "AI/ML", "Energy", "Logistics", "Biotech").
>   * `key_entities`: (Array of Strings) The primary organizations, universities, or PIs involved (e.g., "MIT Media Lab", "NSF", "Project Lead Name").
>   * `relevance_scores`: (Array of Objects) An array where each object analyzes *one* of the user's strategic interests. Each object must contain:
>       * `interest`: (String) The user's interest being scored.
>       * `score`: (Number) A relevance score from 0.0 to 1.0.
>       * `rationale`: (String) A 1-sentence justification for the score.
>   * `analysis_confidence`: (Number) Your confidence (0.0-1.0) in this analysis, based on the quality and consistency of the provided web context.

-----

### 3\. Example Execution

Let's run a live demonstration.

**Step 1: Data Enrichment (Tool Call)**
First, the system will use your item's data to search for real-time context.

  * **Hypothetical Input Title:** "Project Synapse: Regenerative Agriculture AI"
  * **Hypothetical Input Description:** "A new grant opportunity to fund research into AI-driven soil monitoring and regenerative farming practices. Aims to build local-first models."
  * **User Interests:** ["local-first AI", "campus energy", "regenerative systems"]

I will now search for this information.
**Step 2: AI Analysis (Demonstration)**
The search results for "Project Synapse" show a "name collision" with other projects. However, the search for the *topic* ("AI-driven soil monitoring and regenerative farming") returned a rich set of highly relevant academic and industry reports.

An advanced AI analyst would note the name ambiguity but analyze the highly relevant *topic*.

**Step 3: Final Enriched JSON Output (The "Advanced" Result)**

Here is the "advanced" JSON your API would return. This is far more detailed, dynamic, and actionable than the original.

```json
{
  "summary": "This grant opportunity aims to fund the development of AI-driven platforms that use sensors and satellite imagery to monitor soil health, enhancing carbon sequestration and biodiversity for regenerative agriculture.",
  "primary_sector": "Agri-Tech / AI/ML",
  "key_entities": [
    "World Economic Forum",
    "Omdena",
    "U.S. Sustainability Alliance",
    "Grain Data Solutions",
    "IOSR Journal"
  ],
  "relevance_scores": [
    {
      "interest": "local-first AI",
      "score": 0.9,
      "rationale": "Search results confirm a key challenge in this field is adapting AI models to 'local conditions' and ensuring 'village-level service delivery', matching the 'local-first' intent."
    },
    {
      "interest": "campus energy",
      "score": 0.0,
      "rationale": "The topic is exclusively focused on agriculture and soil. An unrelated project named 'Project Synapse' from 2018 mentioned 'Energy Autonomous Campus', but it is not relevant to this grant."
    },
    {
      "interest": "regenerative systems",
      "score": 1.0,
      "rationale": "This is the primary topic. All relevant search results focus on using AI to scale, monitor, and verify the practices of regenerative agriculture (soil health, carbon, biodiversity)."
    }
  ],
  "analysis_confidence": 0.85
}
```

This improved system is more advanced because it:

  * **Pulls relevant data** in real-time.
  * **Scores relevance dynamically** against user-provided interests.
  * **Provides richer context**, like key entities and a rationale for its scores.
  * **Handles ambiguity** by identifying the most likely topic, even with a conflicting project name.

`

    const result = await spark.llm(prompt, 'gpt-4o', true)
    const enriched = JSON.parse(result)
    
    return {
      ...item,
      ai_summary: enriched.summary,
      relevance_score: Math.max(item.relevance_score || 0, enriched.relevance_score || 0),
      ...(isProject(item) && enriched.sector ? { sector: enriched.sector } : {})
    }
  } catch (error) {
    console.error('AI enrichment failed:', error)
    return item
  }
}

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/[^\x20-\x7E]/g, '')
    .trim()
}

function deduplicateTags(tags: string[]): string[] {
  return [...new Set(tags.map(t => t.toLowerCase()))]
}

function isProject(item: IngestedProject | GrantOpportunity): item is IngestedProject {
  return 'sector' in item && !('opportunity_number' in item)
}
