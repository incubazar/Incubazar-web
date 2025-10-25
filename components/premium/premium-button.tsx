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
    primary: 'bg-ink text-paper hover:bg-graphite-900',
    secondary: 'bg-gradient-to-r from-graphite-400 to-graphite-700 text-paper hover:from-graphite-500 hover:to-graphite-800',
    outline: 'border-2 border-ink text-ink hover:bg-ink hover:text-paper',
    ghost: 'text-ink hover:bg-graphite-100',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={cn(
        'font-semibold transition-all duration-300 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        glow && 'hover:shadow-editorial-lg',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
