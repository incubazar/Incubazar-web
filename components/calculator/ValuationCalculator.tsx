"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DollarSign, TrendingUp, FileText } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { CalculatorState, ValuationInputs, ValuationOutputs, IndustryType, FundingStage } from '@/lib/types/calculator'
import { calculateValuation, formatCurrency, formatNumber } from '@/lib/calculator/engine'
import { TooltipInfo } from './TooltipInfo'

interface ValuationCalculatorProps {
  state: CalculatorState
  onUpdate: (valuation: ValuationInputs) => void
  onResults: (valuation: ValuationOutputs) => void
}

const INDUSTRIES: IndustryType[] = [
  'SaaS',
  'E-commerce',
  'B2B Services',
  'FinTech',
  'HealthTech',
  'EdTech',
  'Marketplace',
  'DeepTech',
  'Consumer App',
  'Enterprise Software',
  'Other',
]

const FUNDING_STAGES: FundingStage[] = [
  'Pre-Seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C+',
]

export function ValuationCalculator({ state, onUpdate, onResults }: ValuationCalculatorProps) {
  const [valuationInputs, setValuationInputs] = useState<ValuationInputs>(state.valuation)
  const [results, setResults] = useState<ValuationOutputs | null>(null)

  useEffect(() => {
    setValuationInputs(state.valuation)
  }, [state.valuation])

  const handleCalculate = () => {
    const calculatedResults = calculateValuation(valuationInputs)
    setResults(calculatedResults)
    onUpdate(valuationInputs)
    onResults(calculatedResults)
  }

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Startup Valuation Calculator
            <TooltipInfo
              term="Startup Valuation"
              definition="An estimate of your company's worth based on revenue, growth, and market factors"
              benchmark="Varies by stage and industry; pre-revenue uses Berkus, post-revenue uses multiples"
              example="SaaS with $1M ARR growing 100% might be valued at 8-12x ARR = $8-12M"
            />
          </CardTitle>
          <CardDescription>
            Estimate your company valuation using Berkus Method and Revenue Multiples
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={valuationInputs.industry}
                onValueChange={(value: IndustryType) => setValuationInputs(prev => ({ ...prev, industry: value }))}
              >
                <SelectTrigger id="industry">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="funding-stage">Funding Stage</Label>
              <Select
                value={valuationInputs.fundingStage}
                onValueChange={(value: FundingStage) => setValuationInputs(prev => ({ ...prev, fundingStage: value }))}
              >
                <SelectTrigger id="funding-stage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FUNDING_STAGES.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mrr">
                Monthly Recurring Revenue (MRR) $
                <TooltipInfo
                  term="MRR"
                  definition="Predictable monthly revenue from subscriptions and contracts"
                  example="10 customers × $1,000/mo = $10,000 MRR"
                />
              </Label>
              <Input
                id="mrr"
                type="number"
                min="0"
                step="1000"
                value={valuationInputs.mrr || ''}
                onChange={(e) => {
                  const mrr = parseFloat(e.target.value) || 0
                  setValuationInputs(prev => ({ ...prev, mrr, arr: mrr * 12 }))
                }}
                placeholder="10000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arr">
                Annual Recurring Revenue (ARR) $
                <TooltipInfo
                  term="ARR"
                  definition="MRR × 12, the annualized version of monthly recurring revenue"
                  benchmark="Key metric for SaaS valuations"
                />
              </Label>
              <Input
                id="arr"
                type="number"
                min="0"
                step="10000"
                value={valuationInputs.arr || ''}
                onChange={(e) => {
                  const arr = parseFloat(e.target.value) || 0
                  setValuationInputs(prev => ({ ...prev, arr, mrr: arr / 12 }))
                }}
                placeholder="120000"
              />
              <p className="text-xs text-muted-foreground">Auto-calculates from MRR</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="growth-rate">
                Annual Growth Rate (%)
                <TooltipInfo
                  term="Growth Rate"
                  definition="Year-over-year revenue growth percentage"
                  benchmark="50-100%+ is considered high growth for early-stage startups"
                  example="Grew from $500k to $1M ARR = 100% growth"
                />
              </Label>
              <Input
                id="growth-rate"
                type="number"
                min="0"
                max="1000"
                step="5"
                value={valuationInputs.growthRate || ''}
                onChange={(e) => setValuationInputs(prev => ({ ...prev, growthRate: parseFloat(e.target.value) || 0 }))}
                placeholder="80"
              />
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full" size="lg">
            <DollarSign className="h-4 w-4 mr-2" />
            Calculate Valuation
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <>
          {/* Valuation Range */}
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle>Recommended Valuation Range</CardTitle>
              <CardDescription>Based on multiple valuation methodologies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Low</p>
                  <p className="text-3xl font-bold">
                    {formatNumber(results.recommendedRange.low)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Target</p>
                  <p className="text-5xl font-bold text-primary">
                    {formatNumber(results.recommendedRange.mid)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">High</p>
                  <p className="text-3xl font-bold">
                    {formatNumber(results.recommendedRange.high)}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Quick Context</h4>
                    <p className="text-sm text-muted-foreground">
                      For a <strong>{valuationInputs.industry}</strong> startup at the <strong>{valuationInputs.fundingStage}</strong> stage
                      {valuationInputs.arr > 0 && ` with ${formatCurrency(valuationInputs.arr)} ARR`}
                      {valuationInputs.growthRate > 0 && ` growing at ${valuationInputs.growthRate}% annually`}.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Methodology Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Berkus Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Berkus Method
                  <TooltipInfo
                    term="Berkus Method"
                    definition="Pre-revenue valuation based on 5 key success factors, up to $500k each"
                    benchmark="Used for pre-revenue or early revenue companies"
                    example="Strong team ($400k) + Working prototype ($450k) + Good idea ($400k) = $1.25M"
                  />
                </CardTitle>
                <CardDescription>Qualitative pre-revenue valuation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sound Idea / Value Prop</span>
                    <span className="font-semibold">{formatCurrency(results.berkusMethod.soundIdea)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Prototype / Product</span>
                    <span className="font-semibold">{formatCurrency(results.berkusMethod.prototype)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Quality Team</span>
                    <span className="font-semibold">{formatCurrency(results.berkusMethod.qualityTeam)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Strategic Relationships</span>
                    <span className="font-semibold">{formatCurrency(results.berkusMethod.strategicRelationships)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Product Rollout / Sales</span>
                    <span className="font-semibold">{formatCurrency(results.berkusMethod.productRollout)}</span>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Valuation</span>
                    <span className="text-2xl font-bold">{formatNumber(results.berkusMethod.totalValue)}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  {results.berkusMethod.explanation}
                </p>
              </CardContent>
            </Card>

            {/* Revenue Multiple */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Revenue Multiple
                  <TooltipInfo
                    term="Revenue Multiple"
                    definition="Valuation = ARR × Industry Multiple, adjusted for growth"
                    benchmark="SaaS: 5-15x, E-commerce: 2-5x, varies by growth rate"
                    example="$1M ARR × 10x multiple = $10M valuation"
                  />
                </CardTitle>
                <CardDescription>Market-based revenue valuation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">ARR</p>
                        <p className="text-xl font-bold">{formatCurrency(results.revenueMultiple.arr)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Multiple</p>
                        <p className="text-xl font-bold">{results.revenueMultiple.multiple.toFixed(1)}x</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Valuation</span>
                      <span className="text-2xl font-bold">{formatNumber(results.revenueMultiple.valuation)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {results.revenueMultiple.multipleRationale}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Valuation Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Valuation Method Comparison</CardTitle>
              <CardDescription>Visual comparison of different valuation approaches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        name: 'Berkus Method',
                        value: results.berkusMethod.totalValue,
                      },
                      {
                        name: 'Revenue Multiple',
                        value: results.revenueMultiple.valuation,
                      },
                      {
                        name: 'Recommended Low',
                        value: results.recommendedRange.low,
                      },
                      {
                        name: 'Recommended Target',
                        value: results.recommendedRange.mid,
                      },
                      {
                        name: 'Recommended High',
                        value: results.recommendedRange.high,
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} />
                    <YAxis
                      tickFormatter={(value) => formatNumber(value)}
                      label={{ value: 'Valuation ($)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip formatter={(value: any) => formatCurrency(value)} />
                    <Bar dataKey="value" fill="#000000" name="Valuation" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Investor-Ready Narrative */}
          <Card className="border-2 border-green-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Investor-Ready Valuation Narrative
              </CardTitle>
              <CardDescription>
                Use this explanation in pitch decks and investor conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="bg-muted p-6 rounded-lg whitespace-pre-line">
                  {results.narrative}
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-900">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  💡 Pro Tips for Fundraising
                </h4>
                <ul className="text-sm space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Present a range, not a single number, to show you understand market dynamics</li>
                  <li>Back your valuation with comparable companies or recent deals in your space</li>
                  <li>Emphasize your strongest metrics (growth rate, unit economics, market size)</li>
                  <li>Be prepared to justify your multiple based on competitive advantages</li>
                  <li>Remember: valuation is negotiable - focus on finding the right investor partner</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Key Assumptions */}
          <Card>
            <CardHeader>
              <CardTitle>Key Assumptions & Benchmarks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Your Inputs</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Industry:</span>
                      <span className="font-medium">{valuationInputs.industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stage:</span>
                      <span className="font-medium">{valuationInputs.fundingStage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ARR:</span>
                      <span className="font-medium">{formatCurrency(valuationInputs.arr)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Growth:</span>
                      <span className="font-medium">{valuationInputs.growthRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Market Context</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      Typical {valuationInputs.industry} multiples range from industry-specific benchmarks.
                      Your growth rate of {valuationInputs.growthRate}% 
                      {valuationInputs.growthRate > 100 
                        ? ' justifies a premium valuation.' 
                        : valuationInputs.growthRate > 50 
                          ? ' supports above-average multiples.' 
                          : ' aligns with standard market multiples.'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
