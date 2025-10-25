'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  animate?: boolean
  variant?: 'primary' | 'purple' | 'cyan'
}

export function GradientText({
  children,
  className = '',
  animate = false,
  variant = 'primary',
}: GradientTextProps) {
  const gradients = {
    primary: 'bg-gradient-to-r from-graphite-900 to-ink',
    purple: 'bg-gradient-to-r from-graphite-800 to-graphite-900',
    cyan: 'bg-gradient-to-r from-graphite-700 to-graphite-900',
  }

  const Component = animate ? motion.span : 'span'

  return (
    <Component
      className={cn(
        gradients[variant],
        'bg-clip-text text-transparent',
        className
      )}
      {...(animate && {
        initial: { backgroundPosition: '0% 50%' },
        animate: { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] },
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        },
        style: { backgroundSize: '200% auto' },
      })}
    >
      {children}
    </Component>
  )
}
