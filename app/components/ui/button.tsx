import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-sm hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5",
        accent:
          "bg-accent text-white shadow-sm hover:bg-accent-600 hover:shadow-lg hover:-translate-y-0.5",
        outline:
          "border border-primary/25 bg-transparent text-primary hover:border-primary hover:bg-primary hover:text-white",
        secondary:
          "bg-primary-50 text-primary hover:bg-primary-100",
        ghost: "text-primary hover:bg-primary-50",
        light:
          "bg-white text-primary shadow-sm hover:bg-cream hover:shadow-lg hover:-translate-y-0.5",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
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
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
