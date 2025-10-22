'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ExpressInterestButton } from '@/components/investor/ExpressInterestButton'
import { DataRoomAccess } from '@/components/investor/DataRoomAccess'
import { InvestorLimitTracker } from '@/components/compliance/InvestorLimitTracker'
import PrivatePlacementNotice from '@/components/compliance/PrivatePlacementNotice'
import { 
  ArrowLeft, Building2, Users, Lightbulb, TrendingUp, 
  Target, DollarSign, FileText, Calendar, MapPin,
  ExternalLink, Award, Briefcase
} from 'lucide-react'
import { toast } from 'sonner'
import { logger } from '@/lib/logger'

interface DealDetail {
  id: string
  deal_title: string
  problem_statement: string
  unique_solution: string
  value_proposition: string
  fundraising_goal: number
  min_investment: number
  max_investment: number
  instrument_type: string
  equity_offered: number
  use_of_funds: string
  created_at: string
  founder_profile: {
    id: string
    startup_name: string
    industry_sector: string
    stage: string
    team_size: number
    founded_date: string
    location: string
    website_url: string
    linkedin_url: string
    twitter_url: string
    company_description: string
    target_market: string
    market_size_tam: string
    market_size_sam: string
    market_size_som: string
    competitive_advantage: string
    key_competitors: string
    current_users: number
    current_revenue: number
    monthly_growth_rate: number
    key_metrics: any
    founder_background: string
    advisors: string
    pitch_deck_url: string
    demo_video_url: string
  }
}

export default function InvestorDealDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dealId = params.id as string
  const supabase = createClient()

  const [deal, setDeal] = useState<DealDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [investorInterestCount, setInvestorInterestCount] = useState(0)
  const [investorProfileId, setInvestorProfileId] = useState<string>('')
  const [hasExpressedInterest, setHasExpressedInterest] = useState(false)

  useEffect(() => {
    fetchDealDetails()
  }, [dealId])

  const fetchDealDetails = async () => {
    try {
      setLoading(true)

      // Get current user
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      // Fetch deal with founder profile
      const { data: dealData, error: dealError } = await supabase
        .from('startup_deals')
        .select(`
          *,
          founder_profile:founder_profiles(*)
        `)
        .eq('id', dealId)
        .eq('is_active', true)
        .eq('admin_approval_status', 'approved')
        .single()

      if (dealError) throw dealError

      if (!dealData) {
        toast.error('Deal not found or not available')
        router.push('/investor')
        return
      }

      setDeal(dealData as any)

      // Get investor interest count
      const { data: interests, error: interestsError } = await supabase
        .from('investor_interests')
        .select('id, investor_profile_id')
        .eq('deal_id', dealId)
        .eq('status', 'pending')

      if (!interestsError) {
        setInvestorInterestCount(interests?.length || 0)

        // Get investor profile
        const { data: investorProfile } = await supabase
          .from('investor_profiles')
          .select('id')
          .eq('user_id', session.user.id)
          .single()

        if (investorProfile) {
          setInvestorProfileId(investorProfile.id)
          
          // Check if this investor has expressed interest
          const hasInterest = interests?.some(
            (i) => i.investor_profile_id === investorProfile.id
          )
          setHasExpressedInterest(hasInterest || false)
        }
      }
    } catch (error: any) {
      logger.error('Failed to fetch deal details', error, {
        component: 'INVESTOR_DEAL_DETAIL',
        action: 'FETCH_DEAL'
      })
      toast.error('Failed to load deal details')
    } finally {
      setLoading(false)
    }
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
      month: 'long'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!deal) {
    return null
  }

  const profile = deal.founder_profile

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Deals
        </Button>

        {/* Compliance Notice */}
        <div className="mb-6">
          <PrivatePlacementNotice variant="compact" />
        </div>

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile.startup_name}
                </h1>
              </div>
              <p className="text-lg text-gray-600 mb-4">{deal.deal_title}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{profile.industry_sector}</Badge>
                <Badge variant="outline">{profile.stage}</Badge>
                <Badge variant="outline">
                  <MapPin className="h-3 w-3 mr-1" />
                  {profile.location}
                </Badge>
                <Badge variant="outline">
                  <Calendar className="h-3 w-3 mr-1" />
                  Founded {formatDate(profile.founded_date)}
                </Badge>
              </div>

              <div className="flex space-x-4">
                {profile.website_url && (
                  <a
                    href={profile.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center text-sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Website
                  </a>
                )}
                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center text-sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    LinkedIn
                  </a>
                )}
                {profile.twitter_url && (
                  <a
                    href={profile.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center text-sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Twitter
                  </a>
                )}
              </div>
            </div>

            <div className="text-right">
              {investorProfileId && (
                <ExpressInterestButton
                  dealId={deal.id}
                  investorProfileId={investorProfileId}
                  onSuccess={() => {
                    setHasExpressedInterest(true)
                    setInvestorInterestCount(prev => prev + 1)
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Investor Limit Tracker */}
        <div className="mb-6">
          <InvestorLimitTracker
            currentCount={investorInterestCount}
          />
        </div>

        {/* Section 1: Company Overview */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <CardTitle>Company Overview</CardTitle>
            </div>
            <CardDescription>About the company and industry</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{profile.company_description}</p>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Industry</p>
                <p className="font-semibold text-gray-900">{profile.industry_sector}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Stage</p>
                <p className="font-semibold text-gray-900">{profile.stage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Team Size</p>
                <p className="font-semibold text-gray-900">{profile.team_size} members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Team */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <CardTitle>Team & Leadership</CardTitle>
            </div>
            <CardDescription>Founders, team members, and advisors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                Founder Background
              </h3>
              <p className="text-gray-700">{profile.founder_background}</p>
            </div>

            {profile.advisors && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    Advisors
                  </h3>
                  <p className="text-gray-700">{profile.advisors}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Section 3: Product & Solution */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              <CardTitle>Product & Solution</CardTitle>
            </div>
            <CardDescription>Problem being solved and the solution offered</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Problem Statement</h3>
              <p className="text-gray-700">{deal.problem_statement}</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Unique Solution</h3>
              <p className="text-gray-700">{deal.unique_solution}</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Value Proposition</h3>
              <p className="text-gray-700">{deal.value_proposition}</p>
            </div>

            {profile.demo_video_url && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Product Demo</h3>
                  <a
                    href={profile.demo_video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Watch Demo Video
                  </a>
                </div>
              </>
            )}

            {profile.pitch_deck_url && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Pitch Deck</h3>
                  <a
                    href={profile.pitch_deck_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Pitch Deck
                  </a>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Section 4: Market Opportunity */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <CardTitle>Market Opportunity</CardTitle>
            </div>
            <CardDescription>Market size, competitors, and competitive advantage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Target Market</h3>
              <p className="text-gray-700">{profile.target_market}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">TAM (Total Addressable)</p>
                <p className="text-xl font-bold text-blue-600">{profile.market_size_tam}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">SAM (Serviceable Addressable)</p>
                <p className="text-xl font-bold text-purple-600">{profile.market_size_sam}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">SOM (Serviceable Obtainable)</p>
                <p className="text-xl font-bold text-green-600">{profile.market_size_som}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Competitive Advantage</h3>
              <p className="text-gray-700">{profile.competitive_advantage}</p>
            </div>

            {profile.key_competitors && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Key Competitors</h3>
                  <p className="text-gray-700">{profile.key_competitors}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Section 5: Traction & Metrics */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <CardTitle>Traction & Growth</CardTitle>
            </div>
            <CardDescription>Current performance and growth metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Current Users</p>
                <p className="text-2xl font-bold text-blue-700">
                  {profile.current_users?.toLocaleString('en-IN') || 'N/A'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-700">
                  {profile.current_revenue ? formatCurrency(profile.current_revenue) : 'N/A'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Growth Rate (MoM)</p>
                <p className="text-2xl font-bold text-purple-700">
                  {profile.monthly_growth_rate ? `${profile.monthly_growth_rate}%` : 'N/A'}
                </p>
              </div>
            </div>

            {profile.key_metrics && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Key Metrics</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                      {typeof profile.key_metrics === 'string' 
                        ? profile.key_metrics 
                        : JSON.stringify(profile.key_metrics, null, 2)}
                    </pre>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Section 6: Fundraising Details */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <CardTitle>Fundraising Details</CardTitle>
            </div>
            <CardDescription>Investment terms and use of funds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Fundraising Goal</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(deal.fundraising_goal)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Instrument Type</p>
                  <Badge className="mt-1">{deal.instrument_type}</Badge>
                </div>
                {deal.equity_offered && (
                  <div>
                    <p className="text-sm text-gray-500">Equity Offered</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {deal.equity_offered}%
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Minimum Investment</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {formatCurrency(deal.min_investment)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Maximum Investment</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {deal.max_investment ? formatCurrency(deal.max_investment) : 'No limit'}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Use of Funds</h3>
              <p className="text-gray-700">{deal.use_of_funds}</p>
            </div>
          </CardContent>
        </Card>

        {/* Data Room Access */}
        <DataRoomAccess
          dealId={deal.id}
          founderId={profile.id}
          hasExpressedInterest={hasExpressedInterest}
        />

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 mt-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Interested in this opportunity?
                </h3>
                <p className="text-gray-600 text-sm">
                  Express your interest to connect with the founder and get access to more details.
                </p>
              </div>
              {investorProfileId && (
                <ExpressInterestButton
                  dealId={deal.id}
                  investorProfileId={investorProfileId}
                  onSuccess={() => {
                    setHasExpressedInterest(true)
                    setInvestorInterestCount(prev => prev + 1)
                  }}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
