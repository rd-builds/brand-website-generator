/** Legacy “quick generate” form (Site Generator page). */
export type GenerateWebsiteInput = {
  name: string
  industry: string
  style: string
  tone: string
  description: string
}

/** Brand Input page → POST /api/generate */
export type BrandGeneratePayload = {
  services: string
  location: string
  personality: string[]
  goal: string
}

export type WebsiteSectionType = "hero" | "about" | "services" | "testimonials"

export type WebsiteSection = {
  type: WebsiteSectionType
  content: string
}

export type GeneratedWebsite = {
  title: string
  tagline: string
  sections: WebsiteSection[]
}

export type GenerateWebsiteError = {
  ok: false
  error: string
}

export type GenerateWebsiteSuccess = GeneratedWebsite & { ok: true }
