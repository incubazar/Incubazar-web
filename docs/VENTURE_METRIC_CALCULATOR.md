# Venture Metric: The Integrated Founder's Calculator

## Overview

Venture Metric is a comprehensive, interactive financial calculator designed specifically for early-stage startup founders. It serves as a strategic financial co-pilot, providing data-driven insights across four critical areas: financial runway, unit economics, equity management, and valuation.

## Features

### 1. **Strategic Financial Planning (Runway & Survival)**

#### Runway Calculator
- **Inputs:**
  - Cash in Bank
  - Monthly Revenue
  - Itemized Monthly Expenses (Salaries, Rent, Software, Marketing, COGS, Other)

- **Outputs:**
  - Net Burn Rate ($/month)
  - Runway in Months
  - Cash at Risk Date
  - 18-Month Cash Flow Projection (Interactive Chart)
  - Status Indicator (Healthy >6mo, Warning 3-6mo, Critical <3mo)

#### What-If Scenario Tool
- Model changes in revenue or expenses
- See immediate impact on runway
- Scenario types:
  - Revenue Change
  - Expense Change
  - New Hire
  - Cost Reduction
- Dynamic visualization of scenario impact

### 2. **Customer & Unit Economics**

#### LTV:CAC Ratio Calculator
- **Inputs:**
  - Average Revenue Per User (ARPU)
  - Gross Margin (%)
  - Average Customer Lifespan (months)
  - Total Sales & Marketing Spend
  - New Customers Acquired

- **Outputs:**
  - Lifetime Value (LTV)
  - Customer Acquisition Cost (CAC)
  - LTV:CAC Ratio with qualitative rating
  - Payback Period
  - Monthly & Total Profit per Customer

#### LTV:CAC Sensitivity Matrix
- Interactive grid showing impact of CAC and churn changes
- Visual color-coding for different ratio ranges
- Identifies most impactful levers for optimization

#### Net Revenue Retention (NRR)
- Measures revenue retention from existing customers
- Industry benchmark comparisons
- Status indicators (Excellent >120%, Good 100-120%)

### 3. **Equity & Ownership Management**

#### Co-Founder Equity Split Calculator
- **Weighted Scoring System (100 points total):**
  - Capital Invested (25 points)
  - Time Commitment (25 points)
  - Role Importance (25 points)
  - IP Contribution (25 points)

- **Outputs:**
  - Recommended equity percentage for each founder
  - Detailed score breakdown
  - Visual bar chart comparison
  - Transparent rationale to prevent disputes

#### Dilution Forecaster
- **Inputs:**
  - Current Ownership (%)
  - Pre-Money Valuation
  - Investment Amount
  - Option Pool Size (%)

- **Outputs:**
  - Post-Money Valuation
  - New Ownership Percentage
  - Dilution Percentage
  - Investor Ownership
  - Future Rounds Projection (Series A, B, C)
  - Cumulative dilution forecast

### 4. **Investor Readiness & Valuation**

#### Valuation Estimator
Uses two industry-standard methodologies:

**Berkus Method** (Pre-revenue/early-stage)
- Sound Idea/Value Proposition
- Prototype/Product
- Quality Management Team
- Strategic Relationships
- Product Rollout/Sales
- Up to $500k per factor

**Revenue Multiple Method**
- Industry-specific ARR multiples
- Growth rate adjustments
- Funding stage considerations
- Ranges: Pre-Seed, Seed, Series A+

#### Valuation Narrative Generator
- Generates investor-ready explanation
- Links valuation to strongest metrics
- Provides market context
- Includes fundraising best practices

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI Components:** Radix UI + Custom Components
- **Styling:** Tailwind CSS (Editorial/Monochrome Design System)
- **Charts:** Recharts
- **State Management:** React Hooks (useState, useEffect)
- **Type Safety:** Comprehensive TypeScript interfaces

## File Structure

```
app/founder/calculator/
  └── page.tsx                    # Main calculator route

components/calculator/
  ├── index.ts                    # Export barrel
  ├── CompanySetup.tsx            # Initial company profile setup
  ├── CalculatorDashboard.tsx     # Overview dashboard with all metrics
  ├── RunwayCalculator.tsx        # Runway & burn rate calculator
  ├── UnitEconomicsCalculator.tsx # LTV:CAC and retention metrics
  ├── EquityCalculator.tsx        # Equity split and dilution tools
  ├── ValuationCalculator.tsx     # Valuation estimation
  └── TooltipInfo.tsx             # Reusable tooltip component

lib/calculator/
  └── engine.ts                   # Core calculation functions

lib/types/
  └── calculator.ts               # TypeScript type definitions
```

## Calculation Formulas

### Runway Calculations
```typescript
Net Burn Rate = Total Monthly Expenses - Monthly Revenue
Runway (months) = Cash in Bank / Net Burn Rate
```

### LTV:CAC Calculations
```typescript
LTV = ARPU × Customer Lifespan × (Gross Margin / 100)
CAC = Total Sales & Marketing Spend / New Customers Acquired
LTV:CAC Ratio = LTV / CAC

Payback Period (months) = CAC / (ARPU × Gross Margin%)
```

### Net Revenue Retention
```typescript
NRR = (Ending MRR / Starting MRR) × 100
```

### Equity Split
```typescript
Score per founder = Capital Score (25) + Time Score (25) + Role Score (25) + IP Score (25)
Equity % = (Founder Score / Total Scores) × 100
```

### Dilution
```typescript
Post-Money Valuation = Pre-Money + Investment
Investor Ownership = Investment / Post-Money × 100
New Founder Ownership = Current Ownership × (1 - Investor%) × (1 - Option Pool%)
```

### Valuation
**Revenue Multiple:**
```typescript
Valuation = ARR × Industry Multiple × Growth Adjustment
```

**Berkus Method:**
```typescript
Valuation = Σ(5 factors × up to $500k each)
```

## Industry Benchmarks

### LTV:CAC Ratios
- **SaaS:** 5:1 excellent, 3:1 good
- **E-commerce:** 4:1 excellent, 3:1 good
- **FinTech:** 5:1 excellent, 3:1 good

### Revenue Multiples (Seed Stage)
- **SaaS:** 5-12x ARR
- **FinTech:** 6-15x ARR
- **E-commerce:** 3-7x ARR
- **B2B Services:** 4-8x ARR

### Net Revenue Retention
- **Excellent:** >120%
- **Good:** 100-120%
- **Needs Improvement:** 85-100%
- **Critical:** <85%

## User Experience Features

### Interactive Elements
- Real-time calculations
- Dynamic charts and visualizations
- Color-coded status indicators
- What-if scenario modeling
- Sensitivity analysis matrices

### Educational Tooltips
Every key metric includes:
- Clear definition
- Industry benchmark
- Practical example
- Best practices

### Visual Design
- Monochrome editorial design system
- Clear typography hierarchy
- Responsive layouts
- Accessible color contrasts
- Smooth animations and transitions

## Usage Example

1. **Initial Setup:** Enter company basics (name, industry, cash, revenue)
2. **Calculate Runway:** Input monthly expenses to see burn rate and runway
3. **Model Scenarios:** Use what-if tool to test revenue/expense changes
4. **Analyze Unit Economics:** Calculate LTV:CAC and identify optimization levers
5. **Plan Equity:** Fair co-founder splits with transparent methodology
6. **Forecast Dilution:** Model ownership changes across funding rounds
7. **Estimate Valuation:** Get investor-ready valuation range with rationale

## Validation & Testing

### Unit Tests (Recommended)
```typescript
// Example test structure
describe('calculateRunway', () => {
  it('should calculate correct runway months', () => {
    const result = calculateRunway({
      cashInBank: 100000,
      monthlyRevenue: 10000,
      monthlyExpenses: { /* ... */ }
    })
    expect(result.runwayMonths).toBe(5)
  })
})
```

## Deployment

The calculator is fully integrated into the Incubazar founder dashboard at:
- Route: `/founder/calculator`
- Protected: Requires founder authentication
- Standalone: Can be accessed directly from founder dashboard

## Future Enhancements

1. **Data Persistence:** Save calculations to database
2. **Export Functionality:** Download reports as PDF
3. **Historical Tracking:** Track metrics over time
4. **Investor Sharing:** Share specific metrics with investors
5. **Industry Comparison:** Benchmark against similar companies
6. **AI Recommendations:** ML-powered optimization suggestions

## Best Practices

### For Founders
- Update metrics monthly for accurate tracking
- Use what-if scenarios for planning
- Save baseline before modeling changes
- Share valuation narrative with advisors
- Review equity split with legal counsel

### For Development
- Keep calculation logic pure and testable
- Maintain comprehensive type definitions
- Add unit tests for all formulas
- Document complex calculations
- Follow existing design patterns

## Support

For questions or issues:
1. Check inline tooltips for metric explanations
2. Review this README for detailed documentation
3. Contact Incubazar support team

## License

Proprietary - Part of the Incubazar platform
© 2025 Incubazar. All rights reserved.
