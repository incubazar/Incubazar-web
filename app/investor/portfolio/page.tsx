'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, Clock, CheckCircle, XCircle, 
  Building2, DollarSign, Calendar, ArrowRight,
  Briefcase, Filter
} from 'lucide-react'
import { toast } from 'sonner'
import { logger } from '@/lib/logger'

interface PortfolioItem {
  id: string
  status: 'pending' | 'accepted' | 'rejected' | 'invested'
  investment_amount?: number
  investment_date?: string
  notes?: string
  created_at: string
  deal: {
    id: string
    deal_title: string
    fundraising_goal: number
    min_investment: number
    instrument_type: string
    founder_profile: {
      startup_name: string
      industry_sector: string
      stage: string
      location: string
    }
  }
}

export default function InvestorPortfolioPage() {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [activeTab, setActiveTab] = useState('all')
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    invested: 0,
    rejected: 0,
    totalInvested: 0
  })

  const fetchPortfolio = useCallback(async () => {
    try {
      setLoading(true)

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      // Get investor profile
      const { data: investorProfile, error: profileError } = await supabase
        .from('investor_profiles')
        .select('id')
        .eq('user_id', session.user.id)
        .single()

      if (profileError) throw profileError

      // Fetch all investor interests with deal details
      const { data: interests, error: interestsError } = await supabase
        .from('investor_interests')
        .select(`
          id,
          status,
          investment_amount,
          investment_date,
          notes,
          created_at,
          deal:startup_deals (
            id,
            deal_title,
            fundraising_goal,
            min_investment,
            instrument_type,
            founder_profile:founder_profiles (
              startup_name,
              industry_sector,
              stage,
              location
            )
          )
        `)
        .eq('investor_profile_id', investorProfile.id)
        .order('created_at', { ascending: false })

      if (interestsError) throw interestsError

      const portfolioData = (interests || []) as any[]
      setPortfolio(portfolioData)

      // Calculate stats
      const stats = {
        total: portfolioData.length,
        pending: portfolioData.filter(i => i.status === 'pending').length,
        accepted: portfolioData.filter(i => i.status === 'accepted').length,
        invested: portfolioData.filter(i => i.status === 'invested').length,
        rejected: portfolioData.filter(i => i.status === 'rejected').length,
        totalInvested: portfolioData
          .filter(i => i.status === 'invested')
          .reduce((sum, i) => sum + (i.investment_amount || 0), 0)
      }
      setStats(stats)

    } catch (error: any) {
      logger.error('Failed to fetch portfolio', error, {
        component: 'INVESTOR_PORTFOLIO',
        action: 'FETCH'
      })
      toast.error('Failed to load portfolio')
    } finally {
      setLoading(false)
    }
  }, [router, supabase])

  useEffect(() => {
    fetchPortfolio()
  }, [fetchPortfolio])

  const getFilteredPortfolio = () => {
    if (activeTab === 'all') return portfolio
    return portfolio.filter(item => item.status === activeTab)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Pending</span>
          </Badge>
        )
      case 'accepted':
        return (
          <Badge variant="default" className="flex items-center space-x-1 bg-blue-600">
            <CheckCircle className="h-3 w-3" />
            <span>Connected</span>
          </Badge>
        )
      case 'invested':
        return (
          <Badge variant="default" className="flex items-center space-x-1 bg-green-600">
            <CheckCircle className="h-3 w-3" />
            <span>Invested</span>
          </Badge>
        )
      case 'rejected':
        return (
          <Badge variant="destructive" className="flex items-center space-x-1">
            <XCircle className="h-3 w-3" />
            <span>Declined</span>
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
          </div>
          <p className="text-gray-600">
            Track all your investment interests and manage your startup connections
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Interests</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Connected</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.accepted}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Invested</p>
                  <p className="text-2xl font-bold text-green-600">{stats.invested}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Invested</p>
                <p className="text-xl font-bold text-green-700">
                  {formatCurrency(stats.totalInvested)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for filtering */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">
              All ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({stats.pending})
            </TabsTrigger>
            <TabsTrigger value="accepted">
              Connected ({stats.accepted})
            </TabsTrigger>
            <TabsTrigger value="invested">
              Invested ({stats.invested})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Declined ({stats.rejected})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Portfolio List */}
        {getFilteredPortfolio().length === 0 ? (
          <Card>
            <CardContent className="p-12">
              <div className="text-center">
                <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No investments found
                </h3>
                <p className="text-gray-600 mb-6">
                  {activeTab === 'all' 
                    ? "You haven't expressed interest in any deals yet."
                    : `No ${activeTab} investments at the moment.`}
                </p>
                <Button onClick={() => router.push('/investor')}>
                  Explore Deals
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {getFilteredPortfolio().map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <Building2 className="h-5 w-5 text-blue-600" />
                            <h3 className="text-xl font-semibold text-gray-900">
                              {item.deal.founder_profile.startup_name}
                            </h3>
                            {getStatusBadge(item.status)}
                          </div>
                          <p className="text-gray-700 mb-2">{item.deal.deal_title}</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{item.deal.founder_profile.industry_sector}</Badge>
                            <Badge variant="outline">{item.deal.founder_profile.stage}</Badge>
                            <Badge variant="outline">{item.deal.founder_profile.location}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                        <div>
                          <p className="text-sm text-gray-500">Fundraising Goal</p>
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(item.deal.fundraising_goal)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Min. Investment</p>
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(item.deal.min_investment)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Instrument</p>
                          <p className="font-semibold text-gray-900">{item.deal.instrument_type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Interest Date</p>
                          <p className="font-semibold text-gray-900 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(item.created_at)}
                          </p>
                        </div>
                      </div>

                      {item.status === 'invested' && item.investment_amount && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-green-700 font-medium">Investment Amount</p>
                              <p className="text-xl font-bold text-green-800">
                                {formatCurrency(item.investment_amount)}
                              </p>
                            </div>
                            {item.investment_date && (
                              <div className="text-right">
                                <p className="text-sm text-green-700">Invested on</p>
                                <p className="font-semibold text-green-800">
                                  {formatDate(item.investment_date)}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {item.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Notes:</span> {item.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="ml-4">
                      <Button
                        variant="outline"
                        onClick={() => router.push(`/investor/deals/${item.deal.id}`)}
                      >
                        View Deal
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
