"use client"

import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Shield, Lock } from 'lucide-react'

interface PrivatePlacementBannerProps {
  variant?: 'default' | 'compact'
}

export default function PrivatePlacementBanner({ variant = 'default' }: PrivatePlacementBannerProps) {
  if (variant === 'compact') {
    return (
      <Alert className="border-primary/20 bg-primary/5">
        <Shield className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          <strong>Private Placement:</strong> This platform operates under Section 42 of the Companies Act 2013. 
          All deals are limited to 200 investors maximum.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="border-primary/20 bg-primary/5">
      <div className="flex items-start space-x-3">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <Lock className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-semibold text-foreground">
              Private Placement Platform - Section 42 Compliance
            </h4>
          </div>
          <AlertDescription className="text-sm leading-relaxed">
            This is a <strong>private placement platform</strong> operating under Section 42 of the Companies Act 2013. 
            Access is restricted to registered and verified users only. All deals are subject to the following compliance requirements:
          </AlertDescription>
          <ul className="text-sm space-y-1 ml-4 list-disc text-muted-foreground">
            <li><strong>200 Investor Limit:</strong> Each deal is automatically limited to a maximum of 200 investors</li>
            <li><strong>No Public Advertising:</strong> Deal information is not publicly accessible</li>
            <li><strong>Verified Users Only:</strong> All investors must complete KYC verification</li>
            <li><strong>Direct Transactions:</strong> All financial transactions occur directly between investors and startups, outside this platform</li>
          </ul>
        </div>
      </div>
    </Alert>
  )
}



