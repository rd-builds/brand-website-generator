import type { BrandGeneratePayload, GenerateWebsiteInput } from "@/lib/generate-website-types"
import { mockGenerateFromBrandInput, mockGenerateWebsite } from "@/lib/mock-website-generator"

const themes = {
  "Premium & Luxury": {
    light: { bg: "#ffffff", text: "#111111", primary: "#d4af37" },
    dark: { bg: "#0a0a0a", text: "#ffffff", primary: "#facc15" }
  },
  "Playful & Fun": {
    light: { bg: "#fdf2f8", text: "#111111", primary: "#ec4899" },
    dark: { bg: "#1f2937", text: "#ffffff", primary: "#f472b6" }
  },
  "Professional": {
    light: { bg: "#f8fafc", text: "#111111", primary: "#2563eb" },
    dark: { bg: "#0f172a", text: "#ffffff", primary: "#3b82f6" }
  },
  "Modern & Minimal": {
    light: { bg: "#ffffff", text: "#333333", primary: "#000000" },
    dark: { bg: "#000000", text: "#eeeeee", primary: "#ffffff" }
  },
  "Trustworthy": {
    light: { bg: "#ecfeff", text: "#0f172a", primary: "#0891b2" },
    dark: { bg: "#083344", text: "#f8fafc", primary: "#22d3ee" }
  },
  "Friendly & Warm": {
    light: { bg: "#fff7ed", text: "#431407", primary: "#ea580c" },
    dark: { bg: "#431407", text: "#ffedd5", primary: "#f97316" }
  }
} as const

const personalityLabels: Record<string, keyof typeof themes> = {
  professional: "Professional",
  friendly: "Friendly & Warm",
  premium: "Premium & Luxury",
  modern: "Modern & Minimal",
  playful: "Playful & Fun",
  trustworthy: "Trustworthy",
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

function pickString(obj: Record<string, unknown>, key: string): string {
  const v = obj[key]
  return typeof v === "string" ? v : ""
}

function pickPersonality(obj: Record<string, unknown>): string[] {
  const v = obj.personality
  if (Array.isArray(v)) {
    return v.filter((x): x is string => typeof x === "string").map((s) => s.trim()).filter(Boolean)
  }
  if (typeof v === "string") {
    return v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

function isBrandGenerateBody(obj: Record<string, unknown>): obj is Record<string, unknown> & BrandGeneratePayload {
  const services = pickString(obj, "services").trim()
  const location = pickString(obj, "location").trim()
  const goal = pickString(obj, "goal").trim()
  const personality = pickPersonality(obj)
  return Boolean(services && location && goal && personality.length > 0)
}

function parseBrandPayload(obj: Record<string, unknown>): BrandGeneratePayload {
  return {
    services: pickString(obj, "services").trim(),
    location: pickString(obj, "location").trim(),
    personality: pickPersonality(obj),
    goal: pickString(obj, "goal").trim(),
  }
}

export async function POST(request: Request) {
  try {
    let body: unknown
    try {
      const req = request
      body = await req.json()
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "Expected JSON body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (!isRecord(body)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid JSON object" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (isBrandGenerateBody(body)) {
      const input = parseBrandPayload(body)
      const generated = mockGenerateFromBrandInput(input)
      const selected = input.personality?.[0] || "Professional"
      const selectedLabel =
        themes[selected as keyof typeof themes] !== undefined
          ? (selected as keyof typeof themes)
          : (personalityLabels[selected.toLowerCase()] ?? "Professional")
      const theme = {
        layoutStyle: selectedLabel,
        ...themes[selectedLabel],
        fontStyle:
          selectedLabel === "Premium & Luxury"
            ? "serif"
            : selectedLabel === "Modern & Minimal"
            ? "modern"
            : "sans",
      }

      return new Response(
        JSON.stringify({
          ok: true,
          title: generated.title,
          tagline: generated.tagline,
          theme,
          sections: generated.sections,
        }),
        {
        status: 200,
        headers: { "Content-Type": "application/json" },
        }
      )
    }

    const name = pickString(body, "name").trim()
    if (!name) {
      return new Response(
        JSON.stringify({
          ok: false,
          error:
            'Send either Brand Input fields { "services", "location", "personality", "goal" } or legacy { "name", ... }.',
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    const legacy: GenerateWebsiteInput = {
      name,
      industry: pickString(body, "industry"),
      style: pickString(body, "style"),
      tone: pickString(body, "tone"),
      description: pickString(body, "description"),
    }

    const generated = mockGenerateWebsite(legacy)
    return new Response(JSON.stringify({ ok: true, ...generated }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error while generating website data"
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
