"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DataBadge } from '@/components/ui/data-badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Users,
  FileText,
  CheckCircle,
  Clock,
  Send,
  Eye,
  Target,
  AlertTriangle
} from 'lucide-react'
import { formatDate } from '@/lib/utils'
import InvestorLimitCounter from '@/components/compliance/InvestorLimitCounter'

interface InvestorInterest {
  id: string
  interest_status: 'viewed' | 'interested' | 'documents_requested' | 'invested'
  investment_amount: number | null
  notes: string | null
  created_at: string
  updated_at: string
  investor_profiles: {
    id: string
    user_id: string
    investor_type: string
    users: {
      full_name: string
      email: string
    }
  }
  startup_deals: {
    id: string
    deal_title: string
    investor_count: number
    investor_limit: number
  }
}

export default function InvestorManagementPage() {
  const [interests, setInterests] = useState<InvestorInterest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null)
  const [deals, setDeals] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) return

        const { data: profile } = await supabase
          .from('founder_profiles')
          .select('id')
          .eq('user_id', session.user.id)
          .single()

        if (!profile) return

        // Fetch founder's deals
        const { data: dealsData, error: dealsError } = await supabase
          .from('startup_deals')
          .select('id, deal_title, investor_count, investor_limit')
          .eq('founder_profile_id', profile.id)

        if (dealsError) {
          logger.error('Failed to fetch deals', dealsError, {
            component: 'INVESTOR_MANAGEMENT',
            action: 'FETCH_DEALS'
          })
        } else {
          setDeals(dealsData || [])
          if (dealsData && dealsData.length > 0) {
            setSelectedDeal(dealsData[0].id)
          }
        }

        // Fetch investor interests for all deals
        const dealIds = dealsData?.map(d => d.id) || []
        if (dealIds.length > 0) {
          const { data: interestsData, error: interestsError } = await supabase
            .from('investor_interests')
            .select(`
              *,
              investor_profiles (
                id,
                user_id,
                investor_type,
                users!user_id (
                  full_name,
                  email
                )
              ),
              startup_deals (
                id,
                deal_title,
                investor_count,
                investor_limit
              )
            `)
            .in('startup_deal_id', dealIds)
            .order('created_at', { ascending: false })

          if (interestsError) {
            logger.error('Failed to fetch interests', interestsError, {
              component: 'INVESTOR_MANAGEMENT',
              action: 'FETCH_INTERESTS'
            })
          } else {
            setInterests(interestsData || [])
          }
        }
      } catch (error) {
        logger.error('Failed to fetch investor data', error as Error, {
          component: 'INVESTOR_MANAGEMENT',
          action: 'FETCH'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase])

  const handleStatusUpdate = async (interestId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('investor_interests')
        .update({ 
          interest_status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', interestId)

      if (error) {
        logger.error('Failed to update status', error, {
          component: 'INVESTOR_MANAGEMENT',
          action: 'UPDATE_STATUS'
        })
        alert('Failed to update status')
      } else {
        // Refresh data
        setInterests(interests.map(i => 
          i.id === interestId ? { ...i, interest_status: newStatus as any } : i
        ))
        alert('Status updated successfully')
      }
    } catch (error) {
      logger.error('Failed to update status', error as Error, {
        component: 'INVESTOR_MANAGEMENT',
        action: 'UPDATE_STATUS'
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'viewed':
        return <DataBadge variant="outline">Viewed</DataBadge>
      case 'interested':
        return <DataBadge variant="info">Interested</DataBadge>
      case 'documents_requested':
        return <DataBadge variant="warning">Documents Requested</DataBadge>
      case 'invested':
        return <DataBadge variant="success">Invested</DataBadge>
      default:
        return <DataBadge variant="outline">{status}</DataBadge>
    }
  }

  const filteredInterests = selectedDeal 
    ? interests.filter(i => i.startup_deals.id === selectedDeal)
    : interests

  const stats = {
    total: filteredInterests.length,
    interested: filteredInterests.filter(i => i.interest_status === 'interested').length,
    documentsRequested: filteredInterests.filter(i => i.interest_status === 'documents_requested').length,
    invested: filteredInterests.filter(i => i.interest_status === 'invested').length,
  }

  const selectedDealData = deals.find(d => d.id === selectedDeal)

  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="h-10 bg-muted/50 rounded-lg w-1/3 shimmer"></div>
        <div className="h-96 bg-card rounded-lg border border-border shimmer"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight">Investor Management</h1>
        <p className="text-lg text-muted-foreground">
          Track and manage investor interest in your deals
        </p>
      </div>

      {/* Deal Selector */}
      {deals.length > 1 && (
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Select Deal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 flex-wrap">
              {deals.map(deal => (
                <Button
                  key={deal.id}
                  variant={selectedDeal === deal.id ? "default" : "outline"}
                  onClick={() => setSelectedDeal(deal.id)}
                  className={selectedDeal === deal.id ? "gradient-primary" : ""}
                >
                  {deal.deal_title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interest</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All investors</p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interested</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interested}</div>
            <p className="text-xs text-muted-foreground">Expressed interest</p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Sent</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.documentsRequested}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Invested</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.invested}</div>
            <p className="text-xs text-muted-foreground">Confirmed investors</p>
          </CardContent>
        </Card>
      </div>

      {/* Investor Limit Counter */}
      {selectedDealData && (
        <InvestorLimitCounter
          dealId={selectedDealData.id}
          currentCount={selectedDealData.investor_count}
          limit={selectedDealData.investor_limit}
        />
      )}

      {/* Investors Table */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="text-xl">Investor List</CardTitle>
          <CardDescription>
            Manage relationships and track investment status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredInterests.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No investors yet</h3>
              <p className="text-muted-foreground">
                Investors who express interest in your deal will appear here.
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Investor Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInterests.map((interest) => (
                    <TableRow key={interest.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold">
                            {interest.investor_profiles.users.full_name || 'Unknown'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {interest.investor_profiles.users.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="capitalize text-sm">
                          {interest.investor_profiles.investor_type.replace('_', ' ')}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(interest.interest_status)}
                      </TableCell>
                      <TableCell>
                        {interest.investment_amount 
                          ? `₹${interest.investment_amount.toLocaleString()}`
                          : '-'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(interest.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {interest.interest_status === 'interested' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(interest.id, 'documents_requested')}
                            >
                              <Send className="h-3.5 w-3.5 mr-1.5" />
                              Send Docs
                            </Button>
                          )}
                          {interest.interest_status === 'documents_requested' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(interest.id, 'invested')}
                            >
                              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                              Confirm
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Compliance Notice */}
      {selectedDealData && selectedDealData.investor_count >= selectedDealData.investor_limit * 0.9 && (
        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-yellow-500">
                  Approaching Investor Limit
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You're approaching the 200-investor limit for this deal. 
                  Only {selectedDealData.investor_limit - selectedDealData.investor_count} more investors can be added 
                  before the deal automatically closes for compliance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}



