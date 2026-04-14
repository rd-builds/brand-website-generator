import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered" | "floating"
  glow?: boolean
  hover?: boolean
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", glow = false, hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl",
          variant === "default" && "glass-card",
          variant === "elevated" && "glass-card-elevated",
          variant === "floating" && "glass-card-floating",
          variant === "bordered" && "gradient-border",
          glow && "glow-primary-soft",
          hover && "hover-lift cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GlassCard.displayName = "GlassCard"

interface GlassCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const GlassCardHeader = React.forwardRef<HTMLDivElement, GlassCardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5 p-4 pb-3 sm:p-6 sm:pb-4", className)}
      {...props}
    />
  )
)
GlassCardHeader.displayName = "GlassCardHeader"

interface GlassCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const GlassCardTitle = React.forwardRef<HTMLHeadingElement, GlassCardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold text-foreground tracking-tight", className)}
      {...props}
    />
  )
)
GlassCardTitle.displayName = "GlassCardTitle"

interface GlassCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const GlassCardDescription = React.forwardRef<HTMLParagraphElement, GlassCardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
GlassCardDescription.displayName = "GlassCardDescription"

interface GlassCardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const GlassCardContent = React.forwardRef<HTMLDivElement, GlassCardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4 pt-0 sm:p-6 sm:pt-0", className)} {...props} />
  )
)
GlassCardContent.displayName = "GlassCardContent"

interface GlassCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const GlassCardFooter = React.forwardRef<HTMLDivElement, GlassCardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-4 pt-0 sm:p-6 sm:pt-0", className)}
      {...props}
    />
  )
)
GlassCardFooter.displayName = "GlassCardFooter"

export { 
  GlassCard, 
  GlassCardHeader, 
  GlassCardTitle, 
  GlassCardDescription, 
  GlassCardContent,
  GlassCardFooter
}
