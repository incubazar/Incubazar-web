"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  Building2,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity,
  DollarSign,
  FileText,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import { BarChart, Bar, PieChart as RePieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface DashboardStats {
  total_users: number
  total_founders: number
  total_investors: number
  pending_founder_approvals: number
  pending_investor_verifications: number
  approved_founders: number
  approved_investors: number
  active_deals: number
  total_raised: number
  pending_waitlist: number
  approved_waitlist: number
  rejected_waitlist: number
  platform_growth: any[]
  sector_distribution: any[]
  stage_distribution: any[]
  recent_signups: any[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push('/login')
          return
        }

        // Check if user is admin
        const { data: user, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle()

        if (userError) {
          logger.error('Failed to fetch user role', userError, {
            component: 'ADMIN_DASHBOARD',
            action: 'CHECK_ADMIN'
          })
          setError('Failed to verify admin access')
          return
        }

        if (!user || user.role !== 'admin') {
          setError('Unauthorized: Admin access only')
          return
        }

        // Fetch all statistics
        const [
          usersResult,
          foundersResult,
          investorsResult,
          dealsResult,
          interestsResult,
          waitlistResult
        ] = await Promise.all([
          supabase.from('users').select('id, role, created_at'),
          supabase.from('founder_profiles').select('id, admin_approval_status, industry_sector, stage, created_at'),
          supabase.from('investor_profiles').select('id, kyc_status, created_at'),
          supabase.from('startup_deals').select('id, is_active, fundraising_goal'),
          supabase.from('investor_interests').select('investment_amount, interest_status'),
          supabase.from('waitlist').select('id, status, created_at')
        ])

        // Calculate stats
        const totalUsers = usersResult.data?.length || 0
        const founders = foundersResult.data || []
        const investors = investorsResult.data || []
        const deals = dealsResult.data || []
        const interests = interestsResult.data || []
        const waitlist = waitlistResult.data || []

        const pendingFounders = founders.filter(f => f.admin_approval_status === 'pending').length
        const approvedFounders = founders.filter(f => f.admin_approval_status === 'approved').length
        const pendingInvestors = investors.filter(i => i.kyc_status === 'pending').length
        const approvedInvestors = investors.filter(i => i.kyc_status === 'verified').length
        const activeDeals = deals.filter(d => d.is_active).length
        
        const pendingWaitlist = waitlist.filter(w => w.status === 'pending').length
        const approvedWaitlist = waitlist.filter(w => w.status === 'approved').length
        const rejectedWaitlist = waitlist.filter(w => w.status === 'rejected').length
        
        const totalRaised = interests
          .filter(i => i.interest_status === 'invested')
          .reduce((sum, i) => sum + (i.investment_amount || 0), 0)

        // Sector distribution
        const sectorCounts: Record<string, number> = {}
        founders.forEach(f => {
          sectorCounts[f.industry_sector] = (sectorCounts[f.industry_sector] || 0) + 1
        })
        const sectorDistribution = Object.entries(sectorCounts)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 6)

        // Stage distribution
        const stageCounts: Record<string, number> = {}
        founders.forEach(f => {
          const stage = f.stage === 'idea' ? 'Idea' : 
                       f.stage === 'mvp' ? 'MVP' : 
                       f.stage === 'early_revenue' ? 'Early Revenue' : 'Other'
          stageCounts[stage] = (stageCounts[stage] || 0) + 1
        })
        const stageDistribution = Object.entries(stageCounts)
          .map(([name, value]) => ({ name, value }))

        // Growth over time (last 6 months)
        const monthlyGrowth = []
        for (let i = 5; i >= 0; i--) {
          const date = new Date()
          date.setMonth(date.getMonth() - i)
          const monthName = date.toLocaleString('default', { month: 'short' })
          
          const foundersCount = founders.filter(f => {
            const created = new Date(f.created_at)
            return created.getMonth() === date.getMonth() && 
                   created.getFullYear() === date.getFullYear()
          }).length

          const investorsCount = investors.filter(inv => {
            const created = new Date(inv.created_at)
            return created.getMonth() === date.getMonth() && 
                   created.getFullYear() === date.getFullYear()
          }).length

          monthlyGrowth.push({
            month: monthName,
            founders: foundersCount,
            investors: investorsCount
          })
        }

        // Recent signups (last 10)
        const allUsers = usersResult.data || []
        const recentSignups = allUsers
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 10)

        setStats({
          total_users: totalUsers,
          total_founders: founders.length,
          total_investors: investors.length,
          pending_founder_approvals: pendingFounders,
          pending_investor_verifications: pendingInvestors,
          approved_founders: approvedFounders,
          approved_investors: approvedInvestors,
          active_deals: activeDeals,
          total_raised: totalRaised,
          pending_waitlist: pendingWaitlist,
          approved_waitlist: approvedWaitlist,
          rejected_waitlist: rejectedWaitlist,
          platform_growth: monthlyGrowth,
          sector_distribution: sectorDistribution,
          stage_distribution: stageDistribution,
          recent_signups: recentSignups
        })

      } catch (error) {
        logger.error('Failed to fetch admin dashboard data', error as Error, {
          component: 'ADMIN_DASHBOARD',
          action: 'FETCH'
        })
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-center mb-2">{error}</h3>
            <Link href="/">
              <Button className="w-full mt-4">Go Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-lg text-gray-600">Platform overview and management</p>
        </div>
        <Badge variant="default" className="text-lg px-4 py-2">
          <Activity className="h-4 w-4 mr-2" />
          Admin
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats?.total_users || 0}
          description="All registered users"
          icon={Users}
          variant="gradient-blue"
        />
        <StatCard
          title="Pending Approvals"
          value={(stats?.pending_waitlist || 0) + (stats?.pending_founder_approvals || 0) + (stats?.pending_investor_verifications || 0)}
          description="Requires your action"
          icon={Clock}
          variant="gradient-orange"
        />
        <StatCard
          title="Active Deals"
          value={stats?.active_deals || 0}
          description="Currently fundraising"
          icon={FileText}
          variant="gradient-green"
        />
        <StatCard
          title="Total Raised"
          value={`₹${((stats?.total_raised || 0) / 100000).toFixed(1)}L`}
          description="Platform-wide"
          icon={DollarSign}
          variant="gradient-purple"
        />
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/waitlist">
          <Card className="hover-lift cursor-pointer border-orange-200 bg-gradient-to-br from-orange-50 to-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Waitlist</CardTitle>
                  <CardDescription className="text-sm">
                    Review applications
                  </CardDescription>
                </div>
                <div className="relative">
                  <Users className="h-10 w-10 text-orange-500" />
                  {(stats?.pending_waitlist || 0) > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-orange-500">
                      {stats?.pending_waitlist}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Pending:</span>
                <span className="font-bold text-orange-600">{stats?.pending_waitlist || 0}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/admin/review">
          <Card className="hover-lift cursor-pointer border-orange-200 bg-gradient-to-br from-orange-50 to-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Founder Approvals</CardTitle>
                  <CardDescription className="text-sm">
                    Review and approve
                  </CardDescription>
                </div>
                <div className="relative">
                  <Building2 className="h-10 w-10 text-orange-500" />
                  {(stats?.pending_founder_approvals || 0) > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-orange-500">
                      {stats?.pending_founder_approvals}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Pending:</span>
                <span className="font-bold text-orange-600">{stats?.pending_founder_approvals || 0}</span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/users">
          <Card className="hover-lift cursor-pointer border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Investor Verifications</CardTitle>
                  <CardDescription className="text-sm">
                    Verify KYC
                  </CardDescription>
                </div>
                <div className="relative">
                  <Users className="h-10 w-10 text-blue-500" />
                  {(stats?.pending_investor_verifications || 0) > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-blue-500">
                      {stats?.pending_investor_verifications}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Pending:</span>
                <span className="font-bold text-blue-600">{stats?.pending_investor_verifications || 0}</span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/startups">
          <Card className="hover-lift cursor-pointer border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">All Startups</CardTitle>
                  <CardDescription className="text-sm">
                    View all startups
                  </CardDescription>
                </div>
                <div>
                  <Building2 className="h-10 w-10 text-purple-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-purple-600">{stats?.total_founders || 0}</span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/investors">
          <Card className="hover-lift cursor-pointer border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">All Investors</CardTitle>
                  <CardDescription className="text-sm">
                    View all investors
                  </CardDescription>
                </div>
                <div>
                  <Users className="h-10 w-10 text-emerald-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-emerald-600">{stats?.total_investors || 0}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Platform Growth
            </CardTitle>
            <CardDescription>New signups over last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats?.platform_growth || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="founders" stroke="#0088FE" strokeWidth={2} />
                <Line type="monotone" dataKey="investors" stroke="#00C49F" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sector Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Sector Distribution
            </CardTitle>
            <CardDescription>Startups by industry sector</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={stats?.sector_distribution || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(stats?.sector_distribution || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stage Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Stage Distribution
            </CardTitle>
            <CardDescription>Startups by development stage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats?.stage_distribution || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Stats
            </CardTitle>
            <CardDescription>Key platform metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Approved Founders</p>
                  <p className="text-2xl font-bold text-green-600">{stats?.approved_founders || 0}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Verified Investors</p>
                  <p className="text-2xl font-bold text-blue-600">{stats?.approved_investors || 0}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Pending Actions</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {(stats?.pending_founder_approvals || 0) + (stats?.pending_investor_verifications || 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Total Raised</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ₹{((stats?.total_raised || 0) / 100000).toFixed(1)}L
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
