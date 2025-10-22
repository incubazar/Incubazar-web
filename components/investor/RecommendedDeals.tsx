"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Sparkles,
  TrendingUp,
  Building2,
  DollarSign,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

interface MatchedDeal {
  startup_id: string
  startup_name: string
  total_score: number
  breakdown: {
    sector_score: number
    stage_score: number
    investment_range_score: number
    risk_profile_score: number
    location_score: number
  }
  match_reasons: string[]
  deal: {
    id: string
    deal_title: string
    problem_statement: string
    fundraising_goal: number
    min_investment: number
    industry_sector: string
    stage: string
    instrument_type: string
  }
}

interface RecommendedDealsProps {
  matches: MatchedDeal[]
}

export function RecommendedDeals({ matches }: RecommendedDealsProps) {
  if (matches.length === 0) {
    return null
  }

  const getMatchQuality = (score: number) => {
    if (score >= 80) {
      return { label: 'Excellent Match', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' }
    } else if (score >= 60) {
      return { label: 'Good Match', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' }
    } else if (score >= 40) {
      return { label: 'Fair Match', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' }
    } else {
      return { label: 'Low Match', color: 'text-gray-600', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' }
    }
  }

  const getStageLabel = (stage: string) => {
    const labels: Record<string, string> = {
      idea: 'Idea',
      mvp: 'MVP',
      early_revenue: 'Early Revenue'
    }
    return labels[stage] || stage
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Recommended for You
            </CardTitle>
            <CardDescription className="text-base">
              Deals matched to your investment preferences using AI
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            AI-Powered
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matches.slice(0, 5).map((match) => {
            const quality = getMatchQuality(match.total_score)

            return (
              <Card
                key={match.startup_id}
                className={`hover-lift border-2 ${quality.borderColor} ${quality.bgColor} transition-all cursor-pointer`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {/* Match Score Circle */}
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-full border-4 ${quality.borderColor} ${quality.bgColor} flex items-center justify-center`}>
                        <div className="text-center">
                          <div className={`text-xl font-bold ${quality.color}`}>
                            {match.total_score}
                          </div>
                          <div className="text-xs text-gray-600">%</div>
                        </div>
                      </div>
                    </div>

                    {/* Deal Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{match.startup_name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-1">{match.deal.deal_title}</p>
                        </div>
                        <Badge className={quality.color}>
                          {quality.label}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline">
                          <Building2 className="h-3 w-3 mr-1" />
                          {match.deal.industry_sector}
                        </Badge>
                        <Badge variant="secondary">
                          {getStageLabel(match.deal.stage)}
                        </Badge>
                        <Badge variant="default" className="uppercase">
                          {match.deal.instrument_type}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                        {match.deal.problem_statement}
                      </p>

                      {/* Match Reasons */}
                      {match.match_reasons.length > 0 && (
                        <div className="mb-3 p-3 bg-white/50 rounded-lg border">
                          <p className="text-xs font-semibold text-gray-700 mb-2">
                            Why it's a match:
                          </p>
                          <div className="space-y-1">
                            {match.match_reasons.slice(0, 3).map((reason, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs">
                                <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{reason}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Match Score Breakdown */}
                      <div className="grid grid-cols-5 gap-2 mb-3">
                        <div className="text-center">
                          <div className="text-xs text-gray-600 mb-1">Sector</div>
                          <div className={`text-sm font-bold ${
                            match.breakdown.sector_score >= 80 ? 'text-green-600' :
                            match.breakdown.sector_score >= 50 ? 'text-blue-600' :
                            'text-gray-600'
                          }`}>
                            {match.breakdown.sector_score}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-600 mb-1">Stage</div>
                          <div className={`text-sm font-bold ${
                            match.breakdown.stage_score >= 80 ? 'text-green-600' :
                            match.breakdown.stage_score >= 50 ? 'text-blue-600' :
                            'text-gray-600'
                          }`}>
                            {match.breakdown.stage_score}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-600 mb-1">Range</div>
                          <div className={`text-sm font-bold ${
                            match.breakdown.investment_range_score >= 80 ? 'text-green-600' :
                            match.breakdown.investment_range_score >= 50 ? 'text-blue-600' :
                            'text-gray-600'
                          }`}>
                            {match.breakdown.investment_range_score}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-600 mb-1">Risk</div>
                          <div className={`text-sm font-bold ${
                            match.breakdown.risk_profile_score >= 80 ? 'text-green-600' :
                            match.breakdown.risk_profile_score >= 50 ? 'text-blue-600' :
                            'text-gray-600'
                          }`}>
                            {match.breakdown.risk_profile_score}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-600 mb-1">Location</div>
                          <div className={`text-sm font-bold ${
                            match.breakdown.location_score >= 80 ? 'text-green-600' :
                            match.breakdown.location_score >= 50 ? 'text-blue-600' :
                            'text-gray-600'
                          }`}>
                            {match.breakdown.location_score}%
                          </div>
                        </div>
                      </div>

                      {/* Investment Info */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm">
                          <span className="text-gray-600">Goal: </span>
                          <span className="font-bold text-primary">
                            ₹{(match.deal.fundraising_goal / 100000).toFixed(1)}L
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Min: </span>
                          <span className="font-semibold">
                            ₹{(match.deal.min_investment / 100000).toFixed(1)}L
                          </span>
                        </div>
                      </div>

                      {/* CTA */}
                      <Link href={`/investor/deals/${match.deal.id}`}>
                        <Button className="w-full gradient-primary group" size="sm">
                          View Deal Details
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {matches.length > 5 && (
          <div className="mt-6 text-center">
            <Link href="/investor/deals?filter=recommended">
              <Button variant="outline" size="lg">
                View All Recommendations
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


