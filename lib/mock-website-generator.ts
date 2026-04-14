import type {
  BrandGeneratePayload,
  GeneratedWebsite,
  GenerateWebsiteInput,
  WebsiteSection,
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

function formatServicesList(services: string): string {
  const lines = services
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean)
  if (lines.length === 0) return "• Custom services tailored to your customers"
  return lines.map((l) => (l.startsWith("•") || l.startsWith("-") ? l : `• ${l}`)).join("\n")
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

  const titleSeed = services.split(/[,\n]/).map((s) => s.trim()).filter(Boolean)[0] ?? "Your business"
  const title = trim(titleSeed, 42)

  const tagline = `${traits ? `${traits} service` : "Quality service"} in ${location}. ${goal.blurb}`

  const hero = `Welcome to a ${traits || "customer-first"} experience built for people in and around ${location}.\n\n${trim(services, 280)}\n\nPrimary goal: ${goal.label} — we shape the page so visitors know exactly how to take the next step.`

  const about = `Who we are\n\nWe combine ${traits || "a clear, confident voice"} with local know-how. Whether someone discovers you from search or a referral, they see honest copy, real services, and proof you serve ${location}.\n\n${goal.blurb}`

  const servicesSection = `What we offer\n\n${formatServicesList(services)}\n\nReady to ${goal.cta.toLowerCase()}? This preview mirrors how the live hero, about, and services blocks will read once your site is published.`

  const sections: WebsiteSection[] = [
    { type: "hero", content: hero },
    { type: "about", content: about },
    { type: "services", content: servicesSection },
  ]

  return { title, tagline, sections }
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
  const services = `What we offer\n\n${servicesBody}\n\n${styleNote(style)} This block is ready to pair with icons, pricing tables, or booking buttons on the live site.`

  const testimonials: WebsiteSection = {
    type: "testimonials",
    content: `“${name} made the whole process easy. We’d recommend them to anyone in ${industry}.” — Jordan P., repeat customer\n\n“We came in with a tight timeline. The team was ${tone} and kept us in the loop the whole way.” — Samira L., local client`,
  }

  const sections: WebsiteSection[] = [
    { type: "hero", content: hero },
    { type: "about", content: about },
    { type: "services", content: services },
    testimonials,
  ]

  return { title, tagline, sections }
}
