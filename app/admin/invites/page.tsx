"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Ticket,
  Plus,
  Copy,
  Check,
  X,
  Loader2,
  ArrowLeft,
  Users,
  Building2,
  Calendar,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface InviteCode {
  id: string
  code: string
  code_type: string
  usage_limit: number
  times_used: number
  is_active: boolean
  created_at: string
  expires_at: string | null
  created_by_user: {
    full_name: string
    email: string
  }
}

export default function InviteCodesPage() {
  const [codes, setCodes] = useState<InviteCode[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  // Form state
  const [codeType, setCodeType] = useState<string>('founder')
  const [usageLimit, setUsageLimit] = useState<number>(1)
  const [expiresInDays, setExpiresInDays] = useState<number | null>(null)
  const [customCode, setCustomCode] = useState<string>('')
  const [batchSize, setBatchSize] = useState<number>(1)

  const fetchCodes = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/invite-codes')
      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      setCodes(data.codes || [])
    } catch (error) {
      logger.error('Failed to fetch codes', error as Error, {
        component: 'INVITE_CODES_PAGE',
        action: 'FETCH'
      })
      toast.error('Failed to load invite codes')
    } finally {
      setLoading(false)
    }
  }, [])

  const checkAdminAndFetchCodes = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      // Check if user is admin
      const { data: user } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (!user || user.role !== 'admin') {
        router.push('/')
        return
      }

      fetchCodes()
    } catch (error) {
      logger.error('Failed to verify admin', error as Error, {
        component: 'INVITE_CODES_PAGE',
        action: 'CHECK_ADMIN'
      })
      setLoading(false)
    }
  }, [fetchCodes, router, supabase])

  useEffect(() => {
    checkAdminAndFetchCodes()
  }, [checkAdminAndFetchCodes])

  const handleCreateCode = async () => {
    setCreating(true)
    try {
      const response = await fetch('/api/admin/invite-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code_type: codeType,
          usage_limit: usageLimit,
          expires_in_days: expiresInDays,
          custom_code: customCode || null,
          batch_size: batchSize
        })
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      toast.success(`Created ${batchSize} invite code(s) successfully!`)
      
      // Reset form
      setCustomCode('')
      setBatchSize(1)
      setUsageLimit(1)
      setExpiresInDays(null)
      
      // Refresh codes list
      fetchCodes()
    } catch (error: any) {
      logger.error('Failed to create invite code', error, {
        component: 'INVITE_CODES_PAGE',
        action: 'CREATE'
      })
      toast.error(error.message || 'Failed to create invite code')
    } finally {
      setCreating(false)
    }
  }

  const handleToggleActive = async (codeId: string, currentStatus: boolean) => {
    try {
      const response = await fetch('/api/admin/invite-codes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code_id: codeId,
          is_active: !currentStatus
        })
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      toast.success(`Code ${!currentStatus ? 'activated' : 'deactivated'}`)
      fetchCodes()
    } catch (error: any) {
      logger.error('Failed to toggle code status', error, {
        component: 'INVITE_CODES_PAGE',
        action: 'TOGGLE'
      })
      toast.error(error.message || 'Failed to update code')
    }
  }

  const handleDeleteCode = async (codeId: string) => {
    if (!confirm('Are you sure you want to delete this invite code?')) return

    try {
      const response = await fetch(`/api/admin/invite-codes?code_id=${codeId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      toast.success('Invite code deleted')
      fetchCodes()
    } catch (error: any) {
      logger.error('Failed to delete code', error, {
        component: 'INVITE_CODES_PAGE',
        action: 'DELETE'
      })
      toast.error(error.message || 'Failed to delete code')
    }
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast.success('Code copied to clipboard!')
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'founder':
        return <Building2 className="h-4 w-4" />
      case 'investor':
        return <Users className="h-4 w-4" />
      default:
        return <Ticket className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'founder':
        return 'default'
      case 'investor':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const activeCodesCount = codes.filter(c => c.is_active).length
  const usedCodesCount = codes.filter(c => c.times_used >= c.usage_limit).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Invite Codes</h1>
            <p className="text-lg text-gray-600">Generate and manage invite codes for cohort-based onboarding</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Codes</p>
                <p className="text-2xl font-bold">{codes.length}</p>
              </div>
              <Ticket className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{activeCodesCount}</p>
              </div>
              <Check className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Fully Used</p>
                <p className="text-2xl font-bold text-orange-600">{usedCodesCount}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-gray-600">{codes.length - activeCodesCount}</p>
              </div>
              <X className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create New Code Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Generate New Code
            </CardTitle>
            <CardDescription>Create new invite codes for founders or investors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code_type">Code Type *</Label>
              <Select value={codeType} onValueChange={setCodeType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="founder">Founder</SelectItem>
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="usage_limit">Usage Limit</Label>
              <Input
                id="usage_limit"
                type="number"
                min="1"
                value={usageLimit}
                onChange={(e) => setUsageLimit(parseInt(e.target.value) || 1)}
              />
              <p className="text-xs text-gray-500">Number of times this code can be used</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expires_in_days">Expires In (Days)</Label>
              <Input
                id="expires_in_days"
                type="number"
                min="1"
                placeholder="Never expires"
                value={expiresInDays || ''}
                onChange={(e) => setExpiresInDays(e.target.value ? parseInt(e.target.value) : null)}
              />
              <p className="text-xs text-gray-500">Leave empty for no expiration</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom_code">Custom Code (Optional)</Label>
              <Input
                id="custom_code"
                placeholder="AUTO-GENERATED"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
              />
              <p className="text-xs text-gray-500">Leave empty for auto-generated code</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="batch_size">Batch Size</Label>
              <Input
                id="batch_size"
                type="number"
                min="1"
                max="50"
                value={batchSize}
                onChange={(e) => setBatchSize(parseInt(e.target.value) || 1)}
              />
              <p className="text-xs text-gray-500">Generate multiple codes at once (max 50)</p>
            </div>

            <Button
              onClick={handleCreateCode}
              disabled={creating}
              className="w-full gradient-primary"
            >
              {creating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Code{batchSize > 1 ? 's' : ''}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Codes List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Invite Codes</CardTitle>
              <CardDescription>Manage and track your invite codes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {codes.length === 0 ? (
                  <div className="text-center py-12">
                    <Ticket className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No invite codes yet</p>
                    <p className="text-sm text-gray-500">Create your first invite code to get started</p>
                  </div>
                ) : (
                  codes.map((code) => (
                    <div
                      key={code.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        code.is_active ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <button
                            onClick={() => copyToClipboard(code.code)}
                            className="font-mono text-lg font-bold hover:text-primary transition-colors flex items-center gap-2"
                          >
                            {code.code}
                            {copiedCode === code.code ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                          <Badge variant={getTypeColor(code.code_type)}>
                            <span className="flex items-center gap-1">
                              {getTypeIcon(code.code_type)}
                              {code.code_type}
                            </span>
                          </Badge>
                          <Badge variant={code.is_active ? 'default' : 'secondary'}>
                            {code.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Used: {code.times_used}/{code.usage_limit}</span>
                          {code.expires_at && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Expires: {new Date(code.expires_at).toLocaleDateString()}
                            </span>
                          )}
                          <span>Created: {new Date(code.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleActive(code.id, code.is_active)}
                        >
                          {code.is_active ? 'Deactivate' : 'Activate'}
                        </Button>
                        {code.times_used === 0 && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteCode(code.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


