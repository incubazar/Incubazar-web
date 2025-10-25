"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Settings, User, Bell, Shield, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function InvestorSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    phone: '',
  })
  const router = useRouter()
  const supabase = createClient()

  const fetchUserData = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle()

      if (error || !userData) throw error

      setUser(userData)
      setProfile({
        full_name: userData.full_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
      })
    } catch (error) {
      logger.error('Failed to fetch user data', error as Error, {
        component: 'INVESTOR_SETTINGS',
        action: 'FETCH'
      })
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }, [router, supabase])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
        })
        .eq('id', user.id)

      if (error) throw error

      toast.success('Profile updated successfully!')
    } catch (error) {
      logger.error('Failed to update profile', error as Error, {
        component: 'INVESTOR_SETTINGS',
        action: 'UPDATE'
      })
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
        <p className="text-lg text-gray-600 mt-2">Manage your account preferences and profile</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              disabled
              className="bg-gray-50"
            />
            <p className="text-sm text-gray-600">Email cannot be changed</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <Button 
            onClick={handleSaveProfile} 
            disabled={saving}
            className="mt-4"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Manage how you receive updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-gray-50 rounded-lg text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Notification settings coming soon</p>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Password</p>
                <p className="text-sm text-gray-600">Change your password</p>
              </div>
              <Button variant="outline" disabled>
                Change Password
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add extra security to your account</p>
              </div>
              <Button variant="outline" disabled>
                Enable 2FA
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

