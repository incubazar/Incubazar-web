"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle,
  Circle,
  ArrowRight,
  FileText,
  FolderOpen,
  Shield,
  Rocket
} from 'lucide-react'
import Link from 'next/link'

interface ChecklistItem {
  id: string
  title: string
  description: string
  completed: boolean
  link?: string
  icon: any
}

interface ReadinessChecklistProps {
  profile: any
  deals?: any[]
  dataRoomFiles?: number
}

export function ReadinessChecklist({
  profile,
  deals = [],
  dataRoomFiles = 0
}: ReadinessChecklistProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])

  useEffect(() => {
    const items: ChecklistItem[] = [
      {
        id: 'profile',
        title: 'Complete Your Profile',
        description: 'Fill in all sections of your startup profile with detailed information',
        completed: (profile?.profile_completion_percentage || 0) >= 100,
        link: '/founder/profile',
        icon: CheckCircle
      },
      {
        id: 'data_room',
        title: 'Build Your Data Room',
        description: 'Upload essential documents like pitch deck, financials, and legal documents',
        completed: dataRoomFiles >= 3, // At least 3 files
        link: '/founder/data-room',
        icon: FolderOpen
      },
      {
        id: 'documents',
        title: 'Generate Legal Documents',
        description: 'Create SAFE agreement and PAS-4 form templates',
        completed: false, // We'll track this separately in future
        link: '/founder/documents',
        icon: FileText
      },
      {
        id: 'compliance',
        title: 'Review Compliance Guidelines',
        description: 'Understand Section 42 requirements and investor limits',
        completed: true, // Assuming they've read it by accessing the platform
        link: '/legal/compliance',
        icon: Shield
      },
      {
        id: 'deal',
        title: 'Create Your First Deal',
        description: 'Set up a fundraising deal with your investment terms',
        completed: deals.length > 0,
        link: '/founder/deals/create',
        icon: Rocket
      }
    ]

    setChecklist(items)
  }, [profile, deals, dataRoomFiles])

  const completedCount = checklist.filter(item => item.completed).length
  const totalCount = checklist.length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Investor Readiness Checklist
            </CardTitle>
            <CardDescription>
              Complete these steps to maximize your fundraising success
            </CardDescription>
          </div>
          <Badge
            variant={completionPercentage === 100 ? 'default' : 'secondary'}
            className="text-lg px-4 py-2"
          >
            {completedCount}/{totalCount}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-medium">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        {/* Checklist Items */}
        <div className="space-y-3 pt-4">
          {checklist.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                  item.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-white border-gray-200 hover:border-primary hover:shadow-sm'
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {item.completed ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-300" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        item.completed ? 'text-green-900' : 'text-gray-900'
                      }`}>
                        {index + 1}. {item.title}
                      </h4>
                      <p className={`text-sm mt-1 ${
                        item.completed ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                    
                    {!item.completed && item.link && (
                      <Link href={item.link}>
                        <Button size="sm" variant="outline" className="whitespace-nowrap">
                          Start
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Completion Message */}
        {completionPercentage === 100 ? (
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900">You're investor-ready! 🎉</h4>
                <p className="text-sm text-green-700 mt-1">
                  You've completed all the essential steps. Your profile will be reviewed by our team,
                  and once approved, your deals will be visible to investors.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">
                  {totalCount - completedCount} step{totalCount - completedCount !== 1 ? 's' : ''} remaining
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  Complete the checklist to strengthen your fundraising profile and increase your
                  chances of connecting with the right investors.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


