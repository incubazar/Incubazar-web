/**
 * Example usage and test cases for the Venture Metric Calculator
 * Run with: npx ts-node lib/calculator/examples.ts
 */

import {
  calculateRunway,
  calculateWhatIf,
  calculateLTVCAC,
  generateSensitivityMatrix,
  calculateRetention,
  calculateEquitySplit,
  calculateDilution,
  calculateValuation,
  formatCurrency,
  formatPercentage,
  formatNumber,
} from './engine'

console.log('🚀 Venture Metric Calculator - Example Usage\n')

// ============================================================================
// EXAMPLE 1: Runway Calculation
// ============================================================================
console.log('📊 EXAMPLE 1: Cash Runway & Burn Rate')
console.log('─'.repeat(50))

const runwayExample = calculateRunway({
  cashInBank: 100000,
  monthlyRevenue: 10000,
  monthlyExpenses: {
    salaries: 20000,
    rent: 2000,
    software: 500,
    marketing: 5000,
    cogs: 2000,
    other: 500,
  },
})

console.log(`Cash in Bank: ${formatCurrency(100000)}`)
console.log(`Monthly Revenue: ${formatCurrency(10000)}`)
console.log(`Total Monthly Expenses: ${formatCurrency(runwayExample.totalMonthlyExpenses)}`)
console.log(`Net Burn Rate: ${formatCurrency(runwayExample.netBurnRate)}/month`)
console.log(`Runway: ${runwayExample.runwayMonths.toFixed(1)} months`)
console.log(`Status: ${runwayExample.runwayStatus.toUpperCase()}`)
console.log()

// ============================================================================
// EXAMPLE 2: What-If Scenario
// ============================================================================
console.log('🔮 EXAMPLE 2: What-If Scenario Analysis')
console.log('─'.repeat(50))

const whatIfExample = calculateWhatIf(
  {
    cashInBank: 100000,
    monthlyRevenue: 10000,
    monthlyExpenses: {
      salaries: 20000,
      rent: 2000,
      software: 500,
      marketing: 5000,
      cogs: 2000,
      other: 500,
    },
  },
  {
    type: 'revenue_change',
    description: 'Increase revenue by 50%',
    impact: 50,
    isPercentage: true,
  }
)

console.log('Scenario: Increase revenue by 50%')
console.log(`Current Runway: ${whatIfExample.baseline.runwayMonths.toFixed(1)} months`)
console.log(`New Runway: ${whatIfExample.scenario.runwayMonths.toFixed(1)} months`)
console.log(`Impact: +${whatIfExample.difference.toFixed(1)} months`)
console.log(`Recommendation: ${whatIfExample.recommendation}`)
console.log()

// ============================================================================
// EXAMPLE 3: LTV:CAC Calculation
// ============================================================================
console.log('💰 EXAMPLE 3: LTV:CAC Ratio')
console.log('─'.repeat(50))

const ltvCacExample = calculateLTVCAC(
  {
    arpu: 100,
    grossMargin: 70,
    avgCustomerLifespan: 24,
  },
  {
    totalSalesMarketingSpend: 10000,
    newCustomersAcquired: 20,
  }
)

console.log(`ARPU: ${formatCurrency(100)}/month`)
console.log(`Gross Margin: 70%`)
console.log(`Customer Lifespan: 24 months`)
console.log(`LTV: ${formatCurrency(ltvCacExample.ltv)}`)
console.log()
console.log(`Marketing Spend: ${formatCurrency(10000)}`)
console.log(`Customers Acquired: 20`)
console.log(`CAC: ${formatCurrency(ltvCacExample.cac)}`)
console.log()
console.log(`LTV:CAC Ratio: ${ltvCacExample.ratio.toFixed(2)}:1`)
console.log(`Rating: ${ltvCacExample.rating.toUpperCase()}`)
console.log(`Recommendation: ${ltvCacExample.recommendation}`)
console.log()

// ============================================================================
// EXAMPLE 4: Sensitivity Matrix (simplified)
// ============================================================================
console.log('📈 EXAMPLE 4: LTV:CAC Sensitivity Matrix')
console.log('─'.repeat(50))

const matrixExample = generateSensitivityMatrix(
  { arpu: 100, grossMargin: 70, avgCustomerLifespan: 24 },
  { totalSalesMarketingSpend: 10000, newCustomersAcquired: 20 },
  [-20, 0, 20], // CAC changes
  [-5, 0, 5] // Churn changes
)

console.log('Impact on LTV:CAC ratio:')
console.log('CAC →     -20%      0%     +20%')
console.log('Churn ↓')
matrixExample.results.forEach((row, i) => {
  const churn = matrixExample.churnChanges[i]
  const ratios = row.map(cell => cell.ratio.toFixed(2).padStart(6)).join('  ')
  console.log(`${churn > 0 ? '+' : ' '}${churn}%  ${ratios}`)
})
console.log()

// ============================================================================
// EXAMPLE 5: Net Revenue Retention
// ============================================================================
console.log('🔁 EXAMPLE 5: Net Revenue Retention')
console.log('─'.repeat(50))

const retentionExample = calculateRetention({
  startMRR: 100000,
  endMRR: 110000,
  expansion: 15000,
  contraction: 3000,
  churn: 2000,
})

console.log(`Starting MRR: ${formatCurrency(100000)}`)
console.log(`Ending MRR: ${formatCurrency(110000)}`)
console.log(`NRR: ${formatPercentage(retentionExample.nrr, 1)}`)
console.log(`Status: ${retentionExample.status.toUpperCase()}`)
console.log(`Benchmark: ${retentionExample.benchmark}`)
console.log()

// ============================================================================
// EXAMPLE 6: Co-Founder Equity Split
// ============================================================================
console.log('🤝 EXAMPLE 6: Co-Founder Equity Split')
console.log('─'.repeat(50))

const equitySplitExample = calculateEquitySplit([
  {
    name: 'Alice (CEO)',
    capitalInvested: 50000,
    timeCommitment: 100,
    roleImportance: 10,
    ipContribution: 8,
  },
  {
    name: 'Bob (CTO)',
    capitalInvested: 30000,
    timeCommitment: 100,
    roleImportance: 9,
    ipContribution: 10,
  },
  {
    name: 'Carol (CMO)',
    capitalInvested: 20000,
    timeCommitment: 80,
    roleImportance: 7,
    ipContribution: 3,
  },
])

console.log('Recommended Equity Split:')
equitySplitExample.founders.forEach(founder => {
  console.log(`${founder.name}: ${formatPercentage(founder.equityPercentage, 1)}`)
  console.log(`  Capital: ${founder.breakdown.capitalScore.toFixed(1)} pts`)
  console.log(`  Time: ${founder.breakdown.timeScore.toFixed(1)} pts`)
  console.log(`  Role: ${founder.breakdown.roleScore.toFixed(1)} pts`)
  console.log(`  IP: ${founder.breakdown.ipScore.toFixed(1)} pts`)
})
console.log()

// ============================================================================
// EXAMPLE 7: Dilution Forecast
// ============================================================================
console.log('📉 EXAMPLE 7: Fundraising Dilution')
console.log('─'.repeat(50))

const dilutionExample = calculateDilution({
  currentOwnership: 100,
  preMoneyValuation: 4000000,
  investmentAmount: 1000000,
  optionPoolSize: 15,
})

console.log(`Pre-Money Valuation: ${formatNumber(4000000)}`)
console.log(`Investment: ${formatNumber(1000000)}`)
console.log(`Post-Money Valuation: ${formatNumber(dilutionExample.postMoneyValuation)}`)
console.log()
console.log(`Your Ownership: ${formatPercentage(dilutionExample.newOwnership, 1)}`)
console.log(`Dilution: ${formatPercentage(dilutionExample.dilutionPercentage, 1)}`)
console.log(`Investor Ownership: ${formatPercentage(dilutionExample.investorOwnership, 1)}`)
console.log()
console.log('Future Rounds Projection:')
dilutionExample.futureRounds.forEach(round => {
  console.log(
    `${round.round}: ${formatPercentage(round.projectedOwnership, 1)} ` +
    `(${formatNumber(round.assumedRaise)} raise at ${formatNumber(round.assumedValuation)})`
  )
})
console.log()

// ============================================================================
// EXAMPLE 8: Startup Valuation
// ============================================================================
console.log('💎 EXAMPLE 8: Startup Valuation')
console.log('─'.repeat(50))

const valuationExample = calculateValuation({
  arr: 500000,
  mrr: 41667,
  growthRate: 120,
  industry: 'SaaS',
  fundingStage: 'Seed',
})

console.log(`Industry: SaaS`)
console.log(`ARR: ${formatCurrency(500000)}`)
console.log(`Growth Rate: 120%`)
console.log(`Stage: Seed`)
console.log()
console.log('Berkus Method:')
console.log(`  Total Valuation: ${formatNumber(valuationExample.berkusMethod.totalValue)}`)
console.log()
console.log('Revenue Multiple:')
console.log(`  Multiple: ${valuationExample.revenueMultiple.multiple.toFixed(1)}x`)
console.log(`  Valuation: ${formatNumber(valuationExample.revenueMultiple.valuation)}`)
console.log()
console.log('Recommended Range:')
console.log(`  Low:    ${formatNumber(valuationExample.recommendedRange.low)}`)
console.log(`  Target: ${formatNumber(valuationExample.recommendedRange.mid)}`)
console.log(`  High:   ${formatNumber(valuationExample.recommendedRange.high)}`)
console.log()

// ============================================================================
// SUMMARY
// ============================================================================
console.log('✅ All Examples Completed!')
console.log('─'.repeat(50))
console.log()
console.log('💡 Key Takeaways:')
console.log('1. Runway calculation helps manage cash flow')
console.log('2. What-if scenarios enable proactive planning')
console.log('3. LTV:CAC ratio measures customer profitability')
console.log('4. Sensitivity analysis identifies optimization levers')
console.log('5. NRR tracks revenue retention quality')
console.log('6. Fair equity splits prevent founder disputes')
console.log('7. Dilution forecasting aids fundraising planning')
console.log('8. Valuation estimates support investor conversations')
console.log()
console.log('🚀 Start using the calculator at: /founder/calculator')
