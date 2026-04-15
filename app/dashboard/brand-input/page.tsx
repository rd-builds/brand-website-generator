"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { InputPanel, FormField, StyledInput, StyledTextarea, SelectableCard, SelectableChip } from "@/components/input-panel"
import { AIPanel } from "@/components/ai-panel"
import { GradientButton } from "@/components/ui/gradient-button"
import { ProgressStep } from "@/components/ui/progress-step"
import { GENERATED_SITE_STORAGE_KEY } from "@/lib/generated-site-storage"
import { 
  Phone, 
  Calendar, 
  MessageCircle, 
  MapPin,
  Briefcase,
  Sparkles,
  Store,
  Scissors,
  Utensils,
  Wrench,
  Heart,
  Building2,
  Car,
  Dumbbell
} from "lucide-react"

const steps = [
  { id: "brand", title: "Brand Info" },
  { id: "generate", title: "AI Generation" },
  { id: "preview", title: "Preview" },
  { id: "edit", title: "Edit & Launch" },
]

const businessTypes = [
  { id: "salon", label: "Salon & Spa", icon: Scissors },
  { id: "restaurant", label: "Restaurant", icon: Utensils },
  { id: "contractor", label: "Contractor", icon: Wrench },
  { id: "healthcare", label: "Healthcare", icon: Heart },
  { id: "retail", label: "Retail Store", icon: Store },
  { id: "professional", label: "Professional", icon: Building2 },
  { id: "automotive", label: "Automotive", icon: Car },
  { id: "fitness", label: "Fitness", icon: Dumbbell },
]

const brandPersonalities = [
  { id: "professional", label: "Professional" },
  { id: "friendly", label: "Friendly & Warm" },
  { id: "premium", label: "Premium & Luxury" },
  { id: "modern", label: "Modern & Minimal" },
  { id: "playful", label: "Playful & Fun" },
  { id: "trustworthy", label: "Trustworthy" },
]

const conversionGoals = [
  { id: "call", label: "Phone Calls", icon: Phone, description: "Get customers to call you directly" },
  { id: "book", label: "Online Booking", icon: Calendar, description: "Let customers book appointments" },
  { id: "whatsapp", label: "WhatsApp Chat", icon: MessageCircle, description: "Start conversations on WhatsApp" },
  { id: "visit", label: "Store Visits", icon: MapPin, description: "Drive foot traffic to your location" },
]

export default function BrandInputPage() {
  const [loading, setLoading] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  
  // Form state
  const [businessName, setBusinessName] = React.useState("")
  const [businessType, setBusinessType] = React.useState("")
  const [services, setServices] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [personalities, setPersonalities] = React.useState<string[]>([])
  const [conversionGoal, setConversionGoal] = React.useState("")

  const togglePersonality = (id: string) => {
    setPersonalities(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : prev.length < 3 ? [...prev, id] : prev
    )
  }

  // Dynamic AI suggestions based on form input
  const aiSuggestions = React.useMemo(() => {
    const suggestions = []
    
    if (businessType && !businessName) {
      suggestions.push({
        id: "1",
        type: "suggestion" as const,
        title: "Add your business name",
        description: `Great choice! Now add your ${businessTypes.find(b => b.id === businessType)?.label.toLowerCase()} business name to help us create your brand identity.`
      })
    }
    
    if (businessName && businessType) {
      suggestions.push({
        id: "2",
        type: "insight" as const,
        title: "Brand Identity",
        description: `"${businessName}" sounds ${personalities.includes("premium") ? "premium and upscale" : personalities.includes("friendly") ? "warm and approachable" : "professional"}. We&apos;ll design your website to match this vibe.`
      })
    }
    
    if (businessType === "salon" || businessType === "healthcare") {
      suggestions.push({
        id: "3",
        type: "tip" as const,
        title: "Online Booking Recommended",
        description: "Businesses like yours see 40% more conversions with online booking integration."
      })
    }
    
    if (location) {
      suggestions.push({
        id: "4",
        type: "insight" as const,
        title: "Local SEO Ready",
        description: `We&apos;ll optimize your site for "${location}" searches to help locals find you.`
      })
    }

    if (conversionGoal) {
      const goal = conversionGoals.find(g => g.id === conversionGoal)
      suggestions.push({
        id: "5",
        type: "suggestion" as const,
        title: "Conversion Strategy",
        description: `Your site will prominently feature ${goal?.label.toLowerCase()} CTAs above the fold and throughout key sections.`
      })
    }
    
    return suggestions
  }, [businessName, businessType, services, location, personalities, conversionGoal])

  const handleGenerate = async () => {
    console.log("clicked")
    setSubmitError(null)
    setLoading(true)
    try {
      const personality = personalities
      const goal = conversionGoal
      const requestPayload = {
        services,
        location,
        personality,
        goal,
      }
      console.log("formData", requestPayload)

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload),
      })

      console.log("generate response status", res.status)
      const data = await res.json()
      console.log(data)

      if (!res.ok || data?.ok === false) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : `Generate failed (${res.status})`
        )
      }

      const storedPayload = {
        ...data,
        title: businessName.trim() || data.title,
        businessName: businessName.trim() || undefined,
        goalId: conversionGoal,
      }
      localStorage.setItem("siteData", JSON.stringify(storedPayload))
      localStorage.setItem(GENERATED_SITE_STORAGE_KEY, JSON.stringify(storedPayload))
      window.location.href = "/preview"
    } catch (err) {
      console.error("generate error", err)
      setSubmitError(err instanceof Error ? err.message : "Could not generate your website.")
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = businessName && businessType && services && location && personalities.length > 0 && conversionGoal

  return (
    <DashboardLayout>
      {/* Progress indicator */}
      <div className="mb-6 flex justify-center sm:mb-8">
        <ProgressStep steps={steps} currentStep={0} />
      </div>

      {/* Main content */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          {/* Left: Input Panel (60%) */}
          <div className="lg:col-span-3">
            <InputPanel 
              title="Tell us about your business"
              description="Help our AI understand your brand to create the perfect website"
            >
              {/* Business Type */}
              <FormField label="What type of business do you run?">
                <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-4">
                  {businessTypes.map((type) => (
                    <SelectableCard
                      key={type.id}
                      selected={businessType === type.id}
                      onClick={() => setBusinessType(type.id)}
                    >
                      <div className="flex flex-col items-center gap-2 py-1.5 sm:py-2">
                        <type.icon className="h-6 w-6 text-primary" />
                        <span className="text-center text-xs font-medium leading-5">{type.label}</span>
                      </div>
                    </SelectableCard>
                  ))}
                </div>
              </FormField>

              {/* Business Name */}
              <FormField 
                label="Business Name" 
                description="This will be used for your logo and branding"
              >
                <StyledInput
                  placeholder="e.g., Bella's Hair Studio"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </FormField>

              {/* Services */}
              <FormField 
                label="What services do you offer?" 
                description="List your main services - we'll create sections for each"
              >
                <StyledTextarea
                  placeholder="e.g., Haircuts, Color treatments, Styling, Bridal packages..."
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                />
              </FormField>

              {/* Location */}
              <FormField 
                label="Service Area / Location" 
                description="Where do you serve customers?"
              >
                <StyledInput
                  placeholder="e.g., Downtown Austin, TX"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </FormField>

              {/* Brand Personality */}
              <FormField 
                label="Brand Personality" 
                description="Select up to 3 traits that describe your brand"
              >
                <div className="flex flex-wrap gap-2">
                  {brandPersonalities.map((personality) => (
                    <SelectableChip
                      key={personality.id}
                      selected={personalities.includes(personality.id)}
                      onClick={() => togglePersonality(personality.id)}
                      className="w-full justify-center sm:w-auto"
                    >
                      {personality.label}
                    </SelectableChip>
                  ))}
                </div>
              </FormField>

              {/* Conversion Goal */}
              <FormField 
                label="Primary Conversion Goal" 
                description="What action do you want visitors to take?"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {conversionGoals.map((goal) => (
                    <SelectableCard
                      key={goal.id}
                      selected={conversionGoal === goal.id}
                      onClick={() => setConversionGoal(goal.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                          <goal.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{goal.label}</p>
                          <p className="text-xs text-muted-foreground">{goal.description}</p>
                        </div>
                      </div>
                    </SelectableCard>
                  ))}
                </div>
              </FormField>

              {/* Submit */}
              <div className="space-y-3 pt-4">
                <GradientButton 
                  type="button" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  loading={loading}
                  disabled={!isFormValid || loading}
                  onClick={handleGenerate}
                >
                  {!loading && <Sparkles className="h-5 w-5" />}
                  {loading ? "Generating..." : "Generate My Website"}
                </GradientButton>
                {submitError && (
                  <p className="text-sm text-destructive" role="alert">
                    {submitError}
                  </p>
                )}
              </div>
            </InputPanel>
          </div>

          {/* Right: AI Panel (40%) */}
          <div className="lg:col-span-2">
            <AIPanel 
              title="AI Assistant"
              suggestions={aiSuggestions}
              loading={loading}
            />
          </div>
        </div>
      </form>
    </DashboardLayout>
  )
}
