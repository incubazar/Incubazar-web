"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  TrendingUp,
  AlertTriangle,
  Loader2,
  CheckCircle
} from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'

interface ExpressInterestButtonProps {
  dealId: string
  investorProfileId: string
  onSuccess?: () => void
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

export function ExpressInterestButton({
  dealId,
  investorProfileId,
  onSuccess,
  variant = 'default',
  size = 'default',
  className = ''
}: ExpressInterestButtonProps) {
  const [showDialog, setShowDialog] = useState(false)
  const [acknowledged, setAcknowledged] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const supabase = createClient()

  const handleExpressInterest = async () => {
    if (!acknowledged) {
      toast.error('Please acknowledge the disclaimer to continue')
      return
    }

    setSubmitting(true)
    try {
      // Check if already expressed interest
      const { data: existing } = await supabase
        .from('investor_interests')
        .select('id')
        .eq('investor_profile_id', investorProfileId)
        .eq('startup_deal_id', dealId)
        .single()

      if (existing) {
        toast.info('You have already expressed interest in this deal')
        setShowDialog(false)
        return
      }

      // Create interest record
      const { error } = await supabase
        .from('investor_interests')
        .insert({
          investor_profile_id: investorProfileId,
          startup_deal_id: dealId,
          interest_status: 'interested',
          connection_status: 'pending'
        })

      if (error) throw error

      logger.info('Investor expressed interest', {
        component: 'EXPRESS_INTEREST',
        action: 'CREATE',
        deal_id: dealId
      })

      toast.success('Interest expressed successfully! The founder will be notified.')
      setShowDialog(false)
      setAcknowledged(false)
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (error: any) {
      logger.error('Failed to express interest', error, {
        component: 'EXPRESS_INTEREST',
        action: 'CREATE_ERROR'
      })
      toast.error(error.message || 'Failed to express interest')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setShowDialog(true)}
      >
        <TrendingUp className="h-4 w-4 mr-2" />
        Express Interest
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Express Interest in This Deal</DialogTitle>
            <DialogDescription>
              Please read and acknowledge the following before proceeding
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Legal Disclaimer */}
            <Alert variant="destructive" className="border-2">
              <AlertTriangle className="h-5 w-5" />
              <AlertDescription className="text-sm leading-relaxed">
                <strong className="block mb-2 text-base">Important Legal Disclaimer</strong>
                You are requesting an introduction to the founder of this startup. 
                By proceeding, you acknowledge and agree to the following:
              </AlertDescription>
            </Alert>

            <div className="space-y-3 p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <strong>Platform Role:</strong> Incubazar is a technology platform that facilitates connections 
                  between founders and investors. We are NOT a broker, dealer, or investment advisor.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <strong>Your Responsibility:</strong> You are solely responsible for conducting your own 
                  due diligence, analysis, and investment decisions.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <strong>Risk Warning:</strong> Investments in early-stage startups carry substantial risk, 
                  including the potential loss of your entire investment.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <strong>No Guarantees:</strong> Information provided on this platform is for informational 
                  purposes only and does not constitute investment advice or a recommendation.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <strong>Professional Advice:</strong> We strongly recommend consulting with qualified 
                  legal, financial, and tax advisors before making any investment.
                </p>
              </div>
            </div>

            {/* Acknowledgment Checkbox */}
            <div className="flex items-start space-x-3 p-4 border-2 border-primary/20 rounded-lg bg-primary/5">
              <Checkbox
                id="acknowledge"
                checked={acknowledged}
                onCheckedChange={(checked) => setAcknowledged(checked as boolean)}
              />
              <Label
                htmlFor="acknowledge"
                className="text-sm leading-relaxed cursor-pointer"
              >
                I have read and understood the above disclaimer. I acknowledge that Incubazar is a technology 
                platform and not an investment advisor. I am responsible for my own due diligence and investment 
                decisions, and I understand the risks involved in startup investments.
              </Label>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowDialog(false)
                setAcknowledged(false)
              }}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExpressInterest}
              disabled={!acknowledged || submitting}
              className="gradient-primary"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  I Understand - Express Interest
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}


