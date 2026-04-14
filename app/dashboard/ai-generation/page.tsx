"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/ui/glass-card"
import { TokenGeneratorPreview } from "@/components/token-generator-preview"
import { ProgressStep } from "@/components/ui/progress-step"
import { GradientButton } from "@/components/ui/gradient-button"
import { cn } from "@/lib/utils"
import { 
  Palette, 
  Layers, 
  Globe, 
  Check, 
  ArrowRight,
  Sparkles,
  Type,
  Layout
} from "lucide-react"

const steps = [
  { id: "brand", title: "Brand Info" },
  { id: "generate", title: "AI Generation" },
  { id: "preview", title: "Preview" },
  { id: "edit", title: "Edit & Launch" },
]

const generationSteps = [
  { 
    id: "tokens", 
    title: "Generating Design Tokens", 
    description: "Creating your color palette, typography, and spacing",
    icon: Palette,
    details: ["Color palette", "Typography scale", "Spacing system"]
  },
  { 
    id: "components", 
    title: "Building Components", 
    description: "Assembling buttons, cards, and UI elements",
    icon: Layers,
    details: ["Buttons & CTAs", "Cards & sections", "Navigation"]
  },
  { 
    id: "website", 
    title: "Assembling Website", 
    description: "Putting together your complete website",
    icon: Globe,
    details: ["Hero section", "Services", "Contact & Reviews"]
  },
]

export default function AIGenerationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = React.useState(0)
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([])
  const [showTokens, setShowTokens] = React.useState(false)
  const [isComplete, setIsComplete] = React.useState(false)

  // Simulate generation process
  React.useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    // Step 1: Tokens
    timers.push(setTimeout(() => {
      setShowTokens(true)
    }, 800))

    timers.push(setTimeout(() => {
      setCompletedSteps(prev => [...prev, 0])
      setCurrentStep(1)
    }, 2500))

    // Step 2: Components
    timers.push(setTimeout(() => {
      setCompletedSteps(prev => [...prev, 1])
      setCurrentStep(2)
    }, 4500))

    // Step 3: Website
    timers.push(setTimeout(() => {
      setCompletedSteps(prev => [...prev, 2])
      setIsComplete(true)
    }, 6500))

    return () => timers.forEach(clearTimeout)
  }, [])

  const handleViewPreview = () => {
    router.push("/dashboard/website-preview")
  }

  return (
    <DashboardLayout>
      {/* Progress indicator */}
      <div className="mb-8 flex justify-center">
        <ProgressStep steps={steps} currentStep={1} />
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground text-balance">
            {isComplete ? "Your Website is Ready!" : "Building Your Website..."}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {isComplete 
              ? "We&apos;ve created a beautiful, conversion-focused website for your business" 
              : "Our AI is creating your custom website based on your brand"}
          </p>
        </div>

        {/* Generation Steps */}
        <div className="grid gap-4 md:grid-cols-3">
          {generationSteps.map((step, index) => {
            const isCompleted = completedSteps.includes(index)
            const isCurrent = currentStep === index && !isCompleted
            const isUpcoming = index > currentStep

            return (
              <GlassCard
                key={step.id}
                variant={isCurrent ? "elevated" : "default"}
                glow={isCurrent}
                className={cn(
                  "transition-smooth",
                  isCompleted && "border-primary/30",
                  isUpcoming && "opacity-50"
                )}
              >
                <GlassCardContent className="p-6">
                  {/* Icon and status */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl transition-smooth",
                      isCompleted && "gradient-primary",
                      isCurrent && "bg-primary/20 animate-pulse-glow",
                      isUpcoming && "bg-muted"
                    )}>
                      {isCompleted ? (
                        <Check className="h-6 w-6 text-primary-foreground" />
                      ) : (
                        <step.icon className={cn(
                          "h-6 w-6",
                          isCurrent ? "text-primary" : "text-muted-foreground"
                        )} />
                      )}
                    </div>
                    {isCurrent && (
                      <span className="text-xs font-medium text-primary animate-pulse">
                        In Progress...
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-xs font-medium text-primary">
                        Complete
                      </span>
                    )}
                  </div>

                  {/* Title and description */}
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>

                  {/* Details */}
                  <ul className="mt-4 space-y-2">
                    {step.details.map((detail, i) => (
                      <li 
                        key={i} 
                        className={cn(
                          "flex items-center gap-2 text-sm transition-smooth",
                          (isCompleted || (isCurrent && i <= Math.floor((Date.now() / 500) % 3)))
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        <div className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          (isCompleted || isCurrent) ? "bg-primary" : "bg-muted-foreground/50"
                        )} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </GlassCardContent>
              </GlassCard>
            )
          })}
        </div>

        {/* Connecting arrows */}
        <div className="hidden md:flex items-center justify-center gap-4 -mt-4 relative z-10">
          <div className="flex-1" />
          <ArrowRight className={cn(
            "h-5 w-5 transition-smooth",
            completedSteps.includes(0) ? "text-primary" : "text-muted-foreground/30"
          )} />
          <div className="flex-1" />
          <ArrowRight className={cn(
            "h-5 w-5 transition-smooth",
            completedSteps.includes(1) ? "text-primary" : "text-muted-foreground/30"
          )} />
          <div className="flex-1" />
        </div>

        {/* Token Preview */}
        {showTokens && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Generated Design Tokens</h2>
            </div>
            <TokenGeneratorPreview animated={!isComplete} />
          </div>
        )}

        {/* Action Button */}
        {isComplete && (
          <div className="flex justify-center pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <GradientButton size="lg" onClick={handleViewPreview}>
              View Your Website
              <ArrowRight className="h-5 w-5" />
            </GradientButton>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
