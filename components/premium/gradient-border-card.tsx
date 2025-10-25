'use client'

import { cn } from '@/lib/utils'

interface GradientBorderCardProps {
  children: React.ReactNode
  className?: string
  glowOnHover?: boolean
}

export function GradientBorderCard({
  children,
  className = '',
  glowOnHover = true,
}: GradientBorderCardProps) {
  return (
    <div className={cn('group relative', className)}>
      {/* Monochrome gradient border (grayscale only) */}
      <div
        className={cn(
          'absolute -inset-[2px] bg-gradient-to-r from-graphite-600 via-graphite-800 to-ink opacity-30',
          glowOnHover && 'group-hover:opacity-70 transition-opacity duration-300'
        )}
      />
      
      {/* Card content - sharp edges, monochrome */}
      <div className="relative bg-paper border border-graphite-200 p-6">
        {children}
      </div>
    </div>
  )
}
