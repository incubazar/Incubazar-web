import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Monochrome editorial variants with invert hover
        default: "bg-ink text-paper hover:bg-ink/90 active:bg-ink/80",
        destructive: "bg-graphite-900 text-paper hover:bg-graphite-800",
        outline: "border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
        secondary: "bg-graphite-100 text-ink hover:bg-graphite-200",
        ghost: "hover:bg-graphite-100 hover:text-ink",
        link: "text-ink underline-offset-4 hover:underline",
        // Inverted style
        inverted: "bg-paper text-ink border-2 border-paper hover:bg-ink hover:text-paper hover:border-ink",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-14 px-10 py-4 text-base",
        xl: "h-16 px-12 py-5 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
