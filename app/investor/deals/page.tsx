"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search,
  TrendingUp,
  Building2,
  Sparkles,
  Filter,
  Loader2,
  Star,
  CheckCircle
} from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { getMatchQuality } from '@/lib/matching/algorithm'

interface Recommendation {
  startup_id: string
  startup_name: string
  total_score: number
  breakdown: any
  match_reasons: string[]
  startup: {
    id: string
    startup_name: string
    industry_sector: string
    stage: string
    logo_url?: string
    created_at: string
  }
}

export default function InvestorDealsPage() {
  const [loading, setLoading] = useState(true)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [allStartups, setAllStartups] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterSector, setFilterSector] = useState('')
  const [filterStage, setFilterStage] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push('/login')
          return
        }

        // Fetch personalized recommendations
        const response = await fetch('/api/matching/recommendations')
        if (response.ok) {
          const data = await response.json()
          setRecommendations(data.recommendations || [])
        } else {
          // If no recommendations, fetch all startups
          const { data: startups } = await supabase
            .from('founder_profiles')
            .select('*')
            .eq('admin_approval_status', 'approved')
          
          setAllStartups(startups || [])
        }
      } catch (error) {
        logger.error('Failed to fetch recommendations', error as Error, {
          component: 'INVESTOR_DEALS',
          action: 'FETCH_RECOMMENDATIONS'
        })
        toast.error('Failed to load deals')
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [supabase, router])

  const filteredRecommendations = recommendations.filter(rec => {
    const matchesSearch = rec.startup_name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSector = !filterSector || rec.startup.industry_sector === filterSector
    const matchesStage = !filterStage || rec.startup.stage === filterStage
    return matchesSearch && matchesSector && matchesStage
  })

  const getStageLabel = (stage: string) => {
    const labels: Record<string, string> = {
      'idea': 'Idea',
      'mvp': 'MVP',
      'early_revenue': 'Early Revenue'
    }
    return labels[stage] || stage
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Deal Flow</h1>
          <p className="text-lg text-gray-600">
            {recommendations.length > 0 
              ? `${recommendations.length} personalized recommendations based on your preferences`
              : 'Discover investment opportunities'
            }
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search startups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterSector} onValueChange={setFilterSector}>
              <SelectTrigger>
                <SelectValue placeholder="All Sectors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Sectors</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Fintech">Fintech</SelectItem>
                <SelectItem value="Edtech">Edtech</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
                <SelectItem value="SaaS">SaaS</SelectItem>
                <SelectItem value="AI/ML">AI/ML</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStage} onValueChange={setFilterStage}>
              <SelectTrigger>
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Stages</SelectItem>
                <SelectItem value="idea">Idea Stage</SelectItem>
                <SelectItem value="mvp">MVP Stage</SelectItem>
                <SelectItem value="early_revenue">Early Revenue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Deals Grid */}
      {filteredRecommendations.length === 0 ? (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No matches found</h3>
            <p className="text-gray-600 mb-6">
              {recommendations.length === 0 
                ? 'Complete your investment preferences to see personalized recommendations'
                : 'Try adjusting your filters'
              }
            </p>
            {recommendations.length === 0 && (
              <Link href="/investor/onboarding">
                <Button className="gradient-primary">
                  Set Your Preferences
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecommendations.map((rec) => {
            const matchQuality = getMatchQuality(rec.total_score)
            
            return (
              <Card key={rec.startup_id} className="hover-lift cursor-pointer group relative overflow-hidden">
                {/* Match score badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge 
                    variant={matchQuality.category === 'excellent' ? 'default' : 'secondary'}
                    className="flex items-center gap-1"
                  >
                    <Star className="h-3 w-3" fill="currentColor" />
                    {rec.total_score}% Match
                  </Badge>
                </div>

                {/* Gradient overlay for excellent matches */}
                {matchQuality.category === 'excellent' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                )}

                <Link href={`/investor/deals/${rec.startup_id}`}>
                  <CardHeader className="relative z-10">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                          {rec.startup_name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {rec.startup.industry_sector}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {getStageLabel(rec.startup.stage)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 relative z-10">
                    {/* Match reasons */}
                    {rec.match_reasons.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-600 uppercase">Why this matches:</p>
                        <div className="space-y-1">
                          {rec.match_reasons.slice(0, 3).map((reason, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Match breakdown */}
                    <div className="pt-3 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sector:</span>
                          <span className="font-semibold">{rec.breakdown.sector_score}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Stage:</span>
                          <span className="font-semibold">{rec.breakdown.stage_score}%</span>
                        </div>
                      </div>
                    </div>

                    {/* View button */}
                    <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-colors">
                      View Details
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>
      )}

      {/* Info card */}
      {recommendations.length > 0 && (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Smart Recommendations</h3>
                <p className="text-sm text-gray-600">
                  These deals are personalized based on your investment preferences including sectors, stages, 
                  investment range, and risk appetite. Match scores above 80% are excellent fits!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
