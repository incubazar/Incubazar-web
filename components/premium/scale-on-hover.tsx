'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScaleOnHoverProps {
  children: ReactNode
  className?: string
  scale?: number
  glow?: boolean
}

export function ScaleOnHover({
  children,
  className = '',
  scale = 1.05,
  glow = false,
}: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{
        scale,
        ...(glow && {
          boxShadow: '0 0 30px rgba(124, 58, 237, 0.3)',
        }),
      }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
