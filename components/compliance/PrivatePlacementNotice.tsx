"use client"

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Shield, 
  AlertCircle, 
  CheckCircle, 
  Lock,
  Users,
  FileText
} from 'lucide-react'

interface PrivatePlacementNoticeProps {
  variant?: 'full' | 'compact' | 'inline'
  showDetails?: boolean
}

export default function PrivatePlacementNotice({ 
  variant = 'full', 
  showDetails = true 
}: PrivatePlacementNoticeProps) {
  if (variant === 'inline') {
    return (
      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border">
        <strong>Private Placement:</strong> This information is only available to registered and verified users. 
        This is not a public offer and complies with Section 42 of the Companies Act 2013.
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <Alert className="border-blue-200 bg-blue-50">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Private Placement Notice:</strong> This deal operates under Section 42 of the Companies Act 2013. 
          Maximum 200 investors per deal. Registered users only.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-800">
          <Shield className="h-5 w-5" />
          <span>Private Placement Compliance</span>
        </CardTitle>
        <CardDescription className="text-blue-700">
          This platform operates under Section 42 of the Companies Act 2013
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-800">Private Placement Only</h4>
              <p className="text-sm text-green-700">
                All deals are private placements, not public offers
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Users className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800">200-Investor Limit</h4>
              <p className="text-sm text-blue-700">
                Maximum 200 investors per deal per financial year
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Lock className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-purple-800">Registered Users Only</h4>
              <p className="text-sm text-purple-700">
                All deal information is behind secure authentication
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FileText className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-orange-800">No Public Advertising</h4>
              <p className="text-sm text-orange-700">
                No public promotion of specific investment opportunities
              </p>
            </div>
          </div>
        </div>

        {showDetails && (
          <div className="pt-4 border-t border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">Legal Framework</h4>
            <div className="text-sm text-blue-700 space-y-2">
              <p>
                <strong>Section 42 Compliance:</strong> This platform facilitates private placements 
                under Section 42 of the Companies Act 2013, which allows companies to raise funds 
                from up to 200 investors per financial year without a public offer.
              </p>
              <p>
                <strong>Platform Role:</strong> Incubazar operates as a technology facilitator and 
                network, not as a fund manager, broker, or financial advisor. We connect verified 
                investors with vetted startups while ensuring regulatory compliance.
              </p>
              <p>
                <strong>Investor Protection:</strong> All investors must complete KYC verification 
                and are limited to qualified individuals who understand the risks of startup 
                investments.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-blue-200">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-blue-700 border-blue-300">
              Section 42 Compliant
            </Badge>
            <Badge variant="outline" className="text-green-700 border-green-300">
              Private Placement
            </Badge>
          </div>
          <div className="text-xs text-blue-600">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
