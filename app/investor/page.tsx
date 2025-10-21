"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { DataBadge } from '@/components/ui/data-badge'
import { Button } from '@/components/ui/button'
import { 
  Search, 
  Briefcase, 
  TrendingUp, 
  DollarSign,
  Users,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  BarChart3,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import PrivatePlacementBanner from '@/components/compliance/PrivatePlacementBanner'
import { PendingApproval } from '@/components/approval/PendingApproval'
import { RejectedProfile } from '@/components/approval/RejectedProfile'

interface DashboardStats {
  totalDeals: number
  interestedDeals: number
  investedDeals: number
  totalInvested: number
  kycStatus: 'pending' | 'verified' | 'rejected'
  subscriptionTier: 'free' | 'pro'
}

export default function InvestorDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalDeals: 0,
    interestedDeals: 0,
    investedDeals: 0,
    totalInvested: 0,
    kycStatus: 'pending',
    subscriptionTier: 'free'
  })
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          logger.error('Session error', sessionError, {
            component: 'INVESTOR_DASHBOARD',
            action: 'GET_SESSION'
          })
          return
        }
        
        if (!session?.user) return

        // Get investor profile with error handling
        const { data: investorProfile, error: profileError } = await supabase
          .from('investor_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single()

        if (profileError && profileError.code !== 'PGRST116') {
          logger.error('Failed to fetch investor profile', profileError, {
            component: 'INVESTOR_DASHBOARD',
            action: 'FETCH_PROFILE',
            errorCode: profileError.code
          })
          return
        }

        // If no profile exists or profile is incomplete, redirect to onboarding
        if (!investorProfile || profileError?.code === 'PGRST116' || 
            !investorProfile.investment_preferences || 
            Object.keys(investorProfile.investment_preferences).length === 0) {
          router.push('/investor/onboarding')
          return
        }

        // Check KYC verification status
        if (investorProfile.kyc_status === 'pending' || investorProfile.kyc_status === 'rejected') {
          setProfile(investorProfile)
          setLoading(false)
          return
        }

        setProfile(investorProfile)

        if (investorProfile) {
          // Get investor interests
          const { data: interests, error: interestsError } = await supabase
            .from('investor_interests')
            .select('*')
            .eq('investor_profile_id', investorProfile.id)

          if (interestsError) {
            logger.error('Failed to fetch investor interests', interestsError, {
              component: 'INVESTOR_DASHBOARD',
              action: 'FETCH_INTERESTS'
            })
          }

          // Get total deals available
          const { data: deals, error: dealsError } = await supabase
            .from('startup_deals')
            .select('id')
            .eq('is_active', true)

          if (dealsError) {
            logger.error('Failed to fetch deals', dealsError, {
              component: 'INVESTOR_DASHBOARD',
              action: 'FETCH_DEALS'
            })
          }

          setStats({
            totalDeals: deals?.length || 0,
            interestedDeals: interests?.filter(i => i.interest_status === 'interested').length || 0,
            investedDeals: interests?.filter(i => i.interest_status === 'invested').length || 0,
            totalInvested: interests?.reduce((sum, i) => sum + (i.investment_amount || 0), 0) || 0,
            kycStatus: investorProfile.kyc_status,
            subscriptionTier: investorProfile.subscription_tier
          })
        }
      } catch (error) {
        logger.error('Failed to fetch investor dashboard data', error as Error, {
          component: 'INVESTOR_DASHBOARD',
          action: 'FETCH'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [supabase])

  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-2">
          <div className="h-10 bg-muted/50 rounded-lg w-1/3 shimmer"></div>
          <div className="h-5 bg-muted/30 rounded w-1/2 shimmer"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-40 bg-card rounded-lg border border-border shimmer"></div>
          ))}
        </div>
      </div>
    )
  }

  // Show pending verification screen
  if (profile?.kyc_status === 'pending') {
    return (
      <PendingApproval
        type="investor"
        submittedAt={profile.created_at}
        profileId={profile.id}
      />
    )
  }

  // Show rejected screen
  if (profile?.kyc_status === 'rejected') {
    return (
      <RejectedProfile
        type="investor"
        reason="Your investor profile could not be verified at this time. Please update your information and investment preferences, then resubmit for review."
        rejectedAt={profile.updated_at}
        canResubmit={true}
      />
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Investment Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Discover and invest in India's next generation of startups
          </p>
        </div>
        <div className="flex items-center gap-3">
          {stats.kycStatus === 'pending' && (
            <DataBadge variant="warning" icon={<Clock className="h-3 w-3" />} pulse>
              KYC Pending
            </DataBadge>
          )}
          {stats.kycStatus === 'verified' && (
            <DataBadge variant="success" icon={<CheckCircle className="h-3 w-3" />}>
              KYC Verified
            </DataBadge>
          )}
          {stats.subscriptionTier === 'pro' && (
            <DataBadge variant="info" icon={<Zap className="h-3 w-3" />}>
              Pro Investor
            </DataBadge>
          )}
        </div>
      </div>

      {/* KYC Status Alert */}
      {stats.kycStatus === 'pending' && (
        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div className="flex-1 space-y-2">
                <h3 className="text-sm font-semibold">
                  Complete your KYC verification
                </h3>
                <p className="text-sm text-muted-foreground">
                  Verify your identity to access all deals and investment opportunities.
                </p>
              </div>
              <Link href="/investor/kyc">
                <Button size="sm" className="gradient-primary">
                  Complete KYC
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Available Deals"
          value={stats.totalDeals}
          description="Active fundraising deals"
          icon={Search}
          trend={{ value: 12, isPositive: true }}
          variant="gradient-blue"
        />

        <StatCard
          title="Interested"
          value={stats.interestedDeals}
          description="Deals you're interested in"
          icon={FileText}
          variant="gradient-orange"
        />

        <StatCard
          title="Invested"
          value={stats.investedDeals}
          description="Deals you've invested in"
          icon={Briefcase}
          variant="gradient-green"
        />

        <StatCard
          title="Total Invested"
          value={`₹${stats.totalInvested.toLocaleString()}`}
          description="Across all investments"
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
          variant="gradient-purple"
        />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="relative card-premium hover-lift group overflow-hidden">
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <CardHeader className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold">Discover Deals</CardTitle>
                <CardDescription className="text-base">
                  Browse curated startup deals and find your next investment opportunity
                </CardDescription>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-primary/10 group-hover:from-cyan-500/20 group-hover:to-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Search className="h-7 w-7 text-cyan-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div className="p-4 rounded-xl bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm space-y-3 border border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Active Deals</span>
                <DataBadge variant="default">{stats.totalDeals}</DataBadge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg. Ticket Size</span>
                <span className="text-sm font-bold">₹5-15L</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <span className="text-sm text-muted-foreground">Interested</span>
                <span className="text-sm font-bold text-cyan-600">{stats.interestedDeals}</span>
              </div>
            </div>
            <Link href="/investor/deals" className="block">
              <Button className="w-full gradient-primary group/btn" size="lg">
                Explore Deal Flow
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="relative card-premium hover-lift group overflow-hidden">
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <CardHeader className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold">Portfolio Management</CardTitle>
                <CardDescription className="text-base">
                  Track your investments and receive updates from portfolio companies
                </CardDescription>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 group-hover:from-emerald-500/20 group-hover:to-green-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Briefcase className="h-7 w-7 text-emerald-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div className="p-4 rounded-xl bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm space-y-3 border border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Investments</span>
                <DataBadge variant="success">{stats.investedDeals}</DataBadge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Portfolio Value</span>
                <span className="text-sm font-bold">₹{stats.totalInvested.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <span className="text-sm text-muted-foreground">ROI Potential</span>
                <span className="text-sm font-bold text-emerald-600">+45%</span>
              </div>
            </div>
            <Link href="/investor/portfolio" className="block">
              <Button className="w-full group/btn" size="lg" variant="outline">
                Manage Portfolio
                <BarChart3 className="ml-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <Card className="card-premium overflow-hidden">
        <CardHeader className="bg-gradient-to-br from-muted/30 to-muted/10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold">Recent Activity</CardTitle>
              <CardDescription className="text-base">
                Your latest investment activities and deal interactions
              </CardDescription>
            </div>
            <div className="p-3 rounded-xl bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {stats.interestedDeals === 0 && stats.investedDeals === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex p-6 rounded-2xl bg-gradient-to-br from-muted/80 to-muted/40 mb-6 relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent" />
                  <Search className="h-12 w-12 text-muted-foreground relative z-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">No activity yet</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto text-base">
                  Start exploring deals to build your investment portfolio and grow your wealth.
                </p>
                <Link href="/investor/deals">
                  <Button size="lg" className="gradient-primary group">
                    Browse Deals
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="group flex items-center space-x-4 p-5 rounded-xl border border-border hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300 cursor-pointer">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 group-hover:from-emerald-500/20 group-hover:to-green-500/20 transition-all">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-xl bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold group-hover:text-emerald-600 transition-colors">New deal available</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                  <DataBadge variant="success">New</DataBadge>
                </div>
                <div className="group flex items-center space-x-4 p-5 rounded-xl border border-border hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 cursor-pointer">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all">
                    <div className="h-2.5 w-2.5 rounded-full bg-cyan-500"></div>
                    <div className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold group-hover:text-cyan-600 transition-colors">Portfolio update received</p>
                    <p className="text-sm text-muted-foreground">1 day ago</p>
                  </div>
                  <DataBadge variant="info">Update</DataBadge>
                </div>
                <div className="group flex items-center space-x-4 p-5 rounded-xl border border-border hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 cursor-pointer">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all">
                    <div className="h-2.5 w-2.5 rounded-full bg-purple-500"></div>
                    <div className="absolute inset-0 rounded-xl bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold group-hover:text-purple-600 transition-colors">Investment confirmed</p>
                    <p className="text-sm text-muted-foreground">3 days ago</p>
                  </div>
                  <DataBadge variant="default">Confirmed</DataBadge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Compliance notice */}
      <PrivatePlacementBanner />
    </div>
  )
}
