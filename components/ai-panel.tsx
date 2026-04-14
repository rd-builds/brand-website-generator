"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/ui/glass-card"
import { Sparkles, Lightbulb, Zap, MessageSquare } from "lucide-react"

interface AIPanelProps {
  title?: string
  suggestions?: AISuggestion[]
  loading?: boolean
  className?: string
  children?: React.ReactNode
}

interface AISuggestion {
  id: string
  type: "insight" | "suggestion" | "warning" | "tip"
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

const iconMap = {
  insight: Sparkles,
  suggestion: Lightbulb,
  warning: Zap,
  tip: MessageSquare,
}

const colorMap = {
  insight: "text-primary",
  suggestion: "text-accent",
  warning: "text-yellow-400",
  tip: "text-emerald-400",
}

export function AIPanel({ 
  title = "AI Assistant", 
  suggestions = [], 
  loading = false, 
  className,
  children 
}: AIPanelProps) {
  return (
    <GlassCard variant="elevated" className={cn("h-full", className)}>
      <GlassCardHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <GlassCardTitle>{title}</GlassCardTitle>
        </div>
      </GlassCardHeader>
      
      <GlassCardContent className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-shimmer rounded-lg bg-muted/30 h-20" />
            ))}
          </div>
        ) : suggestions.length > 0 ? (
          <div className="space-y-3">
            {suggestions.map((suggestion) => {
              const Icon = iconMap[suggestion.type]
              return (
                <div
                  key={suggestion.id}
                  className="group rounded-lg border border-border/50 bg-muted/30 p-4 transition-smooth hover:border-primary/30 hover:bg-muted/50"
                >
                  <div className="flex gap-3">
                    <div className={cn("mt-0.5", colorMap[suggestion.type])}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <h4 className="text-sm font-medium text-foreground">
                        {suggestion.title}
                      </h4>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {suggestion.description}
                      </p>
                      {suggestion.action && (
                        <button
                          onClick={suggestion.action.onClick}
                          className="mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-smooth"
                        >
                          {suggestion.action.label}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : children ? (
          children
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Sparkles className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              AI suggestions will appear here as you fill in your information
            </p>
          </div>
        )}
      </GlassCardContent>
    </GlassCard>
  )
}

interface AIExplanationProps {
  icon?: React.ReactNode
  title: string
  description: string
  className?: string
}

export function AIExplanation({ icon, title, description, className }: AIExplanationProps) {
  return (
    <div className={cn("flex gap-3 rounded-lg border border-border/50 bg-muted/20 p-4", className)}>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
        {icon || <Lightbulb className="h-4 w-4" />}
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
