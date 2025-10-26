import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  variant?: 'default' | 'icon-only'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  href?: string
  showText?: boolean
}

export function Logo({ 
  variant = 'default', 
  size = 'md',
  className = '',
  href = '/',
  showText = true
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  const logoElement = (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Monochrome logo icon */}
      <div className={`${sizeClasses[size]} bg-ink flex items-center justify-center flex-shrink-0`}>
        <span className="text-paper font-bold text-sm">I</span>
      </div>
      
      {/* Text */}
      {showText && variant === 'default' && (
        <span className={`${textSizeClasses[size]} font-bold text-ink font-serif`}>
          Incubazar
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoElement}
      </Link>
    )
  }

  return logoElement
}
