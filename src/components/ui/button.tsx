import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "glass";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] shadow-lg shadow-primary/25",
      outline: "border border-border bg-transparent hover:bg-muted text-foreground",
      ghost: "hover:bg-muted text-foreground",
      link: "text-primary underline-offset-4 hover:underline",
      glass: "glass text-foreground hover:bg-white/10 transition-colors",
    }
    
    const sizes = {
      default: "h-11 px-6 py-2 text-sm",
      sm: "h-9 rounded-md px-3 text-xs",
      lg: "h-14 rounded-xl px-8 text-base",
      icon: "h-10 w-10",
    }

    const buttonClassName = cn(
      "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap flex-shrink-0 cursor-pointer",
      variants[variant],
      sizes[size],
      className
    )

    if (asChild) {
      const child = React.Children.only(children)

      if (!React.isValidElement<Record<string, unknown>>(child)) {
        return null
      }

      return React.cloneElement(child, {
        ...props,
        className: cn(buttonClassName, child.props.className as string | undefined),
        ref,
      })
    }

    return (
      <button
        className={buttonClassName}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
