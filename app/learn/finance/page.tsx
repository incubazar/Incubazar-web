'use client';

import LearnLayout from '@/components/learn/LearnLayout';
import {
  ArticleSpread,
  ArticleHeader,
  ArticleSection,
  ArticleText,
  CalloutBox,
  Checklist,
  DataTable,
  References,
  InlineCitation,
  PullQuote
} from '@/components/learn/ArticleComponents';
import Link from 'next/link';
import { Download, ArrowRight, Calculator } from 'lucide-react';

const citations = [
  {
    id: 'nvca-model-docs',
    number: 1,
    source: 'NVCA Model Legal Documents - National Venture Capital Association',
    url: 'https://nvca.org/model-legal-documents/',
    date: 'October 2024'
  },
  {
    id: 'yc-safe',
    number: 2,
    source: 'SAFE (Simple Agreement for Future Equity) - Y Combinator',
    url: 'https://www.ycombinator.com/documents',
    date: 'October 2024'
  },
  {
    id: 'sebi-angel-guidelines',
    number: 3,
    source: 'SEBI (Issue of Capital and Disclosure Requirements) Regulations, 2018',
    url: 'https://www.sebi.gov.in/legal/regulations/sep-2018/sebi-issue-of-capital-and-disclosure-requirements-regulations-2018-last-amended-on-september-11-2018-_40317.html',
    date: 'September 2024'
  },
  {
    id: 'cbinsights-funding',
    number: 4,
    source: 'Global Venture Funding Report 2024 - CB Insights',
    url: 'https://www.cbinsights.com/research/report/venture-trends-2024/',
    date: 'August 2024'
  },
  {
    id: 'sequoia-cap-table',
    number: 5,
    source: 'Cap Table and Hiring - Sequoia Capital',
    url: 'https://www.sequoiacap.com/article/planning-your-startups-employee-equity/',
    date: 'October 2024'
  },
  {
    id: 'firstround-unit-economics',
    number: 6,
    source: 'Unit Economics: A Guide to Understanding Startup Metrics - First Round Review',
    url: 'https://review.firstround.com/the-most-important-metrics-for-saas-companies',
    date: 'September 2024'
  },
  {
    id: 'carta-dilution',
    number: 7,
    source: 'Equity Dilution: How It Works - Carta',
    url: 'https://carta.com/learn/equity/dilution/',
    date: 'October 2024'
  }
];

export default function FinancePage() {
  return (
    <LearnLayout>
      <ArticleSpread>
        <ArticleHeader
          category="Foundation"
          title="Finance, Funding & Cap Tables"
          subtitle="Master startup funding stages, equity structures, unit economics, and investor due diligence from pre-seed to Series C."
          readTime={55}
          level="intermediate"
        />

        {/* Introduction */}
        <ArticleSection>
          <ArticleText>
            Raising capital is one of the most critical—and misunderstood—aspects of building a 
            startup. Most founders obsess over valuations and funding amounts, but the real game 
            is understanding dilution, unit economics, and building a sustainable business model 
            that investors can&apos;t resist.
          </ArticleText>

          <ArticleText>
            This comprehensive guide covers everything from pre-seed bootstrapping to Series C+ 
            institutional rounds, with practical frameworks, cap table examples, and real-world 
            metrics that drive investment decisions.
          </ArticleText>

          <PullQuote
            quote="Don't raise money because you can. Raise money because you must — because the capital will meaningfully accelerate your path to product-market fit."
            citation="Common wisdom from top-tier VCs"
          />
        </ArticleSection>

        {/* Funding Stages */}
        <ArticleSection heading="1. Startup Funding Stages: The Complete Journey">
          <ArticleText>
            Every funding stage has different expectations, typical check sizes, and dilution 
            ranges. Understanding where you are—and what investors expect—is critical.
          </ArticleText>

          <div className="my-8">
            <DataTable
              headers={['Stage', 'Typical Raise', 'Valuation Range', 'Dilution', 'What Investors Want']}
              rows={[
                [
                  'Bootstrapping',
                  'Self-funded',
                  'N/A',
                  '0%',
                  'Proof of concept, early traction'
                ],
                [
                  'Pre-Seed',
                  '$100K - $500K',
                  '$1M - $3M',
                  '10-20%',
                  'Working product, initial users, founding team'
                ],
                [
                  'Seed',
                  '$500K - $2M',
                  '$3M - $10M',
                  '15-25%',
                  'Product-market fit signals, growth metrics, clear GTM'
                ],
                [
                  'Series A',
                  '$2M - $15M',
                  '$10M - $50M',
                  '20-30%',
                  'Proven PMF, $1M+ ARR (SaaS), strong unit economics'
                ],
                [
                  'Series B',
                  '$10M - $50M',
                  '$30M - $150M',
                  '15-25%',
                  'Scaling proven model, $5M+ ARR, path to profitability'
                ],
                [
                  'Series C+',
                  '$30M - $100M+',
                  '$100M - $500M+',
                  '10-20%',
                  'Market leadership, $20M+ ARR, international expansion'
                ],
              ]}
              caption="Funding stages overview (CB Insights Global Venture Report 2024)"
            />
          </div>

          <CalloutBox type="info" title="India vs USA: Key Differences">
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-ink mb-1">India (2024 Market Conditions)</h5>
                <ul className="space-y-1 text-sm">
                  <li>• Pre-seed: ₹50L - ₹2Cr (angel investors, micro VCs)</li>
                  <li>• Seed: ₹2Cr - ₹10Cr (early-stage VCs like Blume, Chiratae)</li>
                  <li>• Series A: ₹10Cr - ₹50Cr (Sequoia India, Accel, Lightspeed)</li>
                  <li>• Typical dilution 5-10% lower than US due to smaller check sizes</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-ink mb-1">USA (Silicon Valley Benchmarks)</h5>
                <ul className="space-y-1 text-sm">
                  <li>• Higher valuations but also higher burn expectations</li>
                  <li>• More competitive fundraising (1-2% of applicants get funded)</li>
                  <li>• Stronger emphasis on YoY growth rates (3x+)</li>
                </ul>
              </div>
            </div>
          </CalloutBox>

          <div className="my-12">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              When to Raise Each Round
            </h4>
            
            <div className="space-y-4">
              <div className="border-l-4 border-ink pl-6">
                <h5 className="font-semibold text-ink text-lg mb-2">Pre-Seed: Prove the Idea</h5>
                <p className="text-graphite-800 mb-2">
                  <strong>Raise when:</strong> You have a working MVP, 100-1,000 early users, 
                  or clear validation that your solution solves a real problem.
                </p>
                <p className="text-sm text-graphite-600">
                  <strong>Use funds for:</strong> Product development, first hires (engineer + designer), 
                  early customer acquisition experiments.
                </p>
              </div>

              <div className="border-l-4 border-graphite-600 pl-6">
                <h5 className="font-semibold text-ink text-lg mb-2">Seed: Prove the Market</h5>
                <p className="text-graphite-800 mb-2">
                  <strong>Raise when:</strong> You have strong product-market fit signals — users 
                  love your product, retention is strong (40%+ Month 1), and you&apos;re seeing organic 
                  growth.
                </p>
                <p className="text-sm text-graphite-600">
                  <strong>Use funds for:</strong> Scaling GTM, hiring sales/marketing, product 
                  iteration based on feedback, building repeatable customer acquisition.
                </p>
              </div>

              <div className="border-l-4 border-graphite-600 pl-6">
                <h5 className="font-semibold text-ink text-lg mb-2">Series A: Prove the Model</h5>
                <p className="text-graphite-800 mb-2">
                  <strong>Raise when:</strong> You've crossed $1M ARR (SaaS), have CAC payback 
                  under 12 months, LTV:CAC ratio above 3:1, and a clear path to $10M ARR.
                </p>
                <p className="text-sm text-graphite-600">
                  <strong>Use funds for:</strong> Aggressive scaling, team expansion (10-30 people), 
                  new market entry, building moats (tech, brand, network effects).
                </p>
              </div>

              <div className="border-l-4 border-graphite-600 pl-6">
                <h5 className="font-semibold text-ink text-lg mb-2">Series B+: Prove the Scale</h5>
                <p className="text-graphite-800 mb-2">
                  <strong>Raise when:</strong> You're a category leader with $5M+ ARR, strong 
                  unit economics, and ready to dominate the market or expand internationally.
                </p>
                <p className="text-sm text-graphite-600">
                  <strong>Use funds for:</strong> Market domination, acquisitions, international 
                  expansion, building enterprise sales teams, scaling infrastructure.
                </p>
              </div>
            </div>
          </div>
        </ArticleSection>

        {/* Equity vs Debt vs Revenue-Based */}
        <ArticleSection heading="2. Equity vs Debt vs Revenue-Based Financing">
          <ArticleText>
            Not all capital is created equal. The type of financing you choose determines ownership, 
            control, repayment obligations, and your relationship with funders.
          </ArticleText>

          <div className="my-8">
            <DataTable
              headers={['Type', 'How It Works', 'Pros', 'Cons', 'Best For']}
              rows={[
                [
                  'Equity (VC/Angel)',
                  'Sell company shares for capital',
                  'No repayment, expert advice, network access',
                  'Dilution, loss of control, exit pressure',
                  'High-growth startups aiming for $100M+ exit'
                ],
                [
                  'Debt (Bank Loan)',
                  'Borrow money, repay with interest',
                  'No dilution, retain full ownership',
                  'Monthly payments, collateral required, personal guarantee',
                  'Established businesses with revenue & assets'
                ],
                [
                  'Revenue-Based Financing',
                  'Repay % of monthly revenue until cap',
                  'No dilution, flexible payments (scales with revenue)',
                  'Higher effective interest (12-20%), not for early stage',
                  'SaaS with $50K+ MRR, predictable revenue'
                ],
                [
                  'Convertible Note',
                  'Short-term debt → converts to equity later',
                  'Fast to close, delays valuation discussion',
                  'Discount & cap complicate future rounds',
                  'Pre-seed/seed when valuation is uncertain'
                ],
                [
                  'SAFE',
                  'Future equity without debt or interest',
                  'Simple, founder-friendly, no repayment',
                  'Dilution ambiguity, less investor-friendly than notes',
                  'Y Combinator startups, fast fundraising'
                ],
              ]}
              caption="Financing instruments comparison (NVCA Model Docs 2024)"
            />
          </div>

          <div className="my-12">
            <h4 className="font-serif text-2xl font-bold text-ink mb-6">
              Deep Dive: Convertible Notes vs SAFE
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border-2 border-ink bg-graphite-50">
                <h5 className="font-serif text-xl font-bold text-ink mb-4">
                  Convertible Note
                </h5>
                <div className="space-y-3 text-sm">
                  <div>
                    <h6 className="font-semibold text-ink mb-1">How It Works</h6>
                    <p className="text-graphite-800">
                      Short-term debt (12-24 months) that converts to equity in your next 
                      priced round. Includes interest rate (typically 5-8%).
                    </p>
                  </div>
                  <div>
                    <h6 className="font-semibold text-ink mb-1">Key Terms</h6>
                    <ul className="space-y-1 text-graphite-800">
                      <li>• <strong>Discount:</strong> 15-25% off next round valuation</li>
                      <li>• <strong>Valuation Cap:</strong> Maximum conversion valuation</li>
                      <li>• <strong>Interest Rate:</strong> 5-8% annually</li>
                      <li>• <strong>Maturity Date:</strong> When note must convert or repay</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-semibold text-ink mb-1">Best For</h6>
                    <p className="text-graphite-800">
                      India market (more common than SAFE), traditional investors who want 
                      debt protections.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-2 border-ink bg-ink text-paper">
                <h5 className="font-serif text-xl font-bold mb-4">
                  SAFE (Simple Agreement for Future Equity)
                </h5>
                <div className="space-y-3 text-sm">
                  <div>
                    <h6 className="font-semibold mb-1">How It Works</h6>
                    <p className="text-graphite-200">
                      Not debt — just a promise of future equity. No interest, no maturity 
                      date. Converts in next priced round or liquidity event<InlineCitation number={2} id="yc-safe" />.
                    </p>
                  </div>
                  <div>
                    <h6 className="font-semibold mb-1">Key Terms</h6>
                    <ul className="space-y-1 text-graphite-200">
                      <li>• <strong>Discount:</strong> 10-20% off next round (optional)</li>
                      <li>• <strong>Valuation Cap:</strong> Maximum conversion valuation</li>
                      <li>• <strong>No Interest:</strong> Cleaner for founders</li>
                      <li>• <strong>No Maturity:</strong> No repayment obligation</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-semibold mb-1">Best For</h6>
                    <p className="text-graphite-200">
                      Y Combinator startups, Silicon Valley angels, fast fundraising when 
                      valuation is hard to determine.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <CalloutBox type="warning" title="India Legal Note">
              <p>
                <strong>SAFE is NOT legally recognized in India</strong> under current SEBI/RBI 
                regulations<InlineCitation number={3} id="sebi-angel-guidelines" />. Indian startups 
                should use Convertible Notes or Compulsorily Convertible Debentures (CCDs) for 
                bridge financing.
              </p>
            </CalloutBox>
          </div>
        </ArticleSection>

        {/* Cap Tables */}
        <ArticleSection heading="3. Cap Tables: Understanding Equity & Dilution">
          <ArticleText>
            Your cap table (capitalization table) is the single source of truth for who owns 
            what percentage of your company. Mismanaging it early can cost you millions in 
            lost equity or create legal nightmares.
          </ArticleText>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Cap Table Example: Seed to Series A
            </h4>

            <div className="space-y-6">
              <div>
                <h5 className="font-semibold text-ink text-lg mb-3">
                  Stage 1: Post-Incorporation (Founding Team)
                </h5>
                <DataTable
                  headers={['Shareholder', 'Shares', 'Ownership %', 'Notes']}
                  rows={[
                    ['Founder 1 (CEO)', '6,000,000', '60%', '4-year vesting, 1-year cliff'],
                    ['Founder 2 (CTO)', '3,000,000', '30%', '4-year vesting, 1-year cliff'],
                    ['Co-founder 3 (CPO)', '1,000,000', '10%', '4-year vesting, 1-year cliff'],
                    ['Total Outstanding', '10,000,000', '100%', 'Fully diluted'],
                  ]}
                  caption="Typical founding split (unequal based on role/contribution)"
                />
              </div>

              <div>
                <h5 className="font-semibold text-ink text-lg mb-3">
                  Stage 2: Post-Seed Round ($1M at $4M post-money)
                </h5>
                <DataTable
                  headers={['Shareholder', 'Shares', 'Ownership %', 'Investment']}
                  rows={[
                    ['Founder 1', '6,000,000', '48%', '-'],
                    ['Founder 2', '3,000,000', '24%', '-'],
                    ['Co-founder 3', '1,000,000', '8%', '-'],
                    ['Seed Investors', '2,500,000', '20%', '$1,000,000'],
                    ['Total Outstanding', '12,500,000', '100%', '-'],
                  ]}
                  caption="20% dilution for founders (typical seed round)"
                />
              </div>

              <div>
                <h5 className="font-semibold text-ink text-lg mb-3">
                  Stage 3: Post-Series A ($5M at $20M post-money)
                </h5>
                <DataTable
                  headers={['Shareholder', 'Shares', 'Ownership %', 'Notes']}
                  rows={[
                    ['Founder 1', '6,000,000', '36%', 'Diluted from 48%'],
                    ['Founder 2', '3,000,000', '18%', 'Diluted from 24%'],
                    ['Co-founder 3', '1,000,000', '6%', 'Diluted from 8%'],
                    ['Employee Pool (ESOP)', '2,000,000', '12%', '10-15% typical for Series A'],
                    ['Seed Investors', '2,500,000', '15%', 'Diluted from 20%'],
                    ['Series A Investors', '4,166,667', '25%', '$5,000,000 invested'],
                    ['Total Outstanding', '16,666,667', '100%', '-'],
                  ]}
                  caption="Series A dilution + ESOP pool creation"
                />
              </div>
            </div>
          </div>

          <CalloutBox type="tip" title="Sequoia's 10-15-75 Rule">
            <p className="mb-3">
              <strong>By Series A, aim for:</strong>
            </p>
            <ul className="space-y-1 text-sm">
              <li>• <strong>10-15%</strong> set aside for employee stock options (ESOP)</li>
              <li>• <strong>15-25%</strong> sold to Series A investors</li>
              <li>• <strong>60-75%</strong> retained by founders + early investors</li>
            </ul>
            <p className="mt-3 text-sm text-graphite-600">
              Source: Sequoia Capital - Cap Table and Hiring<InlineCitation number={5} id="sequoia-cap-table" />
            </p>
          </CalloutBox>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Anti-Dilution Protections: What Investors Negotiate
            </h4>
            
            <ArticleText>
              Sophisticated investors often include anti-dilution clauses to protect themselves 
              if you raise a &quot;down round&quot; (lower valuation than previous round)<InlineCitation number={7} id="carta-dilution" />.
            </ArticleText>

            <div className="my-6 p-6 bg-graphite-50 border-2 border-graphite-300">
              <h5 className="font-semibold text-ink mb-3">Two Types of Anti-Dilution:</h5>
              <div className="space-y-4">
                <div>
                  <h6 className="font-semibold text-ink text-sm mb-1">1. Full Ratchet (Investor-Friendly)</h6>
                  <p className="text-sm text-graphite-800">
                    If you raise at a lower price, investor's conversion price adjusts to the 
                    new lower price — giving them more shares. Very punitive for founders.
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-ink text-sm mb-1">2. Weighted Average (Standard)</h6>
                  <p className="text-sm text-graphite-800">
                    Conversion price adjusts based on a weighted average formula considering 
                    the amount raised. More balanced for both parties. This is standard in 
                    most term sheets.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Vesting Schedules: Protecting the Team
            </h4>

            <ArticleText>
              <strong>All founders and employees must have vesting schedules.</strong> Standard is 
              4-year vesting with a 1-year cliff:
            </ArticleText>

            <ul className="space-y-2 text-lg text-graphite-800 my-4">
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span><strong>Cliff:</strong> If you leave before 1 year, you get 0% of equity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span><strong>Year 1:</strong> After 1 year, you vest 25% (cliff amount)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span><strong>Years 2-4:</strong> Remaining 75% vests monthly (2.08% per month)</span>
              </li>
            </ul>

            <CalloutBox type="warning" title="Why Vesting Matters">
              <p>
                Without vesting, a co-founder who leaves after 3 months still owns 30% of your 
                company forever. Investors will NEVER fund a company with unvested founder equity. 
                It's a deal-breaker.
              </p>
            </CalloutBox>
          </div>
        </ArticleSection>

        {/* Unit Economics */}
        <ArticleSection heading="4. Unit Economics: The Math That Matters">
          <ArticleText>
            VCs don&apos;t just bet on vision—they bet on math. Your unit economics tell the story 
            of whether your business is fundamentally profitable per customer<InlineCitation number={6} id="firstround-unit-economics" />.
          </ArticleText>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              The Critical Metrics Every Investor Evaluates
            </h4>

            <DataTable
              headers={['Metric', 'What It Measures', 'Good Benchmark', 'How to Calculate']}
              rows={[
                [
                  'CAC (Customer Acquisition Cost)',
                  'Cost to acquire one paying customer',
                  '<$500 for SMB SaaS, <$5K for enterprise',
                  'Total Sales & Marketing Spend ÷ New Customers Acquired'
                ],
                [
                  'LTV (Lifetime Value)',
                  'Total revenue from one customer',
                  '3-5x CAC minimum',
                  'ARPU × Gross Margin % ÷ Churn Rate'
                ],
                [
                  'LTV:CAC Ratio',
                  'Return on customer acquisition',
                  '>3:1 (great), >5:1 (excellent)',
                  'LTV ÷ CAC'
                ],
                [
                  'CAC Payback Period',
                  'Months to recover acquisition cost',
                  '<12 months (good), <6 months (great)',
                  'CAC ÷ (ARPU × Gross Margin %)'
                ],
                [
                  'Gross Margin',
                  'Profit after COGS',
                  '>70% (SaaS), >40% (marketplace)',
                  '(Revenue - COGS) ÷ Revenue × 100'
                ],
                [
                  'Net Revenue Retention (NRR)',
                  'Revenue growth from existing customers',
                  '>100% (must-have), >120% (best-in-class)',
                  '(Revenue from cohort + Expansion - Churn) ÷ Starting Revenue'
                ],
                [
                  'Monthly Burn Rate',
                  'Cash spent per month',
                  'Depends on runway target',
                  'Starting Cash Balance - Ending Cash Balance'
                ],
                [
                  'Runway',
                  'Months of cash left',
                  '>12 months minimum',
                  'Current Cash ÷ Monthly Burn Rate'
                ],
              ]}
              caption="SaaS unit economics benchmarks (First Round Review 2024)"
            />
          </div>

          <div className="my-12">
            <h4 className="font-serif text-2xl font-bold text-ink mb-6">
              Worked Example: SaaS Startup Unit Economics
            </h4>

            <div className="p-8 bg-graphite-50 border-2 border-ink">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold text-ink mb-4">Inputs (Monthly Averages)</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-graphite-700">MRR per customer (ARPU):</span>
                      <span className="font-semibold">$200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-graphite-700">Gross margin:</span>
                      <span className="font-semibold">80%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-graphite-700">Monthly churn rate:</span>
                      <span className="font-semibold">3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-graphite-700">Sales & marketing spend:</span>
                      <span className="font-semibold">$50,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-graphite-700">New customers acquired:</span>
                      <span className="font-semibold">100</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-ink mb-4">Calculated Metrics</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-graphite-700">CAC:</span>
                      <span className="font-semibold">$500</span>
                      <span className="text-xs text-graphite-500">($50K ÷ 100)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-graphite-700">LTV:</span>
                      <span className="font-semibold">$5,333</span>
                      <span className="text-xs text-graphite-500">($200 × 0.8 ÷ 0.03)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-graphite-700">LTV:CAC Ratio:</span>
                      <span className="font-semibold text-ink">10.7:1</span>
                      <span className="text-xs text-graphite-500">($5,333 ÷ $500)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-graphite-700">CAC Payback:</span>
                      <span className="font-semibold text-ink">3.1 months</span>
                      <span className="text-xs text-graphite-500">($500 ÷ $160)</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-ink text-paper">
                    <h6 className="font-semibold mb-2">Verdict: Excellent Unit Economics ✓</h6>
                    <p className="text-sm text-graphite-200">
                      LTV:CAC above 10:1 and payback under 4 months signals a highly capital-efficient 
                      growth engine. Ready for aggressive scaling.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CalloutBox type="tip" title="When to Prioritize Growth Over Profitability">
            <p className="mb-3">
              If your LTV:CAC is above 3:1 and payback is under 12 months, you should be 
              <strong> spending more on sales & marketing</strong>, not less. This is a sign 
              that every dollar you invest returns 3x+ over the customer lifetime.
            </p>
            <p className="text-sm text-graphite-600">
              VCs call this &quot;throwing fuel on the fire&quot; — investing aggressively while unit 
              economics are positive.
            </p>
          </CalloutBox>
        </ArticleSection>

        {/* Burn Rate & Runway */}
        <ArticleSection heading="5. Burn Rate & Runway: Managing Your Cash">
          <ArticleText>
            Running out of cash is the #1 killer of startups. Understanding your burn rate and 
            extending your runway is critical to survival—especially in tough fundraising markets.
          </ArticleText>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Calculating Burn Rate & Runway
            </h4>

            <div className="p-6 bg-graphite-50 border-2 border-graphite-300">
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-ink mb-2">Gross Burn Rate</h5>
                  <p className="text-sm text-graphite-800 mb-2">
                    Total monthly operating expenses (salaries, rent, marketing, software, etc.)
                  </p>
                  <div className="font-mono text-sm bg-paper p-3 border border-graphite-300">
                    Gross Burn = Total Monthly Expenses
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-ink mb-2">Net Burn Rate</h5>
                  <p className="text-sm text-graphite-800 mb-2">
                    Gross burn minus monthly revenue (actual cash depletion rate)
                  </p>
                  <div className="font-mono text-sm bg-paper p-3 border border-graphite-300">
                    Net Burn = Total Expenses - Monthly Revenue
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-ink mb-2">Runway</h5>
                  <p className="text-sm text-graphite-800 mb-2">
                    Months until you run out of cash at current burn rate
                  </p>
                  <div className="font-mono text-sm bg-paper p-3 border border-graphite-300">
                    Runway (months) = Cash in Bank ÷ Net Monthly Burn
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Example: Startup Cash Management
            </h4>

            <div className="p-8 bg-ink text-paper border-2 border-ink">
              <h5 className="font-semibold mb-4">Scenario: Post-Seed SaaS Startup</h5>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-graphite-700 pb-2">
                  <span className="text-graphite-300">Cash raised (Seed):</span>
                  <span className="font-semibold">$1,000,000</span>
                </div>
                <div className="flex justify-between border-b border-graphite-700 pb-2">
                  <span className="text-graphite-300">Monthly revenue:</span>
                  <span className="font-semibold">$20,000 MRR</span>
                </div>
                <div className="flex justify-between border-b border-graphite-700 pb-2">
                  <span className="text-graphite-300">Monthly expenses:</span>
                  <span className="font-semibold">$80,000</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-graphite-300">Net monthly burn:</span>
                  <span className="font-semibold text-graphite-100">$60,000</span>
                </div>
                <div className="flex justify-between pt-2 border-t-2 border-paper">
                  <span className="font-bold">Runway:</span>
                  <span className="font-bold text-2xl">16.7 months</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-graphite-900 border-2 border-graphite-700">
                <h6 className="font-semibold mb-2">Strategy Recommendation</h6>
                <ul className="space-y-1 text-sm text-graphite-200">
                  <li>• Start fundraising at 12-month runway mark (Month 5)</li>
                  <li>• Fundraising takes 3-6 months on average</li>
                  <li>• Never let runway drop below 6 months (panic territory)</li>
                  <li>• If revenue hits $50K MRR, burn becomes $30K → runway extends to 33 months</li>
                </ul>
              </div>
            </div>
          </div>

          <CalloutBox type="warning" title="The 6-Month Rule">
            <p>
              <strong>If your runway drops below 6 months without a term sheet signed, you&apos;re in danger zone.</strong> 
              Options: (1) Cut burn by 30-50%, (2) Raise emergency bridge round, (3) Explore acquisition. 
              Don't wait until Month 3 to panic.
            </p>
          </CalloutBox>
        </ArticleSection>

        {/* Due Diligence */}
        <ArticleSection heading="6. Investor Due Diligence: What to Prepare">
          <ArticleText>
            Once a VC gives you a term sheet, expect 2-4 weeks of rigorous due diligence. Be 
            prepared with a clean data room to avoid delays or renegotiations.
          </ArticleText>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Due Diligence Checklist (Series A+)
            </h4>

            <Checklist items={[
              { text: 'Cap table (fully reconciled with all option grants, convertible notes, SAFEs)' },
              { text: 'Financial statements (P&L, balance sheet, cash flow) for last 12-24 months' },
              { text: 'Customer list with MRR/ARR breakdown (anonymized if sensitive)' },
              { text: 'Product roadmap and technical architecture documentation' },
              { text: 'All contracts: customer agreements, vendor contracts, office leases' },
              { text: 'Employment agreements for all team members (offer letters, equity grants)' },
              { text: 'IP documentation: patents, trademarks, invention assignments' },
              { text: 'Incorporation documents: certificate of incorporation, bylaws, board resolutions' },
              { text: 'Compliance records: taxes filed, labor law compliance, data privacy (GDPR/CCPA)' },
              { text: 'Insurance policies: D&O insurance, E&O insurance, cyber insurance' },
              { text: 'Previous round documents: term sheets, SAFEs, board consents' },
              { text: 'Litigation history or ongoing legal disputes (if any)' },
            ]} />
          </div>

          <CalloutBox type="tip" title="Pro Tip: Build Your Data Room Early">
            <p className="mb-3">
              Use Google Drive, Notion, or dedicated software (Carta, DocSend) to organize your 
              data room <strong>before</strong> you start fundraising. VCs will ask for this 
              within 48 hours of a verbal term sheet.
            </p>
            <p className="text-sm text-graphite-600">
              A disorganized data room signals operational sloppiness and can kill deals.
            </p>
          </CalloutBox>
        </ArticleSection>

        {/* Downloads */}
        <section className="mt-16 pt-12 border-t-2 border-graphite-200">
          <h2 className="font-serif text-3xl font-bold text-ink mb-6">
            Download Templates & Calculators
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Cap Table Template (Excel)</h4>
                <p className="text-sm text-graphite-600">Track equity, dilution, and vesting schedules</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Unit Economics Calculator</h4>
                <p className="text-sm text-graphite-600">CAC, LTV, payback period, runway calculator</p>
              </div>
              <Calculator className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Due Diligence Checklist</h4>
                <p className="text-sm text-graphite-600">Complete data room preparation guide</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">3-Year Financial Model</h4>
                <p className="text-sm text-graphite-600">Startup financial projections template</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </section>

        {/* References */}
        <References citations={citations} />

        {/* Next Module */}
        <section className="mt-16 pt-12 border-t-2 border-ink bg-graphite-50 -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12 py-12">
          <h3 className="text-sm uppercase tracking-widest text-graphite-600 font-semibold mb-4">
            Next Module
          </h3>
          <Link
            href="/learn/product"
            className="group block"
          >
            <h2 className="font-serif text-4xl font-bold text-ink mb-4 group-hover:underline">
              Product & Go-To-Market Strategy →
            </h2>
            <p className="text-xl text-graphite-700 mb-6">
              Build products users love. Master MVP strategy, metrics (CAC, LTV, churn), and 
              proven go-to-market playbooks.
            </p>
            <div className="inline-flex items-center gap-2 text-ink font-semibold group-hover:gap-4 transition-all">
              Continue Learning
              <ArrowRight className="h-5 w-5" />
            </div>
          </Link>
        </section>
      </ArticleSpread>
    </LearnLayout>
  );
}
