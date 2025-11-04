import { GrantOpportunity } from './grants-api'

export interface GrantAnalysis {
  id: string
  opportunityNumber: string
  alignmentScore: number
  strategicFit: 'excellent' | 'good' | 'moderate' | 'poor'
  recommendedPillar: 'labs' | 'consulting' | 'policy' | 'cross-pillar'
  keyStrengths: string[]
  potentialChallenges: string[]
  actionableInsights: string
  estimatedEffort: 'low' | 'medium' | 'high'
  winProbability: number
  strategicValue: string
}

export async function analyzeGrantAlignment(grant: GrantOpportunity): Promise<GrantAnalysis> {
  const promptText = `You are an expert grant analyst for AltruisticXAI, an organization with three pillars:
1. Open Source Labs - builds transparent, local-first AI tools
2. Consulting Studio - deploys ROI-positive pilots for universities, utilities, and cities
3. Policy Alliance - converts pilots into durable funding and policy

Analyze this grant opportunity for strategic alignment:

Title: ${grant.opportunityTitle}
Agency: ${grant.agencyName}
Description: ${grant.description.slice(0, 1000)}
Funding Range: $${grant.awardFloor || 'Unknown'} - $${grant.awardCeiling || 'Unknown'}
Eligible Applicants: ${grant.eligibleApplicants.join(', ')}
Category: ${grant.opportunityCategory}

Provide a strategic analysis as JSON with this structure:
{
  "alignmentScore": <number 0-100>,
  "strategicFit": <"excellent" | "good" | "moderate" | "poor">,
  "recommendedPillar": <"labs" | "consulting" | "policy" | "cross-pillar">,
  "keyStrengths": [<array of 2-4 specific strengths matching our mission>],
  "potentialChallenges": [<array of 2-3 realistic challenges>],
  "actionableInsights": <one concise paragraph with specific next steps>,
  "estimatedEffort": <"low" | "medium" | "high">,
  "winProbability": <number 0-100>,
  "strategicValue": <one sentence explaining long-term ecosystem value>
}

Focus on alignment with: local-first AI, energy transparency, education, ethical AI governance, and the Labs→Consulting→Policy flywheel.`

  try {
    const result = await window.spark.llm(promptText, 'gpt-4o', true)
    const parsed = JSON.parse(result)
    
    return {
      id: grant.id,
      opportunityNumber: grant.opportunityNumber,
      alignmentScore: parsed.alignmentScore || 0,
      strategicFit: parsed.strategicFit || 'moderate',
      recommendedPillar: parsed.recommendedPillar || 'consulting',
      keyStrengths: parsed.keyStrengths || [],
      potentialChallenges: parsed.potentialChallenges || [],
      actionableInsights: parsed.actionableInsights || '',
      estimatedEffort: parsed.estimatedEffort || 'medium',
      winProbability: parsed.winProbability || 50,
      strategicValue: parsed.strategicValue || ''
    }
  } catch (error) {
    console.error('Error analyzing grant:', error)
    return {
      id: grant.id,
      opportunityNumber: grant.opportunityNumber,
      alignmentScore: 0,
      strategicFit: 'poor',
      recommendedPillar: 'consulting',
      keyStrengths: [],
      potentialChallenges: ['Analysis failed'],
      actionableInsights: 'Unable to complete analysis',
      estimatedEffort: 'medium',
      winProbability: 0,
      strategicValue: 'Analysis unavailable'
    }
  }
}

export async function analyzeBatchGrants(grants: GrantOpportunity[]): Promise<Map<string, GrantAnalysis>> {
  const results = new Map<string, GrantAnalysis>()
  
  for (const grant of grants.slice(0, 5)) {
    try {
      const analysis = await analyzeGrantAlignment(grant)
      results.set(grant.id, analysis)
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.error(`Failed to analyze grant ${grant.id}:`, error)
    }
  }
  
  return results
}
