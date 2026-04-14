"use client"

import * as React from "react"
import Link from "next/link"
import type { GeneratedWebsite, WebsiteSectionType } from "@/lib/generate-website-types"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const GOAL_CTA: Record<string, string> = {
  call: "Call now",
  book: "Book online",
  whatsapp: "Message on WhatsApp",
  visit: "Get directions",
}

function sectionByType(site: GeneratedWebsite, type: WebsiteSectionType) {
  return site.sections.find((s) => s.type === type)?.content ?? ""
}

function serviceLines(content: string): string[] {
  const block = content.replace(/^What we offer\s*\n*/i, "").split(/\n\n/)[0] ?? content
  return block
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
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
  const hero = sectionByType(site, "hero")
  const about = sectionByType(site, "about")
  const servicesBlock = sectionByType(site, "services")
  const lines = serviceLines(servicesBlock)
  const cta = GOAL_CTA[goalId ?? ""] ?? "Get started"

  return (
    <div className="min-h-screen bg-background text-foreground">
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

      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div
            className="pointer-events-none absolute inset-0 opacity-90 dark:opacity-100"
            aria-hidden
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/12 via-transparent to-transparent dark:from-primary/20" />
          </div>
          <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Hero</p>
            <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              {displayTitle}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
              {site.tagline}
            </p>
            <div className="mx-auto mt-8 max-w-2xl text-pretty text-left text-sm leading-relaxed text-foreground/90 sm:text-center">
              <p className="whitespace-pre-wrap">{hero}</p>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="rounded-full px-8">
                {cta}
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-primary/30 bg-background/50 backdrop-blur-sm" asChild>
                <Link href="/dashboard/human-review">Edit content</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-muted/20 py-16 dark:bg-muted/10">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">About</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Our story</h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              {about.split(/\n\n+/).map((para, i) => (
                <p key={i} className="whitespace-pre-wrap text-pretty leading-relaxed text-foreground/90">
                  {para.trim()}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Services</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">What we offer</h2>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lines.map((line, i) => {
                const text = line.replace(/^[-•]\s*/, "").trim()
                if (!text) return null
                return (
                  <li
                    key={i}
                    className={cn(
                      "rounded-2xl border border-border bg-card/60 p-5 text-left shadow-sm",
                      "dark:border-slate-700/80 dark:bg-card/40"
                    )}
                  >
                    <span className="text-sm font-medium leading-snug text-foreground">{text}</span>
                  </li>
                )
              })}
            </ul>
            {lines.length === 0 && (
              <p className="mt-8 text-center text-sm text-muted-foreground whitespace-pre-wrap">
                {servicesBlock}
              </p>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        Generated preview · Clear
      </footer>
    </div>
  )
}
