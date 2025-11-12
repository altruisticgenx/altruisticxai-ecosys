import { GrantOpportunity } from "../../data/schema"

export async function enrichGrantWithAI(grant: GrantOpportunity): Promise<GrantOpportunity> {
  if (typeof window === 'undefined' || !window.spark) {
    console.warn("[ai-enrich] Spark SDK not available")
    return grant
  }

  try {
    const promptText = `You are analyzing a federal grant opportunity for strategic alignment with a clean energy and AI consulting firm.

Grant Title: ${grant.title}
Agency: ${grant.agency}
Description: ${grant.description.slice(0, 500)}

Analyze this grant and provide:
1. Alignment score (0-100) with clean energy + AI + education focus
2. Recommended pillar: "labs" (R&D/open-source), "consulting" (revenue/pilots), or "policy" (advocacy/memos)
3. Key strengths (1 sentence)
4. Key challenges (1 sentence)
5. Actionable insights (1 sentence)

Return ONLY valid JSON in this exact format:
{
  "alignmentScore": 85,
  "recommendedPillar": "consulting",
  "strengths": "...",
  "challenges": "...",
  "insights": "..."
}`

    const result = await window.spark.llm(promptText, "gpt-4o-mini", true)
    const analysis = JSON.parse(result)

    return {
      ...grant,
      alignmentScore: analysis.alignmentScore,
      recommendedPillar: analysis.recommendedPillar,
      aiAnalysis: {
        strengths: analysis.strengths,
        challenges: analysis.challenges,
        insights: analysis.insights,
      },
    }
  } catch (error) {
    console.error(`[ai-enrich] Failed to enrich grant ${grant.id}:`, error)
    return grant
  }
}
