// Venture Metric Calculator - Calculation Engine
// All financial formulas and business logic

import type {
  RunwayInputs,
  RunwayOutputs,
  MonthlyProjection,
  LTVInputs,
  CACInputs,
  LTVCACOutputs,
  SensitivityMatrix,
  SensitivityCell,
  RetentionInputs,
  RetentionOutputs,
  CoFounder,
  EquitySplitOutputs,
  FounderEquity,
  DilutionInputs,
  DilutionOutputs,
  FutureRoundProjection,
  ValuationInputs,
  ValuationOutputs,
  BerkusValuation,
  RevenueMultipleValuation,
  IndustryType,
  FundingStage,
  IndustryBenchmarks,
  WhatIfScenario,
  WhatIfResults,
} from '@/lib/types/calculator';

// ============================================================================
// II. STRATEGIC FINANCIAL PLANNING
// ============================================================================

/**
 * Calculate runway, burn rate, and cash flow projections
 */
export function calculateRunway(inputs: RunwayInputs): RunwayOutputs {
  const totalMonthlyExpenses = 
    inputs.monthlyExpenses.salaries +
    inputs.monthlyExpenses.rent +
    inputs.monthlyExpenses.software +
    inputs.monthlyExpenses.marketing +
    inputs.monthlyExpenses.cogs +
    inputs.monthlyExpenses.other;

  const netBurnRate = totalMonthlyExpenses - inputs.monthlyRevenue;
  
  // Calculate runway in months
  const runwayMonths = netBurnRate > 0 
    ? inputs.cashInBank / netBurnRate 
    : Infinity;

  // Determine runway status
  let runwayStatus: 'critical' | 'warning' | 'healthy';
  if (runwayMonths < 3) {
    runwayStatus = 'critical';
  } else if (runwayMonths < 6) {
    runwayStatus = 'warning';
  } else {
    runwayStatus = 'healthy';
  }

  // Generate 18-month cash flow projection
  const projectionData: MonthlyProjection[] = [];
  let currentCash = inputs.cashInBank;
  
  for (let month = 0; month <= 18; month++) {
    projectionData.push({
      month,
      cash: Math.max(0, currentCash),
      revenue: inputs.monthlyRevenue,
      expenses: totalMonthlyExpenses,
      netBurn: netBurnRate,
    });
    currentCash -= netBurnRate;
    
    // Stop projection if cash runs out
    if (currentCash <= 0 && month > 0) break;
  }

  return {
    totalMonthlyExpenses,
    netBurnRate,
    runwayMonths: Number.isFinite(runwayMonths) ? runwayMonths : 999,
    runwayStatus,
    projectionData,
  };
}

/**
 * Calculate What-If scenario impact on runway
 */
export function calculateWhatIf(
  baseInputs: RunwayInputs,
  scenario: WhatIfScenario
): WhatIfResults {
  const baseline = calculateRunway(baseInputs);
  
  // Create modified inputs based on scenario
  const modifiedInputs = { ...baseInputs };
  
  switch (scenario.type) {
    case 'revenue_change':
      modifiedInputs.monthlyRevenue = scenario.isPercentage
        ? baseInputs.monthlyRevenue * (1 + scenario.impact / 100)
        : baseInputs.monthlyRevenue + scenario.impact;
      break;
      
    case 'expense_change':
      const expenseMultiplier = scenario.isPercentage 
        ? (1 + scenario.impact / 100) 
        : 1;
      const expenseAddition = scenario.isPercentage ? 0 : scenario.impact;
      
      modifiedInputs.monthlyExpenses = {
        salaries: baseInputs.monthlyExpenses.salaries * expenseMultiplier + expenseAddition / 6,
        rent: baseInputs.monthlyExpenses.rent * expenseMultiplier,
        software: baseInputs.monthlyExpenses.software * expenseMultiplier,
        marketing: baseInputs.monthlyExpenses.marketing * expenseMultiplier,
        cogs: baseInputs.monthlyExpenses.cogs * expenseMultiplier,
        other: baseInputs.monthlyExpenses.other * expenseMultiplier,
      };
      break;
      
    case 'new_hire':
      modifiedInputs.monthlyExpenses = {
        ...baseInputs.monthlyExpenses,
        salaries: baseInputs.monthlyExpenses.salaries + scenario.impact,
      };
      break;
      
    case 'cost_reduction':
      const reductionAmount = scenario.isPercentage
        ? (baseline.totalMonthlyExpenses * scenario.impact / 100)
        : scenario.impact;
      
      const reductionFactor = 1 - (reductionAmount / baseline.totalMonthlyExpenses);
      modifiedInputs.monthlyExpenses = {
        salaries: baseInputs.monthlyExpenses.salaries * reductionFactor,
        rent: baseInputs.monthlyExpenses.rent * reductionFactor,
        software: baseInputs.monthlyExpenses.software * reductionFactor,
        marketing: baseInputs.monthlyExpenses.marketing * reductionFactor,
        cogs: baseInputs.monthlyExpenses.cogs * reductionFactor,
        other: baseInputs.monthlyExpenses.other * reductionFactor,
      };
      break;
  }
  
  const scenarioResult = calculateRunway(modifiedInputs);
  const difference = scenarioResult.runwayMonths - baseline.runwayMonths;
  
  // Generate recommendation
  let recommendation: string;
  if (difference > 3) {
    recommendation = `✅ Strong improvement: Extends runway by ${difference.toFixed(1)} months. Highly recommended.`;
  } else if (difference > 0) {
    recommendation = `✓ Positive impact: Adds ${difference.toFixed(1)} months to runway. Consider implementing.`;
  } else if (difference > -3) {
    recommendation = `⚠️ Minor negative impact: Reduces runway by ${Math.abs(difference).toFixed(1)} months. Proceed with caution.`;
  } else {
    recommendation = `❌ Significant risk: Reduces runway by ${Math.abs(difference).toFixed(1)} months. Not recommended without additional funding.`;
  }
  
  return {
    baseline,
    scenario: scenarioResult,
    difference,
    recommendation,
  };
}

// ============================================================================
// III. CUSTOMER & UNIT ECONOMICS
// ============================================================================

/**
 * Calculate Lifetime Value (LTV)
 */
export function calculateLTV(inputs: LTVInputs): number {
  return inputs.arpu * inputs.avgCustomerLifespan * (inputs.grossMargin / 100);
}

/**
 * Calculate Customer Acquisition Cost (CAC)
 */
export function calculateCAC(inputs: CACInputs): number {
  if (inputs.newCustomersAcquired === 0) return 0;
  return inputs.totalSalesMarketingSpend / inputs.newCustomersAcquired;
}

/**
 * Calculate LTV:CAC ratio and provide rating
 */
export function calculateLTVCAC(
  ltvInputs: LTVInputs,
  cacInputs: CACInputs
): LTVCACOutputs {
  const ltv = calculateLTV(ltvInputs);
  const cac = calculateCAC(cacInputs);
  
  if (cac === 0) {
    return {
      ltv,
      cac,
      ratio: 0,
      rating: 'critical',
      recommendation: 'Please enter valid customer acquisition data.',
    };
  }
  
  const ratio = ltv / cac;
  
  // Determine rating
  let rating: 'strong' | 'good' | 'needs-improvement' | 'critical';
  let recommendation: string;
  
  if (ratio >= 3) {
    rating = 'strong';
    recommendation = '✅ Excellent! Your unit economics are strong. You have a scalable business model.';
  } else if (ratio >= 2) {
    rating = 'good';
    recommendation = '✓ Good ratio. Focus on improving either LTV (reduce churn, increase ARPU) or reducing CAC.';
  } else if (ratio >= 1) {
    rating = 'needs-improvement';
    recommendation = '⚠️ Your CAC is too high relative to LTV. Optimize marketing efficiency or increase customer lifetime value.';
  } else {
    rating = 'critical';
    recommendation = '❌ Critical: You are spending more to acquire customers than they generate in value. Immediate action required.';
  }
  
  return {
    ltv,
    cac,
    ratio,
    rating,
    recommendation,
  };
}

/**
 * Generate LTV:CAC sensitivity matrix
 */
export function generateSensitivityMatrix(
  baseLtvInputs: LTVInputs,
  baseCacInputs: CACInputs,
  cacChanges: number[] = [-20, -10, 0, 10, 20],
  churnChanges: number[] = [-5, -2.5, 0, 2.5, 5]
): SensitivityMatrix {
  const results: SensitivityCell[][] = [];
  
  for (const churnChange of churnChanges) {
    const row: SensitivityCell[] = [];
    
    // Churn affects customer lifespan
    // If churn increases by X%, lifespan decreases proportionally
    const adjustedLifespan = baseLtvInputs.avgCustomerLifespan / (1 + churnChange / 100);
    
    for (const cacChange of cacChanges) {
      const adjustedCacInputs = {
        ...baseCacInputs,
        totalSalesMarketingSpend: baseCacInputs.totalSalesMarketingSpend * (1 + cacChange / 100),
      };
      
      const adjustedLtvInputs = {
        ...baseLtvInputs,
        avgCustomerLifespan: adjustedLifespan,
      };
      
      const result = calculateLTVCAC(adjustedLtvInputs, adjustedCacInputs);
      
      row.push({
        cacChange,
        churnChange,
        ltv: result.ltv,
        cac: result.cac,
        ratio: result.ratio,
        rating: result.rating,
      });
    }
    
    results.push(row);
  }
  
  return {
    cacChanges,
    churnChanges,
    results,
  };
}

/**
 * Calculate Net Revenue Retention (NRR)
 */
export function calculateRetention(inputs: RetentionInputs): RetentionOutputs {
  const nrr = ((inputs.endMRR) / inputs.startMRR) * 100;
  
  let status: 'excellent' | 'good' | 'needs-improvement' | 'critical';
  let benchmark: string;
  
  if (nrr >= 120) {
    status = 'excellent';
    benchmark = '🌟 World-class! NRR >120% indicates strong expansion revenue and minimal churn.';
  } else if (nrr >= 100) {
    status = 'good';
    benchmark = '✓ Solid retention. Focus on expansion to push NRR above 120%.';
  } else if (nrr >= 85) {
    status = 'needs-improvement';
    benchmark = '⚠️ Below 100% NRR means you are losing revenue. Address churn immediately.';
  } else {
    status = 'critical';
    benchmark = '❌ Critical churn levels. Your revenue base is eroding rapidly.';
  }
  
  return {
    nrr,
    status,
    benchmark,
  };
}

// ============================================================================
// IV. EQUITY & OWNERSHIP MANAGEMENT
// ============================================================================

/**
 * Calculate fair equity split for co-founders
 */
export function calculateEquitySplit(coFounders: CoFounder[]): EquitySplitOutputs {
  if (coFounders.length === 0) {
    return {
      founders: [],
      totalScore: 0,
      recommendation: 'Add co-founders to calculate equity split.',
      rationale: '',
    };
  }
  
  // Calculate scores for each founder
  const foundersWithScores: FounderEquity[] = coFounders.map(founder => {
    // Normalize capital (max score: 25 points)
    const totalCapital = coFounders.reduce((sum, f) => sum + f.capitalInvested, 0);
    const capitalScore = totalCapital > 0 
      ? (founder.capitalInvested / totalCapital) * 25 
      : 0;
    
    // Time commitment (max score: 25 points)
    const timeScore = (founder.timeCommitment / 100) * 25;
    
    // Role importance (max score: 25 points)
    const roleScore = (founder.roleImportance / 10) * 25;
    
    // IP contribution (max score: 25 points)
    const ipScore = (founder.ipContribution / 10) * 25;
    
    const totalScore = capitalScore + timeScore + roleScore + ipScore;
    
    return {
      name: founder.name,
      equityPercentage: 0, // Will be calculated below
      score: totalScore,
      breakdown: {
        capitalScore,
        timeScore,
        roleScore,
        ipScore,
      },
    };
  });
  
  // Calculate total score
  const totalScore = foundersWithScores.reduce((sum, f) => sum + f.score, 0);
  
  // Assign equity percentages
  foundersWithScores.forEach(founder => {
    founder.equityPercentage = totalScore > 0 ? (founder.score / totalScore) * 100 : 0;
  });
  
  // Generate recommendation
  const recommendation = foundersWithScores
    .map(f => `${f.name}: ${f.equityPercentage.toFixed(1)}%`)
    .join(', ');
  
  // Generate rationale
  const rationale = `This split is based on a weighted scoring system:\n` +
    `• Capital Invested (25%)\n` +
    `• Time Commitment (25%)\n` +
    `• Role Importance (25%)\n` +
    `• IP Contribution (25%)\n\n` +
    `This data-driven approach helps prevent future co-founder disputes by making the equity allocation transparent and fair.`;
  
  return {
    founders: foundersWithScores,
    totalScore,
    recommendation,
    rationale,
  };
}

/**
 * Calculate dilution from investment rounds
 */
export function calculateDilution(inputs: DilutionInputs): DilutionOutputs {
  const postMoneyValuation = inputs.preMoneyValuation + inputs.investmentAmount;
  
  // Calculate option pool dilution
  const optionPoolShares = (inputs.optionPoolSize / 100) * postMoneyValuation;
  
  // Calculate investor ownership
  const investorOwnership = (inputs.investmentAmount / postMoneyValuation) * 100;
  
  // Calculate new founder ownership after dilution
  const optionPoolDilution = inputs.optionPoolSize;
  const newOwnership = inputs.currentOwnership * (1 - investorOwnership / 100) * (1 - optionPoolDilution / 100);
  
  const dilutionPercentage = inputs.currentOwnership - newOwnership;
  
  // Project future rounds
  const futureRounds: FutureRoundProjection[] = [];
  let currentOwnership = newOwnership;
  let currentValuation = postMoneyValuation;
  
  const rounds = [
    { name: 'Series A', raiseMultiple: 3, valuationMultiple: 3 },
    { name: 'Series B', raiseMultiple: 4, valuationMultiple: 3 },
    { name: 'Series C', raiseMultiple: 5, valuationMultiple: 2.5 },
  ];
  
  for (const round of rounds) {
    const assumedRaise = inputs.investmentAmount * round.raiseMultiple;
    const assumedValuation = currentValuation * round.valuationMultiple;
    const roundDilution = (assumedRaise / (assumedValuation + assumedRaise)) * 100;
    
    currentOwnership = currentOwnership * (1 - roundDilution / 100);
    currentValuation = assumedValuation + assumedRaise;
    
    futureRounds.push({
      round: round.name,
      assumedRaise,
      assumedValuation,
      projectedOwnership: currentOwnership,
      cumulativeDilution: inputs.currentOwnership - currentOwnership,
    });
  }
  
  return {
    postMoneyValuation,
    newOwnership,
    dilutionPercentage,
    optionPoolImpact: optionPoolDilution,
    investorOwnership,
    futureRounds,
  };
}

// ============================================================================
// V. INVESTOR READINESS & VALUATION
// ============================================================================

/**
 * Berkus Method valuation
 */
function calculateBerkusValuation(inputs: ValuationInputs): BerkusValuation {
  // Berkus Method: Up to $500k per category (adjust based on stage)
  const maxPerCategory = inputs.fundingStage === 'Pre-Seed' ? 400000 : 500000;
  
  // Sound idea / Value proposition
  const soundIdea = maxPerCategory * 0.8; // Assume 80% if they're using this tool
  
  // Prototype / Product
  const prototype = inputs.mrr > 0 ? maxPerCategory : maxPerCategory * 0.5;
  
  // Quality management team
  const qualityTeam = maxPerCategory * 0.7; // Assume decent team
  
  // Strategic relationships
  const strategicRelationships = inputs.arr > 0 ? maxPerCategory * 0.6 : maxPerCategory * 0.3;
  
  // Product rollout / Sales
  const productRollout = Math.min(maxPerCategory, inputs.arr * 0.1);
  
  const totalValue = soundIdea + prototype + qualityTeam + strategicRelationships + productRollout;
  
  return {
    baseValue: maxPerCategory,
    soundIdea,
    prototype,
    qualityTeam,
    strategicRelationships,
    productRollout,
    totalValue,
    explanation: 'The Berkus Method evaluates pre-revenue companies across 5 key success factors.',
  };
}

/**
 * Revenue Multiple valuation
 */
function calculateRevenueMultiple(inputs: ValuationInputs): RevenueMultipleValuation {
  const benchmarks = getIndustryBenchmarks(inputs.industry);
  
  // Get base multiple range for stage
  let baseMultiple: number;
  switch (inputs.fundingStage) {
    case 'Pre-Seed':
      baseMultiple = (benchmarks.revenueMultiple.preSeed.low + benchmarks.revenueMultiple.preSeed.high) / 2;
      break;
    case 'Seed':
      baseMultiple = (benchmarks.revenueMultiple.seed.low + benchmarks.revenueMultiple.seed.high) / 2;
      break;
    case 'Series A':
    case 'Series B':
    case 'Series C+':
      baseMultiple = (benchmarks.revenueMultiple.seriesA.low + benchmarks.revenueMultiple.seriesA.high) / 2;
      break;
    default:
      baseMultiple = 5;
  }
  
  // Adjust multiple based on growth rate
  let growthAdjustment = 1;
  if (inputs.growthRate > 100) {
    growthAdjustment = 1.5; // High growth premium
  } else if (inputs.growthRate > 50) {
    growthAdjustment = 1.25;
  } else if (inputs.growthRate < 20) {
    growthAdjustment = 0.8; // Low growth discount
  }
  
  const multiple = baseMultiple * growthAdjustment;
  const valuation = inputs.arr * multiple;
  
  const multipleRationale = 
    `Applied ${multiple.toFixed(1)}x ARR multiple based on ${inputs.industry} industry benchmarks ` +
    `and ${inputs.growthRate}% growth rate. ${
      growthAdjustment > 1 
        ? 'Premium applied for high growth.' 
        : growthAdjustment < 1 
          ? 'Discount applied for slower growth.'
          : ''
    }`;
  
  return {
    arr: inputs.arr,
    multiple,
    valuation,
    multipleRationale,
  };
}

/**
 * Complete valuation estimate
 */
export function calculateValuation(inputs: ValuationInputs): ValuationOutputs {
  const berkusMethod = calculateBerkusValuation(inputs);
  const revenueMultiple = calculateRevenueMultiple(inputs);
  
  // Determine recommended range
  const low = Math.min(berkusMethod.totalValue * 0.8, revenueMultiple.valuation * 0.8);
  const high = Math.max(berkusMethod.totalValue * 1.2, revenueMultiple.valuation * 1.2);
  const mid = (low + high) / 2;
  
  // Generate narrative
  const narrative = generateValuationNarrative(inputs, berkusMethod, revenueMultiple, { low, mid, high });
  
  return {
    berkusMethod,
    revenueMultiple,
    recommendedRange: { low, mid, high },
    narrative,
  };
}

/**
 * Generate investor-ready valuation narrative
 */
function generateValuationNarrative(
  inputs: ValuationInputs,
  berkus: BerkusValuation,
  revenue: RevenueMultipleValuation,
  range: { low: number; mid: number; high: number }
): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  let narrative = `Based on comprehensive analysis, your company's estimated valuation ranges from ${formatter.format(range.low)} to ${formatter.format(range.high)}, `;
  narrative += `with a target valuation of ${formatter.format(range.mid)}.\n\n`;
  
  narrative += `**Valuation Rationale:**\n\n`;
  
  // Berkus Method insights
  if (inputs.arr === 0 || inputs.fundingStage === 'Pre-Seed') {
    narrative += `**Berkus Method (${formatter.format(berkus.totalValue)}):** `;
    narrative += `As a ${inputs.fundingStage} company, the Berkus Method evaluates your qualitative factors. `;
    narrative += `Strong scores in ${berkus.prototype >= berkus.baseValue * 0.8 ? 'product development' : 'team and idea validation'} `;
    narrative += `support this valuation.\n\n`;
  }
  
  // Revenue Multiple insights
  if (inputs.arr > 0) {
    narrative += `**Revenue Multiple (${formatter.format(revenue.valuation)}):** `;
    narrative += `With ${formatter.format(inputs.arr)} in ARR and ${inputs.growthRate}% annual growth, `;
    narrative += `the ${revenue.multiple.toFixed(1)}x multiple reflects `;
    
    if (inputs.growthRate > 100) {
      narrative += `exceptional hyper-growth that justifies a premium valuation. `;
    } else if (inputs.growthRate > 50) {
      narrative += `strong growth that warrants an above-market multiple. `;
    } else {
      narrative += `steady growth consistent with ${inputs.industry} industry standards. `;
    }
    narrative += `\n\n`;
  }
  
  // Key strengths
  narrative += `**Key Value Drivers:**\n`;
  narrative += `• ${inputs.industry} market positioning\n`;
  if (inputs.growthRate > 50) {
    narrative += `• High-growth trajectory (${inputs.growthRate}% YoY)\n`;
  }
  if (inputs.mrr > 0) {
    narrative += `• Recurring revenue model (${formatter.format(inputs.mrr * 12)} ARR)\n`;
  }
  narrative += `• ${inputs.fundingStage} stage with clear path to next milestone\n\n`;
  
  narrative += `This valuation positions you competitively for fundraising conversations with investors in the ${inputs.industry} sector.`;
  
  return narrative;
}

// ============================================================================
// VI. INDUSTRY BENCHMARKS
// ============================================================================

export function getIndustryBenchmarks(industry: IndustryType): IndustryBenchmarks {
  const benchmarks: Record<IndustryType, IndustryBenchmarks> = {
    'SaaS': {
      industry: 'SaaS',
      ltvCacRatio: { excellent: 5, good: 3, acceptable: 2 },
      nrr: { excellent: 120, good: 100, acceptable: 85 },
      revenueMultiple: {
        preSeed: { low: 3, high: 8 },
        seed: { low: 5, high: 12 },
        seriesA: { low: 8, high: 15 },
      },
    },
    'E-commerce': {
      industry: 'E-commerce',
      ltvCacRatio: { excellent: 4, good: 3, acceptable: 2 },
      nrr: { excellent: 110, good: 95, acceptable: 80 },
      revenueMultiple: {
        preSeed: { low: 2, high: 5 },
        seed: { low: 3, high: 7 },
        seriesA: { low: 4, high: 10 },
      },
    },
    'B2B Services': {
      industry: 'B2B Services',
      ltvCacRatio: { excellent: 4, good: 3, acceptable: 2 },
      nrr: { excellent: 115, good: 100, acceptable: 85 },
      revenueMultiple: {
        preSeed: { low: 2, high: 6 },
        seed: { low: 4, high: 8 },
        seriesA: { low: 6, high: 12 },
      },
    },
    'FinTech': {
      industry: 'FinTech',
      ltvCacRatio: { excellent: 5, good: 3, acceptable: 2 },
      nrr: { excellent: 125, good: 105, acceptable: 90 },
      revenueMultiple: {
        preSeed: { low: 4, high: 10 },
        seed: { low: 6, high: 15 },
        seriesA: { low: 10, high: 20 },
      },
    },
    'HealthTech': {
      industry: 'HealthTech',
      ltvCacRatio: { excellent: 5, good: 3, acceptable: 2 },
      nrr: { excellent: 120, good: 100, acceptable: 85 },
      revenueMultiple: {
        preSeed: { low: 3, high: 8 },
        seed: { low: 5, high: 12 },
        seriesA: { low: 8, high: 16 },
      },
    },
    'EdTech': {
      industry: 'EdTech',
      ltvCacRatio: { excellent: 4, good: 3, acceptable: 2 },
      nrr: { excellent: 115, good: 100, acceptable: 85 },
      revenueMultiple: {
        preSeed: { low: 3, high: 7 },
        seed: { low: 4, high: 10 },
        seriesA: { low: 6, high: 14 },
      },
    },
    'Marketplace': {
      industry: 'Marketplace',
      ltvCacRatio: { excellent: 4, good: 3, acceptable: 2 },
      nrr: { excellent: 110, good: 95, acceptable: 80 },
      revenueMultiple: {
        preSeed: { low: 3, high: 8 },
        seed: { low: 5, high: 12 },
        seriesA: { low: 8, high: 18 },
      },
    },
    'DeepTech': {
      industry: 'DeepTech',
      ltvCacRatio: { excellent: 5, good: 3, acceptable: 2 },
      nrr: { excellent: 120, good: 100, acceptable: 85 },
      revenueMultiple: {
        preSeed: { low: 4, high: 12 },
        seed: { low: 6, high: 18 },
        seriesA: { low: 10, high: 25 },
      },
    },
    'Consumer App': {
      industry: 'Consumer App',
      ltvCacRatio: { excellent: 3, good: 2, acceptable: 1.5 },
      nrr: { excellent: 105, good: 90, acceptable: 75 },
      revenueMultiple: {
        preSeed: { low: 2, high: 6 },
        seed: { low: 3, high: 10 },
        seriesA: { low: 5, high: 15 },
      },
    },
    'Enterprise Software': {
      industry: 'Enterprise Software',
      ltvCacRatio: { excellent: 6, good: 4, acceptable: 3 },
      nrr: { excellent: 125, good: 110, acceptable: 95 },
      revenueMultiple: {
        preSeed: { low: 4, high: 10 },
        seed: { low: 6, high: 15 },
        seriesA: { low: 10, high: 20 },
      },
    },
    'Other': {
      industry: 'Other',
      ltvCacRatio: { excellent: 4, good: 3, acceptable: 2 },
      nrr: { excellent: 110, good: 100, acceptable: 85 },
      revenueMultiple: {
        preSeed: { low: 2, high: 6 },
        seed: { low: 4, high: 10 },
        seriesA: { low: 6, high: 15 },
      },
    },
  };
  
  return benchmarks[industry] || benchmarks['Other'];
}

// ============================================================================
// VII. UTILITY FUNCTIONS
// ============================================================================

/**
 * Format currency values
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format percentage values
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format large numbers with abbreviations (K, M, B)
 */
export function formatNumber(value: number): string {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(1)}B`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return formatCurrency(value);
}
