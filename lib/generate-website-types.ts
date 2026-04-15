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

export type WebsiteTheme = {
  primaryColor: string
  backgroundColor: string
  accentColor?: string
  fontStyle?: "sans" | "serif" | "modern"
}

export type HeroSection = {
  type: "hero"
  heading: string
  subtext: string
  buttonText: string
}

export type AboutSection = {
  type: "about"
  content: string
}

export type ServicesSection = {
  type: "services"
  items: Array<{
    title: string
    description: string
  }>
}

export type CtaSection = {
  type: "cta"
  text: string
}

export type WebsiteSectionType = "hero" | "about" | "services" | "cta" | "testimonials"

export type WebsiteSection =
  | HeroSection
  | AboutSection
  | ServicesSection
  | CtaSection
  | { type: "testimonials"; content: string }

export type GeneratedWebsite = {
  title: string
  tagline: string
  theme: WebsiteTheme
  sections: WebsiteSection[]
}

export type GenerateWebsiteError = {
  ok: false
  error: string
}

export type GenerateWebsiteSuccess = GeneratedWebsite & { ok: true }
