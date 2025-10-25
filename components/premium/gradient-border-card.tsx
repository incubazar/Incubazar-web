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
      {/* Gradient border */}
      <div
        className={cn(
          'absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-royal-blue-600 via-vibrant-violet-700 to-vibrant-violet-600 opacity-50',
          glowOnHover && 'group-hover:opacity-100 transition-opacity duration-300'
        )}
      />
      
      {/* Card content */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6">
        {children}
      </div>
    </div>
  )
}
