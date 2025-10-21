"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DataBadge } from '@/components/ui/data-badge'
import { 
  FileText,
  Plus,
  Download,
  Eye,
  Send,
  CheckCircle,
  Clock,
  File,
  Shield,
  AlertCircle
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Document {
  id: string
  document_type: 'term_sheet' | 'pas4' | 'subscription_agreement' | 'pitch_deck'
  file_path: string
  signature_status: 'draft' | 'sent' | 'signed'
  created_at: string
  startup_deals: {
    deal_title: string
  }
}

export default function DocumentManagementPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [deals, setDeals] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) return

        const { data: profile } = await supabase
          .from('founder_profiles')
          .select('id')
          .eq('user_id', session.user.id)
          .single()

        if (!profile) return

        // Fetch deals
        const { data: dealsData } = await supabase
          .from('startup_deals')
          .select('id, deal_title, investor_count, investor_limit')
          .eq('founder_profile_id', profile.id)

        setDeals(dealsData || [])

        // Fetch documents
        const dealIds = dealsData?.map(d => d.id) || []
        if (dealIds.length > 0) {
          const { data: docsData, error } = await supabase
            .from('generated_documents')
            .select(`
              *,
              startup_deals (
                deal_title
              )
            `)
            .in('round_id', dealIds)
            .order('created_at', { ascending: false })

          if (error) {
            logger.error('Failed to fetch documents', error, {
              component: 'DOCUMENT_MANAGEMENT',
              action: 'FETCH'
            })
          } else {
            setDocuments(docsData || [])
          }
        }
      } catch (error) {
        logger.error('Failed to fetch documents', error as Error, {
          component: 'DOCUMENT_MANAGEMENT',
          action: 'FETCH'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [supabase])

  const getDocumentTypeBadge = (type: string) => {
    switch (type) {
      case 'term_sheet':
        return <DataBadge variant="info">Term Sheet</DataBadge>
      case 'pas4':
        return <DataBadge variant="warning">PAS-4</DataBadge>
      case 'subscription_agreement':
        return <DataBadge variant="success">Subscription Agreement</DataBadge>
      case 'pitch_deck':
        return <DataBadge variant="default">Pitch Deck</DataBadge>
      default:
        return <DataBadge variant="outline">{type}</DataBadge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <DataBadge variant="outline" icon={<File className="h-3 w-3" />}>Draft</DataBadge>
      case 'sent':
        return <DataBadge variant="warning" icon={<Clock className="h-3 w-3" />}>Sent</DataBadge>
      case 'signed':
        return <DataBadge variant="success" icon={<CheckCircle className="h-3 w-3" />}>Signed</DataBadge>
      default:
        return <DataBadge variant="outline">{status}</DataBadge>
    }
  }

  const stats = {
    total: documents.length,
    draft: documents.filter(d => d.signature_status === 'draft').length,
    sent: documents.filter(d => d.signature_status === 'sent').length,
    signed: documents.filter(d => d.signature_status === 'signed').length,
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
          <h1 className="text-4xl font-bold tracking-tight">Document Management</h1>
          <p className="text-lg text-muted-foreground">
            Generate, manage, and track legal documents
          </p>
        </div>
        <Button className="gradient-primary" size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Generate Document
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All documents</p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
            <File className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draft}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sent}</div>
            <p className="text-xs text-muted-foreground">Awaiting signature</p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Signed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.signed}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* RegTech Automation Info */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold mb-1">
                RegTech Lite Automation
              </h3>
              <p className="text-sm text-muted-foreground">
                Automatically generate compliant Term Sheets and PAS-4 forms. Documents are created using 
                standardized templates that comply with Section 42 of the Companies Act 2013.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      {documents.length === 0 ? (
        <Card className="card-premium">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No documents yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Generate your first legal document to start sending to investors.
              </p>
              <Button size="lg" className="gradient-primary">
                <Plus className="mr-2 h-5 w-5" />
                Generate First Document
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {documents.map((doc) => (
            <Card key={doc.id} className="card-premium hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl">
                        {doc.startup_deals.deal_title}
                      </CardTitle>
                      {getDocumentTypeBadge(doc.document_type)}
                      {getStatusBadge(doc.signature_status)}
                    </div>
                    <CardDescription className="text-base">
                      Created {formatDate(doc.created_at)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  {doc.signature_status === 'draft' && (
                    <Button size="sm" className="gradient-primary">
                      <Send className="mr-2 h-4 w-4" />
                      Send for Signature
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Compliance Notice */}
      <Card className="border-yellow-500/20 bg-yellow-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold mb-1 text-yellow-500">
                Legal Compliance Notice
              </h3>
              <p className="text-sm text-muted-foreground">
                All documents are generated using standardized templates. However, it is recommended to have 
                them reviewed by a legal professional before sending to investors. Incubazar is not responsible 
                for the legal validity of generated documents.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


