"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Eye,
  FileText,
  Building2,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency, formatDate } from '@/lib/utils'

interface PortfolioItem {
  id: string
  interest_status: 'viewed' | 'interested' | 'documents_requested' | 'invested'
  investment_amount: number | null
  notes: string | null
  created_at: string
  startup_deals: {
    id: string
    deal_title: string
    fundraising_goal: number
    min_investment: number
    max_investment: number
    instrument_type: string
    investor_count: number
    investor_limit: number
    platform_scorecard: any
    founder_profiles: {
      startup_name: string
      industry_sector: string
      stage: string
    }
  }
}

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'invested' | 'interested' | 'viewed'>('all')
  const supabase = createClient()

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) return

        // Get investor profile
        const { data: investorProfile } = await supabase
          .from('investor_profiles')
          .select('id')
          .eq('user_id', session.user.id)
          .single()

        if (!investorProfile) return

        // Get portfolio items
        const { data: interests } = await supabase
          .from('investor_interests')
          .select(`
            *,
            startup_deals (
              id,
              deal_title,
              fundraising_goal,
              min_investment,
              max_investment,
              instrument_type,
              investor_count,
              investor_limit,
              platform_scorecard,
              founder_profiles (
                startup_name,
                industry_sector,
                stage
              )
            )
          `)
          .eq('investor_profile_id', investorProfile.id)
          .order('created_at', { ascending: false })

        setPortfolioItems(interests || [])
      } catch (error) {
        logger.error('Failed to fetch investor portfolio', error as Error, {
          component: 'INVESTOR_PORTFOLIO',
          action: 'FETCH'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
  }, [supabase])

  const filteredItems = portfolioItems.filter(item => {
    if (filter === 'all') return true
    return item.interest_status === filter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'invested':
        return <Badge variant="default" className="flex items-center space-x-1">
          <CheckCircle className="h-3 w-3" />
          <span>Invested</span>
        </Badge>
      case 'documents_requested':
        return <Badge variant="secondary" className="flex items-center space-x-1">
          <FileText className="h-3 w-3" />
          <span>Documents</span>
        </Badge>
      case 'interested':
        return <Badge variant="outline" className="flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>Interested</span>
        </Badge>
      default:
        return <Badge variant="secondary" className="flex items-center space-x-1">
          <Eye className="h-3 w-3" />
          <span>Viewed</span>
        </Badge>
    }
  }

  const getInvestorLimitStatus = (deal: any) => {
    const percentage = (deal.investor_count / deal.investor_limit) * 100
    
    if (percentage >= 90) {
      return <Badge variant="destructive">Near Limit</Badge>
    } else if (percentage >= 70) {
      return <Badge variant="secondary">Getting Full</Badge>
    }
    
    return <Badge variant="outline">Available</Badge>
  }

  const totalInvested = portfolioItems
    .filter(item => item.interest_status === 'invested')
    .reduce((sum, item) => sum + (item.investment_amount || 0), 0)

  const investedCount = portfolioItems.filter(item => item.interest_status === 'invested').length

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
          <p className="text-gray-600">Track your investments and startup interests</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({portfolioItems.length})
          </Button>
          <Button
            variant={filter === 'invested' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('invested')}
          >
            Invested ({investedCount})
          </Button>
          <Button
            variant={filter === 'interested' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('interested')}
          >
            Interested ({portfolioItems.filter(i => i.interest_status === 'interested').length})
          </Button>
          <Button
            variant={filter === 'viewed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('viewed')}
          >
            Viewed ({portfolioItems.filter(i => i.interest_status === 'viewed').length})
          </Button>
        </div>
      </div>

      {/* Portfolio stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalInvested)}</div>
            <p className="text-xs text-muted-foreground">
              Across all investments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investments</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{investedCount}</div>
            <p className="text-xs text-muted-foreground">
              Active investments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹0</div>
            <p className="text-xs text-muted-foreground">
              Current valuation
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio table */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Portfolio</CardTitle>
          <CardDescription>
            Track your investments and startup interests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No portfolio items</h3>
              <p className="text-gray-500 mb-4">
                {filter === 'all' 
                  ? 'You haven\'t shown interest in any deals yet.'
                  : `No ${filter} items found.`
                }
              </p>
              <Link href="/investor/deals">
                <Button>Browse Deals</Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Startup</TableHead>
                  <TableHead>Deal</TableHead>
                  <TableHead>Investment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Platform Score</TableHead>
                  <TableHead>Investor Limit</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{item.startup_deals.founder_profiles.startup_name}</div>
                          <div className="text-sm text-gray-500">{item.startup_deals.founder_profiles.industry_sector}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.startup_deals.deal_title}</div>
                        <div className="text-sm text-gray-500">
                          {formatCurrency(item.startup_deals.fundraising_goal)} goal
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.investment_amount ? (
                        <div className="font-medium">{formatCurrency(item.investment_amount)}</div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          {formatCurrency(item.startup_deals.min_investment)} - {formatCurrency(item.startup_deals.max_investment)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(item.interest_status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          {item.startup_deals.platform_scorecard?.overall || 0}/10
                        </span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(item.startup_deals.platform_scorecard?.overall || 0) * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">
                          {item.startup_deals.investor_count}/{item.startup_deals.investor_limit}
                        </span>
                        {getInvestorLimitStatus(item.startup_deals)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{formatDate(item.created_at)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Link href={`/investor/deals/${item.startup_deals.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Quarterly updates section */}
      <Card>
        <CardHeader>
          <CardTitle>Quarterly Updates</CardTitle>
          <CardDescription>
            Latest updates from your portfolio companies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No updates yet</h3>
              <p className="text-gray-500">
                Quarterly updates will appear here once you have invested in startups.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
