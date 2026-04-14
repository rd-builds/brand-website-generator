"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/ui/glass-card"
import { AIExplanation } from "@/components/ai-panel"
import { GradientButton } from "@/components/ui/gradient-button"
import { ProgressStep } from "@/components/ui/progress-step"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { 
  Eye,
  EyeOff,
  Layout,
  Type,
  Palette,
  Target,
  Sparkles,
  Lightbulb,
  TrendingUp,
  Phone,
  MapPin,
  Clock,
  Star,
  Scissors,
  Heart,
  Rocket,
  RefreshCw
} from "lucide-react"

const steps = [
  { id: "brand", title: "Brand Info" },
  { id: "generate", title: "AI Generation" },
  { id: "preview", title: "Preview" },
  { id: "edit", title: "Edit & Launch" },
]

interface Section {
  id: string
  name: string
  enabled: boolean
  icon: typeof Layout
}

const initialSections: Section[] = [
  { id: "hero", name: "Hero Section", enabled: true, icon: Layout },
  { id: "services", name: "Services", enabled: true, icon: Sparkles },
  { id: "about", name: "About Us", enabled: true, icon: Heart },
  { id: "reviews", name: "Reviews", enabled: true, icon: Star },
  { id: "location", name: "Location & Hours", enabled: true, icon: MapPin },
  { id: "cta", name: "Call to Action", enabled: true, icon: Target },
]

const toneOptions = [
  { id: "professional", label: "Professional" },
  { id: "friendly", label: "Friendly" },
  { id: "premium", label: "Premium" },
]

const layoutOptions = [
  { id: "modern", label: "Modern" },
  { id: "classic", label: "Classic" },
  { id: "bold", label: "Bold" },
]

export default function HumanReviewPage() {
  const [sections, setSections] = React.useState(initialSections)
  const [selectedSection, setSelectedSection] = React.useState("hero")
  const [tone, setTone] = React.useState("friendly")
  const [layout, setLayout] = React.useState("modern")
  const [publishing, setPublishing] = React.useState(false)

  const toggleSection = (id: string) => {
    setSections(prev => 
      prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s)
    )
  }

  const handlePublish = async () => {
    setPublishing(true)
    // Simulate publishing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setPublishing(false)
  }

  const aiExplanations: Record<string, { title: string; description: string; icon: React.ReactNode }> = {
    hero: {
      title: "High-Impact Hero Design",
      description: "We placed the main CTA button above the fold with a compelling headline. This layout has shown 35% higher conversion rates for service businesses.",
      icon: <TrendingUp className="h-4 w-4" />
    },
    services: {
      title: "Service Cards Layout",
      description: "Card-based layout helps visitors quickly scan your offerings. Starting prices build trust by setting expectations early.",
      icon: <Layout className="h-4 w-4" />
    },
    reviews: {
      title: "Social Proof Placement",
      description: "Reviews placed after services reinforce credibility right when visitors are considering booking. Star ratings catch attention instantly.",
      icon: <Star className="h-4 w-4" />
    },
    cta: {
      title: "Conversion-Focused CTA",
      description: "The gradient button creates visual hierarchy. Phone calls convert 3x better than forms for local service businesses.",
      icon: <Target className="h-4 w-4" />
    },
    location: {
      title: "Local SEO Optimized",
      description: "Address and hours prominently displayed helps both visitors and search engines. This improves local search rankings.",
      icon: <MapPin className="h-4 w-4" />
    },
    about: {
      title: "Trust Building",
      description: "Personal story sections increase emotional connection with potential customers and differentiate you from competitors.",
      icon: <Heart className="h-4 w-4" />
    },
  }

  return (
    <DashboardLayout>
      {/* Progress indicator */}
      <div className="mb-8 flex justify-center">
        <ProgressStep steps={steps} currentStep={3} />
      </div>

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Review & Customize</h1>
          <p className="text-sm text-muted-foreground">Fine-tune your website before publishing</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Regenerate
          </Button>
          <GradientButton onClick={handlePublish} loading={publishing}>
            <Rocket className="h-4 w-4" />
            Publish Website
          </GradientButton>
        </div>
      </div>

      {/* Main 3-column layout */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Sections Panel (25%) */}
        <div className="lg:col-span-3">
          <GlassCard variant="elevated" className="sticky top-24">
            <GlassCardHeader>
              <GlassCardTitle className="text-base">Sections</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent className="space-y-1">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2.5 transition-smooth cursor-pointer",
                    selectedSection === section.id
                      ? "bg-primary/20 border border-primary/30"
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => setSelectedSection(section.id)}
                >
                  <div className="flex items-center gap-3">
                    <section.icon className={cn(
                      "h-4 w-4",
                      selectedSection === section.id ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "text-sm font-medium",
                      !section.enabled && "text-muted-foreground line-through"
                    )}>
                      {section.name}
                    </span>
                  </div>
                  <Switch
                    checked={section.enabled}
                    onCheckedChange={() => toggleSection(section.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              ))}
            </GlassCardContent>

            {/* Style controls */}
            <div className="border-t border-border/50 p-6 space-y-6">
              {/* Tone */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Tone</Label>
                <div className="flex flex-wrap gap-2">
                  {toneOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setTone(option.id)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs font-medium transition-smooth",
                        tone === option.id
                          ? "gradient-primary text-primary-foreground"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layout */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Layout Style</Label>
                <div className="flex flex-wrap gap-2">
                  {layoutOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setLayout(option.id)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs font-medium transition-smooth",
                        layout === option.id
                          ? "gradient-primary text-primary-foreground"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Center: Live Preview (50%) */}
        <div className="lg:col-span-6">
          <GlassCard variant="elevated" className="overflow-hidden p-0">
            <div className="border-b border-border/50 px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-medium">Live Preview</span>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <div className="h-3 w-3 rounded-full bg-green-500/70" />
              </div>
            </div>
            <div className="bg-[#0B0F1A] p-4 max-h-[600px] overflow-y-auto">
              <MiniPreview 
                sections={sections} 
                selectedSection={selectedSection}
              />
            </div>
          </GlassCard>
        </div>

        {/* Right: AI Explanations (25%) */}
        <div className="lg:col-span-3">
          <GlassCard variant="elevated" className="sticky top-24">
            <GlassCardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                  <Lightbulb className="h-4 w-4 text-primary-foreground" />
                </div>
                <GlassCardTitle className="text-base">AI Insights</GlassCardTitle>
              </div>
            </GlassCardHeader>
            <GlassCardContent className="space-y-4">
              {aiExplanations[selectedSection] && (
                <AIExplanation
                  icon={aiExplanations[selectedSection].icon}
                  title={aiExplanations[selectedSection].title}
                  description={aiExplanations[selectedSection].description}
                />
              )}

              <div className="pt-4 border-t border-border/50">
                <h4 className="text-sm font-medium text-foreground mb-3">Quick Tips</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <span>Keep your main CTA visible at all times</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <span>Reviews build trust - keep them enabled</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <span>Location info helps local SEO rankings</span>
                  </li>
                </ul>
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  )
}

function MiniPreview({ 
  sections, 
  selectedSection 
}: { 
  sections: Section[]
  selectedSection: string 
}) {
  const enabledSections = sections.filter(s => s.enabled)

  return (
    <div className="rounded-lg overflow-hidden text-white text-sm">
      {/* Nav */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-gradient-to-br from-[#0099FF] to-[#00D9FF]" />
          <span className="font-medium text-xs">{"Bella's Studio"}</span>
        </div>
        <button className="rounded bg-gradient-to-r from-[#0099FF] to-[#00D9FF] px-3 py-1 text-xs">
          Book Now
        </button>
      </div>

      {/* Hero */}
      {enabledSections.find(s => s.id === "hero") && (
        <div className={cn(
          "p-6 border-b border-white/10 transition-all",
          selectedSection === "hero" && "ring-2 ring-primary ring-inset"
        )}>
          <div className="text-xs text-white/50 mb-2">Premium Hair Studio</div>
          <h2 className="text-lg font-bold mb-2">Your Hair, Your Style</h2>
          <p className="text-xs text-white/70 mb-4">Experience luxury hair care with our expert stylists.</p>
          <div className="flex gap-2">
            <button className="rounded bg-gradient-to-r from-[#0099FF] to-[#00D9FF] px-3 py-1.5 text-xs flex items-center gap-1">
              <Phone className="h-3 w-3" /> Call Now
            </button>
            <button className="rounded border border-white/20 bg-white/5 px-3 py-1.5 text-xs">
              Services
            </button>
          </div>
        </div>
      )}

      {/* Services */}
      {enabledSections.find(s => s.id === "services") && (
        <div className={cn(
          "p-6 border-b border-white/10 transition-all",
          selectedSection === "services" && "ring-2 ring-primary ring-inset"
        )}>
          <h3 className="font-semibold mb-4">Our Services</h3>
          <div className="grid grid-cols-3 gap-2">
            {["Haircuts", "Color", "Styling"].map((s) => (
              <div key={s} className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
                <Scissors className="h-4 w-4 mx-auto mb-2 text-[#00D9FF]" />
                <div className="text-xs">{s}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* About */}
      {enabledSections.find(s => s.id === "about") && (
        <div className={cn(
          "p-6 border-b border-white/10 transition-all",
          selectedSection === "about" && "ring-2 ring-primary ring-inset"
        )}>
          <h3 className="font-semibold mb-2">About Us</h3>
          <p className="text-xs text-white/70">{"With over 10 years of experience, we're dedicated to making you look and feel your best."}</p>
        </div>
      )}

      {/* Reviews */}
      {enabledSections.find(s => s.id === "reviews") && (
        <div className={cn(
          "p-6 border-b border-white/10 bg-white/5 transition-all",
          selectedSection === "reviews" && "ring-2 ring-primary ring-inset"
        )}>
          <h3 className="font-semibold mb-4">Reviews</h3>
          <div className="rounded-lg border border-white/10 bg-[#0B0F1A] p-3">
            <div className="flex gap-0.5 mb-2">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-xs text-white/70">{`"Best haircut I've ever had!"`}</p>
            <p className="text-xs mt-2">- Sarah M.</p>
          </div>
        </div>
      )}

      {/* Location */}
      {enabledSections.find(s => s.id === "location") && (
        <div className={cn(
          "p-6 border-b border-white/10 transition-all",
          selectedSection === "location" && "ring-2 ring-primary ring-inset"
        )}>
          <h3 className="font-semibold mb-3">Visit Us</h3>
          <div className="space-y-2 text-xs text-white/70">
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              <span>123 Main St, Austin, TX</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>Mon-Sat: 9am - 7pm</span>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      {enabledSections.find(s => s.id === "cta") && (
        <div className={cn(
          "p-6 text-center transition-all",
          selectedSection === "cta" && "ring-2 ring-primary ring-inset"
        )}>
          <h3 className="font-semibold mb-2">Ready to Transform?</h3>
          <button className="rounded bg-gradient-to-r from-[#0099FF] to-[#00D9FF] px-4 py-2 text-xs">
            Book Your Appointment
          </button>
        </div>
      )}
    </div>
  )
}
