'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-premium rounded-2xl p-6',
        hover && 'transition-all duration-300 hover:shadow-premium-lg hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  )
}
