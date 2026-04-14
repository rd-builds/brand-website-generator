import * as React from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  glow?: boolean
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "primary", size = "md", loading = false, glow = true, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "relative inline-flex items-center justify-center font-medium",
          "transition-all duration-300 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          
          // Variant styles
          variant === "primary" && [
            "glass-card text-foreground",
            "border border-white/20",
            "hover:border-white/40 hover:bg-white/[0.12]",
            "dark:border-white/10 dark:hover:border-white/20 dark:hover:bg-white/[0.06]",
            "hover:-translate-y-0.5",
            "active:translate-y-0",
          ],
          variant === "secondary" && [
            "bg-secondary text-secondary-foreground",
            "border border-border",
            "hover:bg-secondary/80 hover:border-primary/30",
            "hover:-translate-y-0.5",
          ],
          variant === "ghost" && [
            "bg-transparent text-foreground",
            "hover:bg-muted",
          ],
          variant === "outline" && [
            "bg-transparent text-primary",
            "border-2 border-primary/20",
            "hover:border-primary/40 hover:bg-primary/5",
            "hover:-translate-y-0.5",
          ],
          
          // Size styles
          size === "sm" && "h-9 px-4 text-sm rounded-lg gap-1.5",
          size === "md" && "h-11 px-6 text-sm rounded-xl gap-2",
          size === "lg" && "h-13 px-8 text-base rounded-2xl gap-2.5",
          
          className
        )}
        {...props}
      >
        {loading && <Spinner className="h-4 w-4" />}
        {children}
      </button>
    )
  }
)
GradientButton.displayName = "GradientButton"

export { GradientButton }
