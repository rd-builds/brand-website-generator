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
  return (
    typeof o.title === "string" &&
    typeof o.tagline === "string" &&
    Array.isArray(o.sections)
  )
}

export default function PreviewPage() {
  const [stored, setStored] = React.useState<StoredGeneratedSite | null>(null)
  const [checked, setChecked] = React.useState(false)

  React.useEffect(() => {
    try {
      const raw = sessionStorage.getItem(GENERATED_SITE_STORAGE_KEY)
      if (!raw) {
        setStored(null)
        return
      }
      const parsed = JSON.parse(raw) as unknown
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
