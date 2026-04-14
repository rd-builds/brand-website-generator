"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Sparkles, 
  ChevronDown,
  Globe,
  Star,
  MapPin,
  Phone,
  Clock,
  Users,
  TrendingUp,
  CheckCircle2
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ContactFormFooter } from "@/components/contact-form-footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Background Gradient */}
      <div className="fixed inset-0 pointer-events-none dark:hidden">
        {/* Top blue gradient glow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[600px]"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59, 130, 246, 0.12) 0%, transparent 60%),
              radial-gradient(ellipse 80% 40% at 50% 10%, rgba(147, 197, 253, 0.15) 0%, transparent 50%)
            `
          }}
        />
        {/* Subtle flowing curves */}
        <svg 
          className="absolute top-0 left-0 w-full h-[500px] opacity-30"
          viewBox="0 0 1440 500"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="50%" stopColor="rgba(147, 197, 253, 0.15)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
            </linearGradient>
          </defs>
          <path
            d="M0,150 Q360,80 720,150 T1440,150 V0 H0 Z"
            fill="url(#wave-gradient)"
          />
          <path
            d="M0,200 Q360,130 720,200 T1440,200 V0 H0 Z"
            fill="rgba(191, 219, 254, 0.08)"
          />
        </svg>
      </div>

      <div className="fixed inset-0 pointer-events-none hidden dark:block" aria-hidden>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[600px]"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37, 99, 235, 0.22) 0%, transparent 60%),
              radial-gradient(ellipse 80% 40% at 50% 10%, rgba(30, 58, 138, 0.25) 0%, transparent 52%)
            `
          }}
        />
        <svg
          className="absolute top-0 left-0 w-full h-[500px] opacity-35"
          viewBox="0 0 1440 500"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave-gradient-dark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(37, 99, 235, 0.2)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.18)" />
              <stop offset="100%" stopColor="rgba(37, 99, 235, 0.2)" />
            </linearGradient>
          </defs>
          <path
            d="M0,150 Q360,80 720,150 T1440,150 V0 H0 Z"
            fill="url(#wave-gradient-dark)"
          />
          <path
            d="M0,200 Q360,130 720,200 T1440,200 V0 H0 Z"
            fill="rgba(30, 58, 138, 0.12)"
          />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-foreground">Clear</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Products
              <ChevronDown className="h-4 w-4" />
            </button>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              About
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Customers
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Pricing
            </Link>
          </div>

          {/* Right Side CTAs */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Link 
              href="#" 
              className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
            >
              Sign in
            </Link>
            <Link href="/dashboard/brand-input" className="w-full sm:w-auto">
              <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-premium hover:bg-foreground/90 hover:shadow-lg dark:hover:shadow-primary/20">
                Get started
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="mx-auto max-w-4xl px-4 pt-14 pb-14 text-center sm:px-6 sm:pt-20 sm:pb-16">
          {/* Icon Badge */}
          <div className="mb-8 inline-flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20">
              <Globe className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Headline with Radial Glow */}
          <div className="relative radial-glow mb-6">
            <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
              Build a website that understands your business
            </h1>
          </div>

          {/* Subtext */}
          <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground text-pretty sm:text-xl sm:leading-relaxed">
            From your services to your story, our AI creates a website that reflects how your business actually works.
          </p>

          {/* CTA Button */}
          <div className="mt-10">
            <Link href="/dashboard/brand-input" className="block sm:inline-block">
              <button className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/20 glass-card px-6 py-4 text-base font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.12] dark:border-white/10 dark:hover:border-white/20 dark:hover:bg-white/[0.06] sm:w-auto sm:px-8">
                <Sparkles className="h-5 w-5" />
                Generate My Website
                <svg 
                  className="h-5 w-5 transition-transform group-hover:translate-x-0.5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground sm:flex-row sm:gap-6">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Ready in 2 minutes
            </span>
          </div>
        </div>

        {/* Floating Glass Card Preview */}
        <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 sm:pb-32">
          <div className="glass-card-floating rounded-2xl p-1 animate-float">
            {/* Browser Chrome */}
            <div className="rounded-t-xl bg-white/50 border-b border-black/5 px-4 py-3 dark:bg-slate-800/90 dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                  <div className="h-3 w-3 rounded-full bg-green-400/60" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="mx-auto max-w-sm flex items-center gap-2 rounded-full bg-muted/50 px-4 py-1.5 text-xs text-muted-foreground dark:bg-slate-900/80">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                    bellashairsalon.com
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Content */}
            <div className="rounded-b-xl bg-white overflow-hidden dark:bg-slate-900 dark:ring-1 dark:ring-white/10">
              {/* Mini Hero Section */}
              <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 px-4 py-6 sm:px-8 sm:py-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">B</span>
                      </div>
                      <span className="text-lg font-semibold text-foreground">{"Bella's Hair Studio"}</span>
                    </div>
                    <h2 className="mb-2 text-xl font-bold text-foreground sm:text-2xl">
                      Where Style Meets Expertise
                    </h2>
                    <p className="mb-4 max-w-md text-sm leading-6 text-muted-foreground">
                      Award-winning stylists dedicated to bringing out your natural beauty
                    </p>
                    <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 text-sm font-medium text-white sm:w-auto">
                      Book Appointment
                    </button>
                  </div>
                  <div className="mx-auto h-28 w-28 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-200 to-orange-200 sm:mx-0 sm:block sm:h-32 sm:w-32">
                    <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkVGM0M3Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzUiIHI9IjIwIiBmaWxsPSIjRkJCRjI0Ii8+CjxwYXRoIGQ9Ik0yNSA4NUMyNSA2NSA0MCA1NSA1MCA1NUM2MCA1NSA3NSA2NSA3NSA4NUgyNVoiIGZpbGw9IiNGQkJGMjQiLz4KPC9zdmc+')] bg-cover" />
                  </div>
                </div>
              </div>

              {/* Services Preview */}
              <div className="border-t border-muted/30 px-4 py-6 sm:px-8">
                <h3 className="text-sm font-semibold text-foreground mb-4">Our Services</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { name: "Haircuts", price: "From $45" },
                    { name: "Coloring", price: "From $85" },
                    { name: "Styling", price: "From $55" },
                  ].map((service) => (
                    <div key={service.name} className="rounded-lg bg-muted/30 p-3">
                      <p className="text-sm font-medium text-foreground">{service.name}</p>
                      <p className="text-xs text-muted-foreground">{service.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review & Location Preview */}
              <div className="flex flex-col gap-4 border-t border-muted/30 bg-muted/10 px-4 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4.9 (127 reviews)</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground sm:gap-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    Austin, TX
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Open Now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-20">
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
            {[
              { value: "10,000+", label: "Websites created", icon: Globe },
              { value: "4.9/5", label: "Average rating", icon: Star },
              { value: "2 min", label: "Average build time", icon: Clock },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-20">
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Why local businesses choose Clear
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground leading-7">
              Our AI understands what makes your business unique and builds a website that actually converts visitors into customers.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "AI That Gets You",
                description: "Tell us about your business in plain English. Our AI understands context, not just keywords."
              },
              {
                icon: TrendingUp,
                title: "Built to Convert",
                description: "Every element is optimized based on what actually works for local businesses like yours."
              },
              {
                icon: Users,
                title: "Your Customers First",
                description: "Clean design that builds trust and makes it easy for customers to take action."
              }
            ].map((feature) => (
              <div 
                key={feature.title}
                className="glass-card rounded-2xl p-6 hover-lift dark:border-slate-700/80"
              >
                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto max-w-4xl px-4 pb-20 text-center sm:px-6 sm:pb-24">
          <div className="glass-card-elevated rounded-3xl p-6 sm:p-10 dark:border dark:border-slate-700/60">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to build your website?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground leading-7">
              Join thousands of local business owners who have created beautiful, high-converting websites in minutes.
            </p>
            <Link href="/dashboard/brand-input" className="block sm:inline-block">
              <button className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/20 glass-card px-6 py-4 text-base font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.12] dark:border-white/10 dark:hover:border-white/20 dark:hover:bg-white/[0.06] sm:w-auto sm:px-8">
                <Sparkles className="h-5 w-5" />
                Get Started Free
                <svg 
                  className="h-5 w-5 transition-transform group-hover:translate-x-0.5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </main>

      <ContactFormFooter />

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Clear</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with AI for local businesses
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
