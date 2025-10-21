/**
 * Smart Matching Algorithm for Incubazar
 * Matches investors with startups based on comprehensive preferences and criteria
 */

interface InvestorPreferences {
  preferred_sectors?: string[]
  preferred_stages?: string[]
  geographic_preference?: string
  min_investment_amount?: string
  max_investment_amount?: string
  typical_check_size?: string
  risk_appetite?: string
  investment_horizon?: string
}

interface StartupProfile {
  id: string
  startup_name: string
  industry_sector: string
  stage: 'idea' | 'mvp' | 'early_revenue'
  admin_approval_status: string
  fundraising_goal?: string
  location?: string
}

interface MatchScore {
  startup_id: string
  startup_name: string
  total_score: number
  breakdown: {
    sector_score: number
    stage_score: number
    investment_range_score: number
    risk_profile_score: number
    location_score: number
  }
  match_reasons: string[]
}

/**
 * Weights for different matching criteria
 */
const MATCH_WEIGHTS = {
  SECTOR: 0.35,        // 35% - Most important
  STAGE: 0.25,         // 25% - Very important
  INVESTMENT_RANGE: 0.20, // 20% - Important
  RISK_PROFILE: 0.10,  // 10% - Moderate importance
  LOCATION: 0.10       // 10% - Least important
}

/**
 * Stage to risk level mapping
 */
const STAGE_RISK_MAP: Record<string, string> = {
  'idea': 'aggressive',
  'Idea Stage': 'aggressive',
  'mvp': 'moderate',
  'MVP Stage': 'moderate',
  'early_revenue': 'moderate',
  'Early Revenue': 'moderate',
  'Growth Stage': 'conservative',
  'Series A+': 'conservative'
}

/**
 * Parse investment amount string to number (in lakhs)
 */
function parseInvestmentAmount(amount: string): number {
  if (!amount) return 0
  
  // Remove currency symbols and spaces
  const cleaned = amount.toLowerCase().replace(/[₹,\s]/g, '')
  
  // Handle different formats
  if (cleaned.includes('cr') || cleaned.includes('crore')) {
    const value = parseFloat(cleaned)
    return value * 100 // Convert crores to lakhs
  } else if (cleaned.includes('l') || cleaned.includes('lakh')) {
    return parseFloat(cleaned)
  } else if (cleaned.includes('k')) {
    return parseFloat(cleaned) / 100 // Convert thousands to lakhs
  }
  
  // Assume it's already in lakhs if no unit
  return parseFloat(cleaned) || 0
}

/**
 * Calculate sector match score
 */
function calculateSectorScore(
  startupSector: string,
  preferredSectors: string[]
): { score: number; matched: boolean; reason?: string } {
  if (!preferredSectors || preferredSectors.length === 0) {
    return { score: 0.5, matched: false } // Neutral if no preference
  }

  // Exact match
  if (preferredSectors.includes(startupSector)) {
    return {
      score: 1.0,
      matched: true,
      reason: `Matches your preferred sector: ${startupSector}`
    }
  }

  // Related sectors (simplified - can be enhanced)
  const techRelated = ['Technology', 'SaaS', 'AI/ML', 'Blockchain']
  const healthRelated = ['Healthcare', 'CleanTech', 'AgriTech']
  const financeRelated = ['Fintech', 'Blockchain']

  const hasRelatedMatch = (sectors: string[], related: string[]) => {
    return sectors.some(s => related.includes(s)) && related.includes(startupSector)
  }

  if (hasRelatedMatch(preferredSectors, techRelated) ||
      hasRelatedMatch(preferredSectors, healthRelated) ||
      hasRelatedMatch(preferredSectors, financeRelated)) {
    return {
      score: 0.6,
      matched: true,
      reason: `Related to your preferred sectors`
    }
  }

  return { score: 0.2, matched: false }
}

/**
 * Calculate stage match score
 */
function calculateStageScore(
  startupStage: string,
  preferredStages: string[]
): { score: number; matched: boolean; reason?: string } {
  if (!preferredStages || preferredStages.length === 0) {
    return { score: 0.5, matched: false }
  }

  // Normalize stage names
  const normalizedStartupStage = startupStage === 'idea' ? 'Idea Stage' :
                                  startupStage === 'mvp' ? 'MVP Stage' :
                                  startupStage === 'early_revenue' ? 'Early Revenue' :
                                  startupStage

  if (preferredStages.includes(normalizedStartupStage)) {
    return {
      score: 1.0,
      matched: true,
      reason: `At your preferred stage: ${normalizedStartupStage}`
    }
  }

  // Adjacent stages get partial score
  const stageOrder = ['Idea Stage', 'MVP Stage', 'Early Revenue', 'Growth Stage', 'Series A+']
  const startupIndex = stageOrder.indexOf(normalizedStartupStage)
  const preferredIndices = preferredStages.map(s => stageOrder.indexOf(s))

  if (startupIndex >= 0 && preferredIndices.some(i => Math.abs(i - startupIndex) === 1)) {
    return {
      score: 0.6,
      matched: true,
      reason: `Close to your preferred stage`
    }
  }

  return { score: 0.2, matched: false }
}

/**
 * Calculate investment range match score
 */
function calculateInvestmentRangeScore(
  fundraisingGoal: string,
  minInvestment: string,
  maxInvestment: string,
  typicalCheckSize: string
): { score: number; matched: boolean; reason?: string } {
  const goalAmount = parseInvestmentAmount(fundraisingGoal)
  const minAmount = parseInvestmentAmount(minInvestment)
  const maxAmount = parseInvestmentAmount(maxInvestment)

  if (!goalAmount || (!minAmount && !maxAmount)) {
    return { score: 0.5, matched: false }
  }

  // Check if typical check size is mentioned
  let typicalAmount = 0
  if (typicalCheckSize) {
    const range = typicalCheckSize.toLowerCase()
    if (range.includes('1-5')) typicalAmount = 3
    else if (range.includes('5-10')) typicalAmount = 7.5
    else if (range.includes('10-25')) typicalAmount = 17.5
    else if (range.includes('25-50')) typicalAmount = 37.5
    else if (range.includes('50')) typicalAmount = 60
  }

  // Perfect match: goal is within investor's range
  if (minAmount && maxAmount && goalAmount >= minAmount && goalAmount <= maxAmount) {
    return {
      score: 1.0,
      matched: true,
      reason: `Fundraising goal (₹${goalAmount}L) matches your investment range`
    }
  }

  // Good match: typical check size is reasonable for the goal
  if (typicalAmount && goalAmount >= typicalAmount * 2 && goalAmount <= typicalAmount * 20) {
    return {
      score: 0.8,
      matched: true,
      reason: `Your typical check size fits this deal`
    }
  }

  // Partial match: within broader range
  if (maxAmount && goalAmount <= maxAmount * 2) {
    return {
      score: 0.5,
      matched: true,
      reason: `Within your investment capacity`
    }
  }

  return { score: 0.2, matched: false }
}

/**
 * Calculate risk profile match score
 */
function calculateRiskProfileScore(
  startupStage: string,
  riskAppetite: string
): { score: number; matched: boolean; reason?: string } {
  if (!riskAppetite) {
    return { score: 0.5, matched: false }
  }

  const startupRisk = STAGE_RISK_MAP[startupStage] || 'moderate'

  // Perfect match
  if (startupRisk === riskAppetite) {
    return {
      score: 1.0,
      matched: true,
      reason: `Risk level matches your appetite`
    }
  }

  // Adjacent risk levels
  const riskOrder = ['conservative', 'moderate', 'aggressive']
  const startupIndex = riskOrder.indexOf(startupRisk)
  const investorIndex = riskOrder.indexOf(riskAppetite)

  if (Math.abs(startupIndex - investorIndex) === 1) {
    return {
      score: 0.6,
      matched: true,
      reason: `Risk level is acceptable`
    }
  }

  return { score: 0.3, matched: false }
}

/**
 * Calculate location match score
 */
function calculateLocationScore(
  startupLocation: string,
  geographicPreference: string
): { score: number; matched: boolean; reason?: string } {
  if (!geographicPreference || geographicPreference === 'no-preference') {
    return { score: 1.0, matched: true }
  }

  // This is simplified - in production, you'd match actual locations
  if (geographicPreference === 'national') {
    return {
      score: 0.8,
      matched: true,
      reason: `Located in India`
    }
  }

  // For local preference, would need actual location matching
  return { score: 0.5, matched: false }
}

/**
 * Main matching algorithm
 * Returns scored and sorted list of startups for an investor
 */
export function matchStartupsForInvestor(
  startups: StartupProfile[],
  preferences: InvestorPreferences
): MatchScore[] {
  const scores: MatchScore[] = []

  for (const startup of startups) {
    // Skip unapproved startups
    if (startup.admin_approval_status !== 'approved') {
      continue
    }

    const matchReasons: string[] = []

    // Calculate individual scores
    const sectorResult = calculateSectorScore(
      startup.industry_sector,
      preferences.preferred_sectors || []
    )
    
    const stageResult = calculateStageScore(
      startup.stage,
      preferences.preferred_stages || []
    )
    
    const investmentResult = calculateInvestmentRangeScore(
      startup.fundraising_goal || '',
      preferences.min_investment_amount || '',
      preferences.max_investment_amount || '',
      preferences.typical_check_size || ''
    )
    
    const riskResult = calculateRiskProfileScore(
      startup.stage,
      preferences.risk_appetite || ''
    )
    
    const locationResult = calculateLocationScore(
      startup.location || '',
      preferences.geographic_preference || ''
    )

    // Collect match reasons
    if (sectorResult.matched && sectorResult.reason) matchReasons.push(sectorResult.reason)
    if (stageResult.matched && stageResult.reason) matchReasons.push(stageResult.reason)
    if (investmentResult.matched && investmentResult.reason) matchReasons.push(investmentResult.reason)
    if (riskResult.matched && riskResult.reason) matchReasons.push(riskResult.reason)
    if (locationResult.matched && locationResult.reason) matchReasons.push(locationResult.reason)

    // Calculate weighted total score
    const totalScore = (
      sectorResult.score * MATCH_WEIGHTS.SECTOR +
      stageResult.score * MATCH_WEIGHTS.STAGE +
      investmentResult.score * MATCH_WEIGHTS.INVESTMENT_RANGE +
      riskResult.score * MATCH_WEIGHTS.RISK_PROFILE +
      locationResult.score * MATCH_WEIGHTS.LOCATION
    ) * 100 // Convert to percentage

    scores.push({
      startup_id: startup.id,
      startup_name: startup.startup_name,
      total_score: Math.round(totalScore),
      breakdown: {
        sector_score: Math.round(sectorResult.score * 100),
        stage_score: Math.round(stageResult.score * 100),
        investment_range_score: Math.round(investmentResult.score * 100),
        risk_profile_score: Math.round(riskResult.score * 100),
        location_score: Math.round(locationResult.score * 100)
      },
      match_reasons: matchReasons
    })
  }

  // Sort by total score (highest first)
  return scores.sort((a, b) => b.total_score - a.total_score)
}

/**
 * Get match quality category
 */
export function getMatchQuality(score: number): {
  category: 'excellent' | 'good' | 'fair' | 'poor'
  label: string
  color: string
} {
  if (score >= 80) {
    return { category: 'excellent', label: 'Excellent Match', color: 'green' }
  } else if (score >= 60) {
    return { category: 'good', label: 'Good Match', color: 'blue' }
  } else if (score >= 40) {
    return { category: 'fair', label: 'Fair Match', color: 'yellow' }
  } else {
    return { category: 'poor', label: 'Low Match', color: 'gray' }
  }
}

/**
 * Filter startups by minimum match score
 */
export function getRecommendedStartups(
  matchedStartups: MatchScore[],
  minScore: number = 50
): MatchScore[] {
  return matchedStartups.filter(match => match.total_score >= minScore)
}

