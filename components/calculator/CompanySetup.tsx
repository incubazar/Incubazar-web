"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import type { CompanyBasics, IndustryType } from '@/lib/types/calculator'

interface CompanySetupProps {
  companyBasics: CompanyBasics
  onUpdate: (basics: Partial<CompanyBasics>) => void
}

const INDUSTRIES: IndustryType[] = [
  'SaaS',
  'E-commerce',
  'B2B Services',
  'FinTech',
  'HealthTech',
  'EdTech',
  'Marketplace',
  'DeepTech',
  'Consumer App',
  'Enterprise Software',
  'Other',
]

export function CompanySetup({ companyBasics, onUpdate }: CompanySetupProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={companyBasics.companyName}
            onChange={(e) => onUpdate({ companyName: e.target.value })}
            placeholder="Enter your company name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry *</Label>
          <Select
            value={companyBasics.industry}
            onValueChange={(value: IndustryType) => onUpdate({ industry: value })}
          >
            <SelectTrigger id="industry">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="foundingDate">Founding Date</Label>
          <Input
            id="foundingDate"
            type="date"
            value={companyBasics.foundingDate}
            onChange={(e) => onUpdate({ foundingDate: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="teamSize">Team Size</Label>
          <Input
            id="teamSize"
            type="number"
            min="0"
            value={companyBasics.teamSize || ''}
            onChange={(e) => onUpdate({ teamSize: parseInt(e.target.value) || 0 })}
            placeholder="Number of employees"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cashInBank">Current Cash in Bank ($) *</Label>
          <Input
            id="cashInBank"
            type="number"
            min="0"
            step="1000"
            value={companyBasics.cashInBank || ''}
            onChange={(e) => onUpdate({ cashInBank: parseFloat(e.target.value) || 0 })}
            placeholder="100000"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthlyRevenue">Current Monthly Revenue ($)</Label>
          <Input
            id="monthlyRevenue"
            type="number"
            min="0"
            step="1000"
            value={companyBasics.monthlyRevenue || ''}
            onChange={(e) => onUpdate({ monthlyRevenue: parseFloat(e.target.value) || 0 })}
            placeholder="10000"
          />
        </div>
      </div>

      <div className="pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> This information will be used across all calculators. You can update it anytime.
        </p>
      </div>
    </div>
  )
}
