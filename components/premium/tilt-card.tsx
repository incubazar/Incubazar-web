'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: ReactNode
  className?: string
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  return (
    <motion.div
      whileHover={{
        rotateX: 5,
        rotateY: 5,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={cn('transition-all duration-300', className)}
    >
      {children}
    </motion.div>
  )
}
