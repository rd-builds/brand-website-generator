"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { ProgressStep } from "@/components/ui/progress-step"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Edit3, 
  ExternalLink,
  Star,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  Scissors,
  Sparkles,
  Heart
} from "lucide-react"

const steps = [
  { id: "brand", title: "Brand Info" },
  { id: "generate", title: "AI Generation" },
  { id: "preview", title: "Preview" },
  { id: "edit", title: "Edit & Launch" },
]

type ViewportSize = "desktop" | "tablet" | "mobile"

const viewportSizes: { id: ViewportSize; icon: typeof Monitor; width: string }[] = [
  { id: "desktop", icon: Monitor, width: "100%" },
  { id: "tablet", icon: Tablet, width: "768px" },
  { id: "mobile", icon: Smartphone, width: "375px" },
]

export default function WebsitePreviewPage() {
  const router = useRouter()
  const [viewport, setViewport] = React.useState<ViewportSize>("desktop")

  const handleEditReview = () => {
    router.push("/dashboard/human-review")
  }

  return (
    <DashboardLayout>
      {/* Progress indicator */}
      <div className="mb-8 flex justify-center">
        <ProgressStep steps={steps} currentStep={2} />
      </div>

      {/* Header with viewport controls */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Website Preview</h1>
          <p className="text-sm text-muted-foreground">Review your generated website before editing</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Viewport toggles */}
          <div className="flex items-center rounded-lg border border-border bg-muted/30 p-1">
            {viewportSizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setViewport(size.id)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md transition-smooth",
                  viewport === size.id 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <size.icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          {/* Actions */}
          <GradientButton onClick={handleEditReview}>
            <Edit3 className="h-4 w-4" />
            Edit & Review
          </GradientButton>
        </div>
      </div>

      {/* Preview container */}
      <GlassCard variant="elevated" className="overflow-hidden p-0">
        <div className="flex justify-center bg-muted/20 p-4 lg:p-8">
          <div 
            className={cn(
              "transition-all duration-300 ease-in-out overflow-hidden rounded-lg shadow-2xl",
              viewport === "desktop" && "w-full max-w-6xl",
              viewport === "tablet" && "w-[768px]",
              viewport === "mobile" && "w-[375px]"
            )}
          >
            {/* Mock Website Preview */}
            <MockWebsite viewport={viewport} />
          </div>
        </div>
      </GlassCard>
    </DashboardLayout>
  )
}

function MockWebsite({ viewport }: { viewport: ViewportSize }) {
  const isMobile = viewport === "mobile"
  const isTablet = viewport === "tablet"

  return (
    <div className="bg-[#0B0F1A] text-white overflow-y-auto max-h-[600px] lg:max-h-[700px]">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-white/10 px-4 py-4 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0099FF] to-[#00D9FF]">
            <Scissors className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold">{"Bella's Studio"}</span>
        </div>
        {!isMobile && (
          <div className="flex items-center gap-6 text-sm text-white/70">
            <a href="#" className="hover:text-white transition-colors">Services</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Reviews</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        )}
        <button className="rounded-lg bg-gradient-to-r from-[#0099FF] to-[#00D9FF] px-4 py-2 text-sm font-medium">
          Book Now
        </button>
      </nav>

      {/* Hero Section */}
      <section className={cn(
        "relative overflow-hidden px-4 py-12 lg:px-8 lg:py-20",
        isMobile && "py-8"
      )}>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0099FF]/10 to-transparent" />
        
        <div className={cn(
          "relative mx-auto max-w-4xl text-center",
          isMobile && "text-left"
        )}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 text-[#00D9FF]" />
            <span className="text-white/70">Premium Hair Studio in Austin</span>
          </div>
          
          <h1 className={cn(
            "font-bold leading-tight",
            isMobile ? "text-3xl" : isTablet ? "text-4xl" : "text-5xl"
          )}>
            Your Hair, <span className="bg-gradient-to-r from-[#0099FF] to-[#00D9FF] bg-clip-text text-transparent">Your Style</span>
          </h1>
          
          <p className={cn(
            "mt-4 text-white/70",
            isMobile ? "text-sm" : "text-lg"
          )}>
            Experience luxury hair care with our expert stylists. 
            From cuts to color, {"we'll"} make you look and feel amazing.
          </p>
          
          <div className={cn(
            "mt-8 flex gap-4",
            isMobile ? "flex-col" : "justify-center"
          )}>
            <button className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#0099FF] to-[#00D9FF] px-6 py-3 font-medium transition-all hover:opacity-90">
              <Phone className="h-5 w-5" />
              Call Now
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-medium backdrop-blur-sm transition-all hover:bg-white/10">
              View Services
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Trust indicators */}
          <div className={cn(
            "mt-8 flex items-center gap-6 text-sm text-white/50",
            isMobile ? "flex-col items-start gap-3" : "justify-center"
          )}>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Downtown Austin</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Open 9am - 7pm</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="border-t border-white/10 px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className={cn(
            "mb-8 font-semibold text-center",
            isMobile ? "text-xl" : "text-2xl"
          )}>Our Services</h2>
          
          <div className={cn(
            "grid gap-4",
            isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-3"
          )}>
            {[
              { name: "Haircuts", price: "$45+", icon: Scissors },
              { name: "Color", price: "$85+", icon: Sparkles },
              { name: "Styling", price: "$35+", icon: Heart },
            ].map((service) => (
              <div 
                key={service.name}
                className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-[#0099FF]/30 hover:bg-white/10"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#0099FF]/20 to-[#00D9FF]/20">
                  <service.icon className="h-6 w-6 text-[#00D9FF]" />
                </div>
                <h3 className="font-medium">{service.name}</h3>
                <p className="mt-1 text-sm text-white/50">Starting at {service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="border-t border-white/10 bg-white/5 px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className={cn(
            "mb-8 font-semibold text-center",
            isMobile ? "text-xl" : "text-2xl"
          )}>What Our Clients Say</h2>
          
          <div className={cn(
            "grid gap-4",
            isMobile ? "grid-cols-1" : "grid-cols-2"
          )}>
            {[
              { name: "Sarah M.", text: "Best haircut I've ever had! The team is so talented." },
              { name: "Jennifer L.", text: "Love my new color. Will definitely be coming back!" },
            ].map((review) => (
              <div 
                key={review.name}
                className="rounded-xl border border-white/10 bg-[#0B0F1A] p-6"
              >
                <div className="mb-3 flex gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-white/70">{`"${review.text}"`}</p>
                <p className="mt-3 text-sm font-medium">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10 px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className={cn(
            "font-semibold",
            isMobile ? "text-xl" : "text-2xl"
          )}>Ready to Transform Your Look?</h2>
          <p className="mt-2 text-white/70">Book your appointment today and let us work our magic.</p>
          <button className="mt-6 rounded-lg bg-gradient-to-r from-[#0099FF] to-[#00D9FF] px-8 py-3 font-medium">
            Book Your Appointment
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-4xl flex flex-col items-center gap-4 text-center text-sm text-white/50">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>123 Main Street, Downtown Austin, TX</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>(512) 555-0123</span>
          </div>
          <p className="mt-4">{"© 2026 Bella's Hair Studio. All rights reserved."}</p>
        </div>
      </footer>
    </div>
  )
}
