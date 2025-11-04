import type { IngestedProject, GrantOpportunity } from '../schema'

declare const spark: {
  llmPrompt: (strings: TemplateStringsArray, ...values: any[]) => string
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
    const prompt = spark.llmPrompt`Analyze this ${isProject(item) ? 'project' : 'grant opportunity'} and provide:
1. A 1-sentence summary focusing on innovation and impact
2. Relevance score (0-1) for local-first AI, campus energy, or regenerative systems
3. Primary sector classification

Title: ${item.title}
Description: ${item.description.slice(0, 500)}

Return as JSON with fields: summary, relevance_score, sector`

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

function isProject(item: any): item is IngestedProject {
  return 'sector' in item && !('opportunity_number' in item)
}
