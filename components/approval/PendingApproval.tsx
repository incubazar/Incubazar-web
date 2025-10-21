"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface PendingApprovalProps {
  type: 'founder' | 'investor'
  submittedAt?: string
  profileId?: string
}

export function PendingApproval({ type, submittedAt, profileId }: PendingApprovalProps) {
  const title = type === 'founder' ? 'Startup Profile Under Review' : 'Investor Profile Under Review'
  const message = type === 'founder' 
    ? 'Our team is carefully reviewing your startup profile to ensure quality and authenticity.'
    : 'Our team is verifying your investor profile to ensure a secure investment environment.'

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full shadow-2xl border-2 border-yellow-200 animate-fade-in">
        <CardContent className="pt-12 pb-12">
          {/* Animated Clock Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-32 w-32 rounded-full bg-yellow-100 animate-pulse"></div>
            </div>
            <div className="relative flex items-center justify-center">
              <Clock className="h-20 w-20 text-yellow-500 animate-glow" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
            {title}
          </h1>

          {/* Message */}
          <p className="text-lg text-center text-gray-600 mb-8 max-w-xl mx-auto">
            {message}
          </p>

          {/* Timeline */}
          <div className="max-w-md mx-auto mb-8">
            <div className="space-y-4">
              {/* Step 1 - Complete */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Profile Submitted</h3>
                  <p className="text-sm text-gray-600">
                    {submittedAt ? new Date(submittedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'Successfully submitted'}
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="ml-5 h-8 w-0.5 bg-gradient-to-b from-green-500 to-yellow-500"></div>

              {/* Step 2 - Current */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center animate-pulse">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-700">Admin Review (Current)</h3>
                  <p className="text-sm text-gray-600">
                    Being carefully reviewed by our team
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="ml-5 h-8 w-0.5 bg-gray-200"></div>

              {/* Step 3 - Pending */}
              <div className="flex items-center gap-4 opacity-50">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-600">Approval Decision</h3>
                  <p className="text-sm text-gray-500">
                    Approval or feedback
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="ml-5 h-8 w-0.5 bg-gray-200"></div>

              {/* Step 4 - Pending */}
              <div className="flex items-center gap-4 opacity-50">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-600">Access Granted</h3>
                  <p className="text-sm text-gray-500">
                    Full platform access
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Expected Time */}
          <div className="bg-blue-50 rounded-lg p-4 mb-8 max-w-md mx-auto">
            <p className="text-center text-sm text-blue-800">
              <strong>Expected Review Time:</strong> 2-3 business days
            </p>
            <p className="text-center text-xs text-blue-600 mt-1">
              You'll receive an email notification once the review is complete
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {profileId && (
              <Link href={type === 'founder' ? '/founder/onboarding' : '/investor/onboarding'}>
                <Button variant="outline" className="w-full sm:w-auto">
                  Edit Profile
                </Button>
              </Link>
            )}
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto">
                Go to Home
                </Button>
            </Link>
          </div>

          {/* Help Text */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Questions? Contact us at{' '}
            <a href="mailto:support@incubazar.com" className="text-primary hover:underline">
              support@incubazar.com
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

