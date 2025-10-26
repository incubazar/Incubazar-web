"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Star,
  TrendingUp,
  Building2,
  DollarSign,
  Users,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

interface Deal {
  id: string
  deal_title: string
  problem_statement: string
  fundraising_goal: number
  min_investment: number
  max_investment: number
  instrument_type: string
  investor_count: number
  investor_limit: number
  founder_profile: {
    startup_name: string
    industry_sector: string
    stage: string
  }
}

interface FeaturedDealsProps {
  deals: Deal[]
}

export function FeaturedDeals({ deals }: FeaturedDealsProps) {
  if (deals.length === 0) {
    return null
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
    <Card className="border-2 border-ink/20 bg-gradient-to-br from-graphite-50 to-transparent">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Star className="h-6 w-6 text-ink fill-ink" />
              Featured Deals
            </CardTitle>
            <CardDescription className="text-base">
              Hand-picked opportunities curated by our team
            </CardDescription>
          </div>
          <Badge variant="default" className="text-sm px-3 py-1">
            Curated
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {deals.map((deal) => {
            const slotsRemaining = deal.investor_limit - deal.investor_count
            const percentageFilled = (deal.investor_count / deal.investor_limit) * 100

            return (
              <Card
                key={deal.id}
                className="hover-lift border-2 hover:border-primary transition-all cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg line-clamp-1">
                          {deal.founder_profile.startup_name}
                        </h3>
                        <Star className="h-4 w-4 text-ink fill-ink flex-shrink-0" />
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1">{deal.deal_title}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      <Building2 className="h-3 w-3 mr-1" />
                      {deal.founder_profile.industry_sector}
                    </Badge>
                    <Badge variant="secondary">
                      {getStageLabel(deal.founder_profile.stage)}
                    </Badge>
                    <Badge variant="default" className="uppercase">
                      {deal.instrument_type}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {deal.problem_statement}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">Fundraising Goal</p>
                      <p className="font-bold text-primary">
                        ₹{(deal.fundraising_goal / 100000).toFixed(1)}L
                      </p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">Min Investment</p>
                      <p className="font-bold">
                        ₹{(deal.min_investment / 100000).toFixed(1)}L
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {deal.investor_count}/{deal.investor_limit} investors
                      </span>
                      <span className={`font-medium ${
                        slotsRemaining < 20 ? 'text-ink' : 'text-gray-600'
                      }`}>
                        {slotsRemaining} slots left
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          percentageFilled >= 90
                            ? 'bg-graphite-900'
                            : percentageFilled >= 70
                            ? 'bg-graphite-700'
                            : 'bg-graphite-500'
                        }`}
                        style={{ width: `${Math.min(percentageFilled, 100)}%` }}
                      />
                    </div>
                  </div>

                  <Link href={`/investor/deals/${deal.id}`} className="block">
                    <Button className="w-full gradient-primary group">
                      View Deal Details
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {deals.length > 4 && (
          <div className="mt-6 text-center">
            <Link href="/investor/deals?filter=featured">
              <Button variant="outline" size="lg">
                View All Featured Deals
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


