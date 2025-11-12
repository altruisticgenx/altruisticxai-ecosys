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
  const description = grant.description.slice(0, 1000)
  const floor = grant.awardFloor || 'Unknown'
  const ceiling = grant.awardCeiling || 'Unknown'
  const applicants = grant.eligibleApplicants.join(', ')
  
  const promptParts = [
    'You are an expert grant analyst for AltruisticXAI, an organization with three pillars:\n',
    '1. Open Source Labs - builds transparent, local-first AI tools\n',
    '2. Consulting Studio - deploys ROI-positive pilots for universities, utilities, and cities\n',
    '3. Policy Alliance - converts pilots into durable funding and policy\n\n',
    'Analyze this grant opportunity for strategic alignment:\n\n',
    `Title: ${grant.opportunityTitle}\n`,
    `Agency: ${grant.agencyName}\n`,
    `Description: ${description}\n`,
    `Funding Range: $${floor} - $${ceiling}\n`,
    `Eligible Applicants: ${applicants}\n`,
    `Category: ${grant.opportunityCategory}\n\n`,
    'Provide a strategic analysis as JSON with this structure:\n',
    '{\n',
    '  "alignmentScore": <number 0-100>,\n',
    '  "strategicFit": <"excellent" | "good" | "moderate" | "poor">,\n',
    '  "recommendedPillar": <"labs" | "consulting" | "policy" | "cross-pillar">,\n',
    '  "keyStrengths": [<array of 2-4 specific strengths matching our mission>],\n',
    '  "potentialChallenges": [<array of 2-3 realistic challenges>],\n',
    '  "actionableInsights": <one concise paragraph with specific next steps>,\n',
    '  "estimatedEffort": <"low" | "medium" | "high">,\n',
    '  "winProbability": <number 0-100>,\n',
    '  "strategicValue": <one sentence explaining long-term ecosystem value>\n',
    '}\n\n',
    'Focus on alignment with: local-first AI, energy transparency, education, ethical AI governance, and the Labs→Consulting→Policy flywheel.'
  ]
  
  const prompt = promptParts.join('')

  try {
    const result = await window.spark.llm(prompt, 'gpt-4o', true)
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
