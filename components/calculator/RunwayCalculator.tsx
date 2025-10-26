"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertTriangle, TrendingUp, DollarSign, Calculator as CalcIcon } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'
import type { CalculatorState, RunwayInputs, RunwayOutputs, WhatIfScenario } from '@/lib/types/calculator'
import { calculateRunway, calculateWhatIf, formatCurrency } from '@/lib/calculator/engine'
import { TooltipInfo } from './TooltipInfo'

interface RunwayCalculatorProps {
  state: CalculatorState
  onUpdate: (runway: RunwayInputs) => void
  onResults: (runway: RunwayOutputs) => void
}

export function RunwayCalculator({ state, onUpdate, onResults }: RunwayCalculatorProps) {
  const [runwayInputs, setRunwayInputs] = useState<RunwayInputs>(state.runway)
  const [results, setResults] = useState<RunwayOutputs | null>(null)
  const [whatIfActive, setWhatIfActive] = useState(false)
  const [whatIfScenario, setWhatIfScenario] = useState<WhatIfScenario>({
    type: 'revenue_change',
    description: '',
    impact: 0,
    isPercentage: true,
  })
  const [whatIfResults, setWhatIfResults] = useState<any>(null)

  useEffect(() => {
    setRunwayInputs(state.runway)
  }, [state.runway])

  const handleCalculate = () => {
    const calculatedResults = calculateRunway(runwayInputs)
    setResults(calculatedResults)
    onUpdate(runwayInputs)
    onResults(calculatedResults)
  }

  const handleWhatIf = () => {
    if (results) {
      const whatIfOutput = calculateWhatIf(runwayInputs, whatIfScenario)
      setWhatIfResults(whatIfOutput)
    }
  }

  const updateExpense = (key: keyof typeof runwayInputs.monthlyExpenses, value: number) => {
    setRunwayInputs(prev => ({
      ...prev,
      monthlyExpenses: {
        ...prev.monthlyExpenses,
        [key]: value,
      },
    }))
  }

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Runway & Burn Rate Calculator
            <TooltipInfo
              term="Cash Runway"
              definition="The number of months your company can operate before running out of cash, based on current burn rate."
              benchmark="Healthy: >6 months, Warning: 3-6 months, Critical: <3 months"
              example="$100k in bank, $20k monthly burn = 5 months runway"
            />
          </CardTitle>
          <CardDescription>
            Calculate how long your cash will last based on current expenses and revenue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="runway-cash">Cash in Bank ($)</Label>
              <Input
                id="runway-cash"
                type="number"
                min="0"
                step="1000"
                value={runwayInputs.cashInBank || ''}
                onChange={(e) => setRunwayInputs(prev => ({ ...prev, cashInBank: parseFloat(e.target.value) || 0 }))}
                placeholder="100000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="runway-revenue">
                Monthly Revenue ($)
                <TooltipInfo
                  term="Monthly Revenue"
                  definition="Total revenue earned per month from all sources"
                  example="Subscriptions + one-time sales"
                />
              </Label>
              <Input
                id="runway-revenue"
                type="number"
                min="0"
                step="1000"
                value={runwayInputs.monthlyRevenue || ''}
                onChange={(e) => setRunwayInputs(prev => ({ ...prev, monthlyRevenue: parseFloat(e.target.value) || 0 }))}
                placeholder="10000"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              Monthly Operating Expenses
              <TooltipInfo
                term="Operating Expenses"
                definition="All recurring monthly costs required to run your business"
                example="Salaries, rent, software subscriptions, marketing costs"
              />
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expense-salaries">Salaries ($)</Label>
                <Input
                  id="expense-salaries"
                  type="number"
                  min="0"
                  step="1000"
                  value={runwayInputs.monthlyExpenses.salaries || ''}
                  onChange={(e) => updateExpense('salaries', parseFloat(e.target.value) || 0)}
                  placeholder="15000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expense-rent">Rent / Office ($)</Label>
                <Input
                  id="expense-rent"
                  type="number"
                  min="0"
                  step="100"
                  value={runwayInputs.monthlyExpenses.rent || ''}
                  onChange={(e) => updateExpense('rent', parseFloat(e.target.value) || 0)}
                  placeholder="2000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expense-software">Software / Tools ($)</Label>
                <Input
                  id="expense-software"
                  type="number"
                  min="0"
                  step="100"
                  value={runwayInputs.monthlyExpenses.software || ''}
                  onChange={(e) => updateExpense('software', parseFloat(e.target.value) || 0)}
                  placeholder="500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expense-marketing">Marketing ($)</Label>
                <Input
                  id="expense-marketing"
                  type="number"
                  min="0"
                  step="100"
                  value={runwayInputs.monthlyExpenses.marketing || ''}
                  onChange={(e) => updateExpense('marketing', parseFloat(e.target.value) || 0)}
                  placeholder="3000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expense-cogs">COGS ($)</Label>
                <Input
                  id="expense-cogs"
                  type="number"
                  min="0"
                  step="100"
                  value={runwayInputs.monthlyExpenses.cogs || ''}
                  onChange={(e) => updateExpense('cogs', parseFloat(e.target.value) || 0)}
                  placeholder="1000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expense-other">Other Expenses ($)</Label>
                <Input
                  id="expense-other"
                  type="number"
                  min="0"
                  step="100"
                  value={runwayInputs.monthlyExpenses.other || ''}
                  onChange={(e) => updateExpense('other', parseFloat(e.target.value) || 0)}
                  placeholder="500"
                />
              </div>
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full" size="lg">
            <CalcIcon className="h-4 w-4 mr-2" />
            Calculate Runway
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className={results.runwayStatus === 'critical' ? 'border-destructive' : results.runwayStatus === 'warning' ? 'border-amber-500' : 'border-green-600'}>
              <CardHeader className="pb-3">
                <CardDescription>Cash Runway</CardDescription>
                <CardTitle className="text-4xl">
                  {results.runwayMonths.toFixed(1)} <span className="text-xl text-muted-foreground">months</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {results.runwayStatus === 'critical' ? (
                    <>
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span className="text-sm text-destructive font-medium">Critical - Action Needed</span>
                    </>
                  ) : results.runwayStatus === 'warning' ? (
                    <>
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span className="text-sm text-amber-600 font-medium">Warning - Plan Ahead</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">Healthy</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Monthly Burn Rate</CardDescription>
                <CardTitle className="text-4xl">
                  {formatCurrency(results.netBurnRate)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Total Expenses: {formatCurrency(results.totalMonthlyExpenses)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Cash at Risk Date</CardDescription>
                <CardTitle className="text-lg">
                  {new Date(Date.now() + results.runwayMonths * 30.44 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Based on current burn rate
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Cash Flow Projection Chart */}
          <Card>
            <CardHeader>
              <CardTitle>18-Month Cash Flow Projection</CardTitle>
              <CardDescription>
                Projected cash balance over time based on current burn rate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis 
                      dataKey="month" 
                      label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      label={{ value: 'Cash ($)', angle: -90, position: 'insideLeft' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      formatter={(value: any) => formatCurrency(value)}
                      labelFormatter={(label) => `Month ${label}`}
                    />
                    <Legend />
                    <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="3 3" />
                    <Line 
                      type="monotone" 
                      dataKey="cash" 
                      stroke="#000000" 
                      strokeWidth={3}
                      name="Cash Balance"
                      dot={{ fill: '#000000', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* What-If Scenario Tool */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                What-If Scenario Analysis
                <TooltipInfo
                  term="What-If Analysis"
                  definition="Model different scenarios to see how changes in revenue or expenses would impact your runway"
                  example="What if we hire 2 more engineers? What if revenue grows 20%?"
                />
              </CardTitle>
              <CardDescription>
                Model how changes to revenue or expenses would impact your runway
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scenario-type">Scenario Type</Label>
                  <Select
                    value={whatIfScenario.type}
                    onValueChange={(value: any) => setWhatIfScenario(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger id="scenario-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue_change">Revenue Change</SelectItem>
                      <SelectItem value="expense_change">Expense Change</SelectItem>
                      <SelectItem value="new_hire">New Hire</SelectItem>
                      <SelectItem value="cost_reduction">Cost Reduction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scenario-impact">
                    {whatIfScenario.type === 'new_hire' ? 'Monthly Salary ($)' : 'Impact'}
                  </Label>
                  <Input
                    id="scenario-impact"
                    type="number"
                    value={whatIfScenario.impact || ''}
                    onChange={(e) => setWhatIfScenario(prev => ({ ...prev, impact: parseFloat(e.target.value) || 0 }))}
                    placeholder={whatIfScenario.isPercentage ? '15' : '5000'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scenario-unit">Unit</Label>
                  <Select
                    value={whatIfScenario.isPercentage ? 'percentage' : 'dollar'}
                    onValueChange={(value) => setWhatIfScenario(prev => ({ ...prev, isPercentage: value === 'percentage' }))}
                    disabled={whatIfScenario.type === 'new_hire'}
                  >
                    <SelectTrigger id="scenario-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="dollar">Dollar Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleWhatIf} variant="outline" className="w-full">
                Run Scenario Analysis
              </Button>

              {whatIfResults && (
                <div className="mt-6 p-4 bg-muted rounded-lg space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Runway</p>
                      <p className="text-2xl font-bold">{whatIfResults.baseline.runwayMonths.toFixed(1)} months</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">New Runway</p>
                      <p className="text-2xl font-bold">{whatIfResults.scenario.runwayMonths.toFixed(1)} months</p>
                    </div>
                  </div>
                  <div className={`p-3 rounded ${whatIfResults.difference > 0 ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}`}>
                    <p className="text-sm font-medium">
                      {whatIfResults.recommendation}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
