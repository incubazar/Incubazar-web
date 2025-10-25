'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ShimmerCardProps {
  children: React.ReactNode
  className?: string
}

export function ShimmerCard({ children, className = '' }: ShimmerCardProps) {
  return (
    <div className={cn('group relative overflow-hidden rounded-2xl', className)}>
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          translateX: ['100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'linear',
        }}
      />
      
      {/* Card content */}
      <div className="relative card-premium p-6">
        {children}
      </div>
    </div>
  )
}
