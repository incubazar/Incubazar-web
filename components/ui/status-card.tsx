/**
 * Status Card Component
 * 
 * Reusable card component for displaying status with functional colors.
 * Part of Incubazar's Functional Color System.
 * 
 * See: FUNCTIONAL_COLOR_GUIDE.md for usage guidelines
 */

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const statusCardVariants = cva(
  'border-2 transition-colors',
  {
    variants: {
      status: {
        // Success/Healthy/Positive (Green)
        success: 'border-green-200 bg-green-50',
        
        // Info/Neutral/Good (Blue)
        info: 'border-blue-200 bg-blue-50',
        
        // Warning/Caution/Fair (Yellow/Amber)
        warning: 'border-yellow-200 bg-yellow-50',
        
        // Error/Critical/Urgent (Red)
        error: 'border-red-200 bg-red-50',
        
        // Special/Featured (Purple)
        special: 'border-purple-200 bg-purple-50',
        
        // Alert/Moderate (Orange)
        alert: 'border-orange-200 bg-orange-50',
        
        // Monochrome (default)
        default: 'border-graphite-200 bg-paper',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  }
)

const statusTextVariants = cva(
  '',
  {
    variants: {
      status: {
        success: 'text-green-700',
        info: 'text-blue-700',
        warning: 'text-amber-700',
        error: 'text-red-700',
        special: 'text-purple-700',
        alert: 'text-orange-700',
        default: 'text-ink',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  }
)

export interface StatusCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusCardVariants> {
  title?: string
  description?: string
  icon?: React.ReactNode
}

function StatusCard({ 
  className, 
  status, 
  title, 
  description, 
  icon,
  children, 
  ...props 
}: StatusCardProps) {
  return (
    <Card className={cn(statusCardVariants({ status }), className)} {...props}>
      {(title || description || icon) && (
        <CardHeader>
          {icon && (
            <div className={cn('mb-2', statusTextVariants({ status }))}>
              {icon}
            </div>
          )}
          {title && (
            <CardTitle className={statusTextVariants({ status })}>
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className={statusTextVariants({ status })}>
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      {children && (
        <CardContent className={statusTextVariants({ status })}>
          {children}
        </CardContent>
      )}
    </Card>
  )
}

export { StatusCard, statusCardVariants, statusTextVariants }
