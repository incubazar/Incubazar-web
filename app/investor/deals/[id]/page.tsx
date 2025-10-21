"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  Building2, 
  Users, 
  Lightbulb,
  TrendingUp,
  DollarSign,
  Target,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Loader2,
  Globe,
  Calendar,
  Briefcase,
  Award,
  TrendingDown
} from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface StartupProfile {
  id: string
  startup_name: string
  incorporation_status: string
  incorporation_number: string
  industry_sector: string
  stage: string
  admin_approval_status: string
}

interface StartupDetails {
  founded_date: string
  website: string
  founder_names: string
  team_size: string
  key_team_members: string
  advisor_names: string
  problem_statement: string
  solution_description: string
  unique_value_proposition: string
  target_customer: string
  product_status: string
  market_size: string
  target_market: string
  competitors: string
  competitive_advantage: string
  current_users: string
  monthly_revenue: string
  revenue_growth: string
  key_achievements: string
  fundraising_goal: string
  funds_use: string
  previous_funding: string
  equity_offered: string
  one_year_goal: string
  three_year_vision: string
  exit_strategy: string
}

export default function StartupDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<StartupProfile | null>(null)
  const [details, setDetails] = useState<StartupDetails | null>(null)
  const [error, setError] = useState('')
  const supabase = createClient()

  useEffect(() => {
    const fetchStartupData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) {
          router.push('/login')
          return
        }

        // Fetch founder profile
        const { data: profileData, error: profileError } = await supabase
          .from('founder_profiles')
          .select('*')
          .eq('id', params.id)
          .single()

        if (profileError) throw profileError

        setProfile(profileData)

        // Fetch detailed startup information
        const { data: detailsData, error: detailsError } = await supabase
          .from('startup_details')
          .select('*')
          .eq('founder_profile_id', params.id)
          .single()

        if (detailsError && detailsError.code !== 'PGRST116') {
          logger.error('Failed to fetch startup details', detailsError, {
            component: 'STARTUP_DETAIL',
            action: 'FETCH_DETAILS'
          })
        }

        setDetails(detailsData)
      } catch (error: any) {
        logger.error('Failed to fetch startup data', error, {
          component: 'STARTUP_DETAIL',
          action: 'FETCH'
        })
        setError(error.message || 'Failed to load startup information')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchStartupData()
    }
  }, [params.id, supabase, router])

  const handleExpressInterest = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return

      // Get investor profile
      const { data: investorProfile } = await supabase
        .from('investor_profiles')
        .select('id')
        .eq('user_id', session.user.id)
        .single()

      if (!investorProfile) {
        toast.error('Please complete your investor profile first')
        return
      }

      toast.success('Interest recorded! The founder will be notified.')
      router.push('/investor/deals')
    } catch (error: any) {
      toast.error('Failed to express interest')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || 'Startup not found'}</AlertDescription>
        </Alert>
        <Link href="/investor/deals">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Deals
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
      <Link href="/investor/deals">
            <Button variant="ghost" className="mb-4 -ml-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Deals
        </Button>
      </Link>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl font-bold text-gray-900">{profile.startup_name}</h1>
            <Badge variant="secondary">{profile.industry_sector}</Badge>
            <Badge variant={profile.stage === 'early_revenue' ? 'default' : 'outline'}>
              {profile.stage === 'idea' ? 'Idea Stage' : profile.stage === 'mvp' ? 'MVP' : 'Early Revenue'}
            </Badge>
                </div>
          {details?.website && (
            <div className="flex items-center gap-2 text-gray-600">
              <Globe className="h-4 w-4" />
              <a href={details.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {details.website}
              </a>
                  </div>
          )}
                </div>
        <Button className="gradient-primary" size="lg" onClick={handleExpressInterest}>
          <CheckCircle className="mr-2 h-5 w-5" />
          Express Interest
        </Button>
              </div>

      <Separator />

      {/* Basic Info Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Founded</p>
              <p className="text-lg font-semibold">{details?.founded_date || 'N/A'}</p>
                </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Team Size</p>
              <p className="text-lg font-semibold">{details?.team_size || 'N/A'}</p>
                </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Current Users</p>
              <p className="text-lg font-semibold">{details?.current_users || 'N/A'}</p>
                </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-lg font-semibold">{details?.monthly_revenue || 'N/A'}</p>
                </div>
          </CardContent>
        </Card>
              </div>

      {/* Team */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            Team
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Founders</h4>
            <p className="text-gray-700">{details?.founder_names || 'Not specified'}</p>
          </div>
          {details?.key_team_members && (
            <div>
              <h4 className="font-semibold mb-2">Key Team Members</h4>
              <p className="text-gray-700 whitespace-pre-line">{details.key_team_members}</p>
            </div>
          )}
          {details?.advisor_names && (
            <div>
              <h4 className="font-semibold mb-2">Advisors</h4>
              <p className="text-gray-700 whitespace-pre-line">{details.advisor_names}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product & Solution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6" />
            Product & Solution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Problem Statement</h4>
            <p className="text-gray-700 whitespace-pre-line">{details?.problem_statement || 'Not specified'}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Solution</h4>
            <p className="text-gray-700 whitespace-pre-line">{details?.solution_description || 'Not specified'}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Unique Value Proposition</h4>
            <p className="text-gray-700 whitespace-pre-line">{details?.unique_value_proposition || 'Not specified'}</p>
              </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Target Customer</h4>
              <p className="text-gray-700">{details?.target_customer || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Product Status</h4>
              <Badge>{details?.product_status || 'Not specified'}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market & Competition */}
      <Card>
            <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6" />
            Market & Competition
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Target Market</h4>
            <p className="text-gray-700 whitespace-pre-line">{details?.target_market || 'Not specified'}</p>
                </div>
          <div>
            <h4 className="font-semibold mb-2">Market Size</h4>
            <p className="text-gray-700 whitespace-pre-line">{details?.market_size || 'Not specified'}</p>
              </div>
          <div>
            <h4 className="font-semibold mb-2">Competitors</h4>
            <p className="text-gray-700 whitespace-pre-line">{details?.competitors || 'Not specified'}</p>
                </div>
          <div>
            <h4 className="font-semibold mb-2">Competitive Advantage</h4>
            <p className="text-gray-700 whitespace-pre-line">{details?.competitive_advantage || 'Not specified'}</p>
              </div>
            </CardContent>
          </Card>

      {/* Traction */}
      <Card>
            <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Traction & Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Users/Customers</h4>
              <p className="text-gray-700">{details?.current_users || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Monthly Revenue</h4>
              <p className="text-gray-700">{details?.monthly_revenue || 'Not specified'}</p>
                </div>
            <div>
              <h4 className="font-semibold mb-2">Growth Rate</h4>
              <p className="text-gray-700">{details?.revenue_growth || 'Not specified'}</p>
              </div>
                </div>
          {details?.key_achievements && (
            <div>
              <h4 className="font-semibold mb-2">Key Achievements</h4>
              <p className="text-gray-700 whitespace-pre-line">{details.key_achievements}</p>
              </div>
          )}
            </CardContent>
          </Card>

      {/* Fundraising */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-6 w-6" />
            Fundraising Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Fundraising Goal</h4>
              <p className="text-2xl font-bold text-primary">{details?.fundraising_goal || 'Not specified'}</p>
                  </div>
            <div>
              <h4 className="font-semibold mb-2">Equity Offered</h4>
              <p className="text-2xl font-bold text-primary">{details?.equity_offered || 'Not specified'}</p>
                </div>
                    </div>
          {details?.funds_use && (
            <div>
              <h4 className="font-semibold mb-2">Use of Funds</h4>
              <p className="text-gray-700 whitespace-pre-line">{details.funds_use}</p>
                </div>
          )}
          {details?.previous_funding && (
            <div>
              <h4 className="font-semibold mb-2">Previous Funding</h4>
              <p className="text-gray-700 whitespace-pre-line">{details.previous_funding}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vision */}
      <Card>
              <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-6 w-6" />
            Vision & Goals
          </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
          {details?.one_year_goal && (
            <div>
              <h4 className="font-semibold mb-2">1-Year Goal</h4>
              <p className="text-gray-700 whitespace-pre-line">{details.one_year_goal}</p>
                  </div>
                )}
          {details?.three_year_vision && (
            <div>
              <h4 className="font-semibold mb-2">3-Year Vision</h4>
              <p className="text-gray-700 whitespace-pre-line">{details.three_year_vision}</p>
                  </div>
                )}
          {details?.exit_strategy && (
            <div>
              <h4 className="font-semibold mb-2">Exit Strategy</h4>
              <p className="text-gray-700 whitespace-pre-line">{details.exit_strategy}</p>
                  </div>
                )}
              </CardContent>
            </Card>

      {/* CTA */}
      <Card className="border-primary">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Interested in this opportunity?</h3>
            <p className="text-gray-600">Express your interest to connect with the founders</p>
            <Button className="gradient-primary" size="lg" onClick={handleExpressInterest}>
              <CheckCircle className="mr-2 h-5 w-5" />
              Express Interest
            </Button>
              </div>
            </CardContent>
          </Card>
    </div>
  )
}
