"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Lock
} from 'lucide-react'

interface InvestorLimitCounterProps {
  dealId: string
  currentCount: number
  limit: number
  onLimitReached?: () => void
}

export default function InvestorLimitCounter({ 
  dealId, 
  currentCount, 
  limit, 
  onLimitReached 
}: InvestorLimitCounterProps) {
  const [isNearLimit, setIsNearLimit] = useState(false)
  const [isAtLimit, setIsAtLimit] = useState(false)
  const [percentage, setPercentage] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    const percentage = (currentCount / limit) * 100
    setPercentage(percentage)
    setIsNearLimit(percentage >= 80)
    setIsAtLimit(percentage >= 100)

    if (isAtLimit && onLimitReached) {
      onLimitReached()
    }
  }, [currentCount, limit, isAtLimit, onLimitReached])

  const getStatusColor = () => {
    if (isAtLimit) return 'text-red-600'
    if (isNearLimit) return 'text-orange-600'
    return 'text-green-600'
  }

  const getStatusIcon = () => {
    if (isAtLimit) return <XCircle className="h-4 w-4" />
    if (isNearLimit) return <AlertTriangle className="h-4 w-4" />
    return <CheckCircle className="h-4 w-4" />
  }

  const getStatusText = () => {
    if (isAtLimit) return 'Limit Reached'
    if (isNearLimit) return 'Near Limit'
    return 'Within Limit'
  }

  const getStatusBadge = () => {
    if (isAtLimit) {
      return <Badge variant="destructive" className="flex items-center space-x-1">
        <Lock className="h-3 w-3" />
        <span>Closed</span>
      </Badge>
    }
    if (isNearLimit) {
      return <Badge variant="secondary" className="flex items-center space-x-1">
        <AlertTriangle className="h-3 w-3" />
        <span>Near Limit</span>
      </Badge>
    }
    return <Badge variant="outline" className="flex items-center space-x-1">
      <CheckCircle className="h-3 w-3" />
      <span>Available</span>
    </Badge>
  }

  return (
    <Card className={isAtLimit ? 'border-red-200 bg-red-50' : isNearLimit ? 'border-orange-200 bg-orange-50' : 'border-green-200 bg-green-50'}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Investor Limit</span>
          </div>
          {getStatusBadge()}
        </CardTitle>
        <CardDescription>
          Section 42 Compliance - Maximum 200 investors per deal
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className={`font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{currentCount}</div>
            <div className="text-sm text-gray-500">of {limit} investors</div>
          </div>
        </div>

        <Progress value={percentage} className="h-3" />

        <div className="text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Available spots:</span>
            <span className="font-medium">{limit - currentCount}</span>
          </div>
        </div>

        {isAtLimit && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              This deal has reached the 200-investor limit and is now closed for new investments.
              This is enforced to comply with Section 42 of the Companies Act 2013.
            </AlertDescription>
          </Alert>
        )}

        {isNearLimit && !isAtLimit && (
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              This deal is approaching the 200-investor limit. Only {limit - currentCount} more 
              investors can participate before the deal closes.
            </AlertDescription>
          </Alert>
        )}

        {!isNearLimit && !isAtLimit && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              This deal is within compliance limits. {limit - currentCount} investor spots 
              are still available.
            </AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-gray-500 pt-2 border-t">
          <p>
            <strong>Compliance Notice:</strong> Each deal is limited to a maximum of 200 investors 
            as per Section 42 of the Companies Act 2013. This limit is automatically enforced 
            by the platform to ensure regulatory compliance.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
