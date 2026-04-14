"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent } from "@/components/ui/glass-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Check } from "lucide-react"

interface InputPanelProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function InputPanel({ title, description, children, className }: InputPanelProps) {
  return (
    <GlassCard variant="elevated" className={cn("h-full", className)}>
      <GlassCardHeader>
        <GlassCardTitle>{title}</GlassCardTitle>
        {description && <GlassCardDescription>{description}</GlassCardDescription>}
      </GlassCardHeader>
      <GlassCardContent className="space-y-6">
        {children}
      </GlassCardContent>
    </GlassCard>
  )
}

interface FormFieldProps {
  label: string
  description?: string
  error?: string
  children: React.ReactNode
  className?: string
}

export function FormField({ label, description, error, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {children}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function StyledInput({ className, ...props }: StyledInputProps) {
  return (
    <Input
      className={cn(
        "bg-input/50 border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-smooth inner-glow",
        className
      )}
      {...props}
    />
  )
}

interface StyledTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function StyledTextarea({ className, ...props }: StyledTextareaProps) {
  return (
    <Textarea
      className={cn(
        "bg-input/50 border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-smooth inner-glow min-h-24 resize-none",
        className
      )}
      {...props}
    />
  )
}

interface SelectableCardProps {
  selected?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

export function SelectableCard({ selected, onClick, children, className }: SelectableCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full rounded-lg border p-4 text-left transition-smooth",
        selected 
          ? "border-primary bg-primary/10 glow-primary" 
          : "border-border/50 bg-muted/30 hover:border-primary/30 hover:bg-muted/50",
        className
      )}
    >
      {selected && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
          <Check className="h-3 w-3 text-primary-foreground" />
        </div>
      )}
      {children}
    </button>
  )
}

interface SelectableChipProps {
  selected?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

export function SelectableChip({ selected, onClick, children, className }: SelectableChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-smooth",
        selected 
          ? "gradient-primary text-primary-foreground" 
          : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50",
        className
      )}
    >
      {children}
    </button>
  )
}
