"use client"

import * as React from "react"
import Link from "next/link"
import type { GeneratedWebsite } from "@/lib/generate-website-types"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Menu, Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"

const FONT_CLASS: Record<NonNullable<GeneratedWebsite["theme"]["fontStyle"]>, string> = {
  sans: "font-sans",
  serif: "font-serif",
  modern: "font-sans tracking-tight",
}

export function PreviewGeneratedSite({
  site,
  goalId,
  businessName,
}: {
  site: GeneratedWebsite
  goalId?: string
  businessName?: string
}) {
  const resolvedTheme = {
    primaryColor: site.theme.primaryColor || "#1e3a8a",
    backgroundColor: site.theme.backgroundColor || "#f8fafc",
    accentColor: site.theme.accentColor || "#3b82f6",
    fontStyle: site.theme.fontStyle || "sans",
  }
  const displayTitle = (businessName?.trim() || site.title).trim()
  const hero = site.sections.find((s) => s.type === "hero")
  const about = site.sections.find((s) => s.type === "about")
  const services = site.sections.find((s) => s.type === "services")
  const cta = site.sections.find((s) => s.type === "cta")
  const actionLabel =
    goalId === "call"
      ? "Call now"
      : goalId === "book"
      ? "Book online"
      : goalId === "whatsapp"
      ? "Message on WhatsApp"
      : goalId === "visit"
      ? "Get directions"
      : hero?.type === "hero"
      ? hero.buttonText
      : "Get started"
  const heading = hero?.type === "hero" ? hero.heading : displayTitle
  const subtext = hero?.type === "hero" ? hero.subtext : site.tagline
  const aboutText = about?.type === "about" ? about.content : "We are focused on helping local customers get clear, reliable results."
  const serviceItems = services?.type === "services" ? services.items : []
  const ctaText = cta?.type === "cta" ? cta.text : "Ready to launch your site?"
  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "pricing", label: "Pricing" },
    { id: "cta", label: "Contact" },
  ] as const
  const [firstWord, ...restWords] = heading.split(" ")
  const restHeading = restWords.join(" ")
  const [activeSection, setActiveSection] = React.useState<(typeof navItems)[number]["id"]>("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const pricingPlans = [
    { name: "Starter", price: "$29", subtitle: "For new businesses" },
    { name: "Growth", price: "$79", subtitle: "For scaling teams" },
    { name: "Pro", price: "$149", subtitle: "For high-volume brands" },
  ]

  React.useEffect(() => {
    const sectionIds = navItems.map((item) => item.id)
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el instanceof HTMLElement)

    if (sectionElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id as (typeof navItems)[number]["id"])
        }
      },
      {
        root: null,
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-35% 0px -45% 0px",
      }
    )

    sectionElements.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div
      className={cn("min-h-screen", FONT_CLASS[resolvedTheme.fontStyle])}
      style={
        {
          backgroundColor: resolvedTheme.backgroundColor,
          color: resolvedTheme.primaryColor,
          "--preview-primary": resolvedTheme.primaryColor,
          "--preview-bg": resolvedTheme.backgroundColor,
          "--preview-accent": resolvedTheme.accentColor,
        } as React.CSSProperties
      }
    >
      <header className="fixed top-0 z-50 w-full border-b border-border/80 bg-background/75 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/dashboard/brand-input"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to brand input
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleNavClick}
                  className="text-sm font-medium transition-all duration-200 hover:text-[var(--preview-accent)]"
                  style={{
                    color: isActive ? "var(--preview-accent)" : "var(--preview-primary)",
                  }}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold gradient-text">Preview</span>
            </div>
            <ThemeToggle />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="border-t border-border/80 bg-background/90 px-4 py-3 backdrop-blur-md md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={handleNavClick}
                    className="rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-[var(--preview-accent)]"
                    style={{
                      color: isActive ? "var(--preview-accent)" : "var(--preview-primary)",
                      backgroundColor: isActive
                        ? "color-mix(in srgb, var(--preview-accent) 16%, transparent)"
                        : "transparent",
                    }}
                  >
                    {item.label}
                  </a>
                )
              })}
            </div>
          </nav>
        )}
      </header>

      <main className="pt-20">
        <div
          className="mx-auto w-full max-w-7xl px-6 py-10 sm:py-12"
          style={{
            backgroundImage:
              "radial-gradient(circle at top, color-mix(in srgb, var(--preview-bg) 18%, transparent), transparent 45%)",
          }}
        >
          <section id="hero" className="scroll-mt-24 animate-in fade-in-0 slide-in-from-bottom-2 relative overflow-hidden rounded-3xl border border-white/40 bg-white/55 px-6 py-16 shadow-xl backdrop-blur-md duration-500 dark:border-white/10 dark:bg-black/20 sm:py-20">
            <div
              className="pointer-events-none absolute inset-0 opacity-95"
              aria-hidden
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--preview-primary) 24%, white) 0%, color-mix(in srgb, var(--preview-accent) 24%, transparent) 45%, transparent 100%)",
              }}
            />
            <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
              <p
                className="rounded-full px-4 py-1 text-sm font-semibold uppercase tracking-wider"
                style={{
                  color: "var(--preview-primary)",
                  backgroundColor: "color-mix(in srgb, var(--preview-primary) 12%, transparent)",
                }}
              >
                {displayTitle}
              </p>
              <h1 className="mt-6 text-balance text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                <span style={{ color: "var(--preview-primary)" }}>{firstWord}</span>{" "}
                <span style={{ color: "var(--preview-accent)" }}>{restHeading}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-foreground/75">
                {site.tagline}
              </p>
              <div className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/85">
                <p>{subtext}</p>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Button
                  size="lg"
                  className="rounded-full px-9 text-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-xl"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--preview-primary) 0%, var(--preview-accent) 100%)",
                    boxShadow: "0 14px 36px color-mix(in srgb, var(--preview-accent) 45%, transparent)",
                  }}
                >
                  {actionLabel}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-primary/30 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:border-primary/50 dark:bg-white/5"
                  asChild
                >
                  <Link href="/dashboard/human-review">Edit content</Link>
                </Button>
              </div>
            </div>
          </section>

          <section id="about" className="scroll-mt-24 animate-in fade-in-0 slide-in-from-bottom-3 mt-10 rounded-3xl border border-white/40 bg-white/45 px-6 py-20 shadow-md backdrop-blur-md duration-500 dark:border-white/10 dark:bg-black/20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--preview-primary)" }}>
                About
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--preview-primary)" }}>
                A brand people remember
              </h2>
              <p className="mt-6 text-pretty text-base leading-relaxed text-foreground/80">{aboutText}</p>
            </div>
          </section>

          <section id="services" className="scroll-mt-24 animate-in fade-in-0 slide-in-from-bottom-4 mt-10 rounded-3xl border border-white/40 bg-white/45 px-6 py-20 shadow-md backdrop-blur-md duration-500 dark:border-white/10 dark:bg-black/20">
            <div className="mx-auto max-w-6xl">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--preview-primary)" }}>
                  Services
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--preview-primary)" }}>
                  What we offer
                </h2>
              </div>
              <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {serviceItems.map((item) => {
                  return (
                    <li
                      key={item.title}
                      className={cn(
                        "flex h-full flex-col rounded-2xl border border-white/40 bg-white/70 p-6 text-left shadow-lg",
                        "transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl",
                        "dark:border-white/10 dark:bg-white/5"
                      )}
                    >
                      <h3 className="text-lg font-bold" style={{ color: "var(--preview-primary)" }}>
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/75">{item.description}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>

          <section id="pricing" className="scroll-mt-24 animate-in fade-in-0 slide-in-from-bottom-5 mt-10 rounded-3xl border border-white/40 bg-white/45 px-6 py-20 shadow-md backdrop-blur-md duration-500 dark:border-white/10 dark:bg-black/20">
            <div className="mx-auto max-w-6xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--preview-primary)" }}>
                Pricing
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--preview-primary)" }}>
                Simple plans for every stage
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                {pricingPlans.map((plan, idx) => (
                  <article
                    key={plan.name}
                    className={cn(
                      "rounded-2xl border border-white/40 bg-white/70 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5",
                      idx === 1 && "border-2"
                    )}
                    style={idx === 1 ? { borderColor: "var(--preview-accent)" } : undefined}
                  >
                    <h3 className="text-xl font-bold" style={{ color: "var(--preview-primary)" }}>
                      {plan.name}
                    </h3>
                    <p className="mt-3 text-4xl font-extrabold" style={{ color: "var(--preview-accent)" }}>
                      {plan.price}
                      <span className="text-base font-medium text-foreground/60">/mo</span>
                    </p>
                    <p className="mt-3 text-sm text-foreground/75">{plan.subtitle}</p>
                    <ul className="mt-6 space-y-2 text-left text-sm text-foreground/75">
                      {serviceItems.slice(0, 3).map((item) => (
                        <li key={`${plan.name}-${item.title}`} className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: "var(--preview-accent)" }} />
                          <span>{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="cta" className="scroll-mt-24 animate-in fade-in-0 slide-in-from-bottom-5 mt-10 rounded-3xl border border-white/40 bg-white/55 px-6 py-20 text-center shadow-lg backdrop-blur-md duration-500 dark:border-white/10 dark:bg-black/20">
            <p className="mx-auto max-w-3xl text-xl font-semibold leading-relaxed text-foreground sm:text-3xl">{ctaText}</p>
            <Button
              size="lg"
              className="mt-8 rounded-full px-10 text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl"
              style={{
                background:
                  "linear-gradient(90deg, var(--preview-primary) 0%, var(--preview-accent) 100%)",
                boxShadow: "0 14px 36px color-mix(in srgb, var(--preview-accent) 45%, transparent)",
              }}
            >
              {actionLabel}
            </Button>
          </section>
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        Generated preview · Clear
      </footer>
    </div>
  )
}
