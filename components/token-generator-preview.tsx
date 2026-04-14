"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/ui/glass-card"

interface TokenPreviewProps {
  colors?: ColorToken[]
  typography?: TypographyToken[]
  spacing?: SpacingToken[]
  className?: string
  animated?: boolean
}

interface ColorToken {
  name: string
  value: string
  usage: string
}

interface TypographyToken {
  name: string
  size: string
  weight: string
  sample: string
}

interface SpacingToken {
  name: string
  value: string
}

export function TokenGeneratorPreview({ 
  colors, 
  typography, 
  spacing, 
  className,
  animated = false 
}: TokenPreviewProps) {
  const defaultColors: ColorToken[] = colors || [
    { name: "Primary", value: "#0099FF", usage: "Buttons, links, accents" },
    { name: "Secondary", value: "#00D9FF", usage: "Highlights, badges" },
    { name: "Background", value: "#0B0F1A", usage: "Page background" },
    { name: "Surface", value: "#141824", usage: "Cards, panels" },
    { name: "Text", value: "#F0F0F0", usage: "Body text, headings" },
  ]

  const defaultTypography: TypographyToken[] = typography || [
    { name: "Display", size: "48px", weight: "700", sample: "Hero Heading" },
    { name: "Heading", size: "32px", weight: "600", sample: "Section Title" },
    { name: "Subheading", size: "20px", weight: "500", sample: "Card Title" },
    { name: "Body", size: "16px", weight: "400", sample: "Paragraph text for reading" },
    { name: "Caption", size: "14px", weight: "400", sample: "Small helper text" },
  ]

  const defaultSpacing: SpacingToken[] = spacing || [
    { name: "xs", value: "4px" },
    { name: "sm", value: "8px" },
    { name: "md", value: "16px" },
    { name: "lg", value: "24px" },
    { name: "xl", value: "32px" },
    { name: "2xl", value: "48px" },
  ]

  return (
    <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
      {/* Colors */}
      <GlassCard variant="elevated" className={cn(animated && "animate-pulse-glow")}>
        <GlassCardHeader>
          <GlassCardTitle>Color Palette</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="space-y-3">
            {defaultColors.map((color, index) => (
              <div 
                key={color.name} 
                className={cn(
                  "flex items-center gap-3 transition-smooth",
                  animated && "animate-in fade-in slide-in-from-left-2"
                )}
                style={animated ? { animationDelay: `${index * 100}ms` } : undefined}
              >
                <div 
                  className="h-10 w-10 rounded-lg border border-border/50"
                  style={{ backgroundColor: color.value }}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{color.name}</p>
                  <p className="text-xs text-muted-foreground">{color.usage}</p>
                </div>
                <code className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                  {color.value}
                </code>
              </div>
            ))}
          </div>
        </GlassCardContent>
      </GlassCard>

      {/* Typography */}
      <GlassCard variant="elevated" className={cn(animated && "animate-pulse-glow")}>
        <GlassCardHeader>
          <GlassCardTitle>Typography Scale</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="space-y-4">
            {defaultTypography.map((type, index) => (
              <div 
                key={type.name}
                className={cn(
                  "border-b border-border/30 pb-3 last:border-0 last:pb-0 transition-smooth",
                  animated && "animate-in fade-in slide-in-from-left-2"
                )}
                style={animated ? { animationDelay: `${index * 100}ms` } : undefined}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{type.name}</span>
                  <span className="text-xs text-muted-foreground">{type.size} / {type.weight}</span>
                </div>
                <p 
                  className="text-foreground truncate"
                  style={{ fontSize: type.size, fontWeight: type.weight }}
                >
                  {type.sample}
                </p>
              </div>
            ))}
          </div>
        </GlassCardContent>
      </GlassCard>

      {/* Spacing */}
      <GlassCard variant="elevated" className={cn(animated && "animate-pulse-glow")}>
        <GlassCardHeader>
          <GlassCardTitle>Spacing System</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="space-y-3">
            {defaultSpacing.map((space, index) => (
              <div 
                key={space.name}
                className={cn(
                  "flex items-center gap-3 transition-smooth",
                  animated && "animate-in fade-in slide-in-from-left-2"
                )}
                style={animated ? { animationDelay: `${index * 100}ms` } : undefined}
              >
                <div className="flex h-8 w-16 items-center">
                  <div 
                    className="h-2 rounded-full bg-primary"
                    style={{ width: space.value }}
                  />
                </div>
                <span className="w-8 text-sm font-medium text-foreground">{space.name}</span>
                <code className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                  {space.value}
                </code>
              </div>
            ))}
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  )
}
