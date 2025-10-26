// Venture Metric Calculator Type Definitions
// Integrated Founder's Financial Co-Pilot

// ============================================================================
// I. CORE DATA MANAGEMENT & SETUP
// ============================================================================

export interface CompanyBasics {
  companyName: string;
  industry: IndustryType;
  foundingDate: string;
  cashInBank: number;
  monthlyRevenue: number;
  teamSize: number;
}

export type IndustryType = 
  | 'SaaS'
  | 'E-commerce'
  | 'B2B Services'
  | 'FinTech'
  | 'HealthTech'
  | 'EdTech'
  | 'Marketplace'
  | 'DeepTech'
  | 'Consumer App'
  | 'Enterprise Software'
  | 'Other';

// ============================================================================
// II. STRATEGIC FINANCIAL PLANNING (RUNWAY & SURVIVAL)
// ============================================================================

export interface MonthlyExpenses {
  salaries: number;
  rent: number;
  software: number;
  marketing: number;
  cogs: number; // Cost of Goods Sold
  other: number;
}

export interface RunwayInputs {
  cashInBank: number;
  monthlyRevenue: number;
  monthlyExpenses: MonthlyExpenses;
}

export interface RunwayOutputs {
  totalMonthlyExpenses: number;
  netBurnRate: number;
  runwayMonths: number;
  runwayStatus: 'critical' | 'warning' | 'healthy';
  projectionData: MonthlyProjection[];
}

export interface MonthlyProjection {
  month: number;
  cash: number;
  revenue: number;
  expenses: number;
  netBurn: number;
}

export interface WhatIfScenario {
  type: 'expense_change' | 'revenue_change' | 'new_hire' | 'cost_reduction';
  description: string;
  impact: number; // dollar amount or percentage
  isPercentage: boolean;
}

export interface WhatIfResults {
  baseline: RunwayOutputs;
  scenario: RunwayOutputs;
  difference: number; // in months
  recommendation: string;
}

// ============================================================================
// III. CUSTOMER & UNIT ECONOMICS
// ============================================================================

export interface LTVInputs {
  arpu: number; // Average Revenue Per User (monthly)
  grossMargin: number; // percentage (0-100)
  avgCustomerLifespan: number; // in months
}

export interface CACInputs {
  totalSalesMarketingSpend: number;
  newCustomersAcquired: number;
}

export interface LTVCACOutputs {
  ltv: number;
  cac: number;
  ratio: number;
  rating: 'strong' | 'good' | 'needs-improvement' | 'critical';
  recommendation: string;
}

export interface SensitivityMatrix {
  cacChanges: number[]; // e.g., [-20, -10, 0, 10, 20]
  churnChanges: number[]; // e.g., [-5, -2.5, 0, 2.5, 5]
  results: SensitivityCell[][];
}

export interface SensitivityCell {
  cacChange: number;
  churnChange: number;
  ltv: number;
  cac: number;
  ratio: number;
  rating: 'strong' | 'good' | 'needs-improvement' | 'critical';
}

export interface RetentionInputs {
  startMRR: number;
  endMRR: number;
  expansion: number;
  contraction: number;
  churn: number;
}

export interface RetentionOutputs {
  nrr: number; // Net Revenue Retention percentage
  status: 'excellent' | 'good' | 'needs-improvement' | 'critical';
  benchmark: string;
}

// ============================================================================
// IV. EQUITY & OWNERSHIP MANAGEMENT
// ============================================================================

export interface CoFounder {
  name: string;
  capitalInvested: number;
  timeCommitment: number; // percentage 0-100
  roleImportance: number; // 1-10 scale
  ipContribution: number; // 1-10 scale
}

export interface EquitySplitOutputs {
  founders: FounderEquity[];
  totalScore: number;
  recommendation: string;
  rationale: string;
}

export interface FounderEquity {
  name: string;
  equityPercentage: number;
  score: number;
  breakdown: {
    capitalScore: number;
    timeScore: number;
    roleScore: number;
    ipScore: number;
  };
}

export interface DilutionInputs {
  currentOwnership: number; // percentage
  preMoneyValuation: number;
  investmentAmount: number;
  optionPoolSize: number; // percentage
}

export interface DilutionOutputs {
  postMoneyValuation: number;
  newOwnership: number;
  dilutionPercentage: number;
  optionPoolImpact: number;
  investorOwnership: number;
  futureRounds: FutureRoundProjection[];
}

export interface FutureRoundProjection {
  round: string;
  assumedRaise: number;
  assumedValuation: number;
  projectedOwnership: number;
  cumulativeDilution: number;
}

// ============================================================================
// V. INVESTOR READINESS & VALUATION
// ============================================================================

export interface ValuationInputs {
  arr: number; // Annual Recurring Revenue
  mrr: number; // Monthly Recurring Revenue
  growthRate: number; // percentage
  industry: IndustryType;
  fundingStage: FundingStage;
}

export type FundingStage = 
  | 'Pre-Seed'
  | 'Seed'
  | 'Series A'
  | 'Series B'
  | 'Series C+';

export interface ValuationOutputs {
  berkusMethod: BerkusValuation;
  revenueMultiple: RevenueMultipleValuation;
  recommendedRange: {
    low: number;
    mid: number;
    high: number;
  };
  narrative: string;
}

export interface BerkusValuation {
  baseValue: number;
  soundIdea: number;
  prototype: number;
  qualityTeam: number;
  strategicRelationships: number;
  productRollout: number;
  totalValue: number;
  explanation: string;
}

export interface RevenueMultipleValuation {
  arr: number;
  multiple: number;
  valuation: number;
  multipleRationale: string;
}

// ============================================================================
// VI. CALCULATOR STATE MANAGEMENT
// ============================================================================

export interface CalculatorState {
  companyBasics: CompanyBasics;
  runway: RunwayInputs;
  unitEconomics: {
    ltv: LTVInputs;
    cac: CACInputs;
    retention: RetentionInputs;
  };
  equity: {
    coFounders: CoFounder[];
    dilution: DilutionInputs;
  };
  valuation: ValuationInputs;
}

export interface CalculatorResults {
  runway: RunwayOutputs | null;
  ltvCac: LTVCACOutputs | null;
  retention: RetentionOutputs | null;
  equitySplit: EquitySplitOutputs | null;
  dilution: DilutionOutputs | null;
  valuation: ValuationOutputs | null;
}

// ============================================================================
// VII. INDUSTRY BENCHMARKS & CONSTANTS
// ============================================================================

export interface IndustryBenchmarks {
  industry: IndustryType;
  ltvCacRatio: {
    excellent: number;
    good: number;
    acceptable: number;
  };
  nrr: {
    excellent: number;
    good: number;
    acceptable: number;
  };
  revenueMultiple: {
    preSeed: { low: number; high: number };
    seed: { low: number; high: number };
    seriesA: { low: number; high: number };
  };
}

// ============================================================================
// VIII. UTILITY TYPES
// ============================================================================

export type CalculatorTab = 
  | 'dashboard'
  | 'runway'
  | 'unit-economics'
  | 'equity'
  | 'valuation';

export interface TooltipContent {
  term: string;
  definition: string;
  benchmark?: string;
  example?: string;
}
