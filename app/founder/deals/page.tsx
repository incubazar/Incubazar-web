"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  FileText, 
  Plus, 
  Eye, 
  Edit, 
  Users, 
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Deal {
  id: string
  deal_title: string
  fundraising_goal: number
  min_investment: number
  max_investment: number
  instrument_type: 'safe' | 'ccd' | 'equity'
  investor_count: number
  investor_limit: number
  is_active: boolean
  created_at: string
  admin_approval_status: 'pending' | 'approved' | 'rejected'
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) return

        // Get founder profile
        const { data: founderProfile } = await supabase
          .from('founder_profiles')
          .select('id')
          .eq('user_id', session.user.id)
          .single()

        if (!founderProfile) return

        // Get deals
        const { data: dealsData } = await supabase
          .from('startup_deals')
          .select('*')
          .eq('founder_profile_id', founderProfile.id)
          .order('created_at', { ascending: false })

        setDeals(dealsData || [])
      } catch (error) {
        logger.error('Failed to fetch founder deals', error as Error, {
          component: 'FOUNDER_DEALS',
          action: 'FETCH'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDeals()
  }, [supabase])

  const getStatusBadge = (deal: Deal) => {
    if (!deal.is_active) {
      return <Badge variant="secondary">Inactive</Badge>
    }
    
    if (deal.admin_approval_status === 'pending') {
      return <Badge variant="secondary" className="flex items-center space-x-1">
        <Clock className="h-3 w-3" />
        <span>Pending</span>
      </Badge>
    }
    
    if (deal.admin_approval_status === 'approved') {
      return <Badge variant="default" className="flex items-center space-x-1">
        <CheckCircle className="h-3 w-3" />
        <span>Active</span>
      </Badge>
    }
    
    return <Badge variant="destructive">Rejected</Badge>
  }

  const getInvestorLimitStatus = (deal: Deal) => {
    const percentage = (deal.investor_count / deal.investor_limit) * 100
    
    if (percentage >= 90) {
      return <Badge variant="destructive">Near Limit</Badge>
    } else if (percentage >= 70) {
      return <Badge variant="secondary">Getting Full</Badge>
    }
    
    return <Badge variant="outline">Available</Badge>
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
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
          <h1 className="text-3xl font-bold text-gray-900">Deal Management</h1>
          <p className="text-gray-600">Create and manage your fundraising deals</p>
        </div>
        <Link href="/founder/deals/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Deal
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deals.length}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deals.filter(d => d.is_active && d.admin_approval_status === 'approved').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently fundraising
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deals.reduce((sum, deal) => sum + deal.investor_count, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all deals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deals.filter(d => d.admin_approval_status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Deals table */}
      {deals.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No deals yet</h3>
              <p className="text-gray-500 mb-6">
                Create your first fundraising deal to start connecting with investors.
              </p>
              <Link href="/founder/deals/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Deal
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Deals</CardTitle>
            <CardDescription>
              Manage your fundraising deals and track investor interest
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deal Title</TableHead>
                  <TableHead>Goal</TableHead>
                  <TableHead>Investment Range</TableHead>
                  <TableHead>Investors</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell className="font-medium">
                      {deal.deal_title}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(deal.fundraising_goal)}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(deal.min_investment)} - {formatCurrency(deal.max_investment)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{deal.investor_count}/{deal.investor_limit}</span>
                        {getInvestorLimitStatus(deal)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(deal)}
                    </TableCell>
                    <TableCell>
                      {formatDate(deal.created_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Link href={`/founder/deals/${deal.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/founder/deals/${deal.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Compliance reminder */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">
                Compliance Reminder
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Remember: Each deal can have a maximum of 200 investors as per Section 42 of the Companies Act 2013. 
                The platform automatically enforces this limit to ensure compliance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
