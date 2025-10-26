"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { 
  Calculator,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  ArrowLeft,
  Info
} from 'lucide-react'
import Link from 'next/link'
import type { 
  CalculatorState, 
  CalculatorResults, 
  CompanyBasics,
  RunwayInputs,
  RunwayOutputs,
  LTVCACOutputs,
  RetentionOutputs,
  EquitySplitOutputs,
  DilutionOutputs,
  ValuationInputs,
  ValuationOutputs
} from '@/lib/types/calculator'
import { CompanySetup } from '@/components/calculator/CompanySetup'
import { RunwayCalculator } from '@/components/calculator/RunwayCalculator'
import { UnitEconomicsCalculator } from '@/components/calculator/UnitEconomicsCalculator'
import { EquityCalculator } from '@/components/calculator/EquityCalculator'
import { ValuationCalculator } from '@/components/calculator/ValuationCalculator'
import { CalculatorDashboard } from '@/components/calculator/CalculatorDashboard'

export default function VentureMetricCalculator() {
  const [activeTab, setActiveTab] = useState<string>('dashboard')
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    companyBasics: {
      companyName: '',
      industry: 'SaaS',
      foundingDate: new Date().toISOString().split('T')[0],
      cashInBank: 0,
      monthlyRevenue: 0,
      teamSize: 0,
    },
    runway: {
      cashInBank: 0,
      monthlyRevenue: 0,
      monthlyExpenses: {
        salaries: 0,
        rent: 0,
        software: 0,
        marketing: 0,
        cogs: 0,
        other: 0,
      },
    },
    unitEconomics: {
      ltv: {
        arpu: 0,
        grossMargin: 70,
        avgCustomerLifespan: 24,
      },
      cac: {
        totalSalesMarketingSpend: 0,
        newCustomersAcquired: 0,
      },
      retention: {
        startMRR: 0,
        endMRR: 0,
        expansion: 0,
        contraction: 0,
        churn: 0,
      },
    },
    equity: {
      coFounders: [],
      dilution: {
        currentOwnership: 100,
        preMoneyValuation: 0,
        investmentAmount: 0,
        optionPoolSize: 10,
      },
    },
    valuation: {
      arr: 0,
      mrr: 0,
      growthRate: 0,
      industry: 'SaaS',
      fundingStage: 'Seed',
    },
  })

  const [results, setResults] = useState<CalculatorResults>({
    runway: null,
    ltvCac: null,
    retention: null,
    equitySplit: null,
    dilution: null,
    valuation: null,
  })

  const updateCompanyBasics = (basics: Partial<CompanyBasics>) => {
    setCalculatorState(prev => ({
      ...prev,
      companyBasics: { ...prev.companyBasics, ...basics },
      runway: {
        ...prev.runway,
        cashInBank: basics.cashInBank ?? prev.runway.cashInBank,
        monthlyRevenue: basics.monthlyRevenue ?? prev.runway.monthlyRevenue,
      },
      valuation: {
        ...prev.valuation,
        industry: basics.industry ?? prev.valuation.industry,
      },
    }))
  }

  const isSetupComplete = 
    calculatorState.companyBasics.companyName !== '' &&
    calculatorState.companyBasics.cashInBank > 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/founder">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-8 w-px bg-border" />
              <div>
                <h1 className="text-3xl font-bold font-serif flex items-center gap-3">
                  <Calculator className="h-8 w-8" />
                  Venture Metric Calculator
                </h1>
                <p className="text-muted-foreground mt-1">
                  Your strategic financial co-pilot for startup growth
                </p>
              </div>
            </div>
            {calculatorState.companyBasics.companyName && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Company</p>
                <p className="font-semibold">{calculatorState.companyBasics.companyName}</p>
                <p className="text-xs text-muted-foreground">{calculatorState.companyBasics.industry}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {!isSetupComplete ? (
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Welcome to Venture Metric
                </CardTitle>
                <CardDescription>
                  Let's start by setting up your company profile. This information will be used across all calculators.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CompanySetup
                  companyBasics={calculatorState.companyBasics}
                  onUpdate={updateCompanyBasics}
                />
              </CardContent>
            </Card>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
              <TabsTrigger value="dashboard" className="gap-2">
                <Target className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="runway" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Runway
              </TabsTrigger>
              <TabsTrigger value="unit-economics" className="gap-2">
                <Calculator className="h-4 w-4" />
                Unit Economics
              </TabsTrigger>
              <TabsTrigger value="equity" className="gap-2">
                <Users className="h-4 w-4" />
                Equity
              </TabsTrigger>
              <TabsTrigger value="valuation" className="gap-2">
                <DollarSign className="h-4 w-4" />
                Valuation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <CalculatorDashboard
                state={calculatorState}
                results={results}
                onNavigate={setActiveTab}
              />
            </TabsContent>

            <TabsContent value="runway" className="space-y-6">
              <RunwayCalculator
                state={calculatorState}
                onUpdate={(runway: RunwayInputs) => setCalculatorState(prev => ({ ...prev, runway }))}
                onResults={(runway: RunwayOutputs) => setResults(prev => ({ ...prev, runway }))}
              />
            </TabsContent>

            <TabsContent value="unit-economics" className="space-y-6">
              <UnitEconomicsCalculator
                state={calculatorState}
                onUpdate={(unitEconomics: CalculatorState['unitEconomics']) => setCalculatorState(prev => ({ ...prev, unitEconomics }))}
                onResults={(ltvCac: LTVCACOutputs | null, retention: RetentionOutputs | null) => setResults(prev => ({ ...prev, ltvCac, retention }))}
              />
            </TabsContent>

            <TabsContent value="equity" className="space-y-6">
              <EquityCalculator
                state={calculatorState}
                onUpdate={(equity: CalculatorState['equity']) => setCalculatorState(prev => ({ ...prev, equity }))}
                onResults={(equitySplit: EquitySplitOutputs | null, dilution: DilutionOutputs | null) => setResults(prev => ({ ...prev, equitySplit, dilution }))}
              />
            </TabsContent>

            <TabsContent value="valuation" className="space-y-6">
              <ValuationCalculator
                state={calculatorState}
                onUpdate={(valuation: ValuationInputs) => setCalculatorState(prev => ({ ...prev, valuation }))}
                onResults={(valuation: ValuationOutputs) => setResults(prev => ({ ...prev, valuation }))}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Help Footer */}
      <div className="border-t bg-background mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Runway Calculator
              </h4>
              <p className="text-muted-foreground">
                Understand how long your cash will last and model different scenarios.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Unit Economics
              </h4>
              <p className="text-muted-foreground">
                Calculate LTV:CAC ratio and optimize customer profitability.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Equity Management
              </h4>
              <p className="text-muted-foreground">
                Fair co-founder splits and fundraising dilution forecasts.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Valuation
              </h4>
              <p className="text-muted-foreground">
                Investor-ready valuation estimates using multiple methodologies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
