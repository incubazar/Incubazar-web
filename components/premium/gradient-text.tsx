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
    primary: 'bg-gradient-to-r from-royal-blue-600 to-vibrant-violet-700',
    purple: 'bg-gradient-to-r from-vibrant-violet-700 to-vibrant-violet-600',
    cyan: 'bg-gradient-to-r from-cyan-accent-400 to-royal-blue-600',
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
