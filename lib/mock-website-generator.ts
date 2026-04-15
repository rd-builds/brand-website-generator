import type {
  BrandGeneratePayload,
  GeneratedWebsite,
  GenerateWebsiteInput,
  WebsiteTheme,
} from "@/lib/generate-website-types"

function trim(s: string, max: number): string {
  const t = s.trim()
  if (t.length <= max) return t
  return `${t.slice(0, max - 1).trim()}…`
}

function industryServices(industry: string, name: string): string {
  const i = industry.toLowerCase()
  if (i.includes("restaurant") || i.includes("food"))
    return `• Seasonal menus crafted for your guests\n• Private dining & events at ${name}\n• Online reservations & takeout\n• Catering for local businesses`
  if (i.includes("salon") || i.includes("spa") || i.includes("beauty"))
    return `• Cuts, color, and styling by experienced pros\n• Bridal & special-event packages\n• Membership & loyalty perks\n• Product lines curated for your hair type`
  if (i.includes("fitness") || i.includes("gym"))
    return `• Personal training & small-group classes\n• Nutrition coaching\n• Flexible memberships\n• Recovery & mobility sessions`
  if (i.includes("health") || i.includes("medical") || i.includes("dental"))
    return `• Same-week appointments when possible\n• Insurance-friendly billing\n• Clear treatment plans you can understand\n• Follow-up care that fits your schedule`
  if (i.includes("contract") || i.includes("home") || i.includes("build"))
    return `• Licensed estimates with transparent pricing\n• Project timelines you can track\n• Warranty-backed workmanship\n• Emergency repairs when you need us fast`
  return `• Core offerings tailored to your market\n• Consultations before you commit\n• Packages for first-time and returning clients\n• Local support from a team that knows your area`
}

function toneOpening(tone: string): string {
  const t = tone.toLowerCase()
  if (t.includes("friendly") || t.includes("warm")) return "We're glad you're here."
  if (t.includes("premium") || t.includes("luxury")) return "An elevated experience, down to every detail."
  if (t.includes("playful")) return "Good vibes, serious results."
  return "Clear communication. Reliable delivery."
}

function styleNote(style: string): string {
  const s = style.toLowerCase()
  if (s.includes("minimal")) return "Clean layout, generous whitespace, and typography-led hierarchy."
  if (s.includes("bold")) return "Strong contrast, confident headlines, and high-impact imagery."
  if (s.includes("classic")) return "Timeless structure with trustworthy colors and refined copy."
  return "Modern, conversion-focused layout with intuitive navigation."
}

const PERSONALITY_LABELS: Record<string, string> = {
  professional: "Professional",
  friendly: "Friendly & Warm",
  premium: "Premium & Luxury",
  modern: "Modern & Minimal",
  playful: "Playful & Fun",
  trustworthy: "Trustworthy",
}

const GOAL_COPY: Record<string, { label: string; cta: string; blurb: string }> = {
  call: {
    label: "Phone calls",
    cta: "Call now",
    blurb: "Your site will foreground a tap-to-call button and clear phone hours.",
  },
  book: {
    label: "Online booking",
    cta: "Book online",
    blurb: "Visitors see availability-first flows and a confident booking CTA above the fold.",
  },
  whatsapp: {
    label: "WhatsApp chat",
    cta: "Message us",
    blurb: "Quick-start conversations from WhatsApp build trust before the first visit.",
  },
  visit: {
    label: "Store visits",
    cta: "Get directions",
    blurb: "Maps, hours, and parking notes help locals walk through your door.",
  },
}

function splitServiceItems(services: string): Array<{ title: string; description: string }> {
  const parsed = services
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 6)

  if (parsed.length === 0) {
    return [
      { title: "Custom Consulting", description: "Tailored guidance designed around your business goals." },
      { title: "Implementation", description: "End-to-end execution with clear timelines and regular updates." },
      { title: "Ongoing Support", description: "Reliable follow-through so your team stays confident post-launch." },
    ]
  }

  return parsed.map((title) => ({
    title,
    description: `A results-focused ${title.toLowerCase()} service crafted to improve customer outcomes.`,
  }))
}

function styleFromPersonality(personality: string[]) {
  const lower = personality.map((p) => p.toLowerCase())
  const isLuxury = lower.includes("luxury") || lower.includes("premium")
  const isFun = lower.includes("fun") || lower.includes("playful")
  const isMinimal = lower.includes("minimal") || lower.includes("modern")
  return { isLuxury, isFun, isMinimal }
}

function themeForPersonality(personality: string[]): WebsiteTheme {
  const { isLuxury, isFun } = styleFromPersonality(personality)
  if (isLuxury) {
    return { primaryColor: "#1d4ed8", backgroundColor: "#0f172a", accentColor: "#3b82f6", fontStyle: "serif" }
  }
  if (isFun) {
    return { primaryColor: "#2563eb", backgroundColor: "#1e293b", accentColor: "#60a5fa", fontStyle: "modern" }
  }
  return { primaryColor: "#2563eb", backgroundColor: "#0f172a", accentColor: "#3b82f6", fontStyle: "sans" }
}

/**
 * Simulates AI from Brand Input fields — returns hero, about, services only.
 */
export function mockGenerateFromBrandInput(input: BrandGeneratePayload): GeneratedWebsite {
  const services = input.services.trim()
  const location = input.location.trim()
  const goal = GOAL_COPY[input.goal] ?? {
    label: "Get in touch",
    cta: "Contact us",
    blurb: "We surface your strongest call to action across the page.",
  }

  const traits = input.personality
    .map((id) => PERSONALITY_LABELS[id] ?? id)
    .filter(Boolean)
    .join(", ")
  const { isLuxury, isFun, isMinimal } = styleFromPersonality(input.personality)
  const theme = themeForPersonality(input.personality)

  const titleSeed = services.split(/[,\n]/).map((s) => s.trim()).filter(Boolean)[0] ?? "Your business"
  const title = trim(titleSeed, 42)

  const baseTagline = `${traits ? `${traits} service` : "Quality service"} in ${location}.`
  const tagline = isMinimal ? baseTagline : `${baseTagline} ${goal.blurb}`

  const heroHeading = isLuxury
    ? `Elevate your experience with ${title}`
    : isFun
    ? `Make every visit feel exciting with ${title}`
    : `Trusted ${title} for ${location}`
  const heroSubtext = isMinimal
    ? trim(`${services}. ${goal.blurb}`, 120)
    : trim(
        `${services}. We combine local expertise with a ${traits || "customer-first"} approach so visitors quickly become customers in ${location}.`,
        220
      )

  const about = isMinimal
    ? `We deliver focused, high-quality service for ${location}. ${goal.blurb}`
    : `We blend ${traits || "clear and confident"} communication with proven delivery standards. From first impression to repeat business, each part of your website supports trust, clarity, and conversion in ${location}.`

  const ctaText = isLuxury
    ? "Ready for a premium experience? Let's start today."
    : isFun
    ? "Ready to get started? Let’s make something amazing together."
    : "Ready to take the next step? Let's get started."

  const sections = [
    {
      type: "hero" as const,
      heading: heroHeading,
      subtext: heroSubtext,
      buttonText: goal.cta,
    },
    { type: "about" as const, content: about },
    { type: "services" as const, items: splitServiceItems(services) },
    { type: "cta" as const, text: ctaText },
  ]

  return { title, tagline, theme, sections }
}

/**
 * Simulates AI output from quick Site Generator fields — includes testimonials.
 */
export function mockGenerateWebsite(input: GenerateWebsiteInput): GeneratedWebsite {
  const name = input.name.trim() || "Your Business"
  const industry = input.industry.trim() || "local services"
  const style = input.style.trim() || "modern"
  const tone = input.tone.trim() || "professional"
  const description = input.description.trim()

  const taglineBase = description
    ? trim(description, 120)
    : `${name} helps ${industry} customers get results they can feel.`

  const tagline = `${toneOpening(tone)} ${taglineBase}`

  const title = `${name}`

  const hero = `${name} — ${industry} done right.\n\n${description || `Trusted by neighbors who want quality without the runaround.`}\n\nVisual direction: ${styleNote(style)}`

  const about = `About ${name}\n\n${description ? `${description}\n\n` : ""}We built this page around a ${tone} voice and a ${style} visual style so visitors instantly understand who you are and why they should choose you. Every section is tuned for clarity: short paragraphs, scannable lists, and calls to action that match how people actually book or buy in ${industry}.`

  const servicesBody = industryServices(industry, name)
  const servicesItems = servicesBody
    .split("\n")
    .map((line) => line.replace(/^•\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 6)
    .map((item) => ({
      title: item,
      description: `Built to deliver measurable value for ${industry} customers.`,
    }))

  const theme: WebsiteTheme =
    tone.includes("premium") || style.includes("classic")
      ? { primaryColor: "#1d4ed8", backgroundColor: "#0f172a", accentColor: "#3b82f6", fontStyle: "serif" }
      : style.includes("minimal")
      ? { primaryColor: "#2563eb", backgroundColor: "#111827", accentColor: "#60a5fa", fontStyle: "modern" }
      : { primaryColor: "#2563eb", backgroundColor: "#0f172a", accentColor: "#3b82f6", fontStyle: "sans" }

  const sections = [
    {
      type: "hero" as const,
      heading: `${name} — ${industry} done right`,
      subtext: description || "Trusted by local customers who value quality, speed, and consistency.",
      buttonText: "Get started",
    },
    { type: "about" as const, content: about },
    { type: "services" as const, items: servicesItems },
    { type: "cta" as const, text: `Ready to see what ${name} can do for you?` },
    {
      type: "testimonials" as const,
      content: `“${name} made the whole process easy. We’d recommend them to anyone in ${industry}.” — Jordan P., repeat customer`,
    },
  ]

  return { title, tagline, theme, sections }
}
