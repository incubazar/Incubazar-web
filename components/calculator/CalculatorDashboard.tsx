"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/ui/stat-card'
import { 
  TrendingUp, 
  TrendingDown,
  Calculator,
  Users,
  DollarSign,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react'
import type { CalculatorState, CalculatorResults } from '@/lib/types/calculator'
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/calculator/engine'

interface CalculatorDashboardProps {
  state: CalculatorState
  results: CalculatorResults
  onNavigate: (tab: string) => void
}

export function CalculatorDashboard({ state, results, onNavigate }: CalculatorDashboardProps) {
  const hasRunwayData = results.runway !== null
  const hasLTVCACData = results.ltvCac !== null
  const hasEquityData = results.equitySplit !== null || results.dilution !== null
  const hasValuationData = results.valuation !== null

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Cash Runway"
          value={
            hasRunwayData && results.runway
              ? `${results.runway.runwayMonths.toFixed(1)} mo`
              : '—'
          }
          icon={TrendingUp}
          description={
            hasRunwayData && results.runway
              ? `Burn: ${formatCurrency(results.runway.netBurnRate)}/mo`
              : 'Calculate runway'
          }
        />

        <StatCard
          title="LTV:CAC Ratio"
          value={
            hasLTVCACData && results.ltvCac
              ? `${results.ltvCac.ratio.toFixed(2)}:1`
              : '—'
          }
          icon={Calculator}
          description={
            hasLTVCACData && results.ltvCac
              ? `${results.ltvCac.rating.replace('-', ' ')}`
              : 'Calculate unit economics'
          }
        />

        <StatCard
          title="Your Ownership"
          value={
            hasEquityData && results.dilution
              ? `${results.dilution.newOwnership.toFixed(1)}%`
              : '—'
          }
          icon={Users}
          description={
            hasEquityData && results.dilution
              ? `Dilution: ${results.dilution.dilutionPercentage.toFixed(1)}%`
              : 'Calculate equity split'
          }
        />

        <StatCard
          title="Valuation Range"
          value={
            hasValuationData && results.valuation
              ? formatNumber(results.valuation.recommendedRange.mid)
              : '—'
          }
          icon={DollarSign}
          description={
            hasValuationData && results.valuation
              ? `${formatNumber(results.valuation.recommendedRange.low)} - ${formatNumber(results.valuation.recommendedRange.high)}`
              : 'Calculate valuation'
          }
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={!hasRunwayData ? 'border-primary' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Financial Runway
            </CardTitle>
            <CardDescription>
              Calculate how long your cash will last and explore what-if scenarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasRunwayData && results.runway ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Runway</span>
                  <span className="font-semibold">{results.runway.runwayMonths.toFixed(1)} months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Monthly Burn</span>
                  <span className="font-semibold">{formatCurrency(results.runway.netBurnRate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className={`font-semibold ${
                    results.runway.runwayStatus === 'healthy' 
                      ? 'text-green-600' 
                      : results.runway.runwayStatus === 'warning'
                        ? 'text-amber-500'
                        : 'text-destructive'
                  }`}>
                    {results.runway.runwayStatus}
                  </span>
                </div>
                <Button onClick={() => onNavigate('runway')} className="w-full" variant="outline">
                  View Details <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => onNavigate('runway')} className="w-full">
                Calculate Runway <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className={!hasLTVCACData ? 'border-primary' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Unit Economics
            </CardTitle>
            <CardDescription>
              Analyze customer profitability with LTV:CAC ratio and retention metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasLTVCACData && results.ltvCac ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">LTV:CAC</span>
                  <span className="font-semibold">{results.ltvCac.ratio.toFixed(2)}:1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">LTV</span>
                  <span className="font-semibold">{formatCurrency(results.ltvCac.ltv)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">CAC</span>
                  <span className="font-semibold">{formatCurrency(results.ltvCac.cac)}</span>
                </div>
                <Button onClick={() => onNavigate('unit-economics')} className="w-full" variant="outline">
                  View Details <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => onNavigate('unit-economics')} className="w-full">
                Calculate Unit Economics <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className={!hasEquityData ? 'border-primary' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Equity Management
            </CardTitle>
            <CardDescription>
              Fair co-founder splits and dilution forecasts for fundraising
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasEquityData && results.dilution ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Your Ownership</span>
                  <span className="font-semibold">{results.dilution.newOwnership.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Dilution</span>
                  <span className="font-semibold">{results.dilution.dilutionPercentage.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Post-Money Val</span>
                  <span className="font-semibold">{formatNumber(results.dilution.postMoneyValuation)}</span>
                </div>
                <Button onClick={() => onNavigate('equity')} className="w-full" variant="outline">
                  View Details <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => onNavigate('equity')} className="w-full">
                Calculate Equity <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className={!hasValuationData ? 'border-primary' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Valuation
            </CardTitle>
            <CardDescription>
              Investor-ready valuation estimates using Berkus and Revenue Multiple methods
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasValuationData && results.valuation ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Target</span>
                  <span className="font-semibold">{formatNumber(results.valuation.recommendedRange.mid)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Range</span>
                  <span className="font-semibold text-sm">
                    {formatNumber(results.valuation.recommendedRange.low)} - {formatNumber(results.valuation.recommendedRange.high)}
                  </span>
                </div>
                <Button onClick={() => onNavigate('valuation')} className="w-full" variant="outline">
                  View Details <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => onNavigate('valuation')} className="w-full">
                Calculate Valuation <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Health Indicators */}
      {(hasRunwayData || hasLTVCACData) && (
        <Card>
          <CardHeader>
            <CardTitle>Business Health Indicators</CardTitle>
            <CardDescription>Key metrics to monitor for sustainable growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hasRunwayData && results.runway && (
                <div className="flex items-start gap-3">
                  {results.runway.runwayStatus === 'healthy' ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : results.runway.runwayStatus === 'warning' ? (
                    <Info className="h-5 w-5 text-amber-500 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold">Cash Runway: {results.runway.runwayMonths.toFixed(1)} months</p>
                    <p className="text-sm text-muted-foreground">
                      {results.runway.runwayStatus === 'critical'
                        ? '⚠️ Critical: Less than 3 months of runway. Immediate action required.'
                        : results.runway.runwayStatus === 'warning'
                          ? '⚠️ Warning: Less than 6 months of runway. Start fundraising or reduce burn.'
                          : '✅ Healthy runway. Continue monitoring and plan ahead.'}
                    </p>
                  </div>
                </div>
              )}

              {hasLTVCACData && results.ltvCac && (
                <div className="flex items-start gap-3">
                  {results.ltvCac.rating === 'strong' || results.ltvCac.rating === 'good' ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold">LTV:CAC Ratio: {results.ltvCac.ratio.toFixed(2)}:1</p>
                    <p className="text-sm text-muted-foreground">{results.ltvCac.recommendation}</p>
                  </div>
                </div>
              )}

              {results.retention && (
                <div className="flex items-start gap-3">
                  {results.retention.status === 'excellent' || results.retention.status === 'good' ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold">Net Revenue Retention: {results.retention.nrr.toFixed(1)}%</p>
                    <p className="text-sm text-muted-foreground">{results.retention.benchmark}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
