'use client'

import { cn } from '@/lib/utils'
import { ReactNode, ButtonHTMLAttributes } from 'react'

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
}

export function PremiumButton({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  glow = false,
  ...props
}: PremiumButtonProps) {
  const variants = {
    primary: 'btn-premium',
    secondary: 'bg-gradient-to-r from-cyan-accent-400 to-royal-blue-500 text-white',
    outline: 'border-2 border-vibrant-violet-600 text-vibrant-violet-600 hover:bg-vibrant-violet-50 dark:hover:bg-vibrant-violet-950',
    ghost: 'text-vibrant-violet-600 hover:bg-vibrant-violet-50 dark:hover:bg-vibrant-violet-950',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={cn(
        'rounded-xl font-semibold transition-all duration-300 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-vibrant-violet-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        glow && 'hover:shadow-glow-purple',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
