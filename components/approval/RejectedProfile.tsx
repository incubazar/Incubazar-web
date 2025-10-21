"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { XCircle, AlertCircle, RefreshCw, Mail } from 'lucide-react'
import Link from 'next/link'

interface RejectedProfileProps {
  type: 'founder' | 'investor'
  reason?: string
  rejectedAt?: string
  canResubmit?: boolean
}

export function RejectedProfile({ 
  type, 
  reason = 'Your profile did not meet our verification requirements.', 
  rejectedAt,
  canResubmit = true 
}: RejectedProfileProps) {
  const title = type === 'founder' ? 'Startup Profile Not Approved' : 'Investor Profile Not Approved'
  const resubmitLink = type === 'founder' ? '/founder/onboarding' : '/investor/onboarding'

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full shadow-2xl border-2 border-red-200 animate-fade-in">
        <CardContent className="pt-12 pb-12">
          {/* Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-32 w-32 rounded-full bg-red-100"></div>
            </div>
            <div className="relative flex items-center justify-center">
              <XCircle className="h-20 w-20 text-red-500" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
            {title}
          </h1>

          {/* Message */}
          <p className="text-lg text-center text-gray-600 mb-8">
            We're sorry, but your profile could not be approved at this time.
          </p>

          {/* Reason */}
          <div className="max-w-lg mx-auto mb-8">
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription className="text-base">
                <strong>Reason:</strong>
                <p className="mt-2">{reason}</p>
              </AlertDescription>
            </Alert>
          </div>

          {/* Rejection Details */}
          {rejectedAt && (
            <div className="bg-gray-50 rounded-lg p-4 mb-8 max-w-md mx-auto">
              <p className="text-center text-sm text-gray-600">
                <strong>Reviewed on:</strong>{' '}
                {new Date(rejectedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 max-w-lg mx-auto">
            <h3 className="font-bold text-lg text-blue-900 mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Review the rejection reason carefully</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Update your profile information to address the concerns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Provide additional documentation if needed</span>
              </li>
              {type === 'founder' && (
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>For revenue-generating startups, ensure registration details (CIN) are provided</span>
                </li>
              )}
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Resubmit for review once changes are made</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {canResubmit && (
              <Link href={resubmitLink}>
                <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-blue-500 hover:opacity-90">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Update & Resubmit
                </Button>
              </Link>
            )}
            <Link href="mailto:support@incubazar.com">
              <Button variant="outline" className="w-full sm:w-auto">
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-2">
              <strong>Need Help?</strong>
            </p>
            <p className="text-center text-sm text-gray-500">
              Our team is here to help you succeed. Reach out at{' '}
              <a href="mailto:support@incubazar.com" className="text-primary hover:underline font-medium">
                support@incubazar.com
              </a>
              {' '}and we'll guide you through the process.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

