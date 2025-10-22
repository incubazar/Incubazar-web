"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Users,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react'

interface InvestorLimitTrackerProps {
  currentCount: number
  limit?: number
  dealTitle?: string
}

export function InvestorLimitTracker({
  currentCount,
  limit = 200,
  dealTitle
}: InvestorLimitTrackerProps) {
  const percentage = (currentCount / limit) * 100
  const remaining = limit - currentCount

  const getStatus = () => {
    if (percentage >= 100) {
      return {
        variant: 'destructive' as const,
        icon: AlertTriangle,
        color: 'red',
        message: 'Limit Reached',
        description: 'This deal has reached the maximum 200-investor limit as per Section 42 compliance.'
      }
    } else if (percentage >= 90) {
      return {
        variant: 'destructive' as const,
        icon: AlertTriangle,
        color: 'red',
        message: 'Near Limit',
        description: 'This deal is approaching the 200-investor limit. Only a few slots remaining.'
      }
    } else if (percentage >= 70) {
      return {
        variant: 'default' as const,
        icon: Info,
        color: 'orange',
        message: 'Getting Full',
        description: 'This deal is filling up. Consider creating a new deal if you need more capacity.'
      }
    } else {
      return {
        variant: 'default' as const,
        icon: CheckCircle,
        color: 'green',
        message: 'Available',
        description: 'Plenty of slots available for investors.'
      }
    }
  }

  const status = getStatus()
  const StatusIcon = status.icon

  return (
    <Card className={`border-2 ${
      percentage >= 90 ? 'border-red-200 bg-red-50' :
      percentage >= 70 ? 'border-orange-200 bg-orange-50' :
      'border-green-200 bg-green-50'
    }`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Investor Limit Tracker
            </CardTitle>
            {dealTitle && (
              <CardDescription className="mt-1">{dealTitle}</CardDescription>
            )}
          </div>
          <Badge variant={status.variant}>
            {status.message}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Visual Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>Investors: {currentCount} / {limit}</span>
            <span className={`${
              percentage >= 90 ? 'text-red-600' :
              percentage >= 70 ? 'text-orange-600' :
              'text-green-600'
            }`}>
              {remaining} slots remaining
            </span>
          </div>
          <Progress 
            value={percentage} 
            className={`h-3 ${
              percentage >= 90 ? '[&>div]:bg-red-500' :
              percentage >= 70 ? '[&>div]:bg-orange-500' :
              '[&>div]:bg-green-500'
            }`}
          />
          <p className="text-xs text-gray-600 text-center">
            {percentage.toFixed(1)}% of limit used
          </p>
        </div>

        {/* Status Alert */}
        <Alert variant={percentage >= 90 ? 'destructive' : 'default'} className="border-2">
          <StatusIcon className={`h-4 w-4 ${
            percentage >= 90 ? 'text-red-600' :
            percentage >= 70 ? 'text-orange-600' :
            'text-green-600'
          }`} />
          <AlertDescription>
            <strong>{status.message}:</strong> {status.description}
          </AlertDescription>
        </Alert>

        {/* Compliance Info */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-800">
              <strong>Section 42 Compliance:</strong> Each deal can have a maximum of 200 investors
              as per the Companies Act 2013. This limit is automatically enforced by the platform.
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {percentage >= 80 && percentage < 100 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Recommendation:</strong> Consider preparing for a new fundraising round or deal
              to accommodate additional investors beyond this limit.
            </p>
          </div>
        )}

        {percentage >= 100 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-800">
              <strong>Action Required:</strong> This deal cannot accept more investors. Please create
              a new deal if you wish to continue fundraising.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


