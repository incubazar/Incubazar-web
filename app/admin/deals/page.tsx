"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Star,
  StarOff,
  TrendingUp,
  DollarSign,
  Loader2,
  ArrowLeft,
  Building2
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Deal {
  id: string
  deal_title: string
  problem_statement: string
  solution: string
  market_size: string
  fundraising_goal: number
  min_investment: number
  max_investment: number
  instrument_type: string
  admin_approval_status: string
  is_featured: boolean
  readiness_score: number | null
  rejection_reason: string | null
  created_at: string
  founder_profile: {
    startup_name: string
    industry_sector: string
    stage: string
    user: {
      full_name: string
      email: string
    }
  }
}

export default function AdminDealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending')
  const [rejectionReason, setRejectionReason] = useState('')
  const [readinessScore, setReadinessScore] = useState<number>(50)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAdminAndFetchDeals()
  }, [filter])

  const checkAdminAndFetchDeals = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      // Check if user is admin
      const { data: user } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (!user || user.role !== 'admin') {
        router.push('/')
        return
      }

      fetchDeals()
    } catch (error) {
      logger.error('Failed to verify admin', error as Error, {
        component: 'ADMIN_DEALS',
        action: 'CHECK_ADMIN'
      })
      setLoading(false)
    }
  }

  const fetchDeals = async () => {
    try {
      let query = supabase
        .from('startup_deals')
        .select(`
          *,
          founder_profile:founder_profiles(
            startup_name,
            industry_sector,
            stage,
            user:users!user_id(full_name, email)
          )
        `)
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('admin_approval_status', filter)
      }

      const { data, error } = await query

      if (error) throw error

      setDeals(data || [])
    } catch (error) {
      logger.error('Failed to fetch deals', error as Error, {
        component: 'ADMIN_DEALS',
        action: 'FETCH'
      })
      toast.error('Failed to load deals')
    } finally {
      setLoading(false)
    }
  }

  const handleApproveDeal = async () => {
    if (!selectedDeal) return

    setProcessing(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { error } = await supabase
        .from('startup_deals')
        .update({
          admin_approval_status: 'approved',
          readiness_score: readinessScore,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString(),
          rejection_reason: null
        })
        .eq('id', selectedDeal.id)

      if (error) throw error

      toast.success(`${selectedDeal.deal_title} approved!`)
      setSelectedDeal(null)
      fetchDeals()
    } catch (error) {
      logger.error('Failed to approve deal', error as Error, {
        component: 'ADMIN_DEALS',
        action: 'APPROVE'
      })
      toast.error('Failed to approve deal')
    } finally {
      setProcessing(false)
    }
  }

  const handleRejectDeal = async () => {
    if (!selectedDeal || !rejectionReason) {
      toast.error('Please provide a rejection reason')
      return
    }

    setProcessing(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { error } = await supabase
        .from('startup_deals')
        .update({
          admin_approval_status: 'rejected',
          rejection_reason: rejectionReason,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', selectedDeal.id)

      if (error) throw error

      toast.success('Deal rejected')
      setSelectedDeal(null)
      setRejectionReason('')
      fetchDeals()
    } catch (error) {
      logger.error('Failed to reject deal', error as Error, {
        component: 'ADMIN_DEALS',
        action: 'REJECT'
      })
      toast.error('Failed to reject deal')
    } finally {
      setProcessing(false)
    }
  }

  const handleToggleFeatured = async (dealId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('startup_deals')
        .update({ is_featured: !currentStatus })
        .eq('id', dealId)

      if (error) throw error

      toast.success(`Deal ${!currentStatus ? 'featured' : 'unfeatured'}`)
      fetchDeals()
      if (selectedDeal?.id === dealId) {
        setSelectedDeal({ ...selectedDeal, is_featured: !currentStatus })
      }
    } catch (error) {
      logger.error('Failed to toggle featured status', error as Error, {
        component: 'ADMIN_DEALS',
        action: 'TOGGLE_FEATURED'
      })
      toast.error('Failed to update featured status')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const pendingCount = deals.filter(d => d.admin_approval_status === 'pending').length
  const approvedCount = deals.filter(d => d.admin_approval_status === 'approved').length
  const featuredCount = deals.filter(d => d.is_featured).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Deal Curation</h1>
            <p className="text-lg text-gray-600">Review and curate fundraising deals</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Featured Deals</p>
                <p className="text-2xl font-bold text-blue-600">{featuredCount}</p>
              </div>
              <Star className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Deals</p>
                <p className="text-2xl font-bold">{deals.length}</p>
              </div>
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilter('pending')}
            >
              <Clock className="h-4 w-4 mr-2" />
              Pending ({pendingCount})
            </Button>
            <Button
              variant={filter === 'approved' ? 'default' : 'outline'}
              onClick={() => setFilter('approved')}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approved ({approvedCount})
            </Button>
            <Button
              variant={filter === 'rejected' ? 'default' : 'outline'}
              onClick={() => setFilter('rejected')}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Rejected
            </Button>
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All Deals
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deals List */}
        <div className="lg:col-span-1 space-y-3">
          {deals.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No {filter !== 'all' ? filter : ''} deals</p>
              </CardContent>
            </Card>
          ) : (
            deals.map((deal) => (
              <Card
                key={deal.id}
                className={`cursor-pointer hover-lift ${
                  selectedDeal?.id === deal.id ? 'border-primary shadow-lg' : ''
                }`}
                onClick={() => {
                  setSelectedDeal(deal)
                  setReadinessScore(deal.readiness_score || 50)
                  setRejectionReason('')
                }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg line-clamp-1">{deal.deal_title}</h3>
                      <p className="text-sm text-gray-600">{deal.founder_profile.startup_name}</p>
                    </div>
                    {deal.is_featured && (
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Badge variant={
                      deal.admin_approval_status === 'approved' ? 'default' :
                      deal.admin_approval_status === 'pending' ? 'secondary' :
                      'destructive'
                    }>
                      {deal.admin_approval_status}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-600">
                      <Building2 className="h-4 w-4 mr-2" />
                      {deal.founder_profile.industry_sector}
                    </div>
                    <div className="flex items-center text-sm font-semibold text-primary">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ₹{deal.fundraising_goal.toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Deal Details */}
        <div className="lg:col-span-2">
          {!selectedDeal ? (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Select a deal to review</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Deal Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{selectedDeal.deal_title}</CardTitle>
                    <Button
                      size="sm"
                      variant={selectedDeal.is_featured ? 'default' : 'outline'}
                      onClick={() => handleToggleFeatured(selectedDeal.id, selectedDeal.is_featured)}
                    >
                      {selectedDeal.is_featured ? (
                        <>
                          <StarOff className="h-4 w-4 mr-2" />
                          Unfeature
                        </>
                      ) : (
                        <>
                          <Star className="h-4 w-4 mr-2" />
                          Feature Deal
                        </>
                      )}
                    </Button>
                  </div>
                  <CardDescription>{selectedDeal.founder_profile.startup_name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Founder</p>
                      <p className="font-semibold">{selectedDeal.founder_profile.user.full_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Industry</p>
                      <p className="font-semibold">{selectedDeal.founder_profile.industry_sector}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Stage</p>
                      <p className="font-semibold capitalize">{selectedDeal.founder_profile.stage.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Instrument</p>
                      <p className="font-semibold uppercase">{selectedDeal.instrument_type}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Problem Statement</p>
                    <p className="text-gray-800">{selectedDeal.problem_statement}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Solution</p>
                    <p className="text-gray-800">{selectedDeal.solution}</p>
                  </div>
                  
                  {selectedDeal.market_size && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Market Size</p>
                      <p className="text-gray-800">{selectedDeal.market_size}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-600">Fundraising Goal</p>
                      <p className="text-xl font-bold text-primary">₹{selectedDeal.fundraising_goal.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Min Investment</p>
                      <p className="font-semibold">₹{selectedDeal.min_investment.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Max Investment</p>
                      <p className="font-semibold">₹{selectedDeal.max_investment.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              {selectedDeal.admin_approval_status === 'pending' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Review Deal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="readiness_score">
                        Internal Readiness Score: {readinessScore}/100
                      </Label>
                      <Input
                        id="readiness_score"
                        type="range"
                        min="0"
                        max="100"
                        value={readinessScore}
                        onChange={(e) => setReadinessScore(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500">
                        Internal score to help prioritize deals (not visible to investors)
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleApproveDeal}
                        disabled={processing}
                        className="flex-1 bg-green-500 hover:bg-green-600"
                      >
                        {processing ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        )}
                        Approve Deal
                      </Button>
                      <Button
                        onClick={() => setRejectionReason('')}
                        disabled={processing}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject Deal
                      </Button>
                    </div>

                    {rejectionReason !== null && (
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Reason for rejection (will be sent to founder)"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          rows={4}
                        />
                        <div className="flex gap-3">
                          <Button
                            onClick={handleRejectDeal}
                            disabled={processing || !rejectionReason}
                            variant="destructive"
                            className="flex-1"
                          >
                            Confirm Rejection
                          </Button>
                          <Button
                            onClick={() => setRejectionReason('')}
                            variant="outline"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Rejected Reason Display */}
              {selectedDeal.admin_approval_status === 'rejected' && selectedDeal.rejection_reason && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Rejection Reason:</strong> {selectedDeal.rejection_reason}
                  </AlertDescription>
                </Alert>
              )}

              {/* Approved Status */}
              {selectedDeal.admin_approval_status === 'approved' && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    This deal is approved and live to investors.
                    {selectedDeal.readiness_score && (
                      <span> Readiness Score: {selectedDeal.readiness_score}/100</span>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


