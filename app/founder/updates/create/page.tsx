"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft,
  Save,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

export default function CreateUpdatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [startupId, setStartupId] = useState<string | null>(null)
  const supabase = createClient()

  const getCurrentQuarter = () => Math.floor(new Date().getMonth() / 3) + 1
  const getCurrentYear = () => new Date().getFullYear()

  const [formData, setFormData] = useState({
    quarter: getCurrentQuarter(),
    year: getCurrentYear(),
    update_text: '',
    revenue: '',
    users: '',
    mrr: '',
    burn_rate: '',
    runway_months: '',
    team_size: ''
  })

  useEffect(() => {
    const fetchStartupId = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        router.push('/auth/login')
        return
      }

      const { data: profile } = await supabase
        .from('founder_profiles')
        .select('id')
        .eq('user_id', session.user.id)
        .single()

      if (profile) {
        setStartupId(profile.id)
      }
    }

    fetchStartupId()
  }, [supabase, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!startupId) return

    setLoading(true)
    try {
      const key_metrics: any = {}
      if (formData.revenue) key_metrics.revenue = formData.revenue
      if (formData.users) key_metrics.users = formData.users
      if (formData.mrr) key_metrics.mrr = formData.mrr
      if (formData.burn_rate) key_metrics.burn_rate = formData.burn_rate
      if (formData.runway_months) key_metrics.runway_months = formData.runway_months
      if (formData.team_size) key_metrics.team_size = formData.team_size

      const { error } = await supabase
        .from('quarterly_updates')
        .insert({
          startup_id: startupId,
          quarter: formData.quarter,
          year: formData.year,
          update_text: formData.update_text,
          key_metrics
        })

      if (error) {
        logger.error('Failed to create quarterly update', error, {
          component: 'CREATE_UPDATE',
          action: 'INSERT'
        })
        alert('Failed to create update. Please try again.')
      } else {
        alert('Update created successfully!')
        router.push('/founder/updates')
      }
    } catch (error) {
      logger.error('Failed to submit update', error as Error, {
        component: 'CREATE_UPDATE',
        action: 'SUBMIT'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* Back button */}
      <Link href="/founder/updates">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Updates
        </Button>
      </Link>

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight">Create Quarterly Update</h1>
        <p className="text-lg text-muted-foreground">
          Share your progress and key metrics with investors
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Quarter Selection */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Update Period</CardTitle>
            <CardDescription>Select the quarter for this update</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Quarter</Label>
                <Select
                  value={formData.quarter.toString()}
                  onValueChange={(value) => setFormData({ ...formData, quarter: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Q1 (Jan-Mar)</SelectItem>
                    <SelectItem value="2">Q2 (Apr-Jun)</SelectItem>
                    <SelectItem value="3">Q3 (Jul-Sep)</SelectItem>
                    <SelectItem value="4">Q4 (Oct-Dec)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Year</Label>
                <Select
                  value={formData.year.toString()}
                  onValueChange={(value) => setFormData({ ...formData, year: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 5 }, (_, i) => getCurrentYear() - i).map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Update Text */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Update Summary</CardTitle>
            <CardDescription>
              Provide a comprehensive update on your startup's progress, challenges, and wins
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Share key highlights, milestones achieved, challenges faced, and plans for the next quarter..."
              value={formData.update_text}
              onChange={(e) => setFormData({ ...formData, update_text: e.target.value })}
              rows={10}
              required
              className="resize-none"
            />
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Key Metrics
            </CardTitle>
            <CardDescription>
              Add relevant metrics to show your growth (all fields optional)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="revenue">Revenue (₹)</Label>
                <Input
                  id="revenue"
                  type="text"
                  placeholder="e.g., ₹5,00,000"
                  value={formData.revenue}
                  onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="users">Total Users</Label>
                <Input
                  id="users"
                  type="text"
                  placeholder="e.g., 10,000"
                  value={formData.users}
                  onChange={(e) => setFormData({ ...formData, users: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mrr">MRR (₹)</Label>
                <Input
                  id="mrr"
                  type="text"
                  placeholder="e.g., ₹50,000"
                  value={formData.mrr}
                  onChange={(e) => setFormData({ ...formData, mrr: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="burn_rate">Monthly Burn Rate (₹)</Label>
                <Input
                  id="burn_rate"
                  type="text"
                  placeholder="e.g., ₹2,00,000"
                  value={formData.burn_rate}
                  onChange={(e) => setFormData({ ...formData, burn_rate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="runway_months">Runway (Months)</Label>
                <Input
                  id="runway_months"
                  type="text"
                  placeholder="e.g., 18"
                  value={formData.runway_months}
                  onChange={(e) => setFormData({ ...formData, runway_months: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="team_size">Team Size</Label>
                <Input
                  id="team_size"
                  type="text"
                  placeholder="e.g., 12"
                  value={formData.team_size}
                  onChange={(e) => setFormData({ ...formData, team_size: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Link href="/founder/updates">
            <Button variant="outline" size="lg" type="button">
              Cancel
            </Button>
          </Link>
          <Button 
            type="submit" 
            size="lg" 
            className="gradient-primary"
            disabled={loading || !formData.update_text}
          >
            <Save className="mr-2 h-5 w-5" />
            {loading ? 'Saving...' : 'Publish Update'}
          </Button>
        </div>
      </form>
    </div>
  )
}



