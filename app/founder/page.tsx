"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { DataBadge } from '@/components/ui/data-badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Building2, 
  FileText, 
  Users, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Plus,
  ArrowRight,
  Zap,
  Target
} from 'lucide-react'
import Link from 'next/link'
import PrivatePlacementBanner from '@/components/compliance/PrivatePlacementBanner'
import { PendingApproval } from '@/components/approval/PendingApproval'
import { RejectedProfile } from '@/components/approval/RejectedProfile'
import { ReadinessChecklist } from '@/components/founder/ReadinessChecklist'

interface DashboardStats {
  profileCompletion: number
  activeDeals: number
  totalInvestors: number
  totalRaised: number
  pendingApprovals: number
  dataRoomFiles: number
}

export default function FounderDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    profileCompletion: 0,
    activeDeals: 0,
    totalInvestors: 0,
    totalRaised: 0,
    pendingApprovals: 0,
    dataRoomFiles: 0
  })
  const [deals, setDeals] = useState<any[]>([])
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
            component: 'FOUNDER_DASHBOARD',
            action: 'GET_SESSION'
          })
          return
        }
        
        if (!session?.user) return

        // Get founder profile with error handling
        const { data: founderProfile, error: profileError } = await supabase
          .from('founder_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single()

        if (profileError && profileError.code !== 'PGRST116') {
          logger.error('Failed to fetch founder profile', profileError, {
            component: 'FOUNDER_DASHBOARD',
            action: 'FETCH_PROFILE'
          })
          return
        }

        // If no profile exists, redirect to onboarding
        if (!founderProfile || profileError?.code === 'PGRST116') {
          router.push('/founder/onboarding')
          return
        }

        // Check admin approval status
        if (founderProfile.admin_approval_status === 'pending' || founderProfile.admin_approval_status === 'rejected') {
          setProfile(founderProfile)
          setLoading(false)
          return
        }

        setProfile(founderProfile)

        if (founderProfile) {
          // Get active deals
          const { data: dealsData, error: dealsError } = await supabase
            .from('startup_deals')
            .select('*')
            .eq('founder_profile_id', founderProfile.id)
            .eq('is_active', true)

          if (dealsError) {
            logger.error('Failed to fetch deals', dealsError, {
              component: 'FOUNDER_DASHBOARD',
              action: 'FETCH_DEALS'
            })
          }

          setDeals(dealsData || [])

          // Get investor interests
          const { data: interests, error: interestsError } = await supabase
            .from('investor_interests')
            .select('*')
            .in('startup_deal_id', dealsData?.map(d => d.id) || [])

          if (interestsError) {
            logger.error('Failed to fetch interests', interestsError, {
              component: 'FOUNDER_DASHBOARD',
              action: 'FETCH_INTERESTS'
            })
          }

          // Get data room files count
          const { data: dataRoomFiles, error: filesError } = await supabase
            .from('data_room_files')
            .select('id')
            .eq('founder_profile_id', founderProfile.id)

          if (filesError) {
            logger.error('Failed to fetch data room files', filesError, {
              component: 'FOUNDER_DASHBOARD',
              action: 'FETCH_FILES'
            })
          }

          setStats({
            profileCompletion: founderProfile.profile_completion_percentage || 0,
            activeDeals: dealsData?.length || 0,
            totalInvestors: interests?.filter(i => i.interest_status === 'invested').length || 0,
            totalRaised: interests?.reduce((sum, i) => sum + (i.investment_amount || 0), 0) || 0,
            pendingApprovals: founderProfile.admin_approval_status === 'pending' ? 1 : 0,
            dataRoomFiles: dataRoomFiles?.length || 0
          })
        }
      } catch (error) {
        logger.error('Failed to fetch founder dashboard data', error as Error, {
          component: 'FOUNDER_DASHBOARD',
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

  // Show pending approval screen
  if (profile?.admin_approval_status === 'pending') {
    return (
      <PendingApproval
        type="founder"
        submittedAt={profile.created_at}
        profileId={profile.id}
      />
    )
  }

  // Show rejected screen
  if (profile?.admin_approval_status === 'rejected') {
    return (
      <RejectedProfile
        type="founder"
        reason="Your startup profile did not meet our verification requirements. Please update your profile information and resubmit for review."
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
          <h1 className="text-4xl font-bold tracking-tight">Founder Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Welcome back! Here's your startup overview
          </p>
        </div>
        {profile?.admin_approval_status === 'pending' && (
          <DataBadge variant="warning" icon={<Clock className="h-3 w-3" />} pulse>
            Pending Approval
          </DataBadge>
        )}
        {profile?.admin_approval_status === 'approved' && (
          <DataBadge variant="success" icon={<CheckCircle className="h-3 w-3" />}>
            Approved
          </DataBadge>
        )}
      </div>

      {/* Profile completion alert */}
      {stats.profileCompletion < 100 && (
        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div className="flex-1 space-y-2">
                  <h3 className="text-sm font-semibold">
                    Complete your startup profile
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your profile is {stats.profileCompletion}% complete. Complete it to get approved faster and attract investors.
                  </p>
                </div>
                <Link href="/founder/profile">
                  <Button size="sm" className="gradient-primary">
                    Complete Profile
                  </Button>
                </Link>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Profile completion</span>
                  <span className="font-medium">{stats.profileCompletion}%</span>
                </div>
                <Progress value={stats.profileCompletion} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Investor Readiness Checklist */}
      {profile?.admin_approval_status !== 'approved' && (
        <ReadinessChecklist
          profile={profile}
          deals={deals}
          dataRoomFiles={stats.dataRoomFiles}
        />
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Deals"
          value={stats.activeDeals}
          description="Currently fundraising"
          icon={FileText}
          variant="gradient-blue"
        />

        <StatCard
          title="Total Investors"
          value={stats.totalInvestors}
          description="Committed investors"
          icon={Users}
          trend={{ value: 15, isPositive: true }}
          variant="gradient-green"
        />

        <StatCard
          title="Total Raised"
          value={`₹${stats.totalRaised.toLocaleString()}`}
          description="From all deals"
          icon={DollarSign}
          trend={{ value: 22, isPositive: true }}
          variant="gradient-purple"
        />

        <StatCard
          title="Profile Status"
          value={profile?.admin_approval_status === 'approved' ? 'Approved' : 'Pending'}
          description={profile?.admin_approval_status === 'approved' ? 'Ready to fundraise' : 'Under review'}
          icon={profile?.admin_approval_status === 'approved' ? CheckCircle : Clock}
          variant="gradient-orange"
        />
      </div>

      {/* Compliance Reminder */}
      {stats.activeDeals > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Target className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold mb-1">
                  Investor Limit Compliance
                </h3>
                <p className="text-sm text-muted-foreground">
                  Remember: Each deal is automatically limited to 200 investors as per Section 42 compliance. 
                  Monitor your investor count closely.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="relative card-premium hover-lift group overflow-hidden">
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <CardHeader className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold">Startup Profile</CardTitle>
                <CardDescription className="text-base">
                  Manage your startup information and documents
                </CardDescription>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Building2 className="h-7 w-7 text-cyan-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div className="p-4 rounded-xl bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm space-y-3 border border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Profile Completion</span>
                <DataBadge variant={stats.profileCompletion === 100 ? "success" : "warning"}>
                  {stats.profileCompletion}%
                </DataBadge>
              </div>
              <Progress value={stats.profileCompletion} className="h-2.5" />
              {stats.profileCompletion < 100 && (
                <p className="text-xs text-muted-foreground">
                  Complete your profile to unlock all features
                </p>
              )}
            </div>
            <Link href="/founder/profile" className="block">
              <Button className="w-full group/btn" size="lg" variant="outline">
                {stats.profileCompletion < 100 ? 'Complete Profile' : 'Edit Profile'}
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
                <CardTitle className="text-2xl font-bold">Deal Management</CardTitle>
                <CardDescription className="text-base">
                  Create and manage your fundraising deals
                </CardDescription>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 group-hover:from-emerald-500/20 group-hover:to-green-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <FileText className="h-7 w-7 text-emerald-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div className="p-4 rounded-xl bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm space-y-3 border border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Active Deals</span>
                <DataBadge variant="success">{stats.activeDeals}</DataBadge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Investors</span>
                <span className="text-sm font-bold">{stats.totalInvestors}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <span className="text-sm text-muted-foreground">Total Raised</span>
                <span className="text-sm font-bold text-emerald-600">₹{stats.totalRaised.toLocaleString()}</span>
              </div>
            </div>
            <Link href="/founder/deals/create" className="block">
              <Button className="w-full gradient-primary group/btn" size="lg">
                <Plus className="mr-2 h-4 w-4 group-hover/btn:rotate-90 transition-transform" />
                Create New Deal
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
                Latest updates on your fundraising journey
              </CardDescription>
            </div>
            <div className="p-3 rounded-xl bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {stats.activeDeals === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex p-6 rounded-2xl bg-gradient-to-br from-muted/80 to-muted/40 mb-6 relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent" />
                  <FileText className="h-12 w-12 text-muted-foreground relative z-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">No active deals</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto text-base">
                  Create your first fundraising deal to start connecting with investors and grow your startup.
                </p>
                <Link href="/founder/deals/create">
                  <Button size="lg" className="gradient-primary group">
                    <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
                    Create Your First Deal
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
                    <p className="text-base font-semibold group-hover:text-emerald-600 transition-colors">New investor interest</p>
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
                    <p className="text-base font-semibold group-hover:text-cyan-600 transition-colors">Document signed</p>
                    <p className="text-sm text-muted-foreground">1 day ago</p>
                  </div>
                  <DataBadge variant="info">Signed</DataBadge>
                </div>
                <div className="group flex items-center space-x-4 p-5 rounded-xl border border-border hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 cursor-pointer">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all">
                    <div className="h-2.5 w-2.5 rounded-full bg-purple-500"></div>
                    <div className="absolute inset-0 rounded-xl bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold group-hover:text-purple-600 transition-colors">Profile updated</p>
                    <p className="text-sm text-muted-foreground">3 days ago</p>
                  </div>
                  <DataBadge variant="default">Update</DataBadge>
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
