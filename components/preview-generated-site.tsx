"use client"

import * as React from "react"
import Link from "next/link"
import type { GeneratedWebsite } from "@/lib/generate-website-types"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const FONT_CLASS: Record<GeneratedWebsite["theme"]["fontStyle"], string> = {
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

  return (
    <div
      className={cn("min-h-screen bg-background text-foreground", FONT_CLASS[site.theme.fontStyle])}
      style={
        {
          "--preview-primary": site.theme.primaryColor,
          "--preview-bg": site.theme.backgroundColor,
        } as React.CSSProperties
      }
    >
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/dashboard/brand-input"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to brand input
          </Link>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold gradient-text">Preview</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main
        className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:space-y-12 sm:px-6 sm:py-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at top, color-mix(in srgb, var(--preview-bg) 18%, transparent), transparent 45%)",
        }}
      >
        <section className="animate-in fade-in-0 slide-in-from-bottom-2 relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl duration-500">
          <div
            className="pointer-events-none absolute inset-0 opacity-90 dark:opacity-100"
            aria-hidden
          >
            <div
              className="absolute inset-0 bg-gradient-to-b via-transparent to-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, color-mix(in srgb, var(--preview-primary) 24%, transparent) 0%, transparent 70%)",
              }}
            />
          </div>
          <div className="relative mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
            <p className="text-sm font-medium uppercase tracking-wider" style={{ color: "var(--preview-primary)" }}>
              {displayTitle}
            </p>
            <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-6xl">
              {heading}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
              {site.tagline}
            </p>
            <div className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/85">
              <p>{subtext}</p>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                className="rounded-full px-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ backgroundColor: "var(--preview-primary)" }}
              >
                {actionLabel}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-primary/30 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                asChild
              >
                <Link href="/dashboard/human-review">Edit content</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="animate-in fade-in-0 slide-in-from-bottom-3 rounded-3xl border border-border bg-muted/20 p-8 shadow-sm duration-500 dark:bg-muted/10">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wider" style={{ color: "var(--preview-primary)" }}>
              About
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">A brand people remember</h2>
            <p className="mt-5 text-pretty text-base leading-8 text-foreground/85">{aboutText}</p>
          </div>
        </section>

        <section className="animate-in fade-in-0 slide-in-from-bottom-4 rounded-3xl border border-border bg-card/70 p-8 shadow-sm duration-500">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider" style={{ color: "var(--preview-primary)" }}>
                Services
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">What we offer</h2>
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {serviceItems.map((item) => {
                return (
                  <li
                    key={item.title}
                    className={cn(
                      "rounded-2xl border border-border bg-card/85 p-6 text-left shadow-sm",
                      "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                      "dark:border-slate-700/80 dark:bg-card/40"
                    )}
                  >
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        <section className="animate-in fade-in-0 slide-in-from-bottom-5 rounded-3xl border border-border bg-card p-10 text-center shadow-md duration-500">
          <p className="mx-auto max-w-2xl text-xl font-semibold text-foreground">{ctaText}</p>
          <Button
            size="lg"
            className="mt-6 rounded-full px-10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ backgroundColor: "var(--preview-primary)" }}
          >
            {actionLabel}
          </Button>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        Generated preview · Clear
      </footer>
    </div>
  )
}
