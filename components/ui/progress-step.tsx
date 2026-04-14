import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: string
  title: string
  description?: string
}

interface ProgressStepProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function ProgressStep({ steps, currentStep, className }: ProgressStepProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep
        const isUpcoming = index > currentStep

        return (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-3">
              {/* Step indicator */}
              <div
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-smooth",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  isCurrent && "border-primary bg-primary/20 text-primary animate-pulse-glow",
                  isUpcoming && "border-border bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>

              {/* Step text */}
              <div className="hidden sm:block">
                <p
                  className={cn(
                    "text-sm font-medium transition-smooth",
                    isCompleted && "text-foreground",
                    isCurrent && "text-foreground",
                    isUpcoming && "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                )}
              </div>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-8 sm:w-16 transition-smooth",
                  index < currentStep ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

interface ProgressDotsProps {
  total: number
  current: number
  className?: string
}

export function ProgressDots({ total, current, className }: ProgressDotsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-2 rounded-full transition-smooth",
            index === current
              ? "w-8 bg-primary"
              : index < current
              ? "w-2 bg-primary/60"
              : "w-2 bg-border"
          )}
        />
      ))}
    </div>
  )
}
