"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DataBadge } from '@/components/ui/data-badge'
import { 
  Plus,
  FileText,
  Calendar,
  TrendingUp,
  Eye,
  Edit
} from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface QuarterlyUpdate {
  id: string
  quarter: number
  year: number
  update_text: string
  key_metrics: any
  created_at: string
}

export default function QuarterlyUpdatesPage() {
  const [updates, setUpdates] = useState<QuarterlyUpdate[]>([])
  const [loading, setLoading] = useState(true)
  const [startupId, setStartupId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) return

        const { data: profile } = await supabase
          .from('founder_profiles')
          .select('id')
          .eq('user_id', session.user.id)
          .single()

        if (!profile) return
        setStartupId(profile.id)

        const { data: updatesData, error } = await supabase
          .from('quarterly_updates')
          .select('*')
          .eq('startup_id', profile.id)
          .order('year', { ascending: false })
          .order('quarter', { ascending: false })

        if (error) {
          logger.error('Failed to fetch quarterly updates', error, {
            component: 'QUARTERLY_UPDATES',
            action: 'FETCH'
          })
        } else {
          setUpdates(updatesData || [])
        }
      } catch (error) {
        logger.error('Failed to fetch updates', error as Error, {
          component: 'QUARTERLY_UPDATES',
          action: 'FETCH'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUpdates()
  }, [supabase])

  const getCurrentQuarter = () => {
    const month = new Date().getMonth()
    return Math.floor(month / 3) + 1
  }

  const getCurrentYear = () => {
    return new Date().getFullYear()
  }

  const getQuarterLabel = (quarter: number, year: number) => {
    return `Q${quarter} ${year}`
  }

  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="h-10 bg-muted/50 rounded-lg w-1/3 shimmer"></div>
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-card rounded-lg border border-border shimmer"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Quarterly Updates</h1>
          <p className="text-lg text-muted-foreground">
            Keep your investors informed with regular updates
          </p>
        </div>
        <Link href="/founder/updates/create">
          <Button className="gradient-primary" size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Create Update
          </Button>
        </Link>
      </div>

      {/* Current Quarter Info */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <h3 className="text-sm font-semibold">Current Quarter</h3>
              <p className="text-sm text-muted-foreground">
                {getQuarterLabel(getCurrentQuarter(), getCurrentYear())} - 
                {updates.some(u => u.quarter === getCurrentQuarter() && u.year === getCurrentYear())
                  ? ' Update submitted'
                  : ' Update pending'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Updates List */}
      {updates.length === 0 ? (
        <Card className="card-premium">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No updates yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start sharing your progress with investors by creating your first quarterly update.
              </p>
              <Link href="/founder/updates/create">
                <Button size="lg" className="gradient-primary">
                  <Plus className="mr-2 h-5 w-5" />
                  Create Your First Update
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {updates.map((update) => (
            <Card key={update.id} className="card-premium hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-2xl">
                        {getQuarterLabel(update.quarter, update.year)}
                      </CardTitle>
                      <DataBadge variant="success">Published</DataBadge>
                    </div>
                    <CardDescription className="text-base">
                      Submitted {formatDate(update.created_at)}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Update Summary</h4>
                  <p className="text-muted-foreground line-clamp-3">
                    {update.update_text}
                  </p>
                </div>

                {update.key_metrics && Object.keys(update.key_metrics).length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1.5" />
                      Key Metrics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(update.key_metrics).map(([key, value]) => (
                        <div key={key} className="p-3 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground mb-1 capitalize">
                            {key.replace(/_/g, ' ')}
                          </p>
                          <p className="text-lg font-bold">{value as string}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}



