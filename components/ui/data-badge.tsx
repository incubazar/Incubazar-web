import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const dataBadgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/10 text-primary hover:bg-primary/20",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        success:
          "border-transparent bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20",
        warning:
          "border-transparent bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20",
        danger:
          "border-transparent bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20",
        outline: "text-foreground border border-border",
        info: "border-transparent bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface DataBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataBadgeVariants> {
  icon?: React.ReactNode
  pulse?: boolean
}

function DataBadge({ className, variant, icon, pulse, children, ...props }: DataBadgeProps) {
  return (
    <div className={cn(dataBadgeVariants({ variant }), className)} {...props}>
      {pulse && (
        <span className="relative flex h-2 w-2 mr-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </div>
  )
}

export { DataBadge, dataBadgeVariants }



