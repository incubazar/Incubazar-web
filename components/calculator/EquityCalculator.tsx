"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Users, Plus, X, PieChart } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import type { CalculatorState, CoFounder, EquitySplitOutputs, DilutionOutputs } from '@/lib/types/calculator'
import { calculateEquitySplit, calculateDilution, formatCurrency, formatPercentage, formatNumber } from '@/lib/calculator/engine'
import { TooltipInfo } from './TooltipInfo'

interface EquityCalculatorProps {
  state: CalculatorState
  onUpdate: (equity: CalculatorState['equity']) => void
  onResults: (equitySplit: EquitySplitOutputs | null, dilution: DilutionOutputs | null) => void
}

export function EquityCalculator({ state, onUpdate, onResults }: EquityCalculatorProps) {
  const [coFounders, setCoFounders] = useState<CoFounder[]>(state.equity.coFounders)
  const [dilutionInputs, setDilutionInputs] = useState(state.equity.dilution)
  const [equitySplitResults, setEquitySplitResults] = useState<EquitySplitOutputs | null>(null)
  const [dilutionResults, setDilutionResults] = useState<DilutionOutputs | null>(null)

  useEffect(() => {
    setCoFounders(state.equity.coFounders)
    setDilutionInputs(state.equity.dilution)
  }, [state.equity])

  const addCoFounder = () => {
    setCoFounders([...coFounders, {
      name: '',
      capitalInvested: 0,
      timeCommitment: 100,
      roleImportance: 5,
      ipContribution: 5,
    }])
  }

  const removeCoFounder = (index: number) => {
    setCoFounders(coFounders.filter((_, i) => i !== index))
  }

  const updateCoFounder = (index: number, field: keyof CoFounder, value: any) => {
    const updated = [...coFounders]
    updated[index] = { ...updated[index], [field]: value }
    setCoFounders(updated)
  }

  const handleCalculateEquity = () => {
    if (coFounders.length === 0) return
    const results = calculateEquitySplit(coFounders)
    setEquitySplitResults(results)
    onUpdate({ coFounders, dilution: dilutionInputs })
    onResults(results, dilutionResults)
  }

  const handleCalculateDilution = () => {
    const results = calculateDilution(dilutionInputs)
    setDilutionResults(results)
    onUpdate({ coFounders, dilution: dilutionInputs })
    onResults(equitySplitResults, results)
  }

  const COLORS = ['#000000', '#404040', '#737373', '#A3A3A3', '#D4D4D4']

  return (
    <div className="space-y-6">
      {/* Co-Founder Equity Split */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Co-Founder Equity Split Calculator
            <TooltipInfo
              term="Co-Founder Equity Split"
              definition="A data-driven approach to fairly dividing equity among founders based on contributions"
              example="Weights capital invested, time commitment, role importance, and IP contribution"
            />
          </CardTitle>
          <CardDescription>
            Calculate fair equity distribution based on weighted contributions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {coFounders.map((founder, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Co-Founder {index + 1}</Label>
                  {coFounders.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCoFounder(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${index}`}>Name</Label>
                    <Input
                      id={`name-${index}`}
                      value={founder.name}
                      onChange={(e) => updateCoFounder(index, 'name', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`capital-${index}`}>Capital Invested ($)</Label>
                    <Input
                      id={`capital-${index}`}
                      type="number"
                      min="0"
                      step="1000"
                      value={founder.capitalInvested || ''}
                      onChange={(e) => updateCoFounder(index, 'capitalInvested', parseFloat(e.target.value) || 0)}
                      placeholder="50000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`time-${index}`}>
                      Time Commitment (%)
                      <TooltipInfo
                        term="Time Commitment"
                        definition="Percentage of full-time work dedicated to the startup"
                        example="100% = full-time, 50% = part-time"
                      />
                    </Label>
                    <Input
                      id={`time-${index}`}
                      type="number"
                      min="0"
                      max="100"
                      step="10"
                      value={founder.timeCommitment || ''}
                      onChange={(e) => updateCoFounder(index, 'timeCommitment', parseFloat(e.target.value) || 0)}
                      placeholder="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`role-${index}`}>
                      Role Importance (1-10)
                      <TooltipInfo
                        term="Role Importance"
                        definition="How critical is this person's role to company success?"
                        example="10 = CEO/critical technical role, 5 = important contributor"
                      />
                    </Label>
                    <Input
                      id={`role-${index}`}
                      type="number"
                      min="1"
                      max="10"
                      step="1"
                      value={founder.roleImportance || ''}
                      onChange={(e) => updateCoFounder(index, 'roleImportance', parseFloat(e.target.value) || 0)}
                      placeholder="7"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`ip-${index}`}>
                      IP / Idea Contribution (1-10)
                      <TooltipInfo
                        term="IP Contribution"
                        definition="Value of intellectual property, patents, or original idea brought"
                        example="10 = brought core technology/idea, 1 = joined later"
                      />
                    </Label>
                    <Input
                      id={`ip-${index}`}
                      type="number"
                      min="1"
                      max="10"
                      step="1"
                      value={founder.ipContribution || ''}
                      onChange={(e) => updateCoFounder(index, 'ipContribution', parseFloat(e.target.value) || 0)}
                      placeholder="5"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}

          <Button onClick={addCoFounder} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Co-Founder
          </Button>

          {coFounders.length > 0 && (
            <Button onClick={handleCalculateEquity} className="w-full" size="lg">
              Calculate Fair Equity Split
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Equity Split Results */}
      {equitySplitResults && equitySplitResults.founders.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Recommended Equity Split</CardTitle>
              <CardDescription>{equitySplitResults.recommendation}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Bar Chart */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={equitySplitResults.founders}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="name" />
                    <YAxis 
                      label={{ value: 'Equity %', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      formatter={(value: any) => `${value.toFixed(2)}%`}
                    />
                    <Legend />
                    <Bar dataKey="equityPercentage" name="Equity %" fill="#000000">
                      {equitySplitResults.founders.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4">
                {equitySplitResults.founders.map((founder, index) => (
                  <Card key={index} className="p-4 bg-muted">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-lg">{founder.name}</h4>
                      <div className="text-3xl font-bold">
                        {formatPercentage(founder.equityPercentage, 2)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Capital</p>
                        <p className="font-medium">{founder.breakdown.capitalScore.toFixed(1)} pts</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Time</p>
                        <p className="font-medium">{founder.breakdown.timeScore.toFixed(1)} pts</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Role</p>
                        <p className="font-medium">{founder.breakdown.roleScore.toFixed(1)} pts</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">IP</p>
                        <p className="font-medium">{founder.breakdown.ipScore.toFixed(1)} pts</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Rationale */}
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Methodology</h4>
                  <p className="text-sm whitespace-pre-line">{equitySplitResults.rationale}</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </>
      )}

      {/* Dilution Forecaster */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Dilution Forecaster
            <TooltipInfo
              term="Dilution"
              definition="The reduction in ownership percentage that occurs when you raise funding by issuing new shares"
              benchmark="Typical: 15-25% per round, including option pool"
              example="Own 100%, raise $1M at $4M pre = 20% to investors, you own 80%"
            />
          </CardTitle>
          <CardDescription>
            Forecast ownership dilution across funding rounds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="current-ownership">Current Ownership (%)</Label>
              <Input
                id="current-ownership"
                type="number"
                min="0"
                max="100"
                step="1"
                value={dilutionInputs.currentOwnership || ''}
                onChange={(e) => setDilutionInputs(prev => ({ ...prev, currentOwnership: parseFloat(e.target.value) || 0 }))}
                placeholder="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pre-money">Pre-Money Valuation ($)</Label>
              <Input
                id="pre-money"
                type="number"
                min="0"
                step="100000"
                value={dilutionInputs.preMoneyValuation || ''}
                onChange={(e) => setDilutionInputs(prev => ({ ...prev, preMoneyValuation: parseFloat(e.target.value) || 0 }))}
                placeholder="4000000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="investment">Investment Amount ($)</Label>
              <Input
                id="investment"
                type="number"
                min="0"
                step="100000"
                value={dilutionInputs.investmentAmount || ''}
                onChange={(e) => setDilutionInputs(prev => ({ ...prev, investmentAmount: parseFloat(e.target.value) || 0 }))}
                placeholder="1000000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="option-pool">
                Option Pool Size (%)
                <TooltipInfo
                  term="Option Pool"
                  definition="Shares reserved for employee stock options, typically created before fundraising"
                  benchmark="10-20% for Seed/Series A"
                />
              </Label>
              <Input
                id="option-pool"
                type="number"
                min="0"
                max="30"
                step="1"
                value={dilutionInputs.optionPoolSize || ''}
                onChange={(e) => setDilutionInputs(prev => ({ ...prev, optionPoolSize: parseFloat(e.target.value) || 0 }))}
                placeholder="15"
              />
            </div>
          </div>

          <Button onClick={handleCalculateDilution} className="w-full" size="lg">
            Calculate Dilution
          </Button>
        </CardContent>
      </Card>

      {/* Dilution Results */}
      {dilutionResults && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Post-Money Valuation</CardDescription>
                <CardTitle className="text-3xl">
                  {formatNumber(dilutionResults.postMoneyValuation)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pre-money + Investment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Your New Ownership</CardDescription>
                <CardTitle className="text-3xl">
                  {formatPercentage(dilutionResults.newOwnership, 2)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  After this round
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-500">
              <CardHeader className="pb-3">
                <CardDescription>Dilution</CardDescription>
                <CardTitle className="text-3xl">
                  {formatPercentage(dilutionResults.dilutionPercentage, 2)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ownership reduction
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ownership Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded">
                  <span>Investor Ownership</span>
                  <span className="font-bold">{formatPercentage(dilutionResults.investorOwnership, 2)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded">
                  <span>Option Pool</span>
                  <span className="font-bold">{formatPercentage(dilutionResults.optionPoolImpact, 2)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded">
                  <span>Your Ownership</span>
                  <span className="font-bold">{formatPercentage(dilutionResults.newOwnership, 2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Rounds Projection */}
          <Card>
            <CardHeader>
              <CardTitle>Future Rounds Projection</CardTitle>
              <CardDescription>
                Estimated ownership after subsequent funding rounds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Round</th>
                      <th className="text-right p-3">Est. Raise</th>
                      <th className="text-right p-3">Est. Valuation</th>
                      <th className="text-right p-3">Your Ownership</th>
                      <th className="text-right p-3">Cumulative Dilution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dilutionResults.futureRounds.map((round, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-3 font-medium">{round.round}</td>
                        <td className="p-3 text-right">{formatNumber(round.assumedRaise)}</td>
                        <td className="p-3 text-right">{formatNumber(round.assumedValuation)}</td>
                        <td className="p-3 text-right font-semibold">{formatPercentage(round.projectedOwnership, 2)}</td>
                        <td className="p-3 text-right text-amber-600 font-semibold">-{formatPercentage(round.cumulativeDilution, 2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                📊 These are estimates based on typical funding patterns. Actual results may vary.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
