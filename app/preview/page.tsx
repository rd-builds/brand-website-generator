"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  GENERATED_SITE_STORAGE_KEY,
  type StoredGeneratedSite,
} from "@/lib/generated-site-storage"
import type { GeneratedWebsite } from "@/lib/generate-website-types"
import { PreviewGeneratedSite } from "@/components/preview-generated-site"

function isGeneratedWebsite(v: unknown): v is GeneratedWebsite {
  if (!v || typeof v !== "object") return false
  const o = v as Record<string, unknown>
  const theme = o.theme
  const themeValid =
    !!theme &&
    typeof theme === "object" &&
    typeof (theme as Record<string, unknown>).primaryColor === "string" &&
    typeof (theme as Record<string, unknown>).backgroundColor === "string" &&
    ((theme as Record<string, unknown>).fontStyle === undefined ||
      typeof (theme as Record<string, unknown>).fontStyle === "string") &&
    ((theme as Record<string, unknown>).accentColor === undefined ||
      typeof (theme as Record<string, unknown>).accentColor === "string")
  const sections = o.sections
  const sectionsValid =
    Array.isArray(sections) &&
    sections.every((item) => {
      if (!item || typeof item !== "object") return false
      const section = item as Record<string, unknown>
      if (typeof section.type !== "string") return false
      if (section.type === "hero") {
        return (
          typeof section.heading === "string" &&
          typeof section.subtext === "string" &&
          typeof section.buttonText === "string"
        )
      }
      if (section.type === "about") {
        return typeof section.content === "string"
      }
      if (section.type === "services") {
        return (
          Array.isArray(section.items) &&
          section.items.every((svc) => {
            if (!svc || typeof svc !== "object") return false
            const itemObj = svc as Record<string, unknown>
            return (
              typeof itemObj.title === "string" &&
              typeof itemObj.description === "string"
            )
          })
        )
      }
      if (section.type === "cta") {
        return typeof section.text === "string"
      }
      if (section.type === "testimonials") {
        return typeof section.content === "string"
      }
      return false
    })
  return (
    typeof o.title === "string" &&
    typeof o.tagline === "string" &&
    themeValid &&
    sectionsValid
  )
}

export default function PreviewPage() {
  const [stored, setStored] = React.useState<StoredGeneratedSite | null>(null)
  const [checked, setChecked] = React.useState(false)

  React.useEffect(() => {
    try {
      const fallbackData = JSON.parse(localStorage.getItem("siteData") || "{}") as unknown
      const raw = localStorage.getItem(GENERATED_SITE_STORAGE_KEY)
      const parsed = raw ? (JSON.parse(raw) as unknown) : fallbackData

      if (!parsed || (typeof parsed === "object" && Object.keys(parsed as Record<string, unknown>).length === 0)) {
        setStored(null)
        return
      }

      if (isGeneratedWebsite(parsed)) {
        setStored(parsed as StoredGeneratedSite)
      } else {
        setStored(null)
      }
    } catch {
      setStored(null)
    } finally {
      setChecked(true)
    }
  }, [])

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Loading preview…
      </div>
    )
  }

  if (!stored || !isGeneratedWebsite(stored)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <p className="max-w-md text-muted-foreground">
          No generated site found. Fill out the brand form and click &quot;Generate My Website&quot; to
          see your preview here.
        </p>
        <Button asChild>
          <Link href="/dashboard/brand-input">Go to Brand Input</Link>
        </Button>
      </div>
    )
  }

  const site: GeneratedWebsite = {
    title: stored.title,
    tagline: stored.tagline,
    theme: stored.theme,
    sections: stored.sections as GeneratedWebsite["sections"],
  }

  return (
    <PreviewGeneratedSite
      site={site}
      goalId={stored.goalId}
      businessName={stored.businessName}
    />
  )
}
