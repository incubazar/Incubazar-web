import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  chart?: React.ReactNode
  variant?: 'default' | 'gradient-blue' | 'gradient-green' | 'gradient-purple' | 'gradient-orange'
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, title, value, description, icon: Icon, trend, chart, variant = 'default', ...props }, ref) => {
    
    const getVariantClasses = () => {
      switch (variant) {
        case 'gradient-blue':
          return 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-graphite-800/10 before:to-graphite-700/5'
        case 'gradient-green':
          return 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-graphite-700/10 before:to-graphite-600/5'
        case 'gradient-purple':
          return 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-graphite-900/10 before:to-graphite-800/5'
        case 'gradient-orange':
          return 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-graphite-600/10 before:to-graphite-500/5'
        default:
          return ''
      }
    }

    const getIconColor = () => {
      switch (variant) {
        case 'gradient-blue':
          return 'text-graphite-800 bg-graphite-800/10 group-hover:bg-graphite-800/20'
        case 'gradient-green':
          return 'text-graphite-700 bg-graphite-700/10 group-hover:bg-graphite-700/20'
        case 'gradient-purple':
          return 'text-graphite-900 bg-graphite-900/10 group-hover:bg-graphite-900/20'
        case 'gradient-orange':
          return 'text-graphite-600 bg-graphite-600/10 group-hover:bg-graphite-600/20'
        default:
          return 'text-ink bg-ink/10 group-hover:bg-ink/20'
      }
    }

    return (
      <Card 
        ref={ref} 
        className={cn(
          "group card-premium hover-lift overflow-hidden relative backdrop-blur-sm transition-all duration-300",
          "hover:shadow-lg hover:shadow-primary/5",
          getVariantClasses(),
          className
        )} 
        {...props}
      >
        <div className="relative z-10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col space-y-3 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">{title}</span>
                {trend && (
                  <div className={cn(
                    "flex items-center gap-1 text-xs font-semibold px-2 py-1",
                    trend.isPositive 
                      ? "text-ink bg-graphite-100" 
                      : "text-graphite-700 bg-graphite-200"
                  )}>
                    {trend.isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>{trend.isPositive ? "+" : ""}{trend.value}%</span>
                  </div>
                )}
              </div>
              {Icon && (
                <div className={cn(
                  "p-3 rounded-xl w-fit transition-all duration-300",
                  getIconColor()
                )}>
                  <Icon className="h-6 w-6" />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline justify-between">
              <div className="text-4xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
                {value}
              </div>
            </div>
            {description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
            {chart && (
              <div className="h-[60px] mt-4">
                {chart}
              </div>
            )}
          </CardContent>
        </div>
        
        {/* Animated gradient border on hover */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm" />
        </div>
      </Card>
    )
  }
)
StatCard.displayName = "StatCard"

export { StatCard }


