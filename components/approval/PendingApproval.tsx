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
    <div className="min-h-screen bg-paper flex items-center justify-center p-4 sm:p-6">
      <Card className="max-w-lg w-full shadow-editorial-xl border-2 border-graphite-200 animate-fade-in bg-paper">
        <CardContent className="pt-8 pb-8 px-6 sm:px-10">
          {/* Animated Clock Icon - Monochrome */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-24 w-24 rounded-full bg-graphite-100 animate-pulse"></div>
            </div>
            <div className="relative flex items-center justify-center">
              <Clock className="h-16 w-16 text-graphite-900" />
            </div>
          </div>

          {/* Title - Editorial Typography */}
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-center text-ink mb-3">
            {title}
          </h1>

          {/* Message */}
          <p className="text-base text-center text-graphite-600 mb-8 max-w-md mx-auto leading-relaxed font-body">
            {message}
          </p>

          {/* Timeline - Monochrome */}
          <div className="max-w-md mx-auto mb-6">
            <div className="space-y-1">
              {/* Step 1 - Complete */}
              <div className="flex items-start gap-4 py-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-8 w-8 rounded-full bg-ink flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-paper" />
                  </div>
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="font-semibold text-ink text-sm font-body">Profile Submitted</h3>
                  <p className="text-xs text-graphite-500 mt-0.5 font-body">
                    {submittedAt ? new Date(submittedAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    }) : '26 Oct 2025, 01:42 pm'}
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="ml-4 h-6 w-px bg-graphite-300"></div>

              {/* Step 2 - Current */}
              <div className="flex items-start gap-4 py-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-8 w-8 rounded-full bg-graphite-700 flex items-center justify-center animate-pulse">
                    <Clock className="h-5 w-5 text-paper" />
                  </div>
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="font-semibold text-graphite-900 text-sm font-body">Admin Review (Current)</h3>
                  <p className="text-xs text-graphite-500 mt-0.5 font-body">
                    Being carefully reviewed by our team
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="ml-4 h-6 w-px bg-graphite-200"></div>

              {/* Step 3 - Pending */}
              <div className="flex items-start gap-4 py-3 opacity-40">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-8 w-8 rounded-full bg-graphite-300 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-graphite-400" />
                  </div>
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="font-semibold text-graphite-600 text-sm font-body">Approval Decision</h3>
                  <p className="text-xs text-graphite-500 mt-0.5 font-body">
                    Approval or feedback
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

