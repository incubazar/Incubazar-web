"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  FileText,
  TrendingUp,
  Shield
} from 'lucide-react'

interface ComplianceStats {
  totalDeals: number
  nearLimitDeals: number
  atLimitDeals: number
  complianceScore: number
  lastAudit: string
}

interface DealCompliance {
  id: string
  deal_title: string
  investor_count: number
  investor_limit: number
  percentage: number
  status: 'safe' | 'warning' | 'critical'
}

export default function ComplianceMonitor() {
  const [stats, setStats] = useState<ComplianceStats>({
    totalDeals: 0,
    nearLimitDeals: 0,
    atLimitDeals: 0,
    complianceScore: 100,
    lastAudit: new Date().toISOString()
  })
  const [deals, setDeals] = useState<DealCompliance[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchComplianceData = async () => {
      try {
        // Get all active deals
        const { data: allDeals } = await supabase
          .from('startup_deals')
          .select('id, deal_title, investor_count, investor_limit')
          .eq('is_active', true)

        if (!allDeals) return

        // Calculate compliance metrics
        const totalDeals = allDeals.length
        const nearLimitDeals = allDeals.filter(d => (d.investor_count / d.investor_limit) >= 0.8).length
        const atLimitDeals = allDeals.filter(d => d.investor_count >= d.investor_limit).length
        
        // Calculate compliance score (100 - penalty for violations)
        const complianceScore = Math.max(0, 100 - (nearLimitDeals * 5) - (atLimitDeals * 20))

        setStats({
          totalDeals,
          nearLimitDeals,
          atLimitDeals,
          complianceScore,
          lastAudit: new Date().toISOString()
        })

        // Process deals for detailed view
        const dealCompliance: DealCompliance[] = allDeals.map(deal => {
          const percentage = (deal.investor_count / deal.investor_limit) * 100
          let status: 'safe' | 'warning' | 'critical' = 'safe'
          
          if (percentage >= 100) status = 'critical'
          else if (percentage >= 80) status = 'warning'

          return {
            id: deal.id,
            deal_title: deal.deal_title,
            investor_count: deal.investor_count,
            investor_limit: deal.investor_limit,
            percentage,
            status
          }
        })

        setDeals(dealCompliance.sort((a, b) => b.percentage - a.percentage))

      } catch (error) {
        logger.error('Error fetching compliance data', error as Error, {
          component: 'COMPLIANCE_MONITOR',
          action: 'FETCH'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchComplianceData()
  }, [supabase])

  const getComplianceStatus = () => {
    if (stats.complianceScore >= 90) return 'excellent'
    if (stats.complianceScore >= 70) return 'good'
    if (stats.complianceScore >= 50) return 'warning'
    return 'critical'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600'
      case 'good': return 'text-blue-600'
      case 'warning': return 'text-orange-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-4 w-4" />
      case 'good': return <CheckCircle className="h-4 w-4" />
      case 'warning': return <AlertTriangle className="h-4 w-4" />
      case 'critical': return <AlertTriangle className="h-4 w-4" />
      default: return <CheckCircle className="h-4 w-4" />
    }
  }

  const getDealStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <Badge variant="destructive">At Limit</Badge>
      case 'warning':
        return <Badge variant="secondary">Near Limit</Badge>
      default:
        return <Badge variant="outline">Safe</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Compliance Overview</span>
          </CardTitle>
          <CardDescription>
            Section 42 Compliance Monitoring - 200-Investor Limit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.totalDeals}</div>
              <div className="text-sm text-gray-500">Total Deals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.totalDeals - stats.nearLimitDeals - stats.atLimitDeals}
              </div>
              <div className="text-sm text-gray-500">Safe Deals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.nearLimitDeals}</div>
              <div className="text-sm text-gray-500">Near Limit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.atLimitDeals}</div>
              <div className="text-sm text-gray-500">At Limit</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Compliance Score</span>
              <span className="text-sm text-gray-500">{stats.complianceScore}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  stats.complianceScore >= 90 ? 'bg-green-500' :
                  stats.complianceScore >= 70 ? 'bg-blue-500' :
                  stats.complianceScore >= 50 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${stats.complianceScore}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-4">
            <div className={`flex items-center space-x-2 ${getStatusColor(getComplianceStatus())}`}>
              {getStatusIcon(getComplianceStatus())}
              <span className="font-medium capitalize">
                {getComplianceStatus()} Compliance Status
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deal Status */}
      <Card>
        <CardHeader>
          <CardTitle>Deal Compliance Status</CardTitle>
          <CardDescription>
            Individual deal compliance with 200-investor limit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {deals.map((deal) => (
              <div key={deal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{deal.deal_title}</div>
                  <div className="text-sm text-gray-500">
                    {deal.investor_count}/{deal.investor_limit} investors ({deal.percentage.toFixed(1)}%)
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        deal.status === 'critical' ? 'bg-red-500' :
                        deal.status === 'warning' ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(deal.percentage, 100)}%` }}
                    ></div>
                  </div>
                  {getDealStatusBadge(deal.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Alerts */}
      {(stats.nearLimitDeals > 0 || stats.atLimitDeals > 0) && (
        <Alert className={stats.atLimitDeals > 0 ? 'border-red-200 bg-red-50' : 'border-orange-200 bg-orange-50'}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {stats.atLimitDeals > 0 ? (
              <div>
                <strong>Critical:</strong> {stats.atLimitDeals} deal(s) have reached the 200-investor limit 
                and are now closed. {stats.nearLimitDeals} deal(s) are approaching the limit.
              </div>
            ) : (
              <div>
                <strong>Warning:</strong> {stats.nearLimitDeals} deal(s) are approaching the 200-investor limit 
                and may need attention soon.
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Compliance Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">
                Section 42 Compliance
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                The platform automatically enforces the 200-investor limit per deal to ensure 
                compliance with Section 42 of the Companies Act 2013. This monitoring system 
                helps maintain regulatory compliance and protects both investors and startups.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
