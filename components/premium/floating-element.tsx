'use client'

import { motion } from 'framer-motion'

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  delay?: number
  range?: number
  duration?: number
}

export function FloatingElement({
  children,
  className = '',
  delay = 0,
  range = 10,
  duration = 3,
}: FloatingElementProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: [-range, range, -range],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
