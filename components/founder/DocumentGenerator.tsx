"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  FileText,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'
import { toast } from 'sonner'

interface DocumentGeneratorProps {
  founderProfile: any
  startupDetails?: any
}

export function DocumentGenerator({ founderProfile, startupDetails }: DocumentGeneratorProps) {
  const [generating, setGenerating] = useState(false)
  const [generatedDocs, setGeneratedDocs] = useState<{
    safe?: string
    pas4?: string
  }>({})

  // SAFE generation data
  const [safeData, setSafeData] = useState({
    investmentAmount: '',
    valuationCap: '',
    discountRate: '20'
  })

  // PAS-4 generation data
  const [pas4Data, setPas4Data] = useState({
    investmentAmount: '',
    numberOfShares: '',
    faceValue: '10',
    premium: '',
    companyAddress: ''
  })

  const handleGenerateSAFE = async () => {
    if (!safeData.investmentAmount || !safeData.valuationCap) {
      toast.error('Please fill in all required fields')
      return
    }

    setGenerating(true)
    try {
      const response = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document_type: 'safe',
          data: {
            companyName: founderProfile.startup_name,
            founderName: startupDetails?.founder_names || 'Founder',
            investorName: '[INVESTOR_NAME]',
            investmentAmount: parseFloat(safeData.investmentAmount),
            valuationCap: parseFloat(safeData.valuationCap),
            discountRate: parseFloat(safeData.discountRate),
            date: new Date().toLocaleDateString('en-IN')
          }
        })
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      // Download the generated PDF
      const pdfBlob = new Blob([Uint8Array.from(atob(data.pdf), c => c.charCodeAt(0))], {
        type: 'application/pdf'
      })
      const url = URL.createObjectURL(pdfBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `SAFE_${founderProfile.startup_name}_${Date.now()}.pdf`
      a.click()
      URL.revokeObjectURL(url)

      setGeneratedDocs(prev => ({ ...prev, safe: data.document_url }))
      toast.success('SAFE agreement generated and downloaded!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate SAFE agreement')
    } finally {
      setGenerating(false)
    }
  }

  const handleGeneratePAS4 = async () => {
    if (!founderProfile.incorporation_number) {
      toast.error('PAS-4 requires incorporation details. Please update your profile.')
      return
    }

    if (!pas4Data.investmentAmount || !pas4Data.numberOfShares || !pas4Data.companyAddress) {
      toast.error('Please fill in all required fields')
      return
    }

    setGenerating(true)
    try {
      const response = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document_type: 'pas4',
          data: {
            companyName: founderProfile.startup_name,
            incorporationNumber: founderProfile.incorporation_number,
            companyAddress: pas4Data.companyAddress,
            dateOfIncorporation: startupDetails?.founded_date || 'N/A',
            authorizedCapital: 1000000, // Default, should come from profile
            paidUpCapital: 100000, // Default, should come from profile
            investorName: '[INVESTOR_NAME]',
            investorAddress: '[INVESTOR_ADDRESS]',
            investorPAN: '[INVESTOR_PAN]',
            investmentAmount: parseFloat(pas4Data.investmentAmount),
            numberOfShares: parseInt(pas4Data.numberOfShares),
            faceValue: parseFloat(pas4Data.faceValue),
            premium: parseFloat(pas4Data.premium),
            totalConsideration: parseFloat(pas4Data.investmentAmount),
            date: new Date().toLocaleDateString('en-IN')
          }
        })
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      // Download the generated PDF
      const pdfBlob = new Blob([Uint8Array.from(atob(data.pdf), c => c.charCodeAt(0))], {
        type: 'application/pdf'
      })
      const url = URL.createObjectURL(pdfBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `PAS4_${founderProfile.startup_name}_${Date.now()}.pdf`
      a.click()
      URL.revokeObjectURL(url)

      setGeneratedDocs(prev => ({ ...prev, pas4: data.document_url }))
      toast.success('PAS-4 form generated and downloaded!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate PAS-4 form')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Alert className="border-graphite-200 bg-graphite-50">
        <Info className="h-4 w-4 text-ink" />
        <AlertDescription className="text-graphite-800">
          <strong>Document Templates:</strong> These are standardized templates with your company details pre-filled.
          You can download them, review with legal counsel, and use them for your fundraising.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SAFE Agreement */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  SAFE Agreement
                </CardTitle>
                <CardDescription>Simple Agreement for Future Equity</CardDescription>
              </div>
              {generatedDocs.safe && (
                <CheckCircle className="h-6 w-6 text-ink" />
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="safe_investment">Investment Amount (₹) *</Label>
              <Input
                id="safe_investment"
                type="number"
                placeholder="500000"
                value={safeData.investmentAmount}
                onChange={(e) => setSafeData({ ...safeData, investmentAmount: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="safe_valuation">Valuation Cap (₹) *</Label>
              <Input
                id="safe_valuation"
                type="number"
                placeholder="50000000"
                value={safeData.valuationCap}
                onChange={(e) => setSafeData({ ...safeData, valuationCap: e.target.value })}
              />
              <p className="text-xs text-gray-500">
                The maximum company value for conversion
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="safe_discount">Discount Rate (%)</Label>
              <Input
                id="safe_discount"
                type="number"
                placeholder="20"
                value={safeData.discountRate}
                onChange={(e) => setSafeData({ ...safeData, discountRate: e.target.value })}
              />
              <p className="text-xs text-gray-500">
                Typical range: 15-25%
              </p>
            </div>

            <Button
              onClick={handleGenerateSAFE}
              disabled={generating}
              className="w-full gradient-primary"
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate SAFE
                </>
              )}
            </Button>

            {generatedDocs.safe && (
              <div className="p-3 bg-graphite-100 border border-graphite-300 rounded-lg">
                <p className="text-sm text-graphite-800">
                  SAFE agreement generated successfully!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* PAS-4 Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  PAS-4 Form
                </CardTitle>
                <CardDescription>Private Placement Offer Letter</CardDescription>
              </div>
              {generatedDocs.pas4 && (
                <CheckCircle className="h-6 w-6 text-ink" />
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {!founderProfile.incorporation_number ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  PAS-4 form requires your company to be incorporated. Please update your incorporation
                  details in your profile.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="pas4_investment">Investment Amount (₹) *</Label>
                  <Input
                    id="pas4_investment"
                    type="number"
                    placeholder="500000"
                    value={pas4Data.investmentAmount}
                    onChange={(e) => setPas4Data({ ...pas4Data, investmentAmount: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pas4_shares">Number of Shares *</Label>
                  <Input
                    id="pas4_shares"
                    type="number"
                    placeholder="5000"
                    value={pas4Data.numberOfShares}
                    onChange={(e) => setPas4Data({ ...pas4Data, numberOfShares: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pas4_face">Face Value (₹)</Label>
                    <Input
                      id="pas4_face"
                      type="number"
                      placeholder="10"
                      value={pas4Data.faceValue}
                      onChange={(e) => setPas4Data({ ...pas4Data, faceValue: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pas4_premium">Premium (₹) *</Label>
                    <Input
                      id="pas4_premium"
                      type="number"
                      placeholder="90"
                      value={pas4Data.premium}
                      onChange={(e) => setPas4Data({ ...pas4Data, premium: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pas4_address">Company Registered Address *</Label>
                  <Input
                    id="pas4_address"
                    placeholder="Complete address with pincode"
                    value={pas4Data.companyAddress}
                    onChange={(e) => setPas4Data({ ...pas4Data, companyAddress: e.target.value })}
                  />
                </div>

                <Button
                  onClick={handleGeneratePAS4}
                  disabled={generating}
                  className="w-full gradient-primary"
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Generate PAS-4
                    </>
                  )}
                </Button>

                {generatedDocs.pas4 && (
                  <div className="p-3 bg-graphite-100 border border-graphite-300 rounded-lg">
                    <p className="text-sm text-graphite-800">
                      PAS-4 form generated successfully!
                    </p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Legal Disclaimer */}
      <Card className="border-graphite-300 bg-graphite-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-ink mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-ink">
                Legal Disclaimer
              </h3>
              <p className="text-sm text-graphite-700 mt-1">
                These are template documents for your convenience. We strongly recommend having them
                reviewed by a qualified legal professional before using them in any actual transaction.
                Incubazar is not responsible for the legal validity of these documents.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


