/**
 * Status Badge Component
 * 
 * Reusable badge component for displaying status with functional colors.
 * Part of Incubazar's Functional Color System.
 * 
 * See: FUNCTIONAL_COLOR_GUIDE.md for usage guidelines
 */

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const statusBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        // Success/Healthy/Positive (Green)
        success: 'bg-green-50 text-green-700 border border-green-200',
        
        // Info/Neutral/Good (Blue)
        info: 'bg-blue-50 text-blue-700 border border-blue-200',
        
        // Warning/Caution/Fair (Yellow/Amber)
        warning: 'bg-yellow-50 text-amber-700 border border-yellow-200',
        
        // Error/Critical/Urgent (Red)
        error: 'bg-red-50 text-red-700 border border-red-200',
        
        // Special/Featured (Purple)
        special: 'bg-purple-50 text-purple-700 border border-purple-200',
        
        // Alert/Moderate (Orange)
        alert: 'bg-orange-50 text-orange-700 border border-orange-200',
        
        // Monochrome (default)
        default: 'bg-graphite-50 text-graphite-700 border border-graphite-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  icon?: React.ReactNode
}

function StatusBadge({ className, variant, icon, children, ...props }: StatusBadgeProps) {
  return (
    <div className={cn(statusBadgeVariants({ variant }), className)} {...props}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </div>
  )
}

export { StatusBadge, statusBadgeVariants }
