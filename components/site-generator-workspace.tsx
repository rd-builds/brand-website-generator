"use client"

import * as React from "react"
import type { GeneratedWebsite, GenerateWebsiteInput } from "@/lib/generate-website-types"
import { requestGeneratedWebsite } from "@/lib/generate-api"
import { GeneratedSitePreview } from "@/components/generated-site-preview"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card"
import { Sparkles, Loader2 } from "lucide-react"

const defaultForm: GenerateWebsiteInput = {
  name: "",
  industry: "",
  style: "",
  tone: "",
  description: "",
}

export function SiteGeneratorWorkspace() {
  const [form, setForm] = React.useState<GenerateWebsiteInput>(defaultForm)
  const [result, setResult] = React.useState<GeneratedWebsite | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    setResult(null)
    try {
      const site = await requestGeneratedWebsite(form)
      setResult(site)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  function update<K extends keyof GenerateWebsiteInput>(key: K, value: GenerateWebsiteInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <GlassCard variant="elevated">
        <GlassCardHeader>
          <GlassCardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Brand input
          </GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gen-name">Business name *</Label>
              <Input
                id="gen-name"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="e.g. Northside Dental"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gen-industry">Industry</Label>
              <Input
                id="gen-industry"
                value={form.industry}
                onChange={(e) => update("industry", e.target.value)}
                placeholder="e.g. Healthcare, Restaurant, Fitness"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="gen-style">Style</Label>
                <Input
                  id="gen-style"
                  value={form.style}
                  onChange={(e) => update("style", e.target.value)}
                  placeholder="e.g. Minimal, Bold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gen-tone">Tone</Label>
                <Input
                  id="gen-tone"
                  value={form.tone}
                  onChange={(e) => update("tone", e.target.value)}
                  placeholder="e.g. Friendly, Professional"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gen-desc">Description</Label>
              <Textarea
                id="gen-desc"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="What you do, who you serve, and what makes you different."
                rows={4}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate website
                </>
              )}
            </Button>
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </form>
        </GlassCardContent>
      </GlassCard>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Preview</h2>
        <GeneratedSitePreview site={result} />
      </div>
    </div>
  )
}
