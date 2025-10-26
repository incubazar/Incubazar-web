'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Folder, Lock, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { logger } from '@/lib/logger'

interface DataRoomAccessProps {
  dealId: string
  founderId: string
  hasExpressedInterest: boolean
}

export function DataRoomAccess({ dealId, founderId, hasExpressedInterest }: DataRoomAccessProps) {
  const supabase = createClient()
  const [accessStatus, setAccessStatus] = useState<'none' | 'pending' | 'granted' | 'denied'>('none')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const checkAccessStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { data: investorProfile } = await supabase
        .from('investor_profiles')
        .select('id')
        .eq('user_id', session.user.id)
        .single()

      if (!investorProfile) return

      // Check if there&apos;s an existing access request
      const { data: accessRequest } = await supabase
        .from('data_room_access_requests')
        .select('status')
        .eq('investor_profile_id', investorProfile.id)
        .eq('founder_profile_id', founderId)
        .eq('deal_id', dealId)
        .maybeSingle()

      if (accessRequest) {
        setAccessStatus(accessRequest.status as any)
      }
    } catch (error: any) {
      logger.error('Failed to check access status', error, {
        component: 'DATA_ROOM_ACCESS',
        action: 'CHECK_STATUS'
      })
    }
  }

  const requestAccess = async () => {
    if (!hasExpressedInterest) {
      toast.error('Please express interest in this deal first')
      return
    }

    try {
      setLoading(true)

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast.error('Please log in to request access')
        return
      }

      const { data: investorProfile, error: profileError } = await supabase
        .from('investor_profiles')
        .select('id')
        .eq('user_id', session.user.id)
        .single()

      if (profileError || !investorProfile) {
        toast.error('Investor profile not found')
        return
      }

      // Create access request
      const { error: requestError } = await supabase
        .from('data_room_access_requests')
        .insert({
          investor_profile_id: investorProfile.id,
          founder_profile_id: founderId,
          deal_id: dealId,
          status: 'pending'
        })

      if (requestError) throw requestError

      setAccessStatus('pending')
      setOpen(false)
      toast.success('Access request submitted! The founder will review your request.')

      logger.info('Data room access requested', {
        component: 'DATA_ROOM_ACCESS',
        action: 'REQUEST_ACCESS',
        investorId: investorProfile.id,
        founderId: founderId,
        dealId: dealId
      })
    } catch (error: any) {
      logger.error('Failed to request data room access', error, {
        component: 'DATA_ROOM_ACCESS',
        action: 'REQUEST_ACCESS'
      })
      toast.error('Failed to submit access request')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = () => {
    switch (accessStatus) {
      case 'pending':
        return (
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Request Pending</span>
          </Badge>
        )
      case 'granted':
        return (
          <Badge variant="default" className="flex items-center space-x-1 bg-ink">
            <CheckCircle className="h-3 w-3" />
            <span>Access Granted</span>
          </Badge>
        )
      case 'denied':
        return (
          <Badge variant="destructive" className="flex items-center space-x-1">
            <AlertCircle className="h-3 w-3" />
            <span>Request Denied</span>
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="border-graphite-200 bg-graphite-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Folder className="h-5 w-5 text-ink" />
            <CardTitle>Data Room</CardTitle>
          </div>
          {getStatusBadge()}
        </div>
        <CardDescription>
          Access startup documents including financials, legal docs, and pitch materials
        </CardDescription>
      </CardHeader>
      <CardContent>
        {accessStatus === 'none' && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={checkAccessStatus}
                disabled={!hasExpressedInterest}
                className="w-full"
              >
                <Lock className="h-4 w-4 mr-2" />
                Request Data Room Access
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Data Room Access</DialogTitle>
                <DialogDescription className="space-y-4 pt-4">
                  <p>
                    You are requesting access to confidential startup documents. This includes:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Financial models and projections</li>
                    <li>Legal documents and contracts</li>
                    <li>Detailed pitch deck</li>
                    <li>Team information and resumes</li>
                    <li>Product documentation</li>
                  </ul>
                  <div className="bg-graphite-100 border border-graphite-300 rounded-lg p-3">
                    <p className="text-sm text-graphite-800 font-medium">
                      Confidentiality Notice
                    </p>
                    <p className="text-xs text-graphite-700 mt-1">
                      All information in the data room is confidential and proprietary. 
                      By requesting access, you agree to maintain strict confidentiality 
                      and use the information solely for investment evaluation purposes.
                    </p>
                  </div>
                  <p className="text-sm">
                    The founder will review your request and may grant or deny access based on 
                    your investor profile and expressed interest.
                  </p>
                </DialogDescription>
              </DialogHeader>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={requestAccess}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Requesting...' : 'Submit Request'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {accessStatus === 'pending' && (
          <div className="flex items-center justify-center py-4">
            <div className="text-center">
              <Clock className="h-12 w-12 text-graphite-700 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Your access request is pending founder approval
              </p>
            </div>
          </div>
        )}

        {accessStatus === 'granted' && (
          <Button className="w-full" onClick={() => window.location.href = `/investor/data-room/${dealId}`}>
            <Folder className="h-4 w-4 mr-2" />
            View Data Room
          </Button>
        )}

        {accessStatus === 'denied' && (
          <div className="flex items-center justify-center py-4">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-ink mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Your access request was not approved
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAccessStatus('none')}
                className="mt-3"
              >
                Request Again
              </Button>
            </div>
          </div>
        )}

        {!hasExpressedInterest && accessStatus === 'none' && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Express interest in this deal to request data room access
          </p>
        )}
      </CardContent>
    </Card>
  )
}


